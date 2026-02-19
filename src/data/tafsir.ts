export interface Tafsir {
  surah: string;
  ayah: number;
  steps: {
    word: string;
    meaning: string;
    explanation: string;
  }[];
  finalThought: string;
}

export const tafsirData: Tafsir[] = [
  {
    surah: 'Ad-Duhaa',
    ayah: 3,
    steps: [
      {
        word: 'Maa',
        meaning: 'Not / Negation',
        explanation: 'The sentence starts with a strong negation. Allah is immediately shutting down the whispers of the disbelievers who said He had abandoned the Prophet (saw).'
      },
      {
        word: 'wadda\'aka',
        meaning: 'He said goodbye / He bid farewell',
        explanation: 'From "wada\'a". This isn\'t just "left". It\'s a warm, affectionate goodbye. Like when a mother says goodbye to her child. Allah is saying "I didn\'t even say a warm goodbye to you, let alone abandon you."'
      },
      {
        word: 'Rabbuka',
        meaning: 'Your Lord / Your Master / Your Sustainer',
        explanation: 'He didn\'t say "Allah". He said "Your Lord". The one who has been raising you, sustaining you, and caring for you from the beginning. It\'s personal. "YOUR" Lord.'
      },
      {
        word: 'wa maa qalaa',
        meaning: 'And He is not displeased / He does not hate',
        explanation: '"Qalaa" means intense displeasure or hate. Notice He didn\'t say "wa maa qalaa-ka" (He is not displeased with YOU). He left out the "you" (ka). Why? Because He loves the Prophet (saw) so much, He didn\'t even want to put the word "hate" and "you" in the same sentence. SubhanAllah.'
      }
    ],
    finalThought: "If you feel distant from Allah, know that He hasn't said goodbye. He is your Rabb. He is sustaining you even in your silence."
  },
  {
    surah: 'Al-Fatiha',
    ayah: 5,
    steps: [
      {
        word: 'Iyyaka',
        meaning: 'Only You',
        explanation: 'Grammatically, "Na\'budu" (We worship) should come first. But Allah placed "Iyyaka" (Only You) at the front. This is "Taqdeem" for "Ikhtisas" (Exclusivity). Not "We worship You", but "It is ONLY You we worship".'
      },
      {
        word: 'Na\'budu',
        meaning: 'We worship / We enslave ourselves',
        explanation: 'From "Abd" (Slave). Worship isn\'t just prayer. It is slavery. It is total submission. And notice "We". Even when you pray alone, you are part of the "We"—the Ummah.'
      },
      {
        word: 'Wa Iyyaka',
        meaning: 'And Only You',
        explanation: 'Repetition for emphasis. We are not just monotheists in worship, but monotheists in seeking help.'
      },
      {
        word: 'Nasta\'een',
        meaning: 'We seek help / We ask for aid',
        explanation: 'From "Isti\'anah". This isn\'t just "help me lift this box". It is asking for help in a matter you are already struggling with. You have to make the effort first, then ask for His aid to complete it.'
      }
    ],
    finalThought: "You can't skip to 'Nasta'een' (Help me) without first committing to 'Na'budu' (I am your slave). The help comes to the one who serves."
  },
  {
    surah: 'Al-Asr',
    ayah: 1,
    steps: [
      {
        word: 'Wal-Asr',
        meaning: 'By Time',
        explanation: 'Allah swears by "Time" (Asr). But Asr isn\'t just time; it\'s the squeezing of time. It\'s the late afternoon when the day is slipping away. He is swearing by the very thing we are losing every second.'
      },
      {
        word: 'Inna',
        meaning: 'Indeed / Verily',
        explanation: 'Emphasis. No doubt about it.'
      },
      {
        word: 'Al-Insaan',
        meaning: 'The Human Being',
        explanation: 'He didn\'t say "The Disbeliever". He said "The Human". Every single one of us. We are all in the same boat.'
      },
      {
        word: 'La-fee Khusr',
        meaning: 'Is surely in loss',
        explanation: 'We aren\'t "going" to be in loss. We are *drowning* in loss right now. Like ice melting. Every breath is a capital loss unless invested.'
      }
    ],
    finalThought: "You are running out of time. The only way to stop the loss is to invest your time in Iman and good deeds."
  },
  {
    surah: 'Al-Ikhlas',
    ayah: 1,
    steps: [
      {
        word: 'Qul',
        meaning: 'Say / Declare',
        explanation: 'A direct command. Don\'t just know it, announce it. This is your identity.'
      },
      {
        word: 'Huwa Allahu',
        meaning: 'He is Allah',
        explanation: 'The name Allah is unique. It has no plural, no gender. It is the proper name of God.'
      },
      {
        word: 'Ahad',
        meaning: 'The One / The Unique',
        explanation: 'Not "Wahid" (one in number), but "Ahad" (Unique in every way). There is nothing comparable to Him. He is a category of One.'
      }
    ],
    finalThought: "Purify your concept of God. He is not like anything you can imagine."
  },
  {
    surah: 'Al-Falaq',
    ayah: 1,
    steps: [
      {
        word: 'Qul',
        meaning: 'Say',
        explanation: 'Again, a command to seek refuge actively.'
      },
      {
        word: 'A\'udhu',
        meaning: 'I seek refuge / I take cover',
        explanation: 'Imagine a fortress. You are running into it for safety. You are admitting you are weak and need protection.'
      },
      {
        word: 'Bi Rabbil Falaq',
        meaning: 'In the Lord of the Daybreak',
        explanation: 'Falaq is the splitting of darkness by light. Just as He splits the night to bring the dawn, He can split your problems to bring relief.'
      }
    ],
    finalThought: "Darkness is temporary. The Lord of the Dawn is always ready to bring the light."
  },
  {
    surah: 'An-Nas',
    ayah: 1,
    steps: [
      {
        word: 'Qul A\'udhu',
        meaning: 'Say: I seek refuge',
        explanation: 'We start with seeking protection again.'
      },
      {
        word: 'Bi Rabbin-Nas',
        meaning: 'In the Lord of Mankind',
        explanation: 'He created us, sustains us, and owns us.'
      },
      {
        word: 'Malikin-Nas',
        meaning: 'The King of Mankind',
        explanation: 'He has full authority over all people, including those who wish you harm.'
      },
      {
        word: 'Ilahin-Nas',
        meaning: 'The God of Mankind',
        explanation: 'The only one worthy of worship and total devotion.'
      }
    ],
    finalThought: "He is your Lord, your King, and your God. Who can harm you when you are with Him?"
  }
];
