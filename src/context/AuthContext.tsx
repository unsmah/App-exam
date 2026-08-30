import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, SchoolYear, TeacherRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isCloudConnected: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, displayName: string, extra?: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  loginAsGuest: (profileName?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_PROFILE_KEY = 'examcraft_user_profile';
const LOCAL_GUEST_USER_KEY = 'examcraft_guest_user';

const DEFAULT_PROFILE_VALUES: Omit<UserProfile, 'uid' | 'email' | 'displayName' | 'createdAt' | 'updatedAt'> = {
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
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(isSupabaseConfigured());

  // Load profile from Supabase profiles table or local storage
  const loadProfile = async (user: User) => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          const profile: UserProfile = {
            uid: user.id,
            email: user.email || data.email || '',
            displayName: data.display_name || user.user_metadata?.full_name || 'Teacher',
            title: data.title || 'Teacher',
            photoURL: data.photo_url || user.user_metadata?.avatar_url,
            role: (data.role as TeacherRole) || 'teacher',
            schoolName: data.school_name || 'CEM Emir Abdelkader',
            wilaya: data.wilaya || '16 - Alger',
            commune: data.commune || 'Bab El Oued',
            academicYear: data.academic_year || '2024-2025',
            teachingLevels: data.teaching_levels || ['1AM', '2AM', '3AM', '4AM'],
            subject: data.subject || 'English Language',
            phoneNumber: data.phone_number || '',
            bio: data.bio || '',
            defaultDuration: data.default_duration || 60,
            defaultPoints: data.default_points || 20,
            defaultLanguage: data.default_language || 'en',
            createdAt: data.created_at || new Date().toISOString(),
            updatedAt: data.updated_at || new Date().toISOString()
          };
          setUserProfile(profile);
          localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
          return profile;
        }
      } catch (err) {
        console.warn('Could not load profile from Supabase profiles table:', err);
      }
    }

    // Fallback or Initial Profile creation
    const stored = localStorage.getItem(LOCAL_PROFILE_KEY);
    let fallbackProfile: UserProfile;
    if (stored) {
      try {
        fallbackProfile = {
          ...JSON.parse(stored),
          uid: user.id,
          email: user.email || JSON.parse(stored).email
        };
      } catch {
        fallbackProfile = createDefaultProfile(user);
      }
    } else {
      fallbackProfile = createDefaultProfile(user);
    }

    setUserProfile(fallbackProfile);
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(fallbackProfile));
    return fallbackProfile;
  };

  const createDefaultProfile = (user: User): UserProfile => ({
    uid: user.id,
    email: user.email || '',
    displayName: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Teacher',
    photoURL: user.user_metadata?.avatar_url || undefined,
    ...DEFAULT_PROFILE_VALUES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Check initial session & subscribe to Supabase Auth state changes
  useEffect(() => {
    const supabase = getSupabase();
    setIsCloudConnected(Boolean(supabase));

    if (!supabase) {
      // Offline / Local Teacher session
      const savedGuest = localStorage.getItem(LOCAL_GUEST_USER_KEY);
      const savedProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (savedGuest && savedProfile) {
        try {
          setCurrentUser(JSON.parse(savedGuest));
          setUserProfile(JSON.parse(savedProfile));
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        loadProfile(session.user).finally(() => setLoading(false));
      } else {
        // Check if there was a local profile
        const savedProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
        if (savedProfile) {
          try {
            setUserProfile(JSON.parse(savedProfile));
          } catch {
            // ignore
          }
        }
        setCurrentUser(null);
        setLoading(false);
      }
    });

    // 2. Listen to Auth State changes (including Google OAuth redirect return)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        await loadProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      // Local login fallback
      const mockUser = {
        id: `local_${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: { full_name: email.split('@')[0] },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;
      setCurrentUser(mockUser);
      localStorage.setItem(LOCAL_GUEST_USER_KEY, JSON.stringify(mockUser));
      const prof: UserProfile = {
        uid: mockUser.id,
        email,
        displayName: email.split('@')[0] || 'Teacher',
        ...DEFAULT_PROFILE_VALUES,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUserProfile(prof);
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(prof));
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      if (error) throw error;
      if (data.user) {
        setCurrentUser(data.user);
        await loadProfile(data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    pass: string,
    displayName: string,
    extra?: Partial<UserProfile>
  ) => {
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      // Local signup fallback
      const mockUser = {
        id: `local_${Date.now()}`,
        email,
        app_metadata: {},
        user_metadata: { full_name: displayName },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;
      setCurrentUser(mockUser);
      localStorage.setItem(LOCAL_GUEST_USER_KEY, JSON.stringify(mockUser));
      const prof: UserProfile = {
        uid: mockUser.id,
        email,
        displayName,
        ...DEFAULT_PROFILE_VALUES,
        ...extra,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUserProfile(prof);
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(prof));
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: displayName
          }
        }
      });
      if (error) throw error;

      if (data.user) {
        setCurrentUser(data.user);
        const newProf: UserProfile = {
          uid: data.user.id,
          email: data.user.email || email,
          displayName,
          ...DEFAULT_PROFILE_VALUES,
          ...extra,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setUserProfile(newProf);
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(newProf));

        // Save into Supabase profiles table if available
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email: newProf.email,
            display_name: newProf.displayName,
            title: newProf.title,
            role: newProf.role,
            school_name: newProf.schoolName,
            wilaya: newProf.wilaya,
            commune: newProf.commune,
            academic_year: newProf.academicYear,
            teaching_levels: newProf.teachingLevels,
            subject: newProf.subject,
            phone_number: newProf.phoneNumber,
            bio: newProf.bio,
            default_duration: newProf.defaultDuration,
            default_points: newProf.defaultPoints,
            default_language: newProf.defaultLanguage,
            created_at: newProf.createdAt,
            updated_at: newProf.updatedAt
          });
        } catch (tableErr) {
          console.warn('Profiles table upsert notice:', tableErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error(
        'Supabase is not configured yet. Please configure your Supabase URL & Anon Key in AI & Cloud Settings to enable Google Sign-In.'
      );
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    localStorage.removeItem(LOCAL_GUEST_USER_KEY);
    setCurrentUser(null);
    setUserProfile(null);
    setLoading(false);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    const updated = {
      ...(userProfile || { uid: currentUser?.id || 'local_user', email: currentUser?.email || '' }),
      ...data,
      updatedAt: new Date().toISOString()
    } as UserProfile;

    setUserProfile(updated);
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updated));

    const supabase = getSupabase();
    if (supabase && currentUser && !currentUser.id.startsWith('local_')) {
      try {
        await supabase.from('profiles').upsert({
          id: currentUser.id,
          email: updated.email,
          display_name: updated.displayName,
          title: updated.title,
          role: updated.role,
          school_name: updated.schoolName,
          wilaya: updated.wilaya,
          commune: updated.commune,
          academic_year: updated.academicYear,
          teaching_levels: updated.teachingLevels,
          subject: updated.subject,
          phone_number: updated.phoneNumber,
          bio: updated.bio,
          default_duration: updated.defaultDuration,
          default_points: updated.defaultPoints,
          default_language: updated.defaultLanguage,
          updated_at: updated.updatedAt
        });
      } catch (err) {
        console.warn('Error saving profile to Supabase table:', err);
      }
    }
  };

  const sendPasswordReset = async (email: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase is not configured yet.');
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
  };

  const loginAsGuest = (profileName: string = 'Teacher Benali') => {
    const guestUser = {
      id: `local_guest_${Date.now()}`,
      email: 'teacher@guest.local',
      app_metadata: {},
      user_metadata: { full_name: profileName },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as unknown as User;

    const guestProf: UserProfile = {
      uid: guestUser.id,
      email: 'teacher@guest.local',
      displayName: profileName,
      ...DEFAULT_PROFILE_VALUES,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCurrentUser(guestUser);
    setUserProfile(guestProf);
    localStorage.setItem(LOCAL_GUEST_USER_KEY, JSON.stringify(guestUser));
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(guestProf));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isCloudConnected,
        login,
        signUp,
        signInWithGoogle,
        logout,
        updateUserProfile,
        sendPasswordReset,
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
