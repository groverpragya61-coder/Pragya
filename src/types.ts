export interface CaseStudy {
  overview: string;
  problemDetailed: string;
  research: {
    users: string;
    painPoints: string[];
    competitorAnalysis?: string;
  };
  solution: string;
  wireframes: string; // Describes visual layout/wireframe elements
  aiWorkflow: string; // Explains prompt systems & flows
  promptExamples: {
    title: string;
    description: string;
    prompt: string;
    output?: string;
  }[];
  designDecisions: string[];
  challenges: string;
  results: string;
  lessonsLearned: string;
  nextSteps: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Product Management' | 'AI Design' | 'Prompt Engineering';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Centerpiece';
  objective: string;
  problem: string;
  role: string;
  tools: string[];
  deliverables: string[];
  skills: string[];
  caseStudy: CaseStudy;
}

export interface SkillItem {
  name: string;
  category: 'AI Product Management' | 'AI Design' | 'Prompt Engineering' | 'Design & Strategy' | 'Tools';
  level: 'Learning' | 'Intermediate' | 'Comfortable' | 'Currently Exploring' | 'Practicing';
  explanation: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Education' | 'AI Learning' | 'Project Milestones' | 'Future Goals';
}
