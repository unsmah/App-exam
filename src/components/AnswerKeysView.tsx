import React, { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  Printer, 
  Download, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Award
} from 'lucide-react';
import { ExamDocument } from '../types';

interface AnswerKeysViewProps {
  exams: ExamDocument[];
  onOpenExam: (exam: ExamDocument) => void;
  onPrint: (exam: ExamDocument, mode?: 'student' | 'teacher' | 'both') => void;
  onDownloadDocx: (exam: ExamDocument, withKey?: boolean) => void;
  lang: 'en' | 'fr' | 'both';
}

export const AnswerKeysView: React.FC<AnswerKeysViewProps> = ({
  exams,
  onOpenExam,
  onPrint,
  onDownloadDocx,
  lang
}) => {
  const isFr = lang === 'fr';

  const [search, setSearch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [expandedExamId, setExpandedExamId] = useState<string | null>(exams[0]?.id || null);

  const filteredExams = exams.filter(e => {
    const matchYear = selectedYear === 'all' || e.schoolYear === selectedYear;
    const q = search.toLowerCase();
    const matchSearch = e.title.toLowerCase().includes(q) || e.sequence.toLowerCase().includes(q);
    return matchYear && matchSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Corrigés Types & Barèmes de Correction' : 'Model Answer Keys & Grading Schemes'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFr ? 'Solutions détaillées, barèmes par question et grilles d\'évaluation de l\'expression écrite' : 'Detailed marking criteria, expected solutions, and 4-criterion writing evaluation rubrics'}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={isFr ? 'Rechercher un corrigé...' : 'Search answer keys...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">All Levels (1AM - 4AM)</option>
            <option value="1AM">1AM</option>
            <option value="2AM">2AM</option>
            <option value="3AM">3AM</option>
            <option value="4AM">4AM (BEM)</option>
          </select>
        </div>
      </div>

      {/* List of Answer Key Accordions */}
      <div className="space-y-4">
        {filteredExams.map(exam => {
          const isExpanded = expandedExamId === exam.id;
          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Header Accordion */}
              <div 
                onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                    exam.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
                    exam.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
                    exam.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {exam.schoolYear}
                  </span>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{exam.title}</h3>
                    <p className="text-[11px] text-slate-500">{exam.sequence} • {exam.totalPoints} Points Total</p>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onPrint(exam, 'teacher')}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    title="Print Model Answer Key"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print Key</span>
                  </button>

                  <button
                    onClick={() => onDownloadDocx(exam, true)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    title="Download Word with Answer Key"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Word Key</span>
                  </button>

                  <button
                    onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Answer Content */}
              {isExpanded && (
                <div className="p-5 bg-slate-50/60 border-t border-slate-200 space-y-6">
                  {(exam.sections || []).map(sec => (
                    <div key={sec.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex justify-between">
                        <span>{sec.title}</span>
                        <span className="font-mono">{sec.points} pts</span>
                      </div>

                      <div className="divide-y divide-slate-100 text-xs">
                        {(sec.questions || []).map((q, qIdx) => (
                          <div key={q.id} className="py-2.5 space-y-1">
                            <div className="flex justify-between font-bold text-slate-800">
                              <span>{q.instruction || `Activity ${qIdx + 1}`}</span>
                              <span className="font-mono text-emerald-700">{q.points} pt(s)</span>
                            </div>
                            <div className="text-slate-600 font-mono text-[11px] bg-slate-50 p-2 rounded">
                              {q.question}
                            </div>
                            <div className="text-emerald-950 font-semibold text-xs bg-emerald-50/70 p-2 rounded border border-emerald-200/50 whitespace-pre-line">
                              <strong>Model Answer: </strong>{q.answer || 'Refer to text answers'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Situation of Integration Rubric */}
                  {exam.writingTask && exam.writingTask.rubric && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="font-bold text-xs text-purple-900 uppercase tracking-wider flex justify-between">
                        <span>{exam.writingTask.title} — Official Marking Rubric</span>
                        <span className="font-mono">{exam.writingTask.points} pts</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {exam.writingTask.rubric.map((r, rIdx) => (
                          <div key={rIdx} className="p-3 bg-purple-50/50 border border-purple-100 rounded-lg">
                            <div className="font-bold text-purple-950 flex justify-between mb-1">
                              <span>{r.criterion}</span>
                              <span className="font-mono">{r.points} pt(s)</span>
                            </div>
                            <p className="text-[11px] text-slate-600">{r.description || 'Full task compliance'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
