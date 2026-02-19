import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { diffData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const diffCommand = new Command('diff')
  .description('The "Almost" Word (Synonym Challenge)')
  .action(async () => {
    printCommandHeader('diff');
    console.clear();
    console.log(chalk.yellow.bold('\n  Aya Diff: The Precision of Divine Speech'));
    console.log(chalk.gray('Why did Allah use *this* word and not *that* one?\n'));

    // Select a random challenge or iterate? Let's just pick one for now or loop.
    // Let's loop through all available challenges.
    
    for (const challenge of diffData) {
      console.log(chalk.white.bold(`Prompt: "${challenge.prompt}"`));
      
      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which word is used in the Quran?',
        choices: challenge.options.map(o => ({
          name: o.label,
          value: o.value
        }))
      }]);

      const selected = challenge.options.find(o => o.value === answer.choice);
      const isCorrect = selected?.isCorrect;

      if (isCorrect) {
        console.log(chalk.green.bold('\n  Correct!'));
      } else {
        console.log(chalk.red.bold(`\n  Not quite. The Quran uses: ${challenge.reveal}`));
      }

      console.log(chalk.cyan.italic(`\n  Lesson: ${challenge.lesson}`));
      console.log(chalk.gray('----------------------------------------\n'));

      // Pause before next?
      const { next } = await inquirer.prompt([{
        type: 'confirm',
        name: 'next',
        message: 'Next challenge?',
        default: true
      }]);

      if (!next) break;
      console.clear();
    }
    
    console.log(chalk.yellow('End of challenges. SubhanAllah!'));
  });
