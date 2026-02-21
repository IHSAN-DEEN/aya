import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';
import { logger } from '../utils/logger';

export const tafsirCommand = new Command('tafsir')
  .description('Interactive linguistic deep dive (Tadabbur)')
  .argument('[query]', 'The specific surah/ayah to study (e.g. 1:1, 93:3)')
  .action(async (query) => {
    printCommandHeader('tafsir');

    let surah = 1;
    let ayah = 1;

    if (query) {
        if (query.includes(':')) {
            const parts = query.split(':');
            surah = parseInt(parts[0]);
            ayah = parseInt(parts[1]);
        } else {
            // Try to find surah by name? Too complex for now, default to 1:1
            console.log(chalk.yellow('Invalid format. Using default 1:1 (Al-Fatiha). Use format SURAH:AYAH (e.g., 93:3)'));
        }
    } else {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'ref',
                message: 'Enter Surah:Ayah (e.g., 1:1, 112:1):',
                default: '1:1'
            }
        ]);
        const parts = answers.ref.split(':');
        surah = parseInt(parts[0]);
        ayah = parseInt(parts[1]);
    }

    if (isNaN(surah) || isNaN(ayah)) {
        console.log(chalk.red('Invalid reference.'));
        return;
    }

    const spinner = ora(`Fetching Tafsir for ${surah}:${ayah}...`).start();

    try {
        // Fetch Arabic, Translation (Asad), and Tafsir (Ibn Kathir - or similar if available, using simple translation for now as "Tafsir")
        // Using AlQuran Cloud API
        const response = await axios.get(`http://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.asad`);
        
        spinner.stop();

        const data = response.data.data;
        const arabic = data[0];
        const translation = data[1];

        console.clear();
        console.log(chalk.green.bold(`\n  Surah ${arabic.surah.englishName} (${arabic.surah.name}) - Ayah ${arabic.numberInSurah}`));
        console.log(chalk.gray('  ----------------------------------------'));
        
        console.log(chalk.white.bold.bgBlack(`\n  ${arabic.text}  \n`));
        console.log(chalk.cyan.italic(`  "${translation.text}"`));
        
        console.log(chalk.gray('\n  ----------------------------------------'));
        console.log(chalk.yellow('  Reflection (Tadabbur):'));
        console.log(chalk.gray('  Take a moment to reflect on this Ayah. What is Allah telling you specifically today?'));
        
        // Simple interactive reflection
        const { reflection } = await inquirer.prompt([
            {
                type: 'input',
                name: 'reflection',
                message: 'Write a brief reflection (optional):'
            }
        ]);

        if (reflection) {
            logger.logReflection(surah, ayah, reflection);
            console.log(chalk.green('\n  Reflection recorded. May it weigh heavy on your scales.'));
        }

        console.log(chalk.green('\n  May Allah increase you in knowledge.'));

    } catch (error) {
        spinner.fail('Failed to fetch data.');
        console.error(chalk.red('Please check your internet connection or the Ayah reference.'));
    }
  });
