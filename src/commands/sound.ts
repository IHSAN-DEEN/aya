import { Command } from 'commander';
import chalk from 'chalk';
import { soundData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const soundCommand = new Command('sound')
  .description('Phonetic Storytelling (Tajweed as Tafsir)')
  .argument('[ref]', 'The Ayah reference (e.g. 100:1)')
  .action((ref) => {
    printCommandHeader('sound');
    // If no ref, show available?
    if (!ref) {
      console.log(chalk.yellow('Please provide an Ayah reference to analyze.'));
      console.log(chalk.gray('Available examples: 100:1, 113:1'));
      return;
    }

    const data = soundData.find(d => d.ref === ref || `${d.surah}:${d.ayah}` === ref);

    if (!data) {
      console.log(chalk.red('Sound analysis not found for that Ayah.'));
      console.log(chalk.gray('Currently available: 100:1 (Al-Adiyat), 113:1 (Al-Falaq)'));
      return;
    }

    console.clear();
    console.log(chalk.cyan.bold(`\n  Aya Sound: ${data.surah} (${data.ayah})`));
    console.log(chalk.white.italic(`"${data.text}"`));
    console.log(chalk.gray('----------------------------------------\n'));

    console.log(chalk.green.bold('Phonetic Analysis:'));
    console.log(chalk.white(data.analysis));
    console.log('');
  });
