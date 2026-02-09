import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  BarChart3, 
  Target, 
  FileText, 
  Share2,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Complete Your ESG Assessment",
    description: "Answer 20-30 simple questions about your business operations across Environmental, Social, and Governance areas. No technical jargon — just straightforward questions about your current practices.",
    highlights: ["Takes under 30 minutes", "Questions tailored for Indian SMEs", "Save progress anytime"],
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your ESG Score & Dashboard",
    description: "Instantly receive your ESG scores with color-coded risk indicators. Your personalized dashboard shows where you stand and highlights areas that need attention.",
    highlights: ["Score breakdown by E, S, G", "Risk level indicators", "Monthly trend tracking"],
  },
  {
    number: "03",
    icon: Target,
    title: "Set & Track Sustainability Goals",
    description: "Choose from pre-built goal templates or create custom targets. Track progress on energy reduction, waste management, policy implementation, and more.",
    highlights: ["Pre-built goal templates", "Progress tracking", "Deadline reminders"],
  },
  {
    number: "04",
    icon: FileText,
    title: "Generate AI-Powered Reports",
    description: "Create professional ESG summaries with one click. Get insights on your strengths, gaps, and a 90-day improvement plan — perfect for investor meetings.",
    highlights: ["Professional formatting", "Export to PDF", "Investor-ready language"],
  },
  {
    number: "05",
    icon: Share2,
    title: "Share With Stakeholders",
    description: "Generate shareable links to your ESG snapshot. Investors and partners can view your scores and goals without needing to create an account.",
    highlights: ["No login required for viewers", "Control what's shared", "Update anytime"],
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
                From assessment to investor-ready reports in five simple steps. 
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
                  Start Your Free Assessment
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
