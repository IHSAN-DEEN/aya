import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { format } from 'date-fns';
import { printCommandHeader } from '../utils/printer';

export const hijriCommand = new Command('hijri')
  .description('Date Converter (Gregorian <-> Hijri)')
  .option('-d, --date <date>', 'Date to convert (DD-MM-YYYY)')
  .action(async (options) => {
    printCommandHeader('hijri');
    const spinner = ora('Converting date...').start();
    
    try {
      const today = new Date();
      const dateStr = options.date || format(today, 'dd-MM-yyyy');
      
      // Use Aladhan API for accurate conversion based on sighting adjustment if needed
      const response = await axios.get(`http://api.aladhan.com/v1/gToH/${dateStr}`);
      const data = response.data.data;
      const hijri = data.hijri;
      const gregorian = data.gregorian;

      spinner.stop();

      console.clear();
      console.log(chalk.green.bold('\n  Islamic Date Converter'));
      console.log(chalk.gray('----------------------------------------'));
      
      console.log(chalk.white('Gregorian: ') + chalk.bold(`${gregorian.day} ${gregorian.month.en} ${gregorian.year}`));
      console.log(chalk.yellow('Hijri:     ') + chalk.bold(`${hijri.day} ${hijri.month.en} ${hijri.year}`));
      console.log(chalk.gray(`(${hijri.month.ar})`));
      
      console.log('');
      console.log(chalk.cyan(`Weekday:   ${hijri.weekday.en} (${hijri.weekday.ar})`));
      console.log('');
      
    } catch (error) {
      spinner.fail('Conversion failed.');
      console.log(chalk.red('Please ensure date format is DD-MM-YYYY'));
    }
  });
