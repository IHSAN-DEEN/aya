import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import ora from 'ora';
import { printCommandHeader } from '../utils/printer';

interface AyahMatch {
    number: number;
    text: string;
    surah: {
        englishName: string;
        number: number;
    };
    numberInSurah: number;
}

export const seekCommand = new Command('seek')
  .description('Search the Quran (English) by topic or keyword')
  .argument('[keyword]', 'Keyword to search for')
  .action(async (keyword) => {
    printCommandHeader('seek');

    if (!keyword) {
        const answer = await inquirer.prompt([{
            type: 'input',
            name: 'term',
            message: 'What topic or word are you seeking?',
            validate: (input) => input.length > 2 ? true : 'Please enter at least 3 characters.'
        }]);
        keyword = answer.term;
    }

    const spinner = ora(`Searching Quran for "${keyword}"...`).start();

    try {
        // Search API: http://api.alquran.cloud/v1/search/{keyword}/all/en
        // We use 'en.sahih' edition for English translation
        const response = await axios.get(`http://api.alquran.cloud/v1/search/${encodeURIComponent(keyword)}/all/en.sahih`);
        
        spinner.stop();
        
        let matches: AyahMatch[] = response.data.data.matches;
        let count = response.data.data.count;

        if (count === 0) {
            console.log(chalk.yellow(`\n  No verses found for "${keyword}". Try a different word.`));
            return;
        }

        console.log(chalk.green.bold(`\n  Found ${count} verses mentioning "${keyword}"`));
        
        let currentIndex = 0;
        const pageSize = 5;

        while (true) {
            console.clear();
            if (currentIndex === 0) {
                printCommandHeader('seek');
            } else {
                console.log(chalk.green.bold(`\n  aya seek: "${keyword}"`));
                console.log(chalk.gray('  ----------------------------------------'));
            }

            console.log(chalk.green.bold(`\n  Found ${count} verses mentioning "${keyword}"`));
            console.log(chalk.gray(`  Showing results ${currentIndex + 1} - ${Math.min(currentIndex + pageSize, count)} of ${count}\n`));

            const currentMatches = matches.slice(currentIndex, currentIndex + pageSize);

            currentMatches.forEach((match, index) => {
                console.log(chalk.cyan(`  ${currentIndex + index + 1}. Surah ${match.surah.englishName} (${match.surah.number}:${match.numberInSurah})`));
                console.log(chalk.white(`     "${match.text}"`));
                console.log(chalk.gray('     -------------------'));
            });

            const choices = [];
            if (currentIndex + pageSize < count) {
                choices.push({ name: 'Next Page', value: 'next' });
            }
            if (currentIndex > 0) {
                choices.push({ name: 'Previous Page', value: 'prev' });
            }
            choices.push({ name: 'New Search', value: 'search' });
            choices.push({ name: 'Exit', value: 'exit' });

            const { action } = await inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'Navigate results:',
                choices
            }]);

            if (action === 'next') {
                currentIndex += pageSize;
            } else if (action === 'prev') {
                currentIndex -= pageSize;
            } else if (action === 'search') {
                const answer = await inquirer.prompt([{
                    type: 'input',
                    name: 'term',
                    message: 'What topic or word are you seeking?',
                    validate: (input) => input.length > 2 ? true : 'Please enter at least 3 characters.'
                }]);
                keyword = answer.term;
                
                const newSpinner = ora(`Searching Quran for "${keyword}"...`).start();
                try {
                    const newResponse = await axios.get(`http://api.alquran.cloud/v1/search/${encodeURIComponent(keyword)}/all/en.sahih`);
                    newSpinner.stop();
                    matches = newResponse.data.data.matches;
                    count = newResponse.data.data.count;
                    currentIndex = 0;
                    
                    if (count === 0) {
                        console.log(chalk.yellow(`\n  No verses found for "${keyword}".`));
                        // Ask again? Or break?
                        // Let's just continue loop which will re-render header but matches is empty?
                        // Wait, if matches is empty, the loop will crash on slice?
                        // No, slice(0, 5) on empty array is [].
                        // But we should probably handle it gracefully.
                        // Actually, if count is 0, we should probably prompt again.
                        // But for simplicity, let's just let it fall through and show 0 results.
                    }
                } catch (e: any) {
                    newSpinner.stop();
                    if (e.response && e.response.status === 404) {
                         console.log(chalk.yellow(`\n  No verses found for "${keyword}".`));
                         matches = [];
                         count = 0;
                         currentIndex = 0;
                    } else {
                        console.error(chalk.red('\n  Could not connect to Quran API.'));
                        return;
                    }
                }
            } else {
                break;
            }
        }

    } catch (error: any) {
        spinner.stop(); // Ensure spinner stops
        
        if (error.response && error.response.status === 404) {
             console.log(chalk.yellow(`\n  No verses found for "${keyword}".`));
             console.log(chalk.gray(`  Tip: The search is in English. If you searched for an Arabic name (e.g., "Yusuf"), try the English equivalent (e.g., "Joseph").`));
        } else {
            console.error(chalk.red('\n  Could not connect to Quran API. Please check your internet.'));
        }
    }
  });
