export interface Dhikr {
    id: string;
    text: string;
    transliteration?: string;
    translation: string;
    reference: string;
    count: number;
    notes?: string;
}

export const morningAdhkar: Dhikr[] = [
    {
        id: 'ayat-al-kursi',
        text: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...',
        translation: 'Allah! There is no god but He - the Living, The Self-subsisting, Eternal...',
        reference: 'Quran 2:255',
        count: 1,
        notes: 'Whoever says this when he rises in the morning will be protected from jinns until he retires in the evening.'
    },
    {
        id: 'ikhlas-falaq-nas',
        text: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
        translation: 'Read Surah Al-Ikhlas, Al-Falaq, and An-Nas',
        reference: 'Abu Dawud 4/322',
        count: 3,
        notes: 'Whoever recites these three times in the morning and in the evening, they will suffice him (as a protection) against everything.'
    },
    {
        id: 'sayyidul-istighfar',
        text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
        transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, Khalaqtani wa ana abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta.',
        translation: 'O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can, I take refuge in You from the evil of which I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sin except You.',
        reference: 'Bukhari 7/150',
        count: 1,
        notes: 'Whoever says this with certainty in the morning and dies on that day before evening will be from the people of Paradise.'
    },
    {
        id: 'morning-start',
        text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illal-lahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa \'ala kulli shay\'in qadir.',
        translation: 'We have entered the morning and at this very time the whole kingdom belongs to Allah, all praise is due to Allah, there is no god but Allah, the One, having no partner with Him, to Him belongs the dominion, to Him is all praise and He has power over all things.',
        reference: 'Muslim 4/2088',
        count: 1
    },
    {
        id: 'protection-harm',
        text: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shai\'un fil-ardi wa la fis-sama\'i, wa Huwas-Sami\'ul-\'Alim',
        translation: 'In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.',
        reference: 'Abu Dawud 4/323',
        count: 3,
        notes: 'Whoever recites this three times in the morning will not be afflicted by any calamity before evening.'
    },
    {
        id: 'pleased-with-allah',
        text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا',
        transliteration: 'Radhitu billahi Rabba, wa bil-Islami dina, wa bi-Muhammadin (saw) Nabiyya.',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.',
        reference: 'Abu Dawud 4/318',
        count: 3,
        notes: 'Whoever recites this three times in the morning and in the evening, it is a duty upon Allah to please him on the Day of Resurrection.'
    },
    {
        id: 'ya-hayyu-ya-qayyum',
        text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
        transliteration: 'Ya Hayyu Ya Qayyum, bi-Rahmatika astaghith, aslih li sha\'ni kullah, wa la takilni ila nafsi tarfata \'ayn.',
        translation: 'O Ever Living One, O Eternal One, by Your mercy I call on You to set right all my affairs. Do not place me in charge of my soul even for the blinking of an eye.',
        reference: 'Al-Hakim 1/545',
        count: 1
    },
    {
        id: 'subhanallah-wa-bihamdihi',
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'SubhanAllahi wa bihamdih.',
        translation: 'Glory is to Allah and praise is to Him.',
        reference: 'Muslim 4/2071',
        count: 100,
        notes: 'Whoever recites this one hundred times in the morning and in the evening, no one will bring anything better on the Day of Resurrection than this.'
    },
    {
        id: 'la-ilaha-illallah-100',
        text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illal-lahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa \'ala kulli shay\'in qadir.',
        translation: 'There is no god but Allah, the One, having no partner with Him, to Him belongs the dominion, to Him is all praise and He has power over all things.',
        reference: 'Bukhari 4/95',
        count: 100,
        notes: 'One hundred times in the morning: equals freeing 10 slaves, 100 good deeds written, 100 bad deeds wiped, protection from Shaitan.'
    },
    {
        id: 'knowledge-provisions',
        text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً',
        transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbala.',
        translation: 'O Allah, I ask You for knowledge that is of benefit, a good provision, and deeds that will be accepted.',
        reference: 'Ibn Majah 1/298',
        count: 1,
        notes: 'Recite in the morning.'
    },
    {
        id: 'creation-weight',
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
        transliteration: 'SubhanAllahi wa bihamdihi, \'adada khalqihi, wa rida nafsihi, wa zinata \'arshihi, wa midada kalimatihi.',
        translation: 'Glory is to Allah and praise is to Him, by the multitude of His creation, by His Pleasure, by the weight of His Throne, and by the extent of His Words.',
        reference: 'Muslim 4/2090',
        count: 3,
        notes: 'Recite 3 times in the morning.'
    },
    {
        id: 'health-protection',
        text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ',
        transliteration: 'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa Anta. Allahumma inni a\'udhu bika minal-kufri wal-faqri, wa a\'udhu bika min \'adhabil-qabri, la ilaha illa Anta.',
        translation: 'O Allah, make me healthy in my body. O Allah, make me healthy in my hearing. O Allah, make me healthy in my sight. There is no god but You. O Allah, I seek refuge in You from disbelief and poverty. And I seek refuge in You from the punishment of the grave. There is no god but You.',
        reference: 'Abu Dawud 4/324',
        count: 3
    }
];

export const eveningAdhkar: Dhikr[] = [
    {
        id: 'ayat-al-kursi',
        text: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa\'u \'indahu illa bi-idhnihi, ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishai\'im-min \'ilmihi illa bima sha\'a, wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'uduhu hifzuhuma, wa Huwal-\'Aliyyul-\'Azim.',
        translation: 'Allah! There is no god but He - the Living, The Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as he permitteth? He knoweth what (appeareth to His creatures As) Before or After or Behind them. Nor shall they compass Aught of His knowledge except as He willeth. His Throne doth extend over the heavens and the earth, and He feeleth no fatigue in guarding and preserving them, for He is the Most High, The Supreme (in glory).',
        reference: 'Quran 2:255',
        count: 1,
        notes: 'Whoever says this when he retires in the evening will be protected from jinns until he rises in the morning.'
    },
    {
        id: 'ikhlas-falaq-nas',
        text: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
        translation: 'Read Surah Al-Ikhlas, Al-Falaq, and An-Nas',
        reference: 'Abu Dawud 4/322',
        count: 3,
        notes: 'Whoever recites these three times in the morning and in the evening, they will suffice him (as a protection) against everything.'
    },
    {
        id: 'sayyidul-istighfar',
        text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
        transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u laka bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta.',
        translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge before You Your favor upon me and I acknowledge to You my sin, so forgive me, for verily no one can forgive sins except You.',
        reference: 'Bukhari 7/150',
        count: 1,
        notes: 'Whoever says this with certainty in the evening and dies before morning will be from the people of Paradise.'
    },
    {
        id: 'evening-protection',
        text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ...',
        transliteration: 'Amsayna wa amsal-mulku lillah wal-hamdu lillah, la ilaha illal-lahu wahdahu la sharika lah...',
        translation: 'We have entered the evening and at this very time the whole kingdom belongs to Allah, all praise is due to Allah...',
        reference: 'Muslim 4/2088',
        count: 1
    },
    {
        id: 'protection-harm-evening',
        text: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ...',
        transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shai\'un...',
        translation: 'In the Name of Allah with Whose Name there is protection against every kind of harm...',
        reference: 'Abu Dawud 4/323',
        count: 3
    },
    {
        id: 'evil-created',
        text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'udhu bikalimatillahi at-tammati min sharri ma khalaq.',
        translation: 'I seek refuge in the Perfect Words of Allah from the evil of what He has created.',
        reference: 'Muslim 4/2080',
        count: 3,
        notes: 'Whoever recites this three times in the evening will not be harmed by anything.'
    },
    {
        id: 'subhanallah-wa-bihamdihi',
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'SubhanAllahi wa bihamdih.',
        translation: 'Glory is to Allah and praise is to Him.',
        reference: 'Muslim 4/2071',
        count: 100
    }
];

export const sleepAdhkar: Dhikr[] = [
    {
        id: 'sleep-wudu',
        text: 'Perform Wudu before sleeping',
        translation: 'Make wudu as you do for prayer.',
        reference: 'Bukhari',
        count: 1
    },
    {
        id: 'ayat-al-kursi',
        text: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa\'u \'indahu illa bi-idhnihi, ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bishai\'im-min \'ilmihi illa bima sha\'a, wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'uduhu hifzuhuma, wa Huwal-\'Aliyyul-\'Azim.',
        translation: 'Allah! There is no god but He - the Living, The Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as he permitteth? He knoweth what (appeareth to His creatures As) Before or After or Behind them. Nor shall they compass Aught of His knowledge except as He willeth. His Throne doth extend over the heavens and the earth, and He feeleth no fatigue in guarding and preserving them, for He is the Most High, The Supreme (in glory).',
        reference: 'Bukhari',
        count: 1
    },
    {
        id: 'last-2-baqarah',
        text: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
        transliteration: 'Amanar-rasulu bima unzila ilayhi mir-rabbihi wal-mu\'minun, kullun amana billahi wa mala\'ikatihi wa kutubihi wa rusulihi, la nufarriqu bayna ahadim-mir-rusulihi, wa qalu sami\'na wa ata\'na gufranaka rabbana wa ilaykal-masir. La yukallifullahu nafsan illa wus\'aha, laha ma kasabat wa \'alayha maktasabat, rabbana la tu\'akhidhna in nasina aw akhta\'na, rabbana wa la tahmil \'alayna isran kama hamaltahu \'alal-ladhina min qablina, rabbana wa la tuhammilna ma la taqata lana bihi, wa\'fu \'anna wagfir lana warhamna, anta mawlana fansurna \'alal-qawmil-kafirin.',
        translation: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they said, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination." Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
        reference: 'Bukhari',
        count: 1,
        notes: 'Whoever recites the last two verses of Surat Al-Baqarah at night, they will be sufficient for him.'
    },
    {
        id: 'sleep-dusting',
        text: 'Dust the bed three times',
        translation: 'When one of you goes to his bed, let him dust it with the inside of his lower garment, for he does not know what came onto it after him.',
        reference: 'Bukhari',
        count: 3
    }
];

export const travelAdhkar: Dhikr[] = [
    {
        id: 'travel-dua',
        text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ. اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ',
        transliteration: 'Allahu Akbar, Allahu Akbar, Allahu Akbar, Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun. Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa, wa minal-\'amali ma tarda, Allahumma hawwin \'alayna safarana hadha, watwi \'anna bu\'dahu, Allahumma Antas-Sahibu fis-safari, wal-Khalifatu fil-ahli, Allahumma inni a\'udhu bika min wa\'tha\'is-safari, wa ka\'abatil-manzari, wa su\'il-munqalabi fil-mali wal-ahli.',
        translation: 'Allah is the Most Great. Allah is the Most Great. Allah is the Most Great. Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning. O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You. O Allah, lighten this journey for us and make its distance easy for us. O Allah, You are our Companion on the road and the One in Whose care we leave our family. O Allah, I seek refuge in You from this journey\'s hardships, and from the wicked sights in store and from finding our family and property in misfortune upon returning.',
        reference: 'Muslim 2/978',
        count: 1
    },
    {
        id: 'astaghfirullah',
        text: 'أَسْتَغْفِرُ اللَّهَ (3x) اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ',
        transliteration: 'Astaghfirullah (3x). Allahumma Antas-Salam wa minkas-Salam, tabarakta ya Dhal-Jalali wal-Ikram.',
        translation: 'I ask Allah for forgiveness (3 times). O Allah, You are As-Salam and from You is all peace, blessed are You, O Possessor of majesty and honour.',
        reference: 'Muslim 1/414',
        count: 1
    },
    {
        id: 'la-ilaha-illallah-prayer',
        text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ...',
        transliteration: 'La ilaha illal-lahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa \'ala kulli shay\'in qadir...',
        translation: 'There is no god but Allah alone, He has no partner. His is the dominion and His is the praise, and He is capable of all things...',
        reference: 'Bukhari 1/255',
        count: 1
    },
    {
        id: 'tasbih-fatimah',
        text: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (33)',
        translation: 'Glory is to Allah, Praise is to Allah, Allah is the Greatest.',
        reference: 'Muslim 1/418',
        count: 1
    },
    {
        id: 'ayat-al-kursi',
        text: 'Ayat Al-Kursi',
        translation: 'Recite Ayat Al-Kursi.',
        reference: 'An-Nasa\'i',
        count: 1,
        notes: 'Whoever recites it after every prayer will not be prevented from entering Paradise except by death.'
    },
    {
        id: 'three-quls',
        text: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
        translation: 'Recite the three Quls.',
        reference: 'Abu Dawud 2/86',
        count: 1,
        notes: 'Repeat 3 times after Fajr and Maghrib.'
    }
];

export const prayerAdhkar: Dhikr[] = [
    {
        id: 'enter-mosque',
        text: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ، وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        transliteration: 'A\'udhu billahil-\'Azim, wa bi-Wajhihil-Karim, wa Sultanihil-qadim, minash-Shaytanir-rajim. Bismillah, was-salatu was-salamu \'ala Rasulillah. Allahummaftah li abwaba rahmatik.',
        translation: 'I seek refuge in Almighty Allah, by His Noble Face, by His primordial power, from Satan the outcast. In the Name of Allah, and blessings and peace be upon the Messenger of Allah. O Allah, open before me the doors of Your mercy.',
        reference: 'Abu Dawud',
        count: 1
    },
    {
        id: 'leave-mosque',
        text: 'بِسْمِ اللَّهِ وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ',
        transliteration: 'Bismillah was-salatu was-salamu \'ala Rasulillah, Allahumma inni as\'aluka min fadlik, Allahumma\'simni minash-Shaytanir-rajim.',
        translation: 'In the Name of Allah, and blessings and peace be upon the Messenger of Allah. O Allah, I ask You from Your favour. O Allah, guard me from the accursed Satan.',
        reference: 'Abu Dawud',
        count: 1
    }
];
