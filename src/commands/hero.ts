import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { heroData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

const drawBar = (val: number, max: number = 10) => {
  // Use simple ASCII blocks if needed, but standard ones are fine
  const filledChar = '█';
  const emptyChar = '░';
  const filled = filledChar.repeat(val);
  const empty = emptyChar.repeat(max - val);
  
  // Color logic
  let color = chalk.red;
  if (val >= 8) color = chalk.green;
  else if (val >= 5) color = chalk.yellow;
  
  return `${color(filled)}${chalk.gray(empty)} ${val}/${max}`;
};

export const heroCommand = new Command('hero')
  .description('The Prophet Profile (RPG Character Sheet)')
  .argument('[name]', 'Name of the Prophet (e.g. Musa)')
  .action(async (name) => {
    printCommandHeader('hero');
    let data = name
      ? heroData.find(h => h.name.toLowerCase().includes(name.toLowerCase()))
      : null;

    if (!data && name) {
      console.log(chalk.red('Profile not found for that Prophet.'));
    }

    if (!data) {
      const { choice } = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Select a Prophet to view profile:',
        choices: heroData.map(h => ({
          name: h.name,
          value: h
        }))
      }]);
      data = choice;
    }

    if (!data) return;

    console.clear();
    console.log(chalk.cyan.bold(`\n  Aya Hero: ${data.name}`));
    console.log(chalk.gray(`Title: ${data.title}\n`));

    console.log(chalk.white.bold('  Stats:'));
    console.log(`Strength:  ${drawBar(data.stats.strength)}`);
    console.log(`Speech:    ${drawBar(data.stats.speech)}`);
    console.log(`Patience:  ${drawBar(data.stats.patience)}`);
    console.log(`Wisdom:    ${drawBar(data.stats.wisdom)}`);
    console.log(chalk.gray('----------------------------------------'));

    console.log(chalk.yellow.bold('\n  Special Ability:'));
    console.log(chalk.white(data.specialAbility));

    console.log(chalk.red.bold('\n  Weakness / Challenge:'));
    console.log(chalk.white(data.weakness));

    console.log(chalk.magenta.bold('\n  Arch-Nemesis:'));
    console.log(chalk.white(data.archNemesis));

    console.log(chalk.blue.bold('\n  Quranic Profile:'));
    console.log(chalk.italic(data.quranicProfile));
    console.log('');
  });
