import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { ExamDocument, ExamTemplate, QuestionBankItem } from '../types';

const LOCAL_EXAMS_KEY = 'dz_examcraft_local_exams';
const LOCAL_TEMPLATES_KEY = 'dz_examcraft_local_templates';
const LOCAL_QBANK_KEY = 'dz_examcraft_local_qbank';

function getLocal<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocal<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

export const UserDataService = {
  // Exams
  async getUserExams(userId: string): Promise<ExamDocument[]> {
    const localList = getLocal<ExamDocument>(`${LOCAL_EXAMS_KEY}_${userId}`);
    try {
      const colRef = collection(db, 'users', userId, 'exams');
      const snap = await getDocs(query(colRef, orderBy('updatedAt', 'desc')));
      if (!snap.empty) {
        const remoteList = snap.docs.map(d => d.data() as ExamDocument);
        // Merge with local list (prefer newest)
        const map = new Map<string, ExamDocument>();
        localList.forEach(e => map.set(e.id, e));
        remoteList.forEach(e => map.set(e.id, e));
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
        );
        setLocal(`${LOCAL_EXAMS_KEY}_${userId}`, merged);
        return merged;
      }
    } catch (err) {
      console.warn('Firestore offline/fallback for exams:', err);
    }
    return localList;
  },

  async saveUserExam(userId: string, exam: ExamDocument): Promise<void> {
    const updatedExam = {
      ...exam,
      updatedAt: new Date().toISOString()
    };

    // 1. Always save locally immediately
    const localList = getLocal<ExamDocument>(`${LOCAL_EXAMS_KEY}_${userId}`);
    const filtered = localList.filter(e => e.id !== exam.id);
    setLocal(`${LOCAL_EXAMS_KEY}_${userId}`, [updatedExam, ...filtered]);

    // 2. Persist to Firestore if online
    try {
      const docRef = doc(db, 'users', userId, 'exams', exam.id);
      await setDoc(docRef, updatedExam);
    } catch (err) {
      console.warn('Could not sync exam to Firestore (cached locally):', err);
    }
  },

  async deleteUserExam(userId: string, examId: string): Promise<void> {
    const localList = getLocal<ExamDocument>(`${LOCAL_EXAMS_KEY}_${userId}`);
    setLocal(`${LOCAL_EXAMS_KEY}_${userId}`, localList.filter(e => e.id !== examId));

    try {
      const docRef = doc(db, 'users', userId, 'exams', examId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Could not delete exam from Firestore:', err);
    }
  },

  // Templates
  async getUserTemplates(userId: string): Promise<ExamTemplate[]> {
    const localList = getLocal<ExamTemplate>(`${LOCAL_TEMPLATES_KEY}_${userId}`);
    try {
      const colRef = collection(db, 'users', userId, 'templates');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const remoteList = snap.docs.map(d => d.data() as ExamTemplate);
        const map = new Map<string, ExamTemplate>();
        localList.forEach(t => map.set(t.id, t));
        remoteList.forEach(t => map.set(t.id, t));
        const merged = Array.from(map.values());
        setLocal(`${LOCAL_TEMPLATES_KEY}_${userId}`, merged);
        return merged;
      }
    } catch (err) {
      console.warn('Firestore offline/fallback for templates:', err);
    }
    return localList;
  },

  async saveUserTemplate(userId: string, template: ExamTemplate): Promise<void> {
    const localList = getLocal<ExamTemplate>(`${LOCAL_TEMPLATES_KEY}_${userId}`);
    const filtered = localList.filter(t => t.id !== template.id);
    setLocal(`${LOCAL_TEMPLATES_KEY}_${userId}`, [template, ...filtered]);

    try {
      const docRef = doc(db, 'users', userId, 'templates', template.id);
      await setDoc(docRef, template);
    } catch (err) {
      console.warn('Could not sync template to Firestore (cached locally):', err);
    }
  },

  async deleteUserTemplate(userId: string, templateId: string): Promise<void> {
    const localList = getLocal<ExamTemplate>(`${LOCAL_TEMPLATES_KEY}_${userId}`);
    setLocal(`${LOCAL_TEMPLATES_KEY}_${userId}`, localList.filter(t => t.id !== templateId));

    try {
      const docRef = doc(db, 'users', userId, 'templates', templateId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Could not delete template from Firestore:', err);
    }
  },

  // Question Bank
  async getUserQuestionBank(userId: string): Promise<QuestionBankItem[]> {
    const localList = getLocal<QuestionBankItem>(`${LOCAL_QBANK_KEY}_${userId}`);
    try {
      const colRef = collection(db, 'users', userId, 'question_bank');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const remoteList = snap.docs.map(d => d.data() as QuestionBankItem);
        const map = new Map<string, QuestionBankItem>();
        localList.forEach(q => map.set(q.id, q));
        remoteList.forEach(q => map.set(q.id, q));
        const merged = Array.from(map.values());
        setLocal(`${LOCAL_QBANK_KEY}_${userId}`, merged);
        return merged;
      }
    } catch (err) {
      console.warn('Firestore offline/fallback for question bank:', err);
    }
    return localList;
  },

  async saveUserQuestionBankItem(userId: string, item: QuestionBankItem): Promise<void> {
    const localList = getLocal<QuestionBankItem>(`${LOCAL_QBANK_KEY}_${userId}`);
    const filtered = localList.filter(q => q.id !== item.id);
    setLocal(`${LOCAL_QBANK_KEY}_${userId}`, [item, ...filtered]);

    try {
      const docRef = doc(db, 'users', userId, 'question_bank', item.id);
      await setDoc(docRef, item);
    } catch (err) {
      console.warn('Could not sync question item to Firestore (cached locally):', err);
    }
  },

  async deleteUserQuestionBankItem(userId: string, itemId: string): Promise<void> {
    const localList = getLocal<QuestionBankItem>(`${LOCAL_QBANK_KEY}_${userId}`);
    setLocal(`${LOCAL_QBANK_KEY}_${userId}`, localList.filter(q => q.id !== itemId));

    try {
      const docRef = doc(db, 'users', userId, 'question_bank', itemId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Could not delete question item from Firestore:', err);
    }
  },

  // Subscribe to real-time exam changes
  subscribeUserExams(userId: string, onUpdate: (exams: ExamDocument[]) => void) {
    try {
      const colRef = collection(db, 'users', userId, 'exams');
      return onSnapshot(colRef, (snapshot) => {
        const exams = snapshot.docs.map(d => d.data() as ExamDocument);
        exams.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
        setLocal(`${LOCAL_EXAMS_KEY}_${userId}`, exams);
        onUpdate(exams);
      }, (error) => {
        console.warn('Exams snapshot listener fallback to local cache:', error);
        onUpdate(getLocal<ExamDocument>(`${LOCAL_EXAMS_KEY}_${userId}`));
      });
    } catch {
      onUpdate(getLocal<ExamDocument>(`${LOCAL_EXAMS_KEY}_${userId}`));
      return () => {};
    }
  }
};

