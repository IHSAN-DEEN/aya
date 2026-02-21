export interface HistoricalEvent {
  id: string;
  name: string;
  year: string;
  location: string;
  scene: string;
  ayah: string;
  revelation: string;
  details?: string;
}

export const eventsList: HistoricalEvent[] = [
  {
    id: 'prophethood',
    name: 'The Beginning of Prophethood',
    year: '13 BH (Before Hijrah)',
    location: 'Cave of Hira',
    scene: 'The Prophet (saw) is meditating in the cave. Jibreel (as) appears and squeezes him tight. "Read!"',
    ayah: '96:1-5',
    revelation: 'Recite in the name of your Lord who created - Created man from a clinging substance. Recite, and your Lord is the most Generous...',
    details: 'This event marked the beginning of the final revelation. The Prophet (saw) was terrified and rushed home to Khadijah (ra).'
  },
  {
    id: 'open_preaching',
    name: 'Open Preaching',
    year: '10 BH',
    location: 'Mount Safa',
    scene: 'The Prophet (saw) climbs Mount Safa and calls out to the tribes of Quraysh. He warns them of a coming punishment if they do not believe.',
    ayah: '15:94',
    revelation: 'Then declare what you are commanded and turn away from the polytheists.'
  },
  {
    id: 'taif',
    name: 'The Year of Sorrow (Taif)',
    year: '10 BH',
    location: 'Taif',
    scene: 'Rejected by Makkah, the Prophet (saw) goes to Taif. They stone him until his shoes are filled with blood. He prays for them instead of cursing them.',
    ayah: '43:31',
    revelation: 'And they said, "Why was this Qur\'an not sent down upon a great man from [one of] the two cities?"'
  },
  {
    id: 'isra_miraj',
    name: 'Isra and Mi\'raj',
    year: '9 BH',
    location: 'Jerusalem & Heavens',
    scene: 'A miraculous night journey from Makkah to Jerusalem, then ascending through the seven heavens. The gift of 5 daily prayers is given.',
    ayah: '17:1',
    revelation: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed...'
  },
  {
    id: 'migration',
    name: 'The Hijrah (Migration)',
    year: '1 AH',
    location: 'Cave of Thawr',
    scene: 'Hunted. The Prophet (saw) and Abu Bakr (ra) are hiding in a cave. The enemy is standing right outside. Abu Bakr is terrified for the Prophet.',
    ayah: '9:40',
    revelation: 'If you do not aid the Prophet - Allah has already aided him when those who disbelieved had driven him out [of Makkah] as one of two...'
  },
  {
    id: 'badr',
    name: 'Battle of Badr',
    year: '2 AH',
    location: 'Badr',
    scene: 'The Muslims are outnumbered 3 to 1. They have 2 horses. The enemy has 100. It is the first major battle. The future of Islam hangs by a thread.',
    ayah: '3:123',
    revelation: 'And Allah had already given you victory at Badr while you were few. So fear Allah; perhaps you will be grateful.'
  },
  {
    id: 'uhud',
    name: 'Battle of Uhud',
    year: '3 AH',
    location: 'Mount Uhud',
    scene: 'Victory turned into defeat. The archers left their post. The Prophet (saw) was injured. Rumors spread that he was killed.',
    ayah: '3:159',
    revelation: 'So by mercy from Allah, you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you.'
  },
  {
    id: 'trench',
    name: 'Battle of the Trench',
    year: '5 AH',
    location: 'Madinah',
    scene: '10,000 confederates besiege Madinah. The Muslims dig a trench. It is freezing cold. Hunger and fear are rampant.',
    ayah: '33:10',
    revelation: '[Remember] when they came at you from above you and from below you, and when eyes shifted [in fear], and hearts reached the throats...'
  },
  {
    id: 'hudaybiyyah',
    name: 'Treaty of Hudaybiyyah',
    year: '6 AH',
    location: 'Hudaybiyyah',
    scene: 'The Muslims are stopped from performing Umrah. A peace treaty is signed that looks like a defeat, but Allah calls it a clear victory.',
    ayah: '48:1',
    revelation: 'Indeed, We have given you, [O Muhammad], a clear conquest.'
  },
  {
    id: 'conquest',
    name: 'Conquest of Makkah',
    year: '8 AH',
    location: 'Makkah',
    scene: 'The Prophet (saw) enters Makkah with 10,000 companions. No blood is shed. He forgives those who persecuted him for years. "Go, for you are free."',
    ayah: '110:1-3',
    revelation: 'When the victory of Allah has come and the conquest, And you see the people entering into the religion of Allah in multitudes...'
  },
  {
    id: 'farewell',
    name: 'Farewell Sermon',
    year: '10 AH',
    location: 'Mount Arafat',
    scene: 'The Prophet (saw) delivers his final sermon to over 100,000 Muslims. He emphasizes equality, women\'s rights, and the sanctity of life and property.',
    ayah: '5:3',
    revelation: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.'
  }
];

export interface IslamicEvent {
  event: string;
  action: string;
}

export const getIslamicEvent = (day: number, month: number, weekday: string): IslamicEvent | null => {
  // Priority 1: Specific Annual Days (Eid, Arafah, Ashura, Odd Nights)
  switch (month) {
    case 1: // Muharram
      if (day === 9) return { event: 'Tasua (9th Muharram)', action: 'Sunnah to Fast (along with 10th).' };
      if (day === 10) return { event: 'Ashura (10th Muharram)', action: 'Sunnah to Fast. Expiates sins of the previous year.' };
      if (day === 11) return { event: '11th Muharram', action: 'Sunnah to Fast (if you missed 9th).' };
      break;
    case 8: // Shaban
      if (day === 15) return { event: 'Mid-Shaban', action: 'Prepare your heart for Ramadan.' };
      break;
    case 9: // Ramadan
      if (day >= 21 && day % 2 !== 0) return { event: 'Odd Night of Last 10 Days', action: 'Seek Laylatul Qadr. Pray Qiyam.' };
      break;
    case 10: // Shawwal
      if (day === 1) return { event: 'Eid al-Fitr', action: 'Celebrate! Haram to fast. Pay Zakat al-Fitr before Salah.' };
      break;
    case 12: // Dhul Hijjah
      if (day === 9) return { event: 'Day of Arafah', action: 'Fast! Expiates sins of previous and coming year. Make much Dua.' };
      if (day === 10) return { event: 'Eid al-Adha', action: 'Sacrifice (Udhiya). Haram to fast. Takbeer.' };
      if (day >= 11 && day <= 13) return { event: 'Days of Tashreeq', action: 'Eat, drink, and remember Allah. Haram to fast.' };
      break;
  }

  // Priority 2: Weekly Events (Friday)
  if (weekday.toLowerCase() === 'friday') {
    return {
      event: 'Jumu\'ah (Friday)',
      action: 'Read Surah Al-Kahf, Send Salawat, Attend Jumu\'ah Prayer.'
    };
  }

  // Priority 3: Monthly Events (White Days)
  if ([13, 14, 15].includes(day)) {
    if (month !== 9 && !(month === 12 && day === 13)) { // Not Ramadan, not 13th Dhul Hijjah
       return {
         event: 'The White Days (Ayyam al-Bid)',
         action: 'Sunnah to Fast. Like fasting the whole month.'
       };
    }
  }

  // Priority 4: Weekly Fasting (Mon/Thu) - ONLY if not Eid/Tashreeq (Already handled in Priority 1)
  if (weekday.toLowerCase() === 'monday' || weekday.toLowerCase() === 'thursday') {
     if (month !== 9) { // Not Ramadan
        return {
          event: `It is ${weekday}`,
          action: 'Sunnah to Fast today. The deeds are presented to Allah.'
        };
     }
  }

  // Priority 5: General Month Events
  switch (month) {
    case 9: // Ramadan
      return { event: 'Month of Ramadan', action: 'Fasting, Quran, Taraweeh, Charity.' };
    case 10: // Shawwal
      if (day > 1 && day <= 30) return { event: 'Month of Shawwal', action: 'Fast 6 days to complete the reward of the year.' };
      break;
    case 12: // Dhul Hijjah
      if (day >= 1 && day <= 8) return { event: 'First 10 Days of Dhul Hijjah', action: 'Increase Dhikr (Takbeer), Fasting, and Charity. Best days of the year.' };
      break;
  }

  // Default
  return null;
};
