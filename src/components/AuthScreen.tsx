import React, { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  MapPin,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  Zap,
  Smartphone,
  Check,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALGERIAN_WILAYAS, SchoolYear, TeacherRole } from '../types';

interface AuthScreenProps {
  lang: 'en' | 'fr' | 'both';
  onToggleLang: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ lang, onToggleLang }) => {
  const isFr = lang === 'fr';
  const { login, signUp, sendPasswordReset, loginAsGuest, getAllLocalAccounts, switchLocalAccount } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [title, setTitle] = useState('Mr.');
  const [role, setRole] = useState<TeacherRole>('teacher');
  const [schoolName, setSchoolName] = useState('CEM Emir Abdelkader');
  const [wilaya, setWilaya] = useState('16 - Alger');
  const [commune, setCommune] = useState('Bab El Oued');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [teachingLevels, setTeachingLevels] = useState<SchoolYear[]>(['1AM', '2AM', '3AM', '4AM']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const localAccounts = getAllLocalAccounts();

  const toggleLevel = (lvl: SchoolYear) => {
    setTeachingLevels(prev =>
      prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password) {
          throw new Error(isFr ? 'Veuillez saisir votre e-mail et mot de passe.' : 'Please enter your email and password.');
        }
        await login(email.trim(), password);
      } else if (mode === 'signup') {
        if (!email.trim() || !password || !displayName.trim()) {
          throw new Error(isFr ? 'Veuillez renseigner votre nom, email et mot de passe.' : 'Please fill in your name, email and password.');
        }
        if (password.length < 4) {
          throw new Error(isFr ? 'Le mot de passe doit comporter au moins 4 caractères.' : 'Password must be at least 4 characters.');
        }
        await signUp(email.trim(), password, displayName.trim(), {
          title,
          role,
          schoolName: schoolName.trim() || 'CEM Emir Abdelkader',
          wilaya,
          commune: commune.trim() || 'Alger',
          academicYear,
          teachingLevels
        });
      } else if (mode === 'reset') {
        if (!email.trim()) {
          throw new Error(isFr ? 'Veuillez saisir votre adresse e-mail.' : 'Please enter your email address.');
        }
        await sendPasswordReset(email.trim(), 'password123');
        setSuccessMessage(
          isFr
            ? 'Mot de passe réinitialisé avec succès à "password123". Vous pouvez vous connecter !'
            : 'Password successfully reset to "password123". You can now log in!'
        );
        setMode('login');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || (isFr ? 'Erreur de connexion' : 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header info */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
              ExamCraft <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-950 border border-emerald-500/30 rounded font-mono">DZ</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {isFr ? 'Portail Enseignant & BEM CEM Algérie' : 'Algerian Middle School English Portal'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold uppercase">{lang}</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 transition-all">
        {/* On-Device Local Storage Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold">
            <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isFr ? 'Stockage 100% Local & Hors-Ligne sur l\'appareil' : '100% On-Device Local Storage & Offline'}</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
            APK Ready
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {isFr ? 'Connexion' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              mode === 'signup'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {isFr ? 'Créer un Compte (Enseignant)' : 'Register Account'}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick Saved Accounts on Device */}
          {mode === 'login' && localAccounts.length > 0 && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {isFr ? 'Comptes sauvegardés sur cet appareil :' : 'Saved accounts on this device:'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto pr-1">
                {localAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      switchLocalAccount(acc.id);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {acc.profile.displayName?.charAt(0) || 'T'}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                          {acc.profile.displayName}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {acc.email} • {acc.profile.wilaya}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {isFr ? 'Ouvrir →' : 'Enter →'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* SIGN UP EXTRA FIELDS */}
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {isFr ? 'Titre' : 'Title'}
                    </label>
                    <select
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-2.5 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {isFr ? 'Nom & Prénom *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Amina Benali"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {isFr ? 'Établissement (CEM) *' : 'Middle School (CEM) *'}
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. CEM Emir Abdelkader"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {isFr ? 'Wilaya *' : 'Wilaya *'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        {ALGERIAN_WILAYAS.map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Teaching Levels (1AM - 4AM) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isFr ? 'Niveaux enseignés (1AM - 4AM BEM) :' : 'Teaching Levels (1AM - 4AM BEM):'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1AM', '2AM', '3AM', '4AM'] as SchoolYear[]).map(lvl => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => toggleLevel(lvl)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          teachingLevels.includes(lvl)
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isFr ? 'Adresse E-mail *' : 'Email Address *'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'login' ? 'e.g. teacher.benali@cem-algeria.dz' : 'e.g. yourname@education.dz'}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Password */}
            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {isFr ? 'Mot de passe *' : 'Password *'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setMode('reset'); setError(null); }}
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      {isFr ? 'Mot de passe oublié ?' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && (isFr ? 'Accéder à mon Espace Enseignant' : 'Sign In to Workspace')}
                    {mode === 'signup' && (isFr ? 'Créer mon Profil & Commencer' : 'Create Profile & Start')}
                    {mode === 'reset' && (isFr ? 'Réinitialiser le mot de passe' : 'Reset Password')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {mode === 'reset' && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  {isFr ? '← Retour à la connexion' : '← Back to Sign In'}
                </button>
              </div>
            )}
          </form>

          {/* Quick Demo Access (1-Tap Mode) */}
          <div className="pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={loginAsGuest}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>
                {isFr
                  ? '⚡ Démarrage Rapide (Compte Démo Algérien - CEM Alger)'
                  : '⚡ Quick Start (Demo Account - CEM Alger)'}
              </span>
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-1.5">
              {isFr
                ? 'Données stockées localement sur votre téléphone. Aucun serveur externe requis.'
                : 'All database files are saved locally on your phone. No external servers needed.'}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">Official Standards</div>
              <div className="text-[9px] text-slate-400">1AM–4AM & BEM</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">DOCX & Bareme</div>
              <div className="text-[9px] text-slate-400">Direct Export</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <Award className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-700">100% On-Device</div>
              <div className="text-[9px] text-slate-400">Private & Fast</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
