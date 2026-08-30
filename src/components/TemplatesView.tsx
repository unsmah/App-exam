import React from 'react';
import { 
  LayoutTemplate, 
  Plus, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Clock, 
  Sliders, 
  Trash2,
  FileCheck
} from 'lucide-react';
import { ExamTemplate } from '../types';

interface TemplatesViewProps {
  templates: ExamTemplate[];
  onUseTemplate: (template: ExamTemplate) => void;
  onDeleteTemplate?: (id: string) => void;
  lang: 'en' | 'fr' | 'both';
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  onUseTemplate,
  onDeleteTemplate,
  lang
}) => {
  const isFr = lang === 'fr';

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-emerald-600" />
            <span>{isFr ? 'Modèles d\'Examens Prédéfinis' : 'Standard Exam Structure Templates'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFr ? 'Structures d\'épreuves standardisées pour chaque niveau et type d\'évaluation' : 'Ready-to-use structural blueprints complying with Algerian inspectorate guidelines'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map(tmpl => (
          <div
            key={tmpl.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                  tmpl.schoolYear === '4AM' ? 'bg-purple-100 text-purple-800' :
                  tmpl.schoolYear === '3AM' ? 'bg-amber-100 text-amber-800' :
                  tmpl.schoolYear === '2AM' ? 'bg-teal-100 text-teal-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {tmpl.schoolYear}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                  {tmpl.examType}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-emerald-700">
                {tmpl.name}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {tmpl.description}
              </p>

              {/* Specs Badge Grid */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700 font-mono mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold">{tmpl.durationMinutes} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Score:</span>
                  <span className="font-bold">{tmpl.totalPoints} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sections Layout:</span>
                  <span className="font-bold text-[11px] text-emerald-700">
                    {(tmpl.structure?.includeReading ? 1 : 0) + (tmpl.structure?.includeLanguage ? 1 : 0) + (tmpl.structure?.includeVocabulary ? 1 : 0)} Sections + {tmpl.structure?.includeWriting ? 'Writing' : 'No Writing'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onUseTemplate(tmpl)}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>{isFr ? 'Générer à partir de ce modèle' : 'Generate with this Template'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
