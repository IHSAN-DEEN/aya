import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { setConfig, getConfig } from '../utils/config';
import { printCommandHeader } from '../utils/printer';
import { RECITERS } from './recite';

export const initCommand = new Command('init')
  .description('Set your intention (niyyah) and configure the CLI')
  .action(async () => {
    printCommandHeader('init');
    const config = getConfig();

    console.log(chalk.green('Bismillah. Let us begin with the right intention.'));
    
    // 1. Basic Info
    const basicAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: config.name || 'Abdullah'
      },
      {
        type: 'input',
        name: 'intention',
        message: 'What is your intention for this session?',
        default: config.intention || 'Seeking the pleasure of Allah through code'
      }
    ]);

    // 2. Location Validation
    let validLocation = false;
    let city = config.location?.city || 'Mecca';
    let country = config.location?.country || 'Saudi Arabia';

    while (!validLocation) {
        const locationAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'city',
                message: 'Where are you located (City)?',
                default: city
            },
            {
                type: 'input',
                name: 'country',
                message: 'Where are you located (Country)?',
                default: country
            }
        ]);

        city = locationAnswers.city;
        country = locationAnswers.country;

        const spinner = ora('Verifying location...').start();
        try {
            // Use Aladhan API to check if we get times for this location
            await axios.get('http://api.aladhan.com/v1/timingsByCity', {
                params: { city, country, method: 2 }
            });
            spinner.succeed(chalk.green(`Location confirmed: ${city}, ${country}`));
            validLocation = true;
        } catch (error) {
            spinner.fail(chalk.red('Could not verify location. Please try again.'));
        }
    }

    // 3. Calculation Method
    const methodAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'method',
            message: 'Which prayer time calculation method do you follow?',
            default: config.calculationMethod || 2,
            choices: [
                { name: 'University of Islamic Sciences, Karachi', value: 1 },
                { name: 'Islamic Society of North America (ISNA)', value: 2 },
                { name: 'Muslim World League', value: 3 },
                { name: 'Umm al-Qura University, Makkah', value: 4 },
                { name: 'Egyptian General Authority of Survey', value: 5 },
                { name: 'Institute of Geophysics, University of Tehran', value: 7 },
                { name: 'Gulf Region', value: 8 },
                { name: 'Kuwait', value: 9 },
                { name: 'Qatar', value: 10 },
                { name: 'Majlis Ugama Islam Singapura, Singapore', value: 11 },
                { name: 'Union Organization islamic de France', value: 12 },
                { name: 'Diyanet Isleri Baskanligi, Turkey', value: 13 },
                { name: 'Spiritual Administration of Muslims of Russia', value: 14 }
            ]
        }
    ]);

    // 3.5 Madhab (Asr Calculation)
    const madhabAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'madhab',
            message: 'Which Madhab do you follow for Asr prayer?',
            default: config.madhab || 0,
            choices: [
                { name: 'Standard (Shafi, Maliki, Hanbali) - Asr = 1x shadow', value: 0 },
                { name: 'Hanafi - Asr = 2x shadow', value: 1 }
            ]
        }
    ]);

    // 4. Preferred Reciter
    const reciterAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'reciter',
            message: 'Who is your preferred Quran reciter?',
            default: config.preferredReciter || 7, // Default to Mishary (7)
            choices: RECITERS.map(r => ({ name: r.name, value: r.id }))
        }
    ]);

    // 5. Notifications
    const notificationAnswer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'notifications',
            message: 'Would you like to enable desktop notifications for prayers?',
            default: config.notifications !== undefined ? config.notifications : true
        }
    ]);

    setConfig({
      name: basicAnswers.name,
      intention: basicAnswers.intention,
      location: { city, country },
      calculationMethod: methodAnswer.method,
      madhab: madhabAnswer.madhab,
      preferredReciter: reciterAnswer.reciter,
      notifications: notificationAnswer.notifications
    });

    console.log(chalk.cyan(`\n✨ Intention set: "${basicAnswers.intention}"`));
    console.log(chalk.gray('May Allah accept your efforts and place Barakah in your code.'));
  });
