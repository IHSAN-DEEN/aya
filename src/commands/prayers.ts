import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import inquirer from 'inquirer';
import { getConfig, setConfig } from '../utils/config';
import { printCommandHeader } from '../utils/printer';

export const prayersCommand = new Command('prayers')
  .description('Show Prayer Times')
  .option('-c, --config', 'Configure location')
  .action(async (options) => {
    printCommandHeader('prayers');
    let config = getConfig();
    
    if (options.config || !config.location?.city || !config.location?.country) {
       const answers = await inquirer.prompt([
        { type: 'input', name: 'city', message: 'Enter your city:', default: config.location?.city },
        { type: 'input', name: 'country', message: 'Enter your country:', default: config.location?.country },
        {
            type: 'list',
            name: 'method',
            message: 'Calculation Method:',
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
      config.location = { city: answers.city, country: answers.country };
      config.calculationMethod = answers.method;
      setConfig(config);
    }

    const { city, country } = config.location;
    const method = config.calculationMethod || 2; // Default to ISNA if not set
    const spinner = ora(`Fetching prayer times for ${city}, ${country} (Method: ${method})...`).start();

    try {
      const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
          city,
          country,
          method
        }
      });
      
      spinner.stop();
      const timings = response.data.data.timings;
      const date = response.data.data.date.readable;
      const hijri = response.data.data.date.hijri;

      console.clear();
      console.log(chalk.green.bold(`\n  Prayer Times for ${city}, ${country}`));
      console.log(chalk.gray(`  ${date} | ${hijri.day} ${hijri.month.en} ${hijri.year}`));
      console.log(chalk.gray('----------------------------------------'));

      const prayers = [
        { name: 'Fajr', time: timings.Fajr, icon: '[FAJR]' },
        { name: 'Sunrise', time: timings.Sunrise, icon: '[SHRQ]' },
        { name: 'Dhuhr', time: timings.Dhuhr, icon: '[DHUR]' },
        { name: 'Asr', time: timings.Asr, icon: '[ASR ]' },
        { name: 'Maghrib', time: timings.Maghrib, icon: '[MAGH]' },
        { name: 'Isha', time: timings.Isha, icon: '[ISHA]' }
      ];

      prayers.forEach(p => {
        console.log(`${p.icon}  ${chalk.bold(p.name.padEnd(10))} ${chalk.cyan(p.time)}`);
      });
      console.log('');

    } catch (error) {
      spinner.fail('Failed to fetch prayer times.');
      console.error(chalk.red('Please check your internet connection or location settings.'));
    }
  });
