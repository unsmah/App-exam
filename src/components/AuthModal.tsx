import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  Building,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  BookOpen,
  Zap,
  Smartphone,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALGERIAN_WILAYAS, SchoolYear, TeacherRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'reset';
  lang: 'en' | 'fr' | 'both';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  lang
}) => {
  const isFr = lang === 'fr';
  const { login, signUp, sendPasswordReset, loginAsGuest, getAllLocalAccounts, switchLocalAccount } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [title, setTitle] = useState('Mr.');
  const [role, setRole] = useState<TeacherRole>('teacher');
  const [schoolName, setSchoolName] = useState('CEM Emir Abdelkader');
  const [wilaya, setWilaya] = useState('16 - Alger');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [teachingLevels, setTeachingLevels] = useState<SchoolYear[]>(['1AM', '2AM', '3AM', '4AM']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const localAccounts = getAllLocalAccounts();

  if (!isOpen) return null;

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
          throw new Error(isFr ? 'Veuillez saisir votre email et mot de passe.' : 'Please enter your email and password.');
        }
        await login(email.trim(), password);
        onClose();
      } else if (mode === 'signup') {
        if (!email.trim() || !password || !displayName.trim()) {
          throw new Error(isFr ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.');
        }
        if (password.length < 4) {
          throw new Error(isFr ? 'Le mot de passe doit comporter au moins 4 caractères.' : 'Password must be at least 4 characters.');
        }
        await signUp(email.trim(), password, displayName.trim(), {
          title,
          role,
          schoolName,
          wilaya,
          academicYear,
          teachingLevels
        });
        onClose();
      } else if (mode === 'reset') {
        if (!email.trim()) {
          throw new Error(isFr ? 'Veuillez saisir votre adresse e-mail.' : 'Please enter your email address.');
        }
        await sendPasswordReset(email.trim(), 'password123');
        setSuccessMessage(isFr ? 'Mot de passe réinitialisé à "password123" !' : 'Password reset to "password123"!');
        setMode('login');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                ExamCraft <span className="text-emerald-400 text-[10px] px-1.5 py-0.2 bg-emerald-950 rounded border border-emerald-500/30">DZ</span>
              </h3>
              <p className="text-[10px] text-slate-400">
                {isFr ? 'Compte Enseignant Local' : 'Local Teacher Account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
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
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isFr ? 'Créer un Compte' : 'New Account'}
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2">
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
                  {isFr ? 'Comptes sur cet appareil :' : 'Accounts on device:'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 max-h-28 overflow-y-auto pr-1">
                {localAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      switchLocalAccount(acc.id);
                      onClose();
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
                          {acc.profile.wilaya}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {isFr ? 'Ouvrir →' : 'Select →'}
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
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      {isFr ? 'Titre' : 'Title'}
                    </label>
                    <select
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-2 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      {isFr ? 'Nom Enseignant *' : 'Teacher Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Amina Benali"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      {isFr ? 'Établissement (CEM)' : 'Middle School'}
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. CEM Emir Abdelkader"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      {isFr ? 'Wilaya' : 'Wilaya'}
                    </label>
                    <select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full px-2 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                    >
                      {ALGERIAN_WILAYAS.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {isFr ? 'Niveaux :' : 'Levels:'}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['1AM', '2AM', '3AM', '4AM'] as SchoolYear[]).map(lvl => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => toggleLevel(lvl)}
                        className={`py-1 text-xs font-bold rounded-lg border transition-all ${
                          teachingLevels.includes(lvl)
                            ? 'bg-emerald-600 text-white border-emerald-600'
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

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                {isFr ? 'Adresse e-mail *' : 'Email Address *'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. teacher.benali@cem-algeria.dz"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Password */}
            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
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
                    className="w-full pl-9 pr-10 py-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
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
              className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && (isFr ? 'Se connecter' : 'Sign In')}
                    {mode === 'signup' && (isFr ? 'Créer mon Compte' : 'Register Account')}
                    {mode === 'reset' && (isFr ? 'Réinitialiser' : 'Reset Password')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick guest mode button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{isFr ? 'Accès Démo 1-Clic (Sans mot de passe)' : 'Quick Demo 1-Click Access'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
