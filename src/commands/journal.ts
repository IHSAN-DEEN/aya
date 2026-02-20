import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import boxen from 'boxen';
import { printCommandHeader } from '../utils/printer';

const JOURNAL_FILE = path.join(os.homedir(), '.aya', 'journal.json');

interface JournalEntry {
  date: string;
  state: string;
  reflection?: string;
}

const prescriptions: Record<string, { ayah: string; advice: string; dhikr: string }> = {
  'Anxious': {
    ayah: '"Unquestionably, by the remembrance of Allah hearts are assured." (13:28)',
    advice: 'Anxiety comes from fearing the future. But the future is in the Hands of the One who loves you most. Let go of the control you never had.',
    dhikr: 'Hasbunallahu wa ni\'mal wakil (Allah is sufficient for us and He is the best Disposer of affairs)'
  },
  'Grateful': {
    ayah: '"If you are grateful, I will surely increase you." (14:7)',
    advice: 'This is a beautiful state. Bind this blessing with gratitude so it doesn\'t escape. Use this energy to serve someone else today.',
    dhikr: 'Alhamdulillah hamdan kathiran tayyiban mubarakan feeh'
  },
  'Distracted': {
    ayah: '"Competition in [worldly] increase diverts you until you visit the graveyards." (102:1-2)',
    advice: 'The dunya is loud. It screams for your attention. But the grave is silent. Focus on what will matter when the noise stops.',
    dhikr: 'La ilaha illa Allah (There is no deity but Allah)'
  },
  'Empty': {
    ayah: '"And We are closer to him than [his] jugular vein." (50:16)',
    advice: 'That emptiness you feel? It\'s a hunger. Not for food, not for code, but for connection. Your soul is starving for its Creator. Feed it.',
    dhikr: 'Ya Hayyu Ya Qayyum, bi rahmatika astagheeth'
  },
  'Overwhelmed': {
    ayah: '"Allah does not burden a soul beyond that it can bear." (2:286)',
    advice: 'You feel like you\'re drowning, but you are just learning to swim in deeper waters. This pressure is building your capacity, not destroying you.',
    dhikr: 'La hawla wa la quwwata illa billah (There is no power and no strength except by Allah)'
  }
};

export const journalCommand = new Command('journal')
  .description('Track your spiritual state (Tazkiyah)')
  .action(async () => {
    printCommandHeader('journal');
    console.log(chalk.green.bold('\nWelcome to your spiritual debugger.'));
    console.log(chalk.gray('Let\'s check the logs of the heart.\n'));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'state',
        message: 'How is your heart feeling right now?',
        choices: Object.keys(prescriptions)
      }
    ]);

    const state = answers.state as string;
    const prescription = prescriptions[state];

    console.log('');
    console.log(boxen(
      `${chalk.bold(prescription.ayah)}\n\n` +
      `${chalk.cyan(prescription.advice)}\n\n` +
      `${chalk.yellow.bold('Prescribed Dhikr:')} ${prescription.dhikr}`,
      { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green', title: `Prescription for ${state}` }
    ));

    // Save to journal
    let journal: JournalEntry[] = [];
    if (fs.existsSync(JOURNAL_FILE)) {
      try {
        journal = JSON.parse(fs.readFileSync(JOURNAL_FILE, 'utf-8'));
      } catch (e) {
        journal = [];
      }
    }

    journal.push({
      date: new Date().toISOString(),
      state
    });

    // Ensure directory exists
    const dir = path.dirname(JOURNAL_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(JOURNAL_FILE, JSON.stringify(journal, null, 2));

    console.log(chalk.gray(`Entry logged. ${journal.length} entries in your history.`));
  });
