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
  BookOpen
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
  const { login, signUp, signInWithGoogle, sendPasswordReset, loginAsGuest } = useAuth();

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
        if (!email || !password) {
          throw new Error(isFr ? 'Veuillez saisir votre email et mot de passe.' : 'Please enter your email and password.');
        }
        await login(email, password);
        onClose();
      } else if (mode === 'signup') {
        if (!email || !password || !displayName) {
          throw new Error(isFr ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.');
        }
        if (password.length < 6) {
          throw new Error(isFr ? 'Le mot de passe doit comporter au moins 6 caractères.' : 'Password must be at least 6 characters.');
        }
        await signUp(email, password, displayName, {
          title,
          role,
          schoolName,
          wilaya,
          academicYear,
          teachingLevels
        });
        onClose();
      } else if (mode === 'reset') {
        if (!email) {
          throw new Error(isFr ? 'Veuillez saisir votre adresse e-mail.' : 'Please enter your email address.');
        }
        await sendPasswordReset(email);
        setSuccessMessage(isFr ? 'Lien de réinitialisation envoyé par e-mail !' : 'Password reset link sent to your email!');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication error';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = isFr ? 'Email ou mot de passe incorrect.' : 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = isFr ? 'Cette adresse e-mail est déjà utilisée.' : 'This email address is already registered.';
      } else if (err.code === 'auth/weak-password') {
        msg = isFr ? 'Mot de passe trop faible (6 caractères minimum).' : 'Password is too weak (minimum 6 characters).';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Algerian motif */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-5 text-white flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-base">
                <span>ExamCraft DZ</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CEM Portal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {mode === 'login' && (isFr ? 'Connexion à votre espace enseignant' : 'Sign in to your teacher workspace')}
                {mode === 'signup' && (isFr ? 'Créer votre compte enseignant' : 'Create your Algerian teacher account')}
                {mode === 'reset' && (isFr ? 'Réinitialisation du mot de passe' : 'Reset your password')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
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
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {isFr ? 'Se Connecter' : 'Log In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              mode === 'signup'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {isFr ? 'Créer un Compte' : 'Create Account'}
          </button>
          {mode === 'reset' && (
            <button
              type="button"
              className="flex-1 py-3 text-center border-b-2 border-emerald-600 text-emerald-700 bg-white font-bold"
            >
              {isFr ? 'Mot de passe oublié' : 'Password Reset'}
            </button>
          )}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Social Sign In (Google) */}
          {mode !== 'reset' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isFr ? 'Continuer avec Google' : 'Continue with Google'}</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] text-slate-400 uppercase font-semibold">
                  {isFr ? 'ou avec e-mail' : 'or with email'}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* SIGN UP EXTRA FIELDS */}
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isFr ? 'Titre' : 'Title'}
                    </label>
                    <select
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isFr ? 'Nom & Prénom' : 'Full Name'} *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Benali Fatima"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isFr ? 'Établissement (CEM)' : 'Middle School (CEM)'}
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. CEM Ibn Khaldoun"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isFr ? 'Wilaya' : 'Algerian Wilaya'}
                    </label>
                    <select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {ALGERIAN_WILAYAS.map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {isFr ? 'Niveaux enseignés' : 'Teaching Levels in CEM'}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['1AM', '2AM', '3AM', '4AM'] as SchoolYear[]).map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleLevel(lvl)}
                        className={`py-1 px-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                          teachingLevels.includes(lvl)
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {isFr ? 'Adresse E-mail' : 'Email Address'} *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="teacher@education.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Password Field */}
            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    {isFr ? 'Mot de passe' : 'Password'} *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      {isFr ? 'Mot de passe oublié ?' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-9 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && (isFr ? 'Se Connecter' : 'Log In')}
                    {mode === 'signup' && (isFr ? 'Créer mon compte enseignant' : 'Create Teacher Account')}
                    {mode === 'reset' && (isFr ? 'Envoyer le lien de réinitialisation' : 'Send Reset Link')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Quick Demo Mode */}
            <button
              type="button"
              onClick={() => {
                loginAsGuest('Guest Teacher');
                onClose();
              }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all text-center border border-slate-200"
            >
              {isFr ? 'Continuer en mode Invité (Démo)' : 'Continue as Guest (Demo Mode)'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
