import { RECITERS, getPlayCommand } from '../src/commands/recite';
import os from 'os';

jest.mock('os');

describe('Recite Command', () => {
    describe('Reciters Data', () => {
        test('Should have valid reciter list', () => {
            expect(RECITERS.length).toBeGreaterThan(0);
            RECITERS.forEach(reciter => {
                expect(reciter).toHaveProperty('name');
                expect(reciter).toHaveProperty('id');
                expect(typeof reciter.id).toBe('number');
            });
        });

        test('Should contain key reciters', () => {
            const names = RECITERS.map(r => r.name);
            expect(names).toContain('Mishary Rashid Alafasy');
            expect(names).toContain('AbdulBaset AbdulSamad');
        });
    });

    describe('getPlayCommand', () => {
        test('Should return afplay for darwin (macOS)', () => {
            (os.platform as jest.Mock).mockReturnValue('darwin');
            const cmd = getPlayCommand('test.mp3');
            expect(cmd).toBe('afplay "test.mp3"');
        });

        test('Should return mpg123 for linux', () => {
            (os.platform as jest.Mock).mockReturnValue('linux');
            const cmd = getPlayCommand('test.mp3');
            expect(cmd).toBe('mpg123 "test.mp3"');
        });

        test('Should return start for win32', () => {
            (os.platform as jest.Mock).mockReturnValue('win32');
            const cmd = getPlayCommand('test.mp3');
            expect(cmd).toContain('start "" "test.mp3"');
        });

        test('Should fallback to beep for unknown platform', () => {
            (os.platform as jest.Mock).mockReturnValue('sunos');
            const cmd = getPlayCommand('test.mp3');
            expect(cmd).toContain('process.stdout.write');
        });
    });
});
