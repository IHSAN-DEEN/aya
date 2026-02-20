import fs from 'fs';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.aya');
const LOG_FILE = path.join(CONFIG_DIR, 'commits.log');
const ISSUES_FILE = path.join(CONFIG_DIR, 'issues.log');
const PULLS_FILE = path.join(CONFIG_DIR, 'pulls.log');

export interface Commit {
  timestamp: string;
  message: string;
  hash: string;
  path?: string; // Optional file path simulation
}

export interface Issue {
  id: string;
  title: string;
  status: 'open' | 'closed';
  timestamp: string;
}

export interface Pull {
  id: string;
  title: string;
  status: 'open' | 'merged' | 'closed';
  timestamp: string;
}

export const logger = {
  ensureInit: () => {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
  },

  // --- Commits (Deeds) ---
  logCommit: (message: string): Commit => {
    logger.ensureInit();
    
    const timestamp = new Date().toISOString();
    // Simple format: [ISO] Message
    const logEntry = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(LOG_FILE, logEntry);

    return {
      timestamp,
      message,
      hash: Math.random().toString(16).substring(2, 9)
    };
  },

  getCommits: (): Commit[] => {
    if (!fs.existsSync(LOG_FILE)) return [];

    try {
      const content = fs.readFileSync(LOG_FILE, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return lines.map(line => {
        // Match [timestamp] message
        const match = line.match(/^\[(.*?)\] (.*)$/);
        if (match) {
            // Generate a deterministic-looking hash from timestamp
            const hash = Math.abs(match[1].split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).substring(0,7);
            return {
                timestamp: match[1],
                message: match[2],
                hash: hash
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
  },

  // --- Issues (Istighfar/Sins) ---
  logIssue: (title: string): Issue => {
    logger.ensureInit();
    const timestamp = new Date().toISOString();
    const id = Math.floor(Math.random() * 1000).toString();
    const entry = JSON.stringify({ id, title, status: 'open', timestamp }) + '\n';
    fs.appendFileSync(ISSUES_FILE, entry);
    return { id, title, status: 'open', timestamp };
  },

  getIssues: (): Issue[] => {
    if (!fs.existsSync(ISSUES_FILE)) return [];
    try {
        const content = fs.readFileSync(ISSUES_FILE, 'utf-8');
        return content.trim().split('\n').map(line => JSON.parse(line));
    } catch (e) { return []; }
  },

  // --- Pulls (Duas) ---
  logPull: (title: string): Pull => {
    logger.ensureInit();
    const timestamp = new Date().toISOString();
    const id = Math.floor(Math.random() * 1000).toString();
    const entry = JSON.stringify({ id, title, status: 'open', timestamp }) + '\n';
    fs.appendFileSync(PULLS_FILE, entry);
    return { id, title, status: 'open', timestamp };
  },

  getPulls: (): Pull[] => {
    if (!fs.existsSync(PULLS_FILE)) return [];
    try {
        const content = fs.readFileSync(PULLS_FILE, 'utf-8');
        return content.trim().split('\n').map(line => JSON.parse(line));
    } catch (e) { return []; }
  }
};
