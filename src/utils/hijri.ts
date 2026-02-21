import axios from 'axios';
import { format } from 'date-fns';
import { logger } from './logger';

export interface HijriDate {
    day: string;
    month: {
        number: number;
        en: string;
        ar: string;
    };
    year: string;
    weekday: {
        en: string;
        ar: string;
    };
    designation: {
        abbreviated: string;
        expanded: string;
    };
}

export interface GregorianDate {
    day: string;
    month: {
        number: number;
        en: string;
    };
    year: string;
    weekday: {
        en: string;
    };
}

export interface DateConversionResult {
    hijri: HijriDate;
    gregorian: GregorianDate;
}

export const getHijriDate = async (date?: Date): Promise<DateConversionResult> => {
    const d = date || new Date();
    const dateStr = format(d, 'dd-MM-yyyy'); // for API
    const cacheKey = format(d, 'yyyy-MM-dd'); // for cache

    // Try cache first
    try {
        const cached = logger.getCachedPrayers(cacheKey);
        if (cached && cached.hijri) {
            // Construct result from cached data
            // Cached data stores { date: "YYYY-MM-DD", hijri: { ... }, ... }
            // The API response for gToH returns { hijri: ..., gregorian: ... }
            
            // We need to manually construct the Gregorian part since it's not fully in cached.hijri
            // but we have date components.
            const [year, month, day] = cacheKey.split('-').map(Number);
            const gregorian: any = {
                date: dateStr,
                format: "DD-MM-YYYY",
                day: day.toString().padStart(2, '0'),
                weekday: { en: d.toLocaleDateString('en-US', { weekday: 'long' }) },
                month: {
                    number: month,
                    en: d.toLocaleDateString('en-US', { month: 'long' })
                },
                year: year.toString(),
                designation: { abbreviated: "AD", expanded: "Anno Domini" }
            };

            return {
                hijri: cached.hijri,
                gregorian: gregorian
            };
        }
    } catch (e) {
        // Cache read failed, proceed to API
    }
    
    // Using Aladhan API
    // If user has location, we could theoretically use prayer times API which returns date too,
    // but gToH endpoint is specific for conversion.
    // Ideally we should cache this for the day to avoid repeated calls.
    
    try {
        const response = await axios.get(`http://api.aladhan.com/v1/gToH/${dateStr}`);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch Hijri date');
    }
};

export const getGregorianDate = async (hijriDay: number, hijriMonth: number, hijriYear: number): Promise<string> => {
    const response = await axios.get(`http://api.aladhan.com/v1/hToG/${hijriDay}-${hijriMonth}-${hijriYear}`);
    const data = response.data.data.gregorian;
    return `${data.day} ${data.month.en} ${data.year}`;
};

export const isWhiteDay = (hijriDay: number): boolean => {
    return [13, 14, 15].includes(hijriDay);
};
