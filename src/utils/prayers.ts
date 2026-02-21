import axios from 'axios';
import { logger } from './logger';

export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    LastThird: string;
    // Legacy/Cache compatibility
    midnight?: string;
    lastThird?: string;
}

export interface PrayerData {
    date: string;
    readableDate: string;
    hijri: any;
    timings: PrayerTimes;
    city: string;
    country: string;
    method: number;
    madhab?: number;
}

const calculateExtendedTimings = (timings: any, baseDate: Date): PrayerTimes => {
    const parseTime = (timeStr: string, addDay = 0) => {
        // timeStr format: "HH:mm (EST)" or "HH:mm"
        const cleanTime = timeStr.split(' ')[0];
        const [h, m] = cleanTime.split(':').map(Number);
        const d = new Date(baseDate);
        d.setDate(d.getDate() + addDay);
        d.setHours(h, m, 0, 0);
        return d;
    };

    const maghrib = parseTime(timings.Maghrib);
    let fajrNext = parseTime(timings.Fajr);
    
    // If Fajr is earlier than Maghrib (on the same day clock), it must be tomorrow's Fajr
    // But here we are comparing times on the SAME baseDate initially.
    // Actually, we want Fajr of the NEXT day.
    // Simple heuristic: Fajr is always AM, Maghrib is PM.
    // So Fajr (next day) is always after Maghrib (current day) in absolute time.
    fajrNext = parseTime(timings.Fajr, 1);

    const diffMs = fajrNext.getTime() - maghrib.getTime();
    const midnightTime = new Date(maghrib.getTime() + (diffMs / 2));
    const lastThirdTime = new Date(maghrib.getTime() + (diffMs * (2/3)));

    return {
        ...timings,
        Midnight: midnightTime.toLocaleTimeString('en-US', {hour12: false, hour:'2-digit', minute:'2-digit'}),
        LastThird: lastThirdTime.toLocaleTimeString('en-US', {hour12: false, hour:'2-digit', minute:'2-digit'})
    };
};

export const getPrayerTimes = async (city: string, country: string, method: number, madhab: number = 0): Promise<PrayerData> => {
    const todayKey = new Date().toISOString().split('T')[0];

    // Check cache for today
    const cached = logger.getCachedPrayers(todayKey);
    if (cached && cached.city === city && cached.method === method && (cached as any).madhab === madhab) {
        // Ensure legacy fields if missing
        if (!cached.timings.Midnight || !cached.timings.LastThird) {
             const baseDate = new Date(cached.date);
             cached.timings = calculateExtendedTimings(cached.timings, baseDate);
        }
        return cached;
    }

    // Fetch from API (Monthly Calendar)
    try {
        const now = new Date();
        const response = await axios.get('http://api.aladhan.com/v1/calendarByCity', {
            params: {
                city,
                country,
                method,
                school: madhab,
                month: now.getMonth() + 1,
                year: now.getFullYear()
            }
        });

        const days = response.data.data;
        const processedDays: PrayerData[] = days.map((day: any) => {
            // day.date.gregorian.date is "DD-MM-YYYY"
            const [d, m, y] = day.date.gregorian.date.split('-');
            const dateKey = `${y}-${m}-${d}`;
            const baseDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            
            const extendedTimings = calculateExtendedTimings(day.timings, baseDate);

            return {
                date: dateKey,
                readableDate: day.date.readable,
                hijri: day.date.hijri,
                timings: extendedTimings,
                city,
                country,
                method,
                madhab,
            } as PrayerData;
        });

        // Cache all days
        logger.cachePrayers(processedDays);

        // Find today's data
        const todayData = processedDays.find(p => p.date === todayKey);
        
        if (todayData) {
            return todayData;
        } else {
            // Fallback if today not found in calendar (edge case: month transition?)
            // Just fetch today explicitly if needed, but calendar should have it.
            throw new Error('Today not found in calendar response');
        }

    } catch (error) {
        // Fallback to single day fetch if calendar fails
        try {
            const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
                params: { city, country, method, school: madhab }
            });
            const data = response.data.data;
            const baseDate = new Date();
            const extendedTimings = calculateExtendedTimings(data.timings, baseDate);
            
            const result: PrayerData = {
                date: todayKey,
                readableDate: data.date.readable,
                hijri: data.date.hijri,
                timings: extendedTimings,
                city,
                country,
                method,
                madhab
            };
            logger.cachePrayers(result);
            return result;

        } catch (e) {
            throw new Error('Failed to fetch prayer times');
        }
    }
};
