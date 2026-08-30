import React, { useState } from 'react';
import { 
  Settings, 
  GraduationCap, 
  Save, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Sliders,
  Globe
} from 'lucide-react';
import { SchoolProfile } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-600" />
          <span>{isFr ? 'Paramètres & Profil de l\'Établissement' : 'Settings & School Profile'}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isFr ? 'Personnalisez vos informations d\'établissement pour l\'en-tête officiel des sujets' : 'Configure your middle school credentials, default exam parameters, and AI preferences'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Teacher Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{isFr ? 'Informations Enseignant' : 'Teacher Information'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Teacher Full Name:</label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email / Contact:</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* School (CEM) Info */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isFr ? 'Établissement & Wilaya (CEM)' : 'Middle School (CEM) Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">School Name (CEM):</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Wilaya / Direction de l'Éducation:</label>
              <input
                type="text"
                value={formData.wilaya}
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Academic Year:</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Exam Defaults */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>{isFr ? 'Paramètres d\'Examen par Défaut' : 'Default Exam Preferences'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Duration:</label>
              <select
                value={formData.defaultDurationMinutes || 60}
                onChange={(e) => setFormData({ ...formData, defaultDurationMinutes: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
              >
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes (1 Hour)</option>
                <option value={90}>90 minutes (1.5 Hours / BEM)</option>
                <option value={120}>120 minutes (2 Hours)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Score:</label>
              <input
                type="number"
                value={formData.defaultTotalPoints || 20}
                onChange={(e) => setFormData({ ...formData, defaultTotalPoints: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Interface Language:</label>
              <button
                type="button"
                onClick={onToggleLang}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-left font-bold flex items-center justify-between hover:bg-slate-100"
              >
                <span>{lang.toUpperCase()}</span>
                <Globe className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>{isFr ? 'Paramètres enregistrés avec succès !' : 'Settings saved successfully!'}</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isFr ? 'Enregistrer les Modifications' : 'Save Profile & Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
