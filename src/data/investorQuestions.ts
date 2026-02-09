export interface InvestorQuestion {
  id: string;
  category: "environmental" | "social" | "governance";
  question: string;
  framework?: string; // CDP, SASB, GRI, etc.
  autoAnswer?: string; // Auto-generated based on ESG data
  customAnswer?: string;
  importance: "high" | "medium" | "low";
}

export const investorQuestions: InvestorQuestion[] = [
  // Environmental Questions
  {
    id: "env-1",
    category: "environmental",
    question: "Does your company track and report greenhouse gas emissions?",
    framework: "CDP",
    autoAnswer: "Yes, we track Scope 1 and Scope 2 emissions monthly using standardized emission factors. Our current tracking covers electricity consumption and fuel usage across all facilities.",
    importance: "high",
  },
  {
    id: "env-2",
    category: "environmental",
    question: "What are your current carbon emission reduction targets?",
    framework: "SASB",
    autoAnswer: "We have set targets to reduce our carbon emissions by 15% over the next 12 months through energy efficiency improvements and renewable energy adoption.",
    importance: "high",
  },
  {
    id: "env-3",
    category: "environmental",
    question: "How do you manage water usage and waste in your operations?",
    framework: "GRI",
    autoAnswer: "We have implemented water usage monitoring and waste segregation programs. Our facilities practice dry and wet waste separation with proper disposal protocols.",
    importance: "medium",
  },
  {
    id: "env-4",
    category: "environmental",
    question: "Do you have renewable energy initiatives in place?",
    framework: "CDP",
    autoAnswer: "We are currently evaluating solar panel installation for our facilities and exploring renewable energy procurement options.",
    importance: "medium",
  },
  {
    id: "env-5",
    category: "environmental",
    question: "What environmental management systems or certifications do you have?",
    framework: "GRI",
    autoAnswer: "We are working towards implementing environmental management best practices. While not ISO 14001 certified, we follow structured environmental protocols.",
    importance: "low",
  },

  // Social Questions
  {
    id: "soc-1",
    category: "social",
    question: "Do you have a formal diversity and inclusion policy?",
    framework: "SASB",
    autoAnswer: "Yes, we have a documented diversity and inclusion policy that promotes equal opportunity hiring and an inclusive workplace culture.",
    importance: "high",
  },
  {
    id: "soc-2",
    category: "social",
    question: "What employee health and safety measures are in place?",
    framework: "GRI",
    autoAnswer: "We have comprehensive health and safety protocols including regular safety training, emergency procedures, and workplace safety audits.",
    importance: "high",
  },
  {
    id: "soc-3",
    category: "social",
    question: "Do you have a POSH (Prevention of Sexual Harassment) policy?",
    framework: "Local Compliance",
    autoAnswer: "Yes, we have a POSH policy in place with an Internal Complaints Committee (ICC) and regular employee awareness training.",
    importance: "high",
  },
  {
    id: "soc-4",
    category: "social",
    question: "What training and development programs do you offer employees?",
    framework: "GRI",
    autoAnswer: "We offer regular skill development training, leadership programs, and professional growth opportunities for all employees.",
    importance: "medium",
  },
  {
    id: "soc-5",
    category: "social",
    question: "How do you engage with local communities?",
    framework: "GRI",
    autoAnswer: "We participate in community initiatives and support local causes through employee volunteering and CSR programs.",
    importance: "low",
  },

  // Governance Questions
  {
    id: "gov-1",
    category: "governance",
    question: "Do you have a formal Code of Conduct for employees and vendors?",
    framework: "SASB",
    autoAnswer: "Yes, we have a comprehensive Code of Conduct that applies to all employees and vendors, covering ethical business practices and compliance expectations.",
    importance: "high",
  },
  {
    id: "gov-2",
    category: "governance",
    question: "How is your board composed in terms of independence and diversity?",
    framework: "GRI",
    autoAnswer: "Our leadership team includes diverse perspectives. We are working towards formal board independence guidelines as we scale.",
    importance: "high",
  },
  {
    id: "gov-3",
    category: "governance",
    question: "Do you have anti-corruption and whistleblower policies?",
    framework: "SASB",
    autoAnswer: "Yes, we have anti-corruption policies and a confidential whistleblower mechanism for reporting concerns without fear of retaliation.",
    importance: "high",
  },
  {
    id: "gov-4",
    category: "governance",
    question: "How do you manage data privacy and cybersecurity?",
    framework: "SASB",
    autoAnswer: "We follow data protection best practices with secure data handling, access controls, and regular security assessments.",
    importance: "medium",
  },
  {
    id: "gov-5",
    category: "governance",
    question: "What is your approach to ESG risk management?",
    framework: "CDP",
    autoAnswer: "We have identified key ESG risks and are implementing mitigation strategies through our sustainability tracking and goal-setting framework.",
    importance: "medium",
  },
];

export const frameworkDescriptions: Record<string, string> = {
  CDP: "Carbon Disclosure Project - Global disclosure system for environmental impact",
  SASB: "Sustainability Accounting Standards Board - Industry-specific sustainability standards",
  GRI: "Global Reporting Initiative - Comprehensive sustainability reporting framework",
  "Local Compliance": "India-specific regulatory requirements",
};
