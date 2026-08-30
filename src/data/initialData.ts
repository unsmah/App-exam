import { ExamDocument, ExamTemplate, QuestionBankItem, SchoolProfile } from '../types';

export const INITIAL_SCHOOL_PROFILE: SchoolProfile = {
  teacherName: 'M. Benali',
  schoolName: 'Emir Abdelkader Middle School',
  wilaya: 'Algiers',
  commune: 'Bab El Oued',
  academicYear: '2026–2027',
  email: 'teacher@examcraft.dz',
  defaultDuration: 60,
  defaultPoints: 20,
  defaultLanguage: 'both'
};

export const INITIAL_EXAMS: ExamDocument[] = [
  {
    id: 'exam-4am-bem-1',
    title: '4AM BEM Official Model Exam - Landmarks & Outstanding Figures',
    schoolYear: '4AM',
    sequence: 'Sequence 1',
    unitTitle: 'Universal Landmarks and Outstanding Figures',
    theme: 'World Heritage & Kateb Yacine',
    examType: 'BEM-style practice',
    durationMinutes: 90,
    totalPoints: 20,
    difficulty: 'Medium',
    targetCEFR: 'A2',
    status: 'Final',
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: 'MINISTRY OF NATIONAL EDUCATION',
      schoolName: 'Emir Abdelkader Middle School',
      wilaya: 'Algiers Direction of Education',
      teacherName: 'M. Benali',
      classGrade: 'Level: 4AM',
      academicYear: '2026–2027',
      examTitle: 'Second Term English Examination (BEM Mock Test)',
      durationMinutes: 90,
      totalPoints: 20,
      datePlaceholder: 'March 2027',
      studentNamePlaceholder: 'Full Name: .....................................................   Group: 4AM ...'
    },
    instructions: 'Read the text carefully and answer all questions in parts one and two. Write clearly.',
    sections: [
      {
        id: 'sec-reading',
        title: 'PART ONE: A/ READING COMPREHENSION',
        instruction: 'Read the text carefully and do the following activities.',
        type: 'reading',
        passageTitle: 'The Casbah of Algiers: An Architectural Jewel',
        passage: `The Casbah of Algiers is one of the most famous historical and architectural landmarks in North Africa. Overlooking the sparkling Mediterranean Sea, this ancient citadel was built during the 10th century on the ruins of old Icosium. It is renowned for its whitewashed houses, narrow winding alleys, magnificent palaces, and historic Ottoman mosques such as Ketchaoua Mosque.\n\nIn 1992, the Casbah was designated as a UNESCO World Heritage site due to its exceptional cultural value. Historically, it was also a fortress of resistance and bravery during the Algerian National Liberation War, where brave heroes like Ali La Pointe and Hassiba Ben Bouali fought for independence.\n\nToday, thousands of tourists and historians visit the Casbah each year to admire its unique Moorish craftsmanship, traditional fountains, and bustling artisan workshops. Preserving this priceless national treasure is a duty for all Algerians so that future generations can cherish their glorious heritage.`,
        passageSource: 'Adapted from Algerian Cultural Heritage Archives',
        points: 7,
        questions: [
          {
            id: 'q1-1',
            sectionId: 'sec-reading',
            type: 'multiple_choice',
            instruction: 'Activity 1: Choose the correct answer (a, b, or c).',
            question: '1. The text is mainly about:\n   a) A modern Algerian hotel\n   b) A historic Algerian landmark\n   c) A famous scientist',
            points: 1,
            answer: 'b) A historic Algerian landmark',
            difficulty: 'Easy'
          },
          {
            id: 'q1-2',
            sectionId: 'sec-reading',
            type: 'true_false_justify',
            instruction: 'Activity 2: Write "True" or "False" and correct the false statement.',
            question: 'a) The Casbah was built in the 20th century.\nb) The Casbah is recognized as a UNESCO World Heritage site.',
            points: 2,
            answer: 'a) False - It was built during the 10th century.\nb) True - In 1992, it was designated as a UNESCO World Heritage site.',
            difficulty: 'Medium'
          },
          {
            id: 'q1-3',
            sectionId: 'sec-reading',
            type: 'wh_questions',
            instruction: 'Activity 3: Answer the following questions according to the text.',
            question: '1. Why was the Casbah designated as a UNESCO World Heritage site?\n2. Which historical martyrs fought in the Casbah during the Liberation War?',
            points: 2,
            answer: '1. It was designated as a UNESCO World Heritage site due to its exceptional cultural value.\n2. Brave heroes like Ali La Pointe and Hassiba Ben Bouali fought in the Casbah.',
            difficulty: 'Medium'
          },
          {
            id: 'q1-4',
            sectionId: 'sec-reading',
            type: 'find_synonyms_antonyms',
            instruction: 'Activity 4: (Lexis) Find in the text words that are closest in meaning to:',
            question: 'a) well-known (§1) = ...............\nb) courage (§2) = ...............\nAnd find words opposite in meaning to:\nc) modern (§1) ≠ ...............\nd) destroy (§3) ≠ ...............',
            points: 2,
            answer: 'a) famous / renowned\nb) bravery\nc) ancient / old\nd) preserving',
            difficulty: 'Medium'
          }
        ]
      },
      {
        id: 'sec-language',
        title: 'B/ MASTERY OF LANGUAGE',
        instruction: 'Complete the following grammar, morphology, and phonetic tasks.',
        type: 'language',
        points: 7,
        questions: [
          {
            id: 'q2-1',
            sectionId: 'sec-language',
            type: 'put_verbs_in_brackets',
            instruction: 'Activity 1: Put the verbs in brackets into the correct tense (Past Simple or Passive Voice).',
            question: 'a) In 1992, the Casbah (to classify) .................... as a world heritage site.\nb) Many famous palaces (to design) .................... by Ottoman architects.\nc) Last year, my family (to visit) .................... Maqam Echahid.',
            points: 3,
            answer: 'a) was classified\nb) were designed\nc) visited',
            difficulty: 'Medium'
          },
          {
            id: 'q2-2',
            sectionId: 'sec-language',
            type: 'transform_sentences',
            instruction: 'Activity 2: Rewrite the sentences using comparatives of equality or superiority as indicated.',
            question: '1. Big Ben is 96 meters high. The Elizabeth Tower is 96 meters high. (as ... as)\n   → Big Ben is ....................................................\n2. Maqam Echahid is 92m. Santa Cruz is older. (more ... than / older than)\n   → Santa Cruz is ....................................................',
            points: 2,
            answer: '1. Big Ben is as high as the Elizabeth Tower.\n2. Santa Cruz is older than Maqam Echahid.',
            difficulty: 'Medium'
          },
          {
            id: 'q2-3',
            sectionId: 'sec-language',
            type: 'word_formation',
            instruction: 'Activity 3: (Phonetics) Classify the following words according to their diphthong sound: /eɪ/ (day) or /aɪ/ (like).',
            question: 'Words: famous, site, ancient, white\n/eɪ/: [ .................... , .................... ]\n/aɪ/: [ .................... , .................... ]',
            points: 2,
            answer: '/eɪ/: famous, ancient\n/aɪ/: site, white',
            difficulty: 'Easy'
          }
        ]
      }
    ],
    writingTask: {
      title: 'PART TWO: SITUATION OF INTEGRATION (Written Expression)',
      prompt: 'Your British penfriend wants to learn about Algerian historical figures and landmarks. Write a short biographical fact-file article (8-10 lines) about the famous Algerian playwright and novelist Kateb Yacine.',
      context: 'Use the provided information card to write a coherent biography in past tense.',
      cues: [
        'Full name: Kateb Yacine',
        'Date & Place of birth: August 6, 1929 in Constantine, Algeria',
        'Occupation: Novelist, playwright, journalist and poet',
        'Major Masterpiece: "Nedjma" (published in 1956)',
        'Honors: Algerian Grand Prix des Lettres (1987)',
        'Date of death: October 28, 1989 in Grenoble, France'
      ],
      wordCountTarget: '60-80 words',
      points: 6,
      rubric: [
        { criterion: 'Relevance to topic (Biographical data included)', points: 2, description: 'All cues used appropriately' },
        { criterion: 'Coherence & Organization (Chronological connectors)', points: 1.5, description: 'Clear paragraphs and transitions' },
        { criterion: 'Linguistic correctness (Past simple, passive, spelling)', points: 1.5, description: 'Accurate grammar and punctuation' },
        { criterion: 'Layout and Presentation', points: 1, description: 'Clean handwriting and indentation' }
      ]
    },
    qualityCheck: {
      score: 98,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: [
        'Curriculum Alignment: 100% compliant with Algerian 4AM official BEM syllabus (Sequence 1).',
        'Point Total: Exactly 20 points (Reading: 7pts, Language: 7pts, Situation of Integration: 6pts).',
        'Linguistic appropriateness: High quality, objective answer key with clear rubrics.'
      ],
      strengths: [
        'Standard BEM 3-part layout (Reading, Mastery of Language, Situation of Integration)',
        'Cultural authenticity centered on Algerian heritage',
        'Precise phonetics and morphological activities'
      ],
      suggestions: ['Everything is balanced and ready for printing or export.']
    },
    versionNumber: 1,
    versionsHistory: [
      {
        versionNumber: 1,
        timestamp: '2026-08-30T10:00:00Z',
        note: 'Official BEM Mock exam created by teacher',
        sections: [],
        writingTask: {} as any,
        headerConfig: {} as any
      }
    ],
    tags: ['4AM', 'BEM', 'Sequence 1', 'Casbah', 'Landmarks', 'Passive Voice'],
    createdAt: '2026-08-30T10:00:00Z',
    updatedAt: '2026-08-30T10:30:00Z'
  },
  {
    id: 'exam-3am-inv-2',
    title: '3AM First Term Test - Inventions & Scientists (Belgacem Haba)',
    schoolYear: '3AM',
    sequence: 'Sequence 3',
    unitTitle: 'Me and My Inventions / Scientific World',
    theme: 'Famous Algerian Scientists & Microelectronics',
    examType: 'Test',
    durationMinutes: 60,
    totalPoints: 20,
    difficulty: 'Medium',
    targetCEFR: 'A2',
    status: 'Completed',
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: 'MINISTRY OF NATIONAL EDUCATION',
      schoolName: 'Emir Abdelkader Middle School',
      wilaya: 'Algiers',
      teacherName: 'M. Benali',
      classGrade: 'Level: 3AM',
      academicYear: '2026–2027',
      examTitle: 'First Term English Test',
      durationMinutes: 60,
      totalPoints: 20,
      datePlaceholder: 'November 2026',
      studentNamePlaceholder: 'Name: .....................................................  Class: 3AM ...'
    },
    instructions: 'Answer all questions on the exam sheet.',
    sections: [
      {
        id: 'sec-reading-3am',
        title: 'PART ONE: READING COMPREHENSION (07 pts)',
        instruction: 'Read the text and do the activities.',
        type: 'reading',
        passageTitle: 'Belgacem Haba: The Pride of Algerian Science',
        passage: `Professor Belgacem Haba is one of the top inventors in the world. He was born in 1957 in El-Oued, Algeria. After completing his primary and secondary schooling in his hometown, he studied physics at the University of Science and Technology Houari Boumediene (USTHB) in Algiers. Later, he traveled to the United States and obtained two master's degrees and a PhD in solar energy.\n\nDr. Haba is widely known for his remarkable contributions to microelectronics and computer miniaturization. He has registered more than 1,500 patents worldwide in smartphones, video game consoles, and computer memory chips. Because of his hard work and passion, he was honored with numerous international awards.\n\nToday, Professor Haba actively encourages young Algerian students to study science, technology, and mathematics. He is a shining role model for future innovators.`,
        passageSource: 'Adapted from Young Inventors Digest',
        points: 7,
        questions: [
          {
            id: 'q3-1',
            sectionId: 'sec-reading-3am',
            type: 'complete_table',
            instruction: 'Activity 1: Complete the bibliographical fact-file about Belgacem Haba.',
            question: '- Full Name: ................................\n- Year of birth: ................................\n- Place of birth: ................................\n- Field of study: ................................\n- Number of patents: ................................',
            points: 2.5,
            answer: '- Full Name: Professor Belgacem Haba\n- Year of birth: 1957\n- Place of birth: El-Oued, Algeria\n- Field of study: Physics / Solar energy / Microelectronics\n- Number of patents: More than 1,500 patents',
            difficulty: 'Easy'
          },
          {
            id: 'q3-2',
            sectionId: 'sec-reading-3am',
            type: 'wh_questions',
            instruction: 'Activity 2: Answer the questions according to the text.',
            question: '1. Where did Belgacem Haba study physics before traveling to the USA?\n2. What does Dr. Haba encourage young students to do?',
            points: 2.5,
            answer: '1. He studied physics at the University of Science and Technology Houari Boumediene (USTHB) in Algiers.\n2. He encourages young students to study science, technology, and mathematics.',
            difficulty: 'Medium'
          },
          {
            id: 'q3-3',
            sectionId: 'sec-reading-3am',
            type: 'find_synonyms_antonyms',
            instruction: 'Activity 3: (Lexis) Match words with their synonyms from the text.',
            question: 'a) famous (§2) = ...............\nb) received / got (§1) = ...............\nc) prize (§2) = ...............\nd) old (§3) ≠ ...............',
            points: 2,
            answer: 'a) famous = known / top\nb) obtained\nc) award\nd) young',
            difficulty: 'Easy'
          }
        ]
      },
      {
        id: 'sec-lang-3am',
        title: 'MASTERY OF LANGUAGE (07 pts)',
        instruction: 'Complete the linguistic activities.',
        type: 'language',
        points: 7,
        questions: [
          {
            id: 'q3-4',
            sectionId: 'sec-lang-3am',
            type: 'transform_sentences',
            instruction: 'Activity 1: Turn the following sentences into the Passive Voice.',
            question: 'a) Belgacem Haba invented many microchips.\n   → Many microchips ....................................................\nb) Scientists design powerful smartphones.\n   → Powerful smartphones ....................................................',
            points: 3,
            answer: 'a) Many microchips were invented by Belgacem Haba.\nb) Powerful smartphones are designed by scientists.',
            difficulty: 'Medium'
          },
          {
            id: 'q3-5',
            sectionId: 'sec-lang-3am',
            type: 'fill_blanks',
            instruction: 'Activity 2: Fill in the gaps with the relative pronouns: "who" or "which".',
            question: '1. Alexander Graham Bell was the scientist ........... invented the telephone.\n2. The smartphone is a modern device ........... connects people around the globe.',
            points: 2,
            answer: '1. who\n2. which',
            difficulty: 'Easy'
          },
          {
            id: 'q3-6',
            sectionId: 'sec-lang-3am',
            type: 'word_formation',
            instruction: 'Activity 3: (Pronunciation) Classify words according to the pronunciation of final "-ed": /t/, /d/, or /ɪd/.',
            question: 'Words: completed, traveled, worked, obtained\n/t/: [ .................... ]\n/d/: [ .................... , .................... ]\n/ɪd/: [ .................... ]',
            points: 2,
            answer: '/t/: worked\n/d/: traveled, obtained\n/ɪd/: completed',
            difficulty: 'Medium'
          }
        ]
      }
    ],
    writingTask: {
      title: 'PART TWO: WRITTEN EXPRESSION (06 pts)',
      prompt: 'Write a short biography (6-8 lines) about the famous inventor of the telephone, Alexander Graham Bell, using the provided cues.',
      cues: [
        'Name: Alexander Graham Bell',
        'Born: March 3, 1847 in Edinburgh, Scotland',
        'Invention: The first practical telephone (1876)',
        'Education: University of Edinburgh and London',
        'Died: August 2, 1922 in Canada'
      ],
      wordCountTarget: '50-70 words',
      points: 6,
      rubric: [
        { criterion: 'Content & Information usage', points: 2 },
        { criterion: 'Grammar (Past tense & Chronology)', points: 2 },
        { criterion: 'Vocabulary & Punctuation', points: 2 }
      ]
    },
    qualityCheck: {
      score: 96,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: ['Accurate point balance: 7 + 7 + 6 = 20 pts.', '3AM curriculum topics properly integrated.'],
      strengths: ['Inspiring Algerian scientist focus', 'Standard 3AM grammar items'],
      suggestions: []
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ['3AM', 'Sequence 3', 'Inventions', 'Belgacem Haba', 'Passive Voice'],
    createdAt: '2026-08-28T09:15:00Z',
    updatedAt: '2026-08-28T09:45:00Z'
  },
  {
    id: 'exam-1am-daily-3',
    title: '1AM Diagnostic & Revision Assessment - Daily Routines & School',
    schoolYear: '1AM',
    sequence: 'Sequence 3',
    unitTitle: 'Me and My Daily Activities',
    theme: 'Daily Routines, Time & Hobbies',
    examType: 'Quiz',
    durationMinutes: 45,
    totalPoints: 20,
    difficulty: 'Easy',
    targetCEFR: 'Pre-A1',
    status: 'Final',
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: 'MINISTRY OF NATIONAL EDUCATION',
      schoolName: 'Emir Abdelkader Middle School',
      wilaya: 'Algiers',
      teacherName: 'M. Benali',
      classGrade: 'Level: 1AM',
      academicYear: '2026–2027',
      examTitle: 'First Term English Class Test',
      durationMinutes: 45,
      totalPoints: 20,
      datePlaceholder: 'December 2026',
      studentNamePlaceholder: 'First Name & Surname: .......................................  Class: 1AM ...'
    },
    instructions: 'Read Amine\'s text and complete the tasks.',
    sections: [
      {
        id: 'sec-reading-1am',
        title: 'PART ONE: A/ READING COMPREHENSION (07 pts)',
        instruction: 'Read the short text and answer.',
        type: 'reading',
        passageTitle: 'Amine\'s Daily Routine',
        passage: `Hello! My name is Amine. I am 11 years old. I am a first-year pupil at Ibn Khaldoun Middle School. Every morning, I wake up at 06:30. I wash my face, brush my teeth, and have my breakfast. At 07:30, I go to school by bus. My classes start at 08:00 and finish at 16:00. In the afternoon, I do my homework and play football with my brother Yacine. I go to bed at 21:00.`,
        points: 7,
        questions: [
          {
            id: 'q1-1am',
            sectionId: 'sec-reading-1am',
            type: 'true_false',
            instruction: 'Activity 1: Write "True" or "False".',
            question: '1. Amine is 12 years old. (.......)\n2. He goes to school by bus. (.......)\n3. He plays football with his brother. (.......)',
            points: 3,
            answer: '1. False (He is 11)\n2. True\n3. True',
            difficulty: 'Easy'
          },
          {
            id: 'q1-2am',
            sectionId: 'sec-reading-1am',
            type: 'wh_questions',
            instruction: 'Activity 2: Answer the questions according to the text.',
            question: '1. What time does Amine wake up?\n2. What does he do in the afternoon?',
            points: 2,
            answer: '1. He wakes up at 06:30.\n2. He does his homework and plays football with his brother.',
            difficulty: 'Easy'
          },
          {
            id: 'q1-3am',
            sectionId: 'sec-reading-1am',
            type: 'matching',
            instruction: 'Activity 3: (Lexis) Match opposites.',
            question: 'Column A: [1. start, 2. morning]\nColumn B: [a. evening, b. finish]',
            points: 2,
            answer: '1 → b (start ≠ finish)\n2 → a (morning ≠ evening)',
            difficulty: 'Easy'
          }
        ]
      },
      {
        id: 'sec-lang-1am',
        title: 'B/ MASTERY OF LANGUAGE (07 pts)',
        instruction: 'Grammar and phonetics activities.',
        type: 'language',
        points: 7,
        questions: [
          {
            id: 'q1-4am',
            sectionId: 'sec-lang-1am',
            type: 'put_verbs_in_brackets',
            instruction: 'Activity 1: Put the verbs in brackets in the Present Simple tense.',
            question: 'a) My sister (to live) .................... in Oran.\nb) Pupils (to like) .................... English lessons.\nc) I (to play) .................... chess on Friday.',
            points: 3,
            answer: 'a) lives\nb) like\nc) play',
            difficulty: 'Easy'
          },
          {
            id: 'q1-5am',
            sectionId: 'sec-lang-1am',
            type: 'fill_blanks',
            instruction: 'Activity 2: Complete with: "in", "on", or "at".',
            question: '1. I wake up ...... 07:00.\n2. We do not go to school ...... Friday.\n3. I watch TV ...... the evening.',
            points: 2,
            answer: '1. at\n2. on\n3. in',
            difficulty: 'Easy'
          },
          {
            id: 'q1-6am',
            sectionId: 'sec-lang-1am',
            type: 'word_formation',
            instruction: 'Activity 3: (Pronunciation) Classify verbs according to the final "-s" sound: /s/, /z/, or /ɪz/.',
            question: 'Verbs: speaks, washes, reads\n/s/: [ .......... ]  |  /z/: [ .......... ]  |  /ɪz/: [ .......... ]',
            points: 2,
            answer: '/s/: speaks\n/z/: reads\n/ɪz/: washes',
            difficulty: 'Easy'
          }
        ]
      }
    ],
    writingTask: {
      title: 'PART TWO: SITUATION OF INTEGRATION (06 pts)',
      prompt: 'Write a short paragraph (4-6 sentences) describing your own daily routine to your English teacher.',
      cues: [
        'Time you wake up (e.g. at 07:00)',
        'What you eat for breakfast',
        'How you go to school (on foot / by car)',
        'Your favorite leisure activity after school'
      ],
      wordCountTarget: '30-40 words',
      points: 6,
      rubric: [
        { criterion: 'Use of Present Simple & Time markers', points: 3 },
        { criterion: 'Vocabulary & Punctuation', points: 2 },
        { criterion: 'Neatness & Capitalization', points: 1 }
      ]
    },
    qualityCheck: {
      score: 99,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: ['Perfect 1AM age-appropriate vocabulary and score balance (20/20).'],
      strengths: ['Simple and accessible for first-year pupils'],
      suggestions: []
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ['1AM', 'Sequence 3', 'Daily Routines', 'Present Simple', 'Phonetics'],
    createdAt: '2026-08-25T11:00:00Z',
    updatedAt: '2026-08-25T11:20:00Z'
  }
];

export const INITIAL_TEMPLATES: ExamTemplate[] = [
  {
    id: 'tmpl-bem-standard',
    name: 'Official BEM Standard Exam (7 + 7 + 6 = 20 pts)',
    schoolYear: '4AM',
    examType: 'BEM-style practice',
    description: 'Official Algerian BEM exam architecture: 7 pts Reading comprehension, 7 pts Mastery of Language, 6 pts Situation of Integration with full grading rubric.',
    totalPoints: 20,
    durationMinutes: 90,
    structure: {
      includeReading: true,
      readingPoints: 7,
      readingQuestionTypes: ['true_false_justify', 'multiple_choice', 'wh_questions', 'find_synonyms_antonyms'],
      includeLanguage: true,
      languagePoints: 7,
      languageQuestionTypes: ['put_verbs_in_brackets', 'transform_sentences', 'word_formation'],
      includeVocabulary: false,
      vocabularyPoints: 0,
      vocabularyQuestionTypes: [],
      includeWriting: true,
      writingPoints: 6,
      writingType: 'biography'
    },
    createdAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'tmpl-middle-test',
    name: 'Standard Middle School Term Exam (8 + 7 + 5 = 20 pts)',
    schoolYear: '3AM',
    examType: 'Exam',
    description: 'Balanced 3-part layout designed for 1AM, 2AM, and 3AM semester exams with strong reading passage extraction.',
    totalPoints: 20,
    durationMinutes: 60,
    structure: {
      includeReading: true,
      readingPoints: 8,
      readingQuestionTypes: ['true_false', 'wh_questions', 'complete_table', 'find_synonyms_antonyms'],
      includeLanguage: true,
      languagePoints: 7,
      languageQuestionTypes: ['fill_blanks', 'put_verbs_in_brackets', 'choose_correct'],
      includeVocabulary: false,
      vocabularyPoints: 0,
      vocabularyQuestionTypes: [],
      includeWriting: true,
      writingPoints: 5,
      writingType: 'paragraph_writing'
    },
    createdAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'tmpl-quick-quiz',
    name: 'Quick Diagnostic Quiz (30-45 min / 20 pts)',
    schoolYear: '2AM',
    examType: 'Quiz',
    description: 'Fast assessment focused on sequence target grammar, vocabulary drills, and short guided sentence writing.',
    totalPoints: 20,
    durationMinutes: 45,
    structure: {
      includeReading: true,
      readingPoints: 6,
      readingQuestionTypes: ['true_false', 'multiple_choice', 'matching'],
      includeLanguage: true,
      languagePoints: 8,
      languageQuestionTypes: ['fill_blanks', 'put_verbs_in_brackets', 'transform_sentences'],
      includeVocabulary: true,
      vocabularyPoints: 2,
      vocabularyQuestionTypes: ['odd_one_out'],
      includeWriting: true,
      writingPoints: 4,
      writingType: 'guided_writing'
    },
    createdAt: '2026-08-01T00:00:00Z'
  }
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'qb-1',
    question: 'Classify the following words according to the pronunciation of final "-s": /s/, /z/, /ɪz/\nWords: books, watches, cleans, eats, plays, boxes',
    instruction: 'Complete the phonetic table.',
    type: 'word_formation',
    schoolYear: '1AM',
    unit: 'Sequence 3',
    theme: 'Daily Activities & Routines',
    grammar: 'Present Simple 3rd person singular',
    skill: 'Phonetics',
    difficulty: 'Easy',
    answer: '/s/: books, eats\n/z/: cleans, plays\n/ɪz/: watches, boxes',
    points: 3,
    tags: ['Phonetics', 'Final -s', '1AM'],
    createdAt: '2026-08-10T00:00:00Z'
  },
  {
    id: 'qb-2',
    question: 'Put the verbs in brackets in the Past Simple tense:\nLast summer, Nassim (to travel) ............... to Bejaia. He (to visit) ............... Gouraya National Park and (to swim) ............... in the clear sea.',
    instruction: 'Conjugate the verbs in brackets.',
    type: 'put_verbs_in_brackets',
    schoolYear: '2AM',
    unit: 'Sequence 3',
    theme: 'Travels & Holidays',
    grammar: 'Past Simple (Regular & Irregular)',
    skill: 'Grammar',
    difficulty: 'Medium',
    answer: 'traveled / visited / swam',
    points: 3,
    tags: ['Past Simple', 'Travel', '2AM'],
    createdAt: '2026-08-12T00:00:00Z'
  },
  {
    id: 'qb-3',
    question: 'Rewrite the sentences into the Passive Voice:\n1. Alexander Graham Bell invented the telephone in 1876.\n   → The telephone ....................................................\n2. Ottoman architects constructed Ketchaoua Mosque in Algiers.\n   → Ketchaoua Mosque ....................................................',
    instruction: 'Turn sentences into passive voice.',
    type: 'transform_sentences',
    schoolYear: '4AM',
    unit: 'Sequence 1',
    theme: 'Landmarks & Outstanding Figures',
    grammar: 'Passive Voice (Past Simple)',
    skill: 'Grammar',
    difficulty: 'Medium',
    answer: '1. The telephone was invented by Alexander Graham Bell in 1876.\n2. Ketchaoua Mosque was constructed by Ottoman architects in Algiers.',
    points: 2,
    tags: ['Passive Voice', 'BEM', '4AM'],
    createdAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'qb-4',
    question: 'Fill in the blanks with: "should" or "shouldn\'t":\n1. You have got a toothache; you ........... visit the dentist.\n2. You ........... drink too much soda and eat sweet candy.',
    instruction: 'Give health advice.',
    type: 'fill_blanks',
    schoolYear: '2AM',
    unit: 'Sequence 2',
    theme: 'Health & Nutrition',
    grammar: 'Modals for advice (should / shouldn\'t)',
    skill: 'Language functions',
    difficulty: 'Easy',
    answer: '1. should\n2. shouldn\'t',
    points: 2,
    tags: ['Health', 'Modals', '2AM'],
    createdAt: '2026-08-18T00:00:00Z'
  },
  {
    id: 'qb-5',
    question: 'Add the appropriate prefix (un-, im-, dis-, in-) to form the opposite of:\n1. patient → ...............\n2. friendly → ...............\n3. agree → ...............\n4. correct → ...............',
    instruction: 'Form opposite adjectives with prefixes.',
    type: 'word_formation',
    schoolYear: '3AM',
    unit: 'Sequence 1',
    theme: 'Personality & Traits',
    grammar: 'Prefixes for opposites',
    skill: 'Morphology',
    difficulty: 'Medium',
    answer: '1. impatient\n2. unfriendly\n3. disagree\n4. incorrect',
    points: 2,
    tags: ['Morphology', 'Prefixes', '3AM'],
    createdAt: '2026-08-20T00:00:00Z'
  },
  {
    id: 'qb-6',
    question: 'Match each historical monument with its location:\n1. Santa Cruz Fortress       a. Tipaza\n2. Roman Amphitheater       b. Oran\n3. Maqam Echahid             c. Algiers',
    instruction: 'Match monuments with cities.',
    type: 'matching',
    schoolYear: '1AM',
    unit: 'Sequence 5',
    theme: 'Me, My Country and the World',
    grammar: 'Prepositions of place',
    skill: 'Cultural Knowledge',
    difficulty: 'Easy',
    answer: '1 → b (Santa Cruz in Oran)\n2 → a (Tipaza)\n3 → c (Maqam Echahid in Algiers)',
    points: 1.5,
    tags: ['Culture', 'Algeria', '1AM'],
    createdAt: '2026-08-22T00:00:00Z'
  }
];
