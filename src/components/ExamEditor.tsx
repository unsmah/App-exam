import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Save, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Wand2, 
  Layers, 
  HelpCircle, 
  CheckSquare, 
  FileCheck,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sliders,
  Maximize2
} from 'lucide-react';
import { ExamDocument, ExamSection, ExamQuestion, WritingTask, QuestionType } from '../types';

interface ExamEditorProps {
  exam: ExamDocument;
  onSave: (updatedExam: ExamDocument) => void;
  onPreview: (exam: ExamDocument) => void;
  onDownloadDocx: (exam: ExamDocument, withKey?: boolean) => void;
  onPrint: (exam: ExamDocument, mode?: 'student' | 'teacher' | 'both') => void;
  onGenerateAlternative: (exam: ExamDocument) => void;
  lang: 'en' | 'fr' | 'both';
}

export const ExamEditor: React.FC<ExamEditorProps> = ({
  exam,
  onSave,
  onPreview,
  onDownloadDocx,
  onPrint,
  onGenerateAlternative,
  lang
}) => {
  const isFr = lang === 'fr';

  const [currentExam, setCurrentExam] = useState<ExamDocument>(exam);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [activeTab, setActiveTab] = useState<'content' | 'header' | 'rubric' | 'answer_key'>('content');
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(exam.sections[0]?.id || null);
  
  // Inline AI Assistant modal state
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiTarget, setAiTarget] = useState<{
    type: 'question' | 'passage' | 'writing' | 'instruction';
    sectionId?: string;
    questionId?: string;
    currentText: string;
    questionType?: string;
  } | null>(null);
  const [aiAction, setAiAction] = useState<string>('improve_grammar');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<string>('');
  const [aiAlternatives, setAiAlternatives] = useState<string[]>([]);

  // Keep state synced if prop changes
  useEffect(() => {
    setCurrentExam(exam);
  }, [exam]);

  // Debounced auto-save triggers on changes
  const triggerAutoSave = (updated: ExamDocument) => {
    setCurrentExam(updated);
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      onSave(updated);
      setSaveStatus('saved');
    }, 600);
    return () => clearTimeout(timer);
  };

  // Point math calculation
  const sectionPointsTotal = currentExam.sections.reduce((acc, sec) => acc + (Number(sec.points) || 0), 0);
  const writingPointsTotal = Number(currentExam.writingTask?.points) || 0;
  const currentTotal = sectionPointsTotal + writingPointsTotal;
  const isPointsBalanced = currentTotal === currentExam.totalPoints;

  // Header update
  const updateHeader = (field: string, val: any) => {
    const updated = {
      ...currentExam,
      headerConfig: {
        ...currentExam.headerConfig,
        [field]: val
      }
    };
    triggerAutoSave(updated);
  };

  // Section updates
  const updateSection = (sectionId: string, field: string, val: any) => {
    const updated = {
      ...currentExam,
      sections: currentExam.sections.map(sec => {
        if (sec.id === sectionId) {
          return { ...sec, [field]: val };
        }
        return sec;
      })
    };
    triggerAutoSave(updated);
  };

  const addSection = () => {
    const newSection: ExamSection = {
      id: `sec-${Date.now()}`,
      title: `PART ONE: SECTION ${currentExam.sections.length + 1}`,
      instruction: 'Do the following activities.',
      type: 'language',
      points: 4,
      questions: [
        {
          id: `q-${Date.now()}-1`,
          sectionId: `sec-${Date.now()}`,
          type: 'put_verbs_in_brackets',
          instruction: 'Activity 1: Put the verbs in brackets into correct tense.',
          question: 'a) He (to go) ................. to school.\nb) They (to play) ................. chess.',
          points: 2,
          answer: 'a) goes\nb) play',
          difficulty: 'Medium'
        }
      ]
    };
    const updated = {
      ...currentExam,
      sections: [...currentExam.sections, newSection]
    };
    setExpandedSectionId(newSection.id);
    triggerAutoSave(updated);
  };

  const deleteSection = (sectionId: string) => {
    if (confirm(isFr ? 'Supprimer cette section ?' : 'Are you sure you want to delete this section?')) {
      const updated = {
        ...currentExam,
        sections: currentExam.sections.filter(s => s.id !== sectionId)
      };
      triggerAutoSave(updated);
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentExam.sections.length) return;
    const newSections = [...currentExam.sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIdx, 0, moved);
    const updated = { ...currentExam, sections: newSections };
    triggerAutoSave(updated);
  };

  // Question updates
  const updateQuestion = (sectionId: string, questionId: string, field: string, val: any) => {
    const updated = {
      ...currentExam,
      sections: currentExam.sections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            questions: sec.questions.map(q => {
              if (q.id === questionId) {
                return { ...q, [field]: val };
              }
              return q;
            })
          };
        }
        return sec;
      })
    };
    triggerAutoSave(updated);
  };

  const addQuestion = (sectionId: string) => {
    const newQuestion: ExamQuestion = {
      id: `q-${Date.now()}`,
      sectionId,
      type: 'wh_questions',
      instruction: `Activity: Answer the question.`,
      question: '1. What did the characters do?',
      points: 1,
      answer: 'Sample answer key',
      difficulty: 'Medium'
    };

    const updated = {
      ...currentExam,
      sections: currentExam.sections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            questions: [...sec.questions, newQuestion]
          };
        }
        return sec;
      })
    };
    triggerAutoSave(updated);
  };

  const duplicateQuestion = (sectionId: string, question: ExamQuestion) => {
    const clonedQuestion: ExamQuestion = {
      ...question,
      id: `q-dup-${Date.now()}`,
      instruction: `${question.instruction} (Copy)`,
      question: `${question.question}`
    };

    const updated = {
      ...currentExam,
      sections: currentExam.sections.map(sec => {
        if (sec.id === sectionId) {
          const idx = sec.questions.findIndex(q => q.id === question.id);
          const newQs = [...sec.questions];
          newQs.splice(idx + 1, 0, clonedQuestion);
          return { ...sec, questions: newQs };
        }
        return sec;
      })
    };
    triggerAutoSave(updated);
  };

  const deleteQuestion = (sectionId: string, questionId: string) => {
    const updated = {
      ...currentExam,
      sections: currentExam.sections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            questions: sec.questions.filter(q => q.id !== questionId)
          };
        }
        return sec;
      })
    };
    triggerAutoSave(updated);
  };

  // Writing Task updates
  const updateWritingTask = (field: string, val: any) => {
    const updated = {
      ...currentExam,
      writingTask: {
        ...currentExam.writingTask,
        [field]: val
      }
    };
    triggerAutoSave(updated);
  };

  const addWritingCue = () => {
    const currentCues = currentExam.writingTask?.cues || [];
    updateWritingTask('cues', [...currentCues, 'Add relevant details and examples']);
  };

  const updateWritingCue = (idx: number, text: string) => {
    const currentCues = [...(currentExam.writingTask?.cues || [])];
    currentCues[idx] = text;
    updateWritingTask('cues', currentCues);
  };

  const removeWritingCue = (idx: number) => {
    const currentCues = [...(currentExam.writingTask?.cues || [])];
    currentCues.splice(idx, 1);
    updateWritingTask('cues', currentCues);
  };

  // Inline AI Assistant executor
  const handleOpenAiAssistant = (
    type: 'question' | 'passage' | 'writing' | 'instruction',
    currentText: string,
    sectionId?: string,
    questionId?: string,
    questionType?: string
  ) => {
    setAiTarget({ type, currentText, sectionId, questionId, questionType });
    setAiResult('');
    setAiAlternatives([]);
    setAiAction(type === 'passage' ? 'regenerate_passage' : 'improve_grammar');
    setAiModalOpen(true);
  };

  const handleRunAi = async () => {
    if (!aiTarget) return;
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: aiAction,
          payload: {
            text: aiTarget.currentText,
            schoolYear: currentExam.schoolYear,
            questionType: aiTarget.questionType
          }
        })
      });
      const data = await response.json();
      setAiResult(data.result || '');
      if (data.alternatives) {
        setAiAlternatives(data.alternatives);
      }
    } catch (err) {
      console.error(err);
      setAiResult('Error calling AI assistant. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAiResult = (textToApply: string) => {
    if (!aiTarget) return;

    if (aiTarget.type === 'passage' && aiTarget.sectionId) {
      updateSection(aiTarget.sectionId, 'passage', textToApply);
    } else if (aiTarget.type === 'question' && aiTarget.sectionId && aiTarget.questionId) {
      updateQuestion(aiTarget.sectionId, aiTarget.questionId, 'question', textToApply);
    } else if (aiTarget.type === 'writing') {
      updateWritingTask('prompt', textToApply);
    } else if (aiTarget.type === 'instruction' && aiTarget.sectionId && aiTarget.questionId) {
      updateQuestion(aiTarget.sectionId, aiTarget.questionId, 'instruction', textToApply);
    }

    setAiModalOpen(false);
  };

  // Auto-balance points helper
  const handleAutoBalance = () => {
    // 7 pts reading, 7 pts language, 6 pts writing standard
    const updated = {
      ...currentExam,
      sections: currentExam.sections.map((sec, idx) => {
        if (idx === 0) return { ...sec, points: 7 };
        return { ...sec, points: 7 };
      }),
      writingTask: {
        ...currentExam.writingTask,
        points: 6
      }
    };
    triggerAutoSave(updated);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Action Sticky Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-16 z-10 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
              currentExam.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
              currentExam.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
              currentExam.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {currentExam.schoolYear}
            </span>
            <input
              type="text"
              value={currentExam.title}
              onChange={(e) => {
                const updated = { ...currentExam, title: e.target.value };
                triggerAutoSave(updated);
              }}
              className="font-bold text-sm sm:text-base text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none px-1 bg-transparent max-w-sm sm:max-w-md truncate"
            />
          </div>

          <span className={`text-[11px] font-semibold flex items-center gap-1 ${
            saveStatus === 'saving' ? 'text-amber-600' : 'text-emerald-600'
          }`}>
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Saved</span>
              </>
            )}
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Point Balance Indicator */}
          <div className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
            isPointsBalanced
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : 'bg-amber-50 text-amber-800 border border-amber-300'
          }`}>
            <span>Total: {currentTotal} / {currentExam.totalPoints} pts</span>
            {!isPointsBalanced && (
              <button
                onClick={handleAutoBalance}
                className="underline text-[10px] text-amber-900 font-bold ml-1 hover:no-underline"
              >
                Balance (7+7+6)
              </button>
            )}
          </div>

          <button
            onClick={() => onPreview(currentExam)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => onDownloadDocx(currentExam, false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold"
            title="Download editable Microsoft Word .docx"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Word (.docx)</span>
          </button>

          <button
            onClick={() => onPrint(currentExam, 'student')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Exam Content & Questions</span>
        </button>

        <button
          onClick={() => setActiveTab('header')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'header'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>School Header Designer</span>
        </button>

        <button
          onClick={() => setActiveTab('answer_key')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'answer_key'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Model Answer Key & Rubrics</span>
        </button>
      </div>

      {/* ================= TAB 1: CONTENT & QUESTIONS ================= */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* General Instructions */}
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              General Instructions:
            </label>
            <input
              type="text"
              value={currentExam.instructions}
              onChange={(e) => {
                const updated = { ...currentExam, instructions: e.target.value };
                triggerAutoSave(updated);
              }}
              placeholder="e.g. Read the text carefully and answer all questions in parts one and two."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Sections List */}
          {currentExam.sections.map((section, sIdx) => {
            const isExpanded = expandedSectionId === section.id;
            return (
              <div 
                key={section.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Section Header Bar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                      className="p-1 hover:bg-slate-200 rounded text-slate-600"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                      className="font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none px-1 flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-500 font-medium">Points:</span>
                      <input
                        type="number"
                        value={section.points}
                        onChange={(e) => updateSection(section.id, 'points', Number(e.target.value))}
                        className="w-12 text-center font-bold text-xs p-1 bg-white border border-slate-300 rounded"
                      />
                    </div>

                    <button
                      onClick={() => moveSection(sIdx, 'up')}
                      disabled={sIdx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveSection(sIdx, 'down')}
                      disabled={sIdx === currentExam.sections.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                      title="Delete Section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Section Body */}
                {isExpanded && (
                  <div className="p-5 space-y-6">
                    {/* Reading Passage if Reading Section */}
                    {section.passage !== undefined && (
                      <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span className="font-bold text-xs text-slate-800">Reading Passage</span>
                          </div>
                          <button
                            onClick={() => handleOpenAiAssistant('passage', section.passage || '', section.id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold hover:bg-emerald-200 transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>✨ AI Passage Tools</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Passage Title:</label>
                            <input
                              type="text"
                              value={section.passageTitle || ''}
                              onChange={(e) => updateSection(section.id, 'passageTitle', e.target.value)}
                              placeholder="Title of reading text"
                              className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Source / Reference:</label>
                            <input
                              type="text"
                              value={section.passageSource || ''}
                              onChange={(e) => updateSection(section.id, 'passageSource', e.target.value)}
                              placeholder="e.g. Adapted from National Geographic Kids"
                              className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Passage Content:</label>
                          <textarea
                            rows={6}
                            value={section.passage}
                            onChange={(e) => updateSection(section.id, 'passage', e.target.value)}
                            className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500 font-serif"
                          />
                        </div>
                      </div>
                    )}

                    {/* Questions in Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Activities & Questions ({section.questions.length})
                        </span>
                        <button
                          onClick={() => addQuestion(section.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Activity</span>
                        </button>
                      </div>

                      {section.questions.map((question, qIdx) => (
                        <div
                          key={question.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <input
                              type="text"
                              value={question.instruction}
                              onChange={(e) => updateQuestion(section.id, question.id, 'instruction', e.target.value)}
                              placeholder="e.g. Activity 1: Answer the questions according to text."
                              className="font-bold text-xs text-slate-800 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-emerald-500 focus:outline-none flex-1"
                            />

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-xs font-mono">
                                <span className="text-slate-400">Pts:</span>
                                <input
                                  type="number"
                                  step="0.5"
                                  value={question.points}
                                  onChange={(e) => updateQuestion(section.id, question.id, 'points', Number(e.target.value))}
                                  className="w-12 text-center p-1 border border-slate-300 rounded text-xs font-bold"
                                />
                              </div>

                              <button
                                onClick={() => handleOpenAiAssistant('question', question.question, section.id, question.id, question.type)}
                                className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded"
                                title="✨ Improve Question with AI"
                              >
                                <Sparkles className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => duplicateQuestion(section.id, question)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded"
                                title="Duplicate Question"
                              >
                                <Copy className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => deleteQuestion(section.id, question.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                                title="Delete Question"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <textarea
                            rows={3}
                            value={question.question}
                            onChange={(e) => updateQuestion(section.id, question.id, 'question', e.target.value)}
                            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />

                          {/* Quick Answer Key toggle */}
                          <div className="pt-2 border-t border-slate-100">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Expected Answer Key / Model Solution:
                            </label>
                            <input
                              type="text"
                              value={question.answer}
                              onChange={(e) => updateQuestion(section.id, question.id, 'answer', e.target.value)}
                              placeholder="Correct answer(s) for the teacher's key"
                              className="w-full text-xs p-2 bg-emerald-50/40 border border-emerald-200 rounded-lg text-emerald-950 font-medium"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Section Button */}
          <button
            onClick={addSection}
            className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Exam Section</span>
          </button>

          {/* Part Two: Situation of Integration (Written Expression) */}
          {currentExam.writingTask && (
            <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    PART TWO: Situation of Integration (Written Expression)
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                    Official Writing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500 font-medium">Points:</span>
                    <input
                      type="number"
                      value={currentExam.writingTask.points}
                      onChange={(e) => updateWritingTask('points', Number(e.target.value))}
                      className="w-12 text-center font-bold text-xs p-1 border border-slate-300 rounded"
                    />
                  </div>

                  <button
                    onClick={() => handleOpenAiAssistant('writing', currentExam.writingTask.prompt)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold hover:bg-emerald-100"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Improve with AI</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Writing Prompt / Task Description:
                </label>
                <textarea
                  rows={3}
                  value={currentExam.writingTask.prompt}
                  onChange={(e) => updateWritingTask('prompt', e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              {/* Cues and Guidelines */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 uppercase">
                    Cues, Fact-File & Guidance Notes:
                  </label>
                  <button
                    onClick={addWritingCue}
                    className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Cue</span>
                  </button>
                </div>

                {currentExam.writingTask.cues.map((cue, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cue}
                      onChange={(e) => updateWritingCue(cIdx, e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      onClick={() => removeWritingCue(cIdx)}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: HEADER DESIGNER ================= */}
      {activeTab === 'header' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Algerian Official Examination Header Designer
            </h3>
            <p className="text-xs text-slate-500">
              Customize the school details, wilaya, academic year and student identifier line.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Republic Title:</label>
              <input
                type="text"
                value={currentExam.headerConfig.republicTitle}
                onChange={(e) => updateHeader('republicTitle', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ministry Title:</label>
              <input
                type="text"
                value={currentExam.headerConfig.ministryTitle}
                onChange={(e) => updateHeader('ministryTitle', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">School Name (CEM):</label>
              <input
                type="text"
                value={currentExam.headerConfig.schoolName}
                onChange={(e) => updateHeader('schoolName', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Wilaya / Direction of Education:</label>
              <input
                type="text"
                value={currentExam.headerConfig.wilaya}
                onChange={(e) => updateHeader('wilaya', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Academic Year:</label>
              <input
                type="text"
                value={currentExam.headerConfig.academicYear}
                onChange={(e) => updateHeader('academicYear', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Class / Grade Badge:</label>
              <input
                type="text"
                value={currentExam.headerConfig.classGrade}
                onChange={(e) => updateHeader('classGrade', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Student Name & Identification Line:</label>
              <input
                type="text"
                value={currentExam.headerConfig.studentNamePlaceholder}
                onChange={(e) => updateHeader('studentNamePlaceholder', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ANSWER KEY & RUBRIC ================= */}
      {activeTab === 'answer_key' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Model Answer Key & Marking Scheme (Barème de Correction)
              </h3>
              <p className="text-xs text-slate-500">
                Inspect and modify expected solutions, accepted alternatives and writing criteria.
              </p>
            </div>
            <button
              onClick={() => onPrint(currentExam, 'teacher')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Answer Key</span>
            </button>
          </div>

          {currentExam.sections.map(sec => (
            <div key={sec.id} className="space-y-3">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider">
                {sec.title} ({sec.points} pts)
              </h4>
              <div className="space-y-2">
                {sec.questions.map((q, idx) => (
                  <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                      <span>{q.instruction || `Activity ${idx + 1}`}</span>
                      <span className="font-mono text-emerald-700">{q.points} pt(s)</span>
                    </div>
                    <textarea
                      rows={2}
                      value={q.answer}
                      onChange={(e) => updateQuestion(sec.id, q.id, 'answer', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Writing Rubric */}
          {currentExam.writingTask?.rubric && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h4 className="font-bold text-xs text-purple-800 uppercase tracking-wider">
                Situation of Integration Rubric ({currentExam.writingTask.points} pts)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentExam.writingTask.rubric.map((r, rIdx) => (
                  <div key={rIdx} className="p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-xs">
                    <div className="font-bold text-purple-950 mb-1 flex items-center justify-between">
                      <span>{r.criterion}</span>
                      <span className="font-mono">{r.points} pt(s)</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{r.description || 'Level compliance'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= INLINE AI ASSISTANT MODAL ================= */}
      {aiModalOpen && aiTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>✨ AI Assistant for Algerian English Teachers</span>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* AI Action Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setAiAction('improve_grammar')}
                className={`p-2 rounded-lg border text-left font-medium ${
                  aiAction === 'improve_grammar' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                }`}
              >
                Improve Grammar
              </button>
              <button
                onClick={() => setAiAction('simplify')}
                className={`p-2 rounded-lg border text-left font-medium ${
                  aiAction === 'simplify' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                }`}
              >
                Simplify (1AM/2AM)
              </button>
              <button
                onClick={() => setAiAction('make_difficult')}
                className={`p-2 rounded-lg border text-left font-medium ${
                  aiAction === 'make_difficult' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                }`}
              >
                Make More Challenging
              </button>
              <button
                onClick={() => setAiAction('generate_alternatives')}
                className={`p-2 rounded-lg border text-left font-medium ${
                  aiAction === 'generate_alternatives' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                }`}
              >
                3 Alternatives
              </button>
              <button
                onClick={() => setAiAction('similar_question')}
                className={`p-2 rounded-lg border text-left font-medium ${
                  aiAction === 'similar_question' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                }`}
              >
                Similar Question
              </button>
              {aiTarget.type === 'passage' && (
                <button
                  onClick={() => setAiAction('regenerate_passage')}
                  className={`p-2 rounded-lg border text-left font-medium ${
                    aiAction === 'regenerate_passage' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                  }`}
                >
                  Fresh Passage
                </button>
              )}
            </div>

            {/* Target text view */}
            <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-200 max-h-28 overflow-y-auto">
              <span className="font-bold text-slate-500 block mb-1">Current Content:</span>
              <p className="text-slate-800">{aiTarget.currentText}</p>
            </div>

            {/* AI Action Run button */}
            <div className="flex justify-end">
              <button
                onClick={handleRunAi}
                disabled={aiLoading}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Run AI Transformation</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Result display */}
            {aiResult && (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <span className="font-bold text-xs text-emerald-900 block">Generated Suggestion:</span>
                
                {aiAlternatives.length > 0 ? (
                  <div className="space-y-2">
                    {aiAlternatives.map((alt, aIdx) => (
                      <div
                        key={aIdx}
                        onClick={() => handleApplyAiResult(alt)}
                        className="p-2.5 bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-200 rounded-lg text-xs text-slate-800 cursor-pointer transition-colors"
                      >
                        <div className="font-bold text-emerald-800 mb-0.5">Option {aIdx + 1}:</div>
                        <div>{alt}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-800 max-h-48 overflow-y-auto">
                    {aiResult}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setAiModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  {aiAlternatives.length === 0 && (
                    <button
                      onClick={() => handleApplyAiResult(aiResult)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
                    >
                      Apply to Exam
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
