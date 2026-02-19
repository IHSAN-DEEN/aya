import { Command } from 'commander';
import chalk from 'chalk';
import { wuduData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const wuduCommand = new Command('wudu')
  .description('The Spiritual Detox (Washing away sins)')
  .action(() => {
    printCommandHeader('wudu');
    console.log(chalk.cyan.bold('\n  Wudu: The Spiritual Detox\n'));

    wuduData.forEach((step, index) => {
      console.log(chalk.blue.bold(`  ${index + 1}. ${step.step}`));
      console.log(chalk.white(`     Physical: ${step.physical}`));
      console.log(chalk.green(`     Spiritual: ${step.spiritual}\n`));
    });
    
    console.log(chalk.gray('  "Oh Allah, make me of those who repent and those who purify themselves."'));
  });
