import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  Settings,
  GraduationCap,
  ChevronDown,
  Building,
  MapPin,
  Sparkles,
  Key,
  Shield,
  Layers,
  LogIn,
  UserPlus,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiKeyManager } from '../lib/apiKeyManager';
import { isSupabaseConfigured } from '../lib/supabase';

interface UserAccountMenuProps {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenApiKeyModal?: (tab?: 'gemini' | 'supabase') => void;
  lang: 'en' | 'fr' | 'both';
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({
  onOpenProfile,
  onOpenSettings,
  onOpenAuth,
  onOpenApiKeyModal,
  lang
}) => {
  const isFr = lang === 'fr';
  const { currentUser, userProfile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [hasApiKey, setHasApiKey] = useState(ApiKeyManager.hasGeminiKey());

  useEffect(() => {
    const handleKeyChange = () => {
      setHasApiKey(ApiKeyManager.hasGeminiKey());
    };
    window.addEventListener('examcraft-api-key-changed', handleKeyChange);
    return () => window.removeEventListener('examcraft-api-key-changed', handleKeyChange);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = userProfile?.displayName || currentUser?.displayName || 'Teacher';
  const email = userProfile?.email || currentUser?.email || '';
  const school = userProfile?.schoolName || 'CEM Emir Abdelkader';
  const wilaya = userProfile?.wilaya || '16 - Alger';
  const role = userProfile?.role || 'teacher';

  const roleBadgeText = {
    teacher: isFr ? 'Enseignant CEM' : 'CEM Teacher',
    head_of_department: isFr ? 'Coordonnateur' : 'Head of Dept',
    inspector: isFr ? 'Inspecteur' : 'Inspector',
    trainee: isFr ? 'Stagiaire' : 'Trainee'
  }[role] || (isFr ? 'Enseignant' : 'Teacher');

  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      {/* Quick AI Key Button on header */}
      {onOpenApiKeyModal && (
        <button
          onClick={() => onOpenApiKeyModal('gemini')}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
            hasApiKey
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 animate-pulse'
          }`}
          title={hasApiKey ? 'Gemini API Key Active' : 'Configure Free Gemini API Key'}
        >
          <Key className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">{hasApiKey ? 'AI Key ✓' : (isFr ? 'Clé IA (Gratuite)' : 'Set AI Key')}</span>
        </button>
      )}

      {/* If not logged in, show Login / Sign Up buttons */}
      {!currentUser ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{isFr ? 'Se connecter' : 'Log In'}</span>
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isFr ? 'S\'inscrire' : 'Sign Up'}</span>
          </button>
        </div>
      ) : (
        /* Authenticated Avatar Button */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left pr-1">
            <div className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">
              {displayName}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold leading-tight">
              {roleBadgeText}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && currentUser && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-sm truncate">{displayName}</div>
                <div className="text-xs text-slate-500 truncate">{email}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {roleBadgeText}
                  </span>
                </div>
              </div>
            </div>

            {/* School & Wilaya summary */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{school}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{wilaya}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="py-1.5 text-xs">
            <button
              onClick={() => {
                onOpenProfile();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>{isFr ? 'Mon Profil Enseignant & Compte' : 'Teacher Profile & Account'}</span>
            </button>

            {onOpenApiKeyModal && (
              <button
                onClick={() => {
                  onOpenApiKeyModal('gemini');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 transition-colors"
              >
                <Key className="w-4 h-4 text-emerald-600" />
                <span>{isFr ? 'Clé API Gemini & Supabase' : 'Gemini API Key & Supabase'}</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenSettings();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>{isFr ? 'Paramètres d\'en-tête & Préférences' : 'Exam Header & Preferences'}</span>
            </button>

            <button
              onClick={() => {
                onOpenAuth('login');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>{isFr ? 'Changer de compte' : 'Switch Account'}</span>
            </button>
          </div>

          {/* Logout */}
          <div className="pt-1 border-t border-slate-100">
            <button
              onClick={async () => {
                setIsOpen(false);
                await logout();
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 text-xs flex items-center gap-2.5 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>{isFr ? 'Se déconnecter' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
