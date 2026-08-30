import { getSupabase } from './supabase';
import { ExamDocument, ExamTemplate, QuestionBankItem } from '../types';

const LOCAL_EXAMS_KEY = 'examcraft_local_exams';
const LOCAL_TEMPLATES_KEY = 'examcraft_local_templates';
const LOCAL_QB_KEY = 'examcraft_local_question_bank';

// Helper for local storage persistence
const LocalStorageHelper = {
  get<T>(key: string, defaultVal: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultVal;
    } catch {
      return defaultVal;
    }
  },
  set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      // ignore
    }
  }
};

export const UserDataService = {
  // Exams
  async getUserExams(userId: string): Promise<ExamDocument[]> {
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('data')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const list = data.map(d => d.data as ExamDocument);
          LocalStorageHelper.set(LOCAL_EXAMS_KEY, list);
          return list;
        }
      } catch (err) {
        console.warn('Supabase getExams error, falling back to local storage:', err);
      }
    }
    return LocalStorageHelper.get<ExamDocument[]>(LOCAL_EXAMS_KEY, []);
  },

  async saveUserExam(userId: string, exam: ExamDocument): Promise<void> {
    // 1. Always update local storage first for instant responsiveness
    const local = LocalStorageHelper.get<ExamDocument[]>(LOCAL_EXAMS_KEY, []);
    const existingIndex = local.findIndex(e => e.id === exam.id);
    const updatedExam = { ...exam, updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) {
      local[existingIndex] = updatedExam;
    } else {
      local.unshift(updatedExam);
    }
    LocalStorageHelper.set(LOCAL_EXAMS_KEY, local);

    // 2. Persist to Supabase if connected
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('exams')
          .upsert({
            id: exam.id,
            user_id: userId,
            data: updatedExam,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.warn('Supabase saveExam error:', err);
      }
    }
  },

  async deleteUserExam(userId: string, examId: string): Promise<void> {
    // 1. Update local storage
    const local = LocalStorageHelper.get<ExamDocument[]>(LOCAL_EXAMS_KEY, []);
    LocalStorageHelper.set(LOCAL_EXAMS_KEY, local.filter(e => e.id !== examId));

    // 2. Delete in Supabase if connected
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('exams')
          .delete()
          .eq('id', examId)
          .eq('user_id', userId);
      } catch (err) {
        console.warn('Supabase deleteExam error:', err);
      }
    }
  },

  // Templates
  async getUserTemplates(userId: string): Promise<ExamTemplate[]> {
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('data')
          .eq('user_id', userId);

        if (!error && data && data.length > 0) {
          const list = data.map(d => d.data as ExamTemplate);
          LocalStorageHelper.set(LOCAL_TEMPLATES_KEY, list);
          return list;
        }
      } catch (err) {
        console.warn('Supabase getTemplates error:', err);
      }
    }
    return LocalStorageHelper.get<ExamTemplate[]>(LOCAL_TEMPLATES_KEY, []);
  },

  async saveUserTemplate(userId: string, template: ExamTemplate): Promise<void> {
    const local = LocalStorageHelper.get<ExamTemplate[]>(LOCAL_TEMPLATES_KEY, []);
    const idx = local.findIndex(t => t.id === template.id);
    if (idx >= 0) local[idx] = template;
    else local.unshift(template);
    LocalStorageHelper.set(LOCAL_TEMPLATES_KEY, local);

    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('templates')
          .upsert({
            id: template.id,
            user_id: userId,
            data: template
          });
      } catch (err) {
        console.warn('Supabase saveTemplate error:', err);
      }
    }
  },

  async deleteUserTemplate(userId: string, templateId: string): Promise<void> {
    const local = LocalStorageHelper.get<ExamTemplate[]>(LOCAL_TEMPLATES_KEY, []);
    LocalStorageHelper.set(LOCAL_TEMPLATES_KEY, local.filter(t => t.id !== templateId));

    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('templates')
          .delete()
          .eq('id', templateId)
          .eq('user_id', userId);
      } catch (err) {
        console.warn('Supabase deleteTemplate error:', err);
      }
    }
  },

  // Question Bank
  async getUserQuestionBank(userId: string): Promise<QuestionBankItem[]> {
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        const { data, error } = await supabase
          .from('question_bank')
          .select('data')
          .eq('user_id', userId);

        if (!error && data && data.length > 0) {
          const list = data.map(d => d.data as QuestionBankItem);
          LocalStorageHelper.set(LOCAL_QB_KEY, list);
          return list;
        }
      } catch (err) {
        console.warn('Supabase getQuestionBank error:', err);
      }
    }
    return LocalStorageHelper.get<QuestionBankItem[]>(LOCAL_QB_KEY, []);
  },

  async saveUserQuestionBankItem(userId: string, item: QuestionBankItem): Promise<void> {
    const local = LocalStorageHelper.get<QuestionBankItem[]>(LOCAL_QB_KEY, []);
    const idx = local.findIndex(q => q.id === item.id);
    if (idx >= 0) local[idx] = item;
    else local.unshift(item);
    LocalStorageHelper.set(LOCAL_QB_KEY, local);

    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('question_bank')
          .upsert({
            id: item.id,
            user_id: userId,
            data: item
          });
      } catch (err) {
        console.warn('Supabase saveQuestionBank error:', err);
      }
    }
  },

  async deleteUserQuestionBankItem(userId: string, itemId: string): Promise<void> {
    const local = LocalStorageHelper.get<QuestionBankItem[]>(LOCAL_QB_KEY, []);
    LocalStorageHelper.set(LOCAL_QB_KEY, local.filter(q => q.id !== itemId));

    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        await supabase
          .from('question_bank')
          .delete()
          .eq('id', itemId)
          .eq('user_id', userId);
      } catch (err) {
        console.warn('Supabase deleteQuestionBank error:', err);
      }
    }
  },

  // Subscribe to real-time changes
  subscribeUserExams(userId: string, onUpdate: (exams: ExamDocument[]) => void) {
    const supabase = getSupabase();
    if (supabase && userId && !userId.startsWith('local_')) {
      try {
        const channel = supabase
          .channel(`exams-user-${userId}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'exams', filter: `user_id=eq.${userId}` },
            async () => {
              const latest = await this.getUserExams(userId);
              onUpdate(latest);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (err) {
        console.warn('Supabase realtime error:', err);
      }
    }
    return () => {};
  }
};
