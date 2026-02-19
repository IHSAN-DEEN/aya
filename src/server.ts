import http from 'http';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { logger } from './utils/logger';

const PUBLIC_DIR = path.join(__dirname, '../public');

// Let OS assign a free port (0) to avoid conflicts
const PORT = 0;

const serveFile = (res: http.ServerResponse, filePath: string, contentType: string = 'text/html') => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

const server = http.createServer((req, res) => {
    // Basic Router
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
    } else if (req.url === '/repo') {
        serveFile(res, path.join(PUBLIC_DIR, 'repo.html'));
    } else if (req.url === '/api/commits') {
        // API Endpoint: Serve commits log as JSON using the Logger utility
        try {
            const commits = logger.getCommits();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(commits));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to read logs' }));
        }
    } else {
        // 404 for any other route
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    const address = server.address();
    const port = typeof address === 'string' ? address : (address as any).port;
    
    console.log(chalk.green.bold(`\n  🌙 aya Landing Page is running!`));
    console.log(chalk.white(`  Open your Book of Deeds:`));
    console.log(chalk.cyan.bold(`  http://localhost:${port}/repo`));
    console.log(chalk.gray(`\n  Press Ctrl+C to stop.`));
});
