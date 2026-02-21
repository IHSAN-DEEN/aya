import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CONFIG_DIR = process.env.NODE_ENV === 'test' 
    ? path.join(process.cwd(), '.aya-test') 
    : path.join(process.cwd(), '.aya');
const LOG_FILE = path.join(CONFIG_DIR, 'commits.log');
const ISSUES_FILE = path.join(CONFIG_DIR, 'issues.log');
const PULLS_FILE = path.join(CONFIG_DIR, 'pulls.log');
const REFLECTIONS_FILE = path.join(CONFIG_DIR, 'reflections.log');
const KEY_FILE = path.join(CONFIG_DIR, '.key');

// --- Encryption Helper ---
const getEncryptionKey = (): Buffer => {
    if (!fs.existsSync(KEY_FILE)) {
        // Generate a new 32-byte key
        const key = crypto.randomBytes(32);
        fs.writeFileSync(KEY_FILE, key);
        return key;
    }
    return fs.readFileSync(KEY_FILE);
};

const encrypt = (text: string): string => {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (text: string): string => {
    try {
        const key = getEncryptionKey();
        const parts = text.split(':');
        if (parts.length !== 2) return text; // Fallback for legacy unencrypted data
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedText = parts[1];
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        return text; // Fallback if decryption fails
    }
};

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

export interface Reflection {
  surah: number;
  ayah: number;
  text: string;
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
    const logEntry = encrypt(`[${timestamp}] ${message}`) + '\n';
    
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
        const decryptedLine = decrypt(line);
        // Match [timestamp] message
        const match = decryptedLine.match(/^\[(.*?)\] (.*)$/);
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
    const entry = encrypt(JSON.stringify({ id, title, status: 'open', timestamp })) + '\n';
    fs.appendFileSync(ISSUES_FILE, entry);
    return { id, title, status: 'open', timestamp };
  },

  getIssues: (): Issue[] => {
    if (!fs.existsSync(ISSUES_FILE)) return [];
    try {
        const content = fs.readFileSync(ISSUES_FILE, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim());
        return lines.map(line => {
            try {
                return JSON.parse(decrypt(line));
            } catch (e) { return null; }
        }).filter(i => i !== null);
    } catch (error) {
        return [];
    }
  },

  // Update an issue status (Close it)
  updateIssueStatus: (id: string, status: 'open' | 'closed'): boolean => {
      const issues = logger.getIssues();
      const issueIndex = issues.findIndex(i => i.id === id);
      if (issueIndex === -1) return false;
      
      issues[issueIndex].status = status;
      
      // Rewrite the file with encrypted data
      const newContent = issues.map(i => encrypt(JSON.stringify(i)) + '\n').join('');
      fs.writeFileSync(ISSUES_FILE, newContent);
      return true;
  },

  // --- Pull Requests (Duas) ---
  logPull: (title: string): Pull => {
      logger.ensureInit();
      const timestamp = new Date().toISOString();
      const id = Math.floor(Math.random() * 1000).toString();
      const entry = encrypt(JSON.stringify({ id, title, status: 'open', timestamp })) + '\n';
      fs.appendFileSync(PULLS_FILE, entry);
      return { id, title, status: 'open', timestamp };
  },

  getPulls: (): Pull[] => {
      if (!fs.existsSync(PULLS_FILE)) return [];
      try {
          const content = fs.readFileSync(PULLS_FILE, 'utf-8');
          const lines = content.split('\n').filter(line => line.trim());
          return lines.map(line => {
              try {
                  return JSON.parse(decrypt(line));
              } catch (e) { return null; }
          }).filter(p => p !== null);
      } catch (error) {
          return [];
      }
  },

  // --- Reflections (Tadabbur) ---
  logReflection: (surah: number, ayah: number, text: string): Reflection => {
      logger.ensureInit();
      const timestamp = new Date().toISOString();
      const entry = encrypt(JSON.stringify({ surah, ayah, text, timestamp })) + '\n';
      fs.appendFileSync(REFLECTIONS_FILE, entry);
      return { surah, ayah, text, timestamp };
  },

  getReflections: (): Reflection[] => {
      if (!fs.existsSync(REFLECTIONS_FILE)) return [];
      try {
          const content = fs.readFileSync(REFLECTIONS_FILE, 'utf-8');
          const lines = content.split('\n').filter(line => line.trim());
          return lines.map(line => {
              try {
                  return JSON.parse(decrypt(line));
              } catch (e) { return null; }
          }).filter(r => r !== null);
      } catch (error) {
          return [];
      }
  }
};
