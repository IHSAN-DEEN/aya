import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { namesData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const namesCommand = new Command('names')
  .description('The 99 Names of Allah with Linguistic Nuance')
  .action(async () => {
    printCommandHeader('names');
    const { mode } = await inquirer.prompt([{
      type: 'list',
      name: 'mode',
      message: 'Select a mode:',
      choices: [
        { name: 'Random Gem', value: 'random' },
        { name: 'Browse All', value: 'browse' }
      ]
    }]);

    if (mode === 'random') {
      const gem = namesData[Math.floor(Math.random() * namesData.length)];
      displayName(gem);
    } else {
      const { name } = await inquirer.prompt([{
        type: 'list',
        name: 'name',
        message: 'Select a Name:',
        choices: namesData.map(n => ({ name: `${n.transliteration} - ${n.translation}`, value: n }))
      }]);
      displayName(name);
    }
  });

function displayName(gem: any) {
  console.clear();
  console.log(chalk.yellow.bold(`\n  ${gem.arabic}  `));
  console.log(chalk.white.bold(`  ${gem.transliteration}`));
  console.log(chalk.gray(`  ${gem.translation}\n`));
  
  console.log(chalk.cyan.bold('  Linguistic Nuance:'));
  console.log(chalk.white(`  ${gem.linguisticNuance}\n`));
  
  console.log(chalk.green.bold('  Reflection:'));
  console.log(chalk.white.italic(`  ${gem.reflection}\n`));
}