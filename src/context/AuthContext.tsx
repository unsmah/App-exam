import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { UserProfile, TeacherRole, SchoolProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PROFILE: Omit<UserProfile, 'uid' | 'email' | 'displayName' | 'createdAt' | 'updatedAt'> = {
  title: 'Teacher',
  role: 'teacher',
  schoolName: 'CEM Emir Abdelkader',
  wilaya: '16 - Alger',
  commune: 'Bab El Oued',
  academicYear: '2024-2025',
  teachingLevels: ['1AM', '2AM', '3AM', '4AM'],
  subject: 'English Language',
  defaultDuration: 60,
  defaultPoints: 20,
  defaultLanguage: 'en',
  bio: 'Middle school English teacher passionate about modern pedagogy and Algerian curriculum standards.'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Listen to Auth State changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or create profile doc in Firestore
        const userRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Initialize new user profile document
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || 'Teacher',
              photoURL: user.photoURL || undefined,
              ...DEFAULT_PROFILE,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          }

          // Listen to real-time changes to user profile
          const unsubProfile = onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
              setUserProfile(snap.data() as UserProfile);
            }
          });

          setLoading(false);
          return () => unsubProfile();
        } catch (err) {
          console.error('Error fetching user profile from Firestore:', err);
          // Fallback profile if Firestore is offline or restricted
          setUserProfile({
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Teacher',
            photoURL: user.photoURL || undefined,
            ...DEFAULT_PROFILE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await updateFirebaseProfile(cred.user, { displayName });
        const userRef = doc(db, 'users', cred.user.uid);
        const newProfile: UserProfile = {
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: displayName || 'Teacher',
          photoURL: cred.user.photoURL || undefined,
          ...DEFAULT_PROFILE,
          ...extra,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        const userRef = doc(db, 'users', res.user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          const newProfile: UserProfile = {
            uid: res.user.uid,
            email: res.user.email || '',
            displayName: res.user.displayName || 'Teacher',
            photoURL: res.user.photoURL || undefined,
            ...DEFAULT_PROFILE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('Not authenticated');
    
    const userRef = doc(db, 'users', currentUser.uid);
    const updated = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(userRef, updated);
    setUserProfile(prev => prev ? { ...prev, ...updated } : null);

    if (data.displayName && data.displayName !== currentUser.displayName) {
      await updateFirebaseProfile(currentUser, { displayName: data.displayName });
    }
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        login,
        signUp,
        signInWithGoogle,
        logout,
        updateUserProfile,
        sendPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
