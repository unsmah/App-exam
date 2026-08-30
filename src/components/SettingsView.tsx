import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  GraduationCap, 
  Save, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Sliders,
  Globe,
  Key,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Check,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SchoolProfile } from '../types';
import { ApiKeyManager } from '../lib/apiKeyManager';
import { isSupabaseConfigured, getSupabaseConfig } from '../lib/supabase';

interface SettingsViewProps {
  profile: SchoolProfile;
  onSaveProfile: (profile: SchoolProfile) => void;
  lang: 'en' | 'fr' | 'both';
  onToggleLang: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onSaveProfile,
  lang,
  onToggleLang
}) => {
  const isFr = lang === 'fr';

  const [formData, setFormData] = useState<SchoolProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Gemini API Key State
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [showGeminiKey, setShowGeminiKey] = useState<boolean>(false);
  const [testingGemini, setTestingGemini] = useState<boolean>(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Supabase State
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');
  const [showSupabaseKey, setShowSupabaseKey] = useState<boolean>(false);
  const [supabaseSaved, setSupabaseSaved] = useState<boolean>(false);

  useEffect(() => {
    setGeminiKey(ApiKeyManager.getGeminiKey());
    const supa = ApiKeyManager.getCustomSupabaseConfig();
    setSupabaseUrl(supa.url);
    setSupabaseKey(supa.anonKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    ApiKeyManager.setGeminiKey(geminiKey.trim());
    ApiKeyManager.setCustomSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
          message: isFr ? 'Clé vérifiée et active !' : 'Key verified & ready!'
        });
      } else {
        throw new Error('Server returned an error');
      }
    } catch (err: any) {
      setGeminiTestStatus({
        success: false,
        message: err.message || (isFr ? 'Échec de la validation.' : 'Verification failed.')
      });
    } finally {
      setTestingGemini(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-600" />
          <span>{isFr ? 'Paramètres & Configuration' : 'Settings & Cloud Configuration'}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isFr ? 'Gérez vos clés API Gemini, base de données Supabase et informations d\'établissement' : 'Configure your Gemini AI keys, Supabase cloud database, and official Algerian school headers'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= SECTION 1: GEMINI API KEY ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{isFr ? 'Clé API Google Gemini (IA Gratuite)' : 'Google Gemini API Key (Free)'}</span>
            </h3>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
            >
              <span>{isFr ? 'Obtenir une clé gratuite' : 'Get Free API Key'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs space-y-1">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isFr ? 'Contrôlez vos propres requêtes IA' : 'Own your AI generation limits for free'}</span>
            </div>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              {isFr
                ? 'Insérez votre clé gratuite de Google AI Studio pour générer instantanément des sujets complets, exercices ciblés et corrigés types.'
                : 'Enter your personal Gemini API key to generate official exams, reading passages, and pedagogical exercises without rate limits.'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {isFr ? 'Clé API Gemini :' : 'Gemini API Key:'}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type={showGeminiKey ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-8 pr-9 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showGeminiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleTestGeminiKey}
                disabled={testingGemini || !geminiKey.trim()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
              >
                {testingGemini ? (isFr ? 'Test...' : 'Testing...') : (isFr ? 'Tester' : 'Test Key')}
              </button>
            </div>

            {geminiTestStatus && (
              <div
                className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                  geminiTestStatus.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {geminiTestStatus.success ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                )}
                <span>{geminiTestStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* ================= SECTION 2: SUPABASE CLOUD ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>{isFr ? 'Base de données Supabase Cloud' : 'Supabase Cloud Database & Auth'}</span>
            </h3>

            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
            >
              <span>{isFr ? 'Dashboard Supabase' : 'Supabase Dashboard'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'URL Supabase :' : 'Supabase URL:'}
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyz.supabase.co"
                className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Clé Publique Anon :' : 'Anon Public Key:'}
              </label>
              <div className="relative">
                <input
                  type={showSupabaseKey ? 'text' : 'password'}
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full p-2 pr-8 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSupabaseKey(!showSupabaseKey)}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  {showSupabaseKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: TEACHER & SCHOOL HEADERS ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{isFr ? 'Informations Enseignant & Établissement (CEM)' : 'Teacher & CEM Middle School Information'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Teacher Full Name:</label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email / Contact:</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">School Name (CEM):</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Wilaya / Direction de l'Éducation:</label>
              <input
                type="text"
                value={formData.wilaya}
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Academic Year:</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Duration:</label>
              <select
                value={formData.defaultDurationMinutes || 60}
                onChange={(e) => setFormData({ ...formData, defaultDurationMinutes: Number(e.target.value) })}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes (1 Hour)</option>
                <option value={90}>90 minutes (1.5 Hours / BEM)</option>
                <option value={120}>120 minutes (2 Hours)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>{isFr ? 'Paramètres et clés enregistrés !' : 'Settings and keys saved successfully!'}</span>
            </div>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isFr ? 'Enregistrer Tous les Paramètres' : 'Save All Settings & Keys'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
