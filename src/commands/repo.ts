import { Command } from 'commander';
import { startServer } from '../server';
import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';

export const repoCommand = new Command('repo')
  .description('The Book of Deeds UI (Visualize your journey)')
  .action(async () => {
    printCommandHeader('repo');
    
    const spinner = ora('Opening your Book of Deeds in the browser...').start();
    
    try {
      const port = await startServer();
      const url = `http://localhost:${port}/repo`;
      
      spinner.succeed(chalk.green('Book of Deeds is open!'));
      console.log(chalk.cyan(`  ➜  ${url}`));
      console.log(chalk.dim('  (Press Ctrl+C to close the connection)'));

      // Open browser based on OS
      const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
      exec(`${start} ${url}`);
      
      // Keep the process alive is handled by the server.listen() inside startServer
      // We don't need to do anything else, the node process will stay alive.
      
    } catch (error) {
      spinner.fail('Could not open Book of Deeds.');
      console.error(error);
    }
  });
