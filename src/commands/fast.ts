import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { fastData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';
import { getHijriDate, isWhiteDay, getGregorianDate } from '../utils/hijri';

export const fastCommand = new Command('fast')
  .description('Sunnah Fasting Reminders & Spiritual Why')
  .action(async () => {
    printCommandHeader('fast');
    // console.clear(); // printCommandHeader might handle this, or we rely on user scroll. 
    // Removing explicit clear to preserve header context if any.
    
    const spinner = ora('Checking Islamic Calendar...').start();
    
    let hijriTodayStr = '';
    let isWhiteDayToday = false;
    let isWhiteDayTomorrow = false;
    let nextWhiteDays: string[] = [];
    
    try {
        const hijriData = await getHijriDate();
        const hDay = parseInt(hijriData.hijri.day);
        const hMonth = hijriData.hijri.month.number;
        const hYear = parseInt(hijriData.hijri.year);
        
        hijriTodayStr = `${hijriData.hijri.day} ${hijriData.hijri.month.en} ${hijriData.hijri.year}`;
        isWhiteDayToday = isWhiteDay(hDay);
        isWhiteDayTomorrow = isWhiteDay(hDay + 1);
        
        // Calculate next White Days
        let targetMonth = hMonth;
        let targetYear = hYear;
        
        // If today is past the 15th, look to next month
        if (hDay > 15) {
            targetMonth++;
            if (targetMonth > 12) {
                targetMonth = 1;
                targetYear++;
            }
        }
        
        // Fetch Gregorian dates for next 13, 14, 15
        const [d13, d14, d15] = await Promise.all([
            getGregorianDate(13, targetMonth, targetYear),
            getGregorianDate(14, targetMonth, targetYear),
            getGregorianDate(15, targetMonth, targetYear)
        ]);
        
        nextWhiteDays = [d13, d14, d15];
        
        spinner.succeed(`Today is ${chalk.bold(hijriTodayStr)}`);
    } catch (e) {
        spinner.fail('Could not fetch Hijri date. Showing Gregorian only.');
    }

    console.log(chalk.green.bold('\n  The Shield of Fasting (As-Sawm)\n'));
    
    const today = new Date();
    const day = today.getDay(); // 0 = Sun, 1 = Mon, 4 = Thu
    
    // Check if tomorrow is Mon (1) or Thu (4)
    const isSunnahTomorrow = day === 0 || day === 3;
    const isSunnahToday = day === 1 || day === 4;

    if (isSunnahToday || isWhiteDayToday) {
      console.log(chalk.yellow.bold('  Today is a Sunnah fasting day!'));
      if (isSunnahToday) console.log(chalk.yellow('  - Monday/Thursday Fast'));
      if (isWhiteDayToday) console.log(chalk.yellow(`  - White Day (${hijriTodayStr})`));
      
      console.log(chalk.gray('\n  "The gates of Paradise are opened..."\n'));
    } else if (isSunnahTomorrow || isWhiteDayTomorrow) {
      console.log(chalk.cyan.bold('  Tomorrow is a Sunnah fasting day! Prepare your Suhoor.'));
      if (isSunnahTomorrow) console.log(chalk.cyan('  - Monday/Thursday Fast'));
      if (isWhiteDayTomorrow) console.log(chalk.cyan('  - White Day (Ayam al-Bid)'));
    } else {
        console.log(chalk.gray('  No specific Sunnah fast for today/tomorrow.'));
    }
    
    if (nextWhiteDays.length > 0) {
        console.log(chalk.white.bold('\n  Upcoming White Days (Ayam al-Bid):'));
        console.log(chalk.white(`  13th: ${nextWhiteDays[0]}`));
        console.log(chalk.white(`  14th: ${nextWhiteDays[1]}`));
        console.log(chalk.white(`  15th: ${nextWhiteDays[2]}`));
    }

    console.log(chalk.white.bold('\n  Why we fast (beyond Ramadan):'));
    
    fastData.forEach(f => {
      console.log(chalk.blue.bold(`\n  ${f.type} (${f.when})`));
      console.log(chalk.white(`  Reward: ${f.reward}`));
      console.log(chalk.gray.italic(`  "${f.spiritualWhy}"`));
    });
    console.log('\n');
  });