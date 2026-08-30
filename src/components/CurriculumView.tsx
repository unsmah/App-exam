import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  CheckCircle, 
  ArrowRight,
  ListFilter
} from 'lucide-react';
import { SchoolYear, CurriculumSequence } from '../types';
import { ALGERIAN_CURRICULUM } from '../data/curriculum';

interface CurriculumViewProps {
  onQuickGenerate: (year: SchoolYear, sequenceId: string) => void;
  lang: 'en' | 'fr' | 'both';
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onQuickGenerate,
  lang
}) => {
  const isFr = lang === 'fr';
  const [selectedYear, setSelectedYear] = useState<SchoolYear>('3AM');

  const sequences = ALGERIAN_CURRICULUM.filter(s => s.schoolYear === selectedYear);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Programme Officiel d\'Anglais CEM (1AM - 4AM)' : 'Algerian Middle School English Curriculum (1AM - 4AM)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFr ? 'Syllabus complet du Ministère de l\'Éducation Nationale avec les objectifs, grammaire et situations d\'intégration' : 'Official Ministry syllabus sequences, communicative objectives, grammar targets, and exit profiles'}
          </p>
        </div>
      </div>

      {/* Year Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['1AM', '2AM', '3AM', '4AM'] as SchoolYear[]).map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedYear === year
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm ring-2 ring-emerald-600/20'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="text-lg font-mono font-extrabold">{year}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {year === '1AM' ? 'First Year (Pre-A1/A1)' :
               year === '2AM' ? 'Second Year (A1/A2)' :
               year === '3AM' ? 'Third Year (A2)' :
               'Fourth Year / BEM'}
            </div>
          </button>
        ))}
      </div>

      {/* Sequences for Selected Year */}
      <div className="space-y-6">
        {sequences.map(seq => (
          <div
            key={seq.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                  {seq.schoolYear} • Project / Sequence
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {seq.sequenceTitle}: {seq.theme}
                </h3>
              </div>

              <button
                onClick={() => onQuickGenerate(seq.schoolYear, seq.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFr ? 'Générer un sujet sur cette séquence' : 'Generate Exam for this Sequence'}</span>
              </button>
            </div>

            {/* Content Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Lessons & Communicative Tasks:
                </div>
                <ul className="space-y-1 text-slate-600">
                  {seq.lessons.map((l, i) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Target Grammar & Morphology:
                </div>
                <ul className="space-y-1 text-slate-600">
                  {seq.grammarPoints.map((g, i) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Vocabulary & Pronunciation Focus:
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {seq.vocabularyTopics.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700">
                        {v}
                      </span>
                    ))}
                  </div>
                  {seq.phonetics && (
                    <div className="pt-2 border-t border-slate-200 text-slate-600">
                      <strong className="text-slate-800">Phonetics: </strong>
                      {seq.phonetics.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
