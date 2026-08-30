import { GoogleGenAI, Type } from '@google/genai';
import { ExamGenerationConfig, ExamDocument, AIQualityCheck, QuestionBankItem, SchoolYear } from '../src/types';
import { ALGERIAN_CURRICULUM } from '../src/data/curriculum';

const getAiClient = (customApiKey?: string) => {
  const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('No Gemini API key found. Please enter your Google AI Studio API key in the AI Key Settings at the top of the screen (free at https://aistudio.google.com/app/apikey).');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

export async function verifyGeminiApiKey(key: string): Promise<boolean> {
  try {
    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    // Run a very tiny generation to verify key validity
    await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: 'Ping',
      config: {
        maxOutputTokens: 1
      }
    });
    return true;
  } catch (err: any) {
    console.error('API key verification failed:', err);
    let errMsg = err.message || 'Invalid Gemini API key';
    try {
      if (typeof errMsg === 'string' && errMsg.trim().startsWith('{')) {
        const parsed = JSON.parse(errMsg);
        if (parsed?.error?.message) {
          errMsg = parsed.error.message;
        } else if (parsed?.message) {
          errMsg = parsed.message;
        }
      }
    } catch {
      // Ignore parse failure and keep original
    }
    throw new Error(errMsg);
  }
}

export async function generateExamWithGemini(config: ExamGenerationConfig, customApiKey?: string): Promise<ExamDocument> {
  const ai = getAiClient(customApiKey);

  // Find curriculum context
  const curSeq = ALGERIAN_CURRICULUM.find(s => s.id === config.sequenceId) || 
                 ALGERIAN_CURRICULUM.find(s => s.schoolYear === config.schoolYear) || 
                 ALGERIAN_CURRICULUM[0];

  const systemInstruction = `You are an expert English language assessment designer and senior inspector specializing in Algerian middle school education (Enseignement Moyen Algérien - 1AM, 2AM, 3AM, 4AM / BEM).
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
- Selected Lessons / Topics: ${config.lessons && config.lessons.length > 0 ? config.lessons.join(', ') : curSeq.lessons.join(', ')}
- Target Grammar Points: ${config.grammar && config.grammar.length > 0 ? config.grammar.join(', ') : curSeq.grammarPoints.join(', ')}
- Target Vocabulary: ${config.vocabulary && config.vocabulary.length > 0 ? config.vocabulary.join(', ') : curSeq.vocabularyTopics.join(', ')}
- Skills: ${config.skills && config.skills.length > 0 ? config.skills.join(', ') : 'Reading, Grammar, Morphology, Writing'}
- Exam Type: ${config.examType}
- Duration: ${config.durationMinutes} minutes
- Total Score: ${config.totalPoints} points
- Difficulty: ${config.difficulty}
- Target CEFR Level: ${config.targetCEFR || 'A2'}
- Requested Reading Question Types: ${config.readingQuestionTypes.join(', ')} (Target points: ${config.readingPoints} pts)
- Requested Language Question Types: ${config.languageQuestionTypes.join(', ')} (Target points: ${config.languagePoints} pts)
- Requested Writing Type: ${config.writingType} (Target points: ${config.writingPoints} pts)
- Teacher's Custom Instructions: "${config.customInstructions || 'Generate a standard high-quality Algerian middle school test'}"
- Cultural Context Notes: "${config.culturalContext || 'Algerian middle school educational context'}"

Generate:
1. Descriptive Exam Title and header data.
2. An engaging, grade-appropriate reading passage with a clear title and simulated authentic source (adapted from educational magazines or youth books).
3. Section 1 (Reading Comprehension) with 2-3 structured activities totaling ${config.readingPoints} points.
4. Section 2 (Mastery of Language) with 2-3 structured activities (Grammar, Morphology, Phonetics / Pronunciation) totaling ${config.languagePoints} points.
5. Situation of Integration (Written Expression) totaling ${config.writingPoints} points, featuring a clear realistic scenario, task instructions, 3-4 bulleted cues, and an Algerian-standard 3-4 criterion grading rubric (Relevance, Linguistic Resources, Coherence, Organization).
6. Comprehensive, unambiguous Answer Key with full explanations.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.4,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          unitTitle: { type: Type.STRING },
          theme: { type: Type.STRING },
          instructions: { type: Type.STRING },
          headerConfig: {
            type: Type.OBJECT,
            properties: {
              republicTitle: { type: Type.STRING },
              ministryTitle: { type: Type.STRING },
              schoolName: { type: Type.STRING },
              wilaya: { type: Type.STRING },
              teacherName: { type: Type.STRING },
              classGrade: { type: Type.STRING },
              academicYear: { type: Type.STRING },
              examTitle: { type: Type.STRING },
              durationMinutes: { type: Type.INTEGER },
              totalPoints: { type: Type.NUMBER },
              datePlaceholder: { type: Type.STRING },
              studentNamePlaceholder: { type: Type.STRING }
            },
            required: [
              'republicTitle',
              'ministryTitle',
              'schoolName',
              'wilaya',
              'teacherName',
              'classGrade',
              'academicYear',
              'examTitle',
              'durationMinutes',
              'totalPoints'
            ]
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                instruction: { type: Type.STRING },
                type: { type: Type.STRING },
                passageTitle: { type: Type.STRING },
                passage: { type: Type.STRING },
                passageSource: { type: Type.STRING },
                points: { type: Type.NUMBER },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      type: { type: Type.STRING },
                      instruction: { type: Type.STRING },
                      question: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      points: { type: Type.NUMBER },
                      answer: { type: Type.STRING },
                      explanation: { type: Type.STRING }
                    },
                    required: ['id', 'type', 'instruction', 'question', 'points', 'answer']
                  }
                }
              },
              required: ['id', 'title', 'instruction', 'type', 'points', 'questions']
            }
          },
          writingTask: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              prompt: { type: Type.STRING },
              context: { type: Type.STRING },
              cues: { type: Type.ARRAY, items: { type: Type.STRING } },
              wordCountTarget: { type: Type.STRING },
              points: { type: Type.NUMBER },
              rubric: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    criterion: { type: Type.STRING },
                    points: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  },
                  required: ['criterion', 'points']
                }
              }
            },
            required: ['title', 'prompt', 'cues', 'points', 'rubric']
          }
        },
        required: ['title', 'unitTitle', 'theme', 'instructions', 'headerConfig', 'sections', 'writingTask']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  const now = new Date().toISOString();

  const generatedExam: ExamDocument = {
    id: `exam-${Date.now()}`,
    title: parsed.title || `${config.schoolYear} English ${config.examType} - ${config.theme}`,
    schoolYear: config.schoolYear,
    sequence: curSeq.sequenceTitle,
    unitTitle: parsed.unitTitle || config.theme,
    theme: parsed.theme || config.theme,
    examType: config.examType,
    durationMinutes: config.durationMinutes,
    totalPoints: config.totalPoints,
    difficulty: config.difficulty,
    targetCEFR: config.targetCEFR || 'A2',
    status: 'Final',
    instructions: parsed.instructions || 'Read the text carefully and answer all questions.',
    headerConfig: {
      republicTitle: parsed.headerConfig?.republicTitle || "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: parsed.headerConfig?.ministryTitle || 'MINISTRY OF NATIONAL EDUCATION',
      schoolName: parsed.headerConfig?.schoolName || 'CEM Emir Abdelkader',
      wilaya: parsed.headerConfig?.wilaya || 'Direction of Education - Alger Centre',
      teacherName: parsed.headerConfig?.teacherName || 'Teacher',
      classGrade: parsed.headerConfig?.classGrade || `Level: ${config.schoolYear}`,
      academicYear: parsed.headerConfig?.academicYear || '2026–2027',
      examTitle: parsed.headerConfig?.examTitle || parsed.title || 'First Term English Exam',
      durationMinutes: config.durationMinutes,
      totalPoints: config.totalPoints,
      datePlaceholder: '2026–2027',
      studentNamePlaceholder: `Full Name: .....................................................   Class: ${config.schoolYear} ...`
    },
    sections: (parsed.sections || []).map((sec: any, sIdx: number) => ({
      id: sec.id || `sec-${sIdx + 1}`,
      title: sec.title || `PART ONE: SECTION ${sIdx + 1}`,
      instruction: sec.instruction || 'Answer the following activities.',
      type: sec.type || (sIdx === 0 ? 'reading' : 'language'),
      passageTitle: sec.passageTitle,
      passage: sec.passage,
      passageSource: sec.passageSource,
      points: Number(sec.points) || (sIdx === 0 ? config.readingPoints : config.languagePoints),
      questions: (sec.questions || []).map((q: any, qIdx: number) => ({
        id: q.id || `q-${sIdx + 1}-${qIdx + 1}`,
        sectionId: sec.id || `sec-${sIdx + 1}`,
        type: q.type || 'wh_questions',
        instruction: q.instruction || `Activity ${qIdx + 1}:`,
        question: q.question || '',
        options: q.options || [],
        points: Number(q.points) || 1,
        answer: q.answer || '',
        explanation: q.explanation || '',
        difficulty: config.difficulty
      }))
    })),
    writingTask: {
      title: parsed.writingTask?.title || 'PART TWO: SITUATION OF INTEGRATION (WRITTEN EXPRESSION)',
      prompt: parsed.writingTask?.prompt || 'Write a short composition applying the sequence communicative competencies.',
      context: parsed.writingTask?.context || '',
      cues: parsed.writingTask?.cues || ['Introduction', 'Body paragraph with details', 'Conclusion'],
      wordCountTarget: parsed.writingTask?.wordCountTarget || (config.schoolYear === '1AM' ? '40-60 words' : config.schoolYear === '4AM' ? '80-120 words' : '60-80 words'),
      points: Number(parsed.writingTask?.points) || config.writingPoints,
      rubric: parsed.writingTask?.rubric || [
        { criterion: 'Relevance to the topic and format', points: 2 },
        { criterion: 'Use of appropriate linguistic resources (grammar & vocabulary)', points: 2 },
        { criterion: 'Coherence and organization of ideas', points: 1 },
        { criterion: 'Creativity, neatness, and punctuation', points: 1 }
      ]
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: [config.schoolYear, config.examType, config.theme, 'Official Standard'],
    createdAt: now,
    updatedAt: now
  };

  return generatedExam;
}

export async function validateExamWithAI(exam: ExamDocument, customApiKey?: string): Promise<AIQualityCheck> {
  const ai = getAiClient(customApiKey);

  const prompt = `You are a Senior Inspector of English for Algerian Middle Schools.
Review and validate this examination for ${exam.schoolYear} level:

Title: ${exam.title}
Level: ${exam.schoolYear}
Target Points: ${exam.totalPoints} pts
Exam Data:
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
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          curriculumAlignment: { type: Type.BOOLEAN },
          scoreMatch: { type: Type.BOOLEAN },
          feedback: { type: Type.ARRAY, items: { type: Type.STRING } },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['score', 'curriculumAlignment', 'scoreMatch', 'feedback', 'strengths', 'suggestions']
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function executeAiAssistant(
  action: string,
  payload: {
    text: string;
    context?: string;
    schoolYear?: SchoolYear;
    questionType?: string;
    targetYear?: SchoolYear;
  },
  customApiKey?: string
): Promise<{ result: string; alternatives?: string[] }> {
  const ai = getAiClient(customApiKey);

  let prompt = '';
  switch (action) {
    case 'improve_grammar':
      prompt = `Improve the grammar, clarity, and pedagogical quality of this text/question for Algerian ${payload.schoolYear || 'middle school'} English pupils:\n"${payload.text}"`;
      break;
    case 'simplify':
      prompt = `Simplify the vocabulary and sentence structure of this text/question so it is easier for Algerian ${payload.schoolYear || '1AM/2AM'} pupils:\n"${payload.text}"`;
      break;
    case 'make_difficult':
      prompt = `Make this question/text more challenging and intellectually stimulating for top Algerian ${payload.schoolYear || '4AM BEM'} pupils:\n"${payload.text}"`;
      break;
    case 'generate_alternatives':
      prompt = `Generate 3 high-quality alternative variations of this question/exercise testing the exact same linguistic objective for Algerian ${payload.schoolYear || 'middle school'} pupils:\nOriginal: "${payload.text}"\nContext: ${payload.context || ''}`;
      break;
    case 'similar_question':
      prompt = `Create another similar question of type "${payload.questionType || 'grammar'}" for ${payload.schoolYear || 'middle school'} on the same theme:\nBase: "${payload.text}"`;
      break;
    case 'regenerate_passage':
      prompt = `Write a fresh, brand new reading comprehension passage (120-180 words) for ${payload.schoolYear || '3AM'} Algerian pupils on the theme "${payload.text}". Include 3 paragraphs with rich, level-appropriate vocabulary.`;
      break;
    case 'adapt_year':
      prompt = `Adapt and rewrite this question/task originally for ${payload.schoolYear || '4AM'} so that it fits the syllabus and vocabulary level of ${payload.targetYear || '2AM'} Algerian pupils:\n"${payload.text}"`;
      break;
    default:
      prompt = `Rewrite and enhance the following pedagogical content for Algerian English teachers:\n"${payload.text}"`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      temperature: 0.5
    }
  });

  const textOutput = response.text || '';
  
  if (action === 'generate_alternatives') {
    const lines = textOutput.split('\n').filter(l => l.trim().length > 0);
    return {
      result: textOutput,
      alternatives: lines.slice(0, 3)
    };
  }

  return { result: textOutput };
}

export async function generateQuestionBankItems(
  params: {
    schoolYear: SchoolYear;
    unit: string;
    theme: string;
    grammar?: string;
    skill: string;
    count: number;
  },
  customApiKey?: string
): Promise<QuestionBankItem[]> {
  const ai = getAiClient(customApiKey);

  const prompt = `Generate ${params.count || 10} high-quality, reusable English exam questions/exercises tailored for Algerian ${params.schoolYear} middle school pupils.
Unit/Sequence: ${params.unit}
Theme: ${params.theme}
Target Grammar: ${params.grammar || 'General sequence grammar'}
Skill: ${params.skill}

Return valid JSON with an array of questions. Each question must include instruction, question text, type, answer, points, difficulty, and relevant tags.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            instruction: { type: Type.STRING },
            question: { type: Type.STRING },
            type: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            answer: { type: Type.STRING },
            points: { type: Type.NUMBER },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['instruction', 'question', 'type', 'answer', 'points', 'tags']
        }
      }
    }
  });

  const parsed = JSON.parse(response.text || '[]');
  const now = new Date().toISOString();

  return parsed.map((item: any, idx: number) => ({
    id: `qb-gen-${Date.now()}-${idx}`,
    question: item.question,
    instruction: item.instruction,
    type: item.type,
    schoolYear: params.schoolYear,
    unit: params.unit,
    theme: params.theme,
    grammar: params.grammar,
    skill: params.skill,
    difficulty: item.difficulty || 'Medium',
    answer: item.answer,
    points: Number(item.points) || 2,
    tags: item.tags || [params.schoolYear, params.theme],
    createdAt: now
  }));
}

export async function generateAlternativeExamVersion(originalExam: ExamDocument, customApiKey?: string): Promise<ExamDocument> {
  const ai = getAiClient(customApiKey);

  const config: ExamGenerationConfig = {
    schoolYear: originalExam.schoolYear,
    sequenceId: 'auto',
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
    readingQuestionTypes: ['true_false', 'wh_questions', 'find_synonyms_antonyms'],
    languagePoints: 7,
    languageQuestionTypes: ['put_verbs_in_brackets', 'transform_sentences', 'word_formation'],
    vocabularyPoints: 0,
    vocabularyQuestionTypes: [],
    writingPoints: 6,
    writingType: 'guided_writing',
    customInstructions: `Create an alternative Version B of: ${originalExam.title}. Different text and fresh questions on the same theme: ${originalExam.theme}`
  };

  const newExam = await generateExamWithGemini(config, customApiKey);
  newExam.title = `${originalExam.title} (Version B)`;
  newExam.tags = [...originalExam.tags, 'Version B'];
  return newExam;
}

export async function importAndParseExamWithAI(rawText: string, customApiKey?: string): Promise<ExamDocument> {
  const ai = getAiClient(customApiKey);

  const prompt = `Parse the following raw text or pasted English exam document and structure it into the standardized Algerian Middle School exam format.
Analyze the school year (1AM, 2AM, 3AM, or 4AM), extract the reading passage, all question activities with instructions and points, and the writing task.

RAW EXAM TEXT:
${rawText}

Return strictly formatted JSON according to the schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          schoolYear: { type: Type.STRING },
          sequence: { type: Type.STRING },
          theme: { type: Type.STRING },
          examType: { type: Type.STRING },
          durationMinutes: { type: Type.INTEGER },
          totalPoints: { type: Type.NUMBER },
          instructions: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                instruction: { type: Type.STRING },
                type: { type: Type.STRING },
                passageTitle: { type: Type.STRING },
                passage: { type: Type.STRING },
                points: { type: Type.NUMBER },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      type: { type: Type.STRING },
                      instruction: { type: Type.STRING },
                      question: { type: Type.STRING },
                      points: { type: Type.NUMBER },
                      answer: { type: Type.STRING }
                    },
                    required: ['id', 'type', 'instruction', 'question', 'points', 'answer']
                  }
                }
              },
              required: ['id', 'title', 'type', 'points', 'questions']
            }
          },
          writingTask: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              prompt: { type: Type.STRING },
              cues: { type: Type.ARRAY, items: { type: Type.STRING } },
              points: { type: Type.NUMBER }
            },
            required: ['title', 'prompt', 'points']
          }
        },
        required: ['title', 'schoolYear', 'sections', 'writingTask']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  const now = new Date().toISOString();
  const schoolYear = (['1AM', '2AM', '3AM', '4AM'].includes(parsed.schoolYear) ? parsed.schoolYear : '3AM') as SchoolYear;

  return {
    id: `exam-imported-${Date.now()}`,
    title: parsed.title || 'Imported English Exam',
    schoolYear,
    sequence: parsed.sequence || 'Imported Sequence',
    unitTitle: parsed.theme || 'Imported Unit',
    theme: parsed.theme || 'General English',
    examType: parsed.examType || 'Exam',
    durationMinutes: parsed.durationMinutes || 60,
    totalPoints: parsed.totalPoints || 20,
    difficulty: 'Medium',
    status: 'Draft',
    instructions: parsed.instructions || 'Read the text and answer the questions.',
    headerConfig: {
      republicTitle: "PEOPLE'S DEMOCRATIC REPUBLIC OF ALGERIA",
      ministryTitle: 'MINISTRY OF NATIONAL EDUCATION',
      schoolName: 'Middle School',
      wilaya: 'Direction of Education',
      teacherName: 'Teacher',
      classGrade: `Level: ${schoolYear}`,
      academicYear: '2026–2027',
      examTitle: parsed.title || 'English Examination',
      durationMinutes: parsed.durationMinutes || 60,
      totalPoints: parsed.totalPoints || 20,
      datePlaceholder: '2026–2027',
      studentNamePlaceholder: `Full Name: .....................................................   Class: ${schoolYear} ...`
    },
    sections: parsed.sections || [],
    writingTask: {
      title: parsed.writingTask?.title || 'PART TWO: WRITTEN EXPRESSION',
      prompt: parsed.writingTask?.prompt || 'Write a short paragraph.',
      cues: parsed.writingTask?.cues || [],
      points: parsed.writingTask?.points || 6,
      rubric: [
        { criterion: 'Relevance', points: 2 },
        { criterion: 'Grammar and vocabulary', points: 2 },
        { criterion: 'Coherence', points: 2 }
      ]
    },
    versionNumber: 1,
    versionsHistory: [],
    tags: ['Imported', schoolYear],
    createdAt: now,
    updatedAt: now
  };
}
