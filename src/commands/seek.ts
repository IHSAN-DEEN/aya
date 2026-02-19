import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { searchData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const seekCommand = new Command('seek')
  .description('Contextual Quranic Search')
  .action(async () => {
    printCommandHeader('seek');
    const { topic } = await inquirer.prompt([{
      type: 'list',
      name: 'topic',
      message: 'What topic are you looking for?',
      choices: searchData.map(s => s.keyword)
    }]);

    const data = searchData.find(s => s.keyword === topic);
    if (data) {
      console.log(chalk.blue.bold(`\n  Topic: ${data.keyword}`));
      console.log(chalk.green(`  Ayah: ${data.ayah}`));
      console.log(chalk.white(`  Context (The "Why"): ${data.context}\n`));
    }
  });
