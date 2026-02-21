import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';
import { logger } from '../utils/logger';

export const zakatCommand = new Command('zakat')
  .description('Zakat Calculator with Live Nisab (Gold/Silver Prices)')
  .action(async () => {
    printCommandHeader('zakat');
    console.clear();
    console.log(chalk.green.bold('\n  Zakat Calculator (Live Nisab)'));

    // --- Hawl Reminder ---
    const history = logger.getZakatHistory();
    const lastHawl = history.filter((r: any) => r.isHawlStart).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    if (lastHawl) {
        const lastDate = new Date(lastHawl.date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const lunarYearDays = 354;
        
        if (diffDays >= lunarYearDays) {
             console.log(chalk.bgRed.white.bold(`\n  ⚠️  HAWL REACHED! It has been ${diffDays} days since your last Zakat cycle start (${lastDate.toLocaleDateString()}).  `));
             console.log(chalk.red(`  You should pay your Zakat now if you are still above Nisab.`));
        } else {
             console.log(chalk.cyan(`\n  ℹ️  Current Hawl Progress: Day ${diffDays} / ${lunarYearDays} (Started: ${lastDate.toLocaleDateString()})`));
        }
    }
    // ---------------------

    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            { name: 'Calculate New Zakat', value: 'calculate' },
            { name: 'View History', value: 'history' }
        ]
    }]);

    if (action === 'history') {
        if (history.length === 0) {
            console.log(chalk.yellow('\n  No Zakat history found.'));
            return;
        }

        console.log(chalk.cyan.bold('\n  Zakat Calculation History:'));
        console.log(chalk.gray('  ----------------------------------------------------------------'));
        console.log(chalk.gray('  Date          | Net Worth      | Nisab (Silver) | Zakat Due      | Type'));
        console.log(chalk.gray('  ----------------------------------------------------------------'));

        history.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
               .forEach((record: any) => {
                   const dateStr = new Date(record.date).toLocaleDateString();
                   const netStr = record.net.toLocaleString(undefined, {style: 'currency', currency: 'USD'}).padEnd(14);
                   const nisabStr = record.nisab.toLocaleString(undefined, {style: 'currency', currency: 'USD'}).padEnd(14);
                   const dueStr = record.due.toLocaleString(undefined, {style: 'currency', currency: 'USD'}).padEnd(14);
                   const typeStr = record.isHawlStart ? chalk.yellow('Hawl Start') : chalk.gray('Check');
                   
                   console.log(`  ${dateStr.padEnd(13)} | ${netStr} | ${nisabStr} | ${dueStr} | ${typeStr}`);
               });
        console.log(chalk.gray('  ----------------------------------------------------------------\n'));
        return;
    }

    console.log(chalk.gray('Fetching live Gold & Silver prices...'));

    const spinner = ora('Checking market rates...').start();
    let goldPricePerGram = 0;
    let silverPricePerGram = 0;

    try {
        // Fetch live rates
        // Gold: Binance PAXG/USDT (Paxos Gold, 1 troy oz backed)
        // Silver: CoinGecko Kinesis Silver (KAG, 1 troy oz backed)
        
        const [goldRes, silverRes] = await Promise.allSettled([
            axios.get('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT'),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=kinesis-silver&vs_currencies=usd')
        ]);

        // Process Gold
        if (goldRes.status === 'fulfilled') {
            const pricePerOunce = parseFloat(goldRes.value.data.price);
            goldPricePerGram = pricePerOunce / 31.1035;
        } else {
            goldPricePerGram = 165.00; // Fallback
        }

        // Process Silver
        if (silverRes.status === 'fulfilled') {
             // CoinGecko structure: { 'kinesis-silver': { usd: 123.45 } }
             const pricePerOunce = silverRes.value.data['kinesis-silver'].usd;
             silverPricePerGram = pricePerOunce / 31.1035;
        } else {
            silverPricePerGram = 2.75; // Fallback
        }

        spinner.succeed(chalk.green('Market Rates Loaded.'));

    } catch (e) {
        spinner.warn(chalk.yellow('Network error. Using estimates.'));
        if (goldPricePerGram === 0) goldPricePerGram = 165.00;
        if (silverPricePerGram === 0) silverPricePerGram = 2.75;
    }

    const nisabGold = 87.48 * goldPricePerGram;
    const nisabSilver = 612.36 * silverPricePerGram;
    
    // Usually the lower threshold (Silver) is used to benefit the poor, 
    // but Gold is common for currency. We will show both.
    
    console.log(chalk.gray('\n----------------------------------------'));
    console.log(chalk.white(`Current Gold Price:   $${goldPricePerGram.toFixed(2)} /g`));
    console.log(chalk.white(`Current Silver Price: $${silverPricePerGram.toFixed(2)} /g`));
    console.log(chalk.yellow(`Nisab (Gold Standard):    $${nisabGold.toLocaleString(undefined, {maximumFractionDigits: 2})}`));
    console.log(chalk.yellow(`Nisab (Silver Standard):  $${nisabSilver.toLocaleString(undefined, {maximumFractionDigits: 2})}`));
    console.log(chalk.gray('----------------------------------------\n'));

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
        message: 'Value of Gold/Silver owned:',
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
    const zakatAmount = Math.max(0, netAssets * 0.025);

    console.log(chalk.gray('\n----------------------------------------'));
    console.log(chalk.white(`Total Assets:   ${totalAssets.toLocaleString()}`));
    console.log(chalk.white(`Deductible:    -${answers.debts.toLocaleString()}`));
    console.log(chalk.white.bold(`Net Worth:      ${netAssets.toLocaleString()}`));
    console.log(chalk.gray('----------------------------------------'));
    
    if (netAssets >= nisabSilver) {
      console.log(chalk.green.bold(`\n  Zakat Due (2.5%): ${zakatAmount.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}`));
      if (netAssets < nisabGold) {
          console.log(chalk.yellow('  (Note: You are above the Silver Nisab but below Gold. Most scholars recommend paying.)'));
      }
    } else {
      console.log(chalk.yellow.bold('\n  No Zakat due (Below Nisab).'));
    }
    
    console.log(chalk.gray('\n"Take, [O, Muhammad], from their wealth a charity by which you purify them..." (9:103)'));
    console.log('');

    // --- Save History ---
    const { save } = await inquirer.prompt([{
        type: 'confirm',
        name: 'save',
        message: 'Save this calculation to history?',
        default: true
    }]);

    if (save) {
        const { isHawl } = await inquirer.prompt([{
            type: 'confirm',
            name: 'isHawl',
            message: 'Is this the start of a new Zakat year (Hawl)?',
            default: false
        }]);

        logger.logZakat({
            date: new Date().toISOString(),
            assets: totalAssets,
            debts: answers.debts,
            net: netAssets,
            nisab: nisabSilver, 
            due: zakatAmount,
            isHawlStart: isHawl
        });
        console.log(chalk.green('  Record saved. JazakAllah Khair.'));
    }
  });
