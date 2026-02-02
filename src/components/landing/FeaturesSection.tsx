import { 
  ClipboardCheck, 
  LineChart, 
  Target, 
  Zap, 
  FileUp, 
  Share2,
  Leaf,
  Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ClipboardCheck,
    title: "ESG Assessment",
    description: "Answer 20-30 guided questions across Environmental, Social, and Governance areas to get your baseline ESG score.",
  },
  {
    icon: LineChart,
    title: "Visual Dashboard",
    description: "Track your ESG progress over time with intuitive charts, risk indicators, and monthly trend analysis.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and monitor sustainability goals with pre-built templates for energy, water, waste, and policies.",
  },
  {
    icon: Leaf,
    title: "Carbon Tracking",
    description: "Estimate your carbon emissions from electricity and fuel with automatic calculations and trend analysis.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Generate professional ESG summaries with strengths, gaps, and 90-day action plans at the click of a button.",
  },
  {
    icon: FileUp,
    title: "Document Storage",
    description: "Upload and organize policies, certificates, and utility bills organized by ESG category.",
  },
  {
    icon: Share2,
    title: "Shareable Reports",
    description: "Create read-only links to share your ESG snapshot with investors and stakeholders — no login required.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and stored securely. Only you control who sees your ESG information.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Everything You Need to Track ESG
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete toolkit designed for simplicity — no sustainability expertise required.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-background hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent mb-4">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
