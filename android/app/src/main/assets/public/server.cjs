var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/data/curriculum.ts
var ALGERIAN_CURRICULUM = [
  // ================= 1AM (First Year Middle School) =================
  {
    id: "1am-seq-1",
    schoolYear: "1AM",
    sequenceNumber: 1,
    sequenceTitle: "Sequence 1: Me and My Friends",
    theme: "Personal Identity & Greetings",
    lessons: [
      "Greetings & Introductions (Hello, Hi, Good morning)",
      "Alphabet, Spelling names & numbers (1-100)",
      "Asking and giving age, phone number, and origin",
      "Personal ID card filling",
      "Classroom instructions and polite formulas"
    ],
    grammarPoints: [
      "Personal Subject Pronouns (I, you, he, she, it, we, they)",
      'Auxiliary verb "to be" (Present simple: am, is, are)',
      'Auxiliary verb "to have got" (have got / has got)',
      "Possessive adjectives (my, your, his, her)",
      "Demonstratives (this is / these are)",
      "Wh-questions (What, Who, How old, Where)"
    ],
    vocabularyTopics: [
      "Greetings & Farewells",
      "Numbers (Cardinal: 1-100)",
      "Colors and basic school objects",
      "Days of the week and months",
      "Countries and Nationalities (Algeria / Algerian, Tunisia / Tunisian, UK / British)"
    ],
    skills: ["Reading comprehension", "Language mechanics", "Vocabulary", "Writing basic ID profile"],
    communicativeFunctions: ["Introducing oneself", "Greeting peers", "Spelling names", "Asking for personal information"],
    sampleReadingTopics: [
      "An email introducing a new 1AM student (Amine / Razane)",
      "A school ID profile of a student from Constantine / Oran",
      "A welcoming message on a school social board"
    ],
    active: true
  },
  {
    id: "1am-seq-2",
    schoolYear: "1AM",
    sequenceNumber: 2,
    sequenceTitle: "Sequence 2: Me and My Family",
    theme: "Family Members, Occupations & Home",
    lessons: [
      "Describing the family tree (parents, siblings, grandparents)",
      "Describing occupations/jobs of family members",
      "Describing home / rooms and favorite spots",
      "Telling where people live and what they do"
    ],
    grammarPoints: [
      "Possessive case: Saxon genitive ('s)",
      "Articles: Definite (the) & Indefinite (a / an)",
      "Present simple with third person singular (lives, works, teaches)",
      "Prepositions of place (in, on, near, next to)",
      "Yes/No questions with Do / Does"
    ],
    vocabularyTopics: [
      "Family members (father, mother, brother, sister, uncle, aunt, grandparents)",
      "Occupations & professions (teacher, doctor, engineer, nurse, farmer, mechanic)",
      "Rooms of the house (living room, bedroom, kitchen, bathroom)",
      "Physical traits (tall, short, slim, young, old)"
    ],
    skills: ["Reading", "Grammar", "Vocabulary", "Family tree presentation"],
    communicativeFunctions: ["Introducing family members", "Stating jobs", "Describing one's house"],
    sampleReadingTopics: [
      "A student describing their lovely family in Tlemcen",
      "A letter from a cousin describing their family members and occupations"
    ],
    active: true
  },
  {
    id: "1am-seq-3",
    schoolYear: "1AM",
    sequenceNumber: 3,
    sequenceTitle: "Sequence 3: Me and My Daily Activities",
    theme: "Daily Routines, Habits & Leisure Time",
    lessons: [
      "Daily morning and evening routines",
      "Telling the time (o'clock, half past, quarter to/past)",
      "Weekend activities, sports and hobbies",
      "Helping at home (chores)"
    ],
    grammarPoints: [
      "Present Simple tense (affirmative, negative, interrogative)",
      'Pronunciation of final "-s" (/s/, /z/, /\u026Az/)',
      "Adverbs of frequency (always, usually, often, sometimes, never)",
      "Prepositions of time (at 7:00, in the morning, on Friday)"
    ],
    vocabularyTopics: [
      "Routines (wake up, wash face, have breakfast, go to school, do homework, sleep)",
      "Sports and hobbies (football, handball, reading, drawing, cycling)",
      "Time expressions and clock reading",
      "Household chores (tidy room, help mother, water plants)"
    ],
    skills: ["Reading comprehension", "Grammar application", "Pronunciation drill", "Writing a daily schedule"],
    communicativeFunctions: ["Expressing daily routines", "Asking and telling the time", "Talking about hobbies"],
    sampleReadingTopics: [
      "A typical school day in the life of Rayan in Algiers",
      "How Yasmine spends her weekend in Bejaia"
    ],
    active: true
  },
  {
    id: "1am-seq-4",
    schoolYear: "1AM",
    sequenceNumber: 4,
    sequenceTitle: "Sequence 4: Me and My School",
    theme: "School Life, Subjects, Timetable & Rules",
    lessons: [
      "School facilities (canteen, courtyard, library, science lab)",
      "School subjects and weekly timetable",
      "School rules (rights and duties)",
      "Expressing abilities and permissions"
    ],
    grammarPoints: [
      `Modal "can" / "can't" for ability and permission`,
      "Imperatives for classroom rules (Listen, Don't shout, Be on time)",
      "Verbs of liking + noun / gerund (like, love, enjoy, hate)",
      "Conjunctions (and, but, because)"
    ],
    vocabularyTopics: [
      "School subjects (English, Arabic, French, Maths, Science, History, Geography, Art, PE)",
      "School rooms and places",
      "School regulations (punctuality, uniform, respect)",
      "Adjectives describing school subjects (interesting, easy, difficult, fun)"
    ],
    skills: ["Reading", "Language forms", "Vocabulary", "Writing school rules or dream school profile"],
    communicativeFunctions: ["Expressing likes and dislikes", "Stating rules and duties", "Describing abilities"],
    sampleReadingTopics: [
      "A description of Ibn Khaldoun Middle School in Setif",
      "A poster presenting the English Club and school rules"
    ],
    active: true
  },
  {
    id: "1am-seq-5",
    schoolYear: "1AM",
    sequenceNumber: 5,
    sequenceTitle: "Sequence 5: Me, My Country and the World",
    theme: "Algerian Heritage, Geography, Monuments & Culture",
    lessons: [
      "Locating Algerian cities and Wilayas using cardinal points",
      "Traditional Algerian clothes and dishes (Couscous, Karakou, Burnous)",
      "National monuments (Martyrs' Memorial / Maqam Echahid, Santa Cruz, Tassili n'Ajjer)",
      "Celebrations (Independence Day, Eid, Yennayer)"
    ],
    grammarPoints: [
      "Cardinal points and prepositions of direction (North, South, East, West)",
      "There is / There are (affirmative, negative, interrogative)",
      "Adjectives of nationality and origin",
      "Simple past of verb to be (was / were) introduction"
    ],
    vocabularyTopics: [
      "Traditional dishes and clothes",
      "Monuments and landscapes (mountains, desert, oasis, Mediterranean coast)",
      "Geographical terms (capital, borders, located in the north of)",
      "National celebrations and symbols"
    ],
    skills: ["Reading", "Vocabulary extraction", "Writing a postcard or travel guide about Algeria"],
    communicativeFunctions: ["Locating places", "Describing cultural traditions", "Welcoming foreign visitors"],
    sampleReadingTopics: [
      "A tourist travel guide discovering Ghardaia and the M'zab Valley",
      "A postcard from an Algerian student describing Algiers the White"
    ],
    active: true
  },
  // ================= 2AM (Second Year Middle School) =================
  {
    id: "2am-seq-1",
    schoolYear: "2AM",
    sequenceNumber: 1,
    sequenceTitle: "Sequence 1: Me and My Shopping",
    theme: "Shopping, Food, Clothes, Markets & Prices",
    lessons: [
      "Shopping at the grocery store / supermarket / market",
      "Buying clothes (sizes, colors, materials, fitting room)",
      "Asking for prices, quantities and weights",
      "Healthy eating habits and food recipes"
    ],
    grammarPoints: [
      "Countable vs Uncountable nouns",
      "Quantifiers: some / any / a lot of / a little / a few",
      'Questions with "How much" (prices/uncountable) and "How many" (countable)',
      "Demonstratives: this/that/these/those",
      'Polite requests with "Can I have...", "Would you like..."'
    ],
    vocabularyTopics: [
      "Food items (fruits, vegetables, meat, bread, dairy, olive oil)",
      "Containers & weights (a kilo of, a bottle of, a packet of, a can of, a loaf of)",
      "Clothing items (jacket, trousers, sneakers, scarf, dress) and sizes (S, M, L, XL)",
      "Algerian Dinar (DZD) and payment terms"
    ],
    skills: ["Reading dialogues and recipes", "Grammar analysis", "Vocabulary sorting", "Writing a shopping dialogue or recipe"],
    communicativeFunctions: ["Ordering food", "Asking about prices and sizes", "Planning a party meal"],
    sampleReadingTopics: [
      "A weekend shopping trip to the traditional bazaar in Constantine",
      "A recipe for making traditional Algerian Mint Tea and Makroud"
    ],
    active: true
  },
  {
    id: "2am-seq-2",
    schoolYear: "2AM",
    sequenceNumber: 2,
    sequenceTitle: "Sequence 2: Me and My Health",
    theme: "Illnesses, Healthy Living & Doctor Visits",
    lessons: [
      "Describing common health problems and symptoms",
      "Visiting the doctor / school clinic",
      "Giving health advice and recommendations",
      "Maintaining physical fitness and balanced nutrition"
    ],
    grammarPoints: [
      `Modal verb "should" / "shouldn't" for giving advice`,
      "Imperatives for health guidelines (Drink water, Don't eat junk food)",
      'Verb "have got" with illnesses (I have got a headache / stomach ache)',
      "Pronunciation of /t\u0283/ (chest), /\u0283/ (shoulder), /k/ (stomach, ache)"
    ],
    vocabularyTopics: [
      "Body parts (head, throat, back, stomach, ear, eye, tooth, knee)",
      "Illnesses & symptoms (fever, flu, cough, toothache, sore throat, allergy)",
      "Remedies and medical items (syrup, pills, bandage, rest, herbal tea, dentist)",
      "Healthy lifestyle habits vs junk habits"
    ],
    skills: ["Reading comprehension", "Giving advice", "Vocabulary pairing", "Writing a health advice letter"],
    communicativeFunctions: [`Asking "What's the matter?"`, "Expressing physical pain", "Giving medical and dietary advice"],
    sampleReadingTopics: [
      "A visit to Dr. Mansouri's clinic for a bad cold",
      "An awareness article in the school magazine about healthy school snacks"
    ],
    active: true
  },
  {
    id: "2am-seq-3",
    schoolYear: "2AM",
    sequenceNumber: 3,
    sequenceTitle: "Sequence 3: Me and My Travels",
    theme: "Holidays, Transportation, Weather & Itineraries",
    lessons: [
      "Planning a journey / vacation in Algeria or abroad",
      "Means of transportation (plane, train, tramway, ship, bus, car)",
      "Describing past holidays and memorable trips",
      "Asking for and giving directions in a town"
    ],
    grammarPoints: [
      "Past Simple Tense (Regular verbs with -ed ending and common Irregular verbs: went, visited, saw, took, bought)",
      'Pronunciation of regular past "-ed" (/t/, /d/, /\u026Ad/)',
      "Time markers for past (yesterday, last week, 3 days ago, in 2024)",
      "Prepositions of movement and direction (turn left, go straight, cross the road, opposite)"
    ],
    vocabularyTopics: [
      "Travel items (ticket, suitcase, passport, camera, boarding pass)",
      "Tourist attractions (beach, desert dunes, Roman ruins of Timgad / Tipaza)",
      "Weather conditions (sunny, rainy, snowy, windy, warm, foggy)",
      "Directions (straight on, right, left, next to, between)"
    ],
    skills: ["Reading travel diaries", "Past simple drills", "Vocabulary maps", "Writing a holiday travel report"],
    communicativeFunctions: ["Narrating past events", "Inquiring about transport", "Guiding tourists with directions"],
    sampleReadingTopics: [
      "Nassim's memorable winter trip to the snows of Chrea / Tikjda",
      "A travel diary exploring the golden dunes of Taghit and Timimoun"
    ],
    active: true
  },
  {
    id: "2am-seq-4",
    schoolYear: "2AM",
    sequenceNumber: 4,
    sequenceTitle: "Sequence 4: Me and My Environment",
    theme: "Eco-Friendly Habits, Nature, Animals & Clean Cities",
    lessons: [
      "Protecting the local environment and neighborhood",
      "Waste recycling and sorting (plastic, glass, paper)",
      "Endangered animals in Algeria (Barbary Macaque, Fennec fox, Saharan Cheetah)",
      "Saving water and electricity"
    ],
    grammarPoints: [
      `Modal of obligation and prohibition: "must" / "mustn't"`,
      "Imperatives for environmental campaigns (Plant trees, Do not litter)",
      'Expressing cause: "because" + clause',
      `Future with "will" / "won't" introduction for predictions`
    ],
    vocabularyTopics: [
      "Environmental issues (pollution, litter, trash bins, smoke, plastic waste)",
      "Green actions (recycle, plant, clean up, protect, save energy, clean beach)",
      "Flora and Fauna of North Africa",
      "Eco-slogans and nature preservation terms"
    ],
    skills: ["Reading informational texts", "Grammar checks", "Vocabulary grouping", "Writing an eco-charter or green pledge"],
    communicativeFunctions: ["Expressing obligation and prohibition", "Raising environmental awareness", "Suggesting green solutions"],
    sampleReadingTopics: [
      "An environmental clean-up campaign organized by middle school pupils in Annaba",
      "An article about saving the endangered Barbary Macaque in Djurdjura National Park"
    ],
    active: true
  },
  // ================= 3AM (Third Year Middle School) =================
  {
    id: "3am-seq-1",
    schoolYear: "3AM",
    sequenceNumber: 1,
    sequenceTitle: "Sequence 1: Me, My Abilities, My Interests and My Personality",
    theme: "Personality Profiles, Talents, Hobbies & Teen Lifestyle",
    lessons: [
      "Describing personality traits and psychological qualities",
      "Expressing abilities, talents and intelligences",
      "Discussing hobbies, passions and youth clubs (robotics, astronomy, chess)",
      "Writing a personal profile / bio for a teen club"
    ],
    grammarPoints: [
      "Can / could / be able to (abilities in present and past)",
      "Verbs of liking + Gerund (-ing form): fond of, keen on, interested in, good at",
      'Relative pronouns: "who" (for persons) and "which / that" (for things)',
      "Qualifying adjectives with prefixes for opposites (kind/unkind, patient/impatient, polite/impolite)"
    ],
    vocabularyTopics: [
      "Personality adjectives (sociable, shy, helpful, ambitious, hard-working, creative, curious, friendly)",
      "Special talents (coding, painting, playing violin, public speaking, chess champion)",
      "Youth activities and extracurricular clubs",
      "Character flaws vs strengths"
    ],
    skills: ["Reading personal profiles", "Affixes & word formation", "Relative clauses", "Writing a youth club application profile"],
    communicativeFunctions: ["Describing one's personality and talents", "Defining people and hobbies", "Justifying personal choices"],
    sampleReadingTopics: [
      "A profile of Walid, a talented young Algerian robotics champion from Batna",
      "An interview with an inspiring teenage swimmer from Mostaganem"
    ],
    active: true
  },
  {
    id: "3am-seq-2",
    schoolYear: "3AM",
    sequenceNumber: 2,
    sequenceTitle: "Sequence 2: Me and My Environment (Natural Disasters & Solidarity)",
    theme: "Natural Disasters, Earthquakes, Floods & Solidarity Campaigns",
    lessons: [
      "Natural disasters and phenomena (earthquakes, floods, forest fires, tsunamis)",
      "Safety measures and emergency response (Civil Protection)",
      "Solidarity, volunteering and helping victims during crises (Red Crescent)",
      "Reporting a past disaster and solidarity campaign"
    ],
    grammarPoints: [
      "Past Continuous tense (was / were + verb-ing)",
      'Past Continuous with Past Simple using "when" and "while"',
      'Connectors of cause and consequence: "because", "since", "so", "therefore", "as a result"',
      'Pronunciation of strong and weak forms of "was" and "were"'
    ],
    vocabularyTopics: [
      "Disasters (earthquake, flood, wildfire, storm, avalanche, landslide)",
      "Emergency terms (evacuate, rescue team, paramedics, civil protection, emergency kit, shelter)",
      "Solidarity actions (donate blankets, food aid, volunteer, blood donation, rebuild)",
      "Damage terms (collapsed buildings, injured, survivors, heroic deeds)"
    ],
    skills: ["Reading news reports", "Time clauses with when/while", "Cause/consequence logic", "Writing an emergency news report or solidarity appeal"],
    communicativeFunctions: ["Describing simultaneous past events", "Expressing causes and results", "Narrating disaster recovery"],
    sampleReadingTopics: [
      "The heroic intervention of the Algerian Civil Protection during international earthquake rescue missions",
      "How local villagers and youth in Tizi Ouzou united to overcome forest fires"
    ],
    active: true
  },
  {
    id: "3am-seq-3",
    schoolYear: "3AM",
    sequenceNumber: 3,
    sequenceTitle: "Sequence 3: Me and My Inventions / Scientific World",
    theme: "Inventions, Discoveries, Technology & Biographies of Inventors",
    lessons: [
      "Great historical inventions and modern technologies (computer, internet, penicillin, telephone, airplane)",
      "Biographies of Muslim, Algerian and world scientists (Ibn al-Haytham, Belgacem Haba, Alexander Fleming, Marie Curie)",
      "How inventions changed humanity",
      "Writing the biography of an outstanding inventor"
    ],
    grammarPoints: [
      "Passive Voice in Simple Present and Simple Past (is/are + p.p., was/were + p.p.)",
      "Chronological connectors (First, Then, Later, After that, In the end, Finally)",
      "Time prepositions in biographies (in 1957, on July 5th, from... to..., during)",
      "Past perfect simple introduction (had + past participle) for earlier past actions"
    ],
    vocabularyTopics: [
      "Scientific terms (invention, discovery, patent, device, laboratory, prototype, revolution)",
      "Fields of science (microelectronics, medicine, astronomy, aviation, telecommunications)",
      "Action verbs in biographies (invented, discovered, graduated, awarded, published, contributed)"
    ],
    skills: ["Reading biographies", "Passive transformation", "Chronological sequencing", "Writing a scientific biography"],
    communicativeFunctions: ["Describing processes and inventions", "Narrating historical milestones", "Highlighting scientific contributions"],
    sampleReadingTopics: [
      "Biography of Professor Belgacem Haba, the renowned Algerian scientist with over 1500 patents",
      "How Ibn al-Haytham's camera obscura paved the way for modern optics and cameras"
    ],
    active: true
  },
  {
    id: "3am-seq-4",
    schoolYear: "3AM",
    sequenceNumber: 4,
    sequenceTitle: "Sequence 4: Me, My Culture and Other Cultures",
    theme: "National Heritage, History, Martyrs & World Cultural Heritage",
    lessons: [
      "Algerian historical figures and national heroes (Emir Abdelkader, Hassiba Ben Bouali, Larbi Ben M'hidi)",
      "World Heritage Sites in Algeria (Casbah of Algiers, Djemila, Timgad, M'Zab)",
      "Comparing lifestyles, folklore and traditions in Algeria vs around the world",
      "Preserving cultural identity while respecting diversity"
    ],
    grammarPoints: [
      "Comparative and Superlative degrees of adjectives (short and long adjectives: older than, more famous than, the most ancient, the best, the worst)",
      "Used to + base verb (past habits and states)",
      'Expressing purpose: "in order to", "so as to", "so that"'
    ],
    vocabularyTopics: [
      "Historical monuments (citadel, amphitheater, fortress, ruins, architectural masterpiece)",
      "Historical heroes (hero, patriot, bravery, struggle, independence, legacy, sacrifice)",
      "Traditional handicrafts (pottery, brassware, carpet weaving, jewelry)",
      "Cultural values (hospitality, solidarity, honor, peace)"
    ],
    skills: ["Reading historical texts", "Comparatives/Superlatives", "Purpose clauses", "Writing a promotional tourist presentation of an Algerian heritage site"],
    communicativeFunctions: ["Comparing historical monuments", 'Describing past lifestyles with "used to"', "Praising national figures"],
    sampleReadingTopics: [
      "The Casbah of Algiers: an architectural jewel and UNESCO World Heritage site",
      "The bravery and legacy of Emir Abdelkader, philosopher and founder of the modern Algerian state"
    ],
    active: true
  },
  // ================= 4AM (Fourth Year Middle School - Official BEM Exam Level) =================
  {
    id: "4am-seq-1",
    schoolYear: "4AM",
    sequenceNumber: 1,
    sequenceTitle: "Sequence 1: Me, Universal Landmarks and Outstanding Figures in History, Literature and Arts",
    theme: "World Landmarks, Famous Authors, Artists, Architects & BEM Core Objectives",
    lessons: [
      "Describing world and national landmarks (Eiffel Tower, Big Ben, Taj Mahal, Casbah, Sydney Opera, Maqam Echahid)",
      "Biographical accounts of prominent figures (William Shakespeare, Kateb Yacine, Moufdi Zakaria, Leonardo Da Vinci, Zaha Hadid)",
      "Architectural features, dimensions, construction history and significance",
      "Writing an itinerary or fact-file profile for BEM exam tasks"
    ],
    grammarPoints: [
      "Active vs. Passive Voice (Past Simple focus: was/were + Past Participle)",
      "Comparatives of Equality (as + adj + as) and Inferiority (not as + adj + as)",
      "Comparative and Superlative forms of short and long adjectives",
      "Prefixes (dis-, un-, im-, in-, il-, ir-) and Suffixes (-ful, -less, -able, -tion, -er) for word formation",
      "Diphthongs: /a\u026A/ (like), /e\u026A/ (make), /a\u028A/ (tower), /\u0259\u028A/ (famous), /\u0254\u026A/ (enjoy), /\u026A\u0259/ (near), /e\u0259/ (bear)"
    ],
    vocabularyTopics: [
      "Architectural terms (monument, landmark, dome, minaret, tower, mausoleum, designed by, situated, height, weight)",
      "Art & Literature (novel, poem, playwright, masterpiece, composer, painting, renowned, Nobel Prize)",
      "Biographical chronological markers (born on, died in, graduated from, awarded, authored)"
    ],
    skills: ["BEM-style Reading comprehension (Text + 7pts questions)", "Language Mastery: Grammar, Morphology, Pronunciation (7pts)", "Written Expression / Situation of Integration (6pts)"],
    communicativeFunctions: ["Describing landmarks with precision", "Writing standard BEM biographical profiles", "Comparing monuments using degrees of comparison"],
    sampleReadingTopics: [
      "A BEM-standard text about the Taj Mahal or Big Ben and its history",
      'A biography of the great Algerian writer Kateb Yacine and his masterpiece "Nedjma"',
      "Zaha Hadid: The revolutionary queen of modern curved architecture"
    ],
    active: true
  },
  {
    id: "4am-seq-2",
    schoolYear: "4AM",
    sequenceNumber: 2,
    sequenceTitle: "Sequence 2: Me, My Personality and Life Experiences",
    theme: "Childhood Memories, Life Experiences, Overcoming Challenges & Dream Careers",
    lessons: [
      "Recalling fond and vivid childhood memories and first school experiences",
      "Describing personality development and personal achievements",
      "Life-changing events and overcoming hardships",
      "Future aspirations, ideal careers and dreams (diplomat, surgeon, astronaut, teacher)"
    ],
    grammarPoints: [
      "Present Perfect Tense with time markers (since, for, already, never, ever, yet, just)",
      "Past Simple vs. Present Perfect distinction",
      "Used to / didn't use to + infinitive for discontinued past habits",
      "Strong / extreme adjectives (frightened \u2192 terrified, small \u2192 tiny, good \u2192 wonderful, tired \u2192 exhausted)",
      "Silent letters (k in know, w in write, l in half, b in climb, t in listen)"
    ],
    vocabularyTopics: [
      "Childhood terms (primary school, nostalgic, memorable, unforgettable, classmates, childhood games)",
      "Adjectives of emotion & personality (determined, ambitious, persistent, confident, empathetic)",
      "Professions & career dreams (neurosurgeon, airline pilot, software engineer, humanitarian)",
      "Life experiences (won a contest, moved house, learned a language, traveled abroad)"
    ],
    skills: ["Reading reflective narratives", "Grammar conversion drills", "Phonetic identification of silent letters", "Writing a personal narrative about a memorable childhood experience"],
    communicativeFunctions: ["Sharing life experiences", "Contrasting past memories with present reality", "Expressing career dreams and motives"],
    sampleReadingTopics: [
      "Dr. Yacine's journey from a remote village school in the Aures mountains to becoming an international heart surgeon",
      "An inspiring memory: my first day in middle school and how it transformed my life"
    ],
    active: true
  },
  {
    id: "4am-seq-3",
    schoolYear: "4AM",
    sequenceNumber: 3,
    sequenceTitle: "Sequence 3: Me, My Community and Citizenship",
    theme: "Civic Engagement, Charity, Solidarity, Voluntary Work & Good Citizenship",
    lessons: [
      "Active citizenship and civic duties in the neighborhood/school",
      "Volunteering in charitable organizations (food drives, winter relief, hospital visits, elderly care)",
      "Rights and duties of young citizens",
      "Promoting social solidarity, tolerance and mutual respect"
    ],
    grammarPoints: [
      "Conditional Sentence Type 1 (If + Present Simple, will / won't + base verb)",
      "Modals of obligation, necessity and prohibition (must, have to, should, mustn't, don't have to)",
      "Discourse markers and connectors (Although, However, Therefore, In addition, In order to)",
      'Pronunciation of final "-ed" and consonant clusters'
    ],
    vocabularyTopics: [
      "Civic terms (community, citizenship, solidarity, volunteer, donate, charity, charity association, fundraise)",
      "Moral values (honesty, generosity, empathy, responsibility, tolerance, cooperation, civic sense)",
      "Community projects (blood drive, planting neighborhood trees, renovating rural schools, food baskets for Ramadan)"
    ],
    skills: ["Reading persuasive and informational civic articles", "Conditional structure drills", "Discourse connector mastery", "Writing a letter/speech motivating youth to participate in community charity"],
    communicativeFunctions: ["Expressing real conditions and future consequences", "Stating moral obligations and civic rules", "Writing persuasive calls for voluntary action"],
    sampleReadingTopics: [
      "Youth in Action: How a group of Algerian middle school pupils transformed their neighborhood into a green haven",
      "The Algerian Red Crescent and its noble humanitarian missions across communities"
    ],
    active: true
  },
  {
    id: "4am-seq-4",
    schoolYear: "4AM",
    sequenceNumber: 4,
    sequenceTitle: "Sequence 4: Me, My Environment and Eco-Citizenship",
    theme: "Eco-Citizenship, Climate Change, Renewable Energy, Green Cities & Biodiversity",
    lessons: [
      "Global warming, desertification and environmental threats in North Africa",
      "Renewable energies in Algeria (Solar energy in the Sahara, wind energy, green hydrogen)",
      "Eco-citizenship: Sustainable consumer habits, reducing plastic footprint, clean water protection",
      "Writing an official BEM argumentative letter or environmental campaign slogan"
    ],
    grammarPoints: [
      'Expressing purpose: "to", "in order to", "so as to", "so that + subject + can/will"',
      'Expressing cause & effect: "because", "since", "as" / "so", "consequently", "therefore"',
      "Imperatives and modal slogans for environmental awareness",
      "Word families and conversion: pollute \u2192 pollution \u2192 pollutant, destroy \u2192 destruction \u2192 destructive"
    ],
    vocabularyTopics: [
      "Eco terms (global warming, greenhouse effect, renewable energy, solar panels, desertification, sustainable)",
      "Protection terms (preserve, conserve, recycle, eco-friendly, carbon footprint, biodegradable)",
      "Biodiversity and nature reserves (El Kala National Park, Chrea, Hoggar, cedar forests)",
      "Activism (campaign, petition, awareness, green initiative, future generations)"
    ],
    skills: ["Reading argumentative environmental texts", "Purpose and cause clause transformations", "Morphology and word families", "Writing a BEM-standard formal letter or opinion essay on saving the planet"],
    communicativeFunctions: ["Expressing cause, purpose and consequence", "Arguing in favor of ecological solutions", "Formulating green slogans and action plans"],
    sampleReadingTopics: [
      "Solar Power in the Algerian Sahara: Harnessing the golden sun for a clean and green future",
      "An argumentative article: Why every citizen must act now against plastic pollution on Algerian beaches"
    ],
    active: true
  }
];

// src/data/initialData.ts
var INITIAL_SCHOOL_PROFILE = {
  teacherName: "M. Benali",
  schoolName: "Emir Abdelkader Middle School",
  wilaya: "Algiers",
  commune: "Bab El Oued",
  academicYear: "2026\u20132027",
  email: "teacher@examcraft.dz",
  defaultDuration: 60,
  defaultPoints: 20,
  defaultLanguage: "both"
};
var INITIAL_EXAMS = [
  {
    id: "exam-4am-bem-1",
    title: "4AM BEM Official Model Exam - Landmarks & Outstanding Figures",
    schoolYear: "4AM",
    sequence: "Sequence 1",
    unitTitle: "Universal Landmarks and Outstanding Figures",
    theme: "World Heritage & Kateb Yacine",
    examType: "BEM-style practice",
    durationMinutes: 90,
    totalPoints: 20,
    difficulty: "Medium",
    targetCEFR: "A2",
    status: "Final",
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: "MINISTRY OF NATIONAL EDUCATION",
      schoolName: "Emir Abdelkader Middle School",
      wilaya: "Algiers Direction of Education",
      teacherName: "M. Benali",
      classGrade: "Level: 4AM",
      academicYear: "2026\u20132027",
      examTitle: "Second Term English Examination (BEM Mock Test)",
      durationMinutes: 90,
      totalPoints: 20,
      datePlaceholder: "March 2027",
      studentNamePlaceholder: "Full Name: .....................................................   Group: 4AM ..."
    },
    instructions: "Read the text carefully and answer all questions in parts one and two. Write clearly.",
    sections: [
      {
        id: "sec-reading",
        title: "PART ONE: A/ READING COMPREHENSION",
        instruction: "Read the text carefully and do the following activities.",
        type: "reading",
        passageTitle: "The Casbah of Algiers: An Architectural Jewel",
        passage: `The Casbah of Algiers is one of the most famous historical and architectural landmarks in North Africa. Overlooking the sparkling Mediterranean Sea, this ancient citadel was built during the 10th century on the ruins of old Icosium. It is renowned for its whitewashed houses, narrow winding alleys, magnificent palaces, and historic Ottoman mosques such as Ketchaoua Mosque.

In 1992, the Casbah was designated as a UNESCO World Heritage site due to its exceptional cultural value. Historically, it was also a fortress of resistance and bravery during the Algerian National Liberation War, where brave heroes like Ali La Pointe and Hassiba Ben Bouali fought for independence.

Today, thousands of tourists and historians visit the Casbah each year to admire its unique Moorish craftsmanship, traditional fountains, and bustling artisan workshops. Preserving this priceless national treasure is a duty for all Algerians so that future generations can cherish their glorious heritage.`,
        passageSource: "Adapted from Algerian Cultural Heritage Archives",
        points: 7,
        questions: [
          {
            id: "q1-1",
            sectionId: "sec-reading",
            type: "multiple_choice",
            instruction: "Activity 1: Choose the correct answer (a, b, or c).",
            question: "1. The text is mainly about:\n   a) A modern Algerian hotel\n   b) A historic Algerian landmark\n   c) A famous scientist",
            points: 1,
            answer: "b) A historic Algerian landmark",
            difficulty: "Easy"
          },
          {
            id: "q1-2",
            sectionId: "sec-reading",
            type: "true_false_justify",
            instruction: 'Activity 2: Write "True" or "False" and correct the false statement.',
            question: "a) The Casbah was built in the 20th century.\nb) The Casbah is recognized as a UNESCO World Heritage site.",
            points: 2,
            answer: "a) False - It was built during the 10th century.\nb) True - In 1992, it was designated as a UNESCO World Heritage site.",
            difficulty: "Medium"
          },
          {
            id: "q1-3",
            sectionId: "sec-reading",
            type: "wh_questions",
            instruction: "Activity 3: Answer the following questions according to the text.",
            question: "1. Why was the Casbah designated as a UNESCO World Heritage site?\n2. Which historical martyrs fought in the Casbah during the Liberation War?",
            points: 2,
            answer: "1. It was designated as a UNESCO World Heritage site due to its exceptional cultural value.\n2. Brave heroes like Ali La Pointe and Hassiba Ben Bouali fought in the Casbah.",
            difficulty: "Medium"
          },
          {
            id: "q1-4",
            sectionId: "sec-reading",
            type: "find_synonyms_antonyms",
            instruction: "Activity 4: (Lexis) Find in the text words that are closest in meaning to:",
            question: "a) well-known (\xA71) = ...............\nb) courage (\xA72) = ...............\nAnd find words opposite in meaning to:\nc) modern (\xA71) \u2260 ...............\nd) destroy (\xA73) \u2260 ...............",
            points: 2,
            answer: "a) famous / renowned\nb) bravery\nc) ancient / old\nd) preserving",
            difficulty: "Medium"
          }
        ]
      },
      {
        id: "sec-language",
        title: "B/ MASTERY OF LANGUAGE",
        instruction: "Complete the following grammar, morphology, and phonetic tasks.",
        type: "language",
        points: 7,
        questions: [
          {
            id: "q2-1",
            sectionId: "sec-language",
            type: "put_verbs_in_brackets",
            instruction: "Activity 1: Put the verbs in brackets into the correct tense (Past Simple or Passive Voice).",
            question: "a) In 1992, the Casbah (to classify) .................... as a world heritage site.\nb) Many famous palaces (to design) .................... by Ottoman architects.\nc) Last year, my family (to visit) .................... Maqam Echahid.",
            points: 3,
            answer: "a) was classified\nb) were designed\nc) visited",
            difficulty: "Medium"
          },
          {
            id: "q2-2",
            sectionId: "sec-language",
            type: "transform_sentences",
            instruction: "Activity 2: Rewrite the sentences using comparatives of equality or superiority as indicated.",
            question: "1. Big Ben is 96 meters high. The Elizabeth Tower is 96 meters high. (as ... as)\n   \u2192 Big Ben is ....................................................\n2. Maqam Echahid is 92m. Santa Cruz is older. (more ... than / older than)\n   \u2192 Santa Cruz is ....................................................",
            points: 2,
            answer: "1. Big Ben is as high as the Elizabeth Tower.\n2. Santa Cruz is older than Maqam Echahid.",
            difficulty: "Medium"
          },
          {
            id: "q2-3",
            sectionId: "sec-language",
            type: "word_formation",
            instruction: "Activity 3: (Phonetics) Classify the following words according to their diphthong sound: /e\u026A/ (day) or /a\u026A/ (like).",
            question: "Words: famous, site, ancient, white\n/e\u026A/: [ .................... , .................... ]\n/a\u026A/: [ .................... , .................... ]",
            points: 2,
            answer: "/e\u026A/: famous, ancient\n/a\u026A/: site, white",
            difficulty: "Easy"
          }
        ]
      }
    ],
    writingTask: {
      title: "PART TWO: SITUATION OF INTEGRATION (Written Expression)",
      prompt: "Your British penfriend wants to learn about Algerian historical figures and landmarks. Write a short biographical fact-file article (8-10 lines) about the famous Algerian playwright and novelist Kateb Yacine.",
      context: "Use the provided information card to write a coherent biography in past tense.",
      cues: [
        "Full name: Kateb Yacine",
        "Date & Place of birth: August 6, 1929 in Constantine, Algeria",
        "Occupation: Novelist, playwright, journalist and poet",
        'Major Masterpiece: "Nedjma" (published in 1956)',
        "Honors: Algerian Grand Prix des Lettres (1987)",
        "Date of death: October 28, 1989 in Grenoble, France"
      ],
      wordCountTarget: "60-80 words",
      points: 6,
      rubric: [
        { criterion: "Relevance to topic (Biographical data included)", points: 2, description: "All cues used appropriately" },
        { criterion: "Coherence & Organization (Chronological connectors)", points: 1.5, description: "Clear paragraphs and transitions" },
        { criterion: "Linguistic correctness (Past simple, passive, spelling)", points: 1.5, description: "Accurate grammar and punctuation" },
        { criterion: "Layout and Presentation", points: 1, description: "Clean handwriting and indentation" }
      ]
    },
    qualityCheck: {
      score: 98,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: [
        "Curriculum Alignment: 100% compliant with Algerian 4AM official BEM syllabus (Sequence 1).",
        "Point Total: Exactly 20 points (Reading: 7pts, Language: 7pts, Situation of Integration: 6pts).",
        "Linguistic appropriateness: High quality, objective answer key with clear rubrics."
      ],
      strengths: [
        "Standard BEM 3-part layout (Reading, Mastery of Language, Situation of Integration)",
        "Cultural authenticity centered on Algerian heritage",
        "Precise phonetics and morphological activities"
      ],
      suggestions: ["Everything is balanced and ready for printing or export."]
    },
    versionNumber: 1,
    versionsHistory: [
      {
        versionNumber: 1,
        timestamp: "2026-08-30T10:00:00Z",
        note: "Official BEM Mock exam created by teacher",
        sections: [],
        writingTask: {},
        headerConfig: {}
      }
    ],
    tags: ["4AM", "BEM", "Sequence 1", "Casbah", "Landmarks", "Passive Voice"],
    createdAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:30:00Z"
  },
  {
    id: "exam-3am-inv-2",
    title: "3AM First Term Test - Inventions & Scientists (Belgacem Haba)",
    schoolYear: "3AM",
    sequence: "Sequence 3",
    unitTitle: "Me and My Inventions / Scientific World",
    theme: "Famous Algerian Scientists & Microelectronics",
    examType: "Test",
    durationMinutes: 60,
    totalPoints: 20,
    difficulty: "Medium",
    targetCEFR: "A2",
    status: "Completed",
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: "MINISTRY OF NATIONAL EDUCATION",
      schoolName: "Emir Abdelkader Middle School",
      wilaya: "Algiers",
      teacherName: "M. Benali",
      classGrade: "Level: 3AM",
      academicYear: "2026\u20132027",
      examTitle: "First Term English Test",
      durationMinutes: 60,
      totalPoints: 20,
      datePlaceholder: "November 2026",
      studentNamePlaceholder: "Name: .....................................................  Class: 3AM ..."
    },
    instructions: "Answer all questions on the exam sheet.",
    sections: [
      {
        id: "sec-reading-3am",
        title: "PART ONE: READING COMPREHENSION (07 pts)",
        instruction: "Read the text and do the activities.",
        type: "reading",
        passageTitle: "Belgacem Haba: The Pride of Algerian Science",
        passage: `Professor Belgacem Haba is one of the top inventors in the world. He was born in 1957 in El-Oued, Algeria. After completing his primary and secondary schooling in his hometown, he studied physics at the University of Science and Technology Houari Boumediene (USTHB) in Algiers. Later, he traveled to the United States and obtained two master's degrees and a PhD in solar energy.

Dr. Haba is widely known for his remarkable contributions to microelectronics and computer miniaturization. He has registered more than 1,500 patents worldwide in smartphones, video game consoles, and computer memory chips. Because of his hard work and passion, he was honored with numerous international awards.

Today, Professor Haba actively encourages young Algerian students to study science, technology, and mathematics. He is a shining role model for future innovators.`,
        passageSource: "Adapted from Young Inventors Digest",
        points: 7,
        questions: [
          {
            id: "q3-1",
            sectionId: "sec-reading-3am",
            type: "complete_table",
            instruction: "Activity 1: Complete the bibliographical fact-file about Belgacem Haba.",
            question: "- Full Name: ................................\n- Year of birth: ................................\n- Place of birth: ................................\n- Field of study: ................................\n- Number of patents: ................................",
            points: 2.5,
            answer: "- Full Name: Professor Belgacem Haba\n- Year of birth: 1957\n- Place of birth: El-Oued, Algeria\n- Field of study: Physics / Solar energy / Microelectronics\n- Number of patents: More than 1,500 patents",
            difficulty: "Easy"
          },
          {
            id: "q3-2",
            sectionId: "sec-reading-3am",
            type: "wh_questions",
            instruction: "Activity 2: Answer the questions according to the text.",
            question: "1. Where did Belgacem Haba study physics before traveling to the USA?\n2. What does Dr. Haba encourage young students to do?",
            points: 2.5,
            answer: "1. He studied physics at the University of Science and Technology Houari Boumediene (USTHB) in Algiers.\n2. He encourages young students to study science, technology, and mathematics.",
            difficulty: "Medium"
          },
          {
            id: "q3-3",
            sectionId: "sec-reading-3am",
            type: "find_synonyms_antonyms",
            instruction: "Activity 3: (Lexis) Match words with their synonyms from the text.",
            question: "a) famous (\xA72) = ...............\nb) received / got (\xA71) = ...............\nc) prize (\xA72) = ...............\nd) old (\xA73) \u2260 ...............",
            points: 2,
            answer: "a) famous = known / top\nb) obtained\nc) award\nd) young",
            difficulty: "Easy"
          }
        ]
      },
      {
        id: "sec-lang-3am",
        title: "MASTERY OF LANGUAGE (07 pts)",
        instruction: "Complete the linguistic activities.",
        type: "language",
        points: 7,
        questions: [
          {
            id: "q3-4",
            sectionId: "sec-lang-3am",
            type: "transform_sentences",
            instruction: "Activity 1: Turn the following sentences into the Passive Voice.",
            question: "a) Belgacem Haba invented many microchips.\n   \u2192 Many microchips ....................................................\nb) Scientists design powerful smartphones.\n   \u2192 Powerful smartphones ....................................................",
            points: 3,
            answer: "a) Many microchips were invented by Belgacem Haba.\nb) Powerful smartphones are designed by scientists.",
            difficulty: "Medium"
          },
          {
            id: "q3-5",
            sectionId: "sec-lang-3am",
            type: "fill_blanks",
            instruction: 'Activity 2: Fill in the gaps with the relative pronouns: "who" or "which".',
            question: "1. Alexander Graham Bell was the scientist ........... invented the telephone.\n2. The smartphone is a modern device ........... connects people around the globe.",
            points: 2,
            answer: "1. who\n2. which",
            difficulty: "Easy"
          },
          {
            id: "q3-6",
            sectionId: "sec-lang-3am",
            type: "word_formation",
            instruction: 'Activity 3: (Pronunciation) Classify words according to the pronunciation of final "-ed": /t/, /d/, or /\u026Ad/.',
            question: "Words: completed, traveled, worked, obtained\n/t/: [ .................... ]\n/d/: [ .................... , .................... ]\n/\u026Ad/: [ .................... ]",
            points: 2,
            answer: "/t/: worked\n/d/: traveled, obtained\n/\u026Ad/: completed",
            difficulty: "Medium"
          }
        ]
      }
    ],
    writingTask: {
      title: "PART TWO: WRITTEN EXPRESSION (06 pts)",
      prompt: "Write a short biography (6-8 lines) about the famous inventor of the telephone, Alexander Graham Bell, using the provided cues.",
      cues: [
        "Name: Alexander Graham Bell",
        "Born: March 3, 1847 in Edinburgh, Scotland",
        "Invention: The first practical telephone (1876)",
        "Education: University of Edinburgh and London",
        "Died: August 2, 1922 in Canada"
      ],
      wordCountTarget: "50-70 words",
      points: 6,
      rubric: [
        { criterion: "Content & Information usage", points: 2 },
        { criterion: "Grammar (Past tense & Chronology)", points: 2 },
        { criterion: "Vocabulary & Punctuation", points: 2 }
      ]
    },
    qualityCheck: {
      score: 96,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: ["Accurate point balance: 7 + 7 + 6 = 20 pts.", "3AM curriculum topics properly integrated."],
      strengths: ["Inspiring Algerian scientist focus", "Standard 3AM grammar items"],
      suggestions: []
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ["3AM", "Sequence 3", "Inventions", "Belgacem Haba", "Passive Voice"],
    createdAt: "2026-08-28T09:15:00Z",
    updatedAt: "2026-08-28T09:45:00Z"
  },
  {
    id: "exam-1am-daily-3",
    title: "1AM Diagnostic & Revision Assessment - Daily Routines & School",
    schoolYear: "1AM",
    sequence: "Sequence 3",
    unitTitle: "Me and My Daily Activities",
    theme: "Daily Routines, Time & Hobbies",
    examType: "Quiz",
    durationMinutes: 45,
    totalPoints: 20,
    difficulty: "Easy",
    targetCEFR: "Pre-A1",
    status: "Final",
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: "MINISTRY OF NATIONAL EDUCATION",
      schoolName: "Emir Abdelkader Middle School",
      wilaya: "Algiers",
      teacherName: "M. Benali",
      classGrade: "Level: 1AM",
      academicYear: "2026\u20132027",
      examTitle: "First Term English Class Test",
      durationMinutes: 45,
      totalPoints: 20,
      datePlaceholder: "December 2026",
      studentNamePlaceholder: "First Name & Surname: .......................................  Class: 1AM ..."
    },
    instructions: "Read Amine's text and complete the tasks.",
    sections: [
      {
        id: "sec-reading-1am",
        title: "PART ONE: A/ READING COMPREHENSION (07 pts)",
        instruction: "Read the short text and answer.",
        type: "reading",
        passageTitle: "Amine's Daily Routine",
        passage: `Hello! My name is Amine. I am 11 years old. I am a first-year pupil at Ibn Khaldoun Middle School. Every morning, I wake up at 06:30. I wash my face, brush my teeth, and have my breakfast. At 07:30, I go to school by bus. My classes start at 08:00 and finish at 16:00. In the afternoon, I do my homework and play football with my brother Yacine. I go to bed at 21:00.`,
        points: 7,
        questions: [
          {
            id: "q1-1am",
            sectionId: "sec-reading-1am",
            type: "true_false",
            instruction: 'Activity 1: Write "True" or "False".',
            question: "1. Amine is 12 years old. (.......)\n2. He goes to school by bus. (.......)\n3. He plays football with his brother. (.......)",
            points: 3,
            answer: "1. False (He is 11)\n2. True\n3. True",
            difficulty: "Easy"
          },
          {
            id: "q1-2am",
            sectionId: "sec-reading-1am",
            type: "wh_questions",
            instruction: "Activity 2: Answer the questions according to the text.",
            question: "1. What time does Amine wake up?\n2. What does he do in the afternoon?",
            points: 2,
            answer: "1. He wakes up at 06:30.\n2. He does his homework and plays football with his brother.",
            difficulty: "Easy"
          },
          {
            id: "q1-3am",
            sectionId: "sec-reading-1am",
            type: "matching",
            instruction: "Activity 3: (Lexis) Match opposites.",
            question: "Column A: [1. start, 2. morning]\nColumn B: [a. evening, b. finish]",
            points: 2,
            answer: "1 \u2192 b (start \u2260 finish)\n2 \u2192 a (morning \u2260 evening)",
            difficulty: "Easy"
          }
        ]
      },
      {
        id: "sec-lang-1am",
        title: "B/ MASTERY OF LANGUAGE (07 pts)",
        instruction: "Grammar and phonetics activities.",
        type: "language",
        points: 7,
        questions: [
          {
            id: "q1-4am",
            sectionId: "sec-lang-1am",
            type: "put_verbs_in_brackets",
            instruction: "Activity 1: Put the verbs in brackets in the Present Simple tense.",
            question: "a) My sister (to live) .................... in Oran.\nb) Pupils (to like) .................... English lessons.\nc) I (to play) .................... chess on Friday.",
            points: 3,
            answer: "a) lives\nb) like\nc) play",
            difficulty: "Easy"
          },
          {
            id: "q1-5am",
            sectionId: "sec-lang-1am",
            type: "fill_blanks",
            instruction: 'Activity 2: Complete with: "in", "on", or "at".',
            question: "1. I wake up ...... 07:00.\n2. We do not go to school ...... Friday.\n3. I watch TV ...... the evening.",
            points: 2,
            answer: "1. at\n2. on\n3. in",
            difficulty: "Easy"
          },
          {
            id: "q1-6am",
            sectionId: "sec-lang-1am",
            type: "word_formation",
            instruction: 'Activity 3: (Pronunciation) Classify verbs according to the final "-s" sound: /s/, /z/, or /\u026Az/.',
            question: "Verbs: speaks, washes, reads\n/s/: [ .......... ]  |  /z/: [ .......... ]  |  /\u026Az/: [ .......... ]",
            points: 2,
            answer: "/s/: speaks\n/z/: reads\n/\u026Az/: washes",
            difficulty: "Easy"
          }
        ]
      }
    ],
    writingTask: {
      title: "PART TWO: SITUATION OF INTEGRATION (06 pts)",
      prompt: "Write a short paragraph (4-6 sentences) describing your own daily routine to your English teacher.",
      cues: [
        "Time you wake up (e.g. at 07:00)",
        "What you eat for breakfast",
        "How you go to school (on foot / by car)",
        "Your favorite leisure activity after school"
      ],
      wordCountTarget: "30-40 words",
      points: 6,
      rubric: [
        { criterion: "Use of Present Simple & Time markers", points: 3 },
        { criterion: "Vocabulary & Punctuation", points: 2 },
        { criterion: "Neatness & Capitalization", points: 1 }
      ]
    },
    qualityCheck: {
      score: 99,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: ["Perfect 1AM age-appropriate vocabulary and score balance (20/20)."],
      strengths: ["Simple and accessible for first-year pupils"],
      suggestions: []
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ["1AM", "Sequence 3", "Daily Routines", "Present Simple", "Phonetics"],
    createdAt: "2026-08-25T11:00:00Z",
    updatedAt: "2026-08-25T11:20:00Z"
  }
];
var INITIAL_TEMPLATES = [
  {
    id: "tmpl-bem-standard",
    name: "Official BEM Standard Exam (7 + 7 + 6 = 20 pts)",
    schoolYear: "4AM",
    examType: "BEM-style practice",
    description: "Official Algerian BEM exam architecture: 7 pts Reading comprehension, 7 pts Mastery of Language, 6 pts Situation of Integration with full grading rubric.",
    totalPoints: 20,
    durationMinutes: 90,
    structure: {
      includeReading: true,
      readingPoints: 7,
      readingQuestionTypes: ["true_false_justify", "multiple_choice", "wh_questions", "find_synonyms_antonyms"],
      includeLanguage: true,
      languagePoints: 7,
      languageQuestionTypes: ["put_verbs_in_brackets", "transform_sentences", "word_formation"],
      includeVocabulary: false,
      vocabularyPoints: 0,
      vocabularyQuestionTypes: [],
      includeWriting: true,
      writingPoints: 6,
      writingType: "biography"
    },
    createdAt: "2026-08-01T00:00:00Z"
  },
  {
    id: "tmpl-middle-test",
    name: "Standard Middle School Term Exam (8 + 7 + 5 = 20 pts)",
    schoolYear: "3AM",
    examType: "Exam",
    description: "Balanced 3-part layout designed for 1AM, 2AM, and 3AM semester exams with strong reading passage extraction.",
    totalPoints: 20,
    durationMinutes: 60,
    structure: {
      includeReading: true,
      readingPoints: 8,
      readingQuestionTypes: ["true_false", "wh_questions", "complete_table", "find_synonyms_antonyms"],
      includeLanguage: true,
      languagePoints: 7,
      languageQuestionTypes: ["fill_blanks", "put_verbs_in_brackets", "choose_correct"],
      includeVocabulary: false,
      vocabularyPoints: 0,
      vocabularyQuestionTypes: [],
      includeWriting: true,
      writingPoints: 5,
      writingType: "paragraph_writing"
    },
    createdAt: "2026-08-01T00:00:00Z"
  },
  {
    id: "tmpl-quick-quiz",
    name: "Quick Diagnostic Quiz (30-45 min / 20 pts)",
    schoolYear: "2AM",
    examType: "Quiz",
    description: "Fast assessment focused on sequence target grammar, vocabulary drills, and short guided sentence writing.",
    totalPoints: 20,
    durationMinutes: 45,
    structure: {
      includeReading: true,
      readingPoints: 6,
      readingQuestionTypes: ["true_false", "multiple_choice", "matching"],
      includeLanguage: true,
      languagePoints: 8,
      languageQuestionTypes: ["fill_blanks", "put_verbs_in_brackets", "transform_sentences"],
      includeVocabulary: true,
      vocabularyPoints: 2,
      vocabularyQuestionTypes: ["odd_one_out"],
      includeWriting: true,
      writingPoints: 4,
      writingType: "guided_writing"
    },
    createdAt: "2026-08-01T00:00:00Z"
  }
];
var INITIAL_QUESTION_BANK = [
  {
    id: "qb-1",
    question: 'Classify the following words according to the pronunciation of final "-s": /s/, /z/, /\u026Az/\nWords: books, watches, cleans, eats, plays, boxes',
    instruction: "Complete the phonetic table.",
    type: "word_formation",
    schoolYear: "1AM",
    unit: "Sequence 3",
    theme: "Daily Activities & Routines",
    grammar: "Present Simple 3rd person singular",
    skill: "Phonetics",
    difficulty: "Easy",
    answer: "/s/: books, eats\n/z/: cleans, plays\n/\u026Az/: watches, boxes",
    points: 3,
    tags: ["Phonetics", "Final -s", "1AM"],
    createdAt: "2026-08-10T00:00:00Z"
  },
  {
    id: "qb-2",
    question: "Put the verbs in brackets in the Past Simple tense:\nLast summer, Nassim (to travel) ............... to Bejaia. He (to visit) ............... Gouraya National Park and (to swim) ............... in the clear sea.",
    instruction: "Conjugate the verbs in brackets.",
    type: "put_verbs_in_brackets",
    schoolYear: "2AM",
    unit: "Sequence 3",
    theme: "Travels & Holidays",
    grammar: "Past Simple (Regular & Irregular)",
    skill: "Grammar",
    difficulty: "Medium",
    answer: "traveled / visited / swam",
    points: 3,
    tags: ["Past Simple", "Travel", "2AM"],
    createdAt: "2026-08-12T00:00:00Z"
  },
  {
    id: "qb-3",
    question: "Rewrite the sentences into the Passive Voice:\n1. Alexander Graham Bell invented the telephone in 1876.\n   \u2192 The telephone ....................................................\n2. Ottoman architects constructed Ketchaoua Mosque in Algiers.\n   \u2192 Ketchaoua Mosque ....................................................",
    instruction: "Turn sentences into passive voice.",
    type: "transform_sentences",
    schoolYear: "4AM",
    unit: "Sequence 1",
    theme: "Landmarks & Outstanding Figures",
    grammar: "Passive Voice (Past Simple)",
    skill: "Grammar",
    difficulty: "Medium",
    answer: "1. The telephone was invented by Alexander Graham Bell in 1876.\n2. Ketchaoua Mosque was constructed by Ottoman architects in Algiers.",
    points: 2,
    tags: ["Passive Voice", "BEM", "4AM"],
    createdAt: "2026-08-15T00:00:00Z"
  },
  {
    id: "qb-4",
    question: `Fill in the blanks with: "should" or "shouldn't":
1. You have got a toothache; you ........... visit the dentist.
2. You ........... drink too much soda and eat sweet candy.`,
    instruction: "Give health advice.",
    type: "fill_blanks",
    schoolYear: "2AM",
    unit: "Sequence 2",
    theme: "Health & Nutrition",
    grammar: "Modals for advice (should / shouldn't)",
    skill: "Language functions",
    difficulty: "Easy",
    answer: "1. should\n2. shouldn't",
    points: 2,
    tags: ["Health", "Modals", "2AM"],
    createdAt: "2026-08-18T00:00:00Z"
  },
  {
    id: "qb-5",
    question: "Add the appropriate prefix (un-, im-, dis-, in-) to form the opposite of:\n1. patient \u2192 ...............\n2. friendly \u2192 ...............\n3. agree \u2192 ...............\n4. correct \u2192 ...............",
    instruction: "Form opposite adjectives with prefixes.",
    type: "word_formation",
    schoolYear: "3AM",
    unit: "Sequence 1",
    theme: "Personality & Traits",
    grammar: "Prefixes for opposites",
    skill: "Morphology",
    difficulty: "Medium",
    answer: "1. impatient\n2. unfriendly\n3. disagree\n4. incorrect",
    points: 2,
    tags: ["Morphology", "Prefixes", "3AM"],
    createdAt: "2026-08-20T00:00:00Z"
  },
  {
    id: "qb-6",
    question: "Match each historical monument with its location:\n1. Santa Cruz Fortress       a. Tipaza\n2. Roman Amphitheater       b. Oran\n3. Maqam Echahid             c. Algiers",
    instruction: "Match monuments with cities.",
    type: "matching",
    schoolYear: "1AM",
    unit: "Sequence 5",
    theme: "Me, My Country and the World",
    grammar: "Prepositions of place",
    skill: "Cultural Knowledge",
    difficulty: "Easy",
    answer: "1 \u2192 b (Santa Cruz in Oran)\n2 \u2192 a (Tipaza)\n3 \u2192 c (Maqam Echahid in Algiers)",
    points: 1.5,
    tags: ["Culture", "Algeria", "1AM"],
    createdAt: "2026-08-22T00:00:00Z"
  }
];

// server/geminiService.ts
var import_genai = require("@google/genai");
var getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
async function generateExamWithGemini(config) {
  const ai = getAiClient();
  const curSeq = ALGERIAN_CURRICULUM.find((s) => s.id === config.sequenceId) || ALGERIAN_CURRICULUM.find((s) => s.schoolYear === config.schoolYear) || ALGERIAN_CURRICULUM[0];
  const systemInstruction = `You are an expert English language assessment designer and senior inspector specializing in Algerian middle school education (Enseignement Moyen Alg\xE9rien - 1AM, 2AM, 3AM, 4AM / BEM).
You design official, pedagogical, age-appropriate, culturally authentic English examinations aligned with the Algerian Ministry of National Education curriculum.

CRITICAL ASSESSMENT RULES:
1. SCHOOL YEAR SPECIFICITY:
   - 1AM (First Year): Very basic English (Pre-A1/A1), simple present tense, basic vocabulary (family, daily routines, school, greeting), clear short sentences, friendly and accessible reading text (60-90 words).
   - 2AM (Second Year): Elementary English (A1/A2), shopping, health/doctor advice (should/shouldn't), travels (past simple regular/irregular), environment (must/mustn't), reading text (90-130 words).
   - 3AM (Third Year): Intermediate English (A2), personality profiles, natural disasters (when/while, past continuous), inventions & scientists (passive voice), world heritage (comparatives/superlatives), reading text (120-170 words).
   - 4AM (Fourth Year - BEM Level): Rigorous BEM Exam standard (A2/B1). Official 3-part layout: Reading Comprehension (7 pts), Mastery of Language (7 pts: grammar, morphology, phonetics / diphthongs / final -ed / silent letters), Situation of Integration / Written Expression (6 pts: detailed prompt with cues, context, and 4-criterion grading rubric). Reading text (150-220 words).
2. CULTURAL & ETHICAL RELEVANCE:
   - Use authentic, respectful Algerian and universal educational contexts (Algerian cities like Algiers, Oran, Constantine, Ghardaia; Algerian landmarks; figures like Kateb Yacine, Emir Abdelkader, Dr. Belgacem Haba; positive youth role models; scientific discoveries; environment protection).
   - Never generate politically controversial, violent, or culturally insensitive content.
3. SCORING PRECISION:
   - Total points across all sections and the writing task MUST sum up EXACTLY to ${config.totalPoints} points.
   - Every single question must have an explicit point value and an unambiguous, objectively correct answer in the answer key.
4. VALID JSON ONLY: Return strictly valid JSON adhering to the specified schema.`;
  const prompt = `Create a complete, professional English examination with the following specifications:
- School Year: ${config.schoolYear}
- Sequence: ${curSeq.sequenceTitle}
- Unit Theme: ${config.theme || curSeq.theme}
- Selected Lessons / Topics: ${config.lessons && config.lessons.length > 0 ? config.lessons.join(", ") : curSeq.lessons.join(", ")}
- Target Grammar Points: ${config.grammar && config.grammar.length > 0 ? config.grammar.join(", ") : curSeq.grammarPoints.join(", ")}
- Target Vocabulary: ${config.vocabulary && config.vocabulary.length > 0 ? config.vocabulary.join(", ") : curSeq.vocabularyTopics.join(", ")}
- Skills: ${config.skills && config.skills.length > 0 ? config.skills.join(", ") : "Reading, Grammar, Morphology, Writing"}
- Exam Type: ${config.examType}
- Duration: ${config.durationMinutes} minutes
- Total Score: ${config.totalPoints} points
- Difficulty: ${config.difficulty}
- Target CEFR Level: ${config.targetCEFR || "A2"}
- Requested Reading Question Types: ${config.readingQuestionTypes.join(", ")} (Target points: ${config.readingPoints} pts)
- Requested Language Question Types: ${config.languageQuestionTypes.join(", ")} (Target points: ${config.languagePoints} pts)
- Requested Writing Type: ${config.writingType} (Target points: ${config.writingPoints} pts)
- Teacher's Custom Instructions: "${config.customInstructions || "Generate a standard high-quality Algerian middle school test"}"
- Cultural Context Notes: "${config.culturalContext || "Algerian middle school educational context"}"

Generate:
1. Descriptive Exam Title and header data.
2. An engaging, age-appropriate reading passage with a clear title and source.
3. Reading comprehension section activities matching the requested types.
4. Mastery of Language section activities (Grammar tense conjugation, sentence transformations, lexis synonyms/antonyms, and phonetics/pronunciation classification).
5. Part Two: Situation of Integration (Written Expression) with prompt, context, 4-6 bulleted cues/guidelines, target word count, and a structured 4-criterion grading rubric.
6. Clear, unambiguous answers for each question.
Ensure total points = ${config.totalPoints}.`;
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.4,
      responseMimeType: "application/json",
      responseSchema: {
        type: import_genai.Type.OBJECT,
        properties: {
          title: { type: import_genai.Type.STRING, description: "Exam Title (e.g., First Term English Exam)" },
          schoolYear: { type: import_genai.Type.STRING },
          sequence: { type: import_genai.Type.STRING },
          unitTitle: { type: import_genai.Type.STRING },
          theme: { type: import_genai.Type.STRING },
          examType: { type: import_genai.Type.STRING },
          durationMinutes: { type: import_genai.Type.INTEGER },
          totalPoints: { type: import_genai.Type.NUMBER },
          difficulty: { type: import_genai.Type.STRING },
          targetCEFR: { type: import_genai.Type.STRING },
          instructions: { type: import_genai.Type.STRING },
          headerConfig: {
            type: import_genai.Type.OBJECT,
            properties: {
              republicTitle: { type: import_genai.Type.STRING },
              ministryTitle: { type: import_genai.Type.STRING },
              schoolName: { type: import_genai.Type.STRING },
              wilaya: { type: import_genai.Type.STRING },
              teacherName: { type: import_genai.Type.STRING },
              classGrade: { type: import_genai.Type.STRING },
              academicYear: { type: import_genai.Type.STRING },
              examTitle: { type: import_genai.Type.STRING },
              durationMinutes: { type: import_genai.Type.INTEGER },
              totalPoints: { type: import_genai.Type.NUMBER },
              datePlaceholder: { type: import_genai.Type.STRING },
              studentNamePlaceholder: { type: import_genai.Type.STRING }
            },
            required: ["republicTitle", "ministryTitle", "schoolName", "classGrade", "academicYear", "examTitle", "durationMinutes", "totalPoints", "studentNamePlaceholder"]
          },
          sections: {
            type: import_genai.Type.ARRAY,
            items: {
              type: import_genai.Type.OBJECT,
              properties: {
                id: { type: import_genai.Type.STRING },
                title: { type: import_genai.Type.STRING },
                instruction: { type: import_genai.Type.STRING },
                type: { type: import_genai.Type.STRING },
                passageTitle: { type: import_genai.Type.STRING },
                passage: { type: import_genai.Type.STRING },
                passageSource: { type: import_genai.Type.STRING },
                points: { type: import_genai.Type.NUMBER },
                questions: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      id: { type: import_genai.Type.STRING },
                      sectionId: { type: import_genai.Type.STRING },
                      type: { type: import_genai.Type.STRING },
                      instruction: { type: import_genai.Type.STRING },
                      question: { type: import_genai.Type.STRING },
                      options: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                      points: { type: import_genai.Type.NUMBER },
                      answer: { type: import_genai.Type.STRING },
                      alternativeAnswers: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                      explanation: { type: import_genai.Type.STRING },
                      difficulty: { type: import_genai.Type.STRING }
                    },
                    required: ["id", "type", "instruction", "question", "points", "answer"]
                  }
                }
              },
              required: ["id", "title", "instruction", "type", "points", "questions"]
            }
          },
          writingTask: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              prompt: { type: import_genai.Type.STRING },
              context: { type: import_genai.Type.STRING },
              cues: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
              wordCountTarget: { type: import_genai.Type.STRING },
              points: { type: import_genai.Type.NUMBER },
              rubric: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    criterion: { type: import_genai.Type.STRING },
                    points: { type: import_genai.Type.NUMBER },
                    description: { type: import_genai.Type.STRING }
                  },
                  required: ["criterion", "points"]
                }
              }
            },
            required: ["title", "prompt", "cues", "points", "rubric"]
          },
          qualityScore: {
            type: import_genai.Type.OBJECT,
            properties: {
              score: { type: import_genai.Type.NUMBER },
              curriculumAlignment: { type: import_genai.Type.BOOLEAN },
              scoreMatch: { type: import_genai.Type.BOOLEAN },
              feedback: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
              strengths: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
              suggestions: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
            },
            required: ["score", "curriculumAlignment", "scoreMatch", "feedback", "strengths", "suggestions"]
          }
        },
        required: ["title", "schoolYear", "sequence", "theme", "examType", "durationMinutes", "totalPoints", "instructions", "headerConfig", "sections", "writingTask", "qualityScore"]
      }
    }
  });
  const rawText = response.text || "{}";
  const parsed = JSON.parse(rawText);
  const examId = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const formattedExam = {
    id: examId,
    title: parsed.title || `${config.schoolYear} English Examination`,
    schoolYear: config.schoolYear,
    sequence: parsed.sequence || curSeq.sequenceTitle,
    unitTitle: parsed.unitTitle || curSeq.theme,
    theme: parsed.theme || config.theme || curSeq.theme,
    examType: config.examType,
    durationMinutes: config.durationMinutes,
    totalPoints: config.totalPoints,
    difficulty: config.difficulty,
    targetCEFR: config.targetCEFR || "A2",
    status: "Completed",
    instructions: parsed.instructions || "Read the text carefully and answer all questions.",
    headerConfig: {
      republicTitle: parsed.headerConfig?.republicTitle || "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: parsed.headerConfig?.ministryTitle || "MINISTRY OF NATIONAL EDUCATION",
      schoolName: parsed.headerConfig?.schoolName || "Middle School",
      wilaya: parsed.headerConfig?.wilaya || "Direction of Education",
      teacherName: parsed.headerConfig?.teacherName || "Teacher",
      classGrade: parsed.headerConfig?.classGrade || `Level: ${config.schoolYear}`,
      academicYear: parsed.headerConfig?.academicYear || "2026\u20132027",
      examTitle: parsed.headerConfig?.examTitle || parsed.title || "English Examination",
      durationMinutes: config.durationMinutes,
      totalPoints: config.totalPoints,
      datePlaceholder: parsed.headerConfig?.datePlaceholder || "Academic Year 2026\u20132027",
      studentNamePlaceholder: parsed.headerConfig?.studentNamePlaceholder || `Full Name: .....................................................   Class: ${config.schoolYear} ...`
    },
    sections: parsed.sections.map((sec, sIdx) => ({
      id: sec.id || `sec-${sIdx + 1}`,
      title: sec.title || `Section ${sIdx + 1}`,
      instruction: sec.instruction || "",
      type: sec.type || (sIdx === 0 ? "reading" : "language"),
      passageTitle: sec.passageTitle,
      passage: sec.passage,
      passageSource: sec.passageSource,
      points: Number(sec.points) || 7,
      questions: (sec.questions || []).map((q, qIdx) => ({
        id: q.id || `q-${sIdx + 1}-${qIdx + 1}`,
        sectionId: sec.id || `sec-${sIdx + 1}`,
        type: q.type || "wh_questions",
        instruction: q.instruction || "",
        question: q.question || "",
        options: q.options || [],
        points: Number(q.points) || 1,
        answer: q.answer || "",
        alternativeAnswers: q.alternativeAnswers || [],
        explanation: q.explanation || "",
        difficulty: q.difficulty || config.difficulty
      }))
    })),
    writingTask: {
      title: parsed.writingTask?.title || "PART TWO: SITUATION OF INTEGRATION (Written Expression)",
      prompt: parsed.writingTask?.prompt || "Write a short paragraph about the topic.",
      context: parsed.writingTask?.context || "",
      cues: parsed.writingTask?.cues || ["Use proper capitalization and punctuation", "Organize ideas chronologically"],
      wordCountTarget: parsed.writingTask?.wordCountTarget || "50-70 words",
      points: Number(parsed.writingTask?.points) || config.writingPoints || 6,
      rubric: parsed.writingTask?.rubric || [
        { criterion: "Relevance to topic", points: 2 },
        { criterion: "Syntactic and morphological accuracy", points: 2 },
        { criterion: "Coherence and organization", points: 2 }
      ]
    },
    qualityCheck: parsed.qualityScore || {
      score: 95,
      curriculumAlignment: true,
      scoreMatch: true,
      feedback: ["Exam meets Algerian Middle School guidelines."],
      strengths: ["Clear question wording", "Aligned with sequence objectives"],
      suggestions: []
    },
    versionNumber: 1,
    versionsHistory: [
      {
        versionNumber: 1,
        timestamp: now,
        note: "AI Generated initial version",
        sections: [],
        writingTask: {},
        headerConfig: {}
      }
    ],
    tags: [config.schoolYear, config.examType, config.theme || "English"],
    createdAt: now,
    updatedAt: now
  };
  return formattedExam;
}
async function validateExamWithAI(exam) {
  const ai = getAiClient();
  const prompt = `You are a Senior Inspector of English for the Algerian Ministry of National Education.
Evaluate the following middle school English exam:
Year: ${exam.schoolYear}
Sequence: ${exam.sequence}
Theme: ${exam.theme}
Total Target Points: ${exam.totalPoints}

EXAM CONTENT:
${JSON.stringify({
    instructions: exam.instructions,
    sections: exam.sections,
    writingTask: exam.writingTask
  }, null, 2)}

Provide an honest, expert assessment checking:
1. Alignment with ${exam.schoolYear} Algerian curriculum standards.
2. Grammatical correctness of questions, instructions, and passage.
3. Scoring math (do all section question points + writing points equal exactly ${exam.totalPoints}?).
4. Answer precision and objectivity.
5. Overall quality score (0 to 100).
6. 2-3 specific strengths and 1-2 actionable suggestions.`;
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: import_genai.Type.OBJECT,
        properties: {
          score: { type: import_genai.Type.NUMBER },
          curriculumAlignment: { type: import_genai.Type.BOOLEAN },
          scoreMatch: { type: import_genai.Type.BOOLEAN },
          feedback: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
          strengths: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
          suggestions: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
        },
        required: ["score", "curriculumAlignment", "scoreMatch", "feedback", "strengths", "suggestions"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}
async function executeAiAssistant(action, payload) {
  const ai = getAiClient();
  let prompt = "";
  switch (action) {
    case "improve_grammar":
      prompt = `Improve the grammar, clarity, and pedagogical quality of this text/question for Algerian ${payload.schoolYear || "middle school"} English pupils:
"${payload.text}"`;
      break;
    case "simplify":
      prompt = `Simplify the vocabulary and sentence structure of this text/question so it is easier for Algerian ${payload.schoolYear || "1AM/2AM"} pupils:
"${payload.text}"`;
      break;
    case "make_difficult":
      prompt = `Make this question/text more challenging and intellectually stimulating for top Algerian ${payload.schoolYear || "4AM BEM"} pupils:
"${payload.text}"`;
      break;
    case "generate_alternatives":
      prompt = `Generate 3 high-quality alternative variations of this question/exercise testing the exact same linguistic objective for Algerian ${payload.schoolYear || "middle school"} pupils:
Original: "${payload.text}"
Context: ${payload.context || ""}`;
      break;
    case "similar_question":
      prompt = `Create another similar question of type "${payload.questionType || "grammar"}" for ${payload.schoolYear || "middle school"} on the same theme:
Base: "${payload.text}"`;
      break;
    case "regenerate_passage":
      prompt = `Write a fresh, brand new reading comprehension passage (120-180 words) for ${payload.schoolYear || "3AM"} Algerian pupils on the theme "${payload.text}". Include 3 paragraphs with rich, level-appropriate vocabulary.`;
      break;
    case "adapt_year":
      prompt = `Adapt and rewrite this question/task originally for ${payload.schoolYear || "4AM"} so that it fits the syllabus and vocabulary level of ${payload.targetYear || "2AM"} Algerian pupils:
"${payload.text}"`;
      break;
    default:
      prompt = `Rewrite and enhance the following pedagogical content for Algerian English teachers:
"${payload.text}"`;
  }
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      temperature: 0.5
    }
  });
  const textOutput = response.text || "";
  if (action === "generate_alternatives") {
    const lines = textOutput.split("\n").filter((l) => l.trim().length > 0);
    return {
      result: textOutput,
      alternatives: lines.slice(0, 3)
    };
  }
  return { result: textOutput };
}
async function generateQuestionBankItems(params) {
  const ai = getAiClient();
  const prompt = `Generate ${params.count || 10} high-quality, reusable English exam questions/exercises tailored for Algerian ${params.schoolYear} middle school pupils.
Unit/Sequence: ${params.unit}
Theme: ${params.theme}
Target Grammar: ${params.grammar || "General sequence grammar"}
Skill: ${params.skill}

Return valid JSON with an array of questions. Each question must include instruction, question text, type, answer, points, difficulty, and relevant tags.`;
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: import_genai.Type.ARRAY,
        items: {
          type: import_genai.Type.OBJECT,
          properties: {
            instruction: { type: import_genai.Type.STRING },
            question: { type: import_genai.Type.STRING },
            type: { type: import_genai.Type.STRING },
            difficulty: { type: import_genai.Type.STRING },
            answer: { type: import_genai.Type.STRING },
            points: { type: import_genai.Type.NUMBER },
            tags: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
          },
          required: ["instruction", "question", "type", "answer", "points", "tags"]
        }
      }
    }
  });
  const parsed = JSON.parse(response.text || "[]");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return parsed.map((item, idx) => ({
    id: `qb-gen-${Date.now()}-${idx}`,
    question: item.question,
    instruction: item.instruction,
    type: item.type,
    schoolYear: params.schoolYear,
    unit: params.unit,
    theme: params.theme,
    grammar: params.grammar,
    skill: params.skill,
    difficulty: item.difficulty || "Medium",
    answer: item.answer,
    points: Number(item.points) || 2,
    tags: item.tags || [params.schoolYear, params.theme],
    createdAt: now
  }));
}
async function generateAlternativeExamVersion(originalExam) {
  const ai = getAiClient();
  const prompt = `You are an expert Algerian English exam author.
Create an ALTERNATIVE PARALLEL VERSION (Version B) of this exam.
It must test the EXACT SAME grammatical objectives, curriculum unit, vocabulary level, question types, and point distribution, but with a FRESH, DIFFERENT reading passage and DIFFERENT question items so students cannot copy.

ORIGINAL EXAM:
Title: ${originalExam.title}
Year: ${originalExam.schoolYear}
Unit: ${originalExam.sequence} - ${originalExam.theme}
Points: ${originalExam.totalPoints} pts
Sections & Questions: ${JSON.stringify(originalExam.sections)}
Writing Task: ${JSON.stringify(originalExam.writingTask)}

Return a complete structured JSON matching the same schema with:
- A new reading text on the same topic/theme
- Parallel questions testing the same rules
- Fresh writing task cues
- Complete answer key
- Same total score: ${originalExam.totalPoints} pts`;
  const config = {
    schoolYear: originalExam.schoolYear,
    sequenceId: "auto",
    theme: originalExam.theme,
    lessons: [],
    grammar: [],
    vocabulary: [],
    skills: [],
    examType: originalExam.examType,
    durationMinutes: originalExam.durationMinutes,
    totalPoints: originalExam.totalPoints,
    difficulty: originalExam.difficulty,
    targetCEFR: originalExam.targetCEFR,
    readingPoints: 7,
    readingQuestionTypes: ["true_false", "wh_questions", "find_synonyms_antonyms"],
    languagePoints: 7,
    languageQuestionTypes: ["put_verbs_in_brackets", "transform_sentences", "word_formation"],
    vocabularyPoints: 0,
    vocabularyQuestionTypes: [],
    writingPoints: 6,
    writingType: "guided_writing",
    customInstructions: `Create an alternative Version B of: ${originalExam.title}. Different text and fresh questions on the same theme: ${originalExam.theme}`
  };
  const newExam = await generateExamWithGemini(config);
  newExam.title = `${originalExam.title} (Version B)`;
  newExam.tags = [...originalExam.tags, "Version B"];
  return newExam;
}
async function importAndParseExamWithAI(rawText) {
  const ai = getAiClient();
  const prompt = `Parse the following raw text or pasted English exam document and structure it into the standardized Algerian Middle School exam format.
Analyze the school year (1AM, 2AM, 3AM, or 4AM), extract the reading passage, all question activities with instructions and points, and the writing task.

RAW EXAM TEXT:
${rawText}

Return strictly formatted JSON according to the schema.`;
  const response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: import_genai.Type.OBJECT,
        properties: {
          title: { type: import_genai.Type.STRING },
          schoolYear: { type: import_genai.Type.STRING },
          sequence: { type: import_genai.Type.STRING },
          theme: { type: import_genai.Type.STRING },
          examType: { type: import_genai.Type.STRING },
          durationMinutes: { type: import_genai.Type.INTEGER },
          totalPoints: { type: import_genai.Type.NUMBER },
          instructions: { type: import_genai.Type.STRING },
          sections: {
            type: import_genai.Type.ARRAY,
            items: {
              type: import_genai.Type.OBJECT,
              properties: {
                id: { type: import_genai.Type.STRING },
                title: { type: import_genai.Type.STRING },
                instruction: { type: import_genai.Type.STRING },
                type: { type: import_genai.Type.STRING },
                passageTitle: { type: import_genai.Type.STRING },
                passage: { type: import_genai.Type.STRING },
                points: { type: import_genai.Type.NUMBER },
                questions: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      id: { type: import_genai.Type.STRING },
                      type: { type: import_genai.Type.STRING },
                      instruction: { type: import_genai.Type.STRING },
                      question: { type: import_genai.Type.STRING },
                      points: { type: import_genai.Type.NUMBER },
                      answer: { type: import_genai.Type.STRING }
                    },
                    required: ["id", "type", "instruction", "question", "points", "answer"]
                  }
                }
              },
              required: ["id", "title", "type", "points", "questions"]
            }
          },
          writingTask: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              prompt: { type: import_genai.Type.STRING },
              cues: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
              points: { type: import_genai.Type.NUMBER }
            },
            required: ["title", "prompt", "points"]
          }
        },
        required: ["title", "schoolYear", "sections", "writingTask"]
      }
    }
  });
  const parsed = JSON.parse(response.text || "{}");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const schoolYear = ["1AM", "2AM", "3AM", "4AM"].includes(parsed.schoolYear) ? parsed.schoolYear : "3AM";
  return {
    id: `exam-imported-${Date.now()}`,
    title: parsed.title || "Imported English Exam",
    schoolYear,
    sequence: parsed.sequence || "Imported Sequence",
    unitTitle: parsed.theme || "Imported Unit",
    theme: parsed.theme || "General English",
    examType: parsed.examType || "Exam",
    durationMinutes: parsed.durationMinutes || 60,
    totalPoints: parsed.totalPoints || 20,
    difficulty: "Medium",
    status: "Draft",
    instructions: parsed.instructions || "Read the text and answer the questions.",
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: "MINISTRY OF NATIONAL EDUCATION",
      schoolName: "Middle School",
      wilaya: "Direction of Education",
      teacherName: "Teacher",
      classGrade: `Level: ${schoolYear}`,
      academicYear: "2026\u20132027",
      examTitle: parsed.title || "English Examination",
      durationMinutes: parsed.durationMinutes || 60,
      totalPoints: parsed.totalPoints || 20,
      datePlaceholder: "2026\u20132027",
      studentNamePlaceholder: `Full Name: .....................................................   Class: ${schoolYear} ...`
    },
    sections: parsed.sections || [],
    writingTask: {
      title: parsed.writingTask?.title || "PART TWO: WRITTEN EXPRESSION",
      prompt: parsed.writingTask?.prompt || "Write a short paragraph.",
      cues: parsed.writingTask?.cues || [],
      points: parsed.writingTask?.points || 6,
      rubric: [
        { criterion: "Relevance", points: 2 },
        { criterion: "Grammar and vocabulary", points: 2 },
        { criterion: "Coherence", points: 2 }
      ]
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ["Imported", schoolYear],
    createdAt: now,
    updatedAt: now
  };
}

// server.ts
var examsDb = [...INITIAL_EXAMS];
var templatesDb = [...INITIAL_TEMPLATES];
var questionBankDb = [...INITIAL_QUESTION_BANK];
var profileDb = { ...INITIAL_SCHOOL_PROFILE };
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString(), platform: "ExamCraft DZ" });
  });
  app.get("/api/curriculum", (req, res) => {
    const { year } = req.query;
    if (year && typeof year === "string") {
      const filtered = ALGERIAN_CURRICULUM.filter((s) => s.schoolYear.toLowerCase() === year.toLowerCase());
      return res.json(filtered);
    }
    return res.json(ALGERIAN_CURRICULUM);
  });
  app.get("/api/exams", (_req, res) => {
    res.json(examsDb);
  });
  app.get("/api/exams/:id", (req, res) => {
    const exam = examsDb.find((e) => e.id === req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.json(exam);
  });
  app.post("/api/exams", (req, res) => {
    const newExam = req.body;
    if (!newExam.id) {
      newExam.id = `exam-${Date.now()}`;
    }
    newExam.createdAt = newExam.createdAt || (/* @__PURE__ */ new Date()).toISOString();
    newExam.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    examsDb.unshift(newExam);
    res.status(201).json(newExam);
  });
  app.put("/api/exams/:id", (req, res) => {
    const index = examsDb.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Exam not found" });
    }
    const updatedExam = {
      ...examsDb[index],
      ...req.body,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    examsDb[index] = updatedExam;
    res.json(updatedExam);
  });
  app.delete("/api/exams/:id", (req, res) => {
    const index = examsDb.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Exam not found" });
    }
    const deleted = examsDb.splice(index, 1)[0];
    res.json({ message: "Exam deleted", exam: deleted });
  });
  app.get("/api/templates", (_req, res) => {
    res.json(templatesDb);
  });
  app.post("/api/templates", (req, res) => {
    const newTemplate = {
      ...req.body,
      id: req.body.id || `tmpl-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    templatesDb.unshift(newTemplate);
    res.status(201).json(newTemplate);
  });
  app.delete("/api/templates/:id", (req, res) => {
    templatesDb = templatesDb.filter((t) => t.id !== req.params.id);
    res.json({ message: "Template removed" });
  });
  app.get("/api/question-bank", (req, res) => {
    const { year, skill, search } = req.query;
    let list = [...questionBankDb];
    if (year && typeof year === "string") {
      list = list.filter((q) => q.schoolYear === year);
    }
    if (skill && typeof skill === "string") {
      list = list.filter((q) => q.skill.toLowerCase() === skill.toLowerCase());
    }
    if (search && typeof search === "string") {
      const qLower = search.toLowerCase();
      list = list.filter(
        (q) => q.question.toLowerCase().includes(qLower) || q.theme.toLowerCase().includes(qLower) || q.grammar && q.grammar.toLowerCase().includes(qLower)
      );
    }
    res.json(list);
  });
  app.post("/api/question-bank", (req, res) => {
    const newItem = {
      ...req.body,
      id: req.body.id || `qb-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    questionBankDb.unshift(newItem);
    res.status(201).json(newItem);
  });
  app.delete("/api/question-bank/:id", (req, res) => {
    questionBankDb = questionBankDb.filter((q) => q.id !== req.params.id);
    res.json({ message: "Question removed" });
  });
  app.get("/api/profile", (_req, res) => {
    res.json(profileDb);
  });
  app.put("/api/profile", (req, res) => {
    profileDb = { ...profileDb, ...req.body };
    res.json(profileDb);
  });
  app.post("/api/generate-exam", async (req, res) => {
    try {
      const config = req.body;
      const exam = await generateExamWithGemini(config);
      examsDb.unshift(exam);
      res.json(exam);
    } catch (err) {
      console.error("Error generating exam with Gemini:", err);
      res.status(500).json({
        error: err.message || "Failed to generate exam. Please check server logs and try again."
      });
    }
  });
  app.post("/api/validate-exam", async (req, res) => {
    try {
      const exam = req.body;
      const qualityCheck = await validateExamWithAI(exam);
      res.json(qualityCheck);
    } catch (err) {
      console.error("Error validating exam:", err);
      res.status(500).json({ error: err.message || "Validation failed" });
    }
  });
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { action, payload } = req.body;
      const result = await executeAiAssistant(action, payload);
      res.json(result);
    } catch (err) {
      console.error("Error in AI Assistant:", err);
      res.status(500).json({ error: err.message || "AI assistant request failed" });
    }
  });
  app.post("/api/generate-questions", async (req, res) => {
    try {
      const params = req.body;
      const items = await generateQuestionBankItems(params);
      questionBankDb = [...items, ...questionBankDb];
      res.json(items);
    } catch (err) {
      console.error("Error generating question bank items:", err);
      res.status(500).json({ error: err.message || "Question bank generation failed" });
    }
  });
  app.post("/api/generate-alternative-version", async (req, res) => {
    try {
      const { exam } = req.body;
      const altExam = await generateAlternativeExamVersion(exam);
      examsDb.unshift(altExam);
      res.json(altExam);
    } catch (err) {
      console.error("Error generating alternative exam:", err);
      res.status(500).json({ error: err.message || "Alternative version generation failed" });
    }
  });
  app.post("/api/import-exam", async (req, res) => {
    try {
      const { text } = req.body;
      const importedExam = await importAndParseExamWithAI(text);
      examsDb.unshift(importedExam);
      res.json(importedExam);
    } catch (err) {
      console.error("Error importing exam:", err);
      res.status(500).json({ error: err.message || "Exam import failed" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ExamCraft DZ Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
