export interface Vocab {
  id: string;
  ayah: string;
  missingWord: string;
  answer: string;
  meaning: string;
  category: 'fatiha' | 'names_of_allah' | 'common' | 'short_surahs';
}

export const vocabList: Vocab[] = [
  // Surah Al-Fatiha
  {
    id: 'fatiha_1',
    ayah: '_____ iyyaka na\'budu wa iyyaka nasta\'een (1:5)',
    missingWord: '[?]',
    answer: 'Iyyaka',
    meaning: 'Only You',
    category: 'fatiha'
  },
  {
    id: 'fatiha_2',
    ayah: 'Ihdina al-sirat al-_____ (1:6)',
    missingWord: '[?]',
    answer: 'mustaqeem',
    meaning: 'straight / upright',
    category: 'fatiha'
  },
  {
    id: 'fatiha_3',
    ayah: 'Maliki yawm al-_____ (1:4)',
    missingWord: '[?]',
    answer: 'deen',
    meaning: 'judgment / recompense',
    category: 'fatiha'
  },
  {
    id: 'fatiha_4',
    ayah: 'Al-hamdu lillahi rabbi al-_____ (1:2)',
    missingWord: '[?]',
    answer: 'alameen',
    meaning: 'worlds / universe',
    category: 'fatiha'
  },

  // Names of Allah
  {
    id: 'names_1',
    ayah: 'Wa huwa al-Ghafoor al-_____ (85:14)',
    missingWord: '[?]',
    answer: 'wadood',
    meaning: 'The Loving / Affectionate',
    category: 'names_of_allah'
  },
  {
    id: 'names_2',
    ayah: 'Qul huwa Allahu _____ (112:1)',
    missingWord: '[?]',
    answer: 'ahad',
    meaning: 'The One / Unique',
    category: 'names_of_allah'
  },
  {
    id: 'names_3',
    ayah: 'Ar-Rahman _____ (55:1)',
    missingWord: '[?]',
    answer: 'Ar-Raheem',
    meaning: 'The Most Merciful',
    category: 'names_of_allah'
  },

  // Common Words
  {
    id: 'common_1',
    ayah: 'Inna ma\'al usri _____ (94:6)',
    missingWord: '[?]',
    answer: 'yusra',
    meaning: 'relief / ease',
    category: 'common'
  },
  {
    id: 'common_2',
    ayah: 'Hasbuna Allah wa ni\'mal _____ (3:173)',
    missingWord: '[?]',
    answer: 'wakil',
    meaning: 'disposer of affairs / trustee',
    category: 'common'
  },
  
  // Short Surahs
  {
    id: 'short_1',
    ayah: 'Wama _____ rabbuka wama qalaa (93:3)',
    missingWord: '[?]',
    answer: 'wadda\'aka',
    meaning: 'said goodbye / abandoned',
    category: 'short_surahs'
  },
  {
    id: 'short_2',
    ayah: 'Inna a\'tayna kal _____ (108:1)',
    missingWord: '[?]',
    answer: 'kawthar',
    meaning: 'abundance / river in paradise',
    category: 'short_surahs'
  },
  {
    id: 'short_3',
    ayah: 'Idha ja\'a nasrullahi wal _____ (110:1)',
    missingWord: '[?]',
    answer: 'fath',
    meaning: 'victory / opening',
    category: 'short_surahs'
  }
];
