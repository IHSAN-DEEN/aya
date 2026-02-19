import chalk from 'chalk';
import boxen from 'boxen';
import { commandsDB } from '../data/commands-db';

export const printCommandHeader = (commandName: string) => {
  const data = commandsDB[commandName];
  if (!data) return;

  console.log(
    boxen(
      chalk.bold.green(data.arabic) + ' ' + chalk.dim(`(${data.transliteration})`) + '\n' +
      chalk.white(data.meaning),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        title: `aya ${data.name}`,
        titleAlignment: 'center',
        textAlignment: 'center'
      }
    )
  );

  console.log(chalk.bold.yellow('📖 The Story (Deep Dive):'));
  console.log(chalk.italic.gray(data.story));
  console.log();

  console.log(chalk.bold.blue('🤲 Reflection (Khutbah):'));
  console.log(chalk.white(data.reflection));
  console.log();

  console.log(chalk.bold.magenta('💻 Technical Analogy:'));
  console.log(chalk.cyan(data.technical));
  console.log();
  console.log(chalk.dim('─'.repeat(50)));
  console.log();
};
