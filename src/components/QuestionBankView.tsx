import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  RefreshCw,
  CheckCircle,
  FileQuestion
} from 'lucide-react';
import { QuestionBankItem, SchoolYear, QuestionType } from '../types';
import { ALGERIAN_CURRICULUM } from '../data/curriculum';

interface QuestionBankViewProps {
  items: QuestionBankItem[];
  onAddItem: (item: Partial<QuestionBankItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddToExam?: (item: QuestionBankItem) => void;
  lang: 'en' | 'fr' | 'both';
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  items,
  onAddItem,
  onDeleteItem,
  onAddToExam,
  lang
}) => {
  const isFr = lang === 'fr';

  const [search, setSearch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI Generator modal state
  const [generatorOpen, setGeneratorOpen] = useState<boolean>(false);
  const [genYear, setGenYear] = useState<SchoolYear>('3AM');
  const [genTheme, setGenTheme] = useState<string>('Me, my Friends and my Activities');
  const [genGrammar, setGenGrammar] = useState<string>('Past simple tense & time markers');
  const [genSkill, setGenSkill] = useState<string>('Mastery of Language');
  const [genCount, setGenCount] = useState<number>(4);
  const [genLoading, setGenLoading] = useState<boolean>(false);

  // Manual Add modal state
  const [manualOpen, setManualOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<{
    schoolYear: SchoolYear;
    skill: string;
    theme: string;
    grammar?: string;
    questionType: QuestionType;
    instruction: string;
    question: string;
    answer: string;
    points: number;
    difficulty: 'Easy' | 'Medium' | 'Difficult';
  }>({
    schoolYear: '3AM',
    skill: 'Mastery of Language',
    theme: 'Me, my Friends and my Activities',
    grammar: 'Past continuous & past simple with while/when',
    questionType: 'put_verbs_in_brackets',
    instruction: 'Activity: Put the verbs in brackets in the correct tense.',
    question: 'While Ahmed (to study) ...................., the phone rang.',
    answer: 'was studying',
    points: 1,
    difficulty: 'Medium'
  });

  const filteredItems = items.filter(item => {
    const matchYear = selectedYear === 'all' || item.schoolYear === selectedYear;
    const matchSkill = selectedSkill === 'all' || item.skill.toLowerCase() === selectedSkill.toLowerCase();
    const q = search.toLowerCase();
    const matchSearch =
      item.question.toLowerCase().includes(q) ||
      item.theme.toLowerCase().includes(q) ||
      (item.grammar && item.grammar.toLowerCase().includes(q)) ||
      item.instruction.toLowerCase().includes(q);

    return matchYear && matchSkill && matchSearch;
  });

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleRunAiGenerator = async () => {
    setGenLoading(true);
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolYear: genYear,
          theme: genTheme,
          grammar: genGrammar,
          skill: genSkill,
          count: genCount
        })
      });
      if (!res.ok) throw new Error('Generation failed');
      const generatedList: QuestionBankItem[] = await res.json();
      generatedList.forEach(item => onAddItem(item));
      setGeneratorOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setGenLoading(false);
    }
  };

  const handleManualSubmit = () => {
    onAddItem(newItem);
    setManualOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Banque d\'Exercices & Items Réutilisables' : 'Question Bank & Exercise Repository'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFr ? 'Bibliothèque de questions d\'anglais classées par niveau CEM, compétences et grammaire' : 'Searchable repository of questions, drills, phonetics, and comprehension items'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setManualOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFr ? 'Ajouter un exercice' : 'Add Manual Question'}</span>
          </button>

          <button
            onClick={() => setGeneratorOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFr ? 'Générer avec l\'IA' : 'AI Question Generator'}</span>
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
              placeholder={isFr ? 'Rechercher un exercice, point de grammaire...' : 'Search by grammar, keyword, lexis...'}
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
            <option value="1AM">1AM</option>
            <option value="2AM">2AM</option>
            <option value="3AM">3AM</option>
            <option value="4AM">4AM (BEM)</option>
          </select>

          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="text-xs font-semibold py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">All Skills</option>
            <option value="Reading Comprehension">Reading Comprehension</option>
            <option value="Mastery of Language">Mastery of Language</option>
            <option value="Vocabulary & Lexis">Vocabulary & Lexis</option>
            <option value="Pronunciation & Phonetics">Pronunciation & Phonetics</option>
            <option value="Written Expression">Written Expression</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500 font-semibold">
          {filteredItems.length} items found
        </div>
      </div>

      {/* Items Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    item.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
                    item.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
                    item.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.schoolYear}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {item.skill}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-slate-500">
                  {item.points} pt{item.points > 1 ? 's' : ''}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-900 mb-1">
                {item.instruction}
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line mb-3 font-mono leading-relaxed">
                {item.question}
              </div>

              {/* Answer Key */}
              <div className="text-[11px] bg-emerald-50/60 border border-emerald-200/60 p-2.5 rounded-lg text-emerald-950">
                <span className="font-bold text-emerald-900">Answer Key: </span>
                <span>{item.answer}</span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                {item.grammar || item.theme}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyText(item.id, `${item.instruction}\n${item.question}\nAnswer: ${item.answer}`)}
                  className="p-1.5 hover:bg-slate-100 text-slate-600 rounded flex items-center gap-1"
                  title="Copy question text"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generator Modal */}
      {generatorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>AI Question Bank Generator</span>
              </div>
              <button
                onClick={() => setGeneratorOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target School Year:</label>
                <select
                  value={genYear}
                  onChange={(e) => setGenYear(e.target.value as SchoolYear)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                >
                  <option value="1AM">1AM</option>
                  <option value="2AM">2AM</option>
                  <option value="3AM">3AM</option>
                  <option value="4AM">4AM (BEM)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Theme / Topic:</label>
                <input
                  type="text"
                  value={genTheme}
                  onChange={(e) => setGenTheme(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Grammar / Skill Drill:</label>
                <input
                  type="text"
                  value={genGrammar}
                  onChange={(e) => setGenGrammar(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity of Questions:</label>
                <select
                  value={genCount}
                  onChange={(e) => setGenCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                >
                  <option value={2}>2 Exercises</option>
                  <option value={4}>4 Exercises</option>
                  <option value={6}>6 Exercises</option>
                  <option value={10}>10 Exercises</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGeneratorOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleRunAiGenerator}
                disabled={genLoading}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {genLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Questions</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Modal */}
      {manualOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-base">Add Question to Bank</div>
              <button onClick={() => setManualOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Level:</label>
                  <select
                    value={newItem.schoolYear}
                    onChange={(e) => setNewItem({ ...newItem, schoolYear: e.target.value as SchoolYear })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="1AM">1AM</option>
                    <option value="2AM">2AM</option>
                    <option value="3AM">3AM</option>
                    <option value="4AM">4AM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Points:</label>
                  <input
                    type="number"
                    value={newItem.points}
                    onChange={(e) => setNewItem({ ...newItem, points: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Activity Instruction:</label>
                <input
                  type="text"
                  value={newItem.instruction}
                  onChange={(e) => setNewItem({ ...newItem, instruction: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Question Content:</label>
                <textarea
                  rows={3}
                  value={newItem.question}
                  onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Model Answer Key:</label>
                <textarea
                  rows={2}
                  value={newItem.answer}
                  onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setManualOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={handleManualSubmit}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
