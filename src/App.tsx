import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, Header } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { GenerateExamWizard } from './components/GenerateExamWizard';
import { ExamEditor } from './components/ExamEditor';
import { ArchiveView } from './components/ArchiveView';
import { TemplatesView } from './components/TemplatesView';
import { QuestionBankView } from './components/QuestionBankView';
import { AnswerKeysView } from './components/AnswerKeysView';
import { CurriculumView } from './components/CurriculumView';
import { SettingsView } from './components/SettingsView';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { AuthScreen } from './components/AuthScreen';
import { ExamPreviewModal } from './components/ExamPreviewModal';
import { ExamDocument, ExamTemplate, QuestionBankItem, SchoolProfile, SchoolYear } from './types';
import { INITIAL_EXAMS, INITIAL_TEMPLATES, INITIAL_QUESTION_BANK, INITIAL_SCHOOL_PROFILE } from './data/initialData';
import { exportExamToDocx } from './utils/docxExport';
import { printExamDocument } from './utils/printExport';
import { UserDataService } from './lib/userDataService';

function AppContent() {
  const { currentUser, userProfile, updateUserProfile, loading } = useAuth();

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [lang, setLang] = useState<'en' | 'fr' | 'both'>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'reset'>('login');

  // Core App State
  const [exams, setExams] = useState<ExamDocument[]>(INITIAL_EXAMS);
  const [templates, setTemplates] = useState<ExamTemplate[]>(INITIAL_TEMPLATES);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(INITIAL_QUESTION_BANK);
  const [profile, setProfile] = useState<SchoolProfile>(INITIAL_SCHOOL_PROFILE);

  // Active Exam being edited / previewed
  const [currentEditingExam, setCurrentEditingExam] = useState<ExamDocument>(INITIAL_EXAMS[0]);
  const [previewExam, setPreviewExam] = useState<ExamDocument | null>(null);

  // Wizard pre-config (when starting from template or curriculum)
  const [wizardPreConfig, setWizardPreConfig] = useState<any>(null);

  // Sync profile state whenever userProfile updates
  useEffect(() => {
    if (userProfile) {
      setProfile({
        teacherName: `${userProfile.title ? userProfile.title + ' ' : ''}${userProfile.displayName}`,
        schoolName: userProfile.schoolName || 'CEM Emir Abdelkader',
        wilaya: userProfile.wilaya || '16 - Alger',
        commune: userProfile.commune || 'Bab El Oued',
        academicYear: userProfile.academicYear || '2024-2025',
        defaultDuration: userProfile.defaultDuration || 60,
        defaultPoints: userProfile.defaultPoints || 20,
        defaultLanguage: userProfile.defaultLanguage || 'en',
        email: userProfile.email
      });
      if (userProfile.defaultLanguage) {
        setLang(userProfile.defaultLanguage);
      }
    }
  }, [userProfile]);

  // Load from Firestore if authenticated, or fallback to backend API
  useEffect(() => {
    async function loadData() {
      if (currentUser) {
        // Authenticated user: load from Firestore subcollections
        try {
          const [userExams, userTemplates, userQb] = await Promise.all([
            UserDataService.getUserExams(currentUser.uid),
            UserDataService.getUserTemplates(currentUser.uid),
            UserDataService.getUserQuestionBank(currentUser.uid)
          ]);

          if (userExams && userExams.length > 0) {
            setExams(userExams);
            setCurrentEditingExam(userExams[0]);
          } else {
            // Seed first-time user with initial curriculum exams
            setExams(INITIAL_EXAMS);
            setCurrentEditingExam(INITIAL_EXAMS[0]);
            // Save initial set to user's Firestore
            INITIAL_EXAMS.forEach(ex => UserDataService.saveUserExam(currentUser.uid, ex));
          }

          if (userTemplates && userTemplates.length > 0) {
            setTemplates(userTemplates);
          } else {
            setTemplates(INITIAL_TEMPLATES);
            INITIAL_TEMPLATES.forEach(t => UserDataService.saveUserTemplate(currentUser.uid, t));
          }

          if (userQb && userQb.length > 0) {
            setQuestionBank(userQb);
          } else {
            setQuestionBank(INITIAL_QUESTION_BANK);
            INITIAL_QUESTION_BANK.forEach(q => UserDataService.saveUserQuestionBankItem(currentUser.uid, q));
          }
        } catch (err) {
          console.warn('Error loading user data from Firestore:', err);
        }
      } else {
        // Guest or fallback mode: load from API or initial mock data
        try {
          const [examsRes, tmplRes, qbRes, profRes] = await Promise.all([
            fetch('/api/exams'),
            fetch('/api/templates'),
            fetch('/api/question-bank'),
            fetch('/api/profile')
          ]);

          if (examsRes.ok) {
            const loadedExams = await examsRes.json();
            if (loadedExams && loadedExams.length > 0) {
              setExams(loadedExams);
              setCurrentEditingExam(loadedExams[0]);
            }
          }
          if (tmplRes.ok) {
            const loadedTmpl = await tmplRes.json();
            if (loadedTmpl && loadedTmpl.length > 0) setTemplates(loadedTmpl);
          }
          if (qbRes.ok) {
            const loadedQb = await qbRes.json();
            if (loadedQb && loadedQb.length > 0) setQuestionBank(loadedQb);
          }
          if (profRes.ok) {
            const loadedProf = await profRes.json();
            if (loadedProf) setProfile(loadedProf);
          }
        } catch (err) {
          console.warn('Using local fallback state:', err);
        }
      }
    }

    loadData();
  }, [currentUser]);

  // Handlers
  const handleToggleLang = () => {
    setLang(prev => (prev === 'en' ? 'fr' : prev === 'fr' ? 'both' : 'en'));
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenExamInEditor = (exam: ExamDocument) => {
    setCurrentEditingExam(exam);
    setCurrentTab('editor');
  };

  const handleStartNewExam = (preConfig?: any) => {
    setWizardPreConfig(preConfig || null);
    setCurrentTab('generate');
  };

  const handleStartFromTemplate = (template?: ExamTemplate) => {
    if (template) {
      setWizardPreConfig({
        schoolYear: template.schoolYear,
        examType: template.examType,
        durationMinutes: template.durationMinutes,
        totalPoints: template.totalPoints
      });
    }
    setCurrentTab('generate');
  };

  const handleExamGenerated = (newExam: ExamDocument) => {
    setExams(prev => [newExam, ...prev]);
    setCurrentEditingExam(newExam);
    setCurrentTab('editor');

    if (currentUser) {
      UserDataService.saveUserExam(currentUser.uid, newExam);
    }
  };

  const handleSaveExam = async (updatedExam: ExamDocument) => {
    // Update local state
    setExams(prev => prev.map(e => e.id === updatedExam.id ? updatedExam : e));
    if (currentEditingExam.id === updatedExam.id) {
      setCurrentEditingExam(updatedExam);
    }

    // Persist to user Firestore if logged in
    if (currentUser) {
      await UserDataService.saveUserExam(currentUser.uid, updatedExam);
    }

    // Update backend
    try {
      await fetch(`/api/exams/${updatedExam.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExam)
      });
    } catch (err) {
      console.error('Error persisting exam to server:', err);
    }
  };

  const handleDuplicateExam = async (exam: ExamDocument) => {
    const duplicated: ExamDocument = {
      ...exam,
      id: `exam-dup-${Date.now()}`,
      title: `${exam.title} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setExams(prev => [duplicated, ...prev]);

    if (currentUser) {
      UserDataService.saveUserExam(currentUser.uid, duplicated);
    }

    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAlternative = async (exam: ExamDocument) => {
    try {
      const res = await fetch('/api/generate-alternative-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam })
      });
      if (res.ok) {
        const altExam: ExamDocument = await res.json();
        setExams(prev => [altExam, ...prev]);
        setCurrentEditingExam(altExam);
        setCurrentTab('editor');

        if (currentUser) {
          UserDataService.saveUserExam(currentUser.uid, altExam);
        }
      }
    } catch (err) {
      console.error('Error creating alternative version:', err);
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (confirm(lang === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cet examen ?' : 'Are you sure you want to delete this exam?')) {
      setExams(prev => prev.filter(e => e.id !== id));

      if (currentUser) {
        UserDataService.deleteUserExam(currentUser.uid, id);
      }

      try {
        await fetch(`/api/exams/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDownloadDocx = (exam: ExamDocument, withKey: boolean = false) => {
    exportExamToDocx(exam, withKey);
  };

  const handlePrintExam = (exam: ExamDocument, mode: 'student' | 'teacher' | 'both' = 'student') => {
    printExamDocument(exam, mode);
  };

  const handleAddQuestionBankItem = async (item: Partial<QuestionBankItem>) => {
    const newItem: QuestionBankItem = {
      id: item.id || `qb-${Date.now()}`,
      question: item.question || '',
      instruction: item.instruction || '',
      type: item.type || 'wh_questions',
      schoolYear: item.schoolYear || '1AM',
      unit: item.unit || 'Sequence 1',
      theme: item.theme || 'General',
      skill: item.skill || 'Language',
      difficulty: item.difficulty || 'Medium',
      answer: item.answer || '',
      points: item.points || 2,
      tags: item.tags || [],
      createdAt: new Date().toISOString(),
      ...item
    };

    setQuestionBank(prev => [newItem, ...prev]);

    if (currentUser) {
      UserDataService.saveUserQuestionBankItem(currentUser.uid, newItem);
    }

    try {
      await fetch('/api/question-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestionBankItem = async (id: string) => {
    setQuestionBank(prev => prev.filter(q => q.id !== id));

    if (currentUser) {
      UserDataService.deleteUserQuestionBankItem(currentUser.uid, id);
    }

    try {
      await fetch(`/api/question-bank/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (updatedProfile: SchoolProfile) => {
    setProfile(updatedProfile);

    if (currentUser) {
      await updateUserProfile({
        displayName: updatedProfile.teacherName,
        schoolName: updatedProfile.schoolName,
        wilaya: updatedProfile.wilaya,
        academicYear: updatedProfile.academicYear,
        defaultDuration: updatedProfile.defaultDuration || updatedProfile.defaultDurationMinutes || 60,
        defaultPoints: updatedProfile.defaultPoints || updatedProfile.defaultTotalPoints || 20
      });
    }

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Middle School English Exam Generator (1AM-4AM)';
      case 'generate': return 'AI Exam Creator Wizard';
      case 'editor': return `Exam Editor — ${currentEditingExam?.title || ''}`;
      case 'archive': return 'Exam Archive & Assessment Library';
      case 'templates': return 'Official Exam Blueprints & Templates';
      case 'question-bank': return 'Middle School Question Bank & Drills';
      case 'answer-keys': return 'Model Answer Keys & Grading Hub';
      case 'curriculum': return 'Algerian English Curriculum (1AM-4AM)';
      case 'settings': return 'Teacher & System Preferences';
      case 'profile': return 'Teacher Account & CEM Profile';
      default: return 'ExamCraft DZ';
    }
  };

  const activeTeacherName = userProfile?.displayName || profile.teacherName;
  const activeSchoolName = userProfile?.schoolName || profile.schoolName;

  // Show loading indicator during initial auth state verification
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-2xl mb-4 border border-emerald-400/30">
          <GraduationCap className="w-9 h-9 animate-pulse text-white" />
        </div>
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span>ExamCraft</span>
          <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-950 rounded-md border border-emerald-500/30 font-mono">
            DZ • CEM
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {lang === 'fr' ? 'Chargement de l\'espace enseignant...' : 'Connecting to teacher portal & curriculum database...'}
        </p>
        <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin mt-5" />
      </div>
    );
  }

  // Strictly prevent platform access until logged in
  if (!currentUser) {
    return <AuthScreen lang={lang} onToggleLang={handleToggleLang} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setMobileMenuOpen(false);
        }}
        onNewExam={() => handleStartNewExam()}
        lang={lang}
        totalExamsCount={exams.length}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onOpenAuthModal={handleOpenAuth}
      />

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Workspace Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        <Header
          title={getPageTitle()}
          lang={lang}
          onToggleLang={handleToggleLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
          sidebarCollapsed={sidebarCollapsed}
          onSelectTab={setCurrentTab}
          onOpenAuthModal={handleOpenAuth}
          teacherName={activeTeacherName}
          schoolName={activeSchoolName}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* DASHBOARD TAB */}
          {currentTab === 'dashboard' && (
            <Dashboard
              exams={exams}
              onOpenExam={handleOpenExamInEditor}
              onNewExam={() => handleStartNewExam()}
              onNewFromTemplate={(tmplId) => {
                const tmpl = templates.find(t => t.id === tmplId) || templates[0];
                handleStartFromTemplate(tmpl);
              }}
              onDuplicateExam={handleDuplicateExam}
              onGenerateAlternative={handleGenerateAlternative}
              onDeleteExam={handleDeleteExam}
              onDownloadPdf={(exam) => handlePrintExam(exam, 'student')}
              onDownloadDocx={(exam) => handleDownloadDocx(exam, false)}
              onViewAnswerKey={(exam) => {
                setPreviewExam(exam);
              }}
              onNavigateTab={setCurrentTab}
              lang={lang}
              teacherName={activeTeacherName}
            />
          )}

          {/* GENERATE EXAM WIZARD */}
          {currentTab === 'generate' && (
            <GenerateExamWizard
              onExamGenerated={handleExamGenerated}
              onCancel={() => setCurrentTab('dashboard')}
              lang={lang}
              initialConfig={wizardPreConfig}
            />
          )}

          {/* EXAM EDITOR */}
          {currentTab === 'editor' && currentEditingExam && (
            <ExamEditor
              exam={currentEditingExam}
              onSave={handleSaveExam}
              onPreview={(exam) => setPreviewExam(exam)}
              onDownloadDocx={handleDownloadDocx}
              onPrint={handlePrintExam}
              onGenerateAlternative={handleGenerateAlternative}
              lang={lang}
            />
          )}

          {/* ARCHIVE VIEW */}
          {currentTab === 'archive' && (
            <ArchiveView
              exams={exams}
              onOpenExam={handleOpenExamInEditor}
              onNewExam={() => handleStartNewExam()}
              onDuplicateExam={handleDuplicateExam}
              onGenerateAlternative={handleGenerateAlternative}
              onDeleteExam={handleDeleteExam}
              onDownloadDocx={handleDownloadDocx}
              onPrint={handlePrintExam}
              onImportExamSuccess={(imported) => {
                setExams(prev => [imported, ...prev]);
                setCurrentEditingExam(imported);
                setCurrentTab('editor');
                if (currentUser) {
                  UserDataService.saveUserExam(currentUser.uid, imported);
                }
              }}
              lang={lang}
            />
          )}

          {/* TEMPLATES VIEW */}
          {currentTab === 'templates' && (
            <TemplatesView
              templates={templates}
              onUseTemplate={handleStartFromTemplate}
              lang={lang}
            />
          )}

          {/* QUESTION BANK VIEW */}
          {currentTab === 'question-bank' && (
            <QuestionBankView
              items={questionBank}
              onAddItem={handleAddQuestionBankItem}
              onDeleteItem={handleDeleteQuestionBankItem}
              lang={lang}
            />
          )}

          {/* ANSWER KEYS VIEW */}
          {currentTab === 'answer-keys' && (
            <AnswerKeysView
              exams={exams}
              onOpenExam={handleOpenExamInEditor}
              onPrint={handlePrintExam}
              onDownloadDocx={handleDownloadDocx}
              lang={lang}
            />
          )}

          {/* CURRICULUM EXPLORER */}
          {currentTab === 'curriculum' && (
            <CurriculumView
              onQuickGenerate={(year, sequenceId) => {
                handleStartNewExam({ schoolYear: year, sequenceId });
              }}
              lang={lang}
            />
          )}

          {/* MY ACCOUNT & PROFILE VIEW */}
          {currentTab === 'profile' && (
            <ProfileView
              lang={lang}
              onNavigateTab={setCurrentTab}
              totalExamsCount={exams.length}
            />
          )}

          {/* SETTINGS VIEW */}
          {currentTab === 'settings' && (
            <SettingsView
              profile={profile}
              onSaveProfile={handleSaveProfile}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}
        </main>
      </div>

      {/* Global Exam Preview & Print Modal */}
      {previewExam && (
        <ExamPreviewModal
          exam={previewExam}
          onClose={() => setPreviewExam(null)}
          onDownloadDocx={handleDownloadDocx}
          onPrint={handlePrintExam}
          onGenerateAlternative={handleGenerateAlternative}
          lang={lang}
        />
      )}

      {/* Auth Modal (Login / Sign Up / Password Reset) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        lang={lang}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
