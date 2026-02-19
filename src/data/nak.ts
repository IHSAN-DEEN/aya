export interface NazmStructure {
  surah: string;
  ayahs: string[];
  connections: Array<[number, number]>; // indices of connected ayahs (1-based or 0-based? Let's use 1-based for display, map to 0-based)
  center?: number; // index of the center ayah
  description: string;
}

export const nazmData: NazmStructure[] = [
  {
    surah: 'Al-Fatiha',
    ayahs: [
      '1. In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      '2. [All] praise is [due] to Allah, Lord of the worlds -',
      '3. The Entirely Merciful, the Especially Merciful,',
      '4. Sovereign of the Day of Recompense.',
      '5. It is You we worship and You we ask for help.',
      '6. Guide us to the straight path -',
      '7. The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.'
    ],
    connections: [
      [1, 7], // Request for guidance matches praise of the Guide / Path of favored vs anger
      [2, 6], // Lord of worlds vs Guide us
      [3, 5]  // Merciful vs Worship/Help (Wait, let's follow the user example strictly)
      // User example:
      // Line 1 connects to Line 7 (Request for guidance matches the praise of the Guide).
      // Line 2 connects to Line 6.
      // The middle (Ayah 4) is the heart.
    ],
    center: 4,
    description: 'The Ring Structure of Surah Al-Fatiha'
  }
];

export interface DiffChallenge {
  prompt: string;
  options: { label: string; value: string; isCorrect: boolean }[];
  reveal: string;
  lesson: string;
}

export const diffData: DiffChallenge[] = [
  {
    prompt: 'Allah describes the doubt in the Quran as _____ (2:2).',
    options: [
      { label: 'A) Shakk (Normal doubt)', value: 'Shakk', isCorrect: false },
      { label: 'B) Rayb (Doubt + Suspicion/Unease)', value: 'Rayb', isCorrect: true }
    ],
    reveal: 'Rayb',
    lesson: '"Shakk is just 50/50 uncertainty. Rayb is a doubt that makes you restless. The disbelievers weren\'t just unsure; they were uneasy."'
  },
  {
    prompt: 'When describing the "fear" of the believers, Allah often uses _____ instead of Khawf.',
    options: [
      { label: 'A) Khawf (General fear)', value: 'Khawf', isCorrect: false },
      { label: 'B) Khashyah (Fear with knowledge/awe)', value: 'Khashyah', isCorrect: true }
    ],
    reveal: 'Khashyah',
    lesson: 'Khawf is instinctive (like fearing a snake). Khashyah is based on knowing the greatness of who you fear. Scientists have Khashyah of Allah.'
  }
];

export interface MirrorTest {
  question: string;
  options: { label: string; result: string; prescription: string }[];
}

export const mirrorData: MirrorTest[] = [
  {
    question: 'How do you react when you make a mistake?',
    options: [
      { 
        label: 'Run away / Blame others', 
        result: 'You are currently in the state of Adam (AS) before repentance (initially) or potentially drifting.',
        prescription: 'Turn back immediately. "Our Lord, we have wronged ourselves..."'
      },
      { 
        label: 'Admit immediately', 
        result: 'You are currently in the state of Yunus (AS) / Adam (AS) after realization.', 
        prescription: 'Your relief lies in the admission: "Subhanaka inni kuntu min az-zalimeen" (There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers).'
      },
      {
        label: 'Justify it',
        result: 'You are risking the state of Iblis.',
        prescription: 'Beware of arrogance. Iblis said "I am better than him". Justification locks the door to repentance.'
      }
    ]
  }
];

export interface SoundAnalysis {
  ref: string; // e.g. "100:1"
  surah: string;
  ayah: number;
  text: string;
  analysis: string;
}

export const soundData: SoundAnalysis[] = [
  {
    ref: '100:1',
    surah: 'Al-Adiyat',
    ayah: 1,
    text: 'Wal Aadiyati dabha',
    analysis: 'Notice the sharp \'D\' and bouncing \'B\' (Qalqalah). It mimics the panting of a warhorse running. The rhythm is fast, breathless. The sound itself makes you feel the urgency of the scene.'
  },
  {
    ref: '113:1',
    surah: 'Al-Falaq',
    ayah: 1,
    text: 'Qul a\'oodhu bi rabbil-falaq',
    analysis: 'The word "Falaq" (daybreak/splitting) ends with a Qalqalah (bouncing sound). It sounds like a split or a crack, mirroring the meaning of splitting the darkness to bring light.'
  }
];

export interface LensPerspective {
  ref: string; // e.g. "20:25"
  text: string;
  modes: { mode: string; reflection: string }[];
}

export const lensData: LensPerspective[] = [
  {
    ref: '20:25',
    text: 'Rabbish rahli sadri (My Lord, expand for me my chest)',
    modes: [
      { mode: 'The Public Speaker', reflection: 'Oh Allah, give me confidence to speak and articulate my thoughts clearly without anxiety.' },
      { mode: 'The Anxious Student', reflection: 'Oh Allah, make room in my mind for knowledge to enter and settle, and remove the fog of confusion.' },
      { mode: 'The Repentant Sinner', reflection: 'Oh Allah, remove the tightness of guilt from my heart and replace it with the peace of forgiveness.' }
    ]
  }
];

// NEW DATA STRUCTURES

export interface Scene {
  ref: string;
  surah: string;
  ayah: string;
  title: string;
  shots: { type: string; description: string }[];
  audio: string;
  lighting: string;
}

export const sceneData: Scene[] = [
  {
    ref: '82:1-4',
    surah: 'Al-Infitar',
    ayah: '1-4',
    title: 'The Sky Shatters',
    shots: [
      { type: 'Wide Shot (Cosmic)', description: 'The entire sky is visible. Suddenly, a massive crack appears (Fatarat).' },
      { type: 'Pan Down', description: 'The stars, usually fixed and bright, begin to scatter and fall (Intatharat).' },
      { type: 'Low Angle (Looking Up)', description: 'The oceans are not just rising; they are exploding (Fujjirat).' },
      { type: 'Zoom In (Close Up)', description: 'Focus shifts from the cosmos to a single grave opening up.' }
    ],
    audio: 'Deafening cracking sounds, followed by the roar of oceans, then eerie silence as the graves open.',
    lighting: 'Dark, apocalyptic background with sudden blinding flashes of the sky splitting.'
  },
  {
    ref: '12:11-12',
    surah: 'Yusuf',
    ayah: '11-12',
    title: 'The Plot',
    shots: [
      { type: 'Medium Shot', description: 'The brothers huddle together, whispering. Their faces are shadowy.' },
      { type: 'Close Up', description: 'Focus on the father\'s (Yaqub) face. Concern, hesitation, but eventual trust.' },
      { type: 'Two Shot', description: 'Yusuf (AS) looking up at his older brothers with innocent trust.' }
    ],
    audio: 'Whispers, the sound of the wind, a subtle ominous drone.',
    lighting: 'High contrast (Chiaroscuro). The brothers are in shadow; Yusuf is in the light.'
  }
];

export interface HeroProfile {
  name: string;
  title: string;
  stats: {
    strength: number; // 1-10
    speech: number;
    patience: number;
    wisdom: number;
  };
  specialAbility: string;
  weakness: string;
  archNemesis: string;
  quranicProfile: string;
}

export const heroData: HeroProfile[] = [
  {
    name: 'Musa (AS)',
    title: 'Kalimullah (The One Who Spoke to Allah)',
    stats: {
      strength: 10,
      speech: 4, // Initially low, needed Harun
      patience: 6, // "My chest tightens"
      wisdom: 9
    },
    specialAbility: 'Divine Speech: Can speak directly to the Creator without an intermediary.',
    weakness: 'Anger/Impatience: "He threw down the tablets..."',
    archNemesis: 'Fir\'awn (Pharaoh)',
    quranicProfile: 'The Reluctant Hero. He didn\'t want the job. He had a speech impediment. He had a criminal record (accidental killing). Yet, he became the most mentioned Prophet. Proof that Allah uses your weakness as your strength.'
  },
  {
    name: 'Yusuf (AS)',
    title: 'As-Siddiq (The Truthful)',
    stats: {
      strength: 7,
      speech: 9, // Interpret dreams
      patience: 10, // Prison for years
      wisdom: 10 // Administrative genius
    },
    specialAbility: 'Dream Interpretation & Economic Management',
    weakness: 'Beauty (Attracted unwanted attention/Fitnah)',
    archNemesis: 'The Minister\'s Wife (Zulaikha) / His Brothers\' Jealousy',
    quranicProfile: 'He mastered the art of patience in the face of betrayal and seduction. He turned a prison cell into a center for Dawah.'
  }
];

// NEW DATA FOR UTILITIES

export interface NameGem {
  arabic: string;
  transliteration: string;
  translation: string;
  linguisticNuance: string;
  reflection: string;
}

export const namesData: NameGem[] = [
  {
    arabic: 'الْوَدُود',
    transliteration: 'Al-Wadud',
    translation: 'The Affectionate',
    linguisticNuance: 'Wadud comes from "Wudd"—which is love that is expressed actively. It is not just a feeling in the heart (Hubb). It is love that shows. Like a mother hugging her child or buying them a gift.',
    reflection: 'Allah does not just "love" you in the abstract. He gives you rain, food, smiles, and guidance. His love is constantly manifesting. He is the One who initiates love.'
  },
  {
    arabic: 'الْجَبَّار',
    transliteration: 'Al-Jabbar',
    translation: 'The Compeller / The Mender',
    linguisticNuance: 'Often mistranslated as just "The Tyrant" or "Compeller". But "Jabr" also means to fix a broken bone. A "Jabeerah" is a splint.',
    reflection: 'He compels the universe to work, yes. But He also fixes the broken hearted. When you are shattered, Al-Jabbar is the only One who can splint your soul back together.'
  },
  {
    arabic: 'الْفَتَّاح',
    transliteration: 'Al-Fattah',
    translation: 'The Opener',
    linguisticNuance: 'Intensive form of "Fatih". Not just someone who opens, but someone who opens repeatedly, or opens things that seem impossible to open.',
    reflection: 'When doors are slammed in your face—career, marriage, knowledge—remember Al-Fattah. He doesn\'t just unlock the door; He can remove the wall entirely.'
  },
  {
    arabic: 'الْغَفَّار',
    transliteration: 'Al-Ghaffar',
    translation: 'The Repeatedly Forgiving',
    linguisticNuance: 'Ghaffar comes from "Ghafr" which means to cover/protect (like a helmet, Mighfar). It is intensive: He forgives again, and again, and again.',
    reflection: 'He doesn\'t just forgive the sin; He covers it so no one else sees it, and protects you from its consequences. It is a shield.'
  },
  {
    arabic: 'الْحَكِيم',
    transliteration: 'Al-Hakim',
    translation: 'The All-Wise',
    linguisticNuance: 'Hakim comes from "Hukm" (judgment) and "Hikmah" (wisdom). It implies putting things in their perfect place. Like a puzzle master.',
    reflection: 'If your life feels chaotic, it is because you are looking at one piece of the puzzle. Al-Hakim has already designed the final picture. Trust the placement.'
  },
  {
    arabic: 'الرَّحْمَٰن',
    transliteration: 'Ar-Rahman',
    translation: 'The Entirely Merciful',
    linguisticNuance: 'Rahman is on the scale of "Fa\'lan" (extreme, immediate, temporary intensity). Like a storm (Ghadban). It is mercy that is overwhelming and available to EVERYONE right now.',
    reflection: 'Rain falls on the believer and the atheist. That is Ar-Rahman. His mercy floods the existence. Don\'t think you are excluded.'
  },
  {
    arabic: 'الرَّحِيم',
    transliteration: 'Ar-Rahim',
    translation: 'The Especially Merciful',
    linguisticNuance: 'Rahim is on the scale of "Fa\'eel" (permanent, stable quality). It is mercy that sticks. It is reserved for those who accept it.',
    reflection: 'Rahman is the ocean; Rahim is the water you drink. One is vast, the other is intimate. Ask for His special care.'
  },
  {
    arabic: 'الْقَيُّوم',
    transliteration: 'Al-Qayyum',
    translation: 'The Sustainer',
    linguisticNuance: 'From "Qama" (to stand). He is the One who stands by Himself and makes everything else stand. Without Him, atoms would fly apart.',
    reflection: 'You worry about your job sustaining you? Your job needs Al-Qayyum to sustain it. He is the battery of the universe.'
  },
  {
    arabic: 'الْمُجِيب',
    transliteration: 'Al-Mujib',
    translation: 'The Responsive',
    linguisticNuance: 'Not just "The Listener". "Jawab" means an answer. He responds. Every single time. The answer might be "Wait" or "Better", but it is an answer.',
    reflection: 'You are never talking to a wall. You are talking to Al-Mujib. The response is guaranteed. The timing is His wisdom.'
  },
  {
    arabic: 'الْوَلِيّ',
    transliteration: 'Al-Waliyy',
    translation: 'The Protecting Friend',
    linguisticNuance: 'A Wali is someone who takes responsibility for your affairs. Like a guardian or a close ally who has your back.',
    reflection: 'You don\'t have to face life alone. You have a Wali. Hand over the file of your worries to Him.'
  },
  {
    arabic: 'الشَّكُور',
    transliteration: 'Ash-Shakoor',
    translation: 'The Most Appreciative',
    linguisticNuance: 'Shukr is usually from weak to strong. But Allah is Shakoor? It means He appreciates even the smallest deed and gives a massive reward. He multiplies.',
    reflection: 'You gave half a date in charity? Ash-Shakoor saw it. He grows it like a mountain. He appreciates your effort even when you fail.'
  },
  {
    arabic: 'الْحَلِيم',
    transliteration: 'Al-Halim',
    translation: 'The Forbearing',
    linguisticNuance: 'Hilm is power + restraint. He sees you sinning, He has the power to strike you down instantly, but He holds back to give you a chance.',
    reflection: 'If Allah punished us instantly for every mistake, no one would be left. His delay is not negligence; it is Hilm. Use the time to return.'
  }
];

export interface DuaContext {
  prophet: string;
  context: string;
  arabic: string;
  translation: string;
  gem: string;
  situation: string; // e.g., "Anxiety", "Forgiveness", "Decision"
}

export const duaData: DuaContext[] = [
  {
    prophet: 'Musa (AS)',
    situation: 'Anxiety / Public Speaking / Big Task',
    context: 'Musa (AS) was just given the impossible mission to face Pharaoh. He had a speech impediment and a warrant for his arrest. He didn\'t ask for the mission to be cancelled. He asked for internal equipment.',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    translation: 'My Lord, expand for me my chest [with assurance] and ease for me my task.',
    gem: 'He asked for "Sharh Sadr" (expansion of the chest). When you are anxious, your chest feels tight. Confidence is physical expansion. If you have confidence (the chest), the task (the affair) becomes easy.'
  },
  {
    prophet: 'Yunus (AS)',
    situation: 'Distress / Depression / Rock Bottom',
    context: 'Trapped in the belly of a whale, in the darkness of the ocean, in the darkness of the night. Three layers of darkness. No hope of rescue.',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    gem: 'He didn\'t ask "Save me". He just admitted his mistake and praised Allah. Sometimes, the fastest way out of a problem is to admit you were the problem. Ownership triggers mercy.'
  },
  {
    prophet: 'Ayoub (AS)',
    situation: 'Illness / Chronic Pain / Loss',
    context: 'Years of sickness, loss of wealth and family. People abandoned him.',
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    translation: 'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',
    gem: 'He used the word "Massaniya" (touched me) for years of agony. He minimized his pain in front of Allah\'s mercy. He didn\'t complain *about* Allah, he complained *to* Allah.'
  },
  {
    prophet: 'Adam (AS)',
    situation: 'Guilt / Shame / Mistake',
    context: 'After eating from the tree. They felt exposed and ashamed. They didn\'t blame Iblis. They blamed themselves.',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    translation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    gem: 'This is the "Delete Button" for sins. It acknowledges complete dependence. Without Your forgiveness, we are finished. No Plan B.'
  },
  {
    prophet: 'Ibrahim (AS)',
    situation: 'Future Anxiety / Children / Legacy',
    context: 'Leaving his family in a barren desert (Makkah). Worried about their deen and provision.',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    translation: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.',
    gem: 'He worried about Salah first, not food. If they have Salah, they have connection to the Provider. He prayed for his "Dhurriyyah" (offspring) centuries ahead.'
  },
  {
    prophet: 'Yaqub (AS)',
    situation: 'Grief / Complain / Sadness',
    context: 'Years of crying over Yusuf (AS) until he went blind. His sons told him to stop.',
    arabic: 'إِنَّمَا أَشْكُو بَثِّي وَhuzni إِلَى اللَّهِ',
    translation: 'I only complain of my suffering and my grief to Allah.',
    gem: 'You can cry. You can be sad. But direct the complaint upwards. Humans can\'t handle your baggage; Allah can.'
  },
  {
    prophet: 'People of the Cave (Ashab al-Kahf)',
    situation: 'Fitnah / Escaping Corruption / Youth',
    context: 'Young men running away from a tyrant king to save their faith. Hiding in a cave with nothing.',
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    translation: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.',
    gem: 'They asked for "Rahmah" (Mercy) first, then "Rashada" (Guidance). Mercy makes the situation bearable; Guidance shows the way out.'
  },
  {
    prophet: 'Muhammad (SAW)',
    situation: 'Debt / Worry / Laziness',
    context: 'A comprehensive dua for mental and financial health.',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ...',
    translation: 'O Allah, I take refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, and the burden of debts and from being overpowered by men.',
    gem: 'Anxiety (Future) vs Sorrow (Past). Weakness (Can\'t do) vs Laziness (Won\'t do). It covers the entire spectrum of human failure.'
  }
];

export interface FastReminder {
  type: 'Sunnah' | 'White Days' | 'Ashura' | 'Arafah';
  when: string;
  reward: string;
  spiritualWhy: string;
}

export const fastData: FastReminder[] = [
  {
    type: 'Sunnah',
    when: 'Monday & Thursday',
    reward: 'The gates of Paradise are opened and deeds are presented to Allah.',
    spiritualWhy: 'The Prophet (SAW) said: "I love that my deeds be presented while I am fasting." It is about closing your week with a spiritual high note.'
  },
  {
    type: 'White Days',
    when: '13th, 14th, 15th of Hijri Month',
    reward: 'Like fasting the entire month (if done every month, like fasting a lifetime).',
    spiritualWhy: 'The moon is full and bright. It is a time to polish the heart when the world is lit up.'
  }
];

export interface SunnahHabit {
  action: string;
  category: 'Physical' | 'Social' | 'Spiritual';
  impact: string;
  description: string;
}

export const sunnahData: SunnahHabit[] = [
  {
    action: 'Smile',
    category: 'Social',
    impact: 'Sadqa (Charity)',
    description: 'It costs nothing but buys a heart. The Prophet (SAW) smiled even when he was carrying the weight of revelation.'
  },
  {
    action: 'Right Foot First',
    category: 'Physical',
    impact: 'Mindfulness',
    description: 'Entering the masjid, putting on shoes. It forces you to pause and be conscious of your movement. It turns a mundane act into worship.'
  },
  {
    action: 'Siwak (Toothstick)',
    category: 'Physical',
    impact: 'Purification',
    description: '"Purification for the mouth and pleasing to the Lord." It connects physical hygiene with spiritual pleasure.'
  }
];

export interface SleepAdhkar {
  title: string;
  arabic: string;
  translation: string;
  reflection: string;
}

export const sleepData: SleepAdhkar[] = [
  {
    title: 'The Minor Death',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translation: 'In Your name, O Allah, I die and I live.',
    reflection: 'Sleep is a "Wafat" (taking of the soul). When you sleep, you are practicing for death. When you wake up, it is a resurrection (Nushur). Practice letting go of the world every night.'
  },
  {
    title: 'Ayatul Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence...',
    reflection: 'It protects you all night. You are hiring a divine guard. The Shaitan cannot come near you.'
  }
];

// NEW DATA FOR EMOTIONAL INTELLIGENCE & UTILITY

export interface AnatomyPart {
  part: string;
  arabic: string;
  function: string;
  spiritualRole: string;
  reflection: string;
}

export const anatomyData: AnatomyPart[] = [
  {
    part: 'Heart',
    arabic: 'Qalb',
    function: 'Pumps blood',
    spiritualRole: 'The seat of intellect and faith. It is called Qalb because it "Taqallub" (flips/turns constantly).',
    reflection: 'It is unstable by nature. That is why we make the dua: "Oh Turner of hearts, keep mine firm." If you don\'t anchor it with Quran, it will flip with every trend and emotion.'
  },
  {
    part: 'Tongue',
    arabic: 'Lisan',
    function: 'Speech',
    spiritualRole: 'The key to Jannah or the shovel for Hellfire.',
    reflection: 'A small muscle that can break families or build nations. "Speak good or remain silent." It is the interpreter of the heart.'
  },
  {
    part: 'Eyes',
    arabic: 'Ayn',
    function: 'Vision',
    spiritualRole: 'The gateway to the heart. What you see, you eventually desire.',
    reflection: 'Allah commands us to "lower the gaze" not to restrict us, but to protect the heart from being overwhelmed by images it cannot attain.'
  },
  {
    part: 'Forelock',
    arabic: 'Nasiyah',
    function: 'Frontal Lobe (Decision Making)',
    spiritualRole: 'The place of decision and control. We put it on the ground in Sujood.',
    reflection: 'We surrender our decision-making center to the One who knows best. "I put my forelock in Your hand" means "I trust You with my destiny."'
  },
  {
    part: 'Ears',
    arabic: 'Udhun',
    function: 'Hearing',
    spiritualRole: 'The first sense to develop in the womb, and the last to leave at death. The door to guidance.',
    reflection: 'Allah often mentions "Hearing" before "Seeing". You can close your eyes, but you cannot close your ears easily. Be careful what you let in.'
  },
  {
    part: 'Hands',
    arabic: 'Yad',
    function: 'Action / Grasping',
    spiritualRole: 'Instruments of earning and harming. They will speak on the Day of Judgment.',
    reflection: 'Your hands leave a trace on everything they touch. Make sure the trace is one of Sadaqah and help, not harm.'
  },
  {
    part: 'Feet',
    arabic: 'Qadam',
    function: 'Movement',
    spiritualRole: 'They carry you to the Masjid or to Sin. They must be firm on the Sirat.',
    reflection: 'Walking to the prayer erases sins with every step. Walking with humility ("Howna") is a trait of the servants of Ar-Rahman.'
  },
  {
    part: 'Stomach',
    arabic: 'Batn',
    function: 'Digestion',
    spiritualRole: 'The container of desires. "The son of Adam fills no vessel worse than his stomach."',
    reflection: 'Halal food fuels Halal actions. Haram food fuels rebellion. Control the stomach, and you control the desire.'
  }
];

export interface SoulStage {
  stage: string;
  arabic: string;
  description: string;
  reality: string;
}

export const journeyData: SoulStage[] = [
  {
    stage: 'The Realm of Souls',
    arabic: 'Alam al-Arwah',
    description: 'Where we all testified "Am I not your Lord?" (Al-Araf: 172).',
    reality: 'You knew Allah before you were born. That is why faith feels like "remembering", not learning something new.'
  },
  {
    stage: 'The Womb',
    arabic: 'Ar-Rahim',
    description: 'Darkness upon darkness. Sustained without effort.',
    reality: 'You were taken care of when you couldn\'t even ask. Why do you think He will abandon you now?'
  },
  {
    stage: 'The Dunya',
    arabic: 'Ad-Dunya',
    description: 'The Lower Life. A brief stop. A testing ground.',
    reality: 'It is not home. It is a bridge. Don\'t build a castle on a bridge.'
  },
  {
    stage: 'The Grave',
    arabic: 'Al-Barzakh',
    description: 'The Barrier. The first waiting room.',
    reality: 'It can be a garden of Paradise or a pit of Hell. Your companion there will be your deeds.'
  },
  {
    stage: 'The Resurrection',
    arabic: 'Al-Qiyamah',
    description: 'The Standing. 50,000 years.',
    reality: 'No hiding. No filters. Just you and the Truth.'
  },
  {
    stage: 'The Bridge',
    arabic: 'As-Sirat',
    description: 'Over Hellfire. Thinner than a hair, sharper than a sword.',
    reality: 'Your light (guidance) determines your speed. Some cross like lightning, some crawl.'
  },
  {
    stage: 'Jannah',
    arabic: 'Al-Jannah',
    description: 'The Garden. Eternal Home.',
    reality: 'No fear, no grief, no fatigue. And the greatest reward: Seeing Allah.'
  }
];

export interface NatureSign {
  name: string;
  ayah: string;
  reflection: string;
  ascii: string;
}

export const natureData: NatureSign[] = [
  {
    name: 'The Camel',
    ayah: '88:17',
    reflection: '"Do they not look at the camel, how it is created?" It is a bio-engineered tank. Special eyelids for sandstorms, water storage for weeks. It submits to a child despite its size. A sign of power and submission.',
    ascii: `
       //
     _oo\\
    (__/ \\  _  _
       \\  \\/ \\/ \\
       (         )\\
        \\_______/  \\
         [[] [[]
         [[] [[]
    `
  },
  {
    name: 'The Mountain',
    ayah: '78:7',
    reflection: '"Have We not made... the mountains as pegs?" Like a tent peg holds the tent, mountains stabilize the earth\'s crust (isostasy). They are firm, unmoving, yet they bow to Allah.',
    ascii: `
          /\\
         /  \\
        /    \\   /\\
       /      \\ /  \\
      /  /\\    /    \\
     /  /  \\  /      \\
    /  /    \\/        \\
    `
  },
  {
    name: 'The Bee',
    ayah: '16:68',
    reflection: 'It follows the "Wahyu" (inspiration) to build homes in mountains and trees. It eats from all fruits and produces healing. A believer is like a bee: eats pure, gives pure, and breaks no branch.',
    ascii: `
         \\     /
          \\   /
           \\ /
       ( )--8--( )
            |
           / \\
    `
  },
  {
    name: 'The Ant',
    ayah: '27:18',
    reflection: 'One ant warned the colony about Sulaiman\'s army. It took responsibility for the whole community. It didn\'t just save itself. "Enter your dwellings lest they crush you."',
    ascii: `
        \\_o_/
         / \\
       _/__\\_
      (______)
    `
  },
  {
    name: 'The Rain',
    ayah: '21:30',
    reflection: '"We made from water every living thing." Dead earth comes to life. Just like revelation (Wahyu) brings the dead heart to life. The parallel between Rain and Quran is constant.',
    ascii: `
        / / / / /
       / / / / /
      / / / / /
     / / / / /
    `
  }
];

export interface WuduStep {
  step: string;
  physical: string;
  spiritual: string;
}

export const wuduData: WuduStep[] = [
  { step: 'Hands', physical: 'Wash up to wrists', spiritual: 'Imagine the sins your hands committed (touching haram, harming others) dropping off with the water.' },
  { step: 'Mouth', physical: 'Rinse mouth', spiritual: 'Wash away the lies, backbiting, and harsh words. Prepare the tongue to speak to the King.' },
  { step: 'Face', physical: 'Wash face', spiritual: 'Wash away the looks of envy, lust, and arrogance. Light comes to the face that bows.' },
  { step: 'Arms', physical: 'Wash up to elbows', spiritual: 'Prepare the hands to receive the book of deeds. "Oh Allah, give me my book in my right hand."' },
  { step: 'Head', physical: 'Wipe head', spiritual: 'Wipe away the evil thoughts, stress, and dunya concerns. Reset the mind for focus (Khushoo).' },
  { step: 'Feet', physical: 'Wash feet', spiritual: 'Wash away the places your feet took you towards sin. Make them firm on the Sirat.' }
];

export interface SabrType {
  type: string;
  arabic: string;
  description: string;
  example: string;
}

export const sabrData: SabrType[] = [
  {
    type: 'Sabr in Obedience',
    arabic: 'Sabr ala Ta\'a',
    description: 'The patience to keep doing the right thing even when it is hard.',
    example: 'Dragging yourself out of a warm bed for Fajr. Hijab in a society that mocks it.'
  },
  {
    type: 'Sabr against Sin',
    arabic: 'Sabr an Ma\'siya',
    description: 'The patience to stop yourself from doing what you desire.',
    example: 'Lowering your gaze when a notification pops up. Keeping your mouth shut when you want to backbite.'
  },
  {
    type: 'Sabr on Calamity',
    arabic: 'Sabr ala Bala',
    description: 'The patience to accept what is out of your control without complaining.',
    example: 'Losing a job, illness, or death of a loved one. Saying "Inna lillahi wa inna ilayhi raji\'un".'
  },
  {
    type: 'Sabr in Da\'wah',
    arabic: 'Sabr ala Adha',
    description: 'The patience with people\'s harm and ignorance when you try to guide them.',
    example: 'Nuh (AS) preaching for 950 years. The Prophet (SAW) in Taif. Not reacting to insults with insults.'
  },
  {
    type: 'Sabr in Plenty',
    arabic: 'Sabr ala Ni\'ma',
    description: 'The patience to remain humble and grateful when everything is going right. Often harder than patience in poverty.',
    example: 'Sulaiman (AS) with his kingdom. Not letting wealth distract you from the Provider.'
  },
  {
    type: 'Sabr in Silence',
    arabic: 'Hifz al-Lisan',
    description: 'The active restraint of the tongue when anger boils inside.',
    example: 'Maryam (AS) vowed silence. Sometimes the most powerful response is no response.'
  }
];

export interface ShukrLevel {
  level: string;
  description: string;
  reality: string;
}

export const shukrData: ShukrLevel[] = [
  { level: 'Tongue', description: 'Saying Alhamdulillah.', reality: 'The easiest level. Necessary, but not sufficient.' },
  { level: 'Heart', description: 'Feeling the blessing is from Allah alone.', reality: 'Acknowledging you didn\'t "earn" it; it was a gift. Removes arrogance.' },
  { level: 'Limbs (Action)', description: 'Using the blessing for what it was created for.', reality: 'The highest level. If you have money, spend it on good. If you have health, help others. Using a blessing for Haram is the ultimate ingratitude.' }
];

export interface FridayReminders {
  item: string;
  significance: string;
  nakNote: string;
}

export const fridayData: FridayReminders[] = [
  { item: 'Surah Al-Kahf', significance: 'Protection from Dajjal', nakNote: 'Dajjal is the ultimate materialist. Kahf tells 4 stories that destroy materialism: Wealth (Garden), Power (Dhul Qarnayn), Knowledge (Musa/Khidr), and Religion (Sleepers). It resets your worldview every week.' },
  { item: 'Ghusl & Perfume', significance: 'Honor the gathering', nakNote: 'You are meeting the Angels and the community. Present your best self.' },
  { item: 'The Hour of Response', significance: 'Last hour of Asr', nakNote: 'There is a hidden moment on Friday where Dua is not rejected. Catch the last moments of the day.' }
];

export interface AdabRule {
  relation: string;
  arabicKeyword: string;
  meaning: string;
  practice: string;
}

export const adabData: AdabRule[] = [
  { relation: 'Parents', arabicKeyword: 'Ihsan', meaning: 'Excellence / Exceeding Duty', practice: 'Not just "fairness". You give more than they ask. You lower the wing of humility. You don\'t say "Uff".' },
  { relation: 'Spouse', arabicKeyword: 'Mawaddah wa Rahmah', meaning: 'Intense Love & Mercy', practice: 'Mawaddah is fiery love. Rahmah is mercy. When the fire cools down, mercy keeps the bond alive. You overlook flaws.' },
  { relation: 'Children', arabicKeyword: 'Tarbiyah', meaning: 'Nurturing Growth', practice: 'Treating them not as property, but as an Amanah (trust). Luqman (AS) spoke to his son with "Ya Bunayya" (Oh my dear little son) - gentleness before instruction.' },
  { relation: 'Neighbors', arabicKeyword: 'Haqq al-Jar', meaning: 'Rights of the Neighbor', practice: 'Jibreel (AS) kept emphasizing the neighbor so much that the Prophet (SAW) thought he would assign them inheritance. Safety from your harm is their right.' },
  { relation: 'Enemies', arabicKeyword: 'Adl', meaning: 'Justice', practice: '"Do not let the hatred of a people prevent you from being just." (5:8). Justice is not for your friends; it is for everyone, even those you despise.' },
  { relation: 'People/Strangers', arabicKeyword: 'Qawlan Layyinan', meaning: 'Gentle Speech', practice: 'Even with Pharaoh, Musa was told to speak gently. You cannot guide someone by yelling at them.' }
];

export interface SearchTopic {
  keyword: string;
  ayah: string;
  context: string;
}

export const searchData: SearchTopic[] = [
  { keyword: 'Anger', ayah: '3:134', context: '"Those who suppress anger and pardon people..." Revealed after Uhud, when they had every right to be angry at those who abandoned their posts. Allah asked them to forgive even then.' },
  { keyword: 'Money', ayah: '2:188', context: '"Do not consume one another\'s wealth unjustly..." Revealed when people were bribing judges. It attacks systemic corruption, not just petty theft.' },
  { keyword: 'Fear', ayah: '2:155', context: '"We will surely test you with something of fear..." Fear is a guarantee. It is part of the curriculum. The goal is not to have no fear, but to trust Allah *through* the fear.' },
  { keyword: 'Depression', ayah: '93:3', context: '"Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you]." Revealed when the Prophet (SAW) didn\'t receive revelation for months and thought Allah hated him. A reassurance for every disconnected soul.' },
  { keyword: 'Hope', ayah: '39:53', context: '"Say, O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah." Addressed to the worst sinners, not the righteous. Despair is the devil\'s weapon; Hope is Allah\'s promise.' },
  { keyword: 'Marriage', ayah: '30:21', context: '"And of His signs is that He created for you from yourselves mates..." It is a Sign (Ayah) of Allah. Marriage is a workshop for character development, finding tranquility (Sakinah) in the chaos.' },
  { keyword: 'Loss', ayah: '2:156', context: '"Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return."" It frames loss not as "losing something mine", but "returning something His".' },
  { keyword: 'Arrogance', ayah: '31:18', context: '"And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly..." Luqman\'s advice. Physical posture reflects the heart. Arrogance is the sin of Iblis.' },
  { keyword: 'Hypocrisy', ayah: '63:4', context: '"And when you see them, their forms please you..." They look good on the outside. They speak well. But they are "like propped-up pieces of wood". Hollow. No substance.' },
  { keyword: 'Patience', ayah: '2:45', context: '"And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive." Sabr is not passive waiting; it is active endurance. It requires internal strength (Khushoo).' }
];

export interface GrammarGem {
  ref: string;
  text: string;
  type: 'Nominal vs Verbal' | 'Exclusivity' | 'Tense Shift';
  explanation: string;
  lesson: string;
}

export const grammarData: GrammarGem[] = [
  {
    ref: '1:5',
    text: 'Iyyaka na\'budu (You alone we worship)',
    type: 'Exclusivity',
    explanation: 'Normal Arabic: "Na\'buduka" (We worship You). Quran: "Iyyaka na\'budu" (You alone we worship).',
    lesson: 'By placing the object (You) before the verb (Worship), the meaning changes from a simple statement to a declaration of exclusivity. We worship ONLY You.'
  },
  {
    ref: '1:2',
    text: 'Al-Hamdu lillah (All Praise is for Allah)',
    type: 'Nominal vs Verbal',
    explanation: 'It is a Noun sentence (Jumla Ismiya), not a Verb sentence ("Ahmadu Allah").',
    lesson: 'Nouns are permanent. Verbs are temporary. Allah\'s praise is permanent and timeless, regardless of whether we praise Him or not.'
  }
];
