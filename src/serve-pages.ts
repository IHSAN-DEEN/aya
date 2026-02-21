import { startServer } from './server';
import chalk from 'chalk';

const run = async () => {
    try {
        // Start Landing Page Server (index.html at root)
        const landingPort = await startServer(0, 'index.html');
        console.log(chalk.green.bold(`\n  🌙 aya Landing Page running on:`));
        console.log(chalk.cyan.bold(`  http://localhost:${landingPort}/`));

        // Start Hero Page Server (hero.html at root)
        const heroPort = await startServer(0, 'hero.html');
        console.log(chalk.yellow.bold(`\n  ✨ aya Hero Section running on:`));
        console.log(chalk.cyan.bold(`  http://localhost:${heroPort}/`));

        // Start Repo Page Server (repo.html at root)
        const repoPort = await startServer(0, 'repo.html');
        console.log(chalk.green.bold(`\n  📖 aya Book of Deeds running on:`));
        console.log(chalk.cyan.bold(`  http://localhost:${repoPort}/repo`));

        console.log(chalk.gray(`\n  Press Ctrl+C to stop all servers.`));
    } catch (error) {
        console.error('Failed to start servers:', error);
        process.exit(1);
    }
};

run();
