import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileEdit, 
  Archive, 
  LayoutTemplate, 
  HelpCircle, 
  CheckSquare, 
  Settings, 
  User, 
  GraduationCap, 
  BookOpen, 
  Layers,
  Search,
  Plus,
  Globe,
  Bell,
  Menu,
  X,
  Printer,
  FileText,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  LogIn,
  LogOut,
  UserCheck,
  Key,
  Database
} from 'lucide-react';
import { SchoolYear } from '../types';
import { UserAccountMenu } from './UserAccountMenu';
import { useAuth } from '../context/AuthContext';
import { ApiKeyManager } from '../lib/apiKeyManager';
import { isSupabaseConfigured } from '../lib/supabase';

export const Sidebar: React.FC<{
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNewExam: () => void;
  lang: 'en' | 'fr' | 'both';
  totalExamsCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onOpenAuthModal: (mode?: 'login' | 'signup') => void;
  onOpenApiKeyModal: (tab?: 'gemini' | 'supabase') => void;
}> = ({ 
  currentTab, 
  onSelectTab, 
  onNewExam, 
  lang, 
  totalExamsCount,
  isCollapsed,
  onToggleCollapse,
  mobileMenuOpen,
  onCloseMobileMenu,
  onOpenAuthModal,
  onOpenApiKeyModal
}) => {
  const isFr = lang === 'fr';
  const { currentUser, userProfile, logout } = useAuth();
  const [hasApiKey, setHasApiKey] = useState(ApiKeyManager.hasGeminiKey());

  useEffect(() => {
    const handleKeyChange = () => setHasApiKey(ApiKeyManager.hasGeminiKey());
    window.addEventListener('examcraft-api-key-changed', handleKeyChange);
    return () => window.removeEventListener('examcraft-api-key-changed', handleKeyChange);
  }, []);

  const menuItems = [
    { id: 'dashboard', labelEn: 'Dashboard', labelFr: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'generate', labelEn: 'Generate Exam', labelFr: 'Générer un sujet', icon: Sparkles, badge: 'AI' },
    { id: 'editor', labelEn: 'Exam Editor', labelFr: 'Éditeur de sujet', icon: FileEdit },
    { id: 'archive', labelEn: 'Archive', labelFr: 'Archives', icon: Archive, count: totalExamsCount },
    { id: 'templates', labelEn: 'Templates', labelFr: 'Modèles', icon: LayoutTemplate },
    { id: 'question-bank', labelEn: 'Question Bank', labelFr: 'Banque d\'exercices', icon: HelpCircle },
    { id: 'answer-keys', labelEn: 'Answer Keys', labelFr: 'Corrigés types', icon: CheckSquare },
    { id: 'curriculum', labelEn: 'Curriculum (DZ)', labelFr: 'Programme 1AM-4AM', icon: BookOpen },
    { id: 'profile', labelEn: 'My Account & Profile', labelFr: 'Mon Compte & Profil', icon: User },
    { id: 'settings', labelEn: 'Settings & Headers', labelFr: 'Paramètres & En-tête', icon: Settings }
  ];

  const displayName = userProfile?.displayName || currentUser?.displayName || 'Teacher Benali';

  return (
    <aside 
      className={`bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-50 select-none transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header & Toggle */}
      <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between min-h-[64px]">
        {!isCollapsed ? (
          <div 
            className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1" 
            onClick={() => onSelectTab('dashboard')}
          >
            <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="font-bold text-base tracking-tight flex items-center gap-1.5 text-white">
                ExamCraft <span className="text-emerald-400 font-extrabold text-xs px-1.5 py-0.5 bg-emerald-950/80 rounded border border-emerald-500/30">DZ</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">English Middle School</p>
            </div>
          </div>
        ) : (
          <div 
            className="w-10 h-10 mx-auto rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md cursor-pointer" 
            onClick={() => onSelectTab('dashboard')}
            title="ExamCraft DZ"
          >
            <GraduationCap className="w-6 h-6" />
          </div>
        )}

        {/* Mobile close button */}
        <button 
          onClick={onCloseMobileMenu}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Button: Fast New Exam */}
      <div className="p-3">
        <button
          onClick={() => {
            onNewExam();
            onCloseMobileMenu();
          }}
          className={`w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all ${
            isCollapsed ? 'px-0' : ''
          }`}
          title="Create New Exam"
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="text-xs">{isFr ? 'Nouveau Sujet' : 'New Exam'}</span>}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobileMenu();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all relative ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isFr ? item.labelFr : item.labelEn}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">
                  {isFr ? item.labelFr : item.labelEn}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}

              {!isCollapsed && typeof item.count === 'number' && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        {/* API Key / Cloud Config shortcut */}
        <button
          onClick={() => {
            onOpenApiKeyModal('gemini');
            onCloseMobileMenu();
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title={isFr ? 'Clés API & Base de données' : 'API Key & Cloud Config'}
        >
          <Key className="w-4 h-4 text-emerald-400 shrink-0" />
          {!isCollapsed && (
            <div className="flex-1 text-left flex items-center justify-between">
              <span>{isFr ? 'Clé API & Cloud' : 'API Key & Cloud'}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                hasApiKey ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
              }`}>
                {hasApiKey ? 'Ready' : 'Setup'}
              </span>
            </div>
          )}
        </button>
      </nav>

      {/* User Account Bar at bottom of Sidebar */}
      {!isCollapsed ? (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div 
            onClick={() => onSelectTab('profile')}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{displayName}</div>
                <div className="text-[10px] text-emerald-400 truncate">
                  {currentUser ? (isFr ? 'Compte Enseignant' : 'Teacher Account') : (isFr ? 'Mode Démo / Invité' : 'Guest / Demo Mode')}
                </div>
              </div>
            </div>
          </div>

          {!currentUser && (
            <button
              onClick={() => onOpenAuthModal('login')}
              className="mt-2 w-full py-1.5 px-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-500/30 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isFr ? 'Connexion / Inscription' : 'Log In / Sign Up'}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="p-2 border-t border-slate-800 bg-slate-950/40 flex justify-center">
          <button
            onClick={() => onSelectTab('profile')}
            className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-md"
            title={displayName}
          >
            {displayName.charAt(0).toUpperCase()}
          </button>
        </div>
      )}
    </aside>
  );
};

export const Header: React.FC<{
  title: string;
  lang: 'en' | 'fr' | 'both';
  onToggleLang: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMobileMenu: () => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  onSelectTab: (tab: string) => void;
  onOpenAuthModal: (mode?: 'login' | 'signup') => void;
  onOpenApiKeyModal: (tab?: 'gemini' | 'supabase') => void;
  teacherName?: string;
  schoolName?: string;
}> = ({
  title,
  lang,
  onToggleLang,
  searchQuery,
  setSearchQuery,
  onOpenMobileMenu,
  onToggleSidebar,
  sidebarCollapsed = false,
  onSelectTab,
  onOpenAuthModal,
  onOpenApiKeyModal,
  teacherName = 'Teacher Benali',
  schoolName = 'Emir Abdelkader Middle School'
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu open button */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          title="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop sidebar toggle button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        )}

        <div>
          <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">{schoolName} — English Department</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block w-52 lg:w-60">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'fr' ? 'Rechercher un sujet...' : 'Search exams, sequences, topics...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Language switch */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          title="Toggle Interface Language (EN / FR / Both)"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>{lang.toUpperCase()}</span>
        </button>

        {/* User Account Menu with Avatar Dropdown & Quick AI Key */}
        <UserAccountMenu
          onOpenProfile={() => onSelectTab('profile')}
          onOpenSettings={() => onSelectTab('settings')}
          onOpenAuth={onOpenAuthModal}
          onOpenApiKeyModal={onOpenApiKeyModal}
          lang={lang}
        />
      </div>
    </header>
  );
};
