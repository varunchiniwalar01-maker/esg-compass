import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ESGBreakdownChart } from "@/components/dashboard/ESGBreakdownChart";
import { ESGProgressTimeline } from "@/components/dashboard/ESGProgressTimeline";
import { ESGRiskMatrix } from "@/components/dashboard/ESGRiskMatrix";
import { investorQuestions, frameworkDescriptions, type InvestorQuestion } from "@/data/investorQuestions";
import { Copy, Download, FileText, ChevronRight, Leaf, Users, Building2, Check, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const categoryConfig = {
  environmental: { icon: Leaf, label: "Environmental", color: "text-chart-1", bgColor: "bg-chart-1/20" },
  social: { icon: Users, label: "Social", color: "text-chart-2", bgColor: "bg-chart-2/20" },
  governance: { icon: Building2, label: "Governance", color: "text-chart-3", bgColor: "bg-chart-3/20" },
};

const importanceConfig = {
  high: { label: "High Priority", color: "bg-destructive/20 text-destructive" },
  medium: { label: "Medium", color: "bg-chart-4/20 text-chart-4" },
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
};

export default function InvestorQAPage() {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    investorQuestions.forEach(q => {
      initial[q.id] = q.autoAnswer || "";
    });
    return initial;
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAnswer = (id: string, answer: string) => {
    navigator.clipboard.writeText(answer);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Answer has been copied to your clipboard.",
    });
  };

  const handleCopyAll = (category: keyof typeof categoryConfig) => {
    const categoryQuestions = investorQuestions.filter(q => q.category === category);
    const text = categoryQuestions
      .map(q => `Q: ${q.question}\nA: ${answers[q.id]}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "All answers copied",
      description: `All ${categoryConfig[category].label} Q&As have been copied.`,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Your investor Q&A document is being prepared for download.",
    });
  };

  const renderQuestionCard = (question: InvestorQuestion) => {
    const config = categoryConfig[question.category];
    const importance = importanceConfig[question.importance];
    const Icon = config.icon;
    const isEditing = editingId === question.id;

    return (
      <AccordionItem key={question.id} value={question.id} className="border border-border rounded-lg mb-3 overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
          <div className="flex items-start gap-3 text-left w-full pr-4">
            <div className={cn("p-1.5 rounded-md", config.bgColor)}>
              <Icon className={cn("h-4 w-4", config.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {question.framework && (
                  <Badge variant="outline" className="text-xs">
                    {question.framework}
                  </Badge>
                )}
                <Badge className={cn("text-xs", importance.color)}>
                  {importance.label}
                </Badge>
              </div>
              <p className="text-sm font-medium text-foreground">{question.question}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="ml-10">
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={answers[question.id]}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                  className="min-h-[100px]"
                  placeholder="Enter your answer..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setEditingId(null)}>
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, [question.id]: question.autoAnswer || "" }));
                      setEditingId(null);
                    }}
                  >
                    Reset to Auto
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-3 bg-muted/30 rounded-lg mb-3">
                  <p className="text-sm text-foreground">{answers[question.id]}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCopyAnswer(question.id, answers[question.id])}
                  >
                    {copiedId === question.id ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(question.id)}>
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Mock ESG scores
  const esgScores = {
    environmental: 68,
    social: 78,
    governance: 70,
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investor Q&A</h1>
          <p className="text-muted-foreground">
            Pre-filled ESG answers for investor questionnaires
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExportPDF}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="questions" className="gap-2">
            <FileText className="h-4 w-4" />
            Q&A Responses
          </TabsTrigger>
          <TabsTrigger value="visuals" className="gap-2">
            <ChevronRight className="h-4 w-4" />
            Visual Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          {/* Framework info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Supported Frameworks</CardTitle>
              <CardDescription>
                Our Q&A templates align with major ESG reporting frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(frameworkDescriptions).map(([key, desc]) => (
                  <div key={key} className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium text-foreground text-sm">{key}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Questions by category */}
          <div className="grid gap-6 lg:grid-cols-1">
            {(["environmental", "social", "governance"] as const).map(category => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const categoryQuestions = investorQuestions.filter(q => q.category === category);

              return (
                <Card key={category} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", config.bgColor)}>
                          <Icon className={cn("h-5 w-5", config.color)} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{config.label} Questions</CardTitle>
                          <CardDescription>{categoryQuestions.length} questions</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleCopyAll(category)}>
                        <Copy className="h-4 w-4 mr-1" /> Copy All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryQuestions.map(renderQuestionCard)}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="visuals" className="space-y-6">
          {/* Visual charts for investors */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ESGBreakdownChart 
              environmental={esgScores.environmental}
              social={esgScores.social}
              governance={esgScores.governance}
            />
            <ESGProgressTimeline />
          </div>

          <ESGRiskMatrix />

          {/* Disclaimer */}
          <Card className="border-border bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Disclaimer:</strong> These visualizations are for internal tracking and investor communication purposes only. 
                GreenTrack does not provide ESG certification, audit services, or regulatory compliance verification. 
                All data should be independently verified before use in formal disclosures.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
