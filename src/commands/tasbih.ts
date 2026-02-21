import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';
import { logger } from '../utils/logger';

export const tasbihCommand = new Command('tasbih')
  .description('Digital Counter (Tasbih) with Persistence')
  .action(async () => {
    printCommandHeader('tasbih');
    
    // Select Dhikr Type
    const { type } = await inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'Select Dhikr Session:',
        choices: [
            { name: 'SubhanAllah (33)', value: 'subhanallah' },
            { name: 'Alhamdulillah (33)', value: 'alhamdulillah' },
            { name: 'Allahu Akbar (34)', value: 'allahu_akbar' },
            { name: 'Astaghfirullah', value: 'astaghfirullah' },
            { name: 'Salawat', value: 'salawat' },
            { name: 'La ilaha illallah', value: 'tahlil' },
            { name: 'General / Other', value: 'general' },
            new inquirer.Separator(),
            { name: 'View Session History', value: 'history' }
        ]
    }]);

    if (type === 'history') {
        const history = logger.getTasbihHistory();
        console.log(chalk.cyan.bold('\n  Tasbih Session History:'));
        if (history.length === 0) {
            console.log(chalk.gray('  No sessions recorded yet.'));
        } else {
            // Show last 10
            history.slice(-10).reverse().forEach(entry => {
                console.log(chalk.gray(`  [${new Date(entry.timestamp).toLocaleString()}] `) + 
                            chalk.yellow(entry.type.padEnd(15)) + 
                            chalk.white(`: ${entry.count}`));
            });
        }
        return;
    }

    let count = logger.getTasbihCount(type);
    
    console.clear();
    console.log(chalk.cyan.bold(`\n  Digital Tasbih: ${type.toUpperCase()}`));
    console.log(chalk.gray('Press ENTER to count. Type "reset" to reset. Type "exit" to quit.\n'));
    console.log(chalk.green.bold(`Current Count: ${count}`));

    // We need a loop to handle inputs
    while (true) {
      const { input } = await inquirer.prompt([{
        type: 'input',
        name: 'input',
        message: `Count: ${chalk.green.bold(count)}  Wait for prompt...`,
        default: '',
        prefix: '' // Remove prefix
      }]);

      if (input.toLowerCase() === 'reset') {
        count = 0;
        logger.resetTasbih(type);
      } else if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'q') {
        break;
      } else {
        count++;
        logger.incrementTasbih(type, 1);
      }
      
      console.clear();
      console.log(chalk.cyan.bold(`\n  Digital Tasbih: ${type.toUpperCase()}`));
      console.log(chalk.gray('Press ENTER to count. Type "reset" to reset. Type "exit" to quit.\n'));
      console.log(chalk.green.bold(`Current Count: ${count}`));
      
      // Simple feedback
      if (type === 'subhanallah' && count === 33) console.log(chalk.yellow('  SubhanAllah (33) Completed!'));
      if (type === 'alhamdulillah' && count === 33) console.log(chalk.yellow('  Alhamdulillah (33) Completed!'));
      if (type === 'allahu_akbar' && count === 34) console.log(chalk.yellow('  Allahu Akbar (34) Completed!'));

      if (count % 33 === 0 && count > 0 && type === 'general') {
        console.log(chalk.yellow('  SubhanAllah / Alhamdulillah / Allahu Akbar (33 completed)'));
      }
      if (count % 100 === 0 && count > 0) {
        console.log(chalk.magenta('  100 Completed! May Allah accept it.'));
      }
    }
  });
