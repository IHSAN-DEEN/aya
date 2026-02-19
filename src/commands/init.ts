import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { setConfig, getConfig } from '../utils/config';
import { printCommandHeader } from '../utils/printer';

export const initCommand = new Command('init')
  .description('Set your intention (niyyah) for this session')
  .action(async () => {
    printCommandHeader('init');
    const config = getConfig();

    console.log(chalk.green('Bismillah. Let us begin with the right intention.'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: config.name || 'Abdullah'
      },
      {
        type: 'input',
        name: 'intention',
        message: 'What is your intention for this session?',
        default: config.intention || 'Seeking the pleasure of Allah through code'
      },
      {
        type: 'input',
        name: 'city',
        message: 'Where are you located (City)?',
        default: config.location?.city || 'Mecca'
      },
      {
        type: 'input',
        name: 'country',
        message: 'Where are you located (Country)?',
        default: config.location?.country || 'Saudi Arabia'
      }
    ]);

    setConfig({
      name: answers.name,
      intention: answers.intention,
      location: {
        city: answers.city,
        country: answers.country
      }
    });

    console.log(chalk.cyan(`\n✨ Intention set: "${answers.intention}"`));
    console.log(chalk.gray('May Allah accept your efforts and place Barakah in your code.'));
  });
