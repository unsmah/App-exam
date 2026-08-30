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
import { UserProfile, TeacherRole, SchoolProfile, SchoolYear } from '../types';

const LOCAL_USER_STORAGE_KEY = 'dz_examcraft_local_teacher_profile';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isLocalMode: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  createLocalAccount: (email: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  loginAsGuest: () => void;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLocalMode, setIsLocalMode] = useState<boolean>(() => {
    return !!localStorage.getItem(LOCAL_USER_STORAGE_KEY);
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Listen to Auth State changes
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsLocalMode(false);
        // Fetch or create profile doc in Firestore
        const userRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const prof = docSnap.data() as UserProfile;
            setUserProfile(prof);
            localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(prof));
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
            localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(newProfile));
          }

          // Listen to real-time changes to user profile
          unsubProfile = onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
              const prof = snap.data() as UserProfile;
              setUserProfile(prof);
              localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(prof));
            }
          });

          setLoading(false);
        } catch (err) {
          console.warn('Firestore profile sync error, using cached local profile:', err);
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Teacher',
            photoURL: user.photoURL || undefined,
            ...DEFAULT_PROFILE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setUserProfile(prev => prev || fallbackProfile);
          setLoading(false);
        }
      } else {
        // If not logged into Firebase, check if user had an active local account
        try {
          const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
          if (stored) {
            setUserProfile(JSON.parse(stored));
            setIsLocalMode(true);
          } else {
            setUserProfile(null);
            setIsLocalMode(false);
          }
        } catch {
          setUserProfile(null);
        }
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsLocalMode(false);
    } catch (err: any) {
      // If Firebase failed or user previously registered locally with this email
      const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
      if (stored) {
        const localProf: UserProfile = JSON.parse(stored);
        if (localProf.email?.toLowerCase() === email.toLowerCase()) {
          setUserProfile(localProf);
          setIsLocalMode(true);
          return;
        }
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        try {
          await updateFirebaseProfile(cred.user, { displayName });
        } catch (e) {
          console.warn('Could not update Firebase auth display name:', e);
        }

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

        try {
          const userRef = doc(db, 'users', cred.user.uid);
          await setDoc(userRef, newProfile);
        } catch (e) {
          console.warn('Could not write profile to Firestore:', e);
        }

        setUserProfile(newProfile);
        localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(newProfile));
        setIsLocalMode(false);
      }
    } catch (err: any) {
      console.error('Firebase signUp error:', err);
      // If operation is not allowed or offline, automatically allow fallback creation or throw to prompt
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createLocalAccount = async (email: string, displayName: string, extra?: Partial<UserProfile>) => {
    const localId = `local-teacher-${Date.now()}`;
    const newProfile: UserProfile = {
      uid: localId,
      email: email || 'teacher@examcraft.dz',
      displayName: displayName || 'Teacher',
      ...DEFAULT_PROFILE,
      ...extra,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUserProfile(newProfile);
    setIsLocalMode(true);
    localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(newProfile));
  };

  const loginAsGuest = () => {
    const guestId = `guest-teacher-${Date.now()}`;
    const guestProfile: UserProfile = {
      uid: guestId,
      email: 'guest.teacher@education.dz',
      displayName: 'Teacher Guest (CEM)',
      ...DEFAULT_PROFILE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUserProfile(guestProfile);
    setIsLocalMode(true);
    localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(guestProfile));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        setIsLocalMode(false);
        const userRef = doc(db, 'users', res.user.uid);
        try {
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
            localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(newProfile));
          }
        } catch (e) {
          console.warn('Could not sync Google user profile to Firestore:', e);
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
    } catch (e) {
      console.warn('SignOut warning:', e);
    } finally {
      localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
      setUserProfile(null);
      setIsLocalMode(false);
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) throw new Error('Not authenticated');
    
    const updated: UserProfile = {
      ...userProfile,
      ...data,
      updatedAt: new Date().toISOString()
    };
    setUserProfile(updated);
    localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(updated));

    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          ...data,
          updatedAt: new Date().toISOString()
        });
        if (data.displayName && data.displayName !== currentUser.displayName) {
          await updateFirebaseProfile(currentUser, { displayName: data.displayName });
        }
      } catch (e) {
        console.warn('Could not update Firestore profile:', e);
      }
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
        isLocalMode,
        login,
        signUp,
        signInWithGoogle,
        logout,
        updateUserProfile,
        sendPasswordReset,
        createLocalAccount,
        loginAsGuest
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

