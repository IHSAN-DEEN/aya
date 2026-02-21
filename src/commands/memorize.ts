import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { printCommandHeader } from '../utils/printer';

// Data Types
interface MemorizeItem {
    id: string;
    question: string; // The verse with a blank or prompt
    answer: string;   // The missing part
    reference: string; // Surah:Ayah
    category: string;
    
    // SRS State
    easeFactor: number; // SM-2 EF, default 2.5
    interval: number;   // Days until next review
    repetitions: number; // Consecutive correct answers
    nextReviewDate: string; // ISO Date string
}

const MEMORIZE_FILE = path.join(os.homedir(), '.aya', 'memorize-srs.json');

// Initial Dataset (Can be expanded)
const INITIAL_ITEMS: MemorizeItem[] = [
    {
        id: 'fatiha-1',
        question: 'Al-Hamdu lillahi _____ Al-Alamin',
        answer: 'Rabb',
        reference: 'Al-Fatiha 1:2',
        category: 'Surah Al-Fatiha',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString()
    },
    {
        id: 'fatiha-2',
        question: 'Maliki Yawm _____',
        answer: 'Ad-Deen',
        reference: 'Al-Fatiha 1:4',
        category: 'Surah Al-Fatiha',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString()
    },
    {
        id: 'ikhlas-1',
        question: 'Qul Huwa Allahu _____',
        answer: 'Ahad',
        reference: 'Al-Ikhlas 112:1',
        category: 'Short Surahs',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString()
    },
    {
        id: 'ikhlas-2',
        question: 'Allahu _____',
        answer: 'As-Samad',
        reference: 'Al-Ikhlas 112:2',
        category: 'Short Surahs',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString()
    },
    {
        id: 'kursi-1',
        question: 'Allahu la ilaha illa Huwa, Al-Hayyu _____',
        answer: 'Al-Qayyum',
        reference: 'Al-Baqarah 2:255',
        category: 'Ayat Al-Kursi',
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString()
    }
];

function loadItems(): MemorizeItem[] {
    try {
        if (fs.existsSync(MEMORIZE_FILE)) {
            const data = JSON.parse(fs.readFileSync(MEMORIZE_FILE, 'utf-8'));
            // Merge with initial items to ensure new content is available if file is old
            // Simple merge: if id not in file, add it.
            const existingIds = new Set(data.map((i: MemorizeItem) => i.id));
            const newItems = INITIAL_ITEMS.filter(i => !existingIds.has(i.id));
            return [...data, ...newItems];
        }
    } catch (error) {
        // Ignore
    }
    return [...INITIAL_ITEMS];
}

function saveItems(items: MemorizeItem[]) {
    try {
        const dir = path.dirname(MEMORIZE_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(MEMORIZE_FILE, JSON.stringify(items, null, 2));
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

// SM-2 Algorithm Implementation
// Quality: 0-5 (0=blackout, 3=pass, 5=perfect)
export function calculateSM2(item: MemorizeItem, quality: number): MemorizeItem {
    let { easeFactor, interval, repetitions } = item;

    if (quality >= 3) {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
    } else {
        repetitions = 0;
        interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);

    return {
        ...item,
        easeFactor,
        interval,
        repetitions,
        nextReviewDate: nextDate.toISOString()
    };
}

// Levenshtein distance for fuzzy matching
export function getLevenshteinDistance(a: string, b: string): number {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1  // deletion
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

export const memorizeCommand = new Command('memorize')
    .description('Spaced Repetition (SRS) for Quran Memorization')
    .action(async () => {
        printCommandHeader('memorize');
        
        const items = loadItems();
        const now = new Date();
        
        // Filter items due for review
        const dueItems = items.filter(i => new Date(i.nextReviewDate) <= now);
        
        console.log(chalk.cyan.bold('\n  Quran Memorization (Spaced Repetition)'));
        console.log(chalk.gray(`  Due for review: ${dueItems.length} / Total: ${items.length}`));
        console.log('');

        if (dueItems.length === 0) {
            console.log(chalk.green('  You are all caught up! MashaAllah.'));
            console.log(chalk.gray('  Come back tomorrow for more revisions.'));
            console.log('');
            return;
        }

        let reviewedCount = 0;
        
        for (const item of dueItems) {
            console.log(chalk.gray('----------------------------------------'));
            console.log(chalk.white.bold(`  Complete the Ayah (${item.category}):`));
            console.log(chalk.yellow(`  "${item.question}"`));
            console.log(chalk.gray(`  Ref: ${item.reference}`));
            console.log('');

            // Ask for user input to test memory active recall
            const { userAttempt } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'userAttempt',
                    message: 'Your Answer (or press Enter to reveal):'
                }
            ]);

            const cleanString = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const cleanAttempt = cleanString(userAttempt || '');
            const cleanAnswer = cleanString(item.answer);
            
            // Fuzzy match logic
            // Allow 1 error per 5 characters roughly, or max 2 errors for short words
            const distance = getLevenshteinDistance(cleanAttempt, cleanAnswer);
            const threshold = Math.max(1, Math.floor(cleanAnswer.length * 0.2)); 
            
            const isCorrect = userAttempt && (cleanAttempt === cleanAnswer || distance <= threshold);

            if (isCorrect) {
                if (distance > 0) {
                    console.log(chalk.green.bold('  ✅ Correct! (Close enough)'));
                    console.log(chalk.gray(`  You typed: "${userAttempt}"`));
                    console.log(chalk.gray(`  Exact:     "${item.answer}"`));
                } else {
                    console.log(chalk.green.bold('  ✅ Correct! MashaAllah.'));
                }
            } else if (userAttempt) {
                console.log(chalk.red.bold('  ❌ Incorrect.'));
                console.log(chalk.green.bold(`  Correct Answer: ${item.answer}`));
                if (distance <= threshold + 2) {
                     console.log(chalk.yellow(`  (You were close! Distance: ${distance})`));
                }
            } else {
                console.log(chalk.yellow('  (Revealed)'));
                console.log(chalk.green.bold(`  Answer: ${item.answer}`));
            }
            console.log('');

            const { quality } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'quality',
                    message: 'How well did you know it?',
                    choices: [
                        { name: '5 - Perfect (No hesitation)', value: 5 },
                        { name: '4 - Good (Little hesitation)', value: 4 },
                        { name: '3 - Pass (Recall with effort)', value: 3 },
                        { name: '2 - Hard (Wrong/Forgot)', value: 2 },
                        { name: '1 - Blackout (No clue)', value: 1 } // Simplified, usually 0-5
                    ],
                    default: isCorrect ? 0 : 3 // Default to Perfect if correct, else Hard
                }
            ]);

            // Update item
            const updatedItem = calculateSM2(item, quality);
            
            // Update in main array
            const index = items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                items[index] = updatedItem;
            }

            reviewedCount++;
            saveItems(items); // Save after each to be safe

            const { continue: keepGoing } = await inquirer.prompt([
                { type: 'confirm', name: 'continue', message: 'Continue to next?', default: true }
            ]);
            
            if (!keepGoing) break;
        }

        console.log(chalk.green.bold(`\n  Session complete! Reviewed ${reviewedCount} items.`));
    });

memorizeCommand
    .command('export')
    .description('Export progress to JSON file')
    .argument('[file]', 'Output file path (default: aya-memorize-export.json)')
    .action(async (fileArg) => {
        const items = loadItems();
        const targetFile = fileArg ? path.resolve(fileArg) : path.join(process.cwd(), 'aya-memorize-export.json');
        try {
            fs.writeFileSync(targetFile, JSON.stringify(items, null, 2));
            console.log(chalk.green(`\n✅ Exported ${items.length} items to ${targetFile}`));
        } catch (error) {
            console.error(chalk.red(`\n❌ Failed to export: ${error instanceof Error ? error.message : String(error)}`));
        }
    });

memorizeCommand
    .command('import')
    .description('Import progress from JSON file')
    .argument('<file>', 'Input file path')
    .option('--merge', 'Merge with existing data', true)
    .option('--overwrite', 'Overwrite existing data', false)
    .action(async (fileArg, options) => {
        const sourceFile = path.resolve(fileArg);
        if (!fs.existsSync(sourceFile)) {
            console.error(chalk.red('\n❌ File not found.'));
            return;
        }
        
        try {
            const data = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));
            if (!Array.isArray(data)) {
                console.error(chalk.red('\n❌ Invalid format: Expected an array of items.'));
                return;
            }

            const currentItems = loadItems();
            const currentIds = new Map(currentItems.map(i => [i.id, i]));
            let added = 0;
            let updated = 0;
            
            for (const item of data) {
                if (!item.id || !item.question || !item.answer) continue; 
                
                if (currentIds.has(item.id)) {
                    if (options.overwrite) {
                        currentIds.set(item.id, item);
                        updated++;
                    }
                } else {
                    currentIds.set(item.id, item);
                    added++;
                }
            }
            
            saveItems(Array.from(currentIds.values()));
            console.log(chalk.green(`\n✅ Imported: ${added} new items.`));
            if (updated > 0) console.log(chalk.yellow(`   Updated: ${updated} items.`));
            else if (data.length > added) console.log(chalk.gray(`   Skipped: ${data.length - added - updated} existing items (use --overwrite to update).`));

        } catch (error) {
             console.error(chalk.red(`\n❌ Failed to import: ${error instanceof Error ? error.message : String(error)}`));
        }
    });
