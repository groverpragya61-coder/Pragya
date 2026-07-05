import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyPanel({ project, isOpen, onClose }: CaseStudyPanelProps) {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900 z-50 cursor-zoom-out"
          />

          {/* Slide-over Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl z-50 overflow-y-auto flex flex-col font-sans"
            id={`case-study-panel-${project.id}`}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {project.difficulty} Level
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close Case Study"
                id="close-case-study-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Case Study Content */}
            <div className="p-8 sm:p-12 max-w-3xl mx-auto flex-1 space-y-12">
              {/* Cover Info */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  "{project.subtitle}"
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-b border-slate-100 py-6 text-sm">
                  <div>
                    <span className="text-slate-400 block font-mono text-xs">MY ROLE</span>
                    <span className="font-semibold text-slate-800">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono text-xs">TOOLS USED</span>
                    <span className="font-semibold text-slate-800">{project.tools.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono text-xs">OBJECTIVE</span>
                    <span className="font-semibold text-slate-800">Solve Core Friction</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono text-xs">STATUS</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Ready to Audit
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Overview */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">1</span>
                  Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-base">
                  {caseStudy.overview}
                </p>
              </section>

              {/* 2. Problem Statement */}
              <section className="space-y-4 bg-red-50/40 p-6 rounded-2xl border border-red-100/50">
                <h2 className="text-xl font-display font-bold text-red-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-red-100 text-red-700 text-xs font-mono font-bold">2</span>
                  The Problem
                </h2>
                <p className="text-red-950 font-medium leading-relaxed">
                  {project.problem}
                </p>
                <p className="text-slate-600 leading-relaxed text-sm pt-2">
                  {caseStudy.problemDetailed}
                </p>
              </section>

              {/* 3. Research (Users & Pain Points) */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">3</span>
                  Target Users & Research
                </h2>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div>
                    <span className="font-semibold text-slate-800 text-sm block mb-1">User Persona Profile:</span>
                    <p className="text-slate-600 text-sm leading-relaxed">{caseStudy.research.users}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 text-sm block mb-2">Core User Pain Points:</span>
                    <ul className="space-y-2">
                      {caseStudy.research.painPoints.map((pain, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-600 items-start">
                          <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Solution */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">4</span>
                  The AI Solution
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {caseStudy.solution}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  {project.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-400 font-mono block">DELIVERABLE 0{idx + 1}</span>
                        <span className="text-sm font-semibold text-slate-800">{deliv}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Wireframes / Visual Layout */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">5</span>
                  User Interface & Wireframes
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {caseStudy.wireframes}
                </p>
                <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-xs font-mono text-slate-400 px-2 py-1 rounded bg-slate-100 uppercase">Interactive Wireframe Abstract</span>
                  <div className="w-full max-w-md h-32 border border-slate-200 bg-white rounded-lg p-4 flex flex-col justify-between text-left shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <div className="w-24 h-3 bg-slate-100 rounded"></div>
                      <div className="w-8 h-3 bg-slate-100 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-slate-50 rounded"></div>
                      <div className="w-4/5 h-2 bg-slate-50 rounded"></div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <div className="w-12 h-5 bg-slate-100 rounded"></div>
                      <div className="w-16 h-5 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic">Structural outline designed specifically for LLM prompt context delivery</p>
                </div>
              </section>

              {/* 6. AI Workflow & Prompts */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">6</span>
                  AI Workflow & Prompt Design
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {caseStudy.aiWorkflow}
                </p>
                
                {/* Prompt Examples */}
                <div className="space-y-4 pt-2">
                  {caseStudy.promptExamples.map((ex, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                          {ex.title}
                        </span>
                        <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          System Instruction
                        </span>
                      </div>
                      <div className="bg-slate-950 p-5 font-mono text-xs text-slate-300 leading-relaxed select-all overflow-x-auto whitespace-pre-wrap">
                        {ex.prompt}
                      </div>
                      <div className="bg-slate-50 px-5 py-3 text-xs text-slate-500 border-t border-slate-100">
                        <strong>Use Case Description:</strong> {ex.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Design Decisions */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">7</span>
                  Design Decisions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.designDecisions.map((decision, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 transition-colors">
                      <span className="text-[10px] font-mono text-blue-500 font-bold block mb-1">DECISION 0{idx + 1}</span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {decision}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 8. Challenges & Results */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-blue-600 text-xs font-mono font-bold">8</span>
                  Challenges & Practical Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-amber-50/30 border border-amber-100/50 space-y-2">
                    <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider font-mono">The Challenge</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.challenges}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/50 space-y-2">
                    <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider font-mono">Measurable Result</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.results}
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Lessons Learned & Next Steps */}
              <section className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-bold text-slate-900">Key Reflection</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {caseStudy.lessonsLearned}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-bold text-slate-900">Next Iteration Steps</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{caseStudy.nextSteps}</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Close CTA */}
              <div className="pt-10 text-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md inline-flex items-center gap-2 hover:-translate-y-0.5"
                  id="close-bottom-btn"
                >
                  Finished Reviewing Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
