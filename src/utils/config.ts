import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(process.cwd(), '.aya');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

interface UserConfig {
  name?: string;
  intention?: string;
  location?: {
    city: string;
    country: string;
  };
  lastPrayerCheck?: string;
}

const defaultConfig: UserConfig = {
  location: {
    city: 'Mecca',
    country: 'Saudi Arabia'
  }
};

export const getConfig = (): UserConfig => {
  if (!fs.existsSync(CONFIG_FILE)) {
    return defaultConfig;
  }
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultConfig;
  }
};

export const setConfig = (newConfig: Partial<UserConfig>) => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  const currentConfig = getConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2));
};
