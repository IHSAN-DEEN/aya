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
        { type: 'input', name: 'country', message: 'Enter your country:', default: config.location?.country }
      ]);
      config.location = { city: answers.city, country: answers.country };
      setConfig(config);
    }

    const { city, country } = config.location;
    const spinner = ora(`Fetching prayer times for ${city}, ${country}...`).start();

    try {
      const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
          city,
          country,
          method: 2 // ISNA (can be configurable later)
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
