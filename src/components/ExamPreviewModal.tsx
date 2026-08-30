import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  BookOpen,
  Award
} from 'lucide-react';
import { ExamDocument } from '../types';

interface ExamPreviewModalProps {
  exam: ExamDocument;
  onClose: () => void;
  onDownloadDocx: (exam: ExamDocument, withKey?: boolean) => void;
  onPrint: (exam: ExamDocument, mode?: 'student' | 'teacher' | 'both') => void;
  onGenerateAlternative: (exam: ExamDocument) => void;
  lang: 'en' | 'fr' | 'both';
}

export const ExamPreviewModal: React.FC<ExamPreviewModalProps> = ({
  exam,
  onClose,
  onDownloadDocx,
  onPrint,
  onGenerateAlternative,
  lang
}) => {
  const isFr = lang === 'fr';
  const [viewMode, setViewMode] = useState<'student' | 'teacher' | 'both'>('student');
  const h = exam.headerConfig;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
              exam.schoolYear === '4AM' ? 'bg-purple-500 text-white' :
              exam.schoolYear === '3AM' ? 'bg-amber-500 text-slate-950' :
              'bg-blue-500 text-white'
            }`}>
              {exam.schoolYear}
            </span>
            <h3 className="font-bold text-sm truncate max-w-xs sm:max-w-md">{exam.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setViewMode('student')}
                className={`px-2.5 py-1 rounded ${viewMode === 'student' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Student Paper
              </button>
              <button
                onClick={() => setViewMode('teacher')}
                className={`px-2.5 py-1 rounded ${viewMode === 'teacher' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Answer Key
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`px-2.5 py-1 rounded ${viewMode === 'both' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Both
              </button>
            </div>

            <button
              onClick={() => onDownloadDocx(exam, viewMode === 'teacher' || viewMode === 'both')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              title="Download Word (.docx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Word (.docx)</span>
            </button>

            <button
              onClick={() => onPrint(exam, viewMode)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Content Preview (Formatted like authentic exam sheet) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100/70 font-serif">
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-md border border-slate-200 text-slate-900 leading-relaxed text-sm space-y-6">
            {/* ================= STUDENT VIEW ================= */}
            {(viewMode === 'student' || viewMode === 'both') && (
              <div className="space-y-6">
                {/* Official Algerian Header */}
                <div className="flex justify-between items-start text-xs border-b border-slate-300 pb-3 font-sans">
                  <div>
                    <div className="font-bold text-slate-900">{h.republicTitle}</div>
                    <div className="text-slate-600">{h.ministryTitle}</div>
                    <div className="font-bold text-slate-800">{h.wilaya} — {h.schoolName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">Academic Year: {h.academicYear}</div>
                    <div className="font-bold">Level: {exam.schoolYear}</div>
                    <div className="text-slate-600">Duration: {exam.durationMinutes} min | Total: {exam.totalPoints} pts</div>
                  </div>
                </div>

                {/* Exam Title Banner */}
                <div className="border-2 border-slate-900 py-1.5 text-center font-bold text-base tracking-wide uppercase font-sans bg-slate-50">
                  {exam.title}
                </div>

                {/* Student Info */}
                <div className="text-xs font-mono font-bold border-b border-dashed border-slate-400 pb-2 text-slate-700">
                  {h.studentNamePlaceholder || `Full Name: ................................................................   Class: ${exam.schoolYear} ...`}
                </div>

                {/* Instructions */}
                {exam.instructions && (
                  <div className="text-xs italic text-slate-600">
                    General Instructions: {exam.instructions}
                  </div>
                )}

                {/* Sections & Questions */}
                {(exam.sections || []).map((sec, sIdx) => (
                  <div key={sec.id} className="space-y-3">
                    <div className="font-bold text-sm uppercase tracking-tight border-b border-slate-900 pb-1 font-sans text-slate-950">
                      {sec.title} ({sec.points} pts)
                    </div>

                    {/* Reading Passage */}
                    {sec.passage && (
                      <div className="border border-slate-400 p-4 rounded-sm bg-slate-50/50 space-y-2">
                        {sec.passageTitle && (
                          <div className="font-bold text-center text-sm">{sec.passageTitle}</div>
                        )}
                        <div className="text-xs leading-relaxed whitespace-pre-line text-slate-800">
                          {sec.passage}
                        </div>
                        {sec.passageSource && (
                          <div className="text-right text-[11px] italic text-slate-500">
                            Source: {sec.passageSource}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-3 pl-1">
                      {(sec.questions || []).map((q, qIdx) => (
                        <div key={q.id} className="text-xs space-y-1">
                          <div className="font-bold text-slate-900">
                            {q.instruction || `Activity ${qIdx + 1}:`} ({q.points} pt{q.points > 1 ? 's' : ''})
                          </div>
                          <div className="whitespace-pre-line text-slate-800 pl-2">
                            {q.question}
                          </div>
                          {q.options && q.options.length > 0 && (
                            <div className="pl-2 italic text-slate-600 text-[11px]">
                              Options: {q.options.join('   |   ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Situation of Integration (Written Expression) */}
                {exam.writingTask && (
                  <div className="space-y-3 pt-2">
                    <div className="font-bold text-sm uppercase tracking-tight border-b border-slate-900 pb-1 font-sans text-slate-950">
                      {exam.writingTask.title} ({exam.writingTask.points} pts)
                    </div>
                    <div className="border border-slate-400 p-4 rounded-sm bg-slate-50/50 text-xs space-y-2">
                      <div className="text-slate-900">{exam.writingTask.prompt}</div>
                      {exam.writingTask.cues && exam.writingTask.cues.length > 0 && (
                        <div className="pt-2">
                          <div className="font-bold text-slate-800 italic">The following cues can help you:</div>
                          <ul className="list-disc pl-5 text-slate-700 text-[11px] space-y-0.5 mt-1">
                            {exam.writingTask.cues.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold">Your Production:</div>
                    <div className="h-32 border-b border-dashed border-slate-400 flex flex-col justify-around text-slate-300 select-none">
                      <div className="border-b border-slate-200"></div>
                      <div className="border-b border-slate-200"></div>
                      <div className="border-b border-slate-200"></div>
                      <div className="border-b border-slate-200"></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= TEACHER ANSWER KEY VIEW ================= */}
            {(viewMode === 'teacher' || viewMode === 'both') && (
              <div className={`space-y-6 ${viewMode === 'both' ? 'pt-10 border-t-2 border-slate-900' : ''}`}>
                <div className="bg-emerald-50 border-2 border-emerald-600 p-3 text-center rounded">
                  <h4 className="font-bold text-sm text-emerald-950 font-sans uppercase">
                    Teacher's Marking Scheme & Model Answer Key
                  </h4>
                  <p className="text-xs text-emerald-800 font-sans">
                    {exam.title} — {exam.schoolYear} ({exam.totalPoints} Total Points)
                  </p>
                </div>

                {(exam.sections || []).map(sec => (
                  <div key={sec.id} className="space-y-2">
                    <div className="font-bold text-xs uppercase text-slate-900 font-sans">
                      {sec.title}
                    </div>
                    <table className="w-full text-xs border border-slate-300 border-collapse">
                      <thead className="bg-slate-100 font-sans">
                        <tr>
                          <th className="border border-slate-300 p-2 text-left w-1/4">Activity</th>
                          <th className="border border-slate-300 p-2 text-left w-2/3">Expected Answers</th>
                          <th className="border border-slate-300 p-2 text-center w-16">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(sec.questions || []).map((q, idx) => (
                          <tr key={q.id}>
                            <td className="border border-slate-300 p-2 font-bold font-sans">Activity {idx + 1}</td>
                            <td className="border border-slate-300 p-2 whitespace-pre-line text-slate-800">{q.answer}</td>
                            <td className="border border-slate-300 p-2 text-center font-mono font-bold">{q.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* Situation of Integration Rubric */}
                {exam.writingTask && exam.writingTask.rubric && (
                  <div className="space-y-2">
                    <div className="font-bold text-xs uppercase text-slate-900 font-sans">
                      {exam.writingTask.title} — Evaluation Grid ({exam.writingTask.points} pts)
                    </div>
                    <table className="w-full text-xs border border-slate-300 border-collapse font-sans">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="border border-slate-300 p-2 text-left">Criteria</th>
                          <th className="border border-slate-300 p-2 text-left">Indicators</th>
                          <th className="border border-slate-300 p-2 text-center w-16">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.writingTask.rubric.map((r, i) => (
                          <tr key={i}>
                            <td className="border border-slate-300 p-2 font-bold">{r.criterion}</td>
                            <td className="border border-slate-300 p-2 text-slate-600">{r.description || 'Level requirements'}</td>
                            <td className="border border-slate-300 p-2 text-center font-bold font-mono">{r.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
