import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Brain, Layout, Sparkles, Sliders, CheckSquare, Layers } from 'lucide-react';
import { SKILLS } from '../data';
import { SkillItem } from '../types';

const getLevelPercentage = (level: string) => {
  switch (level) {
    case 'Learning': return 35;
    case 'Currently Exploring': return 50;
    case 'Practicing': return 70;
    case 'Intermediate': return 85;
    case 'Comfortable': return 100;
    default: return 50;
  }
};

export default function SkillsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Competencies' },
    { id: 'AI Product Management', name: 'Product Management' },
    { id: 'AI Design', name: 'AI Design & UX' },
    { id: 'Prompt Engineering', name: 'Prompt Engineering' },
    { id: 'Tools', name: 'Tools' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Product Management':
        return <Brain className="w-5 h-5 text-blue-500" />;
      case 'AI Design':
        return <Layout className="w-5 h-5 text-purple-500" />;
      case 'Prompt Engineering':
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sliders className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredSkills = selectedFilter === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedFilter || (selectedFilter === 'Tools' && s.category === 'Tools'));

  return (
    <div className="space-y-8" id="skills-matrix-module">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              selectedFilter === cat.id
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
            id={`skills-filter-btn-${cat.id.replace(/\s+/g, '-')}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of skill cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between group"
            id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/50 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {getCategoryIcon(skill.category)}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Status</span>
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-mono font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-100">{skill.level}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h4 className="text-base font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h4>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {skill.category}
                </p>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed min-h-[64px]">
                {skill.explanation}
              </p>
            </div>

            {/* Custom pill gauge bar */}
            <div className="mt-5 pt-4 border-t border-slate-55 space-y-1">
              <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                <span>Learning</span>
                <span>Comfortable</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getLevelPercentage(skill.level)}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
