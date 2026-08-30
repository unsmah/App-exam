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
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALGERIAN_WILAYAS, SchoolYear, TeacherRole } from '../types';

interface AuthScreenProps {
  lang: 'en' | 'fr' | 'both';
  onToggleLang: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ lang, onToggleLang }) => {
  const isFr = lang === 'fr';
  const { login, signUp, signInWithGoogle, sendPasswordReset } = useAuth();

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
        if (password.length < 6) {
          throw new Error(isFr ? 'Le mot de passe doit comporter au moins 6 caractères.' : 'Password must be at least 6 characters.');
        }
        await signUp(email.trim(), password, displayName.trim(), {
          title,
          role,
          schoolName: schoolName.trim() || 'CEM',
          wilaya,
          commune: commune.trim(),
          academicYear,
          teachingLevels
        });
      } else if (mode === 'reset') {
        if (!email.trim()) {
          throw new Error(isFr ? 'Veuillez saisir votre adresse e-mail.' : 'Please enter your email address.');
        }
        await sendPasswordReset(email.trim());
        setSuccessMessage(
          isFr
            ? 'Lien de réinitialisation envoyé ! Vérifiez votre boîte de réception.'
            : 'Password reset link sent! Check your inbox.'
        );
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      let msg = err.message || 'Authentication failed';
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/invalid-email'
      ) {
        msg = isFr ? 'Adresse e-mail ou mot de passe incorrect.' : 'Invalid email address or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = isFr ? 'Cette adresse e-mail est déjà associée à un compte.' : 'This email is already registered. Please sign in.';
      } else if (err.code === 'auth/weak-password') {
        msg = isFr ? 'Le mot de passe doit contenir au moins 6 caractères.' : 'Password is too weak (minimum 6 characters).';
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
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-950/40 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight flex items-center gap-2 text-white">
              <span>ExamCraft</span>
              <span className="text-emerald-400 font-extrabold text-xs px-2 py-0.5 bg-emerald-950 rounded-md border border-emerald-500/40 font-mono">
                DZ • CEM
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isFr ? 'Portail Pédagogique Officiel — Anglais Moyen (1AM-4AM)' : 'Official Algerian Middle School English Exam Platform'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors shadow-xs"
          title="Toggle Interface Language"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang.toUpperCase()}</span>
        </button>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden my-4">
          {/* Card Top Title Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white text-center relative border-b border-slate-800">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600/90 text-white mb-3 shadow-md border border-emerald-400/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {mode === 'login' && (isFr ? 'Connexion Enseignant' : 'Teacher Portal Sign In')}
              {mode === 'signup' && (isFr ? 'Créer un Compte Enseignant' : 'Create Teacher Account')}
              {mode === 'reset' && (isFr ? 'Réinitialisation du Mot de Passe' : 'Reset Your Password')}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              {mode === 'login' && (isFr ? 'Veuillez vous connecter pour accéder à la création et gestion de vos sujets d\'examen.' : 'Authentication required to access the exam generator, question bank, and templates.')}
              {mode === 'signup' && (isFr ? 'Rejoignez la plateforme pédagogique d\'anglais CEM conforme au programme national.' : 'Join the Algerian CEM English platform compliant with national curriculum standards.')}
              {mode === 'reset' && (isFr ? 'Saisissez votre e-mail pour recevoir les instructions de réinitialisation.' : 'Enter your email to receive password reset instructions.')}
            </p>
          </div>

          {/* Tab Switcher */}
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
              {isFr ? 'Se Connecter' : 'Sign In'}
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
            {mode === 'reset' && (
              <button
                type="button"
                className="flex-1 py-3 text-center border-b-2 border-emerald-600 text-emerald-700 bg-white font-bold"
              >
                {isFr ? 'Réinitialisation' : 'Reset Password'}
              </button>
            )}
          </div>

          {/* Form Content */}
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

            {/* Google Sign In */}
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
                  <span>{isFr ? 'Continuer avec Google' : 'Continue with Google Account'}</span>
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
              {/* Extra registration fields */}
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
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {isFr ? 'Nom & Prénom Enseignant' : 'Teacher Full Name'} *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Benali Fatima"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {isFr ? 'Établissement (CEM)' : 'Middle School (CEM)'} *
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="CEM Emir Abdelkader"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {isFr ? 'Wilaya' : 'Wilaya'} *
                      </label>
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      >
                        {ALGERIAN_WILAYAS.map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isFr ? 'Niveaux d\'enseignement CEM (1AM - 4AM)' : 'Teaching Levels in Middle School'}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['1AM', '2AM', '3AM', '4AM'] as SchoolYear[]).map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => toggleLevel(lvl)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
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

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {isFr ? 'Adresse E-mail' : 'Email Address'} *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="teacher@education.dz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              {mode !== 'reset' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-700">
                      {isFr ? 'Mot de passe' : 'Password'} *
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
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-8 pr-9 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
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
                className="w-full mt-3 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === 'login' && (isFr ? 'Se Connecter et Accéder à la Plateforme' : 'Sign In & Access Platform')}
                      {mode === 'signup' && (isFr ? 'Créer mon Compte Enseignant' : 'Register & Access Platform')}
                      {mode === 'reset' && (isFr ? 'Envoyer le lien de réinitialisation' : 'Send Password Reset Link')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

            {/* Key Features Trust Badges */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-700">Official Standards</div>
                <div className="text-[9px] text-slate-400">1AM-4AM & BEM</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Sparkles className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-700">AI Exam Maker</div>
                <div className="text-[9px] text-slate-400">Algerian Curriculum</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Award className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-slate-700">Cloud Storage</div>
                <div className="text-[9px] text-slate-400">Persistent Archives</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-xs text-slate-500 border-t border-slate-800/80">
        ExamCraft DZ • English Department Middle School Platform • National Curriculum Standards
      </footer>
    </div>
  );
};
