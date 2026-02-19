export interface CommandContent {
  name: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  story: string; // NAK-style deep dive/story
  reflection: string; // Spiritual connection
  technical: string; // The dev analogy
}

export const commandsDB: Record<string, CommandContent> = {
  "init": {
    name: "init",
    arabic: "نِيَّة",
    transliteration: "Niyyah",
    meaning: "Intention / The Root / The Seed",
    story: "In the depth of the Arabic language, the word 'Niyyah' comes from 'Nawa', which is the date stone. Think about a date stone. It's hard, it's buried deep in the ground, and nobody sees it. But that entire massive palm tree, the shade it gives, the fruit it bears—it all comes from that one hidden core. If the stone is rotten, there is no tree. If the intention is corrupt, the action is hollow.",
    reflection: "Before you type `git init` or start a project, check your Niyyah. Is this for fame? For money alone? Or to build something beneficial? The Prophet ﷺ said 'Actions are but by intentions'. Your codebase is the tree; your intention is the seed.",
    technical: "Initialize your spiritual config. Just as a repository needs a .git folder to track history, your soul needs a pure intention to track rewards."
  },
  "status": {
    name: "status",
    arabic: "مُحَاسَبَة",
    transliteration: "Muhasaba",
    meaning: "Self-Accountability / Taking Stock",
    story: "The word 'Hasiba' means to calculate or reckon. On the Day of Judgment, we will have a 'Hisab'—a full audit. But the intelligent one is he who audits himself (Muhasaba) before he is audited. It's looking in the mirror and asking: 'What is my real state right now?' Not what I tell people, but what is the reality of my file system?",
    reflection: "When you run `git status`, you see what's staged, what's untracked, what's modified. Do this for your heart. What sins are modified but not committed? What good deeds are staged? What part of your character is untracked and wild?",
    technical: "Check the working tree of your heart. Clean usage? Any uncommitted sins? Time to stage the good and reset the bad."
  },
  "add": { // Assuming 'add' exists or mapped to 'commit' flow, but user file list didn't show 'add'. I'll stick to the file list.
    name: "add", 
    arabic: "إِعْدَاد",
    transliteration: "I'dad",
    meaning: "Preparation / Getting Ready",
    story: "The Quran speaks of 'Wa a'iddu lahum' - Prepare for them whatever force you can. Preparation is half the victory. When you stage files, you are deliberately choosing what becomes part of your history. You aren't just throwing things in; you are selecting the best to present.",
    reflection: "Don't just drift through life. Stage your day. Stage your prayers. Be intentional about what you are about to commit to your book of deeds.",
    technical: "Stage your changes. Don't commit garbage. `git add -p` (patch) is like reviewing every small deed before letting it define you."
  },
  "commit": {
    name: "commit",
    arabic: "أَمَانَة",
    transliteration: "Amanah",
    meaning: "Trust / Covenant / Binding Promise",
    story: "In the pre-Islamic era, if a man gave his word ('Ahd), he would die defending it. Islam elevated this. Your word is your bond. When you make a 'commit', you are saving a checkpoint in history. You are saying 'I stand by this code'. It is a testimony.",
    reflection: "Every day is a series of commits. You commit to a meeting, a prayer, a relationship. Are your commit messages (your intentions) clear? Or are they 'wip', 'fix', 'misc'? Be clear with Allah and yourself.",
    technical: "Save your state. A commit is immutable history. Make it count. Write a message that explains 'why', not just 'what'."
  },
  "push": {
    name: "push",
    arabic: "تَبْلِيغ",
    transliteration: "Tabligh",
    meaning: "Conveying / Delivery / Propagation",
    story: "The Prophet ﷺ was commanded: 'Balligh ma onzila ilayk' - Convey what has been revealed to you. Pushing isn't just moving data; it's delivering a message. It's sharing benefit. But with the power to push comes the responsibility of what you are pushing. Is it bug-free? Is it truthful?",
    reflection: "You have knowledge, wealth, or a smile. Push it to the remote (the world). Don't keep the khair (goodness) in your local environment. Share it. But ensure it builds, not breaks.",
    technical: "Upload your local changes to the remote repository. Deployment is Da'wah—making your work accessible to others."
  },
  "pull": {
    name: "pull",
    arabic: "طَلَبُ الْعِلْم",
    transliteration: "Talab al-'Ilm",
    meaning: "Seeking Knowledge / Intake",
    story: "We are not the source of knowledge; we are consumers of it. We 'pull' from the Divine source, from scholars, from history. Musa (AS) traveled specifically to 'pull' knowledge from Khidr. It requires humility. You have to admit your local version is behind.",
    reflection: "Always be pulling. If you stop syncing with the Quran and Sunnah, your branch diverges. You get conflicts. Stay up to date with the Master branch.",
    technical: "Fetch and merge changes from the remote. Update your knowledge base. Resolve conflicts between your ego and the Truth."
  },
  "blame": {
    name: "blame",
    arabic: "لَوْم",
    transliteration: "Lawm",
    meaning: "Self-Reproach / Accusation",
    story: "The Quran swears by 'An-Nafs Al-Lawwama'—the self-reproaching soul. This is the soul that blames itself when it slips. In code, `git blame` tells you who wrote a line. In life, don't use 'blame' to point fingers at others. Use it to find where *you* introduced the bug.",
    reflection: "When calamity strikes, the believer asks 'What did I do?' The hypocrite asks 'Who did this to me?' Be the debugger of your own soul.",
    technical: "View line-by-line revision history. Who wrote this bug? Usually, it was you, six months ago."
  },
  "diff": {
    name: "diff",
    arabic: "فُرْقَان",
    transliteration: "Furqan",
    meaning: "The Criterion / Distinguisher",
    story: "The Quran is called Al-Furqan because it differentiates clearly between Truth and Falsehood, right and wrong. A 'diff' shows you exactly what changed. It removes the ambiguity. You need a Furqan in your life to see the difference between a good idea and a temptation.",
    reflection: "Look at your life a year ago vs today. Run a `diff`. Have you improved? Or have you regressed? Without a diff, you are blind to your own drift.",
    technical: "Show changes between commits. Identify the delta. What has changed in your state?"
  },
  "history": {
    name: "history",
    arabic: "تَارِيخ",
    transliteration: "Tarikh",
    meaning: "History / The Timeline",
    story: "History (Tarikh) isn't just dates. It's 'Ibrah'—lessons. The Quran is full of stories not for entertainment, but so we don't repeat the bugs of previous nations. `git log` shows you the path you took. If you don't know your history, you will re-introduce the same errors.",
    reflection: "Review your past commits. The days you were angry, the days you were patient. Learn from your own log. Don't rewrite history (force push); learn from it.",
    technical: "Show commit logs. Review the journey. Debug the past to secure the future."
  },
  "adab": {
    name: "adab",
    arabic: "أَدَب",
    transliteration: "Adab",
    meaning: "Etiquette / Manners / Refinement",
    story: "Adab is often translated as manners, but it means 'putting things in their proper place'. Adab with parents, Adab with teachers, Adab with code. A scholar said 'Make your knowledge salt, and your Adab the flour'. You need more manners than raw data.",
    reflection: "How do you comment on PRs? Harshly? Or with Adab? How do you treat junior devs? Adab is the API of human interaction.",
    technical: "The manners engine. Lint your behavior. optimize your relationships."
  },
  "adhan": {
    name: "adhan",
    arabic: "أَذَان",
    transliteration: "Adhan",
    meaning: "The Call / Announcement",
    story: "The Adhan is the interruption of the Dunya for the sake of the Akhirah. It resets your priority queue. When the notification comes, do you swipe it away? Or do you answer? It's a call to success (Hayya 'ala al-Falah).",
    reflection: "Your prayer times are the breakpoints in your daily code. Stop execution. Debug your heart. Resume.",
    technical: "Prayer times notification. The ultimate system interrupt."
  },
  "anatomy": {
    name: "anatomy",
    arabic: "خِلْقَة",
    transliteration: "Khilqah",
    meaning: "Creation / Structure",
    story: "We have been created in the best stature (Ahsani Taqwim). But then we reduce ourselves. Understanding your spiritual anatomy—the Nafs (ego), the Qalb (heart), the Ruh (spirit)—is essential. You are not just hardware (body); you are software (soul).",
    reflection: "Debug your components. Is your Heart hard? Is your Ego inflated? Is your Spirit starved?",
    technical: "System architecture of the human soul. Component analysis."
  },
  "dua": {
    name: "dua",
    arabic: "دُعَاء",
    transliteration: "Du'a",
    meaning: "Supplication / The Call",
    story: "Du'a is the weapon of the believer. It is the direct line to the Admin. No pull request needed; it's an instant merge if the conditions are met. Allah is 'Al-Mujib' (The Responder). He doesn't leave you on 'read'.",
    reflection: "Code not working? Life falling apart? raise an Exception to the Most High. Make Du'a. It changes Qadr (destiny).",
    technical: "Invoke the Supreme Provider. Request resources directly from the Source."
  },
  "fast": {
    name: "fast",
    arabic: "صِيَام",
    transliteration: "Siyam",
    meaning: "Fasting / Restraint",
    story: "Siyam isn't just starving. It comes from a root meaning 'to hold back'. Horses that stood still were called 'Sa'im'. Fasting is a firewall. It blocks incoming desires so your system can cleanup and reboot.",
    reflection: "Fast from food, yes. But also fast from toxic words, angry comments, and haram glances. Enable the firewall.",
    technical: "System throttle. Reduce input to optimize internal processing. Garbage collection for the soul."
  },
  "friday": {
    name: "friday",
    arabic: "جُمُعَة",
    transliteration: "Jumu'ah",
    meaning: "The Gathering / Friday",
    story: "Yaum al-Jumu'ah is the weekly sync. The community gathers not just to pray, but to connect. It's the day Adam was created, and the day the Hour will be established. It's the 'master' branch update for the Ummah.",
    reflection: "Don't miss the Jumu'ah sync. It's mandatory. Wear your best, listen to the Khutbah (the weekly patch notes), and realign.",
    technical: "Weekly all-hands meeting. Sync with the community. Apply weekly patches."
  },
  "hero": {
    name: "hero",
    arabic: "قُدْوَة",
    transliteration: "Qudwah",
    meaning: "Role Model / Exemplar",
    story: "Everyone follows someone. Who is your hero? The Quran gives us the ultimate Qudwah: the Prophet ﷺ. In a world of influencers and tech moguls, who do you emulate? 'Laqad kana lakum fi Rasulillahi uswatun hasanah' - You have in the Messenger the best example.",
    reflection: "Check your dependencies. Who are you inheriting properties from? If your parent class is corrupt, your instance will be too.",
    technical: "Base class inspection. Who are you extending? Inherit from the Prophets."
  },
  "hijri": {
    name: "hijri",
    arabic: "هِجْرَة",
    transliteration: "Hijrah",
    meaning: "Migration / The Islamic Calendar",
    story: "The Islamic calendar doesn't start with the birth of the Prophet, but with the Hijrah—the sacrifice. It marks the shift from oppression to statehood. It reminds us that time is defined by action and movement, not just existence.",
    reflection: "Are you still living in the Jahiliyyah (ignorance) of your past? Make a Hijrah. Move away from bad habits to good ones.",
    technical: "System time configuration. Switch to the lunar clock. Track time by the moon, not just the sun."
  },
  "invest": {
    name: "invest",
    arabic: "تِجَارَة",
    transliteration: "Tijarah",
    meaning: "Trade / Investment",
    story: "Allah asks: 'Shall I tell you of a trade (Tijarah) that will save you from a painful punishment?' The believer is an investor. You trade your time and wealth in this Dunya for a return in Jannah. It's a long-term hold. Diamond hands for the Akhirah.",
    reflection: "Where is your capital going? Crypto? Stocks? Or Sadaqah Jariyah (ceaseless charity)? One crashes; the other compounds infinitely.",
    technical: "Resource allocation. ROI calculation for the Hereafter. Long-term storage."
  },
  "journal": {
    name: "journal",
    arabic: "مُحَاسَبَة",
    transliteration: "Muhasaba",
    meaning: "Accounting / Journaling",
    story: "Umar (RA) said: 'Account for yourselves before you are accounted for.' Writing down your day—your wins, your sins—is a Sunnah of the introspective. It turns vague feelings into concrete data you can analyze.",
    reflection: "Start a spiritual log. Document your bugs. Track your feature requests (Duas).",
    technical: "System logs. Write to stdout/stderr. Keep a record of runtime events."
  },
  "journey": {
    name: "journey",
    arabic: "سَفَر",
    transliteration: "Safar",
    meaning: "Travel / Journey",
    story: "Life is a Safar. We are travelers. The Prophet ﷺ said: 'Be in this world as if you are a stranger or a traveler.' A traveler travels light. He doesn't build a mansion in the transit lounge.",
    reflection: "Check your baggage. Are you carrying too much Dunya? Lighten the load. The destination is close.",
    technical: "Runtime environment. You are in a temporary container. Don't rely on local storage; persist to the cloud (Akhirah)."
  },
  "lens": {
    name: "lens",
    arabic: "بَصِيرَة",
    transliteration: "Basirah",
    meaning: "Insight / Inner Vision",
    story: "Basar is eyesight; Basirah is insight. It's the ability to see the reality of things, not just their appearance. It's the debugging tool for life. When others see a calamity, the person of Basirah sees a test and a purification.",
    reflection: "Clean your lens. Sin fogs the heart. Istighfar (seeking forgiveness) polishes it so you can see clearly again.",
    technical: "Debug view. X-Ray vision for the soul. Inspect element."
  },
  "memorize": {
    name: "memorize",
    arabic: "حِفْظ",
    transliteration: "Hifz",
    meaning: "Preservation / Memorization",
    story: "Hifz means to guard/protect. When you memorize Quran, you are guarding it in your chest. But it also guards *you*. The Prophet ﷺ said the one without Quran in their heart is like a ruined house.",
    reflection: "What is cached in your memory? Lyrics? Memes? Or the Words of the Creator? Fill your RAM with Ayaat.",
    technical: "Cache management. Load high-priority data into fast access memory."
  },
  "mirror": {
    name: "mirror",
    arabic: "مِرْآة",
    transliteration: "Mir'ah",
    meaning: "Mirror",
    story: "The Believer is the mirror of the Believer. A mirror doesn't lie. It doesn't scream. It just shows you the smudge on your face so you can wipe it. It reflects reality faithfully.",
    reflection: "Be a mirror to your brother. Correct him gently, privately. And accept correction when the mirror is held up to you.",
    technical: "Reflection API. Introspection. See yourself as you truly are."
  },
  "names": {
    name: "names",
    arabic: "أَسْمَاءُ اللَّهِ",
    transliteration: "Asma Allah",
    meaning: "Names of Allah",
    story: "To know Him is to love Him. Allah has Beautiful Names (Al-Asma Al-Husna). He is Al-Wadud (The Loving), Al-Ghafur (The Forgiving). Don't just worship a generic 'God'. Worship the One with these specific attributes.",
    reflection: "Call upon Him by the Name that matches your need. Broke? Ya Razzaq. Sinful? Ya Ghaffar. Lonely? Ya Wadud.",
    technical: "API Endpoints of the Divine. Access specific attributes for specific needs."
  },
  "nature": {
    name: "nature",
    arabic: "فِطْرَة",
    transliteration: "Fitrah",
    meaning: "Innate Nature / Disposition",
    story: "Every child is born on Fitrah—the factory setting. It is an inclination towards Truth and God. Society, parents, and sins corrupt this configuration. Islam is not a new plugin; it's a factory reset.",
    reflection: "Return to your source code. You were hardwired to know Allah. Ignore the bloatware of society.",
    technical: "Factory reset. Restore default settings. The original clean install."
  },
  "nazm": {
    name: "nazm",
    arabic: "نَظْم",
    transliteration: "Nazm",
    meaning: "Coherence / Arrangement / String of Pearls",
    story: "The Quran is not random. It is a Nazm—a perfectly arranged necklace. Every Ayah is connected to the next; every Surah pairs with its neighbor. It is a structural miracle. To see the Nazm is to see the Architect's plan.",
    reflection: "Look for the connections in your life. Nothing is random. Allah is the best of Planners.",
    technical: "Structural integrity. Linked lists. The divine architecture of the Text."
  },
  "parable": {
    name: "parable",
    arabic: "مَثَل",
    transliteration: "Mathal",
    meaning: "Parable / Example",
    story: "Allah uses Mathal (parables) to make complex spiritual truths tangible. The hypocrite is like a rainfall... The deed is like a grain of corn... These aren't just stories; they are compression algorithms for wisdom.",
    reflection: "Reflect on the parables. Are you the rock that water runs off? Or the fertile soil that absorbs it?",
    technical: "Design patterns. Abstract concepts instantiated in concrete classes."
  },
  "prayers": {
    name: "prayers",
    arabic: "صَلَاة",
    transliteration: "Salah",
    meaning: "Connection / Prayer",
    story: "Salah comes from Silah (connection). It is your link to the Divine. Without it, you are offline. The 5 daily prayers are the heartbeat of the believer. Miss them, and the spiritual heart stops.",
    reflection: "Is your Salah a burden or a relief? 'Arihna biha ya Bilal' - Give us rest with it, O Bilal. Debug your connection.",
    technical: "Keep-alive signal. Ping the Server 5 times a day to maintain the session."
  },
  "qibla": {
    name: "qibla",
    arabic: "قِبْلَة",
    transliteration: "Qiblah",
    meaning: "Direction / Focus",
    story: "The Qiblah unifies the Ummah. Millions of people, one focal point. It represents unity and purpose. If you don't have a Qiblah in life, you turn in every direction and go nowhere.",
    reflection: "Where are you facing? Is your heart facing the Dunya or the Akhirah? Align your compass.",
    technical: "Orientation vector. Set your heading. Target alignment."
  },
  "sabr": {
    name: "sabr",
    arabic: "صَبْر",
    transliteration: "Sabr",
    meaning: "Perseverance / Constancy",
    story: "Sabr is not just 'patience' (sitting and waiting). It means to tie down, to remain firm, to persevere. It's active, not passive. It's holding on to the hot coal. It's coding through the error until it's fixed.",
    reflection: "Sabr has three parts: Sabr on obedience, Sabr against sin, and Sabr on calamity. Which one are you struggling with?",
    technical: "Error handling. Retry logic. Exponential backoff. Don't crash; handle the exception."
  },
  "scene": {
    name: "scene",
    arabic: "مَشْهَد",
    transliteration: "Mashhad",
    meaning: "Scene / Witnessing",
    story: "The Quran paints scenes of the Day of Judgment so vivid you feel you are there. This is 'Visualized Faith'. You need to visualize the consequences to stay motivated.",
    reflection: "Visualize your standing before Allah. It puts your current stress in perspective.",
    technical: "Rendering. Scene graph. Visualize the end state."
  },
  "seek": {
    name: "seek",
    arabic: "اِسْتِعَاذَة",
    transliteration: "Isti'adhah",
    meaning: "Seeking Refuge",
    story: "Before you recite, you say A'udhu billah. You seek refuge. You admit you are weak and need protection. The Shaytan is a hacker trying to inject malicious code into your heart. Activate the antivirus.",
    reflection: "Don't fight Shaytan alone. Run to Allah. You can't outsmart a creature thousands of years old, but Allah can.",
    technical: "Security protocols. Firewall activation. Request protection token."
  },
  "shukr": {
    name: "shukr",
    arabic: "شُكْر",
    transliteration: "Shukr",
    meaning: "Gratitude / Appreciation",
    story: "Shukr is not just saying 'Thanks'. It is using the blessing for the purpose it was created. If you have eyes but look at haram, you aren't grateful. 'La in shakartum la azidannakum' - If you are grateful, I will surely increase you.",
    reflection: "Gratitude is the abundance mindset. Ingratitude is the scarcity mindset. Count your blessings, not your bugs.",
    technical: "Positive feedback loop. Scaling factor. Increase resources through acknowledgement."
  },
  "sleep": {
    name: "sleep",
    arabic: "نَوْم",
    transliteration: "Nawm",
    meaning: "Sleep / Minor Death",
    story: "Sleep is the minor death. Allah takes your soul every night. Will He return it? Sleep is a sign of our vulnerability. We power down. We are not self-sustaining.",
    reflection: "Recite your Adhkar before sleep. It might be your last logout. Clean the session.",
    technical: "Hibernate mode. System suspension. Daily reboot cycle."
  },
  "sound": {
    name: "sound",
    arabic: "تَرْتِيل",
    transliteration: "Tartil",
    meaning: "Measured Recitation",
    story: "The Quran is meant to be heard. 'Warattil il-Qurana tartila'. Recite it slowly, beautifully. The sound of the Quran has a healing frequency for the heart.",
    reflection: "Listen to the Quran. Let it overwrite the noise of the world.",
    technical: "Audio stream. Bitrate of the heart. Tuning into the divine frequency."
  },
  "sunnah": {
    name: "sunnah",
    arabic: "سُنَّة",
    transliteration: "Sunnah",
    meaning: "The Way / Tradition",
    story: "The Sunnah is the documentation of the Perfect Implementation. The Prophet ﷺ showed us how to live the theory of Quran. Without Sunnah, we are guessing.",
    reflection: "Revive a Sunnah. Siwak? Smile? Right foot first? Small deeds, massive love.",
    technical: "Best practices. Standard operating procedures. The documentation of the Master Developer."
  },
  "tafsir": {
    name: "tafsir",
    arabic: "تَفْسِير",
    transliteration: "Tafsir",
    meaning: "Exegesis / Unveiling",
    story: "Tafsir comes from 'Fassara' - to explain or unveil. The Quran has layers. You can read the surface, or you can dive deep. Tafsir is the deep dive. It's analyzing the code to understand the logic.",
    reflection: "Don't just read the translation. Read the Tafsir. Understand the context (Asbab al-Nuzul).",
    technical: "Code analysis. Documentation reading. Understanding the source code comments."
  },
  "tasbih": {
    name: "tasbih",
    arabic: "تَسْبِيح",
    transliteration: "Tasbih",
    meaning: "Glorification / Floating",
    story: "Tasbih (SubhanAllah) means to declare Allah perfect and far removed from any imperfection. It comes from a root meaning 'to float' or 'swim'. When you do Tasbih, you keep your heart floating above the drowning ocean of the Dunya.",
    reflection: "Keep your tongue moist with Tasbih. It's the lightest on the tongue, heaviest on the scales.",
    technical: "Heartbeat. Background process. Constant glorification loop."
  },
  "wudu": {
    name: "wudu",
    arabic: "وُضُوء",
    transliteration: "Wudu",
    meaning: "Ablution / Light",
    story: "Wudu comes from 'Wada'ah' (brightness/beauty). It washes away sins. As the water drips, the minor sins drip away. It is the prerequisite for connection.",
    reflection: "Don't just wash your limbs; wash your heart. Prepare to meet the King.",
    technical: "Clear cache. Flush buffers. Preparation for secure connection."
  },
  "zakat": {
    name: "zakat",
    arabic: "زَكَاة",
    transliteration: "Zakah",
    meaning: "Purification / Growth",
    story: "Zakah means purification and growth. It seems like you are giving money away (-), but spiritually you are growing (+). It purifies your wealth from greed and the rights of the poor.",
    reflection: "Give. It doesn't decrease wealth. It blesses the remainder.",
    technical: "Garbage collection for wealth. Removing impurities to optimize the remaining assets."
  }
};
