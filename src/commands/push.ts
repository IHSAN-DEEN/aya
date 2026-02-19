import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { printCommandHeader } from '../utils/printer';
import boxen from 'boxen';

// Store Duas in the local project scope (like Pull Requests)
const DUA_FILE = path.join(process.cwd(), '.aya', 'duas.json');

export const pushCommand = new Command('push')
  .description('Push goodness to the world (Sadaqah/Du\'a) or your Dua Jar')
  .action(async () => {
    printCommandHeader('push');
    
    const choices = [
      { name: '🌍 Push to Origin Jannah (Daily Sadaqah/Deed)', value: 'sadaqah' },
      { name: '🏺 Push to Dua Jar (My Personal PRs)', value: 'dua' }
    ];

    const { mode } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'Select your push target:',
        choices
      }
    ]);

    if (mode === 'sadaqah') {
      showDailyDeed();
    } else {
      await handleDuaJar();
    }
  });

function showDailyDeed() {
  console.log(chalk.green.bold('\n🚀 Pushing to origin jannah...'));
  
  const actions = [
    {
      text: "Make du'a for the oppressed around the world.",
      link: "Prophet (saw) said: 'The du'a of a Muslim for his brother in his absence is readily accepted.'"
    },
    {
      text: "Donate to a verified charity today.",
      link: "LaunchGood.com / IslamicRelief.com"
    },
    {
      text: "Call your parents.",
      link: "Paradise lies at the feet of your mother."
    },
    {
      text: "Remove something harmful from the path.",
      link: "It is a branch of faith."
    },
    {
      text: "Smile at your brother/sister.",
      link: "It is a charity."
    },
    {
      text: "Feed a stray cat or bird.",
      link: "There is reward in serving every living liver."
    }
  ];

  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  console.log(
    boxen(
      chalk.white(`Action item: ${chalk.bold(randomAction.text)}`) + '\n' +
      chalk.gray(randomAction.link),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'yellow',
        title: 'Daily Sadaqah Commit',
        titleAlignment: 'center'
      }
    )
  );

  console.log(chalk.yellow('Your code is temporary. Your impact is eternal.'));
}

async function handleDuaJar() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Dua Jar Options:',
      choices: [
        { name: '📝 Add a new Dua (Open PR)', value: 'add' },
        { name: '🤲 Pull a random Dua (Review)', value: 'pull' },
        { name: '📜 List all Duas (Log)', value: 'list' }
      ]
    }
  ]);

  const duas = loadDuas();

  if (action === 'add') {
    const { duaText } = await inquirer.prompt([
      {
        type: 'input',
        name: 'duaText',
        message: 'Write your dua here:'
      }
    ]);

    if (duaText.trim()) {
      duas.push({
        text: duaText,
        date: new Date().toISOString()
      });
      saveDuas(duas);
      console.log(chalk.green('\n✅ Dua pushed to the jar. May Allah accept it.'));
    }
  } else if (action === 'pull') {
    if (duas.length === 0) {
      console.log(chalk.yellow('\nYour Dua Jar is empty. Add some duas first!'));
    } else {
      const randomDua = duas[Math.floor(Math.random() * duas.length)];
      
      console.log(
        boxen(
          chalk.white.bold(`"${randomDua.text}"`) + '\n\n' +
          chalk.gray(`(Added on ${new Date(randomDua.date).toLocaleDateString()})`),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'cyan',
            title: '✨ A Dua from your Jar',
            titleAlignment: 'center'
          }
        )
      );
    }
  } else if (action === 'list') {
    if (duas.length === 0) {
      console.log(chalk.yellow('\nYour Dua Jar is empty.'));
    } else {
      console.log(chalk.cyan('\n📜 Your Saved Duas:'));
      duas.forEach((d, i) => {
        console.log(chalk.white(`${i + 1}. ${d.text}`));
      });
    }
  }
}

function loadDuas(): { text: string; date: string }[] {
  if (fs.existsSync(DUA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DUA_FILE, 'utf-8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveDuas(duas: { text: string; date: string }[]) {
  const dir = path.dirname(DUA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DUA_FILE, JSON.stringify(duas, null, 2));
}
