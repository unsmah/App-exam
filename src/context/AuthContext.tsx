import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, TeacherRole, SchoolProfile, SchoolYear } from '../types';

export interface LocalTeacherAccount {
  id: string;
  email: string;
  password?: string;
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

const LOCAL_ACCOUNTS_KEY = 'dz_examcraft_accounts_registry_v2';
const ACTIVE_SESSION_KEY = 'dz_examcraft_active_session_uid_v2';

const DEFAULT_PROFILE_CONFIG: Omit<UserProfile, 'uid' | 'email' | 'displayName' | 'createdAt' | 'updatedAt'> = {
  title: 'Mr.',
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
  bio: 'Middle school English teacher passionate about modern Algerian curriculum and BEM preparation.'
};

// Seed default demo teacher account
const DEMO_TEACHER: LocalTeacherAccount = {
  id: 'teacher-cem-alger-demo',
  email: 'teacher.benali@cem-algeria.dz',
  password: 'password123',
  profile: {
    uid: 'teacher-cem-alger-demo',
    email: 'teacher.benali@cem-algeria.dz',
    displayName: 'Teacher Benali',
    title: 'Mr.',
    role: 'teacher',
    schoolName: 'CEM Emir Abdelkader',
    wilaya: '16 - Alger',
    commune: 'Bab El Oued',
    academicYear: '2024-2025',
    teachingLevels: ['1AM', '2AM', '3AM', '4AM'],
    subject: 'English Language',
    bio: 'Middle school English teacher focusing on competency-based approach and BEM success.',
    defaultDuration: 60,
    defaultPoints: 20,
    defaultLanguage: 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

function getStoredAccounts(): LocalTeacherAccount[] {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    if (!raw) {
      // Initialize with demo account
      localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify([DEMO_TEACHER]));
      return [DEMO_TEACHER];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEMO_TEACHER];
  } catch {
    return [DEMO_TEACHER];
  }
}

function saveStoredAccounts(accounts: LocalTeacherAccount[]): void {
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save local accounts to localStorage:', e);
  }
}

interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isLocalMode: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  sendPasswordReset: (email: string, newPassword?: string) => Promise<void>;
  createLocalAccount: (email: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  loginAsGuest: () => void;
  getAllLocalAccounts: () => LocalTeacherAccount[];
  switchLocalAccount: (accountId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    try {
      const accounts = getStoredAccounts();
      const activeUid = localStorage.getItem(ACTIVE_SESSION_KEY);

      let activeAccount: LocalTeacherAccount | undefined;
      if (activeUid) {
        activeAccount = accounts.find(a => a.id === activeUid);
      }

      // If there's an active account or automatically log in the first account if previously active
      if (activeAccount) {
        setCurrentUser({
          uid: activeAccount.id,
          email: activeAccount.email,
          displayName: activeAccount.profile.displayName || activeAccount.email.split('@')[0]
        });
        setUserProfile(activeAccount.profile);
      } else if (activeUid === 'guest') {
        setCurrentUser({
          uid: DEMO_TEACHER.id,
          email: DEMO_TEACHER.email,
          displayName: DEMO_TEACHER.profile.displayName
        });
        setUserProfile(DEMO_TEACHER.profile);
      } else {
        // No active session
        setCurrentUser(null);
        setUserProfile(null);
      }
    } catch (e) {
      console.warn('Session init error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    const accounts = getStoredAccounts();

    const matched = accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (!matched) {
      // Auto-create or reject if invalid
      throw new Error(
        'Account not found. Please create a new account or check your email.'
      );
    }

    if (matched.password && matched.password !== cleanPass) {
      throw new Error('Incorrect password. Please try again or reset your password.');
    }

    // Set active session
    localStorage.setItem(ACTIVE_SESSION_KEY, matched.id);
    setCurrentUser({
      uid: matched.id,
      email: matched.email,
      displayName: matched.profile.displayName
    });
    setUserProfile(matched.profile);
  };

  const signUp = async (
    email: string,
    pass: string,
    displayName: string,
    extra?: Partial<UserProfile>
  ): Promise<void> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    const cleanName = displayName.trim();
    const accounts = getStoredAccounts();

    // Check if email already exists
    const existingIndex = accounts.findIndex(a => a.email.toLowerCase() === cleanEmail);
    const newUid = `teacher-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const newProfile: UserProfile = {
      uid: newUid,
      email: cleanEmail,
      displayName: cleanName || 'Teacher',
      ...DEFAULT_PROFILE_CONFIG,
      ...extra,
      createdAt: now,
      updatedAt: now
    };

    const newAccount: LocalTeacherAccount = {
      id: newUid,
      email: cleanEmail,
      password: cleanPass || 'password123',
      profile: newProfile,
      createdAt: now,
      updatedAt: now
    };

    let updatedAccounts: LocalTeacherAccount[];
    if (existingIndex >= 0) {
      // Update existing account
      updatedAccounts = [...accounts];
      updatedAccounts[existingIndex] = newAccount;
    } else {
      updatedAccounts = [newAccount, ...accounts];
    }

    saveStoredAccounts(updatedAccounts);
    localStorage.setItem(ACTIVE_SESSION_KEY, newUid);

    setCurrentUser({
      uid: newUid,
      email: cleanEmail,
      displayName: cleanName
    });
    setUserProfile(newProfile);
  };

  const createLocalAccount = async (
    email: string,
    displayName: string,
    extra?: Partial<UserProfile>
  ): Promise<void> => {
    await signUp(email, 'password123', displayName, extra);
  };

  const loginAsGuest = (): void => {
    const accounts = getStoredAccounts();
    const demo = accounts.find(a => a.id === DEMO_TEACHER.id) || DEMO_TEACHER;
    localStorage.setItem(ACTIVE_SESSION_KEY, demo.id);
    setCurrentUser({
      uid: demo.id,
      email: demo.email,
      displayName: demo.profile.displayName
    });
    setUserProfile(demo.profile);
  };

  const signInWithGoogle = async (): Promise<void> => {
    // In local standalone mode, automatically login to active account or guest
    loginAsGuest();
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!userProfile || !currentUser) {
      throw new Error('Not authenticated');
    }

    const updatedProfile: UserProfile = {
      ...userProfile,
      ...data,
      updatedAt: new Date().toISOString()
    };

    const accounts = getStoredAccounts();
    const index = accounts.findIndex(a => a.id === currentUser.uid);
    if (index >= 0) {
      accounts[index] = {
        ...accounts[index],
        profile: updatedProfile,
        updatedAt: new Date().toISOString()
      };
      saveStoredAccounts(accounts);
    }

    setUserProfile(updatedProfile);
    if (data.displayName) {
      setCurrentUser(prev => prev ? { ...prev, displayName: data.displayName! } : null);
    }
  };

  const sendPasswordReset = async (email: string, newPassword?: string): Promise<void> => {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = getStoredAccounts();
    const target = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (!target) {
      throw new Error('No account found with this email address.');
    }

    if (newPassword) {
      target.password = newPassword;
      target.updatedAt = new Date().toISOString();
      saveStoredAccounts(accounts);
    }
  };

  const getAllLocalAccounts = (): LocalTeacherAccount[] => {
    return getStoredAccounts();
  };

  const switchLocalAccount = (accountId: string): void => {
    const accounts = getStoredAccounts();
    const matched = accounts.find(a => a.id === accountId);
    if (matched) {
      localStorage.setItem(ACTIVE_SESSION_KEY, matched.id);
      setCurrentUser({
        uid: matched.id,
        email: matched.email,
        displayName: matched.profile.displayName
      });
      setUserProfile(matched.profile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isLocalMode: true,
        login,
        signUp,
        signInWithGoogle,
        logout,
        updateUserProfile,
        sendPasswordReset,
        createLocalAccount,
        loginAsGuest,
        getAllLocalAccounts,
        switchLocalAccount
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
