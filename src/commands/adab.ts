import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { adabData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const adabCommand = new Command('adab')
  .description('The Manners Engine (Relationships)')
  .action(async () => {
    printCommandHeader('adab');
    const { relation } = await inquirer.prompt([{
      type: 'list',
      name: 'relation',
      message: 'Select a relationship to improve:',
      choices: adabData.map(r => r.relation)
    }]);

    const data = adabData.find(r => r.relation === relation);
    if (data) {
      console.log(chalk.blue.bold(`\n  Relationship: ${data.relation}`));
      console.log(chalk.yellow(`  Quranic Keyword: ${data.arabicKeyword} (${data.meaning})`));
      console.log(chalk.white(`  Practice: ${data.practice}\n`));
    }
  });
