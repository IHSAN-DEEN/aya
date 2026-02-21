import { logger } from '../src/utils/logger';
import fs from 'fs';
import path from 'path';

const TEST_DIR = path.join(process.cwd(), '.aya-test');

describe('Logger Utility (Core)', () => {
    beforeEach(() => {
        // Clean up before each test
        if (fs.existsSync(TEST_DIR)) {
            fs.rmSync(TEST_DIR, { recursive: true, force: true });
        }
    });

    afterAll(() => {
        // Clean up after all tests
        if (fs.existsSync(TEST_DIR)) {
            fs.rmSync(TEST_DIR, { recursive: true, force: true });
        }
    });

    test('should initialize config directory', () => {
        logger.ensureInit();
        expect(fs.existsSync(TEST_DIR)).toBe(true);
    });

    test('should log an issue (sin) and retrieve it', () => {
        const title = 'Missed Fajr';
        const issue = logger.logIssue(title);

        expect(issue).toHaveProperty('id');
        expect(issue.title).toBe(title);
        expect(issue.status).toBe('open');

        const issues = logger.getIssues();
        expect(issues).toHaveLength(1);
        expect(issues[0].title).toBe(title);
    });

    test('should close an issue', () => {
        const title = 'Backbiting';
        const issue = logger.logIssue(title);
        
        const closed = logger.updateIssueStatus(issue.id, 'closed');
        expect(closed).toBe(true);

        const issues = logger.getIssues();
        expect(issues[0].status).toBe('closed');
    });

    test('should handle encryption/decryption transparently', () => {
        const title = 'Secret Sin';
        logger.logIssue(title);
        
        // Check file content is encrypted (not plain text)
        const content = fs.readFileSync(path.join(TEST_DIR, 'issues.log'), 'utf-8');
        expect(content).not.toContain(title); // Should be encrypted
        
        // But retrieval works
        const issues = logger.getIssues();
        expect(issues[0].title).toBe(title);
    });
});
