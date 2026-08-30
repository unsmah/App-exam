export type SchoolYear = '1AM' | '2AM' | '3AM' | '4AM';

export type ExamType =
  | 'Quiz'
  | 'Test'
  | 'Exam'
  | 'Assessment'
  | 'BEM-style practice'
  | 'Revision test'
  | 'Diagnostic assessment'
  | 'Custom';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Difficult' | 'Mixed';

export type CEFRLevel = 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2';

export type QuestionType =
  | 'true_false'
  | 'true_false_justify'
  | 'multiple_choice'
  | 'choose_correct'
  | 'wh_questions'
  | 'short_answers'
  | 'matching'
  | 'ordering'
  | 'complete_table'
  | 'find_references'
  | 'find_synonyms_antonyms'
  | 'fill_blanks'
  | 'put_verbs_in_brackets'
  | 'correct_mistakes'
  | 'transform_sentences'
  | 'make_questions'
  | 'odd_one_out'
  | 'word_formation'
  | 'categorization'
  | 'guided_writing'
  | 'paragraph_writing'
  | 'email_message'
  | 'dialogue'
  | 'biography'
  | 'description'
  | 'opinion_paragraph';

export interface CurriculumSequence {
  id: string;
  schoolYear: SchoolYear;
  sequenceNumber: number;
  sequenceTitle: string;
  theme: string;
  lessons: string[];
  grammarPoints: string[];
  vocabularyTopics: string[];
  skills: string[];
  communicativeFunctions: string[];
  sampleReadingTopics: string[];
  phonetics?: string[];
  active: boolean;
}

export interface ExamQuestion {
  id: string;
  sectionId: string;
  type: QuestionType;
  instruction: string;
  question: string;
  options?: string[];
  itemsToMatch?: { left: string; right: string }[];
  tableHeaders?: string[];
  tableRows?: string[][];
  passageExcerpt?: string;
  points: number;
  answer: string;
  alternativeAnswers?: string[];
  explanation?: string;
  notes?: string;
  difficulty?: DifficultyLevel;
}

export interface ExamSection {
  id: string;
  title: string;
  instruction: string;
  type: 'reading' | 'language' | 'vocabulary' | 'writing' | 'custom';
  passageTitle?: string;
  passage?: string;
  passageSource?: string;
  points: number;
  questions: ExamQuestion[];
}

export interface WritingRubricItem {
  criterion: string;
  points: number;
  description?: string;
}

export interface WritingTask {
  title: string;
  prompt: string;
  context?: string;
  cues: string[];
  wordCountTarget?: string;
  points: number;
  rubric: WritingRubricItem[];
}

export interface ExamHeaderConfig {
  republicTitle: string;
  ministryTitle: string;
  schoolName: string;
  wilaya: string;
  teacherName: string;
  classGrade: string;
  academicYear: string;
  examTitle: string;
  durationMinutes: number;
  totalPoints: number;
  datePlaceholder: string;
  studentNamePlaceholder: string;
  logoUrl?: string;
}

export interface AIQualityCheck {
  score: number;
  feedback: string[];
  strengths: string[];
  suggestions: string[];
  curriculumAlignment: boolean;
  scoreMatch: boolean;
}

export interface ExamVersion {
  versionNumber: number;
  timestamp: string;
  note: string;
  sections: ExamSection[];
  writingTask: WritingTask;
  headerConfig: ExamHeaderConfig;
}

export interface ExamDocument {
  id: string;
  title: string;
  schoolYear: SchoolYear;
  sequence: string;
  unitTitle: string;
  theme: string;
  examType: ExamType;
  durationMinutes: number;
  totalPoints: number;
  difficulty: DifficultyLevel;
  targetCEFR?: CEFRLevel;
  status: 'Draft' | 'Final' | 'Completed' | 'Archived';
  headerConfig: ExamHeaderConfig;
  instructions: string;
  sections: ExamSection[];
  writingTask: WritingTask;
  qualityCheck?: AIQualityCheck;
  versionNumber: number;
  versionsHistory: ExamVersion[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamTemplate {
  id: string;
  name: string;
  schoolYear: SchoolYear;
  examType: ExamType;
  description: string;
  totalPoints: number;
  durationMinutes: number;
  structure: {
    includeReading: boolean;
    readingPoints: number;
    readingQuestionTypes: QuestionType[];
    includeLanguage: boolean;
    languagePoints: number;
    languageQuestionTypes: QuestionType[];
    includeVocabulary: boolean;
    vocabularyPoints: number;
    vocabularyQuestionTypes: QuestionType[];
    includeWriting: boolean;
    writingPoints: number;
    writingType: QuestionType;
  };
  createdAt: string;
}

export interface QuestionBankItem {
  id: string;
  question: string;
  instruction: string;
  type: QuestionType;
  schoolYear: SchoolYear;
  unit: string;
  theme: string;
  grammar?: string;
  vocabulary?: string;
  skill: string;
  difficulty: DifficultyLevel;
  options?: string[];
  answer: string;
  points: number;
  tags: string[];
  createdAt: string;
}

export interface ContentLibraryItem {
  id: string;
  type: 'passage' | 'writing_prompt' | 'grammar_drill' | 'rubric' | 'header';
  title: string;
  schoolYear: SchoolYear;
  unit?: string;
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface SchoolProfile {
  teacherName: string;
  schoolName: string;
  wilaya: string;
  commune: string;
  academicYear: string;
  logoUrl?: string;
  email?: string;
  defaultDuration: number;
  defaultPoints: number;
  defaultLanguage: 'en' | 'fr' | 'both';
  defaultDurationMinutes?: number;
  defaultTotalPoints?: number;
}

export type TeacherRole = 'teacher' | 'head_of_department' | 'inspector' | 'trainee';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  title?: string; // e.g. 'Mr.', 'Mrs.', 'Ms.', 'Dr.'
  photoURL?: string;
  avatarIcon?: string; // e.g. 'avatar-1', 'avatar-2', etc.
  role: TeacherRole;
  schoolName: string;
  wilaya: string;
  commune?: string;
  academicYear: string;
  teachingLevels: SchoolYear[];
  subject: string;
  phoneNumber?: string;
  bio?: string;
  defaultDuration: number;
  defaultPoints: number;
  defaultLanguage: 'en' | 'fr' | 'both';
  createdAt: string;
  updatedAt: string;
}

export const ALGERIAN_WILAYAS = [
  '01 - Adrar', '02 - Chlef', '03 - Laghouat', '04 - Oum El Bouaghi', '05 - Batna',
  '06 - Béjaïa', '07 - Biskra', '08 - Béchar', '09 - Blida', '10 - Bouira',
  '11 - Tamanrasset', '12 - Tébessa', '13 - Tlemcen', '14 - Tiaret', '15 - Tizi Ouzou',
  '16 - Alger', '17 - Djelfa', '18 - Jijel', '19 - Sétif', '20 - Saïda',
  '21 - Skikda', '22 - Sidi Bel Abbès', '23 - Annaba', '24 - Guelma', '25 - Constantine',
  '26 - Médéa', '27 - Mostaganem', '28 - M\'Sila', '29 - Mascara', '30 - Ouargla',
  '31 - Oran', '32 - El Bayadh', '33 - Illizi', '34 - Bordj Bou Arréridj', '35 - Boumerdès',
  '36 - El Tarf', '37 - Tindouf', '38 - Tissemsilt', '39 - El Oued', '40 - Khenchela',
  '41 - Souk Ahras', '42 - Tipaza', '43 - Mila', '44 - Aïn Defla', '45 - Naâma',
  '46 - Aïn Témouchent', '47 - Ghardaïa', '48 - Relizane', '49 - Timimoun', '50 - Bordj Badji Mokhtar',
  '51 - Ouled Djellal', '52 - Béni Abbès', '53 - In Salah', '54 - In Guezzam', '55 - Touggourt',
  '56 - Djanet', '57 - El M\'Ghair', '58 - El Meniaa'
];


export interface ExamGenerationConfig {
  schoolYear: SchoolYear;
  sequenceId: string;
  theme: string;
  lessons: string[];
  grammar: string[];
  vocabulary: string[];
  skills: string[];
  examType: ExamType;
  durationMinutes: number;
  totalPoints: number;
  difficulty: DifficultyLevel;
  targetCEFR?: CEFRLevel;
  readingPoints: number;
  readingQuestionTypes: QuestionType[];
  languagePoints: number;
  languageQuestionTypes: QuestionType[];
  vocabularyPoints: number;
  vocabularyQuestionTypes: QuestionType[];
  writingPoints: number;
  writingType: QuestionType;
  customInstructions?: string;
  culturalContext?: string;
}
