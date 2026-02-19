import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { duaData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const duaCommand = new Command('dua')
  .description('Prophetic Duas with Context & Backstory')
  .action(async () => {
    printCommandHeader('dua');
    const { situation } = await inquirer.prompt([{
      type: 'list',
      name: 'situation',
      message: 'What are you feeling / facing?',
      choices: duaData.map(d => ({ name: d.situation, value: d }))
    }]);

    displayDua(situation);
  });

function displayDua(dua: any) {
  console.clear();
  console.log(chalk.yellow.bold(`\n  The Dua of ${dua.prophet}`));
  console.log(chalk.gray(`  Situation: ${dua.situation}\n`));
  
  console.log(chalk.cyan.bold('  The Backstory (Context):'));
  console.log(chalk.white(`  ${dua.context}\n`));
  
  console.log(chalk.green.bold(`  "${dua.arabic}"`));
  console.log(chalk.white.italic(`  "${dua.translation}"\n`));
  
  console.log(chalk.magenta.bold('  The Gem:'));
  console.log(chalk.white(`  ${dua.gem}\n`));
}