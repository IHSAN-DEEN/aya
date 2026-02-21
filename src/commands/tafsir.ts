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

    // 1. Initial Reference Setup
    if (query) {
        if (query.includes(':')) {
            const parts = query.split(':');
            surah = parseInt(parts[0]);
            ayah = parseInt(parts[1]);
        } else {
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

    // 2. Initial Edition Setup
    let { edition } = await inquirer.prompt([{
        type: 'list',
        name: 'edition',
        message: 'Select Tafsir/Translation Edition:',
        choices: [
            { name: 'Muhammad Asad (Deep Linguistic - Recommended)', value: 'en.asad' },
            { name: 'Yusuf Ali (Classic)', value: 'en.yusufali' },
            { name: 'Saheeh International (Standard)', value: 'en.sahih' },
            { name: 'Pickthall (Classic)', value: 'en.pickthall' },
            { name: 'Maududi (Tafhim al-Quran)', value: 'en.maududi' },
            { name: 'Ibn Kathir (Abridged)', value: 'en.ibnkathir' }
        ],
        default: 'en.asad'
    }]);

    // 3. Navigation Loop
    while (true) {
        const spinner = ora(`Fetching Tafsir for ${surah}:${ayah}...`).start();

        try {
            // Fetch Arabic and Selected Edition
            const response = await axios.get(`http://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,${edition}`);
            
            spinner.stop();

            const data = response.data.data;
            const arabic = data[0];
            const translation = data[1];

            console.clear();
            if (surah === 1 && ayah === 1) {
                printCommandHeader('tafsir');
            } else {
                console.log(chalk.green.bold(`\n  aya tafsir: ${surah}:${ayah}`));
                console.log(chalk.gray('  ----------------------------------------'));
            }

            console.log(chalk.green.bold(`\n  Surah ${arabic.surah.englishName} (${arabic.surah.name}) - Ayah ${arabic.numberInSurah}`));
            console.log(chalk.gray('  ----------------------------------------'));
            
            console.log(chalk.white.bold.bgBlack(`\n  ${arabic.text}  \n`));
            console.log(chalk.cyan.italic(`  "${translation.text}"`));
            console.log(chalk.gray(`  — ${translation.edition.name} (${translation.edition.englishName})`));
            
            console.log(chalk.gray('\n  ----------------------------------------'));
            
            // Navigation Menu
            const { action } = await inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'Action:',
                choices: [
                    { name: 'Next Ayah', value: 'next' },
                    { name: 'Previous Ayah', value: 'prev' },
                    { name: 'Add Reflection (Tadabbur)', value: 'reflect' },
                    { name: 'Change Edition', value: 'edition' },
                    { name: 'Jump to Ayah', value: 'jump' },
                    { name: 'Exit', value: 'exit' }
                ]
            }]);

            if (action === 'next') {
                ayah++;
                // TODO: Check if next ayah exists? We'll rely on API 404.
            } else if (action === 'prev') {
                if (ayah > 1) ayah--;
                else {
                    console.log(chalk.yellow('  This is the first Ayah of the Surah.'));
                    await new Promise(r => setTimeout(r, 1500));
                }
            } else if (action === 'reflect') {
                 console.log(chalk.yellow('  Reflection (Tadabbur):'));
                 console.log(chalk.gray('  Take a moment to reflect on this Ayah. What is Allah telling you specifically today?'));
                 
                 const { reflection } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'reflection',
                        message: 'Write a brief reflection:'
                    }
                ]);

                if (reflection) {
                    logger.logReflection(surah, ayah, reflection);
                    console.log(chalk.green('\n  Reflection recorded. May it weigh heavy on your scales.'));
                    await new Promise(r => setTimeout(r, 1500));
                }
            } else if (action === 'edition') {
                const { newEdition } = await inquirer.prompt([{
                    type: 'list',
                    name: 'newEdition',
                    message: 'Select Tafsir/Translation Edition:',
                    choices: [
                        { name: 'Muhammad Asad (Deep Linguistic - Recommended)', value: 'en.asad' },
                        { name: 'Yusuf Ali (Classic)', value: 'en.yusufali' },
                        { name: 'Saheeh International (Standard)', value: 'en.sahih' },
                        { name: 'Pickthall (Classic)', value: 'en.pickthall' },
                        { name: 'Maududi (Tafhim al-Quran)', value: 'en.maududi' },
                        { name: 'Ibn Kathir (Abridged)', value: 'en.ibnkathir' }
                    ],
                    default: edition
                }]);
                edition = newEdition;
            } else if (action === 'jump') {
                const { ref } = await inquirer.prompt([{
                    type: 'input',
                    name: 'ref',
                    message: 'Enter Surah:Ayah (e.g., 93:3):'
                }]);
                if (ref.includes(':')) {
                    const parts = ref.split(':');
                    surah = parseInt(parts[0]);
                    ayah = parseInt(parts[1]);
                }
            } else {
                break;
            }

        } catch (error: any) {
            spinner.stop(); 
            
            if (error.response && error.response.status === 404) {
                console.log(chalk.red('\n  Ayah not found (End of Surah?).'));
                console.log(chalk.gray(`  Reference (${surah}:${ayah}) does not exist.`));
                
                // Allow user to go back or jump
                const { recover } = await inquirer.prompt([{
                    type: 'list',
                    name: 'recover',
                    message: 'What would you like to do?',
                    choices: [
                        { name: 'Go Back (Previous Ayah)', value: 'back' },
                        { name: 'Jump to new Surah', value: 'jump' },
                        { name: 'Exit', value: 'exit' }
                    ]
                }]);

                if (recover === 'back') {
                    ayah = Math.max(1, ayah - 1);
                } else if (recover === 'jump') {
                     const { ref } = await inquirer.prompt([{
                        type: 'input',
                        name: 'ref',
                        message: 'Enter Surah:Ayah (e.g., 1:1):'
                    }]);
                    if (ref.includes(':')) {
                        const parts = ref.split(':');
                        surah = parseInt(parts[0]);
                        ayah = parseInt(parts[1]);
                    }
                } else {
                    break;
                }
            } else {
                console.error(chalk.red('\n  Failed to fetch data. Please check your internet connection.'));
                break;
            }
        }
    }
  });
