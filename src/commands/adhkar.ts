import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { morningAdhkar, eveningAdhkar, sleepAdhkar, travelAdhkar, prayerAdhkar, Dhikr } from '../data/adhkar';
import { printCommandHeader } from '../utils/printer';

export const adhkarCommand = new Command('adhkar')
  .description('Fortress of the Muslim (Adhkar Presets)')
  .action(async () => {
    printCommandHeader('adhkar');
    console.clear();
    console.log(chalk.green.bold('\n  Hisn al-Muslim (The Fortress)'));
    console.log(chalk.gray('  "Remembrance of Allah is the greatest thing." (29:45)\n'));

    const { type } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select Adhkar type:',
        choices: [
          { name: 'Morning Adhkar (Sabah)', value: 'morning' },
          { name: 'Evening Adhkar (Masa)', value: 'evening' },
          { name: 'Before Sleep (Nawm)', value: 'sleep' },
          { name: 'Travel Adhkar (Safar)', value: 'travel' },
          { name: 'Prayer Adhkar (Salah)', value: 'prayer' }
        ]
      }
    ]);

    let list: Dhikr[] = [];
    if (type === 'morning') list = morningAdhkar;
    else if (type === 'evening') list = eveningAdhkar;
    else if (type === 'sleep') list = sleepAdhkar;
    else if (type === 'travel') list = travelAdhkar;
    else if (type === 'prayer') list = prayerAdhkar;

    console.log(chalk.white(`\nStarting ${type} Adhkar (${list.length} items)...`));
    console.log(chalk.gray('Press Enter to move to the next Dhikr.\n'));

    for (const [index, dhikr] of list.entries()) {
        console.clear();
        console.log(chalk.green.bold(`\n  [${index + 1}/${list.length}] ${dhikr.id.replace(/-/g, ' ').toUpperCase()}`));
        console.log(chalk.gray('  ----------------------------------------'));
        
        console.log(chalk.yellow.bold(`  ${dhikr.text}`));
        if (dhikr.transliteration) {
            console.log(chalk.cyan.italic(`\n  ${dhikr.transliteration}`));
        }
        console.log(chalk.white(`\n  ${dhikr.translation}`));
        
        console.log(chalk.gray('\n  ----------------------------------------'));
        console.log(chalk.magenta(`  Repeat: ${dhikr.count} time(s)`));
        console.log(chalk.blue(`  Ref: ${dhikr.reference}`));
        if (dhikr.notes) {
            console.log(chalk.gray.italic(`  Note: ${dhikr.notes}`));
        }

        await inquirer.prompt([{ type: 'input', name: 'next', message: chalk.gray('Press Enter for next...') }]);
    }

    console.clear();
    console.log(chalk.green.bold('\n  Alhamdulillah! You have completed your Adhkar.'));
    console.log(chalk.white('  May Allah accept it from you and protect you.'));
    console.log('');
  });
