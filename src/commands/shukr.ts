import { Command } from 'commander';
import chalk from 'chalk';
import { shukrData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const shukrCommand = new Command('shukr')
  .description('The Gratitude Reality Check')
  .action(() => {
    printCommandHeader('shukr');
    console.log(chalk.yellow.bold('\n  The 3 Levels of Shukr (Gratitude)\n'));

    shukrData.forEach((level) => {
      console.log(chalk.blue.bold(`  Level: ${level.level}`));
      console.log(chalk.white(`  ${level.description}`));
      console.log(chalk.green(`  Reality: ${level.reality}\n`));
    });

    console.log(chalk.gray('  "If you are grateful, I will surely increase you." (14:7)'));
  });
