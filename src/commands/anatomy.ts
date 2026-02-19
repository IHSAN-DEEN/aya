import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { anatomyData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const anatomyCommand = new Command('anatomy')
  .description('The Spiritual Function of Body Parts')
  .action(async () => {
    printCommandHeader('anatomy');
    const { part } = await inquirer.prompt([{
      type: 'list',
      name: 'part',
      message: 'Select a body part to understand its spiritual role:',
      choices: anatomyData.map(p => p.part)
    }]);

    const data = anatomyData.find(p => p.part === part);
    if (data) {
      console.log(chalk.blue.bold(`\n  ${data.part} (${data.arabic})`));
      console.log(chalk.white(`  Function: ${data.function}`));
      console.log(chalk.green(`  Spiritual Role: ${data.spiritualRole}`));
      console.log(chalk.gray(`\n  Reflection:\n  ${data.reflection}\n`));
    }
  });
