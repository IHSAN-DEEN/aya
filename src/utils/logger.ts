import fs from 'fs';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.aya');
const LOG_FILE = path.join(CONFIG_DIR, 'commits.log');

export interface Commit {
  timestamp: string;
  message: string;
  hash: string;
}

export const logger = {
  ensureInit: () => {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
  },

  logCommit: (message: string): Commit => {
    logger.ensureInit();
    
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(LOG_FILE, logEntry);

    return {
      timestamp,
      message,
      hash: Math.random().toString(16).substring(2, 9)
    };
  },

  getCommits: (): Commit[] => {
    if (!fs.existsSync(LOG_FILE)) {
      return [];
    }

    try {
      const content = fs.readFileSync(LOG_FILE, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return lines.map(line => {
        const match = line.match(/^\[(.*?)\] (.*)$/);
        if (match) {
          return {
            timestamp: match[1],
            message: match[2],
            hash: Math.random().toString(16).substring(2, 9) // Simulated hash
          };
        }
        return null;
      }).filter((c): c is Commit => c !== null);
    } catch (error) {
      console.error('Error reading log file:', error);
      return [];
    }
  },

  getTotalDeeds: (): number => {
    if (!fs.existsSync(LOG_FILE)) return 0;
    const content = fs.readFileSync(LOG_FILE, 'utf-8');
    return content.split('\n').filter(line => line.trim()).length;
  }
};
