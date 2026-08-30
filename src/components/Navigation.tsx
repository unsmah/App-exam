import React from 'react';
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
  UserCheck
} from 'lucide-react';
import { SchoolYear } from '../types';
import { UserAccountMenu } from './UserAccountMenu';
import { useAuth } from '../context/AuthContext';

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
  onOpenAuthModal
}) => {
  const isFr = lang === 'fr';
  const { currentUser, userProfile, logout } = useAuth();

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
            className="w-full flex items-center justify-center cursor-pointer"
            onClick={() => onSelectTab('dashboard')}
            title="ExamCraft DZ"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          title="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="p-3">
        <button
          onClick={onNewExam}
          className={`w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-sm group ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}
          title={isCollapsed ? (isFr ? 'Nouveau Sujet' : 'Create New Exam') : undefined}
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 shrink-0" />
          {!isCollapsed && <span className="truncate">{isFr ? 'Nouveau Sujet (IA)' : 'Create New Exam'}</span>}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
            {isFr ? 'Espace Enseignant' : 'Teacher Workspace'}
          </div>
        )}
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const label = isFr ? item.labelFr : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={isCollapsed ? label : undefined}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-lg text-sm transition-colors relative group ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 truncate'}`}>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded shrink-0">
                  {item.badge}
                </span>
              )}
              {!isCollapsed && item.count !== undefined && (
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono shrink-0">
                  {item.count}
                </span>
              )}

              {/* Floating Tooltip when collapsed */}
              {isCollapsed && (
                <div className="fixed left-20 ml-2 hidden group-hover:flex items-center z-50 bg-slate-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg border border-slate-700 whitespace-nowrap pointer-events-none">
                  {label}
                  {item.badge && (
                    <span className="ml-1.5 text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
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
        <div className="relative hidden md:block w-56 lg:w-64">
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

        {/* User Account Menu with Avatar Dropdown */}
        <UserAccountMenu
          onOpenProfile={() => onSelectTab('profile')}
          onOpenSettings={() => onSelectTab('settings')}
          onOpenAuth={onOpenAuthModal}
          lang={lang}
        />
      </div>
    </header>
  );
};
