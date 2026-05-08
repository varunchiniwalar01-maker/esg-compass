export type CategoryType = "company_profile" | "energy" | "water" | "waste" | "renewable" | "reporting" | "social" | "governance";

export interface AssessmentQuestion {
  id: string;
  category: CategoryType;
  question: string;
  type: "yesno" | "numeric" | "multiple";
  options?: string[];
  unit?: string;
  helpText?: string;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // --- Company Profile ---
  {
    id: "revenue",
    category: "company_profile",
    question: "What is your company's annual revenue?",
    type: "numeric",
    unit: "INR Cr",
    helpText: "Used to calculate carbon and environmental intensities.",
  },
  {
    id: "sector",
    category: "company_profile",
    question: "What primary sector does your company operate in?",
    type: "multiple",
    options: ["technology", "manufacturing", "services", "retail", "agriculture", "construction", "default"],
  },

  // --- Pillar 1: Energy & Carbon Emissions ---
  {
    id: "electricity",
    category: "energy",
    question: "What is your electricity consumption?",
    type: "numeric",
    unit: "kWh",
  },
  {
    id: "diesel",
    category: "energy",
    question: "How much diesel does your company consume?",
    type: "numeric",
    unit: "Liters",
  },
  {
    id: "lpg",
    category: "energy",
    question: "How much LPG / PNG does your company consume?",
    type: "numeric",
    unit: "kg",
  },
  {
    id: "petrol",
    category: "energy",
    question: "How much petrol does your company consume?",
    type: "numeric",
    unit: "Liters",
  },

  // --- Pillar 2: Water Management ---
  {
    id: "water_withdrawn",
    category: "water",
    question: "What is your total water withdrawal?",
    type: "numeric",
    unit: "KL",
  },
  {
    id: "water_recycled",
    category: "water",
    question: "How much water do you recycle/reuse?",
    type: "numeric",
    unit: "KL",
  },
  {
    id: "water_treated",
    category: "water",
    question: "How much wastewater is treated before discharge?",
    type: "numeric",
    unit: "KL",
  },

  // --- Pillar 3: Waste Management ---
  {
    id: "waste_total",
    category: "waste",
    question: "What is your total waste generation?",
    type: "numeric",
    unit: "Tonnes",
  },
  {
    id: "waste_hazardous",
    category: "waste",
    question: "Of your total waste, how much is hazardous?",
    type: "numeric",
    unit: "Tonnes",
  },
  {
    id: "waste_recycled",
    category: "waste",
    question: "Of your total waste, how much is recycled/reused?",
    type: "numeric",
    unit: "Tonnes",
  },

  // --- Pillar 4: Renewable Initiatives ---
  {
    id: "renew_pct",
    category: "renewable",
    question: "What is your renewable energy share?",
    type: "numeric",
    unit: "%",
  },
  {
    id: "green_capex",
    category: "renewable",
    question: "What are your total Green Capex investments?",
    type: "numeric",
    unit: "INR",
  },

  // --- Pillar 5: Reporting Quality & Targets ---
  {
    id: "policy",
    category: "reporting",
    question: "Do you have an environmental policy in place?",
    type: "yesno",
  },
  {
    id: "targets",
    category: "reporting",
    question: "Have you set any environmental reduction targets?",
    type: "yesno",
  },
  {
    id: "verify",
    category: "reporting",
    question: "Do you have third-party verification for your data?",
    type: "yesno",
  },

  // --- Optional: Social (10 questions) ---
  {
    id: "s1",
    category: "social",
    question: "Do you have a POSH (Prevention of Sexual Harassment) policy?",
    type: "yesno",
    helpText: "Mandatory for organizations with 10+ employees in India",
  },
  {
    id: "s2",
    category: "social",
    question: "What is your current employee count?",
    type: "numeric",
    unit: "employees",
  },
  {
    id: "s3",
    category: "social",
    question: "What percentage of your workforce are women?",
    type: "numeric",
    unit: "%",
  },
  {
    id: "s4",
    category: "social",
    question: "Do you provide health insurance to all employees?",
    type: "yesno",
  },
  {
    id: "s5",
    category: "social",
    question: "Do you conduct regular employee satisfaction surveys?",
    type: "yesno",
  },
  {
    id: "s6",
    category: "social",
    question: "How often do you provide skill development training?",
    type: "multiple",
    options: ["Monthly", "Quarterly", "Annually", "Rarely"],
  },
  {
    id: "s7",
    category: "social",
    question: "Do you have a formal grievance redressal mechanism?",
    type: "yesno",
  },
  {
    id: "s8",
    category: "social",
    question: "What is your employee turnover rate?",
    type: "multiple",
    options: ["Under 10%", "10-20%", "20-30%", "Over 30%"],
  },
  {
    id: "s9",
    category: "social",
    question: "Do you support any community or CSR initiatives?",
    type: "yesno",
  },
  {
    id: "s10",
    category: "social",
    question: "Do you have workplace safety protocols documented?",
    type: "yesno",
  },

  // --- Optional: Governance (10 questions) ---
  {
    id: "g1",
    category: "governance",
    question: "Do you have a documented Code of Conduct?",
    type: "yesno",
  },
  {
    id: "g2",
    category: "governance",
    question: "How often does your board/leadership team meet?",
    type: "multiple",
    options: ["Monthly", "Quarterly", "Twice a year", "Annually"],
  },
  {
    id: "g3",
    category: "governance",
    question: "Do you have an anti-bribery/anti-corruption policy?",
    type: "yesno",
  },
  {
    id: "g4",
    category: "governance",
    question: "Are financial audits conducted annually?",
    type: "yesno",
    helpText: "Statutory audits by registered auditors",
  },
  {
    id: "g5",
    category: "governance",
    question: "Do you have a whistleblower protection policy?",
    type: "yesno",
  },
  {
    id: "g6",
    category: "governance",
    question: "What percentage of board members are independent?",
    type: "numeric",
    unit: "%",
    helpText: "Non-executive, non-family members",
  },
  {
    id: "g7",
    category: "governance",
    question: "Do you have documented data privacy practices?",
    type: "yesno",
  },
  {
    id: "g8",
    category: "governance",
    question: "How do you handle vendor/supplier due diligence?",
    type: "multiple",
    options: [
      "Formal evaluation process",
      "Basic background checks",
      "Informal assessment",
      "No process",
    ],
  },
  {
    id: "g9",
    category: "governance",
    question: "Do you have succession planning for key roles?",
    type: "yesno",
  },
  {
    id: "g10",
    category: "governance",
    question: "Are board meeting minutes documented and stored?",
    type: "yesno",
  },
];

export const categoryInfo: Record<CategoryType, { label: string; description: string; color: string; bgColor: string; isOptional?: boolean }> = {
  company_profile: {
    label: "Company Profile",
    description: "Basic metrics used to benchmark your score.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  energy: {
    label: "Energy & Carbon",
    description: "Scope 1 & 2 Emissions Data",
    color: "text-chart-1",
    bgColor: "bg-chart-1/20",
  },
  water: {
    label: "Water Management",
    description: "Water usage and recycling",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
  },
  waste: {
    label: "Waste Management",
    description: "Hazardous and non-hazardous waste",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  renewable: {
    label: "Renewable Initiatives",
    description: "Green Capex and Renewable share",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
  },
  reporting: {
    label: "Reporting Quality",
    description: "Policies and Target setting",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
  social: {
    label: "Social (Optional)",
    description: "How you treat employees and community",
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
    isOptional: true,
  },
  governance: {
    label: "Governance (Optional)",
    description: "How your business is governed and managed",
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
    isOptional: true,
  },
};
