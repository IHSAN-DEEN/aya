import { Command } from 'commander';
import chalk from 'chalk';
import { fridayData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const fridayCommand = new Command('friday')
  .description('The Jumu\'ah Manager')
  .action(() => {
    printCommandHeader('friday');
    console.log(chalk.cyan.bold('\n  Friday (Jumu\'ah) Checklist & Reflections\n'));

    fridayData.forEach((item) => {
      console.log(chalk.blue.bold(`  [ ] ${item.item}`));
      console.log(chalk.white(`      Significance: ${item.significance}`));
      console.log(chalk.gray(`      Deep Dive: ${item.nakNote}\n`));
    });
  });
