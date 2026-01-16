export type CaseStudyResult = {
  metric: string;
  description: string;
};

export type CaseStudy = {
  id: number;
  title: string;
  category: string;
  client: string;
  duration: string;
  image: string;
  tags: string[];
  description: string;
  challenges: string[];
  solutions: string[];
  results: CaseStudyResult[];
  technologies: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Dook Travels - AI-Powered B2B Travel Platform",
    category: "Travel Technology",
    client: "Dook International",
    duration: "6 months",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    tags: ["B2B Platform", "Travel AI", "Booking System"],
    description:
      "Complete digital transformation of B2B travel operations with AI-powered booking, inventory management, and customer service automation.",
    challenges: [
      "Manual booking processes causing delays",
      "Inefficient inventory management across multiple suppliers",
      "Limited real-time availability tracking",
      "High customer service response times",
    ],
    solutions: [
      "AI-powered intelligent booking system",
      "Real-time inventory synchronization",
      "Automated pricing optimization",
      "24/7 AI customer support chatbot",
    ],
    results: [
      { metric: "75%", description: "Reduction in booking processing time" },
      { metric: "60%", description: "Increase in booking efficiency" },
      { metric: "40%", description: "Cost savings in operations" },
      { metric: "24/7", description: "AI customer support availability" },
    ],
    technologies: ["React", "Node.js", "MongoDB", "OpenAI API", "Real-time Analytics"],
  },
  {
    id: 2,
    title: "Enterprise AI Chat Platform",
    category: "Conversational AI",
    client: "Fortune 500 Company",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    tags: ["Enterprise AI", "Chat Platform", "Knowledge Base"],
    description:
      "Custom AI chat platform with advanced knowledge base integration for internal and external communications.",
    challenges: [
      "Scattered knowledge across multiple systems",
      "Inconsistent customer support responses",
      "High training costs for new employees",
      "Limited scalability of support team",
    ],
    solutions: [
      "Unified knowledge base with AI integration",
      "Context-aware chat responses",
      "Multi-language support",
      "Analytics and insights dashboard",
    ],
    results: [
      { metric: "85%", description: "Reduction in response time" },
      { metric: "90%", description: "Customer satisfaction increase" },
      { metric: "50%", description: "Training cost reduction" },
      { metric: "10x", description: "Support team scalability" },
    ],
    technologies: ["Python", "FastAPI", "Vector Database", "LLM Integration", "React"],
  },
  {
    id: 3,
    title: "AI Analytics Dashboard",
    category: "Business Intelligence",
    client: "E-commerce Leader",
    duration: "3 months",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Analytics", "Business Intelligence", "Data Visualization"],
    description:
      "Advanced analytics dashboard with AI-powered insights and predictive analytics for business decision making.",
    challenges: [
      "Data silos across departments",
      "Manual report generation",
      "Delayed insights for decision making",
      "Limited predictive capabilities",
    ],
    solutions: [
      "Unified data integration platform",
      "AI-powered automated insights",
      "Predictive analytics models",
      "Real-time dashboard with alerts",
    ],
    results: [
      { metric: "80%", description: "Faster decision making" },
      { metric: "65%", description: "Reduction in manual reporting" },
      { metric: "45%", description: "Improved forecast accuracy" },
      { metric: "24/7", description: "Real-time monitoring" },
    ],
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Apache Kafka"],
  },
  {
    id: 4,
    title: "Voice Assistant Automation for Customer Operations",
    category: "Voice AI",
    client: "Regional Services Network",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1559028006-44a36f1223a2?auto=format&fit=crop&q=80&w=800",
    tags: ["Voice Assistant", "Call Automation", "Customer Support"],
    description:
      "Voice AI assistant designed for inbound and outbound workflows, handling appointment scheduling, FAQs, and escalations at scale.",
    challenges: [
      "High call volumes with limited agents",
      "Inconsistent customer experiences",
      "Manual scheduling and follow-ups",
      "Slow call resolution times",
    ],
    solutions: [
      "Voice assistant for 24/7 call handling",
      "Intent-based routing and escalation",
      "Automated appointment scheduling",
      "Voice analytics for quality monitoring",
    ],
    results: [
      { metric: "62%", description: "Reduction in call handling time" },
      { metric: "3.2x", description: "Increase in handled calls" },
      { metric: "40%", description: "Lowered support costs" },
      { metric: "24/7", description: "Always-on voice support" },
    ],
    technologies: ["Python", "Speech-to-Text", "Text-to-Speech", "Twilio", "Node.js"],
  },
  {
    id: 5,
    title: "WhatsApp Intelligent Chatbot for Sales & Support",
    category: "Conversational AI",
    client: "Retail & D2C Brand",
    duration: "3 months",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    tags: ["WhatsApp Chatbot", "Lead Capture", "Support"],
    description:
      "WhatsApp chatbot that qualifies leads, answers product questions, and routes conversations to sales or support teams.",
    challenges: [
      "Slow response times on messaging channels",
      "Unqualified leads in the pipeline",
      "Lack of contextual handoffs",
      "Fragmented customer history",
    ],
    solutions: [
      "WhatsApp Business API integration",
      "Python chatbot workflows with lead scoring",
      "Context-aware routing to human agents",
      "CRM sync for conversation history",
    ],
    results: [
      { metric: "71%", description: "Faster first response" },
      { metric: "46%", description: "Increase in qualified leads" },
      { metric: "33%", description: "Higher conversion rate" },
      { metric: "24/7", description: "Always-available chatbot" },
    ],
    technologies: ["Python", "Chatbot Python", "WhatsApp Business API", "Node.js", "CRM Webhooks"],
  },
  {
    id: 6,
    title: "CRM Automation & Intelligent Pipeline Orchestration",
    category: "CRM Automation",
    client: "Enterprise Services Group",
    duration: "5 months",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    tags: ["CRM", "Automation", "Sales Ops"],
    description:
      "Automated CRM workflows that enrich leads, update pipelines, and trigger next-best actions for sales teams.",
    challenges: [
      "Manual data entry slowing sales teams",
      "Low visibility into pipeline health",
      "Inconsistent follow-ups",
      "Disjointed sales and marketing data",
    ],
    solutions: [
      "Python automation for lead enrichment",
      "Smart pipeline alerts and task creation",
      "Unified CRM activity timeline",
      "Automated follow-up sequences",
    ],
    results: [
      { metric: "52%", description: "Reduction in manual CRM updates" },
      { metric: "39%", description: "Increase in pipeline velocity" },
      { metric: "28%", description: "Higher sales productivity" },
      { metric: "2x", description: "More follow-ups completed" },
    ],
    technologies: ["Python", "Node.js", "CRM APIs", "Data Enrichment", "Workflow Automation"],
  },
  {
    id: 7,
    title: "EdTech AI: MCQ Generation, LMS & Live Classes",
    category: "EdTech",
    client: "Online Learning Platform",
    duration: "4 months",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    tags: ["EdTech", "MCQ Generation", "LMS", "Live Classes"],
    description:
      "AI-enabled EdTech suite with topic-based MCQ generation, test creation, answer evaluation, and an LMS for live interactive classes and content delivery.",
    challenges: [
      "Manual question paper creation",
      "Slow evaluation of student answers",
      "Fragmented LMS and live class tooling",
      "Limited content engagement tracking",
    ],
    solutions: [
      "Topic-based MCQ generator with difficulty controls",
      "Automated test creation and answer evaluation",
      "Integrated LMS with live interactive classes",
      "Content analytics and engagement dashboards",
    ],
    results: [
      { metric: "6x", description: "Faster test creation" },
      { metric: "70%", description: "Reduction in evaluation time" },
      { metric: "2.8x", description: "Increase in live class attendance" },
      { metric: "41%", description: "Higher content completion" },
    ],
    technologies: ["Python", "NLP", "LMS APIs", "Node.js", "React"],
  },
];
