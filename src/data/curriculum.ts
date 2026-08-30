import { CurriculumSequence, SchoolYear } from '../types';

export const ALGERIAN_CURRICULUM: CurriculumSequence[] = [
  // ================= 1AM (First Year Middle School) =================
  {
    id: '1am-seq-1',
    schoolYear: '1AM',
    sequenceNumber: 1,
    sequenceTitle: 'Sequence 1: Me and My Friends',
    theme: 'Personal Identity & Greetings',
    lessons: [
      'Greetings & Introductions (Hello, Hi, Good morning)',
      'Alphabet, Spelling names & numbers (1-100)',
      'Asking and giving age, phone number, and origin',
      'Personal ID card filling',
      'Classroom instructions and polite formulas'
    ],
    grammarPoints: [
      'Personal Subject Pronouns (I, you, he, she, it, we, they)',
      'Auxiliary verb "to be" (Present simple: am, is, are)',
      'Auxiliary verb "to have got" (have got / has got)',
      'Possessive adjectives (my, your, his, her)',
      'Demonstratives (this is / these are)',
      'Wh-questions (What, Who, How old, Where)'
    ],
    vocabularyTopics: [
      'Greetings & Farewells',
      'Numbers (Cardinal: 1-100)',
      'Colors and basic school objects',
      'Days of the week and months',
      'Countries and Nationalities (Algeria / Algerian, Tunisia / Tunisian, UK / British)'
    ],
    skills: ['Reading comprehension', 'Language mechanics', 'Vocabulary', 'Writing basic ID profile'],
    communicativeFunctions: ['Introducing oneself', 'Greeting peers', 'Spelling names', 'Asking for personal information'],
    sampleReadingTopics: [
      'An email introducing a new 1AM student (Amine / Razane)',
      'A school ID profile of a student from Constantine / Oran',
      'A welcoming message on a school social board'
    ],
    active: true
  },
  {
    id: '1am-seq-2',
    schoolYear: '1AM',
    sequenceNumber: 2,
    sequenceTitle: 'Sequence 2: Me and My Family',
    theme: 'Family Members, Occupations & Home',
    lessons: [
      'Describing the family tree (parents, siblings, grandparents)',
      'Describing occupations/jobs of family members',
      'Describing home / rooms and favorite spots',
      'Telling where people live and what they do'
    ],
    grammarPoints: [
      'Possessive case: Saxon genitive (\'s)',
      'Articles: Definite (the) & Indefinite (a / an)',
      'Present simple with third person singular (lives, works, teaches)',
      'Prepositions of place (in, on, near, next to)',
      'Yes/No questions with Do / Does'
    ],
    vocabularyTopics: [
      'Family members (father, mother, brother, sister, uncle, aunt, grandparents)',
      'Occupations & professions (teacher, doctor, engineer, nurse, farmer, mechanic)',
      'Rooms of the house (living room, bedroom, kitchen, bathroom)',
      'Physical traits (tall, short, slim, young, old)'
    ],
    skills: ['Reading', 'Grammar', 'Vocabulary', 'Family tree presentation'],
    communicativeFunctions: ['Introducing family members', 'Stating jobs', 'Describing one\'s house'],
    sampleReadingTopics: [
      'A student describing their lovely family in Tlemcen',
      'A letter from a cousin describing their family members and occupations'
    ],
    active: true
  },
  {
    id: '1am-seq-3',
    schoolYear: '1AM',
    sequenceNumber: 3,
    sequenceTitle: 'Sequence 3: Me and My Daily Activities',
    theme: 'Daily Routines, Habits & Leisure Time',
    lessons: [
      'Daily morning and evening routines',
      'Telling the time (o\'clock, half past, quarter to/past)',
      'Weekend activities, sports and hobbies',
      'Helping at home (chores)'
    ],
    grammarPoints: [
      'Present Simple tense (affirmative, negative, interrogative)',
      'Pronunciation of final "-s" (/s/, /z/, /ɪz/)',
      'Adverbs of frequency (always, usually, often, sometimes, never)',
      'Prepositions of time (at 7:00, in the morning, on Friday)'
    ],
    vocabularyTopics: [
      'Routines (wake up, wash face, have breakfast, go to school, do homework, sleep)',
      'Sports and hobbies (football, handball, reading, drawing, cycling)',
      'Time expressions and clock reading',
      'Household chores (tidy room, help mother, water plants)'
    ],
    skills: ['Reading comprehension', 'Grammar application', 'Pronunciation drill', 'Writing a daily schedule'],
    communicativeFunctions: ['Expressing daily routines', 'Asking and telling the time', 'Talking about hobbies'],
    sampleReadingTopics: [
      'A typical school day in the life of Rayan in Algiers',
      'How Yasmine spends her weekend in Bejaia'
    ],
    active: true
  },
  {
    id: '1am-seq-4',
    schoolYear: '1AM',
    sequenceNumber: 4,
    sequenceTitle: 'Sequence 4: Me and My School',
    theme: 'School Life, Subjects, Timetable & Rules',
    lessons: [
      'School facilities (canteen, courtyard, library, science lab)',
      'School subjects and weekly timetable',
      'School rules (rights and duties)',
      'Expressing abilities and permissions'
    ],
    grammarPoints: [
      'Modal "can" / "can\'t" for ability and permission',
      'Imperatives for classroom rules (Listen, Don\'t shout, Be on time)',
      'Verbs of liking + noun / gerund (like, love, enjoy, hate)',
      'Conjunctions (and, but, because)'
    ],
    vocabularyTopics: [
      'School subjects (English, Arabic, French, Maths, Science, History, Geography, Art, PE)',
      'School rooms and places',
      'School regulations (punctuality, uniform, respect)',
      'Adjectives describing school subjects (interesting, easy, difficult, fun)'
    ],
    skills: ['Reading', 'Language forms', 'Vocabulary', 'Writing school rules or dream school profile'],
    communicativeFunctions: ['Expressing likes and dislikes', 'Stating rules and duties', 'Describing abilities'],
    sampleReadingTopics: [
      'A description of Ibn Khaldoun Middle School in Setif',
      'A poster presenting the English Club and school rules'
    ],
    active: true
  },
  {
    id: '1am-seq-5',
    schoolYear: '1AM',
    sequenceNumber: 5,
    sequenceTitle: 'Sequence 5: Me, My Country and the World',
    theme: 'Algerian Heritage, Geography, Monuments & Culture',
    lessons: [
      'Locating Algerian cities and Wilayas using cardinal points',
      'Traditional Algerian clothes and dishes (Couscous, Karakou, Burnous)',
      'National monuments (Martyrs\' Memorial / Maqam Echahid, Santa Cruz, Tassili n\'Ajjer)',
      'Celebrations (Independence Day, Eid, Yennayer)'
    ],
    grammarPoints: [
      'Cardinal points and prepositions of direction (North, South, East, West)',
      'There is / There are (affirmative, negative, interrogative)',
      'Adjectives of nationality and origin',
      'Simple past of verb to be (was / were) introduction'
    ],
    vocabularyTopics: [
      'Traditional dishes and clothes',
      'Monuments and landscapes (mountains, desert, oasis, Mediterranean coast)',
      'Geographical terms (capital, borders, located in the north of)',
      'National celebrations and symbols'
    ],
    skills: ['Reading', 'Vocabulary extraction', 'Writing a postcard or travel guide about Algeria'],
    communicativeFunctions: ['Locating places', 'Describing cultural traditions', 'Welcoming foreign visitors'],
    sampleReadingTopics: [
      'A tourist travel guide discovering Ghardaia and the M\'zab Valley',
      'A postcard from an Algerian student describing Algiers the White'
    ],
    active: true
  },

  // ================= 2AM (Second Year Middle School) =================
  {
    id: '2am-seq-1',
    schoolYear: '2AM',
    sequenceNumber: 1,
    sequenceTitle: 'Sequence 1: Me and My Shopping',
    theme: 'Shopping, Food, Clothes, Markets & Prices',
    lessons: [
      'Shopping at the grocery store / supermarket / market',
      'Buying clothes (sizes, colors, materials, fitting room)',
      'Asking for prices, quantities and weights',
      'Healthy eating habits and food recipes'
    ],
    grammarPoints: [
      'Countable vs Uncountable nouns',
      'Quantifiers: some / any / a lot of / a little / a few',
      'Questions with "How much" (prices/uncountable) and "How many" (countable)',
      'Demonstratives: this/that/these/those',
      'Polite requests with "Can I have...", "Would you like..."'
    ],
    vocabularyTopics: [
      'Food items (fruits, vegetables, meat, bread, dairy, olive oil)',
      'Containers & weights (a kilo of, a bottle of, a packet of, a can of, a loaf of)',
      'Clothing items (jacket, trousers, sneakers, scarf, dress) and sizes (S, M, L, XL)',
      'Algerian Dinar (DZD) and payment terms'
    ],
    skills: ['Reading dialogues and recipes', 'Grammar analysis', 'Vocabulary sorting', 'Writing a shopping dialogue or recipe'],
    communicativeFunctions: ['Ordering food', 'Asking about prices and sizes', 'Planning a party meal'],
    sampleReadingTopics: [
      'A weekend shopping trip to the traditional bazaar in Constantine',
      'A recipe for making traditional Algerian Mint Tea and Makroud'
    ],
    active: true
  },
  {
    id: '2am-seq-2',
    schoolYear: '2AM',
    sequenceNumber: 2,
    sequenceTitle: 'Sequence 2: Me and My Health',
    theme: 'Illnesses, Healthy Living & Doctor Visits',
    lessons: [
      'Describing common health problems and symptoms',
      'Visiting the doctor / school clinic',
      'Giving health advice and recommendations',
      'Maintaining physical fitness and balanced nutrition'
    ],
    grammarPoints: [
      'Modal verb "should" / "shouldn\'t" for giving advice',
      'Imperatives for health guidelines (Drink water, Don\'t eat junk food)',
      'Verb "have got" with illnesses (I have got a headache / stomach ache)',
      'Pronunciation of /tʃ/ (chest), /ʃ/ (shoulder), /k/ (stomach, ache)'
    ],
    vocabularyTopics: [
      'Body parts (head, throat, back, stomach, ear, eye, tooth, knee)',
      'Illnesses & symptoms (fever, flu, cough, toothache, sore throat, allergy)',
      'Remedies and medical items (syrup, pills, bandage, rest, herbal tea, dentist)',
      'Healthy lifestyle habits vs junk habits'
    ],
    skills: ['Reading comprehension', 'Giving advice', 'Vocabulary pairing', 'Writing a health advice letter'],
    communicativeFunctions: ['Asking "What\'s the matter?"', 'Expressing physical pain', 'Giving medical and dietary advice'],
    sampleReadingTopics: [
      'A visit to Dr. Mansouri\'s clinic for a bad cold',
      'An awareness article in the school magazine about healthy school snacks'
    ],
    active: true
  },
  {
    id: '2am-seq-3',
    schoolYear: '2AM',
    sequenceNumber: 3,
    sequenceTitle: 'Sequence 3: Me and My Travels',
    theme: 'Holidays, Transportation, Weather & Itineraries',
    lessons: [
      'Planning a journey / vacation in Algeria or abroad',
      'Means of transportation (plane, train, tramway, ship, bus, car)',
      'Describing past holidays and memorable trips',
      'Asking for and giving directions in a town'
    ],
    grammarPoints: [
      'Past Simple Tense (Regular verbs with -ed ending and common Irregular verbs: went, visited, saw, took, bought)',
      'Pronunciation of regular past "-ed" (/t/, /d/, /ɪd/)',
      'Time markers for past (yesterday, last week, 3 days ago, in 2024)',
      'Prepositions of movement and direction (turn left, go straight, cross the road, opposite)'
    ],
    vocabularyTopics: [
      'Travel items (ticket, suitcase, passport, camera, boarding pass)',
      'Tourist attractions (beach, desert dunes, Roman ruins of Timgad / Tipaza)',
      'Weather conditions (sunny, rainy, snowy, windy, warm, foggy)',
      'Directions (straight on, right, left, next to, between)'
    ],
    skills: ['Reading travel diaries', 'Past simple drills', 'Vocabulary maps', 'Writing a holiday travel report'],
    communicativeFunctions: ['Narrating past events', 'Inquiring about transport', 'Guiding tourists with directions'],
    sampleReadingTopics: [
      'Nassim\'s memorable winter trip to the snows of Chrea / Tikjda',
      'A travel diary exploring the golden dunes of Taghit and Timimoun'
    ],
    active: true
  },
  {
    id: '2am-seq-4',
    schoolYear: '2AM',
    sequenceNumber: 4,
    sequenceTitle: 'Sequence 4: Me and My Environment',
    theme: 'Eco-Friendly Habits, Nature, Animals & Clean Cities',
    lessons: [
      'Protecting the local environment and neighborhood',
      'Waste recycling and sorting (plastic, glass, paper)',
      'Endangered animals in Algeria (Barbary Macaque, Fennec fox, Saharan Cheetah)',
      'Saving water and electricity'
    ],
    grammarPoints: [
      'Modal of obligation and prohibition: "must" / "mustn\'t"',
      'Imperatives for environmental campaigns (Plant trees, Do not litter)',
      'Expressing cause: "because" + clause',
      'Future with "will" / "won\'t" introduction for predictions'
    ],
    vocabularyTopics: [
      'Environmental issues (pollution, litter, trash bins, smoke, plastic waste)',
      'Green actions (recycle, plant, clean up, protect, save energy, clean beach)',
      'Flora and Fauna of North Africa',
      'Eco-slogans and nature preservation terms'
    ],
    skills: ['Reading informational texts', 'Grammar checks', 'Vocabulary grouping', 'Writing an eco-charter or green pledge'],
    communicativeFunctions: ['Expressing obligation and prohibition', 'Raising environmental awareness', 'Suggesting green solutions'],
    sampleReadingTopics: [
      'An environmental clean-up campaign organized by middle school pupils in Annaba',
      'An article about saving the endangered Barbary Macaque in Djurdjura National Park'
    ],
    active: true
  },

  // ================= 3AM (Third Year Middle School) =================
  {
    id: '3am-seq-1',
    schoolYear: '3AM',
    sequenceNumber: 1,
    sequenceTitle: 'Sequence 1: Me, My Abilities, My Interests and My Personality',
    theme: 'Personality Profiles, Talents, Hobbies & Teen Lifestyle',
    lessons: [
      'Describing personality traits and psychological qualities',
      'Expressing abilities, talents and intelligences',
      'Discussing hobbies, passions and youth clubs (robotics, astronomy, chess)',
      'Writing a personal profile / bio for a teen club'
    ],
    grammarPoints: [
      'Can / could / be able to (abilities in present and past)',
      'Verbs of liking + Gerund (-ing form): fond of, keen on, interested in, good at',
      'Relative pronouns: "who" (for persons) and "which / that" (for things)',
      'Qualifying adjectives with prefixes for opposites (kind/unkind, patient/impatient, polite/impolite)'
    ],
    vocabularyTopics: [
      'Personality adjectives (sociable, shy, helpful, ambitious, hard-working, creative, curious, friendly)',
      'Special talents (coding, painting, playing violin, public speaking, chess champion)',
      'Youth activities and extracurricular clubs',
      'Character flaws vs strengths'
    ],
    skills: ['Reading personal profiles', 'Affixes & word formation', 'Relative clauses', 'Writing a youth club application profile'],
    communicativeFunctions: ['Describing one\'s personality and talents', 'Defining people and hobbies', 'Justifying personal choices'],
    sampleReadingTopics: [
      'A profile of Walid, a talented young Algerian robotics champion from Batna',
      'An interview with an inspiring teenage swimmer from Mostaganem'
    ],
    active: true
  },
  {
    id: '3am-seq-2',
    schoolYear: '3AM',
    sequenceNumber: 2,
    sequenceTitle: 'Sequence 2: Me and My Environment (Natural Disasters & Solidarity)',
    theme: 'Natural Disasters, Earthquakes, Floods & Solidarity Campaigns',
    lessons: [
      'Natural disasters and phenomena (earthquakes, floods, forest fires, tsunamis)',
      'Safety measures and emergency response (Civil Protection)',
      'Solidarity, volunteering and helping victims during crises (Red Crescent)',
      'Reporting a past disaster and solidarity campaign'
    ],
    grammarPoints: [
      'Past Continuous tense (was / were + verb-ing)',
      'Past Continuous with Past Simple using "when" and "while"',
      'Connectors of cause and consequence: "because", "since", "so", "therefore", "as a result"',
      'Pronunciation of strong and weak forms of "was" and "were"'
    ],
    vocabularyTopics: [
      'Disasters (earthquake, flood, wildfire, storm, avalanche, landslide)',
      'Emergency terms (evacuate, rescue team, paramedics, civil protection, emergency kit, shelter)',
      'Solidarity actions (donate blankets, food aid, volunteer, blood donation, rebuild)',
      'Damage terms (collapsed buildings, injured, survivors, heroic deeds)'
    ],
    skills: ['Reading news reports', 'Time clauses with when/while', 'Cause/consequence logic', 'Writing an emergency news report or solidarity appeal'],
    communicativeFunctions: ['Describing simultaneous past events', 'Expressing causes and results', 'Narrating disaster recovery'],
    sampleReadingTopics: [
      'The heroic intervention of the Algerian Civil Protection during international earthquake rescue missions',
      'How local villagers and youth in Tizi Ouzou united to overcome forest fires'
    ],
    active: true
  },
  {
    id: '3am-seq-3',
    schoolYear: '3AM',
    sequenceNumber: 3,
    sequenceTitle: 'Sequence 3: Me and My Inventions / Scientific World',
    theme: 'Inventions, Discoveries, Technology & Biographies of Inventors',
    lessons: [
      'Great historical inventions and modern technologies (computer, internet, penicillin, telephone, airplane)',
      'Biographies of Muslim, Algerian and world scientists (Ibn al-Haytham, Belgacem Haba, Alexander Fleming, Marie Curie)',
      'How inventions changed humanity',
      'Writing the biography of an outstanding inventor'
    ],
    grammarPoints: [
      'Passive Voice in Simple Present and Simple Past (is/are + p.p., was/were + p.p.)',
      'Chronological connectors (First, Then, Later, After that, In the end, Finally)',
      'Time prepositions in biographies (in 1957, on July 5th, from... to..., during)',
      'Past perfect simple introduction (had + past participle) for earlier past actions'
    ],
    vocabularyTopics: [
      'Scientific terms (invention, discovery, patent, device, laboratory, prototype, revolution)',
      'Fields of science (microelectronics, medicine, astronomy, aviation, telecommunications)',
      'Action verbs in biographies (invented, discovered, graduated, awarded, published, contributed)'
    ],
    skills: ['Reading biographies', 'Passive transformation', 'Chronological sequencing', 'Writing a scientific biography'],
    communicativeFunctions: ['Describing processes and inventions', 'Narrating historical milestones', 'Highlighting scientific contributions'],
    sampleReadingTopics: [
      'Biography of Professor Belgacem Haba, the renowned Algerian scientist with over 1500 patents',
      'How Ibn al-Haytham\'s camera obscura paved the way for modern optics and cameras'
    ],
    active: true
  },
  {
    id: '3am-seq-4',
    schoolYear: '3AM',
    sequenceNumber: 4,
    sequenceTitle: 'Sequence 4: Me, My Culture and Other Cultures',
    theme: 'National Heritage, History, Martyrs & World Cultural Heritage',
    lessons: [
      'Algerian historical figures and national heroes (Emir Abdelkader, Hassiba Ben Bouali, Larbi Ben M\'hidi)',
      'World Heritage Sites in Algeria (Casbah of Algiers, Djemila, Timgad, M\'Zab)',
      'Comparing lifestyles, folklore and traditions in Algeria vs around the world',
      'Preserving cultural identity while respecting diversity'
    ],
    grammarPoints: [
      'Comparative and Superlative degrees of adjectives (short and long adjectives: older than, more famous than, the most ancient, the best, the worst)',
      'Used to + base verb (past habits and states)',
      'Expressing purpose: "in order to", "so as to", "so that"'
    ],
    vocabularyTopics: [
      'Historical monuments (citadel, amphitheater, fortress, ruins, architectural masterpiece)',
      'Historical heroes (hero, patriot, bravery, struggle, independence, legacy, sacrifice)',
      'Traditional handicrafts (pottery, brassware, carpet weaving, jewelry)',
      'Cultural values (hospitality, solidarity, honor, peace)'
    ],
    skills: ['Reading historical texts', 'Comparatives/Superlatives', 'Purpose clauses', 'Writing a promotional tourist presentation of an Algerian heritage site'],
    communicativeFunctions: ['Comparing historical monuments', 'Describing past lifestyles with "used to"', 'Praising national figures'],
    sampleReadingTopics: [
      'The Casbah of Algiers: an architectural jewel and UNESCO World Heritage site',
      'The bravery and legacy of Emir Abdelkader, philosopher and founder of the modern Algerian state'
    ],
    active: true
  },

  // ================= 4AM (Fourth Year Middle School - Official BEM Exam Level) =================
  {
    id: '4am-seq-1',
    schoolYear: '4AM',
    sequenceNumber: 1,
    sequenceTitle: 'Sequence 1: Me, Universal Landmarks and Outstanding Figures in History, Literature and Arts',
    theme: 'World Landmarks, Famous Authors, Artists, Architects & BEM Core Objectives',
    lessons: [
      'Describing world and national landmarks (Eiffel Tower, Big Ben, Taj Mahal, Casbah, Sydney Opera, Maqam Echahid)',
      'Biographical accounts of prominent figures (William Shakespeare, Kateb Yacine, Moufdi Zakaria, Leonardo Da Vinci, Zaha Hadid)',
      'Architectural features, dimensions, construction history and significance',
      'Writing an itinerary or fact-file profile for BEM exam tasks'
    ],
    grammarPoints: [
      'Active vs. Passive Voice (Past Simple focus: was/were + Past Participle)',
      'Comparatives of Equality (as + adj + as) and Inferiority (not as + adj + as)',
      'Comparative and Superlative forms of short and long adjectives',
      'Prefixes (dis-, un-, im-, in-, il-, ir-) and Suffixes (-ful, -less, -able, -tion, -er) for word formation',
      'Diphthongs: /aɪ/ (like), /eɪ/ (make), /aʊ/ (tower), /əʊ/ (famous), /ɔɪ/ (enjoy), /ɪə/ (near), /eə/ (bear)'
    ],
    vocabularyTopics: [
      'Architectural terms (monument, landmark, dome, minaret, tower, mausoleum, designed by, situated, height, weight)',
      'Art & Literature (novel, poem, playwright, masterpiece, composer, painting, renowned, Nobel Prize)',
      'Biographical chronological markers (born on, died in, graduated from, awarded, authored)'
    ],
    skills: ['BEM-style Reading comprehension (Text + 7pts questions)', 'Language Mastery: Grammar, Morphology, Pronunciation (7pts)', 'Written Expression / Situation of Integration (6pts)'],
    communicativeFunctions: ['Describing landmarks with precision', 'Writing standard BEM biographical profiles', 'Comparing monuments using degrees of comparison'],
    sampleReadingTopics: [
      'A BEM-standard text about the Taj Mahal or Big Ben and its history',
      'A biography of the great Algerian writer Kateb Yacine and his masterpiece "Nedjma"',
      'Zaha Hadid: The revolutionary queen of modern curved architecture'
    ],
    active: true
  },
  {
    id: '4am-seq-2',
    schoolYear: '4AM',
    sequenceNumber: 2,
    sequenceTitle: 'Sequence 2: Me, My Personality and Life Experiences',
    theme: 'Childhood Memories, Life Experiences, Overcoming Challenges & Dream Careers',
    lessons: [
      'Recalling fond and vivid childhood memories and first school experiences',
      'Describing personality development and personal achievements',
      'Life-changing events and overcoming hardships',
      'Future aspirations, ideal careers and dreams (diplomat, surgeon, astronaut, teacher)'
    ],
    grammarPoints: [
      'Present Perfect Tense with time markers (since, for, already, never, ever, yet, just)',
      'Past Simple vs. Present Perfect distinction',
      'Used to / didn\'t use to + infinitive for discontinued past habits',
      'Strong / extreme adjectives (frightened → terrified, small → tiny, good → wonderful, tired → exhausted)',
      'Silent letters (k in know, w in write, l in half, b in climb, t in listen)'
    ],
    vocabularyTopics: [
      'Childhood terms (primary school, nostalgic, memorable, unforgettable, classmates, childhood games)',
      'Adjectives of emotion & personality (determined, ambitious, persistent, confident, empathetic)',
      'Professions & career dreams (neurosurgeon, airline pilot, software engineer, humanitarian)',
      'Life experiences (won a contest, moved house, learned a language, traveled abroad)'
    ],
    skills: ['Reading reflective narratives', 'Grammar conversion drills', 'Phonetic identification of silent letters', 'Writing a personal narrative about a memorable childhood experience'],
    communicativeFunctions: ['Sharing life experiences', 'Contrasting past memories with present reality', 'Expressing career dreams and motives'],
    sampleReadingTopics: [
      'Dr. Yacine\'s journey from a remote village school in the Aures mountains to becoming an international heart surgeon',
      'An inspiring memory: my first day in middle school and how it transformed my life'
    ],
    active: true
  },
  {
    id: '4am-seq-3',
    schoolYear: '4AM',
    sequenceNumber: 3,
    sequenceTitle: 'Sequence 3: Me, My Community and Citizenship',
    theme: 'Civic Engagement, Charity, Solidarity, Voluntary Work & Good Citizenship',
    lessons: [
      'Active citizenship and civic duties in the neighborhood/school',
      'Volunteering in charitable organizations (food drives, winter relief, hospital visits, elderly care)',
      'Rights and duties of young citizens',
      'Promoting social solidarity, tolerance and mutual respect'
    ],
    grammarPoints: [
      'Conditional Sentence Type 1 (If + Present Simple, will / won\'t + base verb)',
      'Modals of obligation, necessity and prohibition (must, have to, should, mustn\'t, don\'t have to)',
      'Discourse markers and connectors (Although, However, Therefore, In addition, In order to)',
      'Pronunciation of final "-ed" and consonant clusters'
    ],
    vocabularyTopics: [
      'Civic terms (community, citizenship, solidarity, volunteer, donate, charity, charity association, fundraise)',
      'Moral values (honesty, generosity, empathy, responsibility, tolerance, cooperation, civic sense)',
      'Community projects (blood drive, planting neighborhood trees, renovating rural schools, food baskets for Ramadan)'
    ],
    skills: ['Reading persuasive and informational civic articles', 'Conditional structure drills', 'Discourse connector mastery', 'Writing a letter/speech motivating youth to participate in community charity'],
    communicativeFunctions: ['Expressing real conditions and future consequences', 'Stating moral obligations and civic rules', 'Writing persuasive calls for voluntary action'],
    sampleReadingTopics: [
      'Youth in Action: How a group of Algerian middle school pupils transformed their neighborhood into a green haven',
      'The Algerian Red Crescent and its noble humanitarian missions across communities'
    ],
    active: true
  },
  {
    id: '4am-seq-4',
    schoolYear: '4AM',
    sequenceNumber: 4,
    sequenceTitle: 'Sequence 4: Me, My Environment and Eco-Citizenship',
    theme: 'Eco-Citizenship, Climate Change, Renewable Energy, Green Cities & Biodiversity',
    lessons: [
      'Global warming, desertification and environmental threats in North Africa',
      'Renewable energies in Algeria (Solar energy in the Sahara, wind energy, green hydrogen)',
      'Eco-citizenship: Sustainable consumer habits, reducing plastic footprint, clean water protection',
      'Writing an official BEM argumentative letter or environmental campaign slogan'
    ],
    grammarPoints: [
      'Expressing purpose: "to", "in order to", "so as to", "so that + subject + can/will"',
      'Expressing cause & effect: "because", "since", "as" / "so", "consequently", "therefore"',
      'Imperatives and modal slogans for environmental awareness',
      'Word families and conversion: pollute → pollution → pollutant, destroy → destruction → destructive'
    ],
    vocabularyTopics: [
      'Eco terms (global warming, greenhouse effect, renewable energy, solar panels, desertification, sustainable)',
      'Protection terms (preserve, conserve, recycle, eco-friendly, carbon footprint, biodegradable)',
      'Biodiversity and nature reserves (El Kala National Park, Chrea, Hoggar, cedar forests)',
      'Activism (campaign, petition, awareness, green initiative, future generations)'
    ],
    skills: ['Reading argumentative environmental texts', 'Purpose and cause clause transformations', 'Morphology and word families', 'Writing a BEM-standard formal letter or opinion essay on saving the planet'],
    communicativeFunctions: ['Expressing cause, purpose and consequence', 'Arguing in favor of ecological solutions', 'Formulating green slogans and action plans'],
    sampleReadingTopics: [
      'Solar Power in the Algerian Sahara: Harnessing the golden sun for a clean and green future',
      'An argumentative article: Why every citizen must act now against plastic pollution on Algerian beaches'
    ],
    active: true
  }
];

export const QUESTION_TYPES_BY_SKILL = {
  reading: [
    { type: 'true_false', label: 'True / False', description: 'Write True or False next to statements' },
    { type: 'true_false_justify', label: 'True / False with Justification', description: 'True/False and quote evidence from text' },
    { type: 'multiple_choice', label: 'Multiple Choice (MCQ)', description: 'Choose the correct answer (a, b, c)' },
    { type: 'wh_questions', label: 'Answer the Questions (WH / Open)', description: 'Full answer comprehension questions' },
    { type: 'short_answers', label: 'Short Answers', description: 'Brief factual responses' },
    { type: 'matching', label: 'Matching (Headings / Ideas)', description: 'Match paragraphs with ideas or titles' },
    { type: 'ordering', label: 'Chronological Ordering', description: 'Reorder events as they happen in text' },
    { type: 'complete_table', label: 'Information Extraction (Table)', description: 'Extract key data into a summary table' },
    { type: 'find_references', label: 'Reference Words', description: 'What do the underlined words in the text refer to?' },
    { type: 'find_synonyms_antonyms', label: 'Find Synonyms / Antonyms', description: 'Find words closest/opposite in meaning in §1, §2' }
  ],
  grammar: [
    { type: 'fill_blanks', label: 'Fill in the Blanks', description: 'Complete sentences with given grammatical words' },
    { type: 'choose_correct', label: 'Choose the Correct Option', description: 'Select correct verb tense or preposition' },
    { type: 'put_verbs_in_brackets', label: 'Put Verbs in Brackets into Correct Form', description: 'Standard Algerian tense conjugation exercise' },
    { type: 'correct_mistakes', label: 'Find and Correct the Mistakes', description: 'Spot grammatical or spelling errors' },
    { type: 'transform_sentences', label: 'Transform Sentences (Active ⇄ Passive, etc.)', description: 'Rewrite sentences without changing meaning' },
    { type: 'make_questions', label: 'Ask Questions on Underlined Words', description: 'Form WH questions based on given answers' }
  ],
  vocabulary: [
    { type: 'matching', label: 'Match Words with Definitions', description: 'Match terms with meanings' },
    { type: 'odd_one_out', label: 'Odd One Out', description: 'Identify the word that does not belong to the set' },
    { type: 'word_formation', label: 'Word Formation (Prefix / Suffix)', description: 'Add affixes to form opposites or nouns' },
    { type: 'categorization', label: 'Categorization into Tables', description: 'Classify words into thematic columns' }
  ],
  writing: [
    { type: 'guided_writing', label: 'Guided Writing (Cues & Information Transfer)', description: 'Write a paragraph using given cues/fact-file' },
    { type: 'paragraph_writing', label: 'Paragraph Writing', description: 'Develop a coherent topic paragraph' },
    { type: 'email_message', label: 'Email / Letter to a Friend or Penpal', description: 'Standard letter/email format' },
    { type: 'dialogue', label: 'Dialogue Completion', description: 'Complete a conversational exchange' },
    { type: 'biography', label: 'Biography Profile', description: 'Write a full biography using bulleted notes' },
    { type: 'description', label: 'Description of Landmark or City', description: 'Detailed descriptive article' },
    { type: 'opinion_paragraph', label: 'Opinion / Argumentative Slogan', description: 'Express viewpoint with arguments' }
  ]
};

export const DEFAULT_HEADER_CONFIG = {
  republicTitle: 'PEOPLE\'S DEMOCRATIC REPUBLIC OF ALGERIA',
  ministryTitle: 'MINISTRY OF NATIONAL EDUCATION',
  schoolName: 'Ibn Khaldoun Middle School',
  wilaya: 'Wilaya of Algiers',
  teacherName: 'Teacher',
  classGrade: '3AM (Third Year)',
  academicYear: '2026–2027',
  examTitle: 'First Term English Examination',
  durationMinutes: 60,
  totalPoints: 20,
  datePlaceholder: 'November 2026',
  studentNamePlaceholder: 'Full Name: .....................................................  Class: 3AM ...',
  logoUrl: ''
};
