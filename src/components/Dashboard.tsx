import React from 'react';
import { 
  Sparkles, 
  Plus, 
  FileText, 
  CheckCircle, 
  Clock, 
  LayoutTemplate, 
  HelpCircle, 
  Download, 
  Copy, 
  Trash2, 
  Eye, 
  ArrowRight, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  CheckSquare, 
  Lightbulb, 
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { ExamDocument, SchoolYear } from '../types';

interface DashboardProps {
  exams: ExamDocument[];
  onOpenExam: (exam: ExamDocument) => void;
  onNewExam: () => void;
  onNewFromTemplate: (templateId?: string) => void;
  onDuplicateExam: (exam: ExamDocument) => void;
  onGenerateAlternative: (exam: ExamDocument) => void;
  onDeleteExam: (id: string) => void;
  onDownloadPdf: (exam: ExamDocument) => void;
  onDownloadDocx: (exam: ExamDocument) => void;
  onViewAnswerKey: (exam: ExamDocument) => void;
  onNavigateTab: (tab: string) => void;
  lang: 'en' | 'fr' | 'both';
  teacherName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  exams,
  onOpenExam,
  onNewExam,
  onNewFromTemplate,
  onDuplicateExam,
  onGenerateAlternative,
  onDeleteExam,
  onDownloadPdf,
  onDownloadDocx,
  onViewAnswerKey,
  onNavigateTab,
  lang,
  teacherName = 'Teacher'
}) => {
  const isFr = lang === 'fr';

  const examsList = Array.isArray(exams) ? exams : [];
  const totalExams = examsList.length;
  const draftExams = examsList.filter(e => e.status === 'Draft').length;
  const finalExams = examsList.filter(e => e.status === 'Final' || e.status === 'Completed').length;
  
  // Count by year
  const count1AM = examsList.filter(e => e.schoolYear === '1AM').length;
  const count2AM = examsList.filter(e => e.schoolYear === '2AM').length;
  const count3AM = examsList.filter(e => e.schoolYear === '3AM').length;
  const count4AM = examsList.filter(e => e.schoolYear === '4AM').length;

  const recentExams = [...examsList].slice(0, 6);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700/60">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFr ? 'Générateur Spécialisé CEM Algérien' : 'Algerian Middle School English AI Generator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {isFr ? `Bonjour, ${teacherName} 👋` : `Good day, ${teacherName} 👋`}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            {isFr
              ? 'Créez des sujets d’examens d’anglais officiels et conformes au programme ministériel pour les classes 1AM, 2AM, 3AM et 4AM (BEM) en quelques instants.'
              : 'Create high-quality, curriculum-aligned English exams and BEM mock tests for middle school classes (1AM to 4AM) in minutes.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNewExam}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isFr ? 'Générer un Nouveau Sujet (IA)' : '+ Generate New Exam'}</span>
            </button>
            <button
              onClick={() => onNewFromTemplate()}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-600 transition-all text-sm"
            >
              <LayoutTemplate className="w-4 h-4 text-emerald-400" />
              <span>{isFr ? 'Modèles Standards' : 'Start from Template'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background badge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center w-44 h-44 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-center">
          <Award className="w-10 h-10 text-emerald-400 mb-2" />
          <div className="text-xs font-bold text-white uppercase tracking-wider">Programme Officiel</div>
          <div className="text-[11px] text-slate-300 mt-1">Conforme aux directives de l'inspection</div>
          <div className="mt-2 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">1AM • 2AM • 3AM • 4AM</div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{isFr ? 'Total Sujets' : 'Total Exams'}</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalExams}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% {isFr ? 'Sauvegardés' : 'Archived'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{isFr ? 'Finalisés' : 'Completed'}</span>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{finalExams}</div>
          <div className="text-[11px] text-slate-500 mt-1">{isFr ? 'Prêts à imprimer' : 'Ready to print'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{isFr ? 'Brouillons' : 'Drafts'}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{draftExams}</div>
          <div className="text-[11px] text-amber-600 mt-1">{isFr ? 'En cours d\'édition' : 'In progress'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">4AM / BEM</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-700">{count4AM}</div>
          <div className="text-[11px] text-purple-600 mt-1">{isFr ? 'Sujets brevet' : 'BEM Mock Tests'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{isFr ? 'Modèles' : 'Templates'}</span>
            <LayoutTemplate className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">3</div>
          <div className="text-[11px] text-indigo-600 mt-1">{isFr ? 'Structures types' : 'Standard structures'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{isFr ? 'Exercices' : 'Question Bank'}</span>
            <HelpCircle className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">6+</div>
          <div className="text-[11px] text-teal-600 mt-1">{isFr ? 'Banque d\'items' : 'Reusable items'}</div>
        </div>
      </div>

      {/* Smart Recommendations & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendation Panel */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-3">
            <Lightbulb className="w-4 h-4 text-emerald-700" />
            <span>{isFr ? 'Recommandations Pédagogiques de l\'IA' : 'AI Curriculum Recommendations'}</span>
          </div>
          <div className="space-y-3 text-xs text-emerald-900/90 leading-relaxed">
            <p className="bg-white/80 p-3 rounded-lg border border-emerald-200/60">
              💡 <strong>4AM BEM Prep:</strong> {isFr ? 'Pensez à inclure l\'épreuve standard (7pts Compréhension, 7pts Langue & 6pts Situation d\'Intégration) avec la grille d\'évaluation à 4 critères.' : 'Standard 3-part BEM layout: 7 pts Reading, 7 pts Mastery of Language, 6 pts Situation of Integration with 4-criterion rubric.'}
            </p>
            <p className="bg-white/80 p-3 rounded-lg border border-emerald-200/60">
              🎯 <strong>1AM Diagnostic:</strong> {isFr ? 'Pour le premier trimestre, privilégiez les activités guidées sur le présent simple et la phonétique du "-s" final (/s/, /z/, /ɪz/).' : 'For 1AM exams, emphasize present simple daily routines, time expressions, and final -s pronunciation (/s/, /z/, /ɪz/).'}
            </p>
          </div>
          <button
            onClick={onNewExam}
            className="w-full mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFr ? 'Générer un sujet recommandé' : 'Generate Recommended Exam'}</span>
          </button>
        </div>

        {/* Quick Level Generator Buttons */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{isFr ? 'Génération Rapide par Niveau (1AM - 4AM)' : 'Quick Generate by School Year'}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('curriculum')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              <span>{isFr ? 'Voir le programme' : 'View Full Curriculum'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              onClick={onNewExam}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50 group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">1AM • First Year</span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">Pre-A1/A1</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Personal identity, family tree, daily routines, school life & Algerian symbols.
              </p>
            </div>

            <div 
              onClick={onNewExam}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50 group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">2AM • Second Year</span>
                <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">A1/A2</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Shopping & food, health advice (should), travels (past simple) & clean environment.
              </p>
            </div>

            <div 
              onClick={onNewExam}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50 group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">3AM • Third Year</span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">A2</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Personality profiles, natural disasters (when/while), inventions (passive voice) & heritage.
              </p>
            </div>

            <div 
              onClick={onNewExam}
              className="p-3.5 rounded-xl border-2 border-emerald-200 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer bg-emerald-50/30 group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700">4AM • Fourth Year (BEM)</span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">BEM Official</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                Universal landmarks, figures (Kateb Yacine), citizenship, ecology & 3-part BEM layout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>{isFr ? 'Sujets Récents' : 'Recent English Exams'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{isFr ? 'Gérez, modifiez, dupliquez ou exportez vos épreuves' : 'Manage, edit, duplicate, print and export your created tests'}</p>
          </div>
          <button
            onClick={() => onNavigateTab('archive')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>{isFr ? 'Voir toutes les archives' : 'View Full Archive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentExams.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">{isFr ? 'Aucun sujet généré pour le moment' : 'No exams created yet'}</p>
            <p className="text-xs text-slate-400 mt-1">{isFr ? 'Cliquez sur "Générer un Nouveau Sujet" pour commencer.' : 'Click "Generate New Exam" to create your first assessment with AI.'}</p>
            <button
              onClick={onNewExam}
              className="mt-4 inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-500"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isFr ? 'Générer un Sujet' : 'Generate Exam'}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{isFr ? 'Titre de l\'examen' : 'Exam Title'}</th>
                  <th className="py-3 px-3">Niveau</th>
                  <th className="py-3 px-3">{isFr ? 'Séquence / Thème' : 'Sequence / Theme'}</th>
                  <th className="py-3 px-3">Durée / Points</th>
                  <th className="py-3 px-3">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentExams.map(exam => (
                  <tr key={exam.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-700" onClick={() => onOpenExam(exam)}>
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{exam.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                        exam.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
                        exam.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
                        exam.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {exam.schoolYear}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-[200px] truncate">
                      <div className="font-medium text-slate-800 truncate">{exam.sequence}</div>
                      <div className="text-[10px] text-slate-400 truncate">{exam.theme}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {exam.durationMinutes} min • {exam.totalPoints} pts
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        exam.status === 'Final' || exam.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenExam(exam)}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded"
                          title="Open Editor"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onViewAnswerKey(exam)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded"
                          title="View Model Answer Key"
                        >
                          <CheckSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDownloadDocx(exam)}
                          className="p-1.5 text-slate-600 hover:text-indigo-700 hover:bg-slate-100 rounded"
                          title="Download Word (.docx)"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDuplicateExam(exam)}
                          className="p-1.5 text-slate-600 hover:text-purple-700 hover:bg-slate-100 rounded"
                          title="Duplicate Exam"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteExam(exam.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
