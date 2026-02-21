import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';
import axios from 'axios';
import ora from 'ora';
import { exec } from 'child_process';
import { printCommandHeader } from '../utils/printer';

const ADHAN_PRESETS = [
    { name: 'Makkah (Sheikh Ali Mulla)', url: 'https://archive.org/download/athany-data/Makkah.mp3' }, 
    { name: 'Madinah (Sheikh Essam Bukhari)', url: 'https://archive.org/download/adhans_sunnah/adhan_madina.mp3' },
    { name: 'Al-Aqsa', url: 'https://archive.org/download/athany-data/Alaqsa.mp3' },
    { name: 'Mishary Rashid Alafasy', url: 'https://cdn.aladhan.com/audio/adhans/a7.mp3' }
];

const ADHAN_FILE = path.join(os.homedir(), '.aya', 'adhan.mp3');

export const configCommand = new Command('config')
    .description('Configure Aya CLI settings')
    .action(async () => {
        printCommandHeader('config');
        
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to configure?',
                choices: [
                    { name: 'Adhan Sound', value: 'adhan' },
                    { name: 'Location (Reset)', value: 'location' },
                    { name: 'Calculation Method', value: 'method' }
                ]
            }
        ]);

        if (action === 'adhan') {
            await configureAdhan();
        } else if (action === 'location') {
            // Re-run init logic (simplified)
            console.log(chalk.yellow('Please run `aya init` to reset location.'));
        } else if (action === 'method') {
             console.log(chalk.yellow('Please run `aya init` to reset method.'));
        }
    });

async function configureAdhan() {
    console.log(chalk.cyan.bold('\n  Adhan Sound Configuration'));
    console.log(chalk.gray(`  Current file: ${ADHAN_FILE}`));
    if (fs.existsSync(ADHAN_FILE)) {
        console.log(chalk.green('  Status: Custom Adhan set ✅'));
    } else {
        console.log(chalk.yellow('  Status: Default/None (System Beep)'));
    }
    console.log('');

    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose an option:',
            choices: [
                ...ADHAN_PRESETS.map((p, i) => ({ name: p.name, value: i })),
                { name: 'Custom File (Path)', value: 'custom' },
                { name: 'Disable (Delete custom)', value: 'disable' }
            ]
        }
    ]);

    if (choice === 'disable') {
        if (fs.existsSync(ADHAN_FILE)) fs.unlinkSync(ADHAN_FILE);
        console.log(chalk.green('Custom Adhan removed.'));
        return;
    }

    if (choice === 'custom') {
        const { filePath } = await inquirer.prompt([
            { type: 'input', name: 'filePath', message: 'Enter full path to MP3 file:' }
        ]);
        if (fs.existsSync(filePath)) {
            fs.copyFileSync(filePath, ADHAN_FILE);
            console.log(chalk.green('Adhan set successfully!'));
        } else {
            console.log(chalk.red('File not found.'));
        }
        return;
    }

    // Preset
    const preset = ADHAN_PRESETS[choice];
    
    // Preview
    const { preview } = await inquirer.prompt([
        { type: 'confirm', name: 'preview', message: `Preview "${preset.name}"?`, default: true }
    ]);

    if (preview) {
        await playPreview(preset.url);
    }
    
    const { confirm } = await inquirer.prompt([
        { type: 'confirm', name: 'confirm', message: 'Set this as your Adhan?', default: true }
    ]);
    
    if (!confirm) return;

    const spinner = ora(`Downloading ${preset.name}...`).start();
    try {
        const writer = fs.createWriteStream(ADHAN_FILE);
        const response = await axios({
            url: preset.url,
            method: 'GET',
            responseType: 'stream'
        });
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        spinner.succeed('Adhan downloaded and set successfully!');
    } catch (e) {
        spinner.fail('Download failed.');
    }
}

async function playPreview(url: string) {
    const spinner = ora('Playing preview...').start();
    const tempFile = path.join(os.tmpdir(), 'adhan_preview.mp3');
    
    try {
         const writer = fs.createWriteStream(tempFile);
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream'
        });
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        
        spinner.text = 'Playing... (Ctrl+C to stop)';
        
        let playCmd = '';
         switch (process.platform) {
            case 'darwin': playCmd = `afplay "${tempFile}"`; break;
            case 'linux': playCmd = `mpg123 "${tempFile}"`; break; // or aplay
            case 'win32': playCmd = `powershell -c (New-Object Media.SoundPlayer "${tempFile}").PlaySync()`; break;
            default: playCmd = `open "${tempFile}"`;
        }

        await new Promise((resolve) => {
            const child = exec(playCmd, (err) => {
                resolve(null);
            });
            
            // Allow stopping with Ctrl+C but just for preview
            // process.on('SIGINT', ...) // tricky in async function within inquirer flow
        });
        spinner.succeed('Preview finished.');
    } catch (e: any) {
        spinner.fail(`Preview failed: ${e.message}`);
    } finally {
        if (fs.existsSync(tempFile)) fs.unlink(tempFile, () => {});
    }
}
