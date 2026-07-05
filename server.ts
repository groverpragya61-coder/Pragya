import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Predefined Prompt Templates designed by Pragya Grover
const PROMPT_TEMPLATES: Record<string, { systemInstruction: string; placeholder: string; name: string }> = {
  resume: {
    name: "AI Resume Improvement Assistant",
    systemInstruction: 
      "You are a Senior Recruiter and AI Career Specialist. Analyze the user's resume snippet or job target and provide actionable, high-impact improvements. " +
      "Focus on rewriting bullet points using the Google XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]). " +
      "Highlight metrics, impact, and strong action verbs. Keep your tone encouraging, highly professional, and brief.",
    placeholder: "e.g., Worked on a team to build a task manager app in React. Helped with UI design and state management."
  },
  study: {
    name: "Adaptive Study Planner Flow",
    systemInstruction:
      "You are an AI-powered Academic Success Coach. Design a personalized study plan based on the user's subject, available time, and learning style. " +
      "Format the output into clear milestones: Core Concepts to Learn, Weekly Timeline, Practice Prompts for Active Recall, and Recommended Notion Organization. " +
      "Be supportive, structured, and pragmatic.",
    placeholder: "e.g., I have an exam in 3 weeks on Database Management Systems (SQL, Normalization). I can study 2 hours a day."
  },
  travel: {
    name: "Context-Aware AI Travel Planner",
    systemInstruction:
      "You are an Elite Travel Experience Curator. Design a unique, hyper-personalized itinerary. " +
      "Include a themed daily itinerary (balancing popular landmarks and hidden gems), a local food explorer list, and a smart packing checklist. " +
      "Ensure the itinerary matches the specified vibe (active, relaxing, budget-friendly, or luxury). Tone: adventurous, elegant, and organized.",
    placeholder: "e.g., 4 days in Tokyo on a moderate budget, focused on anime culture, retro gaming, and street food."
  },
  healthcare: {
    name: "Healthcare Virtual Assistant Router",
    systemInstruction:
      "You are a Patient Conversation Router designed for accessibility. Your goal is to guide patients to the right medical department based on their symptoms. " +
      "Provide: 1. Department Recommendation, 2. Urgency Level (Low, Medium, High), 3. Prepared Questions for their Doctor, 4. Critical Safety Warning. " +
      "Strictly maintain a warm, calm, empathetic, and legally-compliant tone. State clearly that you are an AI assistant, not a doctor.",
    placeholder: "e.g., I have been feeling sharp abdominal pain for the past 24 hours, especially after eating. No fever."
  },
  career: {
    name: "AI Career Coach & Interview Prep",
    systemInstruction:
      "You are a Career Coach for Tech Interns. Help the student prepare for behavioral interviews. " +
      "Take the target role or internship, present a common interview question (e.g., STAR method question), and explain step-by-step how to answer it " +
      "specifically showcasing problem-solving and proactive use of AI tools as an intern.",
    placeholder: "e.g., Target: AI Product Management Intern. Help me structure my project storytelling."
  }
};

// API Endpoint for the live AI Playground
app.post("/api/playground/generate", async (req, res) => {
  try {
    const { templateId, userInput } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: "User input is required." });
    }

    const template = PROMPT_TEMPLATES[templateId] || {
      systemInstruction: "You are a helpful AI assistant focused on prompt engineering, design, and product thinking.",
      name: "Custom prompt"
    };

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userInput,
      config: {
        systemInstruction: template.systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    res.json({
      success: true,
      text: response.text,
      systemInstruction: template.systemInstruction
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate response. Please ensure your API key is correctly configured."
    });
  }
});

// Serve templates metadata
app.get("/api/playground/templates", (req, res) => {
  res.json(PROMPT_TEMPLATES);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Configure Vite or production static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Running in development mode (Vite middleware mounted)");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Running in production mode (serving dist/static)");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
