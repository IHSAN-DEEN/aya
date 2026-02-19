import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';

export const investCommand = new Command('invest')
  .description('Sadaqah Calculator (The Infinite ROI)')
  .action(async () => {
    printCommandHeader('invest');
    const { amount } = await inquirer.prompt([{
      type: 'number',
      name: 'amount',
      message: 'Enter amount to invest (Sadaqah):'
    }]);

    console.log(chalk.yellow.bold(`\n  Investment Analysis for $${amount}`));
    console.log(chalk.white('\n  Guarantor: The Lord of the Worlds'));
    console.log(chalk.green('  Multiplier: 700x to Infinity (Surah Al-Baqarah 2:261)'));
    console.log(chalk.blue(`  Minimum Return (Hereafter): ${amount * 700} deeds`));
    console.log(chalk.cyan('  Risk Factor: 0% ("Charity does not decrease wealth")'));
    console.log(chalk.gray('\n  "Who is it that would loan Allah a goodly loan so He may multiply it for him many times over?" (2:245)\n'));
  });
