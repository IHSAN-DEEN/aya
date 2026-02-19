import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { lensData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const lensCommand = new Command('lens')
  .description('The Perspective Shifter (Contextual Meaning)')
  .argument('[ref]', 'The Ayah reference (e.g. 20:25)')
  .action(async (ref) => {
    printCommandHeader('lens');
    // If no ref, list available or default?
    let selectedData = ref 
      ? lensData.find(d => d.ref === ref) 
      : null;

    if (!selectedData) {
      if (ref) {
        console.log(chalk.red('Perspective analysis not found for that Ayah.'));
        console.log(chalk.gray('Available: 20:25'));
        return;
      }
      
      // Interactive selection
      const { choice } = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Select an Ayah to view through different lenses:',
        choices: lensData.map(d => ({
          name: `${d.ref}: ${d.text}`,
          value: d
        }))
      }]);
      selectedData = choice;
    }

    if (!selectedData) return;

    console.clear();
    console.log(chalk.cyan.bold(`\n  Aya Lens: ${selectedData.ref}`));
    console.log(chalk.white.italic(`"${selectedData.text}"`));
    console.log(chalk.gray('How does this Ayah hit differently depending on your state?\n'));

    // Prompt for mode
    const { mode } = await inquirer.prompt([{
      type: 'list',
      name: 'mode',
      message: 'Select your current state/perspective:',
      choices: selectedData.modes.map(m => ({
        name: m.mode,
        value: m
      }))
    }]);

    console.log(chalk.green.bold(`\n  Perspective: ${mode.mode}`));
    console.log(chalk.white(mode.reflection));
    console.log('');
  });
