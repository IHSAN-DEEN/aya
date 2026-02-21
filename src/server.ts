import http from 'http';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { logger } from './utils/logger';

const PUBLIC_DIR = path.join(__dirname, '../public');

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

const readBody = (req: http.IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
        req.on('error', (err) => reject(err));
    });
};

export const startServer = (port = 0, rootFile = 'index.html'): Promise<number> => {
    return new Promise((resolve) => {
        const server = http.createServer(async (req, res) => {
            // Basic Router
            if (req.url === '/') {
                serveFile(res, path.join(PUBLIC_DIR, rootFile));
            } else if (req.url === '/index.html') {
                serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
            } else if (req.url === '/repo') {
                serveFile(res, path.join(PUBLIC_DIR, 'repo.html'));
            } else if (req.url === '/hero') {
                serveFile(res, path.join(PUBLIC_DIR, 'hero.html'));
            } else if (req.url === '/ummah') {
                serveFile(res, path.join(PUBLIC_DIR, 'ummah.html'));
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
            } else if (req.url === '/api/issues') {
                if (req.method === 'GET') {
                    const issues = logger.getIssues();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(issues));
                } else if (req.method === 'POST') {
                    try {
                        const body = await readBody(req);
                        if (body.title) {
                            const issue = logger.logIssue(body.title);
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(issue));
                        } else {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Title required' }));
                        }
                    } catch (e) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid JSON' }));
                    }
                }
            } else if (req.url?.match(/^\/api\/issues\/([^\/]+)\/close$/) && req.method === 'POST') {
                // API Endpoint: Close an issue
                const match = req.url.match(/^\/api\/issues\/([^\/]+)\/close$/);
                if (match) {
                    const issueId = match[1];
                    const success = logger.updateIssueStatus(issueId, 'closed');
                    if (success) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Issue closed' }));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Issue not found' }));
                    }
                }
            } else if (req.url === '/api/pulls') {
                if (req.method === 'GET') {
                    const pulls = logger.getPulls();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(pulls));
                } else if (req.method === 'POST') {
                    try {
                        const body = await readBody(req);
                        if (body.title) {
                            const pull = logger.logPull(body.title);
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(pull));
                        } else {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Title required' }));
                        }
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        }
    } else {
        // Try to serve static files from public directory
        const filePath = path.join(PUBLIC_DIR, req.url || '');
        // Prevent directory traversal
        if (!filePath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        fs.stat(filePath, (err, stats) => {
            if (!err && stats.isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const contentTypes: {[key: string]: string} = {
                    '.html': 'text/html',
                    '.css': 'text/css',
                    '.js': 'text/javascript',
                    '.json': 'application/json',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.svg': 'image/svg+xml'
                };
                serveFile(res, filePath, contentTypes[ext] || 'application/octet-stream');
            } else {
                // 404 for any other route
                res.writeHead(404);
                res.end('Not found');
            }
        });
    }
});

        server.listen(port, () => {
            const address = server.address();
            const assignedPort = typeof address === 'string' ? 0 : (address as any).port;
            resolve(assignedPort);
        });
    });
};

// Only run directly if executed as a script (not imported)
if (require.main === module) {
    startServer().then(port => {
        console.log(chalk.green.bold(`\n  🌙 aya Landing Page is running!`));
        console.log(chalk.white(`  Open your Book of Deeds:`));
        console.log(chalk.cyan.bold(`  http://localhost:${port}/repo`));
        console.log(chalk.white(`  Open the Hero Section:`));
        console.log(chalk.cyan.bold(`  http://localhost:${port}/hero`));
        console.log(chalk.white(`  Open the Ummah Page:`));
        console.log(chalk.cyan.bold(`  http://localhost:${port}/ummah`));
        console.log(chalk.gray(`\n  Press Ctrl+C to stop.`));
    });
}
