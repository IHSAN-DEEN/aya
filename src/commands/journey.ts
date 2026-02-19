import { Command } from 'commander';
import chalk from 'chalk';
import { journeyData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const journeyCommand = new Command('journey')
  .description('The Roadmap of the Soul (Alam al-Arwah to Jannah)')
  .action(() => {
    printCommandHeader('journey');
    console.log(chalk.yellow.bold('\n  The Journey of the Soul\n'));

    journeyData.forEach((stage, index) => {
      console.log(chalk.blue.bold(`  ${index + 1}. ${stage.stage} (${stage.arabic})`));
      console.log(chalk.white(`     ${stage.description}`));
      console.log(chalk.gray(`     Reality: ${stage.reality}\n`));
      if (index < journeyData.length - 1) {
        console.log(chalk.green('          |\n          V\n'));
      }
    });
  });
