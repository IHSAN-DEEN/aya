import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';
import { getHijriDate } from '../utils/hijri';
import { getIslamicEvent } from '../data/events';

export const hijriCommand = new Command('hijri')
  .description('Date Converter (Gregorian <-> Hijri)')
  .option('-d, --date <date>', 'Date to convert (DD-MM-YYYY)')
  .action(async (options) => {
    printCommandHeader('hijri');
    const spinner = ora('Converting date...').start();
    
    try {
      let dateToConvert: Date;
      if (options.date) {
        // Parse DD-MM-YYYY
        const [d, m, y] = options.date.split('-').map(Number);
        dateToConvert = new Date(y, m - 1, d);
      } else {
        dateToConvert = new Date();
      }
      
      const data = await getHijriDate(dateToConvert);
      const hijri = data.hijri;
      const gregorian = data.gregorian;

      // Determine Event/Action
      const dayNum = parseInt(hijri.day, 10);
      const monthNum = hijri.month.number;
      const weekdayEn = gregorian.weekday.en;
      
      const islamicEvent = getIslamicEvent(dayNum, monthNum, weekdayEn);

      spinner.stop();

      console.clear();
      console.log(chalk.green.bold('\n  Islamic Date Converter'));
      console.log(chalk.gray('----------------------------------------'));
      
      console.log(chalk.white('Gregorian: ') + chalk.bold(`${gregorian.day} ${gregorian.month.en} ${gregorian.year}`));
      console.log(chalk.yellow('Hijri:     ') + chalk.bold(`${hijri.day} ${hijri.month.en} ${hijri.year}`));
      console.log(chalk.gray(`(${hijri.month.ar})`));
      
      console.log('');
      console.log(chalk.cyan(`Weekday:   ${hijri.weekday.en} (${hijri.weekday.ar})`));

      if (islamicEvent) {
        console.log('');
        console.log(chalk.magenta('Event:     ') + chalk.white(islamicEvent.event));
        console.log(chalk.green('Action:    ') + chalk.white(islamicEvent.action));
      } else {
         // Default generic action if no specific event
         console.log('');
         console.log(chalk.green('Action:    ') + chalk.gray('Make the most of this blessed day.'));
      }

      console.log('');
      
    } catch (error) {
      spinner.fail('Conversion failed.');
      console.log(chalk.red('Please ensure date format is DD-MM-YYYY or check network.'));
    }
  });
