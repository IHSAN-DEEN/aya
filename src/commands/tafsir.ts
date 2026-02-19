import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { tafsirData, Tafsir } from '../data/tafsir';
import { printCommandHeader } from '../utils/printer';

export const tafsirCommand = new Command('tafsir')
  .description('Interactive linguistic deep dive (Tadabbur)')
  .argument('[query]', 'The specific surah/ayah to study (e.g. 93:3, fatiha, ikhlas)')
  .action(async (query) => {
    printCommandHeader('tafsir');
    let selectedTafsir: Tafsir | undefined;

    if (query) {
      const q = query.toLowerCase();
      selectedTafsir = tafsirData.find(t => 
        t.surah.toLowerCase().includes(q) || 
        `${t.ayah}` === q ||
        (query.includes(':') && `${t.surah}:${t.ayah}`.includes(q)) || // weak check, but okay
        (query.includes(':') && t.ayah === parseInt(query.split(':')[1]) && t.surah.toLowerCase().includes(query.split(':')[0])) // better check? No, surah is a name in data
      );
      
      // Better matching logic
      if (!selectedTafsir) {
         // Try to match "93:3" style
         if (query.includes(':')) {
             const [s, a] = query.split(':');
             // We don't have surah numbers in data, only names. 
             // But let's check if user typed "duha:3"
             selectedTafsir = tafsirData.find(t => t.surah.toLowerCase().includes(s) && t.ayah.toString() === a);
         }
      }

      // Hardcoded fallback for specific numbers if they were in the original code
      // 93:3 -> Ad-Duhaa
      if (!selectedTafsir && query === '93:3') selectedTafsir = tafsirData.find(t => t.surah === 'Ad-Duhaa');
      if (!selectedTafsir && query === '1:5') selectedTafsir = tafsirData.find(t => t.surah === 'Al-Fatiha');
      if (!selectedTafsir && query === '103:1') selectedTafsir = tafsirData.find(t => t.surah === 'Al-Asr');
      if (!selectedTafsir && query === '112:1') selectedTafsir = tafsirData.find(t => t.surah === 'Al-Ikhlas');
      if (!selectedTafsir && query === '113:1') selectedTafsir = tafsirData.find(t => t.surah === 'Al-Falaq');
      if (!selectedTafsir && query === '114:1') selectedTafsir = tafsirData.find(t => t.surah === 'An-Nas');

      if (!selectedTafsir) {
        console.log(chalk.red('Tafsir not found for that Ayah.'));
        console.log(chalk.gray('Available: Ad-Duhaa (93:3), Al-Fatiha (1:5), Al-Asr (103:1), Al-Ikhlas (112:1), Al-Falaq (113:1), An-Nas (114:1)'));
        return;
      }
    } else {
      // Interactive menu if no argument provided
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTafsirIndex',
          message: 'Choose a Surah/Ayah to study:',
          choices: tafsirData.map((t, index) => ({
            name: `${t.surah} (Ayah ${t.ayah})`,
            value: index
          }))
        }
      ]);
      selectedTafsir = tafsirData[answers.selectedTafsirIndex];
    }

    if (!selectedTafsir) return;

    console.clear();
    console.log(chalk.green.bold(`\n  Tafsir: Surah ${selectedTafsir.surah}, Ayah ${selectedTafsir.ayah}`));
    console.log(chalk.gray('Take a deep breath. Let the words sink in.\n'));

    for (const step of selectedTafsir.steps) {
      await inquirer.prompt([{
        type: 'input',
        name: 'continue',
        message: chalk.yellow.bold(step.word),
        suffix: chalk.gray(' (Press Enter to reveal meaning)')
      }]);

      console.log(chalk.cyan(`Meaning: ${step.meaning}`));
      console.log(chalk.white(step.explanation));
      console.log(chalk.gray('----------------------------------------'));
    }

    console.log(chalk.green.bold('\n  Final Reflection:'));
    console.log(chalk.white.italic(selectedTafsir.finalThought));
    console.log('');
  });
