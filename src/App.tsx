import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Download, FileText, Sparkles, BookOpen, MapPin, 
  Compass, ShieldAlert, Briefcase, GraduationCap, Heart, CheckCircle2, 
  ChevronRight, Send, AlertCircle, Copy, Check, Menu, X, ArrowUpRight, 
  Terminal, Calendar, Clock, Award, Globe, MessageSquare, Linkedin, Github, Mail, RefreshCw,
  Camera, Upload
} from 'lucide-react';

import { PROFILE, PROJECTS } from './data';
import { Project } from './types';
import CaseStudyPanel from './components/CaseStudyPanel';
import PlaygroundSandbox from './components/PlaygroundSandbox';
import SkillsSection from './components/SkillsSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState<boolean>(false);
  
  // Profile Picture state with localStorage persistence
  const [profilePic, setProfilePic] = useState<string>(() => {
    return localStorage.getItem('pragya_portfolio_profile_pic') || '/src/assets/images/pragya_portrait_1783243110748.jpg';
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('pragya_portfolio_profile_pic', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfilePic = () => {
    setProfilePic('/src/assets/images/pragya_portrait_1783243110748.jpg');
    localStorage.removeItem('pragya_portfolio_profile_pic');
  };
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  // UTC time state
  const [currentTime, setCurrentTime] = useState<string>('2026-07-05 09:17:55 UTC');

  useEffect(() => {
    // Update scrolled state
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section highlights
      const sections = ['home', 'about', 'skills', 'projects', 'playground', 'journey', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormLoading(true);
    // Simulate real server delivery
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  // Mock Resume Download
  const handleDownloadResume = () => {
    alert("Pragya's Premium Resume Download: This triggers a stylized resume PDF download. In production, this hosts her custom double-column layout.");
  };

  const filteredProjects = projectCategoryFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === projectCategoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      
      {/* 1. Header & Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`} id="app-navigation-bar">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo & Internship status bar */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="font-display font-bold text-slate-900 text-lg sm:text-xl tracking-tight flex items-center gap-2 group cursor-pointer"
              id="header-brand-logo"
            >
              <span className="w-5.5 h-5.5 rounded bg-slate-950 text-white font-mono font-bold flex items-center justify-center text-xs group-hover:bg-blue-600 transition-colors">
                P
              </span>
              <span>PRAGYA GROVER</span>
            </button>

            {/* Glowing Available Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wide">
                Available for PM & Design Internships
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'AI Skills', id: 'skills' },
                { label: 'Projects', id: 'projects' },
                { label: 'AI Playground', id: 'playground' },
                { label: 'Journey', id: 'journey' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item.id 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                  id={`nav-item-desktop-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-4.5 py-2.5 bg-slate-950 hover:bg-blue-600 text-white rounded-lg font-semibold text-xs transition-all duration-300 shadow-sm inline-flex items-center gap-1 hover:-translate-y-0.5 cursor-pointer"
              id="desktop-let-connect-cta"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-700"
              aria-label="Toggle Menu"
              id="mobile-menu-hamburger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] bg-white border-b border-slate-100 shadow-xl z-30 p-6 flex flex-col space-y-4 lg:hidden font-sans"
            id="mobile-navigation-drawer"
          >
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'AI Skills', id: 'skills' },
              { label: 'Projects', id: 'projects' },
              { label: 'AI Playground', id: 'playground' },
              { label: 'Learning Journey', id: 'journey' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left font-semibold text-base py-2 border-b border-slate-50 ${
                  activeSection === item.id ? 'text-blue-600' : 'text-slate-600'
                }`}
                id={`nav-item-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-center py-3 bg-slate-950 text-white rounded-xl font-semibold text-sm transition-all"
              id="mobile-connect-cta"
            >
              Let's Connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 relative overflow-hidden bg-white">
        
        {/* Soft background glow decoration */}
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute left-10 top-1/3 w-72 h-72 bg-indigo-50/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-mono font-bold tracking-wide border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>B.Sc. (Hons.) Computer Science Student Exploring AI Product Design</span>
            </div>

            <div className="space-y-3.5">
              <span className="text-slate-400 font-display font-medium text-xl sm:text-2xl block tracking-tight">
                Hi, I'm
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                {PROFILE.name}
              </h1>
              
              <p className="text-slate-700 font-display font-medium text-base sm:text-lg tracking-tight leading-relaxed pt-1">
                Aspiring AI Product Manager • AI Design Learner • Prompt Engineering Enthusiast
              </p>
              
              {/* Specialized roles indicators */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200/50">
                  AI Product Management
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200/50">
                  AI Design & UX
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200/50">
                  Prompt Engineering
                </span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-light">
              {PROFILE.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3.5 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                id="hero-view-portfolio-btn"
              >
                <span>View Practical Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadResume}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                id="hero-download-resume-btn"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 flex flex-wrap gap-x-6 gap-y-3 max-w-lg border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">5 AI Case Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">3 Product Concepts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">Learning AI Since 2026</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Portrait & Links Panel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              
              {/* Portrait Frame */}
              <div className="relative w-72 h-72 sm:w-85 sm:h-85 rounded-[40px] overflow-hidden border-8 border-white bg-slate-100 shadow-2xl group">
                <img
                  src={profilePic}
                  alt="Pragya Grover Corporate Headshot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  id="hero-pragya-headshot"
                />
                
                {/* Image Edit Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-full shadow-lg cursor-pointer transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <Camera className="w-4 h-4 text-slate-600" />
                    <span>Upload Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfilePicChange} 
                      className="hidden" 
                    />
                  </label>
                  
                  {profilePic !== '/src/assets/images/pragya_portrait_1783243110748.jpg' && (
                    <button
                      onClick={handleResetProfilePic}
                      className="flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-[10px] font-medium rounded-full shadow-md hover:bg-red-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Reset to original</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Helper Hint */}
              <div className="text-center mt-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                  <Upload className="w-3 h-3 text-blue-500 animate-pulse" />
                  Hover photo to change/upload your natural picture!
                </span>
              </div>

              {/* Floating Social Icons Dock */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="p-2.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer"
                  aria-label="Email"
                  title="Email Pragya"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>

              {/* Floating badge info */}
              <div className="absolute -left-6 bottom-8 bg-white/95 backdrop-blur px-4 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">University of Delhi</span>
                  <span className="text-xs font-semibold text-slate-800">Academic Honors Student</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-xl text-left space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">MY STORY & OUTLOOK</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              My Journey into AI Product Design
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
            {/* Story text column */}
            <div className="lg:col-span-7 space-y-6 text-left text-slate-600 leading-relaxed text-base">
              <p>
                {PROFILE.aboutStory}
              </p>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">WHAT I'M LEARNING</span>
                <p className="text-slate-700 font-medium text-sm sm:text-base">
                  Developing foundational skills and exploring user-centered design paradigms for generative AI:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm pt-1">
                  {[
                    "User Research",
                    "Prompt Design",
                    "AI Workflow Design",
                    "Product Thinking",
                    "Figma Prototyping",
                    "Conversational UX"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths / Attributes cards column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block text-left">Core Strengths</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {PROFILE.strengths.map((str, idx) => (
                  <div 
                    key={str} 
                    className="bg-white p-4 rounded-xl border border-slate-100/80 shadow-sm flex items-center gap-3"
                    id={`strength-item-${idx}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-mono font-bold flex items-center justify-center text-sm">
                      0{idx + 1}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Skills Matrix Section */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">SKILLS & TOOLS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Skills & Tools
            </h2>
            <p className="text-slate-500 text-sm">
              My current skills and the areas I'm actively learning and practicing.
            </p>
          </div>

          <SkillsSection />

        </div>
      </section>

      {/* 5. Projects & Case Studies Grid Section */}
      <section id="projects" className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="text-left space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">PRACTICAL PROFILES</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Practical Project Case Studies
              </h2>
              <p className="text-slate-500 text-sm">
                Ranging from starter prompts to a fully orchestrated centerpiece AI Startup Concept.
              </p>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', name: 'All' },
                { id: 'AI Product Management', name: 'Product' },
                { id: 'AI Design', name: 'UX & Design' },
                { id: 'Prompt Engineering', name: 'Prompt Eng' },
              ].map((filt) => (
                <button
                  key={filt.id}
                  onClick={() => setProjectCategoryFilter(filt.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                    projectCategoryFilter === filt.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                  }`}
                  id={`project-filter-btn-${filt.id.replace(/\s+/g, '-')}`}
                >
                  {filt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj, idx) => {
              const isCenterpiece = proj.difficulty === 'Centerpiece';
              return (
                <div 
                  key={proj.id}
                  className={`bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                    isCenterpiece ? 'border-blue-200 ring-2 ring-blue-500/10' : 'border-slate-100'
                  }`}
                  id={`project-card-${proj.id}`}
                >
                  <div className="p-6 sm:p-8 space-y-5">
                    
                    {/* Tags */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {proj.category}
                      </span>
                      
                      {isCenterpiece ? (
                        <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20 animate-pulse">
                          🏆 Portfolio Centerpiece
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          {proj.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Headline Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-mono">
                        "{proj.subtitle}"
                      </p>
                    </div>

                    {/* Brief constraints deconstruct */}
                    <div className="space-y-3 pt-3 border-t border-slate-50">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">THE OBJECTIVE</span>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed mt-0.5">{proj.objective}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">CORE TOOLS & STACKS</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {proj.tools.map(tool => (
                            <span key={tool} className="text-[10px] font-mono bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-200/40">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Card bottom CTA */}
                  <div className="px-6 py-4 sm:px-8 sm:py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1} / {PROJECTS.length}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        setCaseStudyOpen(true);
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-slate-950 inline-flex items-center gap-1 hover:translate-x-1 transition-all cursor-pointer"
                      id={`read-case-study-${proj.id}`}
                    >
                      <span>Read Deep Case Study</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. AI Playground Section */}
      <section id="playground" className="py-20 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">INTERACTIVE PROMPT STUDIO</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Test Pragya's System Prompts
            </h2>
            <p className="text-slate-500 text-sm">
              Execute live, custom-engineered LLM pipelines and audit instruction-following directly from your browser.
            </p>
          </div>

          <PlaygroundSandbox />

        </div>
      </section>

      {/* 7. Learning Journey & Curiosity Section */}
      <section id="journey" className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">CURIOSITY & JOURNEY</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Curiosity & Growth
            </h2>
            <p className="text-slate-500 text-sm text-center">
              A peek into my ongoing self-guided training, active experiments, and inspiration sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Currently Learning */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="currently-learning-card">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900">Currently Learning</h4>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Focus areas</p>
                </div>
                <ul className="space-y-2.5 pt-1 text-sm text-slate-600">
                  {["Prompt Engineering", "Figma", "AI Product Thinking", "Design Systems", "User Research"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. Learning Journey */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="learning-journey-card">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900">Learning Journey</h4>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Chronology of exploration</p>
                </div>
                
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex flex-col items-center text-center bg-slate-50 p-2 rounded-lg border border-slate-100/60">
                    <span className="font-mono font-bold text-indigo-600 text-[10px] tracking-wider uppercase">2026</span>
                    <span className="text-slate-700 font-medium">Started exploring AI</span>
                  </div>
                  <div className="text-center text-slate-300 font-bold leading-none py-0.5">↓</div>
                  <div className="text-center bg-slate-50 p-2 rounded-lg border border-slate-100/60 text-slate-700 font-medium">
                    Learned Prompt Engineering
                  </div>
                  <div className="text-center text-slate-300 font-bold leading-none py-0.5">↓</div>
                  <div className="text-center bg-slate-50 p-2 rounded-lg border border-slate-100/60 text-slate-700 font-medium">
                    Designed first AI prototype
                  </div>
                  <div className="text-center text-slate-300 font-bold leading-none py-0.5">↓</div>
                  <div className="text-center bg-slate-50 p-2 rounded-lg border border-slate-100/60 text-slate-700 font-medium">
                    Created AI case studies
                  </div>
                  <div className="text-center text-slate-300 font-bold leading-none py-0.5">↓</div>
                  <div className="text-center bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50 text-indigo-950 font-semibold">
                    Preparing for internships
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Books & Resources */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="books-resources-card">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900">Books & Resources</h4>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Curiosity inspired by</p>
                </div>
                
                <div className="space-y-3.5 pt-1 text-sm text-slate-600">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">Books</span>
                    <div className="space-y-1 mt-1 font-medium">
                      <p className="italic text-slate-700">Design of Everyday Things</p>
                      <p className="italic text-slate-700">Sprint</p>
                      <p className="italic text-slate-700">Inspired</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">Leaders & Platforms</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {["OpenAI", "Google", "Canva", "Figma"].map((brand) => (
                        <span key={brand} className="text-[11px] font-semibold px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-100/80 rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. What I'm Building Now */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="building-now-card">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900">What I'm Building</h4>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Currently working on</p>
                </div>
                <ul className="space-y-2 pt-1 text-sm text-slate-700 font-medium">
                  {[
                    "AI Resume Assistant",
                    "AI Travel Planner",
                    "Prompt Library",
                    "AI Product Case Study"
                  ].map((project) => (
                    <li key={project} className="flex items-center gap-2 p-1.5 bg-emerald-50/20 border border-emerald-100/30 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">GET IN TOUCH</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Initiate a Partnership
            </h2>
            <p className="text-slate-500 text-sm">
              I am actively seeking internship, co-op, or junior positions where I can apply my prompt-as-logic workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 max-w-5xl mx-auto items-start">
            
            {/* Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h3 className="text-lg font-display font-bold text-slate-900">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Feel free to drop a line. I typically respond to all industry inquiries and recruiter scheduling slots within 12 hours.
              </p>

              <div className="space-y-4 pt-3">
                
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Primary Email</span>
                    <a href="mailto:groverpragya61@gmail.com" className="text-sm font-semibold text-slate-800 hover:text-blue-600 break-all">
                      groverpragya61@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Professional Network</span>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-800 hover:text-blue-600">
                      linkedin.com/in/pragya-grover
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Current Base</span>
                    <span className="text-sm font-semibold text-slate-800">
                      Delhi, India (Open to Relocation)
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Live Message Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-lg">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-6 text-left">
                Send an Instant Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono"
                      placeholder="e.g., recruiter@startup.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase block">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono"
                    placeholder="e.g., Interview Request / Collaboration opportunity"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase block">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono resize-none"
                    placeholder="Type your proposal details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading || !formData.name || !formData.email || !formData.message}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow ${
                    formLoading || !formData.name || !formData.email || !formData.message
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-950 hover:bg-blue-600 text-white cursor-pointer hover:-translate-y-0.5'
                  }`}
                  id="contact-form-submit-btn"
                >
                  {formLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending secure brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs font-mono mt-3"
                      id="contact-form-success-toast"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-emerald-950">Dispatch Succeeded!</span>
                        <span>Your brief was logged safely. Pragya will contact you shortly.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Footer & Back to top */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="text-center sm:text-left space-y-1">
            <span className="font-display font-bold text-white text-base tracking-tight">PRAGYA GROVER</span>
            <p className="text-xs text-slate-500 font-mono">
              Aspiring AI Product Manager • AI Design Learner
            </p>
          </div>

          <p className="text-xs font-mono text-slate-500">
            &copy; 2026 Pragya Grover. Designed with absolute empathy for AI workflows. All Rights Reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1.5 cursor-pointer bg-slate-800 px-3.5 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            id="back-to-top-btn"
          >
            <span>Back to top</span>
            <ArrowRight className="-rotate-90 w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* 10. Immersive Case Study Slide-over Panel */}
      <CaseStudyPanel
        project={selectedProject}
        isOpen={caseStudyOpen}
        onClose={() => {
          setCaseStudyOpen(false);
          setSelectedProject(null);
        }}
      />

    </div>
  );
}
