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

export const UserDataService = {
  // Exams
  async getUserExams(userId: string): Promise<ExamDocument[]> {
    try {
      const colRef = collection(db, 'users', userId, 'exams');
      const snap = await getDocs(query(colRef, orderBy('updatedAt', 'desc')));
      return snap.docs.map(d => d.data() as ExamDocument);
    } catch (err) {
      console.warn('Could not fetch user exams from Firestore:', err);
      return [];
    }
  },

  async saveUserExam(userId: string, exam: ExamDocument): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'exams', exam.id);
      await setDoc(docRef, {
        ...exam,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error saving exam to Firestore:', err);
    }
  },

  async deleteUserExam(userId: string, examId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'exams', examId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting exam from Firestore:', err);
    }
  },

  // Templates
  async getUserTemplates(userId: string): Promise<ExamTemplate[]> {
    try {
      const colRef = collection(db, 'users', userId, 'templates');
      const snap = await getDocs(colRef);
      return snap.docs.map(d => d.data() as ExamTemplate);
    } catch (err) {
      console.warn('Could not fetch user templates:', err);
      return [];
    }
  },

  async saveUserTemplate(userId: string, template: ExamTemplate): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'templates', template.id);
      await setDoc(docRef, template);
    } catch (err) {
      console.error('Error saving template:', err);
    }
  },

  async deleteUserTemplate(userId: string, templateId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'templates', templateId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting template:', err);
    }
  },

  // Question Bank
  async getUserQuestionBank(userId: string): Promise<QuestionBankItem[]> {
    try {
      const colRef = collection(db, 'users', userId, 'question_bank');
      const snap = await getDocs(colRef);
      return snap.docs.map(d => d.data() as QuestionBankItem);
    } catch (err) {
      console.warn('Could not fetch user question bank:', err);
      return [];
    }
  },

  async saveUserQuestionBankItem(userId: string, item: QuestionBankItem): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'question_bank', item.id);
      await setDoc(docRef, item);
    } catch (err) {
      console.error('Error saving question bank item:', err);
    }
  },

  async deleteUserQuestionBankItem(userId: string, itemId: string): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId, 'question_bank', itemId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting question bank item:', err);
    }
  },

  // Subscribe to real-time exam changes
  subscribeUserExams(userId: string, onUpdate: (exams: ExamDocument[]) => void) {
    const colRef = collection(db, 'users', userId, 'exams');
    return onSnapshot(colRef, (snapshot) => {
      const exams = snapshot.docs.map(d => d.data() as ExamDocument);
      // sort by updatedAt desc
      exams.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
      onUpdate(exams);
    }, (error) => {
      console.warn('Exams snapshot listener error:', error);
    });
  }
};
