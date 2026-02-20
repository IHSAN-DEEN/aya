import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { vocabList, Vocab } from '../data/vocab';
import { printCommandHeader } from '../utils/printer';

const MEMORIZE_FILE = path.join(os.homedir(), '.aya', 'memorize.json');

interface MemorizeStats {
  streak: number;
  lastPlayed: string; // ISO date string
  totalCorrect: number;
}

function loadStats(): MemorizeStats {
  try {
    if (fs.existsSync(MEMORIZE_FILE)) {
      return JSON.parse(fs.readFileSync(MEMORIZE_FILE, 'utf-8'));
    }
  } catch (error) {
    // Ignore error
  }
  return { streak: 0, lastPlayed: '', totalCorrect: 0 };
}

function saveStats(stats: MemorizeStats) {
  try {
    const dir = path.dirname(MEMORIZE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MEMORIZE_FILE, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
}

export const memorizeCommand = new Command('memorize')
  .description('Spaced repetition for Quranic vocabulary')
  .action(async () => {
    printCommandHeader('memorize');
    const stats = loadStats();
    const today = new Date().toISOString().split('T')[0];
    
    // Check streak
    if (stats.lastPlayed) {
      const lastDate = new Date(stats.lastPlayed);
      const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays > 1 && stats.lastPlayed !== today) {
        console.log(chalk.red('\nStreak broken!'));
        stats.streak = 0;
      }
    }

    if (stats.lastPlayed !== today) {
       // New day
    }

    console.log(chalk.cyan.bold('\n  Quranic Vocabulary Challenge'));
    console.log(chalk.yellow(`  Current Streak: ${stats.streak} days`));
    console.log(chalk.gray(`  Total Correct: ${stats.totalCorrect}`));
    console.log('');

    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Choose a category:',
        choices: [
          { name: 'All Categories', value: 'all' },
          { name: 'Surah Al-Fatiha', value: 'fatiha' },
          { name: 'Names of Allah', value: 'names_of_allah' },
          { name: 'Common Words', value: 'common' },
          { name: 'Short Surahs', value: 'short_surahs' }
        ]
      }
    ]);

    let questions = vocabList;
    if (category !== 'all') {
      questions = vocabList.filter(v => v.category === category);
    }

    // Pick a random question
    const vocab = questions[Math.floor(Math.random() * questions.length)];

    console.log(chalk.white.bold(`\nComplete the Ayah (${vocab.category.replace('_', ' ')}):`));
    console.log(chalk.green.italic(vocab.ayah.replace('_____', '_____')));
    console.log('');

    const { guess } = await inquirer.prompt([
      {
        type: 'input',
        name: 'guess',
        message: 'Type the missing word (transliteration):'
      }
    ]);

    const userGuess = (guess as string).toLowerCase().trim();
    const correct = vocab.answer.toLowerCase();

    // Simple Levenshtein distance check or substring check could be better, but exact match for now
    // We can allow some leniency
    if (userGuess === correct) {
      console.log(chalk.green.bold('\nCorrect! MashAllah! 🎉'));
      console.log(chalk.white(`Meaning: ${vocab.meaning}`));
      
      if (stats.lastPlayed !== today) {
        stats.streak += 1;
        stats.lastPlayed = today;
      }
      stats.totalCorrect += 1;
      saveStats(stats);
      
    } else {
      console.log(chalk.red.bold('\nNot quite.'));
      console.log(`The correct word is: ${chalk.yellow.bold(vocab.answer)}`);
      console.log(`Meaning: ${vocab.meaning}`);
      // Streak logic: strictly speaking, failing doesn't break streak unless you miss a day entirely.
      // But maybe we don't increment streak if they fail?
      // Let's just update lastPlayed so they keep the streak if they try again.
      stats.lastPlayed = today; 
      saveStats(stats);
    }
    console.log('');
  });
