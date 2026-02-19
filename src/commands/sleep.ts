import { Command } from 'commander';
import chalk from 'chalk';
import { sleepData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const sleepCommand = new Command('sleep')
  .description('The Minor Death (Sleep Adhkar)')
  .action(async () => {
    printCommandHeader('sleep');
    console.clear();
    console.log(chalk.blue.bold('\n  The Minor Death (An-Nawm)\n'));
    console.log(chalk.gray('  "Allah takes the souls at the time of their death, and those that do not die [He takes] during their sleep." (39:42)\n'));
    
    sleepData.forEach(s => {
      console.log(chalk.yellow.bold(`  ${s.title}`));
      console.log(chalk.green(`  "${s.arabic}"`));
      console.log(chalk.white(`  "${s.translation}"`));
      console.log(chalk.cyan.italic(`  Reflection: ${s.reflection}\n`));
    });
    
    console.log(chalk.gray('  Good night. Reset your intentions for the resurrection (tomorrow).'));
    console.log('\n');
  });