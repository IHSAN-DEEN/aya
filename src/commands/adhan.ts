import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { exec } from 'child_process';
import os from 'os';
import { printCommandHeader } from '../utils/printer';

export const adhanCommand = new Command('adhan')
  .description('Call to Prayer (Adhan) - Plays audio or shows text')
  .option('-s, --silent', 'Show text only, do not play audio')
  .action(async (options) => {
    printCommandHeader('adhan');
    console.log(chalk.green.bold('\n  Allahu Akbar, Allahu Akbar\n'));

    const lines = [
      { arabic: 'الله أكبر الله أكبر', translation: 'God is the Greatest, God is the Greatest' },
      { arabic: 'أشهد أن لا إله إلا الله', translation: 'I bear witness that there is no god except God' },
      { arabic: 'أشهد أن محمدا رسول الله', translation: 'I bear witness that Muhammad is the Messenger of God' },
      { arabic: 'حي على الصلاة', translation: 'Hasten to the prayer' },
      { arabic: 'حي على الفلاح', translation: 'Hasten to success' },
      { arabic: 'الله أكبر الله أكبر', translation: 'God is the Greatest, God is the Greatest' },
      { arabic: 'لا إله إلا الله', translation: 'There is no god except God' }
    ];

    // Print Adhan beautifully with delays
    for (const line of lines) {
      console.log(chalk.yellow.bold(line.arabic));
      console.log(chalk.gray(line.translation));
      console.log('');
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    if (!options.silent) {
      const spinner = ora('Playing Adhan...').start();
      
      // Attempt to play a system sound
      try {
        if (os.platform() === 'darwin') {
           // macOS
           exec('afplay /System/Library/Sounds/Glass.aiff');
        } else if (os.platform() === 'linux') {
           // Linux (try paplay or aplay)
           exec('paplay /usr/share/sounds/freedesktop/stereo/complete.oga || aplay /usr/share/sounds/alsa/Front_Center.wav'); 
        } else if (os.platform() === 'win32') {
           // Windows
           // PowerShell beep
           exec('powershell -c "(New-Object Media.SoundPlayer \'C:\\Windows\\Media\\notify.wav\').PlaySync();"');
        }
      } catch (e) {
        // Ignore errors if sound fails
      }

      spinner.succeed('Adhan completed.');
    }
  });
