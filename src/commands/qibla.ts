import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import { getConfig } from '../utils/config';
import ora from 'ora';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';

export const qiblaCommand = new Command('qibla')
  .description('Find the direction and distance to the Kaaba')
  .action(async () => {
    printCommandHeader('qibla');
    let config = getConfig();
    let city = config.location?.city;
    let country = config.location?.country;

    if (!city || !country) {
      console.log(chalk.yellow('Location not configured.'));
      const answers = await inquirer.prompt([
        { type: 'input', name: 'city', message: 'Enter your city:' },
        { type: 'input', name: 'country', message: 'Enter your country:' }
      ]);
      city = answers.city;
      country = answers.country;
    }

    const spinner = ora(`Locating Kaaba from ${city}, ${country}...`).start();

    try {
      // 1. Get coordinates for the city
      const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: { city, country }
      });

      const meta = response.data.data.meta;
      const lat = meta.latitude;
      const long = meta.longitude;

      // 2. Get Qibla direction
      const qiblaResponse = await axios.get(`http://api.aladhan.com/v1/qibla/${lat}/${long}`);
      const direction = qiblaResponse.data.data.direction; // Degrees from North

      spinner.stop();

      console.clear();
      console.log(chalk.green.bold('\n  Qibla Finder'));
      console.log(chalk.gray('----------------------------------------'));
      console.log(chalk.white(`Location: ${chalk.bold(city)}, ${country}`));
      console.log(chalk.white(`Coordinates: ${lat}, ${long}`));
      console.log(chalk.cyan.bold(`Qibla Direction: ${Math.round(direction)}° from North (Clockwise)`));
      console.log('');
      
      // Calculate Distance (Haversine Formula)
      // Kaaba coordinates: 21.4225° N, 39.8262° E
      const kaabaLat = 21.4225;
      const kaabaLong = 39.8262;
      const distance = getDistanceFromLatLonInKm(lat, long, kaabaLat, kaabaLong);
      
      console.log(chalk.blue(`Distance to Kaaba: ${Math.round(distance).toLocaleString()} km`));
      console.log('');

      // ASCII Compass Visualization
      drawCompass(direction);
      
      console.log('');
      console.log(chalk.gray('Turn your face towards the Sacred Mosque.'));
      console.log(chalk.italic('"So turn your face toward al-Masjid al-Haram." (2:144)'));

    } catch (error) {
      spinner.fail('Could not calculate Qibla.');
      console.error(chalk.red('Please check your internet connection or location settings.'));
    }
  });

function drawCompass(degree: number) {
  const needle = getArrow(degree);
  const compass = `
      N
      |
  W --+-- E
      |
      S
  `;
  // We can't easily rotate the whole compass in ASCII without complex logic.
  // Instead, we show the needle direction relative to North.
  
  console.log(chalk.yellow.bold('      N'));
  console.log(chalk.yellow.bold('      |'));
  
  // Show the direction arrow
  console.log(chalk.green.bold(`      ${needle}  (${Math.round(degree)}°)`));
  
  console.log(chalk.yellow.bold('      |'));
}

function getArrow(degree: number): string {
  const normalized = (degree % 360 + 360) % 360;
  
  if (normalized >= 337.5 || normalized < 22.5) return '^';
  if (normalized >= 22.5 && normalized < 67.5)  return '/';
  if (normalized >= 67.5 && normalized < 112.5) return '>';
  if (normalized >= 112.5 && normalized < 157.5) return '\\';
  if (normalized >= 157.5 && normalized < 202.5) return 'v';
  if (normalized >= 202.5 && normalized < 247.5) return '/';
  if (normalized >= 247.5 && normalized < 292.5) return '<';
  if (normalized >= 292.5 && normalized < 337.5) return '\\';
  
  return '^';
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}
