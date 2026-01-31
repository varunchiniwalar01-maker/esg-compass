import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Leaf, CheckCircle2 } from "lucide-react";

// Mock data for public view
const mockPublicData = {
  company: "Acme Industries Pvt. Ltd.",
  generatedAt: "January 2025",
  overallScore: 72,
  readinessLevel: "Developing",
  scores: {
    environmental: 68,
    social: 78,
    governance: 70,
  },
  goals: [
    { title: "Reduce electricity consumption by 10%", status: "in_progress" },
    { title: "Complete POSH training for all employees", status: "in_progress" },
    { title: "Implement waste segregation", status: "completed" },
  ],
  summary: "Acme Industries demonstrates a developing level of ESG readiness. The company shows strong commitment to employee welfare and social practices, with established training programs and policies. Environmental tracking is in early stages with active goals to improve energy efficiency and waste management.",
};

export default function PublicSharePage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Simple Header */}
      <header className="border-b border-border bg-card py-4">
        <div className="container flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">GreenTrack</span>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {mockPublicData.company}
            </h1>
            <p className="text-muted-foreground">
              ESG Summary • {mockPublicData.generatedAt}
            </p>
          </div>

          {/* Overall Score */}
          <Card className="border-border mb-6">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {mockPublicData.overallScore}
                </div>
                <div className="text-muted-foreground mb-4">Overall ESG Score</div>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium">
                  {mockPublicData.readinessLevel} ESG Readiness
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-border">
              <CardContent className="py-6 text-center">
                <div className="text-3xl font-bold text-chart-1 mb-1">
                  {mockPublicData.scores.environmental}
                </div>
                <div className="text-sm text-muted-foreground">Environmental</div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="py-6 text-center">
                <div className="text-3xl font-bold text-chart-2 mb-1">
                  {mockPublicData.scores.social}
                </div>
                <div className="text-sm text-muted-foreground">Social</div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="py-6 text-center">
                <div className="text-3xl font-bold text-chart-3 mb-1">
                  {mockPublicData.scores.governance}
                </div>
                <div className="text-sm text-muted-foreground">Governance</div>
              </CardContent>
            </Card>
          </div>

          {/* Goals */}
          <Card className="border-border mb-6">
            <CardContent className="py-6">
              <h3 className="font-semibold text-foreground mb-4">Sustainability Goals</h3>
              <div className="space-y-3">
                {mockPublicData.goals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                      goal.status === "completed" ? "text-chart-1" : "text-chart-4"
                    }`} />
                    <span className="text-foreground">{goal.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      goal.status === "completed" 
                        ? "bg-chart-1/20 text-chart-1" 
                        : "bg-chart-4/20 text-chart-4"
                    }`}>
                      {goal.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-border mb-8">
            <CardContent className="py-6">
              <h3 className="font-semibold text-foreground mb-4">ESG Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockPublicData.summary}
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            This summary is generated by GreenTrack for internal assessment purposes only. 
            GreenTrack does not provide certification, audit services, or regulatory compliance verification. 
            Scores and information are self-reported by the company.
          </p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Powered by GreenTrack ESG • <a href="/" className="text-primary hover:underline">Learn More</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
