import { 
  LineChart, 
  Zap, 
  FileUp, 
  Share2,
  Leaf,
  Shield,
  FileText,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Leaf,
    title: "Carbon Tracking",
    description: "Enter your electricity and fuel usage. We calculate your Scope 1 and Scope 2 emissions automatically using precise emission factors.",
  },
  {
    icon: LineChart,
    title: "Green Score Formula",
    description: "Your score is derived from a transparent mathematical formula: cat_score = clamp(100 × (2 - ratio) / 1.8, 0, 100).",
  },
  {
    icon: Globe,
    title: "Sector Benchmarking",
    description: "We benchmark your carbon intensity against industry-specific standards to give you a realistic and competitive ratio.",
  },
  {
    icon: FileText,
    title: "Bank-Ready Reports",
    description: "Generate structured reports designed for banks and NBFCs, including full formula breakdowns and action plans.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Get automated strengths, gaps, and 90-day improvement plans based on your actual carbon data.",
  },
  {
    icon: FileUp,
    title: "Stored Inputs",
    description: "View and manage every single data point you've entered. Complete transparency for audit readiness.",
  },
  {
    icon: Share2,
    title: "Shareable Snapshot",
    description: "Create read-only links to share your Green Score with stakeholders without them needing to log in.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is stored securely in Supabase. You maintain full ownership and control over your sustainability data.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Everything You Need for Carbon Tracking
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete toolkit designed for simplicity — get your bankable Green Score in minutes.
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
