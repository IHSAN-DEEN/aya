import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { printCommandHeader } from '../utils/printer';
import { logger } from '../utils/logger';

export const commitCommand = new Command('commit')
  .description('Commit a good deed or intention')
  .option('-m, --message <message>', 'The deed you commit to')
  .action(async (options) => {
    printCommandHeader('commit');
    let message = options.message;

    if (!message) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: 'What good deed are you committing to today?',
          validate: (input) => input.length > 0 ? true : 'Please enter a valid commitment.'
        }
      ]);
      message = answers.message;
    }

    // Log the commit using our new utility
    const commit = logger.logCommit(message);
    const totalDeeds = logger.getTotalDeeds();

    // NAK Style Output
    console.log(chalk.gray(`[main ${commit.hash}] Commit confirmed.`));
    console.log(chalk.green(' Angels are recording. 📝'));
    console.log(chalk.cyan(` + 1 good deed added to your scale.`));
    
    // Encouragement based on total deeds
    let encouragement = "";
    if (totalDeeds % 10 === 0) encouragement = chalk.yellow.bold(" MashaAllah! A milestone reached!");
    else if (totalDeeds === 1) encouragement = chalk.yellow.bold(" Bismillah! Your first step.");

    console.log(chalk.white(` Total good deeds recorded: ${chalk.bold(totalDeeds)}`) + encouragement);
    console.log(chalk.dim('\n"Verily, the good deeds remove the evil deeds." (11:114)'));
  });
