import { calculateSM2, getLevenshteinDistance } from '../src/commands/memorize';

describe('Memorize Logic', () => {
    // 1. Test SM-2 Algorithm
    describe('SM-2 Algorithm', () => {
        const baseItem = {
            id: 'test-1',
            question: 'Q',
            answer: 'A',
            reference: 'Ref',
            category: 'Cat',
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReviewDate: new Date().toISOString()
        };

        test('Correct answer (Quality 5) increases interval and repetitions', () => {
            const result = calculateSM2(baseItem, 5);
            expect(result.repetitions).toBe(1);
            expect(result.interval).toBe(1); // First repetition interval is always 1
            expect(result.easeFactor).toBeGreaterThan(2.5); // EF should increase slightly
        });

        test('Correct answer (Quality 4) keeps interval progression', () => {
            // Simulate 2nd repetition
            const item2 = { ...baseItem, repetitions: 1, interval: 1 };
            const result = calculateSM2(item2, 4);
            expect(result.repetitions).toBe(2);
            expect(result.interval).toBe(6); // Second repetition interval is 6
        });

        test('Incorrect answer (Quality 0-2) resets repetitions', () => {
            const item = { ...baseItem, repetitions: 5, interval: 10 };
            const result = calculateSM2(item, 1);
            expect(result.repetitions).toBe(0);
            expect(result.interval).toBe(1);
            expect(result.easeFactor).toBeLessThan(2.5); // EF decreases on failure
        });

        test('Ease Factor never drops below 1.3', () => {
            let item = { ...baseItem, easeFactor: 1.3 };
            // Fail repeatedly
            for(let i=0; i<10; i++) {
                item = calculateSM2(item, 0);
            }
            expect(item.easeFactor).toBe(1.3);
        });
    });

    // 2. Test Levenshtein Distance
    describe('Levenshtein Distance', () => {
        test('Exact match returns 0', () => {
            expect(getLevenshteinDistance('hello', 'hello')).toBe(0);
        });

        test('Single insertion returns 1', () => {
            expect(getLevenshteinDistance('hello', 'hhello')).toBe(1);
        });

        test('Single deletion returns 1', () => {
            expect(getLevenshteinDistance('hello', 'helo')).toBe(1);
        });

        test('Single substitution returns 1', () => {
            expect(getLevenshteinDistance('hello', 'hallo')).toBe(1);
        });

        test('Complex difference', () => {
            // kitten -> sitting
            // k->s (sub), i (match), t (match), t (match), e->i (sub), n (match), +g (ins)
            // distance is 3
            expect(getLevenshteinDistance('kitten', 'sitting')).toBe(3);
        });

        test('Case sensitive', () => {
            // Distance check is raw string, case handling is done outside usually
            expect(getLevenshteinDistance('Hello', 'hello')).toBe(1);
        });
    });
});
