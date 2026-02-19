import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import { differenceInMinutes } from 'date-fns';
import { getConfig } from '../utils/config';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';
import boxen from 'boxen';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export const statusCommand = new Command('status')
  .description('Check your spiritual status (prayer times)')
  .action(async () => {
    printCommandHeader('status');
    const config = getConfig();
    const city = config.location?.city || 'Mecca';
    const country = config.location?.country || 'Saudi Arabia';

    const spinner = ora(`Pinging the heavens for ${city}, ${country}...`).start();

    try {
      const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
          city,
          country,
          method: 2, // ISNA
        }
      });

      const timings = response.data.data.timings as PrayerTimes;
      const hijri = response.data.data.date.hijri;
      const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      
      const now = new Date();
      let nextPrayer = null;
      let nextPrayerTime: Date | null = null;
      
      // Find next prayer logic...
      for (const name of prayerNames) {
        const timeStr = timings[name];
        const [hours, minutes] = timeStr.split(':').map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          nextPrayer = name;
          nextPrayerTime = prayerDate;
          break;
        }
      }

      if (!nextPrayer) {
        nextPrayer = 'Fajr';
        const timeStr = timings['Fajr'];
        const [hours, minutes] = timeStr.split(':').map(Number);
        const prayerDate = new Date();
        prayerDate.setDate(prayerDate.getDate() + 1);
        prayerDate.setHours(hours, minutes, 0, 0);
        nextPrayerTime = prayerDate;
      }

      spinner.stop();

      // NAK Style Status Output
      console.log(
        boxen(
          chalk.bold.green(` 🕌 Spiritual Status Report `) + '\n' +
          chalk.dim(` Location: ${city}, ${country} `) + '\n' +
          chalk.dim(` Date: ${hijri.day} ${hijri.month.en} ${hijri.year} AH `),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green',
          }
        )
      );

      console.log(chalk.bold.blue('📡 Connection Status:'));
      console.log(` • Branch: ${chalk.green('dunya')} (tracking remote: ${chalk.cyan('akhira')})`);
      console.log(` • Latency: ${chalk.green('0ms')} (Direct Connection Available)`);
      console.log('');

      if (nextPrayer && nextPrayerTime) {
        const diff = differenceInMinutes(nextPrayerTime, now);
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        
        let timeString = '';
        if (hours > 0) timeString += `${hours}h `;
        timeString += `${mins}m`;

        console.log(chalk.bold.yellow('⏳ Next Obligatory Commit:'));
        console.log(`   ${chalk.cyan.bold(nextPrayer)} is due in ${chalk.yellow.bold(timeString)}`);
        console.log(chalk.italic.gray('   "Indeed, prayer has been decreed upon the believers a decree of specified times." (4:103)'));
      }
      console.log('');

      console.log(chalk.bold.white('📅 Today\'s Schedule (The Daily Sprint):'));
      prayerNames.forEach(name => {
        const isNext = name === nextPrayer;
        const color = isNext ? chalk.green.bold : chalk.white;
        const marker = isNext ? chalk.yellow(' ← UP NEXT') : '';
        const time = timings[name];
        
        // Simple formatting
        console.log(`   ${color(name.padEnd(10))} ${time} ${marker}`);
      });
      
      console.log('');
      console.log(chalk.gray('(Run "aya init" to re-calibrate your location coordinates)'));

    } catch (error) {
      spinner.fail('Connection lost.');
      console.error(chalk.red('Could not fetch prayer times. Please check your network connection.'));
    }
  });
