import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { sceneData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sceneCommand = new Command('scene')
  .description('The Cinematic Visualizer (Tadabbur in 4K)')
  .argument('[ref]', 'The Ayah reference (e.g. 82:1)')
  .action(async (ref) => {
    printCommandHeader('scene');
    let data = ref 
      ? sceneData.find(s => s.ref.includes(ref) || s.surah.toLowerCase().includes(ref))
      : null;

    if (!data && ref) {
      console.log(chalk.red('Scene not found for that reference.'));
    }

    if (!data) {
      const { choice } = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Select a scene to visualize:',
        choices: sceneData.map(s => ({
          name: `${s.surah} (${s.ayah}): ${s.title}`,
          value: s
        }))
      }]);
      data = choice;
    }

    if (!data) return;

    console.clear();
    console.log(chalk.red.bold(`\n  Aya Scene: ${data.title}`));
    console.log(chalk.gray(`Surah ${data.surah} (${data.ayah})\n`));

    // Display Lighting and Audio first to set the mood
    console.log(chalk.yellow('  Lighting: ') + chalk.white(data.lighting));
    console.log(chalk.cyan('  Audio:    ') + chalk.white(data.audio));
    console.log(chalk.gray('----------------------------------------\n'));

    console.log(chalk.white.bold('  Shot List:'));
    
    // Animate shots sequentially
    for (let i = 0; i < data.shots.length; i++) {
      const shot = data.shots[i];
      await sleep(1000);
      console.log(chalk.green(`\n[${i+1}] ${shot.type}`));
      console.log(chalk.white(`    ${shot.description}`));
    }
    console.log('');
  });
