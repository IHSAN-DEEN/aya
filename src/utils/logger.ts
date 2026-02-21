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
const TASBIH_FILE = path.join(CONFIG_DIR, 'tasbih.log');
const KEY_FILE = path.join(CONFIG_DIR, '.key');
const PRAYERS_CACHE_FILE = path.join(CONFIG_DIR, 'prayers_cache.json');
const ZAKAT_FILE = path.join(CONFIG_DIR, 'zakat.log');

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

export interface ZakatRecord {
    date: string;
    assets: number;
    debts: number;
    net: number;
    nisab: number;
    due: number;
    isHawlStart: boolean;
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
  },

  // --- Tasbih ---
    incrementTasbih: (type: string = 'general', amount: number = 1): void => {
        logger.ensureInit();
        let data: any = { lifetime: 0, counters: {}, history: [] };
        if (fs.existsSync(TASBIH_FILE)) {
            try {
                const content = fs.readFileSync(TASBIH_FILE, 'utf-8');
                const decrypted = decrypt(content);
                const parsed = JSON.parse(decrypted);
                // Migration logic
                if (parsed.total !== undefined && parsed.lifetime === undefined) {
                    data.lifetime = parsed.total;
                    data.counters = parsed.types || {};
                } else {
                    data = { ...data, ...parsed };
                }
            } catch(e) {}
        }
        
        if (!data.counters) data.counters = {};
        if (!data.lifetime) data.lifetime = 0;

        data.counters[type] = (data.counters[type] || 0) + amount;
        data.lifetime += amount;
        data.lastUpdated = new Date().toISOString();

        fs.writeFileSync(TASBIH_FILE, encrypt(JSON.stringify(data)));
    },

    resetTasbih: (type: string): void => {
        logger.ensureInit();
        let data: any = { lifetime: 0, counters: {}, history: [] };
        if (fs.existsSync(TASBIH_FILE)) {
            try {
                const content = fs.readFileSync(TASBIH_FILE, 'utf-8');
                const decrypted = decrypt(content);
                const parsed = JSON.parse(decrypted);
                if (parsed.total !== undefined && parsed.lifetime === undefined) {
                    data.lifetime = parsed.total;
                    data.counters = parsed.types || {};
                } else {
                    data = { ...data, ...parsed };
                }
            } catch(e) {}
        }

        if (!data.counters) data.counters = {};
        if (!data.history) data.history = [];

        const currentCount = data.counters[type] || 0;
        if (currentCount > 0) {
            data.history.push({
                timestamp: new Date().toISOString(),
                type: type,
                count: currentCount
            });
        }
        
        data.counters[type] = 0;
        
        fs.writeFileSync(TASBIH_FILE, encrypt(JSON.stringify(data)));
    },

    getTasbihCount: (type: string = 'total'): number => {
        if (!fs.existsSync(TASBIH_FILE)) return 0;
        try {
            const content = fs.readFileSync(TASBIH_FILE, 'utf-8');
            const parsed = JSON.parse(decrypt(content));
            let data = parsed;
            if (parsed.total !== undefined && parsed.lifetime === undefined) {
                data = { lifetime: parsed.total, counters: parsed.types || {} };
            }
            
            if (type === 'total') return data.lifetime || 0;
            return (data.counters && data.counters[type]) ? data.counters[type] : 0;
         } catch (error) {
             return 0;
         }
     },

     getTasbihHistory: (): { timestamp: string, type: string, count: number }[] => {
         if (!fs.existsSync(TASBIH_FILE)) return [];
         try {
             const content = fs.readFileSync(TASBIH_FILE, 'utf-8');
             const parsed = JSON.parse(decrypt(content));
             // Handle legacy
             if (parsed.history) return parsed.history;
             return [];
         } catch (error) {
             return [];
         }
     },
 
    // --- Prayer Cache (Offline Support) ---
  cachePrayers: (data: any): void => {
      logger.ensureInit();
      // If data is an array (monthly), store as map
      // If data is single object (daily), store in map under its date
      
      let cache: any = {};
      if (fs.existsSync(PRAYERS_CACHE_FILE)) {
          try {
              cache = JSON.parse(fs.readFileSync(PRAYERS_CACHE_FILE, 'utf-8'));
          } catch (e) {}
      }

      if (Array.isArray(data)) {
           data.forEach((item: any) => {
               if (item.date && typeof item.date === 'string' && item.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                   // Already formatted YYYY-MM-DD (PrayerData)
                   cache[item.date] = item;
               } else if (item.date && item.date.gregorian && item.date.gregorian.date) {
                   // Aladhan format DD-MM-YYYY
                   const [d, m, y] = item.date.gregorian.date.split('-');
                   const key = `${y}-${m}-${d}`;
                   cache[key] = item;
               }
           });
       } else {
           // Single day
            if (data.date && typeof data.date === 'string' && data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                cache[data.date] = data;
            } else if (data.date && data.date.gregorian && data.date.gregorian.date) {
                 const [d, m, y] = data.date.gregorian.date.split('-');
                 const key = `${y}-${m}-${d}`;
                 cache[key] = data;
            } else {
                // Fallback
                const key = new Date().toISOString().split('T')[0];
                cache[key] = data;
            }
       }

      fs.writeFileSync(PRAYERS_CACHE_FILE, JSON.stringify(cache));
  },

  getCachedPrayers: (dateKey?: string): any | null => {
      if (!fs.existsSync(PRAYERS_CACHE_FILE)) return null;
      try {
          const cache = JSON.parse(fs.readFileSync(PRAYERS_CACHE_FILE, 'utf-8'));
          if (!dateKey) {
               // Default to today
               dateKey = new Date().toISOString().split('T')[0];
          }
          return cache[dateKey] || null;
      } catch (e) { return null; }
  },

  // --- Zakat History ---
  logZakat: (record: ZakatRecord): void => {
      logger.ensureInit();
      const entry = encrypt(JSON.stringify(record)) + '\n';
      fs.appendFileSync(ZAKAT_FILE, entry);
  },

  getZakatHistory: (): ZakatRecord[] => {
      if (!fs.existsSync(ZAKAT_FILE)) return [];
      try {
          const content = fs.readFileSync(ZAKAT_FILE, 'utf-8');
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
