import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { sabrData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const sabrCommand = new Command('sabr')
  .description('The Patience Diagnostic')
  .action(async () => {
    printCommandHeader('sabr');
    const { situation } = await inquirer.prompt([{
      type: 'list',
      name: 'situation',
      message: 'What are you struggling with?',
      choices: sabrData.map(s => ({
        name: `${s.type} (${s.arabic})`,
        value: s.type
      }))
    }]);

    const data = sabrData.find(s => s.type === situation);
    if (data) {
      console.log(chalk.blue.bold(`\n  Diagnosis: ${data.type} (${data.arabic})`));
      console.log(chalk.white(`  Definition: ${data.description}`));
      console.log(chalk.gray(`  Example: ${data.example}`));
      console.log(chalk.green('\n  Prescription: "Indeed, Allah is with the patient." (2:153)\n'));
    }
  });
