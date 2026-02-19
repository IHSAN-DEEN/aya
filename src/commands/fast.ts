import { Command } from 'commander';
import chalk from 'chalk';
import { fastData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const fastCommand = new Command('fast')
  .description('Sunnah Fasting Reminders & Spiritual Why')
  .action(async () => {
    printCommandHeader('fast');
    console.clear();
    console.log(chalk.green.bold('\n  The Shield of Fasting (As-Sawm)\n'));
    
    const today = new Date();
    const day = today.getDay(); // 0 = Sun, 1 = Mon, 4 = Thu
    
    // Check if tomorrow is Mon (1) or Thu (4)
    const isSunnahTomorrow = day === 0 || day === 3;
    const isSunnahToday = day === 1 || day === 4;

    if (isSunnahToday) {
      console.log(chalk.yellow.bold('  Today is a Sunnah fasting day! (Monday/Thursday)'));
      console.log(chalk.gray('  "The gates of Paradise are opened..."\n'));
    } else if (isSunnahTomorrow) {
      console.log(chalk.cyan.bold('  Tomorrow is a Sunnah fasting day! Prepare your Suhoor.'));
    }

    console.log(chalk.white.bold('  Why we fast (beyond Ramadan):'));
    
    fastData.forEach(f => {
      console.log(chalk.blue.bold(`\n  ${f.type} (${f.when})`));
      console.log(chalk.white(`  Reward: ${f.reward}`));
      console.log(chalk.gray.italic(`  "${f.spiritualWhy}"`));
    });
    console.log('\n');
  });