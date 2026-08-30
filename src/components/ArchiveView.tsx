import React, { useState } from 'react';
import { 
  Archive, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  Copy, 
  Trash2, 
  Sparkles, 
  Plus, 
  FileText, 
  CheckSquare, 
  Calendar, 
  Layers,
  Upload,
  RefreshCw,
  Award,
  Grid,
  List
} from 'lucide-react';
import { ExamDocument, SchoolYear, ExamType } from '../types';
import { apiFetch } from '../lib/api';

interface ArchiveViewProps {
  exams: ExamDocument[];
  onOpenExam: (exam: ExamDocument) => void;
  onNewExam: () => void;
  onDuplicateExam: (exam: ExamDocument) => void;
  onGenerateAlternative: (exam: ExamDocument) => void;
  onDeleteExam: (id: string) => void;
  onDownloadDocx: (exam: ExamDocument, withKey?: boolean) => void;
  onPrint: (exam: ExamDocument, mode?: 'student' | 'teacher' | 'both') => void;
  onImportExamSuccess: (exam: ExamDocument) => void;
  lang: 'en' | 'fr' | 'both';
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  exams,
  onOpenExam,
  onNewExam,
  onDuplicateExam,
  onGenerateAlternative,
  onDeleteExam,
  onDownloadDocx,
  onPrint,
  onImportExamSuccess,
  lang
}) => {
  const isFr = lang === 'fr';

  const [search, setSearch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Import modal state
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [importLoading, setImportLoading] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Filter exams
  const filteredExams = exams.filter(e => {
    const matchesYear = selectedYear === 'all' || e.schoolYear === selectedYear;
    const matchesType = selectedType === 'all' || e.examType === selectedType;
    const q = search.toLowerCase();
    const matchesSearch = 
      e.title.toLowerCase().includes(q) ||
      e.sequence.toLowerCase().includes(q) ||
      e.theme.toLowerCase().includes(q) ||
      (e.instructions && e.instructions.toLowerCase().includes(q));

    return matchesYear && matchesType && matchesSearch;
  });

  const handleImportSubmit = async () => {
    if (!importText.trim()) return;
    setImportLoading(true);
    setImportError(null);
    try {
      const res = await apiFetch('/api/import-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: importText })
      });
      if (!res.ok) {
        throw new Error('Failed to import and parse exam with AI');
      }
      const importedExam: ExamDocument = await res.json();
      onImportExamSuccess(importedExam);
      setImportModalOpen(false);
      setImportText('');
    } catch (err: any) {
      console.error(err);
      setImportError(err.message || 'Error parsing exam');
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Archive className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Archives & Bibliothèque des Sujets' : 'Exam Archive & Assessment Library'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFr ? 'Retrouvez, dupliquez et exportez vos examens créés' : 'Search, organize, duplicate, and export all generated English exams'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>{isFr ? 'Importer un texte' : 'Import Exam Text (AI)'}</span>
          </button>

          <button
            onClick={onNewExam}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isFr ? 'Créer un Sujet' : 'Create New Exam'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={isFr ? 'Rechercher par titre, thème, mot-clé...' : 'Search exams, sequences, topics...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">All Levels (1AM - 4AM)</option>
            <option value="1AM">1AM (First Year)</option>
            <option value="2AM">2AM (Second Year)</option>
            <option value="3AM">3AM (Third Year)</option>
            <option value="4AM">4AM (BEM Level)</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">All Exam Types</option>
            <option value="Test">Term Test (Devoir)</option>
            <option value="Exam">Term Exam (Composition)</option>
            <option value="BEM-style practice">BEM Mock Exam</option>
            <option value="Quiz">Quick Quiz</option>
            <option value="Diagnostic assessment">Diagnostic</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-400'}`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-400'}`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map(exam => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                    exam.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
                    exam.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
                    exam.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {exam.schoolYear}
                  </span>

                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    {exam.examType}
                  </span>
                </div>

                <h3 
                  onClick={() => onOpenExam(exam)}
                  className="font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer mb-2 line-clamp-2"
                >
                  {exam.title}
                </h3>

                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div className="font-medium text-slate-700 line-clamp-1">{exam.sequence}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{exam.theme}</div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {exam.durationMinutes} mins • {exam.totalPoints} pts total
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenExam(exam)}
                    className="p-1.5 hover:bg-slate-100 text-slate-700 rounded"
                    title="Open in Editor"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDownloadDocx(exam, false)}
                    className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded"
                    title="Download Word (.docx)"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onPrint(exam, 'both')}
                    className="p-1.5 hover:bg-emerald-50 text-emerald-700 rounded"
                    title="Print Exam + Answer Key"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onGenerateAlternative(exam)}
                    className="p-1.5 hover:bg-purple-50 text-purple-700 rounded"
                    title="✨ AI Create Alternative Version B"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicateExam(exam)}
                    className="p-1.5 hover:bg-slate-100 text-slate-500 rounded"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteExam(exam.id)}
                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Exam Title</th>
                <th className="py-3 px-3">Level</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Sequence & Theme</th>
                <th className="py-3 px-3">Duration & Pts</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredExams.map(exam => (
                <tr key={exam.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900 cursor-pointer hover:text-emerald-700" onClick={() => onOpenExam(exam)}>
                    {exam.title}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {exam.schoolYear}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{exam.examType}</td>
                  <td className="py-3 px-3 text-slate-600">
                    <div>{exam.sequence}</div>
                    <div className="text-[10px] text-slate-400">{exam.theme}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {exam.durationMinutes} min • {exam.totalPoints} pts
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onOpenExam(exam)} className="p-1 text-slate-600 hover:text-emerald-700" title="Open">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDownloadDocx(exam)} className="p-1 text-slate-600 hover:text-indigo-700" title="Word">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => onPrint(exam, 'student')} className="p-1 text-slate-600 hover:text-emerald-700" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button onClick={() => onGenerateAlternative(exam)} className="p-1 text-purple-600 hover:text-purple-800" title="Alternative Version B (AI)">
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDeleteExam(exam.id)} className="p-1 text-slate-400 hover:text-red-600" title="Delete">
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

      {/* Import Exam Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Import Existing Exam Document (AI Parser)</span>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Paste your raw exam text or paper test content below. Gemini AI will automatically parse the reading text, questions, points, and writing task into a structured ExamCraft document.
            </p>

            <textarea
              rows={10}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste raw exam text (Header, Reading Text, Section 1, Section 2, Situation of Integration)..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            />

            {importError && (
              <div className="text-xs text-red-600 font-medium">
                {importError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                disabled={importLoading || !importText.trim()}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
              >
                {importLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Parsing Exam with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Import & Structure Exam</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
