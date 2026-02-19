import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const tasbihCommand = new Command('tasbih')
  .description('Digital Counter (Tasbih)')
  .action(async () => {
    printCommandHeader('tasbih');
    let count = 0;
    
    console.clear();
    console.log(chalk.cyan.bold('\n  Digital Tasbih'));
    console.log(chalk.gray('Press ENTER to count. Type "reset" to reset. Ctrl+C to exit.\n'));
    
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
      } else if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'q') {
        break;
      } else {
        count++;
      }
      
      console.clear();
      console.log(chalk.cyan.bold('\n  Digital Tasbih'));
      console.log(chalk.gray('Press ENTER to count. Type "reset" to reset. Type "exit" to quit.\n'));
      console.log(chalk.green.bold(`Current Count: ${count}`));
      
      // Simple feedback
      if (count % 33 === 0 && count > 0) {
        console.log(chalk.yellow('  SubhanAllah / Alhamdulillah / Allahu Akbar (33 completed)'));
      }
      if (count % 100 === 0 && count > 0) {
        console.log(chalk.magenta('  100 Completed! May Allah accept it.'));
      }
    }
  });
