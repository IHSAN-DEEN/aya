import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';

export const zakatCommand = new Command('zakat')
  .description('Simple Zakat Calculator (2.5% of Assets)')
  .action(async () => {
    printCommandHeader('zakat');
    console.clear();
    console.log(chalk.green.bold('\n  Zakat Calculator'));
    console.log(chalk.gray('Calculate your Zakat on savings and assets (2.5%)'));
    console.log(chalk.gray('Note: This is a simple calculator. Consult a scholar for complex assets.\n'));

    const answers = await inquirer.prompt([
      {
        type: 'number',
        name: 'cash',
        message: 'Cash on hand / Bank accounts:',
        default: 0
      },
      {
        type: 'number',
        name: 'gold',
        message: 'Value of Gold/Silver (if above Nisab):',
        default: 0
      },
      {
        type: 'number',
        name: 'investments',
        message: 'Stocks / Mutual Funds (Zakat-able portion):',
        default: 0
      },
      {
        type: 'number',
        name: 'business',
        message: 'Business Assets (Inventory/Cash):',
        default: 0
      },
      {
        type: 'number',
        name: 'debts',
        message: 'Debts due immediately (Deductible):',
        default: 0
      }
    ]);

    const totalAssets = (answers.cash || 0) + (answers.gold || 0) + (answers.investments || 0) + (answers.business || 0);
    const netAssets = totalAssets - (answers.debts || 0);
    
    // Nisab Threshold (Approximate)
    // Gold Nisab: 87.48 grams
    // Silver Nisab: 612.36 grams
    // Let's assume a rough currency value or just warn the user.
    // For now, we just calculate the amount.

    const zakatAmount = Math.max(0, netAssets * 0.025);

    console.log(chalk.gray('\n----------------------------------------'));
    console.log(chalk.white(`Total Assets:   ${totalAssets.toLocaleString()}`));
    console.log(chalk.white(`Deductible:    -${answers.debts.toLocaleString()}`));
    console.log(chalk.white.bold(`Net Worth:      ${netAssets.toLocaleString()}`));
    console.log(chalk.gray('----------------------------------------'));
    
    if (netAssets > 0) {
      console.log(chalk.green.bold(`\n  Zakat Due (2.5%): ${zakatAmount.toLocaleString()}`));
    } else {
      console.log(chalk.yellow.bold('\n  No Zakat due (Net worth is zero or negative).'));
    }
    
    console.log(chalk.gray('\n"Take, [O, Muhammad], from their wealth a charity by which you purify them..." (9:103)'));
    console.log('');
  });
