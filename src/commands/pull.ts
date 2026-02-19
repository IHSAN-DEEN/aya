import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { gems } from '../data/gems';
import { printCommandHeader } from '../utils/printer';

export const pullCommand = new Command('pull')
  .description('Pull a random ayah or hadith for reflection')
  .action(async () => {
    printCommandHeader('pull');
    const spinner = ora('Fetching divine wisdom...').start();
    
    // Simulate a small delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const randomGem = gems[Math.floor(Math.random() * gems.length)];
    
    spinner.succeed(chalk.green('Reflection loaded.'));
    console.log('');
    
    console.log(chalk.yellow.bold(`"${randomGem.text}"`));
    console.log(chalk.gray(`— ${randomGem.source}`));
    console.log('');
    
    console.log(chalk.blue.bold('Language Gem:'));
    console.log(chalk.white(randomGem.reflection));
    console.log('');
  });
