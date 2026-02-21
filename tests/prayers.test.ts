import { getPrayerTimes, PrayerData } from '../src/utils/prayers';
import { logger } from '../src/utils/logger';

// Mock logger to avoid actual file I/O during tests
jest.mock('../src/utils/logger', () => ({
    logger: {
        getCachedPrayers: jest.fn(),
        cachePrayers: jest.fn()
    }
}));

describe('Prayer Times Utility', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return cached prayers if valid', async () => {
        const today = new Date().toISOString().split('T')[0];
        const cachedData: PrayerData = {
            date: today,
            readableDate: '01 Jan 2025',
            hijri: {},
            timings: {
                Fajr: '05:00',
                Sunrise: '06:30',
                Dhuhr: '12:00',
                Asr: '15:30',
                Sunset: '18:00',
                Maghrib: '18:00',
                Isha: '19:30',
                Imsak: '04:50',
                Midnight: '00:00',
                Firstthird: '22:00',
                LastThird: '02:00'
            },
            city: 'Makkah',
            country: 'SA',
            method: 4,
            madhab: 0
        };

        (logger.getCachedPrayers as jest.Mock).mockReturnValue(cachedData);

        const result = await getPrayerTimes('Makkah', 'SA', 4, 0);
        
        expect(result).toEqual(cachedData);
        expect(logger.getCachedPrayers).toHaveBeenCalled();
    });

    test('should calculate Midnight and LastThird correctly', async () => {
        const incompleteCache = {
            city: 'TestCity',
            method: 2,
            madhab: 0,
            date: '2024-01-01',
            timings: { 
                Fajr: '05:00', 
                Maghrib: '19:00', 
                Isha: '20:30' 
            }
        };
        (logger.getCachedPrayers as jest.Mock).mockReturnValue(incompleteCache);

        const result = await getPrayerTimes('TestCity', 'TC', 2, 0);

        expect(result.timings.Midnight).toBe('00:00');
        expect(result.timings.LastThird).toBe('01:40');
    });
});
