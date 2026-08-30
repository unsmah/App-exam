import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  HelpCircle,
  Zap,
  Layers
} from 'lucide-react';
import { ApiKeyManager } from '../lib/apiKeyManager';
import { isSupabaseConfigured, getSupabaseConfig } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'fr' | 'both';
  initialTab?: 'gemini' | 'supabase';
}

const SUPABASE_SQL_SCHEMA = `-- 1. Enable Supabase UUID & Extensions
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  title text,
  role text default 'teacher',
  school_name text,
  wilaya text,
  commune text,
  academic_year text,
  teaching_levels text[],
  subject text default 'English Language',
  phone_number text,
  bio text,
  default_duration integer default 60,
  default_points integer default 20,
  default_language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for all using (auth.uid() = id);

-- 2. Exams Table
create table if not exists public.exams (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.exams enable row level security;
create policy "Users can manage own exams" on public.exams for all using (auth.uid() = user_id);

-- 3. Templates Table
create table if not exists public.templates (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.templates enable row level security;
create policy "Users can manage own templates" on public.templates for all using (auth.uid() = user_id);

-- 4. Question Bank Table
create table if not exists public.question_bank (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.question_bank enable row level security;
create policy "Users can manage own questions" on public.question_bank for all using (auth.uid() = user_id);
`;

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTab = 'gemini'
}) => {
  const isFr = lang === 'fr';
  const [activeTab, setActiveTab] = useState<'gemini' | 'supabase'>(initialTab);

  // Gemini state
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [showGeminiKey, setShowGeminiKey] = useState<boolean>(false);
  const [testingGemini, setTestingGemini] = useState<boolean>(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');
  const [showSupabaseKey, setShowSupabaseKey] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [supabaseSaved, setSupabaseSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setGeminiKey(ApiKeyManager.getGeminiKey());
      const supa = ApiKeyManager.getCustomSupabaseConfig();
      setSupabaseUrl(supa.url);
      setSupabaseKey(supa.anonKey);
      setGeminiTestStatus(null);
      setSupabaseSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveGeminiKey = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    ApiKeyManager.setGeminiKey(geminiKey.trim());
    setGeminiTestStatus({
      success: true,
      message: isFr ? 'Clé API Gemini enregistrée avec succès !' : 'Gemini API Key saved successfully!'
    });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleTestGeminiKey = async () => {
    if (!geminiKey.trim()) {
      setGeminiTestStatus({
        success: false,
        message: isFr ? 'Veuillez saisir une clé API Gemini.' : 'Please enter a Gemini API key first.'
      });
      return;
    }
    setTestingGemini(true);
    setGeminiTestStatus(null);
    try {
      const res = await fetch('/api/health', {
        headers: {
          'x-gemini-api-key': geminiKey.trim()
        }
      });
      if (res.ok) {
        setGeminiTestStatus({
          success: true,
          message: isFr ? 'Connexion réussie ! Clé valide.' : 'Connection verified! Your API key is valid and ready.'
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || (isFr ? 'Clé API invalide ou expirée.' : 'Invalid or expired API Key.'));
      }
    } catch (err: any) {
      setGeminiTestStatus({
        success: false,
        message: err.message || (isFr ? 'Échec du test de clé.' : 'Key test failed. Check key accuracy.')
      });
    } finally {
      setTestingGemini(false);
    }
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    ApiKeyManager.setCustomSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setSupabaseSaved(true);
    setTimeout(() => setSupabaseSaved(false), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isFr ? 'Configuration API & Base de données' : 'API Keys & Cloud Configuration'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isFr ? 'Gérez votre clé Gemini et vos identifiants Supabase' : 'Manage your personal Gemini API key and Supabase cloud database'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('gemini')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'gemini'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Gemini API {ApiKeyManager.hasGeminiKey() && '✓'}</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'supabase'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Cloud {isSupabaseConfigured() && '✓'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
          {/* TAB 1: GEMINI API KEY */}
          {activeTab === 'gemini' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isFr ? 'Clé API Gemini Gratuite' : 'Free Google Gemini API Key'}</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  {isFr
                    ? 'Vous pouvez obtenir une clé API Gemini 100% gratuite sur Google AI Studio en 10 secondes. Elle permet de générer des sujets, activités et corrigés sans limite.'
                    : 'You can generate a 100% free Gemini API key on Google AI Studio in 10 seconds. It powers AI exam generation, answer keys, and pedagogical assistants.'}
                </p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-1"
                >
                  <span>{isFr ? 'Obtenir ma clé gratuite sur Google AI Studio' : 'Get my free key on Google AI Studio'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <form onSubmit={handleSaveGeminiKey} className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isFr ? 'Votre clé API Gemini :' : 'Your Gemini API Key:'}
                  </label>
                  <div className="relative">
                    <input
                      type={showGeminiKey ? 'text' : 'password'}
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full p-2.5 pr-10 font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGeminiKey(!showGeminiKey)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isFr
                      ? 'Stockée en toute sécurité dans votre navigateur local (localStorage).'
                      : 'Saved safely in your browser local storage.'}
                  </p>
                </div>

                {geminiTestStatus && (
                  <div
                    className={`p-3 rounded-lg border flex items-center gap-2 text-xs ${
                      geminiTestStatus.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    {geminiTestStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{geminiTestStatus.message}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleTestGeminiKey}
                    disabled={testingGemini || !geminiKey.trim()}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {testingGemini
                      ? (isFr ? 'Test en cours...' : 'Testing...')
                      : (isFr ? 'Tester la connexion' : 'Test Connection')}
                  </button>

                  <div className="flex items-center gap-2">
                    {ApiKeyManager.hasGeminiKey() && (
                      <button
                        type="button"
                        onClick={() => {
                          ApiKeyManager.removeGeminiKey();
                          setGeminiKey('');
                          setGeminiTestStatus({
                            success: true,
                            message: isFr ? 'Clé effacée.' : 'Key cleared.'
                          });
                        }}
                        className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold transition-colors"
                      >
                        {isFr ? 'Effacer' : 'Clear'}
                      </button>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-xs transition-colors"
                    >
                      {isFr ? 'Enregistrer la clé' : 'Save API Key'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SUPABASE CLOUD */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isFr ? 'Supabase Auth & Base de données' : 'Supabase Auth & Database'}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isFr
                    ? 'Connectez votre propre projet Supabase pour synchroniser vos sujets dans le cloud et activer Google Login sans restriction.'
                    : 'Connect your own Supabase project for real-time cloud sync and seamless Google OAuth sign-in.'}
                </p>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-0.5"
                >
                  <span>{isFr ? 'Ouvrir le tableau de bord Supabase' : 'Open Supabase Dashboard'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <form onSubmit={handleSaveSupabaseConfig} className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isFr ? 'URL du projet Supabase :' : 'Supabase Project URL:'}
                  </label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzproject.supabase.co"
                    className="w-full p-2.5 font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isFr ? 'Clé Publique Anon (Anon Key) :' : 'Supabase Anon Public Key:'}
                  </label>
                  <div className="relative">
                    <input
                      type={showSupabaseKey ? 'text' : 'password'}
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full p-2.5 pr-10 font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSupabaseKey(!showSupabaseKey)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showSupabaseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {supabaseSaved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isFr ? 'Configuration Supabase enregistrée !' : 'Supabase credentials saved!'}</span>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-xs transition-colors"
                  >
                    {isFr ? 'Enregistrer Supabase' : 'Save Supabase Settings'}
                  </button>
                </div>
              </form>

              {/* SQL Migration Helper */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isFr ? 'Script SQL des Tables Supabase' : 'Supabase SQL Tables Script'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    {copiedSql ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSql ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Copier le SQL' : 'Copy SQL')}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  {isFr
                    ? 'Copiez ce script et collez-le dans le "SQL Editor" de Supabase pour créer automatiquement les tables (profiles, exams, templates, question_bank).'
                    : 'Copy and paste this script into your Supabase project\'s "SQL Editor" to create the required tables with 1 click.'}
                </p>
                <pre className="p-3 bg-slate-900 text-emerald-300 font-mono text-[10px] rounded-lg max-h-36 overflow-y-auto select-all">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
