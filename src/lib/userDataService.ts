import { ExamDocument, ExamTemplate, QuestionBankItem } from '../types';
import { INITIAL_EXAMS, INITIAL_TEMPLATES, INITIAL_QUESTION_BANK } from '../data/initialData';

const LOCAL_EXAMS_PREFIX = 'dz_examcraft_local_exams_';
const LOCAL_TEMPLATES_PREFIX = 'dz_examcraft_local_templates_';
const LOCAL_QBANK_PREFIX = 'dz_examcraft_local_qbank_';

function getLocalList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return [];
  }
}

function setLocalList<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const UserDataService = {
  // EXAMS CRUD
  async getUserExams(userId: string): Promise<ExamDocument[]> {
    const key = `${LOCAL_EXAMS_PREFIX}${userId}`;
    const list = getLocalList<ExamDocument>(key);
    if (list && list.length > 0) {
      return list;
    }
    // Seed new user with initial Algerian curriculum sample exams
    setLocalList(key, INITIAL_EXAMS);
    return INITIAL_EXAMS;
  },

  async saveUserExam(userId: string, exam: ExamDocument): Promise<void> {
    const key = `${LOCAL_EXAMS_PREFIX}${userId}`;
    const list = getLocalList<ExamDocument>(key);
    const updatedExam: ExamDocument = {
      ...exam,
      updatedAt: new Date().toISOString()
    };
    const filtered = list.filter(e => e.id !== exam.id);
    const updatedList = [updatedExam, ...filtered];
    setLocalList(key, updatedList);
  },

  async deleteUserExam(userId: string, examId: string): Promise<void> {
    const key = `${LOCAL_EXAMS_PREFIX}${userId}`;
    const list = getLocalList<ExamDocument>(key);
    const updatedList = list.filter(e => e.id !== examId);
    setLocalList(key, updatedList);
  },

  // TEMPLATES CRUD
  async getUserTemplates(userId: string): Promise<ExamTemplate[]> {
    const key = `${LOCAL_TEMPLATES_PREFIX}${userId}`;
    const list = getLocalList<ExamTemplate>(key);
    if (list && list.length > 0) {
      return list;
    }
    setLocalList(key, INITIAL_TEMPLATES);
    return INITIAL_TEMPLATES;
  },

  async saveUserTemplate(userId: string, template: ExamTemplate): Promise<void> {
    const key = `${LOCAL_TEMPLATES_PREFIX}${userId}`;
    const list = getLocalList<ExamTemplate>(key);
    const filtered = list.filter(t => t.id !== template.id);
    setLocalList(key, [template, ...filtered]);
  },

  async deleteUserTemplate(userId: string, templateId: string): Promise<void> {
    const key = `${LOCAL_TEMPLATES_PREFIX}${userId}`;
    const list = getLocalList<ExamTemplate>(key);
    setLocalList(key, list.filter(t => t.id !== templateId));
  },

  // QUESTION BANK CRUD
  async getUserQuestionBank(userId: string): Promise<QuestionBankItem[]> {
    const key = `${LOCAL_QBANK_PREFIX}${userId}`;
    const list = getLocalList<QuestionBankItem>(key);
    if (list && list.length > 0) {
      return list;
    }
    setLocalList(key, INITIAL_QUESTION_BANK);
    return INITIAL_QUESTION_BANK;
  },

  async saveUserQuestionBankItem(userId: string, item: QuestionBankItem): Promise<void> {
    const key = `${LOCAL_QBANK_PREFIX}${userId}`;
    const list = getLocalList<QuestionBankItem>(key);
    const filtered = list.filter(q => q.id !== item.id);
    setLocalList(key, [item, ...filtered]);
  },

  async deleteUserQuestionBankItem(userId: string, itemId: string): Promise<void> {
    const key = `${LOCAL_QBANK_PREFIX}${userId}`;
    const list = getLocalList<QuestionBankItem>(key);
    setLocalList(key, list.filter(q => q.id !== itemId));
  },

  // SUBSCRIPTION / LISTENER (Local Storage Polling / Event based)
  subscribeUserExams(userId: string, onUpdate: (exams: ExamDocument[]) => void): () => void {
    const key = `${LOCAL_EXAMS_PREFIX}${userId}`;
    const exams = getLocalList<ExamDocument>(key);
    onUpdate(exams.length > 0 ? exams : INITIAL_EXAMS);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          onUpdate(parsed);
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },

  // BACKUP & RESTORE DATA
  exportAllLocalData(userId: string): string {
    const exams = getLocalList<ExamDocument>(`${LOCAL_EXAMS_PREFIX}${userId}`);
    const templates = getLocalList<ExamTemplate>(`${LOCAL_TEMPLATES_PREFIX}${userId}`);
    const questionBank = getLocalList<QuestionBankItem>(`${LOCAL_QBANK_PREFIX}${userId}`);

    const backup = {
      version: '2.0-local-algeria',
      exportedAt: new Date().toISOString(),
      userId,
      exams,
      templates,
      questionBank
    };

    return JSON.stringify(backup, null, 2);
  },

  importAllLocalData(userId: string, jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.exams)) {
        setLocalList(`${LOCAL_EXAMS_PREFIX}${userId}`, parsed.exams);
      }
      if (Array.isArray(parsed.templates)) {
        setLocalList(`${LOCAL_TEMPLATES_PREFIX}${userId}`, parsed.templates);
      }
      if (Array.isArray(parsed.questionBank)) {
        setLocalList(`${LOCAL_QBANK_PREFIX}${userId}`, parsed.questionBank);
      }
      return true;
    } catch (err) {
      console.error('Failed to import backup JSON:', err);
      return false;
    }
  }
};
