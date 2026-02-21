import { Command } from 'commander';
import chalk from 'chalk';
import notifier from 'node-notifier';
import cron from 'node-cron';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getConfig } from '../utils/config';
import { printCommandHeader } from '../utils/printer';
import { getPrayerTimes } from '../utils/prayers';

const playSound = () => {
    const adhanPath = path.join(process.env.HOME || '', '.aya', 'adhan.mp3');
    if (fs.existsSync(adhanPath)) {
        if (process.platform === 'darwin') {
            exec(`afplay "${adhanPath}"`);
        } else if (process.platform === 'linux') {
            exec(`aplay "${adhanPath}"`);
        } else if (process.platform === 'win32') {
            // PowerShell command to play sound
            exec(`powershell -c (New-Object Media.SoundPlayer "${adhanPath}").PlaySync()`);
        }
    } else {
        // Fallback beep
        process.stdout.write('\x07');
    }
};

const installDaemon = () => {
    if (process.platform !== 'darwin') {
        console.log(chalk.yellow('Daemon installation is currently only supported on macOS.'));
        console.log(chalk.gray('For Linux/Windows, please use pm2 or systemd manually.'));
        return;
    }

    const plistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.aya.watch</string>
    <key>ProgramArguments</key>
    <array>
        <string>${process.execPath}</string>
        <string>${process.cwd()}/dist/index.js</string>
        <string>watch</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${process.env.HOME}/.aya/watch.log</string>
    <key>StandardErrorPath</key>
    <string>${process.env.HOME}/.aya/watch.error.log</string>
    <key>WorkingDirectory</key>
    <string>${process.cwd()}</string>
</dict>
</plist>`;

    const plistPath = path.join(process.env.HOME || '', 'Library', 'LaunchAgents', 'com.aya.watch.plist');
    
    try {
        fs.writeFileSync(plistPath, plistContent);
        console.log(chalk.green(`\n  ✅ Generated LaunchAgent at: ${plistPath}`));
        
        exec(`launchctl unload ${plistPath}`, () => {
            exec(`launchctl load ${plistPath}`, (err) => {
                if (err) {
                    console.error(chalk.red('  ❌ Failed to load LaunchAgent. You may need to run manually:'));
                    console.log(chalk.yellow(`  launchctl load ${plistPath}`));
                } else {
                    console.log(chalk.green('  🚀 Daemon started successfully!'));
                }
                process.exit(0);
            });
        });
    } catch (e) {
        console.error(chalk.red('  ❌ Failed to write plist file. Check permissions.'));
    }
};

export const watchCommand = new Command('watch')
  .description('Start the Prayer Times Daemon (Watcher)')
  .option('-i, --install', 'Install as a background service (Daemon) on macOS')
  .action(async (options) => {
    printCommandHeader('watch');
    
    if (options.install) {
        installDaemon();
        return; 
    }

    console.log(chalk.cyan.bold('\n  aya Prayer Watcher'));
    console.log(chalk.gray('  --------------------------------------------------'));
    console.log(chalk.white('  Running in foreground. Keep this terminal open.'));
    console.log(chalk.gray('  To run in background (Daemon mode):'));
    console.log(chalk.yellow('    aya watch --install'));
    console.log(chalk.gray('    (or use pm2: pm2 start aya -- watch)'));
    console.log(chalk.gray('  --------------------------------------------------'));
    console.log(chalk.gray('  Checks prayer times every minute and notifies you.'));
    console.log(chalk.gray('  Add custom adhan sound at: ~/.aya/adhan.mp3'));

    const config = getConfig();
    if (!config.location?.city || !config.location?.country) {
        console.error(chalk.red('Please run "aya init" first to set your location.'));
        process.exit(1);
    }

    let todaysTimings: any = null;
    let lastFetched = '';

    const checkPrayers = async () => {
        const now = new Date();
        const todayKey = now.toISOString().split('T')[0];
        const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        // 1. Refresh Timings if new day or not loaded
        if (lastFetched !== todayKey || !todaysTimings) {
            try {
                const city = config.location?.city || '';
                const country = config.location?.country || '';
                
                if (!city || !country) {
                     console.error(chalk.red(`[${currentTime}] Location not set. Exiting.`));
                     process.exit(1);
                }

                const data = await getPrayerTimes(city, country, config.calculationMethod || 2, config.madhab || 0);
                todaysTimings = data.timings;
                lastFetched = todayKey;
                console.log(chalk.green(`[${currentTime}] Loaded prayer times for ${city}.`));
            } catch (e) {
                console.error(chalk.red(`[${currentTime}] Failed to fetch prayer times. Retrying later.`));
                return;
            }
        }

        // 2. Check for Prayer Time Match
        if (todaysTimings) {
            // We need to check exact match for minute
            // API returns "18:45" or "18:45 (EST)"
            Object.entries(todaysTimings).forEach(([prayer, timeStr]) => {
                if (prayer === 'Midnight' || prayer === 'LastThird' || prayer === 'Firstthird' || prayer === 'Imsak') return; // Skip non-obligatory for now
                
                const time = (timeStr as string).split(' ')[0];
                
                if (time === currentTime) {
                    // Send Notification
                    notifier.notify({
                        title: `It's time for ${prayer}`,
                        message: `Hayya 'ala-s-Salah. (Come to Prayer)`,
                        sound: 'Glass', // System notification sound
                        wait: true,
                        timeout: 10
                    });
                    
                    playSound();
                    
                    console.log(chalk.green.bold(`\n[${currentTime}] It is time for ${prayer}! Hayya 'ala-s-Salah.`));
                }
            });
        }
    };

    // Initial check
    await checkPrayers();

    // Schedule cron job (every minute)
    cron.schedule('* * * * *', async () => {
        await checkPrayers();
    });
  });
