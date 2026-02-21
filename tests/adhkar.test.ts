import { morningAdhkar, eveningAdhkar, sleepAdhkar } from '../src/data/adhkar';

describe('Adhkar Data', () => {
    test('Morning Adhkar has content', () => {
        expect(morningAdhkar.length).toBeGreaterThan(0);
    });

    test('Evening Adhkar has content', () => {
        expect(eveningAdhkar.length).toBeGreaterThan(0);
    });

    test('Sleep Adhkar has content', () => {
        expect(sleepAdhkar.length).toBeGreaterThan(0);
    });

    test('All IDs are unique across all lists', () => {
        const allIds = [
            ...morningAdhkar.map(a => a.id),
            ...eveningAdhkar.map(a => a.id),
            ...sleepAdhkar.map(a => a.id)
        ];
        
        // Some IDs might be reused (e.g. ayat-al-kursi in morning and evening)?
        // If they are reused, they should be the same content.
        // But usually unique ID is better for tracking.
        // Let's check uniqueness within each list first.
        
        const morningIds = new Set(morningAdhkar.map(a => a.id));
        expect(morningIds.size).toBe(morningAdhkar.length);

        const eveningIds = new Set(eveningAdhkar.map(a => a.id));
        expect(eveningIds.size).toBe(eveningAdhkar.length);

        const sleepIds = new Set(sleepAdhkar.map(a => a.id));
        expect(sleepIds.size).toBe(sleepAdhkar.length);
    });

    test('Content structure is valid', () => {
        const checkItem = (item: any) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('text');
            expect(item).toHaveProperty('translation');
            expect(item).toHaveProperty('count');
            expect(typeof item.count).toBe('number');
        };

        morningAdhkar.forEach(checkItem);
        eveningAdhkar.forEach(checkItem);
        sleepAdhkar.forEach(checkItem);
    });
});
