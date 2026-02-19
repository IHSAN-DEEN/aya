import { Command } from 'commander';
import chalk from 'chalk';
import { sunnahData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const sunnahCommand = new Command('sunnah')
  .description('Daily Micro-Ibadaat Habits')
  .action(async () => {
    printCommandHeader('sunnah');
    console.clear();
    console.log(chalk.green.bold('\n  Daily Sunnah Habits (Micro-Ibadaat)\n'));
    
    sunnahData.forEach(s => {
      console.log(chalk.yellow.bold(`  ${s.action} `) + chalk.gray(`(${s.category})`));
      console.log(chalk.cyan(`  Impact: ${s.impact}`));
      console.log(chalk.white.italic(`  ${s.description}\n`));
    });
    
    console.log(chalk.gray('  "He who revives my Sunnah has loved me..."'));
    console.log('\n');
  });