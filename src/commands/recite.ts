import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import ora from 'ora';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { printCommandHeader } from '../utils/printer';
import { getConfig } from '../utils/config';
import { surahMap } from '../data/surahs';

// Quran.com API
// https://api.quran.com/api/v4/chapter_recitations/{reciter_id}/{chapter_id}
// Reciter IDs (partial list):
// 7: Mishary Rashid Alafasy
// 3: Saud Al-Shuraim
// 1: AbdulBaset AbdulSamad (Murattal)
// 4: Mahmoud Khalil Al-Husary

export const RECITERS = [
    { name: 'Mishary Rashid Alafasy', id: 7 },
    { name: 'Saud Al-Shuraim', id: 3 },
    { name: 'AbdulBaset AbdulSamad', id: 1 },
    { name: 'Mahmoud Khalil Al-Husary', id: 4 },
];

export const reciteCommand = new Command('recite')
  .description('Listen to Quran Recitation')
  .argument('[surah]', 'Surah number (1-114)')
  .action(async (surahArg) => {
    printCommandHeader('recite');
    
    let surah = surahArg;

    // Resolve surah name if provided as string
    if (surah && isNaN(parseInt(surah))) {
        const surahName = surah.toLowerCase().trim();
        // Exact match first
        if (surahMap[surahName]) {
            surah = surahMap[surahName].toString();
        } else {
            // Partial match (keys are lowercase)
            const match = Object.keys(surahMap).find(key => key.includes(surahName));
            if (match) {
                surah = surahMap[match].toString();
                // Capitalize first letter of match for display
                const displayName = match.charAt(0).toUpperCase() + match.slice(1);
                console.log(chalk.gray(`Found Surah: ${displayName} (#${surah})`));
            } else {
                console.log(chalk.red(`Surah "${surahArg}" not found.`));
                console.log(chalk.yellow('Please enter a valid Surah number (1-114) or name.'));
                return;
            }
        }
    }
    
    // Ensure surah is a string if it was a number but passed as string arg
    if (surah) {
        surah = surah.toString();
    }

    if (!surah) {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'surah',
                message: 'Enter Surah number (1-114):',
                validate: (input) => {
                    const num = parseInt(input);
                    return num >= 1 && num <= 114 ? true : 'Please enter a valid Surah number.';
                }
            }
        ]);
        surah = answer.surah;
    }

    const config = getConfig();
    const { reciterId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'reciterId',
            message: 'Select Reciter:',
            default: config.preferredReciter || 7,
            choices: RECITERS.map(r => ({ name: r.name, value: r.id }))
        }
    ]);

    const CACHE_DIR = path.join(os.homedir(), '.aya', 'cache', 'quran');
    const cachedFile = path.join(CACHE_DIR, `${reciterId}_${surah}.mp3`);
    
    const spinner = ora('Checking cache...').start();

    // Check if file exists and has content
    if (fs.existsSync(cachedFile)) {
        try {
            const stats = fs.statSync(cachedFile);
            if (stats.size > 0) {
                spinner.succeed('Audio found in cache.');
                console.log(chalk.cyan(`Playing Surah ${surah}...`));
                console.log(chalk.gray('(Press Ctrl+C to stop)'));
                
                playAudio(cachedFile);
                return;
            } else {
                // Remove empty file
                fs.unlinkSync(cachedFile);
            }
        } catch (e) {
            // Ignore error, proceed to download
        }
    }

    spinner.text = 'Fetching audio URL...';
    
    try {
        if (!fs.existsSync(CACHE_DIR)) {
            fs.mkdirSync(CACHE_DIR, { recursive: true });
        }

        const response = await axios.get(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surah}`);
        const audioUrl = response.data.audio_file.audio_url;
        
        spinner.text = 'Downloading audio (this may take a moment)...';
        
        // Download to cache file
        const writer = fs.createWriteStream(cachedFile);
        
        const audioResponse = await axios({
            url: audioUrl,
            method: 'GET',
            responseType: 'stream'
        });

        audioResponse.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        spinner.succeed('Audio downloaded and cached.');
        console.log(chalk.cyan(`Playing Surah ${surah}...`));
        console.log(chalk.gray('(Press Ctrl+C to stop)'));

        // Play audio
        playAudio(cachedFile);

    } catch (error) {
        // Cleanup partial file
        if (fs.existsSync(cachedFile)) {
            try { fs.unlinkSync(cachedFile); } catch(e) {}
        }
        
        spinner.fail('Failed to fetch audio.');
        if (error instanceof Error) {
            console.error(chalk.red(error.message));
        }
    }
  });

export function getPlayCommand(filePath: string): string {
    const platform = os.platform();
    if (platform === 'darwin') return `afplay "${filePath}"`;
    if (platform === 'linux') return `mpg123 "${filePath}"`;
    if (platform === 'win32') return `start "" "${filePath}"`; // Basic windows support
    return `node -e "process.stdout.write('\x07')"`; // Beep as fallback
}

function playAudio(filePath: string) {
    const playCommand = getPlayCommand(filePath);
        
    const child = exec(playCommand, (error) => {
        if (error && !error.killed) {
            // If error wasn't caused by kill
            console.error(chalk.red(`Error playing audio: ${error.message}`));
        }
    });

    // Handle process termination to cleanup
    process.on('SIGINT', () => {
        child.kill();
        process.exit();
    });
}
