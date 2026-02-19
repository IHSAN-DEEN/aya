import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { natureData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const natureCommand = new Command('nature')
  .description('Tadabbur in Creation')
  .action(async () => {
    printCommandHeader('nature');
    const { sign } = await inquirer.prompt([{
      type: 'list',
      name: 'sign',
      message: 'Select a sign of creation to reflect upon:',
      choices: natureData.map(n => n.name)
    }]);

    const data = natureData.find(n => n.name === sign);
    if (data) {
      console.log(chalk.green(data.ascii));
      console.log(chalk.blue.bold(`\n  ${data.name} (${data.ayah})`));
      console.log(chalk.white(`\n  ${data.reflection}\n`));
    }
  });
