import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { mirrorData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const mirrorCommand = new Command('mirror')
  .description('The Quranic Personality Test')
  .action(async () => {
    printCommandHeader('mirror');
    console.clear();
    console.log(chalk.magenta.bold('\n  Aya Mirror: Finding Yourself in the Text'));
    console.log(chalk.gray('"The Quran reads you while you read it."\n'));

    // Loop through questions
    for (const test of mirrorData) {
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: test.question,
        choices: test.options.map(o => ({
          name: o.label,
          value: o.label // Using label as key for simplicity
        }))
      }]);

      const result = test.options.find(o => o.label === answer.choice);

      if (result) {
        console.log(chalk.blue.bold(`\n  Result: ${result.result}`));
        console.log(chalk.green.italic(`  Prescription: ${result.prescription}`));
      }
      
      console.log(chalk.gray('\n----------------------------------------\n'));

      const { next } = await inquirer.prompt([{
        type: 'confirm',
        name: 'next',
        message: 'Continue reflecting?',
        default: true
      }]);

      if (!next) break;
      console.clear();
    }
    
    console.log(chalk.magenta('Reflection complete. May Allah guide our hearts.'));
  });
