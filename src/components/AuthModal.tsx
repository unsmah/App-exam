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
  Smartphone
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
  const { login, signUp, signInWithGoogle, sendPasswordReset, createLocalAccount, loginAsGuest } = useAuth();

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
  const [errorDetails, setErrorDetails] = useState<{ code?: string; canFallbackLocal?: boolean } | null>(null);
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
    setErrorDetails(null);
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
        if (password.length < 6) {
          throw new Error(isFr ? 'Le mot de passe doit comporter au moins 6 caractères.' : 'Password must be at least 6 characters.');
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
        await sendPasswordReset(email.trim());
        setSuccessMessage(isFr ? 'Lien de réinitialisation envoyé par e-mail !' : 'Password reset link sent to your email!');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication error';
      let canFallback = false;

      if (err.code === 'auth/operation-not-allowed') {
        msg = isFr
          ? 'L\'authentification par e-mail n\'est pas activée sur votre projet Firebase. Cliquez ci-dessous pour créer votre compte localement.'
          : 'Email/Password authentication is not enabled in Firebase Console. Click below to create your account locally on this device.';
        canFallback = true;
      } else if (err.code === 'auth/network-request-failed') {
        msg = isFr
          ? 'Connexion au serveur Firebase impossible. Vous pouvez créer un compte local.'
          : 'Could not reach Firebase. You can create a local teacher account.';
        canFallback = true;
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = isFr ? 'Email ou mot de passe incorrect.' : 'Invalid email or password.';
        canFallback = true;
      } else if (err.code === 'auth/email-already-in-use') {
        msg = isFr ? 'Cette adresse e-mail est déjà utilisée.' : 'This email address is already registered.';
      } else if (err.code === 'auth/weak-password') {
        msg = isFr ? 'Mot de passe trop faible (6 caractères minimum).' : 'Password is too weak (minimum 6 characters).';
      } else {
        canFallback = true;
      }

      setError(msg);
      setErrorDetails({ code: err.code, canFallbackLocal: canFallback });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLocalDirect = () => {
    const finalName = displayName.trim() || email.split('@')[0] || 'Teacher';
    const finalEmail = email.trim() || 'teacher@examcraft.dz';
    createLocalAccount(finalEmail, finalName, {
      title,
      role,
      schoolName,
      wilaya,
      academicYear,
      teachingLevels
    });
    onClose();
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
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
            onClick={() => { setMode('login'); setError(null); setErrorDetails(null); setSuccessMessage(null); }}
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
            onClick={() => { setMode('signup'); setError(null); setErrorDetails(null); setSuccessMessage(null); }}
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
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>{error}</span>
              </div>
              {errorDetails?.canFallbackLocal && (
                <button
                  type="button"
                  onClick={handleCreateLocalDirect}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isFr ? 'Créer le compte en Mode Local (Sur cet appareil)' : 'Create Account in Local Mode (On This Device)'}</span>
                </button>
              )}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
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
                      onClick={() => { setMode('reset'); setError(null); setErrorDetails(null); }}
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
              className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
          </form>

          {/* Quick guest mode button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{isFr ? 'Accès Rapide en Mode Local (Sans Firebase)' : 'Quick Access in Local Mode (No Firebase)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
