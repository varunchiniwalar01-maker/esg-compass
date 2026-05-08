import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  BarChart3, 
  FileText, 
  Share2,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Leaf,
    title: "Log Your Yearly Carbon Data",
    description: "Enter your annual activity data — electricity (kWh), diesel (L), petrol (L), and LPG (kg). Along with your revenue and sector, this is all we need to calculate your emissions.",
    highlights: ["Takes under 5 minutes", "Just 4 fuel inputs + revenue", "Scope 1 & Scope 2 separated automatically"],
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your Green Score Instantly",
    description: "Your data is run through a precise formula: total_co2e → intensity → ratio → cat_score. You'll see every intermediate step, so you know exactly how your score was derived.",
    highlights: ["Formula: cat_score = clamp(100×(2−ratio)/1.8, 0, 100)", "Benchmarked against your sector", "Score out of 100"],
  },
  {
    number: "03",
    icon: FileText,
    title: "Generate AI-Powered Reports",
    description: "Click one button to generate a professional carbon report based on your actual logged numbers — not mock data. It includes your Scope 1 vs 2 breakdown, intensity, and score analysis.",
    highlights: ["Uses your real data, not templates", "Copy or export as PDF", "Investor-ready language"],
  },
  {
    number: "04",
    icon: Share2,
    title: "Share With Stakeholders",
    description: "Generate shareable links to your carbon snapshot. Investors and green financing partners can view your Green Score and emissions data without creating an account.",
    highlights: ["No login required for viewers", "Control what's shared", "Perfect for green financing applications"],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-card border-b border-border py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground">
                How GreenTrack Works
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                From carbon data to a bankable Green Score in four simple steps.
                No sustainability expertise required.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-16">
              {steps.map((step, index) => (
                <div 
                  key={step.title} 
                  className={`flex flex-col md:flex-row gap-8 items-start ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <step.icon className="h-10 w-10" />
                      </div>
                      <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Start Tracking Your Carbon
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
