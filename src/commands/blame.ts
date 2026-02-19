import { Command } from 'commander';
import chalk from 'chalk';
import { printCommandHeader } from '../utils/printer';
import boxen from 'boxen';

export const blameCommand = new Command('blame')
  .description('Self-reflection tool (Muhasabah)')
  .action(() => {
    printCommandHeader('blame');
    
    console.log(
      boxen(
        chalk.red.bold(' git blame? No. ') + '\n' +
        chalk.yellow(" It wasn't the compiler. It wasn't the PM. ") + '\n\n' +
        chalk.white.italic('"Nay, man is evidence against himself." (75:14)'),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          borderColor: 'red',
          title: 'Muhasabah (Self-Audit)',
          titleAlignment: 'center'
        }
      )
    );

    console.log(chalk.cyan(' ➜ Take a breath.'));
    console.log(chalk.cyan(' ➜ Say Astaghfirullah.'));
    console.log(chalk.cyan(' ➜ Debug with a clear heart.'));
    console.log('');
  });
