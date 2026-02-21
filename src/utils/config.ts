import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(process.cwd(), '.aya');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export interface UserConfig {
  name?: string;
  intention?: string;
  location?: {
    city: string;
    country: string;
  };
  calculationMethod?: number; // 0-12
  madhab?: number; // 0=Shafi/Maliki/Hanbali (Standard), 1=Hanafi
  preferredReciter?: number;
  notifications?: boolean;
  lastPrayerCheck?: string;
}

const defaultConfig: UserConfig = {
  location: {
    city: 'Mecca',
    country: 'Saudi Arabia'
  },
  calculationMethod: 2, // ISNA
  madhab: 0 // Standard (Shafi, Maliki, Hanbali)
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
