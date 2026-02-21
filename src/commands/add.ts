import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { printCommandHeader } from '../utils/printer';

const STAGING_FILE = path.join(os.homedir(), '.aya', 'staging.json');

interface StagedItem {
  id: string;
  content: string;
  timestamp: string;
}

export const addCommand = new Command('add')
  .description('Stage an intention or task (I\'dad)')
  .argument('[intention...]', 'The intention or task to stage')
  .action(async (intentionParts) => {
    printCommandHeader('add');
    
    let content = intentionParts ? intentionParts.join(' ') : '';

    if (!content) {
      console.log(chalk.yellow('Please provide an intention to stage.'));
      console.log(chalk.gray('Usage: aya add "Read Surah Kahf"'));
      return;
    }

    // Load existing staged items
    let stagedItems: StagedItem[] = [];
    if (fs.existsSync(STAGING_FILE)) {
      try {
        stagedItems = JSON.parse(fs.readFileSync(STAGING_FILE, 'utf-8'));
      } catch (e) {
        stagedItems = [];
      }
    }

    // Add new item
    const newItem: StagedItem = {
      id: Math.random().toString(36).substring(7),
      content,
      timestamp: new Date().toISOString()
    };
    
    stagedItems.push(newItem);

    // Ensure directory exists
    const dir = path.dirname(STAGING_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(STAGING_FILE, JSON.stringify(stagedItems, null, 2));

    console.log(chalk.green(`\n[+] Staged: "${content}"`));
    console.log(chalk.gray(`You have ${stagedItems.length} staged item(s).`));
    console.log(chalk.cyan('Run `aya commit` to complete and record them.'));
  });
