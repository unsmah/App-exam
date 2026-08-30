import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Building,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Award,
  Layers,
  FileText,
  Key,
  LogOut,
  Download,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALGERIAN_WILAYAS, SchoolYear, TeacherRole, UserProfile } from '../types';
import { UserDataService } from '../lib/userDataService';

interface ProfileViewProps {
  lang: 'en' | 'fr' | 'both';
  onNavigateTab: (tab: string) => void;
  totalExamsCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  lang,
  onNavigateTab,
  totalExamsCount
}) => {
  const isFr = lang === 'fr';
  const { currentUser, userProfile, updateUserProfile, logout, sendPasswordReset } = useAuth();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    title: userProfile?.title || 'Teacher',
    displayName: userProfile?.displayName || 'Teacher Benali',
    email: userProfile?.email || 'teacher.benali@cem-algeria.dz',
    role: userProfile?.role || 'teacher',
    schoolName: userProfile?.schoolName || 'CEM Emir Abdelkader',
    wilaya: userProfile?.wilaya || '16 - Alger',
    commune: userProfile?.commune || 'Bab El Oued',
    academicYear: userProfile?.academicYear || '2024-2025',
    teachingLevels: userProfile?.teachingLevels || ['1AM', '2AM', '3AM', '4AM'],
    subject: userProfile?.subject || 'English Language',
    phoneNumber: userProfile?.phoneNumber || '',
    bio: userProfile?.bio || 'Middle school English teacher focusing on competency-based approach and BEM success.',
    defaultDuration: userProfile?.defaultDuration || 60,
    defaultPoints: userProfile?.defaultPoints || 20,
    defaultLanguage: userProfile?.defaultLanguage || 'en'
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state if userProfile updates
  useEffect(() => {
    if (userProfile) {
      setFormData({
        title: userProfile.title || 'Teacher',
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        role: userProfile.role || 'teacher',
        schoolName: userProfile.schoolName || '',
        wilaya: userProfile.wilaya || '16 - Alger',
        commune: userProfile.commune || '',
        academicYear: userProfile.academicYear || '2024-2025',
        teachingLevels: userProfile.teachingLevels || ['1AM', '2AM', '3AM', '4AM'],
        subject: userProfile.subject || 'English Language',
        phoneNumber: userProfile.phoneNumber || '',
        bio: userProfile.bio || '',
        defaultDuration: userProfile.defaultDuration || 60,
        defaultPoints: userProfile.defaultPoints || 20,
        defaultLanguage: userProfile.defaultLanguage || 'en'
      });
    }
  }, [userProfile]);

  const toggleLevel = (lvl: SchoolYear) => {
    const current = formData.teachingLevels || [];
    const next = current.includes(lvl) ? current.filter(l => l !== lvl) : [...current, lvl];
    setFormData({ ...formData, teachingLevels: next });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await updateUserProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) return;
    try {
      await sendPasswordReset(formData.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Could not send reset email');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fadeIn">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700/80 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : 'T'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {formData.title} {formData.displayName}
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified Teacher
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formData.schoolName || 'CEM Emir Abdelkader'}</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formData.wilaya}</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full">
                  {formData.role === 'head_of_department' ? (isFr ? 'Coordonnateur' : 'Head of Department') :
                   formData.role === 'inspector' ? (isFr ? 'Inspecteur' : 'Inspector') :
                   (isFr ? 'Enseignant CEM' : 'Middle School Teacher')}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {formData.academicYear}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <div className="text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center sm:text-right">
              <span className="font-bold text-white text-base block">{totalExamsCount}</span>
              <span className="text-[11px] text-slate-400">{isFr ? 'Sujets créés' : 'Exams created'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isFr ? 'Profil et paramètres mis à jour avec succès !' : 'Teacher profile & settings updated successfully!'}</span>
          </div>
        )}

        {/* Section 1: Teacher Personal & Professional Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isFr ? 'Identité & Informations Enseignant' : 'Teacher Credentials & Identity'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Profile Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Civilité' : 'Honorific / Title'}
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Teacher">Teacher</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Prof.">Prof.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Nom & Prénom' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.displayName || ''}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Adresse E-mail' : 'Email Address'}
              </label>
              <input
                type="email"
                disabled={Boolean(currentUser)}
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Managed via Firebase Auth</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Numéro de Téléphone' : 'Phone Contact (Optional)'}
              </label>
              <input
                type="tel"
                placeholder="05 / 06 / 07..."
                value={formData.phoneNumber || ''}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Rôle / Fonction' : 'Role in Middle School'}
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as TeacherRole })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                <option value="teacher">{isFr ? 'Enseignant d\'anglais' : 'English Teacher'}</option>
                <option value="head_of_department">{isFr ? 'Coordonnateur de matière' : 'Head of English Dept'}</option>
                <option value="inspector">{isFr ? 'Inspecteur / Formateur' : 'Educational Inspector'}</option>
                <option value="trainee">{isFr ? 'Enseignant Stagiaire' : 'Trainee Teacher'}</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">
              {isFr ? 'Biographie / Note pédagogique' : 'Teaching Philosophy & Notes'}
            </label>
            <textarea
              rows={2}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              placeholder="e.g. Specializing in 4AM BEM preparation and formative evaluation..."
            />
          </div>
        </div>

        {/* Section 2: School & Institution Info (CEM) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isFr ? 'Établissement & Wilaya (CEM)' : 'Middle School (CEM) & Regional Directorate'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Exam Header Info</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Nom du CEM' : 'Middle School Name (CEM)'} *
              </label>
              <input
                type="text"
                required
                value={formData.schoolName || ''}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Année Scolaire' : 'Academic Year'}
              </label>
              <input
                type="text"
                value={formData.academicYear || ''}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Wilaya' : 'Algerian Wilaya'} *
              </label>
              <select
                value={formData.wilaya}
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                {ALGERIAN_WILAYAS.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Commune / Daïra' : 'Commune / Municipality'}
              </label>
              <input
                type="text"
                value={formData.commune || ''}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isFr ? 'Matière' : 'Subject'}
              </label>
              <input
                type="text"
                value={formData.subject || 'English Language'}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Teaching Levels Assignment */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isFr ? 'Niveaux d\'Enseignement Assignés (1AM - 4AM)' : 'Active Teaching Levels & Classes'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Curriculum Scope</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: '1AM' as SchoolYear, label: '1AM', name: 'First Year', cefr: 'Pre-A1/A1', desc: 'Personal identity, daily routines' },
              { id: '2AM' as SchoolYear, label: '2AM', name: 'Second Year', cefr: 'A1/A2', desc: 'Shopping, travel, health' },
              { id: '3AM' as SchoolYear, label: '3AM', name: 'Third Year', cefr: 'A2', desc: 'Inventions, disasters, heritage' },
              { id: '4AM' as SchoolYear, label: '4AM', name: 'Fourth Year (BEM)', cefr: 'BEM Exam', desc: 'Landmarks, citizenship, BEM prep' }
            ].map(item => {
              const selected = formData.teachingLevels?.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleLevel(item.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-sm text-slate-900">{item.label}</span>
                    <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      {item.cefr}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Local Storage & Security */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isFr ? 'Stockage Local & Sauvegarde sur l\'appareil' : 'Local Device Storage & Data Backup'}
              </h3>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
              100% On-Device
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isFr ? 'Sauvegarder mes sujets (JSON)' : 'Export Backup Data (JSON)'}</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                {isFr
                  ? 'Téléchargez tous vos examens, modèles et questions dans un fichier de sauvegarde.'
                  : 'Download all your exams, templates, and question bank into a local backup file.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (currentUser) {
                    const data = UserDataService.exportAllLocalData(currentUser.uid);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ExamCraft_Backup_${formData.displayName?.replace(/\s+/g, '_') || 'Teacher'}_${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }
                }}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isFr ? 'Exporter Sauvegarde' : 'Download Backup File'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isFr ? 'Mot de passe local' : 'Local Password'}</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                {isFr
                  ? 'Votre mot de passe est enregistré en toute sécurité uniquement sur cet appareil.'
                  : 'Your credentials are stored securely on this phone without external transmission.'}
              </p>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{resetSent ? (isFr ? 'Réinitialisé à "password123"' : 'Reset to "password123"') : (isFr ? 'Réinitialiser Mot de Passe' : 'Reset Local Password')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="sticky bottom-4 bg-white/95 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isFr ? 'Retour au Tableau de bord' : 'Back to Dashboard'}
            </button>

            <button
              type="button"
              onClick={async () => {
                await logout();
              }}
              className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isFr ? 'Se Déconnecter' : 'Sign Out'}</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-900/20 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isFr ? 'Enregistrer les Modifications' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
