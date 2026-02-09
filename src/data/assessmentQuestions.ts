export interface AssessmentQuestion {
  id: string;
  category: "environmental" | "social" | "governance";
  question: string;
  type: "yesno" | "numeric" | "multiple";
  options?: string[];
  unit?: string;
  helpText?: string;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // Environmental (10 questions)
  {
    id: "e1",
    category: "environmental",
    question: "Does your company track electricity consumption monthly?",
    type: "yesno",
    helpText: "Regular monitoring helps identify energy-saving opportunities",
  },
  {
    id: "e2",
    category: "environmental",
    question: "What percentage of your energy comes from renewable sources?",
    type: "numeric",
    unit: "%",
    helpText: "Include solar, wind, or renewable energy credits",
  },
  {
    id: "e3",
    category: "environmental",
    question: "Do you have a waste segregation system in place?",
    type: "yesno",
  },
  {
    id: "e4",
    category: "environmental",
    question: "How do you manage e-waste disposal?",
    type: "multiple",
    options: [
      "Government-authorized recycler",
      "Vendor take-back program",
      "No formal process",
      "Not applicable",
    ],
  },
  {
    id: "e5",
    category: "environmental",
    question: "Do you track water consumption at your facilities?",
    type: "yesno",
  },
  {
    id: "e6",
    category: "environmental",
    question: "Have you set any energy reduction targets?",
    type: "yesno",
  },
  {
    id: "e7",
    category: "environmental",
    question: "Do you track your company's carbon footprint?",
    type: "yesno",
    helpText: "Even basic tracking of electricity and fuel counts",
  },
  {
    id: "e8",
    category: "environmental",
    question: "What is your primary mode of employee commute?",
    type: "multiple",
    options: [
      "Company-provided transport",
      "Work from home majority",
      "Public transport encouraged",
      "Individual vehicles",
    ],
  },
  {
    id: "e9",
    category: "environmental",
    question: "Do you have a paper reduction or digital-first policy?",
    type: "yesno",
  },
  {
    id: "e10",
    category: "environmental",
    question: "How often do you review environmental practices?",
    type: "multiple",
    options: ["Quarterly", "Annually", "Occasionally", "Never"],
  },

  // Social (10 questions)
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

  // Governance (10 questions)
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

export const categoryInfo = {
  environmental: {
    label: "Environmental",
    description: "How your business impacts the environment",
    color: "text-chart-1",
    bgColor: "bg-chart-1",
  },
  social: {
    label: "Social",
    description: "How you treat employees and community",
    color: "text-chart-2",
    bgColor: "bg-chart-2",
  },
  governance: {
    label: "Governance",
    description: "How your business is governed and managed",
    color: "text-chart-3",
    bgColor: "bg-chart-3",
  },
};
