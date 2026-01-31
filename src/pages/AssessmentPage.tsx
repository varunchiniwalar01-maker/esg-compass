import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { assessmentQuestions, categoryInfo, AssessmentQuestion } from "@/data/assessmentQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = assessmentQuestions[currentIndex];
  const progress = ((currentIndex + 1) / assessmentQuestions.length) * 100;
  const category = categoryInfo[currentQuestion.category];

  const categoryQuestions = assessmentQuestions.filter(
    (q) => q.category === currentQuestion.category
  );
  const categoryIndex = categoryQuestions.findIndex((q) => q.id === currentQuestion.id);
  const categoryProgress = ((categoryIndex + 1) / categoryQuestions.length) * 100;

  const handleAnswer = (value: string | number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    // Simple scoring logic - in production this would be more sophisticated
    let score = 0;
    Object.entries(answers).forEach(([id, value]) => {
      if (value === "yes" || value === "true") score += 4;
      else if (typeof value === "number" && value > 50) score += 3;
      else if (typeof value === "string" && value.includes("Monthly")) score += 4;
      else if (typeof value === "string" && value.includes("Quarterly")) score += 3;
      else score += 1;
    });
    return Math.min(100, Math.round((score / (assessmentQuestions.length * 4)) * 100));
  };

  if (isComplete) {
    const finalScore = calculateScore();
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chart-1/20 mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-chart-1" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Assessment Complete!
          </h1>
          <p className="text-muted-foreground mb-8">
            Great job! Here's your preliminary ESG score based on your responses.
          </p>
          
          <Card className="border-border mb-8">
            <CardContent className="py-8">
              <div className="text-6xl font-bold text-primary mb-2">{finalScore}</div>
              <div className="text-muted-foreground">/100</div>
              <p className="mt-4 text-foreground">
                ESG Readiness Level: <strong className="text-primary">
                  {finalScore >= 70 ? "Ready" : finalScore >= 40 ? "Developing" : "Early"}
                </strong>
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.href = "/dashboard"}>
              View Full Dashboard
            </Button>
            <Button variant="outline" onClick={() => {
              setCurrentIndex(0);
              setIsComplete(false);
            }}>
              Retake Assessment
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className={cn("h-3 w-3 rounded-full", category.bgColor)} />
          <div>
            <span className={cn("font-medium", category.color)}>
              {category.label}
            </span>
            <span className="text-muted-foreground text-sm ml-2">
              ({categoryIndex + 1}/{categoryQuestions.length})
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-border mb-8">
          <CardContent className="py-8">
            <div className="flex items-start gap-2 mb-6">
              <h2 className="text-xl font-semibold text-foreground flex-1">
                {currentQuestion.question}
              </h2>
              {currentQuestion.helpText && (
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    {currentQuestion.helpText}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Answer Input based on question type */}
            {currentQuestion.type === "yesno" && (
              <RadioGroup
                value={answers[currentQuestion.id] as string}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "partial", label: "Partially / In Progress" },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      answers[currentQuestion.id] === option.value
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-accent/50"
                    )}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <span className="font-medium text-foreground">{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "numeric" && (
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={answers[currentQuestion.id] as number || ""}
                  onChange={(e) => handleAnswer(Number(e.target.value))}
                  className="max-w-[200px]"
                />
                {currentQuestion.unit && (
                  <span className="text-muted-foreground">{currentQuestion.unit}</span>
                )}
              </div>
            )}

            {currentQuestion.type === "multiple" && currentQuestion.options && (
              <RadioGroup
                value={answers[currentQuestion.id] as string}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <Label
                    key={option}
                    htmlFor={option}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      answers[currentQuestion.id] === option
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-accent/50"
                    )}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <span className="font-medium text-foreground">{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="gap-2"
          >
            {currentIndex === assessmentQuestions.length - 1 ? "Complete" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Save Progress Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Your progress is automatically saved
        </p>
      </div>
    </DashboardLayout>
  );
}
