export interface Goal {
  id: string;
  title: string;
  description: string;
  category: "environmental" | "social" | "governance";
  baselineValue: string;
  targetValue: string;
  currentValue?: string;
  deadline: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  category: "environmental" | "social" | "governance";
  suggestedTarget: string;
  unit: string;
}

export const goalTemplates: GoalTemplate[] = [
  // Environmental
  {
    id: "t1",
    title: "Reduce Electricity Consumption",
    description: "Lower overall electricity usage through efficiency measures",
    category: "environmental",
    suggestedTarget: "10%",
    unit: "reduction",
  },
  {
    id: "t2",
    title: "Implement Waste Segregation",
    description: "Set up proper waste segregation at all facilities",
    category: "environmental",
    suggestedTarget: "100%",
    unit: "compliance",
  },
  {
    id: "t3",
    title: "Water Usage Tracking",
    description: "Start monthly tracking of water consumption",
    category: "environmental",
    suggestedTarget: "Monthly",
    unit: "frequency",
  },
  {
    id: "t4",
    title: "Switch to LED Lighting",
    description: "Replace conventional lighting with energy-efficient LEDs",
    category: "environmental",
    suggestedTarget: "100%",
    unit: "coverage",
  },
  {
    id: "t5",
    title: "Reduce Paper Usage",
    description: "Implement digital-first practices to cut paper consumption",
    category: "environmental",
    suggestedTarget: "50%",
    unit: "reduction",
  },

  // Social
  {
    id: "t6",
    title: "Implement POSH Policy",
    description: "Create and communicate a comprehensive POSH policy",
    category: "social",
    suggestedTarget: "Complete",
    unit: "implementation",
  },
  {
    id: "t7",
    title: "Employee Training Program",
    description: "Conduct regular skill development sessions",
    category: "social",
    suggestedTarget: "Quarterly",
    unit: "frequency",
  },
  {
    id: "t8",
    title: "Health Insurance Coverage",
    description: "Provide health insurance to all full-time employees",
    category: "social",
    suggestedTarget: "100%",
    unit: "coverage",
  },
  {
    id: "t9",
    title: "Employee Satisfaction Survey",
    description: "Implement regular feedback collection from employees",
    category: "social",
    suggestedTarget: "Bi-annual",
    unit: "frequency",
  },
  {
    id: "t10",
    title: "Diversity Improvement",
    description: "Increase workforce diversity and inclusion",
    category: "social",
    suggestedTarget: "30%",
    unit: "target",
  },

  // Governance
  {
    id: "t11",
    title: "Document Code of Conduct",
    description: "Create a formal employee code of conduct",
    category: "governance",
    suggestedTarget: "Complete",
    unit: "implementation",
  },
  {
    id: "t12",
    title: "Regular Board Meetings",
    description: "Establish consistent board/leadership meeting schedule",
    category: "governance",
    suggestedTarget: "Quarterly",
    unit: "frequency",
  },
  {
    id: "t13",
    title: "Data Privacy Policy",
    description: "Implement comprehensive data protection practices",
    category: "governance",
    suggestedTarget: "Complete",
    unit: "implementation",
  },
  {
    id: "t14",
    title: "Vendor Due Diligence",
    description: "Establish formal vendor evaluation process",
    category: "governance",
    suggestedTarget: "Complete",
    unit: "implementation",
  },
  {
    id: "t15",
    title: "Whistleblower Policy",
    description: "Create a safe reporting mechanism for concerns",
    category: "governance",
    suggestedTarget: "Complete",
    unit: "implementation",
  },
];

export const mockGoals: Goal[] = [
  {
    id: "g1",
    title: "Reduce Electricity Consumption",
    description: "Lower overall electricity usage through efficiency measures",
    category: "environmental",
    baselineValue: "15,000 kWh/month",
    targetValue: "13,500 kWh/month (10% reduction)",
    currentValue: "14,200 kWh/month",
    deadline: "2025-06-30",
    status: "in_progress",
  },
  {
    id: "g2",
    title: "Implement POSH Policy",
    description: "Create and communicate a comprehensive POSH policy",
    category: "social",
    baselineValue: "No policy",
    targetValue: "Policy published & training complete",
    deadline: "2025-03-31",
    status: "in_progress",
  },
  {
    id: "g3",
    title: "Implement Waste Segregation",
    description: "Set up proper waste segregation at all facilities",
    category: "environmental",
    baselineValue: "0% facilities",
    targetValue: "100% facilities",
    currentValue: "100% facilities",
    deadline: "2025-01-15",
    status: "completed",
  },
  {
    id: "g4",
    title: "Document Code of Conduct",
    description: "Create a formal employee code of conduct",
    category: "governance",
    baselineValue: "No document",
    targetValue: "Published document",
    deadline: "2025-02-28",
    status: "not_started",
  },
];
