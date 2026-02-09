import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Download, Copy, FileText, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const mockSummary = {
  generatedAt: "January 30, 2025",
  company: "Acme Industries Pvt. Ltd.",
  overallScore: 72,
  readinessLevel: "Developing",
  snapshot: {
    environmental: 68,
    social: 78,
    governance: 70,
  },
  strengths: [
    "Strong employee welfare programs with 100% health insurance coverage",
    "Regular skill development training conducted quarterly",
    "Documented POSH policy with internal committee in place",
    "Waste segregation implemented across all facilities",
    "Annual financial audits conducted by registered auditors",
  ],
  gaps: [
    "No formal renewable energy tracking or targets",
    "Carbon footprint not systematically measured",
    "Board meeting frequency could be improved to quarterly",
    "Vendor due diligence process is informal",
    "Data privacy policy documentation is incomplete",
  ],
  actionPlan: [
    {
      priority: "High",
      action: "Begin monthly carbon emissions tracking using utility bills",
      timeline: "Week 1-2",
      category: "Environmental",
    },
    {
      priority: "High",
      action: "Document and publish comprehensive data privacy policy",
      timeline: "Week 2-4",
      category: "Governance",
    },
    {
      priority: "Medium",
      action: "Establish formal vendor evaluation checklist",
      timeline: "Week 3-6",
      category: "Governance",
    },
    {
      priority: "Medium",
      action: "Set energy reduction target of 10% for next quarter",
      timeline: "Week 4-8",
      category: "Environmental",
    },
    {
      priority: "Low",
      action: "Explore renewable energy options (solar panels or RECs)",
      timeline: "Week 8-12",
      category: "Environmental",
    },
  ],
};

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      toast.success("ESG Summary generated successfully!");
    }, 2000);
  };

  const handleCopy = () => {
    const summaryText = `
ESG Summary - ${mockSummary.company}
Generated: ${mockSummary.generatedAt}

Overall ESG Score: ${mockSummary.overallScore}/100
Readiness Level: ${mockSummary.readinessLevel}

Score Breakdown:
- Environmental: ${mockSummary.snapshot.environmental}/100
- Social: ${mockSummary.snapshot.social}/100
- Governance: ${mockSummary.snapshot.governance}/100

Key Strengths:
${mockSummary.strengths.map(s => `• ${s}`).join('\n')}

Areas for Improvement:
${mockSummary.gaps.map(g => `• ${g}`).join('\n')}

90-Day Action Plan:
${mockSummary.actionPlan.map(a => `[${a.priority}] ${a.action} (${a.timeline})`).join('\n')}

---
Note: This summary is for internal assessment purposes only. GreenTrack does not provide certification or regulatory compliance verification.
    `;
    navigator.clipboard.writeText(summaryText);
    toast.success("Summary copied to clipboard!");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI-Powered ESG Reports</h1>
          <p className="text-muted-foreground">
            Generate professional summaries for stakeholders
          </p>
        </div>
        <div className="flex gap-2">
          {hasGenerated && (
            <>
              <Button variant="outline" className="gap-2" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </>
          )}
          <Button 
            className="gap-2" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Summary"}
          </Button>
        </div>
      </div>

      {!hasGenerated ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Summary Generated Yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Generate an AI-powered ESG summary based on your assessment results, 
              goals, and carbon data. Perfect for investor meetings and stakeholder reports.
            </p>
            <Button className="gap-2" onClick={handleGenerate}>
              <Sparkles className="h-4 w-4" />
              Generate Your First Summary
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Header Info */}
          <Card className="border-border">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{mockSummary.company}</h2>
                  <p className="text-sm text-muted-foreground">
                    Summary generated on {mockSummary.generatedAt}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{mockSummary.overallScore}</div>
                    <div className="text-xs text-muted-foreground">ESG Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{mockSummary.readinessLevel}</div>
                    <div className="text-xs text-muted-foreground">Readiness Level</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="gaps">Gaps</TabsTrigger>
              <TabsTrigger value="action">Action Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Environmental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-chart-1">{mockSummary.snapshot.environmental}</div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Social</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-chart-2">{mockSummary.snapshot.social}</div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-chart-3">{mockSummary.snapshot.governance}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border mt-6">
                <CardContent className="py-6">
                  <h3 className="font-semibold text-foreground mb-4">Executive Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockSummary.company} demonstrates a <strong className="text-foreground">{mockSummary.readinessLevel.toLowerCase()}</strong> level 
                    of ESG readiness with an overall score of <strong className="text-foreground">{mockSummary.overallScore}/100</strong>. 
                    The company shows particular strength in social practices, with robust employee welfare programs 
                    and training initiatives. Environmental tracking systems are in early stages but show commitment 
                    to improvement. Governance structures are established with some areas identified for enhancement.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strengths">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-chart-1" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockSummary.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-chart-1 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gaps">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-chart-4" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockSummary.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-chart-4 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="action">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    90-Day Improvement Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSummary.actionPlan.map((action, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-4 p-4 rounded-lg bg-accent/30"
                      >
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          action.priority === "High" 
                            ? "bg-destructive/20 text-destructive" 
                            : action.priority === "Medium"
                            ? "bg-chart-4/20 text-chart-4"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {action.priority}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{action.action}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{action.timeline}</span>
                            <span>•</span>
                            <span>{action.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-8">
            This summary is for internal assessment purposes only. GreenTrack does not provide 
            certification, audit services, or regulatory compliance verification.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
