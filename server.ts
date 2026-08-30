import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { ALGERIAN_CURRICULUM } from './src/data/curriculum';
import { INITIAL_EXAMS, INITIAL_TEMPLATES, INITIAL_QUESTION_BANK, INITIAL_SCHOOL_PROFILE } from './src/data/initialData';
import {
  generateExamWithGemini,
  validateExamWithAI,
  executeAiAssistant,
  generateQuestionBankItems,
  generateAlternativeExamVersion,
  importAndParseExamWithAI
} from './server/geminiService';
import { ExamDocument, ExamTemplate, QuestionBankItem, SchoolProfile } from './src/types';

// In-memory persistent database store (with pre-populated Algerian mock data)
let examsDb: ExamDocument[] = [...INITIAL_EXAMS];
let templatesDb: ExamTemplate[] = [...INITIAL_TEMPLATES];
let questionBankDb: QuestionBankItem[] = [...INITIAL_QUESTION_BANK];
let profileDb: SchoolProfile = { ...INITIAL_SCHOOL_PROFILE };

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // ================= API ROUTES FIRST =================

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'ExamCraft DZ' });
  });

  // Curriculum API
  app.get('/api/curriculum', (req, res) => {
    const { year } = req.query;
    if (year && typeof year === 'string') {
      const filtered = ALGERIAN_CURRICULUM.filter(s => s.schoolYear.toLowerCase() === year.toLowerCase());
      return res.json(filtered);
    }
    return res.json(ALGERIAN_CURRICULUM);
  });

  // Exams API
  app.get('/api/exams', (_req, res) => {
    res.json(examsDb);
  });

  app.get('/api/exams/:id', (req, res) => {
    const exam = examsDb.find(e => e.id === req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  });

  app.post('/api/exams', (req, res) => {
    const newExam: ExamDocument = req.body;
    if (!newExam.id) {
      newExam.id = `exam-${Date.now()}`;
    }
    newExam.createdAt = newExam.createdAt || new Date().toISOString();
    newExam.updatedAt = new Date().toISOString();
    examsDb.unshift(newExam);
    res.status(201).json(newExam);
  });

  app.put('/api/exams/:id', (req, res) => {
    const index = examsDb.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    const updatedExam: ExamDocument = {
      ...examsDb[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    examsDb[index] = updatedExam;
    res.json(updatedExam);
  });

  app.delete('/api/exams/:id', (req, res) => {
    const index = examsDb.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    const deleted = examsDb.splice(index, 1)[0];
    res.json({ message: 'Exam deleted', exam: deleted });
  });

  // Templates API
  app.get('/api/templates', (_req, res) => {
    res.json(templatesDb);
  });

  app.post('/api/templates', (req, res) => {
    const newTemplate: ExamTemplate = {
      ...req.body,
      id: req.body.id || `tmpl-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    templatesDb.unshift(newTemplate);
    res.status(201).json(newTemplate);
  });

  app.delete('/api/templates/:id', (req, res) => {
    templatesDb = templatesDb.filter(t => t.id !== req.params.id);
    res.json({ message: 'Template removed' });
  });

  // Question Bank API
  app.get('/api/question-bank', (req, res) => {
    const { year, skill, search } = req.query;
    let list = [...questionBankDb];
    if (year && typeof year === 'string') {
      list = list.filter(q => q.schoolYear === year);
    }
    if (skill && typeof skill === 'string') {
      list = list.filter(q => q.skill.toLowerCase() === skill.toLowerCase());
    }
    if (search && typeof search === 'string') {
      const qLower = search.toLowerCase();
      list = list.filter(q => 
        q.question.toLowerCase().includes(qLower) || 
        q.theme.toLowerCase().includes(qLower) ||
        (q.grammar && q.grammar.toLowerCase().includes(qLower))
      );
    }
    res.json(list);
  });

  app.post('/api/question-bank', (req, res) => {
    const newItem: QuestionBankItem = {
      ...req.body,
      id: req.body.id || `qb-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    questionBankDb.unshift(newItem);
    res.status(201).json(newItem);
  });

  app.delete('/api/question-bank/:id', (req, res) => {
    questionBankDb = questionBankDb.filter(q => q.id !== req.params.id);
    res.json({ message: 'Question removed' });
  });

  // School Profile & Settings
  app.get('/api/profile', (_req, res) => {
    res.json(profileDb);
  });

  app.put('/api/profile', (req, res) => {
    profileDb = { ...profileDb, ...req.body };
    res.json(profileDb);
  });

  // AI Generation API Endpoints
  app.post('/api/generate-exam', async (req, res) => {
    try {
      const config = req.body;
      const exam = await generateExamWithGemini(config);
      // Auto save to DB
      examsDb.unshift(exam);
      res.json(exam);
    } catch (err: any) {
      console.error('Error generating exam with Gemini:', err);
      res.status(500).json({
        error: err.message || 'Failed to generate exam. Please check server logs and try again.'
      });
    }
  });

  app.post('/api/validate-exam', async (req, res) => {
    try {
      const exam = req.body;
      const qualityCheck = await validateExamWithAI(exam);
      res.json(qualityCheck);
    } catch (err: any) {
      console.error('Error validating exam:', err);
      res.status(500).json({ error: err.message || 'Validation failed' });
    }
  });

  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { action, payload } = req.body;
      const result = await executeAiAssistant(action, payload);
      res.json(result);
    } catch (err: any) {
      console.error('Error in AI Assistant:', err);
      res.status(500).json({ error: err.message || 'AI assistant request failed' });
    }
  });

  app.post('/api/generate-questions', async (req, res) => {
    try {
      const params = req.body;
      const items = await generateQuestionBankItems(params);
      // Add to DB
      questionBankDb = [...items, ...questionBankDb];
      res.json(items);
    } catch (err: any) {
      console.error('Error generating question bank items:', err);
      res.status(500).json({ error: err.message || 'Question bank generation failed' });
    }
  });

  app.post('/api/generate-alternative-version', async (req, res) => {
    try {
      const { exam } = req.body;
      const altExam = await generateAlternativeExamVersion(exam);
      examsDb.unshift(altExam);
      res.json(altExam);
    } catch (err: any) {
      console.error('Error generating alternative exam:', err);
      res.status(500).json({ error: err.message || 'Alternative version generation failed' });
    }
  });

  app.post('/api/import-exam', async (req, res) => {
    try {
      const { text } = req.body;
      const importedExam = await importAndParseExamWithAI(text);
      examsDb.unshift(importedExam);
      res.json(importedExam);
    } catch (err: any) {
      console.error('Error importing exam:', err);
      res.status(500).json({ error: err.message || 'Exam import failed' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ExamCraft DZ Server running on http://localhost:${PORT}`);
  });
}

startServer();
