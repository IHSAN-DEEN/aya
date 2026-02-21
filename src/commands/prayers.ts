import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { getConfig, setConfig } from '../utils/config';
import { printCommandHeader } from '../utils/printer';
import { getPrayerTimes, PrayerData } from '../utils/prayers';

export const prayersCommand = new Command('prayers')
  .description('Show Prayer Times')
  .option('-c, --config', 'Configure location')
  .action(async (options) => {
    printCommandHeader('prayers');
    let config = getConfig();
    
    if (options.config || !config.location?.city || !config.location?.country) {
       const answers = await inquirer.prompt([
        { type: 'input', name: 'city', message: 'Enter your city:', default: config.location?.city },
        { type: 'input', name: 'country', message: 'Enter your country:', default: config.location?.country },
        {
            type: 'list',
            name: 'method',
            message: 'Calculation Method:',
            default: config.calculationMethod || 2,
            choices: [
                { name: 'University of Islamic Sciences, Karachi', value: 1 },
                { name: 'Islamic Society of North America (ISNA)', value: 2 },
                { name: 'Muslim World League', value: 3 },
                { name: 'Umm al-Qura University, Makkah', value: 4 },
                { name: 'Egyptian General Authority of Survey', value: 5 },
                { name: 'Institute of Geophysics, University of Tehran', value: 7 },
                { name: 'Gulf Region', value: 8 },
                { name: 'Kuwait', value: 9 },
                { name: 'Qatar', value: 10 },
                { name: 'Majlis Ugama Islam Singapura, Singapore', value: 11 },
                { name: 'Union Organization islamic de France', value: 12 },
                { name: 'Diyanet Isleri Baskanligi, Turkey', value: 13 },
                { name: 'Spiritual Administration of Muslims of Russia', value: 14 }
            ]
        },
        {
            type: 'list',
            name: 'madhab',
            message: 'Madhab (for Asr):',
            default: config.madhab || 0,
            choices: [
                { name: 'Standard (Shafi, Maliki, Hanbali)', value: 0 },
                { name: 'Hanafi', value: 1 }
            ]
        }
      ]);
      config.location = { city: answers.city, country: answers.country };
      config.calculationMethod = answers.method;
      config.madhab = answers.madhab;
      setConfig(config);
    }

    const { city, country } = config.location;
    const method = config.calculationMethod || 2;
    const madhab = config.madhab || 0;
    const spinner = ora(`Fetching prayer times for ${city}, ${country}...`).start();

    try {
      const data: PrayerData = await getPrayerTimes(city, country, method, madhab);
      spinner.stop();
      
      console.clear();
      console.log(chalk.green.bold(`\n  Prayer Times for ${city}, ${country}`));
      console.log(chalk.gray(`  ${data.readableDate} | ${data.hijri.day} ${data.hijri.month.en} ${data.hijri.year}`));
      console.log(chalk.gray('----------------------------------------'));

      const timings = data.timings;
      
      interface PrayerDisplay {
        name: string;
        time: string;
        icon: string;
        date?: Date;
      }

      const prayers: PrayerDisplay[] = [
        { name: 'Fajr', time: timings.Fajr, icon: '[FAJR]' },
        { name: 'Sunrise', time: timings.Sunrise, icon: '[SHRQ]' },
        { name: 'Dhuhr', time: timings.Dhuhr, icon: '[DHUR]' },
        { name: 'Asr', time: timings.Asr, icon: '[ASR ]' },
        { name: 'Maghrib', time: timings.Maghrib, icon: '[MAGH]' },
        { name: 'Isha', time: timings.Isha, icon: '[ISHA]' },
        { name: 'Midnight (1/2)', time: timings.Midnight || timings.midnight || '', icon: '[MID ]' },
        { name: 'Tahajjud (1/3)', time: timings.LastThird || timings.lastThird || '', icon: '[THRD]' }
      ];

      const now = new Date();
      
      const parseTime = (timeStr: string) => {
          if (!timeStr) return new Date();
          const [h, m] = timeStr.split(' ')[0].split(':').map(Number);
          const d = new Date();
          d.setHours(h, m, 0, 0);
          return d;
      };

      // Assign Date objects to prayers
      prayers.forEach(p => {
          p.date = parseTime(p.time);
      });

      // Handle wrapping for next day prayers if needed (simple check)
      // Actually, for "Next Prayer" countdown, we need to handle tomorrow's Fajr if Isha passed.
      // But for "Active Prayer", we just compare today's times.

      // Determine Active Prayer
      let activeIndex = -1;
      for (let i = 0; i < prayers.length - 2; i++) { // Exclude Midnight/Tahajjud for active check
          const current = prayers[i];
          const next = prayers[i + 1];
          
          if (now >= current.date! && now < next.date!) {
              activeIndex = i;
              break;
          }
      }
      // Handle after Isha case
      if (activeIndex === -1 && now >= prayers[5].date!) { // After Isha
          activeIndex = 5;
      }
      // Handle before Fajr case
      if (activeIndex === -1 && now < prayers[0].date!) {
          activeIndex = 5; // technically previous day's Isha, or we could say "Waiting for Fajr"
          // Let's leave it as -1 or map to Isha? 
          // If it's 3 AM, we are in Isha time until Fajr.
          activeIndex = 5; 
      }

      // Determine Next Prayer (for countdown)
      let nextPrayer: PrayerDisplay | null = null;
      let timeDiff = 0;

      // Filter out Sunrise/Midnight/Tahajjud for "Next Prayer" strictly speaking?
      // Usually users want to know next Salah.
      // But Sunrise is important to avoid praying during.
      
      const salahs = prayers.filter(p => !p.name.includes('Midnight') && !p.name.includes('Tahajjud'));
      
      for (const p of salahs) {
          let pDate = p.date!;
          if (pDate < now) {
              // If passed today, check if it's Fajr tomorrow
              if (p.name === 'Fajr') {
                  pDate = new Date(pDate);
                  pDate.setDate(pDate.getDate() + 1);
              } else {
                  continue; // Already passed
              }
          }
          
          if (pDate > now) {
              nextPrayer = p;
              timeDiff = pDate.getTime() - now.getTime();
              break; // Found the immediate next
          }
      }

      // If no next prayer found today (e.g. after Isha), next is Fajr tomorrow
      if (!nextPrayer) {
           const fajr = salahs[0];
           const fajrTomorrow = new Date(fajr.date!);
           fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
           nextPrayer = fajr;
           timeDiff = fajrTomorrow.getTime() - now.getTime();
      }

      // Render
      console.log(chalk.gray('  ----------------------------------------'));
      
      prayers.forEach((p, i) => {
          const isNext = nextPrayer && nextPrayer.name === p.name;
          const isActive = i === activeIndex && !p.name.includes('Midnight') && !p.name.includes('Tahajjud');
          
          let line = `    ${p.icon} ${p.name.padEnd(20)} ${p.time.split(' ')[0]}`;
          
          if (isActive) {
              line = chalk.bgGray.white.bold(`  > ${p.icon} ${p.name.padEnd(20)} ${p.time.split(' ')[0]}  (Active)`);
          } else if (isNext) {
              const hours = Math.floor(timeDiff / (1000 * 60 * 60));
              const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
              line = chalk.green.bold(`  * ${p.icon} ${p.name.padEnd(20)} ${p.time.split(' ')[0]}  (-${hours}h ${minutes}m)`);
          } else if (p.name.includes('Midnight') || p.name.includes('Tahajjud')) {
              line = chalk.blue(`    ${p.icon} ${p.name.padEnd(20)} ${p.time.split(' ')[0]}`);
          } else {
              line = chalk.white(line);
          }
          
          console.log(line);
      });
      
      console.log(chalk.gray('\n  ----------------------------------------'));
      console.log('');

    } catch (error) {
      spinner.fail('Failed to fetch prayer times.');
      console.error(chalk.red('Please check your internet connection or location settings.'));
    }
  });
