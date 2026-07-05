import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Terminal, Copy, Check, AlertCircle, RefreshCw, Eye, CornerDownLeft, Info } from 'lucide-react';

interface Template {
  name: string;
  systemInstruction: string;
  placeholder: string;
}

export default function PlaygroundSandbox() {
  const [templates, setTemplates] = useState<Record<string, Template>>({});
  const [selectedKey, setSelectedKey] = useState<string>('resume');
  const [userInput, setUserInput] = useState<string>('');
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  // Load templates from API
  useEffect(() => {
    fetch('/api/playground/templates')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load templates");
        return res.json();
      })
      .then((data) => {
        setTemplates(data);
        // Pre-fill initial input with selected template's placeholder
        if (data[selectedKey]) {
          setUserInput(data[selectedKey].placeholder);
        }
      })
      .catch((err) => {
        console.error(err);
        // Fallback local templates if API has a hitch
        const localTemplates: Record<string, Template> = {
          resume: {
            name: "AI Resume Improvement Assistant",
            systemInstruction: "You are a Senior Recruiter and AI Career Specialist. Analyze the user's resume snippet and provide Google XYZ formula rewrites (Accomplished [X] as measured by [Y], by doing [Z]).",
            placeholder: "Worked on a team to build a task manager app in React. Helped with UI design."
          },
          study: {
            name: "Adaptive Study Planner Flow",
            systemInstruction: "You are an AI-powered Academic Success Coach. Design a personalized study plan with practice recall prompts and milestones.",
            placeholder: "I have an exam in 3 weeks on Database Management Systems (SQL). I can study 2 hours a day."
          }
        };
        setTemplates(localTemplates);
        setUserInput(localTemplates[selectedKey]?.placeholder || '');
      });
  }, []);

  // Update input when template changes
  const handleTemplateChange = (key: string) => {
    setSelectedKey(key);
    setAiOutput('');
    setErrorMsg('');
    if (templates[key]) {
      setUserInput(templates[key].placeholder);
    }
  };

  // Run the generation
  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setAiOutput('');
    setErrorMsg('');

    try {
      const response = await fetch('/api/playground/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selectedKey, userInput })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Generation failed.");
      }

      setAiOutput(data.text);
    } catch (err: any) {
      console.warn("API Error, triggering elegant simulation fallback:", err);
      // Let's provide an outstanding simulated response so the UX remains world-class even if API key is not connected yet!
      setTimeout(() => {
        let simulatedResponse = "";
        if (selectedKey === 'resume') {
          simulatedResponse = 
            "### 🎯 Pragya's AI Resume Optimizer Output\n\n" +
            "Based on your input, here is the metric-driven Google XYZ formula rewrite:\n\n" +
            "**Before:** *" + userInput + "*\n\n" +
            "**After (XYZ Formula):**\n" +
            "• **Accomplished [X]:** Co-designed and engineered a responsive, high-performance Task Management web portal.\n" +
            "• **Measured by [Y]:** Improving state synchronization latency by **35%** and achieving a **94% usability satisfaction score** from user testing.\n" +
            "• **By doing [Z]:** Implementing modular React functional architecture, lazy-loaded components, and standard local storage state engines.\n\n" +
            "**Key Skill Tags Added:** React 18+, State Management, Client-Side Persistence, UX Prototyping.";
        } else if (selectedKey === 'study') {
          simulatedResponse =
            "### 📚 Personalized Academic Blueprint\n\n" +
            "Here is your study syllabus broken down into bite-sized milestones:\n\n" +
            "**Milestone 1: Core Fundamentals (Days 1-7)**\n" +
            "• Study SQL clauses (SELECT, GROUP BY) and Relational Database design patterns.\n" +
            "• *Active Recall Prompt:* 'Explain Boyce-Codd Normal Form (BCNF) using a humble library book example.'\n\n" +
            "**Milestone 2: Practical Application (Days 8-14)**\n" +
            "• Practice writing 15 complex JOIN queries. Set up local workspace schema models.\n" +
            "• *Notion Setup:* Log tracking columns with status properties [To Review, Mastered].\n\n" +
            "**Milestone 3: Exam Prep & Simulation (Days 15-21)**\n" +
            "• Practice solving 3 past exam question sets under a strict 60-minute mock limit.";
        } else if (selectedKey === 'travel') {
          simulatedResponse =
            "### ✈️ Curated Travel Experience\n\n" +
            "Here is your customized travel itinerary focusing on your specific interests:\n\n" +
            "**Day 1: Vintage & Nostalgia**\n" +
            "• *Morning:* Head to Akihabara. Skip main plazas, visit Super Potato for retro game exploration.\n" +
            "• *Afternoon:* Walk through Yanaka neighborhood for old-Tokyo traditional vibe and green tea.\n" +
            "• *Transit:* 20 mins walking/metro. Estimated walking budget: $12.\n\n" +
            "**Day 2: Hidden Flavors**\n" +
            "• *Evening:* Explore local under-the-tracks Yakitori alleyways in Yurakucho.\n" +
            "• *Vibe rating:* Active, cultural, highly immersive.";
        } else {
          simulatedResponse =
            "### 🏥 Patient Triage Intake Brief\n\n" +
            "**System Disclaimer:** *I am an AI assistant, not a licensed medical professional.*\n\n" +
            "**1. Recommended Department:** Gastroenterology / Outpatient Clinic\n" +
            "**2. Urgent Level:** Medium (Requires consultation within 24-48 hours, monitor for spikes)\n" +
            "**3. Doctor Preparation Questions:**\n" +
            "• Does the pain radiate to the back or shoulder blade?\n" +
            "• Have you noticed any changes in digestion or appetite since onset?\n" +
            "• Does taking an antacid or sitting upright alleviate symptoms?\n\n" +
            "**4. Critical Warning:** If you experience high fever, vomiting, or dizziness, immediately head to the nearest Emergency Department.";
        }
        
        setAiOutput(simulatedResponse);
        setErrorMsg("Note: Running in high-fidelity sandbox mode. Configure your GEMINI_API_KEY in the Secrets panel for fully live LLM outputs!");
      }, 1200);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, isCode: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const currentTemplate = templates[selectedKey];

  return (
    <div className="bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl" id="ai-playground-module">
      {/* Sandbox Navigation Header */}
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-blue-400" />
          <span className="font-display font-bold text-white text-base">Interactive AI System Sandbox</span>
        </div>
        
        {/* Dropdown / Tabs */}
        <div className="flex gap-2">
          {Object.keys(templates).map((key) => (
            <button
              key={key}
              onClick={() => handleTemplateChange(key)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-300 ${
                selectedKey === key
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
              id={`template-btn-${key}`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
        {/* Left Side: System prompt display */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                SYSTEM INSTRUCTIONS
              </h3>
              <button
                onClick={() => copyToClipboard(currentTemplate?.systemInstruction || '', true)}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                title="Copy Prompt"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              This is the actual system prompt designed and optimized by <strong>Pragya Grover</strong> for the{' '}
              <span className="font-semibold text-slate-700">{currentTemplate?.name}</span>.
            </p>

            <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed border border-slate-900 min-h-[160px] relative">
              <div className="absolute right-4 top-4 text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">
                Strict Guardrail
              </div>
              <span className="text-slate-500 block mb-2">// Initialized with temperature=0.7</span>
              {currentTemplate?.systemInstruction || 'Loading system instructions...'}
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 flex gap-3 text-xs text-blue-900">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Prompting Technique:</span>
              <p className="text-slate-600 leading-relaxed">
                Uses Role Specification, strict format schema guidelines, and negative constraints to eliminate hallucinations.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Execution & Terminal */}
        <div className="p-6 sm:p-8 bg-slate-50/30 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              LIVE INTERACTIVE EXECUTIVE
            </h3>

            {/* Input area */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold text-slate-400 block uppercase">
                Recruiter Sandbox Input
              </label>
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={currentTemplate?.placeholder}
                  className="w-full h-24 p-4 text-sm bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl shadow-sm outline-none resize-none transition-all font-mono placeholder:text-slate-400"
                  id="sandbox-textarea-input"
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">Shift</span>
                  <span>+</span>
                  <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">Enter</span>
                </div>
              </div>
            </div>

            {/* CTA Execution Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !userInput.trim()}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                isLoading || !userInput.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-950 hover:bg-blue-600 text-white cursor-pointer hover:-translate-y-0.5'
              }`}
              id="sandbox-execute-btn"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>Synthesizing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Play className="w-4.5 h-4.5 fill-current" />
                  <span>Execute Engineered Flow</span>
                </>
              )}
            </button>
          </div>

          {/* Output console terminal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                Terminal Output Console
              </span>
              {aiOutput && (
                <button
                  onClick={() => copyToClipboard(aiOutput, false)}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                >
                  {copiedOutput ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOutput ? 'Copied Brief' : 'Copy Brief'}</span>
                </button>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl min-h-[140px] p-5 font-mono text-xs leading-relaxed relative flex flex-col justify-between">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-slate-400 text-[11px]">Executing system instruction pipelines...</span>
                </div>
              ) : aiOutput ? (
                <div className="text-slate-200 space-y-2 whitespace-pre-wrap select-text">
                  {aiOutput}
                </div>
              ) : (
                <div className="text-slate-500 text-center py-8 italic flex flex-col items-center justify-center space-y-1.5">
                  <Terminal className="w-6 h-6 text-slate-600" />
                  <span>Terminal idle. Type in the sandbox and execute.</span>
                </div>
              )}

              {/* Sandbox notice */}
              {errorMsg && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[10px] text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
