import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  Sliders, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  SchoolYear, 
  ExamType, 
  DifficultyLevel, 
  CEFRLevel, 
  QuestionType, 
  ExamGenerationConfig, 
  ExamDocument, 
  CurriculumSequence 
} from '../types';
import { ALGERIAN_CURRICULUM, QUESTION_TYPES_BY_SKILL } from '../data/curriculum';

interface GenerateExamWizardProps {
  onExamGenerated: (exam: ExamDocument) => void;
  onCancel: () => void;
  lang: 'en' | 'fr' | 'both';
  initialConfig?: Partial<ExamGenerationConfig>;
}

export const GenerateExamWizard: React.FC<GenerateExamWizardProps> = ({
  onExamGenerated,
  onCancel,
  lang,
  initialConfig
}) => {
  const isFr = lang === 'fr';

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [generationStepIndex, setGenerationStepIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedExam, setGeneratedExam] = useState<ExamDocument | null>(null);

  // Form State
  const [schoolYear, setSchoolYear] = useState<SchoolYear>(initialConfig?.schoolYear || '3AM');
  const [sequenceId, setSequenceId] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<string[]>([]);
  const [selectedVocabulary, setSelectedVocabulary] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Reading comprehension',
    'Mastery of language (Grammar & Morphology)',
    'Phonetics / Pronunciation',
    'Written expression (Situation of integration)'
  ]);

  // Exam Configuration
  const [examType, setExamType] = useState<ExamType>(initialConfig?.examType || 'Exam');
  const [durationMinutes, setDurationMinutes] = useState<number>(initialConfig?.durationMinutes || 60);
  const [totalPoints, setTotalPoints] = useState<number>(initialConfig?.totalPoints || 20);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialConfig?.difficulty || 'Medium');
  const [targetCEFR, setTargetCEFR] = useState<CEFRLevel>('A2');

  // Section Points & Question Types
  const [readingPoints, setReadingPoints] = useState<number>(7);
  const [readingQuestionTypes, setReadingQuestionTypes] = useState<QuestionType[]>([
    'true_false',
    'wh_questions',
    'find_synonyms_antonyms'
  ]);

  const [languagePoints, setLanguagePoints] = useState<number>(7);
  const [languageQuestionTypes, setLanguageQuestionTypes] = useState<QuestionType[]>([
    'put_verbs_in_brackets',
    'transform_sentences',
    'word_formation'
  ]);

  const [vocabularyPoints, setVocabularyPoints] = useState<number>(0);
  const [vocabularyQuestionTypes, setVocabularyQuestionTypes] = useState<QuestionType[]>([]);

  const [writingPoints, setWritingPoints] = useState<number>(6);
  const [writingType, setWritingType] = useState<QuestionType>('guided_writing');

  // Custom AI instructions
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [culturalContext, setCulturalContext] = useState<string>('Algerian middle school educational context with national landmarks or figures');

  // Available sequences for selected school year
  const availableSequences = ALGERIAN_CURRICULUM.filter(s => s.schoolYear === schoolYear);
  const currentSequence = availableSequences.find(s => s.id === sequenceId) || availableSequences[0];

  useEffect(() => {
    if (availableSequences.length > 0) {
      const firstSeq = availableSequences[0];
      setSequenceId(firstSeq.id);
      setTheme(firstSeq.theme);
      setSelectedLessons(firstSeq.lessons.slice(0, 3));
      setSelectedGrammar(firstSeq.grammarPoints.slice(0, 3));
      setSelectedVocabulary(firstSeq.vocabularyTopics.slice(0, 3));
    }

    // Set defaults according to year
    if (schoolYear === '4AM') {
      setExamType('BEM-style practice');
      setDurationMinutes(90);
      setTargetCEFR('A2');
      setReadingPoints(7);
      setLanguagePoints(7);
      setWritingPoints(6);
      setReadingQuestionTypes(['true_false_justify', 'multiple_choice', 'wh_questions', 'find_synonyms_antonyms']);
      setLanguageQuestionTypes(['put_verbs_in_brackets', 'transform_sentences', 'word_formation']);
      setWritingType('biography');
    } else if (schoolYear === '1AM') {
      setExamType('Test');
      setDurationMinutes(45);
      setTargetCEFR('Pre-A1');
      setReadingPoints(7);
      setLanguagePoints(7);
      setWritingPoints(6);
      setReadingQuestionTypes(['true_false', 'wh_questions', 'matching']);
      setLanguageQuestionTypes(['put_verbs_in_brackets', 'fill_blanks', 'word_formation']);
      setWritingType('guided_writing');
    } else {
      setExamType('Exam');
      setDurationMinutes(60);
      setTargetCEFR('A1');
      setReadingPoints(7);
      setLanguagePoints(7);
      setWritingPoints(6);
    }
  }, [schoolYear]);

  // Handle sequence change
  const handleSequenceChange = (id: string) => {
    setSequenceId(id);
    const seq = availableSequences.find(s => s.id === id);
    if (seq) {
      setTheme(seq.theme);
      setSelectedLessons(seq.lessons.slice(0, 3));
      setSelectedGrammar(seq.grammarPoints.slice(0, 3));
      setSelectedVocabulary(seq.vocabularyTopics.slice(0, 3));
    }
  };

  const stepsList = [
    { num: 1, labelEn: 'School Year', labelFr: 'Niveau CEM' },
    { num: 2, labelEn: 'Content & Theme', labelFr: 'Contenu & Thème' },
    { num: 3, labelEn: 'Exam Structure', labelFr: 'Structure de l\'Épreuve' },
    { num: 4, labelEn: 'Difficulty & Notes', labelFr: 'Difficulté & Consignes' },
    { num: 5, labelEn: 'AI Generation', labelFr: 'Génération IA' },
    { num: 6, labelEn: 'Quality Review', labelFr: 'Validation & Revue' }
  ];

  const generationStages = [
    'Checking official Algerian curriculum guidelines...',
    'Synthesizing pedagogical context and vocabulary...',
    'Generating coherent, level-appropriate reading text...',
    'Formulating comprehension questions and options...',
    'Building linguistic mastery exercises & phonetics drills...',
    'Creating Part Two: Situation of Integration & grading rubric...',
    'Calculating point allocation & generating answer key...',
    'Running quality-assurance & formatting final assessment...'
  ];

  const handleStartGeneration = async () => {
    setStep(5);
    setLoading(true);
    setError(null);
    setGenerationStepIndex(0);

    const stepInterval = setInterval(() => {
      setGenerationStepIndex(prev => {
        if (prev < generationStages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    const payload: ExamGenerationConfig = {
      schoolYear,
      sequenceId: currentSequence.id,
      theme: theme || currentSequence.theme,
      lessons: selectedLessons,
      grammar: selectedGrammar,
      vocabulary: selectedVocabulary,
      skills: selectedSkills,
      examType,
      durationMinutes,
      totalPoints,
      difficulty,
      targetCEFR,
      readingPoints,
      readingQuestionTypes,
      languagePoints,
      languageQuestionTypes,
      vocabularyPoints,
      vocabularyQuestionTypes,
      writingPoints,
      writingType,
      customInstructions,
      culturalContext
    };

    try {
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error generating exam');
      }

      const examData: ExamDocument = await response.json();
      clearInterval(stepInterval);
      setGeneratedExam(examData);
      setStep(6);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setError(err.message || 'An unexpected error occurred during exam generation.');
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (list: string[], item: string, setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const toggleQuestionType = (
    list: QuestionType[], 
    type: QuestionType, 
    setList: React.Dispatch<React.SetStateAction<QuestionType[]>>
  ) => {
    if (list.includes(type)) {
      setList(list.filter(t => t !== type));
    } else {
      setList([...list, type]);
    }
  };

  const currentPointsSum = readingPoints + languagePoints + vocabularyPoints + writingPoints;

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour au tableau de bord' : 'Back to Dashboard'}</span>
          </button>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Générateur de Sujets d\'Anglais CEM' : 'AI English Exam Creation Wizard'}</span>
          </h2>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-300 z-0"
            style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          ></div>

          {stepsList.map(s => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[11px] mt-1.5 font-medium hidden sm:block ${
                  isCurrent ? 'text-emerald-700 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {isFr ? s.labelFr : s.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* ================= STEP 1: SELECT SCHOOL YEAR ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isFr ? 'Étape 1 : Choisissez l\'Année Scolaire' : 'Step 1: Select School Year'}
              </h3>
              <p className="text-xs text-slate-500">
                {isFr ? 'Sélectionnez le niveau pour charger automatiquement les objectifs et le programme officiel algérien.' : 'Choose the middle school grade to dynamically load the official Algerian curriculum framework.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1AM */}
              <div
                onClick={() => setSchoolYear('1AM')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  schoolYear === '1AM'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">1AM</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Pre-A1 / A1</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">First Year Middle School</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Basics of English: Greetings, personal ID, family members, daily routine & simple present tense.
                </p>
              </div>

              {/* 2AM */}
              <div
                onClick={() => setSchoolYear('2AM')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  schoolYear === '2AM'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">2AM</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-800">A1 / A2</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Second Year Middle School</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Shopping & food quantities, health advice (should), past simple travels & eco-friendly environment.
                </p>
              </div>

              {/* 3AM */}
              <div
                onClick={() => setSchoolYear('3AM')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  schoolYear === '3AM'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">3AM</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">A2</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Third Year Middle School</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Personality traits & talents, natural disasters (when/while), inventions (passive voice) & Algerian heritage.
                </p>
              </div>

              {/* 4AM */}
              <div
                onClick={() => setSchoolYear('4AM')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  schoolYear === '4AM'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">4AM</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">BEM Official Level</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Fourth Year Middle School (BEM)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Universal landmarks, famous figures, active/passive voice, citizenship & official 3-part BEM layout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT CONTENT ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isFr ? `Étape 2 : Programme & Contenu (${schoolYear})` : `Step 2: Select Curriculum & Content (${schoolYear})`}
              </h3>
              <p className="text-xs text-slate-500">
                {isFr ? 'Sélectionnez la séquence officielle, les leçons, les points de grammaire et le vocabulaire cibles.' : 'Select the official sequence, topics, grammar rules and vocabulary items from the syllabus database.'}
              </p>
            </div>

            {/* Sequence Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Séquence / Projet' : 'Curriculum Sequence'}
              </label>
              <select
                value={sequenceId}
                onChange={(e) => handleSequenceChange(e.target.value)}
                className="w-full text-sm font-semibold p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {availableSequences.map(seq => (
                  <option key={seq.id} value={seq.id}>
                    {seq.sequenceTitle} — {seq.theme}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Lessons / Topics */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Leçons & Thèmes de la Séquence' : 'Lessons & Topics'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSequence.lessons.map(lesson => (
                  <div
                    key={lesson}
                    onClick={() => toggleArrayItem(selectedLessons, lesson, setSelectedLessons)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                      selectedLessons.includes(lesson)
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLessons.includes(lesson)}
                      onChange={() => {}}
                      className="mt-0.5 text-emerald-600 rounded"
                    />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Grammar */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Points de Grammaire Cibles' : 'Target Grammar Points'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSequence.grammarPoints.map(grammar => (
                  <div
                    key={grammar}
                    onClick={() => toggleArrayItem(selectedGrammar, grammar, setSelectedGrammar)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                      selectedGrammar.includes(grammar)
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGrammar.includes(grammar)}
                      onChange={() => {}}
                      className="mt-0.5 text-emerald-600 rounded"
                    />
                    <span>{grammar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary & Lexis */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Vocabulaire / Lexique' : 'Vocabulary Topics'}
              </label>
              <div className="flex flex-wrap gap-2">
                {currentSequence.vocabularyTopics.map(vocab => (
                  <button
                    key={vocab}
                    type="button"
                    onClick={() => toggleArrayItem(selectedVocabulary, vocab, setSelectedVocabulary)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedVocabulary.includes(vocab)
                        ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {vocab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: EXAM STRUCTURE ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isFr ? 'Étape 3 : Structure & Barème de l\'Épreuve' : 'Step 3: Exam Structure & Points'}
              </h3>
              <p className="text-xs text-slate-500">
                {isFr ? 'Configurez le type d\'évaluation, la durée et la répartition des points.' : 'Customize sections, question types, and scoring points (default 20 pts standard).'}
              </p>
            </div>

            {/* Primary Config Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isFr ? 'Type d\'évaluation' : 'Exam Type'}
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value as ExamType)}
                  className="w-full text-xs font-semibold p-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="Quiz">Class Quiz</option>
                  <option value="Test">Term Test (Devoir)</option>
                  <option value="Exam">Term Exam (Composition)</option>
                  <option value="BEM-style practice">BEM Official Mock Exam</option>
                  <option value="Diagnostic assessment">Diagnostic Assessment</option>
                  <option value="Revision test">Revision Test</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isFr ? 'Durée' : 'Duration'}
                </label>
                <select
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes (1 Hour)</option>
                  <option value={90}>90 minutes (1.5 Hours / BEM)</option>
                  <option value={120}>120 minutes (2 Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isFr ? 'Barème Total' : 'Total Score'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(Number(e.target.value))}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-lg"
                  />
                  <span className="text-xs font-bold text-slate-500">pts</span>
                </div>
              </div>
            </div>

            {/* Point Balance Indicator */}
            <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-semibold ${
              currentPointsSum === totalPoints
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                {currentPointsSum === totalPoints ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                <span>
                  {isFr ? 'Total configuré :' : 'Configured Sections Total:'} {currentPointsSum} / {totalPoints} pts
                </span>
              </div>
              {currentPointsSum !== totalPoints && (
                <button
                  onClick={() => {
                    setReadingPoints(7);
                    setLanguagePoints(7);
                    setWritingPoints(6);
                    setVocabularyPoints(0);
                  }}
                  className="text-xs text-amber-900 underline hover:no-underline font-bold"
                >
                  {isFr ? 'Auto-équilibrer (7+7+6)' : 'Auto-balance (7+7+6)'}
                </button>
              )}
            </div>

            {/* Section 1: Reading Comprehension */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900">
                  PART ONE: A/ Reading Comprehension
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 font-medium">Points:</label>
                  <input
                    type="number"
                    value={readingPoints}
                    onChange={(e) => setReadingPoints(Number(e.target.value))}
                    className="w-16 text-xs font-bold p-1.5 border border-slate-300 rounded-lg text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                  Question Types to include:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTION_TYPES_BY_SKILL.reading.map(qt => (
                    <div
                      key={qt.type}
                      onClick={() => toggleQuestionType(readingQuestionTypes, qt.type as QuestionType, setReadingQuestionTypes)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center gap-2 ${
                        readingQuestionTypes.includes(qt.type as QuestionType)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={readingQuestionTypes.includes(qt.type as QuestionType)}
                        onChange={() => {}}
                        className="text-emerald-600 rounded"
                      />
                      <span>{qt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Mastery of Language */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900">
                  PART ONE: B/ Mastery of Language (Grammar & Phonetics)
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 font-medium">Points:</label>
                  <input
                    type="number"
                    value={languagePoints}
                    onChange={(e) => setLanguagePoints(Number(e.target.value))}
                    className="w-16 text-xs font-bold p-1.5 border border-slate-300 rounded-lg text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                  Grammar & Morphology Exercises:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTION_TYPES_BY_SKILL.grammar.map(qt => (
                    <div
                      key={qt.type}
                      onClick={() => toggleQuestionType(languageQuestionTypes, qt.type as QuestionType, setLanguageQuestionTypes)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center gap-2 ${
                        languageQuestionTypes.includes(qt.type as QuestionType)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={languageQuestionTypes.includes(qt.type as QuestionType)}
                        onChange={() => {}}
                        className="text-emerald-600 rounded"
                      />
                      <span>{qt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Situation of Integration (Written Expression) */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900">
                  PART TWO: Situation of Integration (Written Expression)
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 font-medium">Points:</label>
                  <input
                    type="number"
                    value={writingPoints}
                    onChange={(e) => setWritingPoints(Number(e.target.value))}
                    className="w-16 text-xs font-bold p-1.5 border border-slate-300 rounded-lg text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">
                  Writing Task Format:
                </label>
                <select
                  value={writingType}
                  onChange={(e) => setWritingType(e.target.value as QuestionType)}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  {QUESTION_TYPES_BY_SKILL.writing.map(wt => (
                    <option key={wt.type} value={wt.type}>
                      {wt.label} — {wt.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: DIFFICULTY & INSTRUCTIONS ================= */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {isFr ? 'Étape 4 : Niveau de Difficulté & Consignes Personnalisées' : 'Step 4: Difficulty & Custom Instructions'}
              </h3>
              <p className="text-xs text-slate-500">
                {isFr ? 'Affinez les consignes pour l\'IA et adaptez le niveau de difficulté souhaité.' : 'Provide custom instructions, specific cultural elements, or names to include.'}
              </p>
            </div>

            {/* Difficulty Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Difficulté Globale' : 'Target Difficulty Level'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['Easy', 'Medium', 'Difficult', 'Mixed'] as DifficultyLevel[]).map(diff => (
                  <div
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      difficulty === diff
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm">{diff}</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                      {diff === 'Easy' ? 'Pre-term test' : diff === 'Medium' ? 'Standard test' : diff === 'Difficult' ? 'Advanced' : 'Gradual'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Teacher Prompt */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Consignes Particulières pour l\'IA (Optionnel)' : 'Additional Instructions for Gemini AI'}
              </label>
              <textarea
                rows={4}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Focus on environmental protection in Tipaza / Algiers. Include 4-5 irregular verbs in brackets and ensure the reading passage mentions the importance of recycling plastic waste."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                You can specify specific Algerian cities, historical figures, vocabulary exclusions, or text styles.
              </p>
            </div>

            {/* Cultural Context */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {isFr ? 'Contexte Culturel & Géographique' : 'Cultural & Educational Context'}
              </label>
              <input
                type="text"
                value={culturalContext}
                onChange={(e) => setCulturalContext(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 5: AI GENERATION IN PROGRESS ================= */}
        {step === 5 && (
          <div className="py-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {isFr ? 'Préparation et Génération de votre Sujet...' : 'Crafting Your Algerian English Exam...'}
              </h3>
              <p className="text-xs text-slate-500">
                Gemini AI is structuring your {schoolYear} examination according to official standards.
              </p>
            </div>

            {/* Animated Step List */}
            <div className="max-w-md mx-auto text-left space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              {generationStages.map((stage, idx) => {
                const isPassed = idx < generationStepIndex;
                const isCurrent = idx === generationStepIndex;
                return (
                  <div 
                    key={stage} 
                    className={`flex items-center gap-2.5 py-1 ${
                      isPassed ? 'text-emerald-700 font-semibold' : isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
                    )}
                    <span>{stage}</span>
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-left">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Generation Error:</span>
                </div>
                <div>{error}</div>
                <button
                  onClick={handleStartGeneration}
                  className="mt-3 bg-red-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 text-xs"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 6: QUALITY REVIEW & COMPLETION ================= */}
        {step === 6 && generatedExam && (
          <div className="space-y-6">
            <div className="text-center py-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">
                {isFr ? 'Sujet Généré avec Succès !' : 'Exam Successfully Generated!'}
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5 font-medium">
                {generatedExam.title} • {generatedExam.schoolYear} ({generatedExam.totalPoints} pts)
              </p>
            </div>

            {/* AI Quality Check Card */}
            {generatedExam.qualityCheck && (
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-sm">
                      {isFr ? 'Contrôle Qualité IA & Conformité CEM' : 'AI Quality & Curriculum Compliance'}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-extrabold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300">
                    {generatedExam.qualityCheck.score} / 100
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-bold text-slate-800 mb-1.5">✓ Strengths:</div>
                    <ul className="space-y-1 text-slate-600">
                      {generatedExam.qualityCheck.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-bold text-slate-800 mb-1.5">📋 Feedback:</div>
                    <ul className="space-y-1 text-slate-600">
                      {generatedExam.qualityCheck.feedback.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={handleStartGeneration}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFr ? 'Régénérer' : 'Regenerate'}</span>
              </button>

              <button
                onClick={() => onExamGenerated(generatedExam)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>{isFr ? 'Ouvrir dans l\'Éditeur de Sujet' : 'Open in Exam Editor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation (Steps 1 to 4) */}
        {step < 5 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
            <button
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else onCancel();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{step === 1 ? (isFr ? 'Annuler' : 'Cancel') : (isFr ? 'Précédent' : 'Previous')}</span>
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>{isFr ? 'Suivant' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleStartGeneration}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isFr ? 'Générer l\'Épreuve avec l\'IA' : 'Generate Complete Exam (AI)'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
