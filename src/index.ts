#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { initCommand } from './commands/init';
import { pullCommand } from './commands/pull';
import { statusCommand } from './commands/status';
import { commitCommand } from './commands/commit';
import { blameCommand } from './commands/blame';
import { pushCommand } from './commands/push';
import { journalCommand } from './commands/journal';
import { tafsirCommand } from './commands/tafsir';
import { memorizeCommand } from './commands/memorize';
import { qiblaCommand } from './commands/qibla';
import { adhanCommand } from './commands/adhan';
import { parableCommand } from './commands/parable';
import { historyCommand } from './commands/history';
import { nazmCommand } from './commands/nazm';
import { diffCommand } from './commands/diff';
import { mirrorCommand } from './commands/mirror';
import { soundCommand } from './commands/sound';
import { lensCommand } from './commands/lens';
import { sceneCommand } from './commands/scene';
import { heroCommand } from './commands/hero';
import { hijriCommand } from './commands/hijri';
import { zakatCommand } from './commands/zakat';
import { tasbihCommand } from './commands/tasbih';
import { prayersCommand } from './commands/prayers';
import { namesCommand } from './commands/names';
import { duaCommand } from './commands/dua';
import { fastCommand } from './commands/fast';
import { sunnahCommand } from './commands/sunnah';
import { sleepCommand } from './commands/sleep';
import { anatomyCommand } from './commands/anatomy';
import { journeyCommand } from './commands/journey';
import { natureCommand } from './commands/nature';
import { wuduCommand } from './commands/wudu';
import { investCommand } from './commands/invest';
import { sabrCommand } from './commands/sabr';
import { shukrCommand } from './commands/shukr';
import { fridayCommand } from './commands/friday';
import { adabCommand } from './commands/adab';
import { seekCommand } from './commands/seek';
import { repoCommand } from './commands/repo';

const program = new Command();

// Bismillah Header
console.log(chalk.dim('In the name of Allah, the Most Gracious, the Most Merciful'));

console.log(
  chalk.green(
    figlet.textSync('aya', { horizontalLayout: 'full' })
  )
);

program
  .name('aya')
  .description('A CLI for the mindful Muslim developer')
  .version('1.0.0')
  .action(() => {
    program.outputHelp();
  });

// Register Commands
const commands = [
  initCommand, pullCommand, statusCommand, commitCommand, blameCommand,
  pushCommand, journalCommand, tafsirCommand, memorizeCommand, qiblaCommand,
  adhanCommand, parableCommand, historyCommand, nazmCommand, diffCommand,
  mirrorCommand, soundCommand, lensCommand, sceneCommand, heroCommand,
  hijriCommand, zakatCommand, tasbihCommand, prayersCommand, namesCommand,
  duaCommand, fastCommand, sunnahCommand, sleepCommand, anatomyCommand,
  journeyCommand, natureCommand, wuduCommand, investCommand, sabrCommand,
  shukrCommand, fridayCommand, adabCommand, seekCommand, repoCommand
];

commands.forEach(cmd => program.addCommand(cmd));

// Global Error Handler
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.message.includes('EPIPE')) {
    // Ignore EPIPE errors (broken pipe) often caused by piping output
    return;
  }
  console.error(chalk.red('\n❌ An unexpected error occurred (Qadar Allah).'));
  console.error(chalk.gray(error.message));
  process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
