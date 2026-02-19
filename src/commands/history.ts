import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { eventsList, HistoricalEvent } from '../data/events';
import { printCommandHeader } from '../utils/printer';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const historyCommand = new Command('history')
  .description('Interactive Timeline of Revelation')
  .argument('[event]', 'Name of the historical event (e.g., badr, uhud, migration)')
  .action(async (event) => {
    printCommandHeader('history');
    
    if (event) {
      const selectedEvent = eventsList.find(e => e.name.toLowerCase().includes(event.toLowerCase()) || e.id.toLowerCase().includes(event.toLowerCase()));
      if (selectedEvent) {
        await displayEvent(selectedEvent);
      } else {
        console.log(chalk.red('Event not found.'));
      }
      return;
    }

    // Interactive Mode
    let currentIndex = 0;
    let keepRunning = true;

    while (keepRunning) {
      console.clear();
      const currentEvent = eventsList[currentIndex];
      
      console.log(chalk.yellow.bold('\n  Timeline of the Seerah\n'));
      
      // Timeline visualization
      const totalEvents = eventsList.length;
      const progress = Math.round(((currentIndex + 1) / totalEvents) * 20);
      const progressBar = '█'.repeat(progress) + '░'.repeat(20 - progress);
      console.log(chalk.gray(`[${progressBar}] ${currentIndex + 1}/${totalEvents}`));
      
      await displayEvent(currentEvent, false);

      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Navigate:',
          choices: [
            { name: 'Next Event ▶', value: 'next', disabled: currentIndex === eventsList.length - 1 },
            { name: 'Previous Event ◀', value: 'prev', disabled: currentIndex === 0 },
            { name: 'Select Specific Event', value: 'select' },
            { name: 'Exit', value: 'exit' }
          ]
        }
      ]);

      if (action === 'next') {
        currentIndex++;
      } else if (action === 'prev') {
        currentIndex--;
      } else if (action === 'select') {
        const { selected } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selected',
            message: 'Jump to:',
            choices: eventsList.map((e, index) => ({ name: `${e.year} - ${e.name}`, value: index }))
          }
        ]);
        currentIndex = selected;
      } else {
        keepRunning = false;
      }
    }
  });

async function displayEvent(event: HistoricalEvent, animate = true) {
  if (animate) {
    const spinner = ora('Traveling back in time...').start();
    await sleep(1000);
    spinner.stop();
  }

  console.log(chalk.green.bold(`\n  Year: ${event.year}`));
  console.log(chalk.green(`  Location: ${event.location}`));
  console.log(chalk.blue.bold(`Event: ${event.name}`));
  console.log('');
  
  console.log(chalk.white.italic(event.scene));
  console.log('');
  
  if (animate) await sleep(1500);

  console.log(chalk.yellow.bold('  Revelation Sent Down:'));
  console.log(chalk.cyan(`"${event.revelation}"`));
  console.log(chalk.gray(`(Surah ${event.ayah})`));
  
  if (event.details) {
      console.log(chalk.gray(`\nNote: ${event.details}`));
  }
  console.log('');
}
