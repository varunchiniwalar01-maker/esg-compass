import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { assessmentQuestions, categoryInfo } from "@/data/assessmentQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, HelpCircle, FastForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { calculateComprehensiveGreenScore, GreenScoreInput } from "@/lib/scoring";

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

  const handleAnswer = (value: string | number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const completeAssessment = () => {
    const result = getCalculatedScore();
    localStorage.setItem("greenScoreResult", JSON.stringify(result));
    setIsComplete(true);
  };

  const handleSkipToResults = () => {
    completeAssessment();
  };

  const getCalculatedScore = () => {
    const isYes = (val: string | number | undefined) => val === "yes";

    const input: GreenScoreInput = {
      revenueInrCr: Number(answers.revenue) || 0,
      sector: String(answers.sector) || "default",
      energy: {
        electricityKwh: Number(answers.electricity) || 0,
        dieselLiters: Number(answers.diesel) || 0,
        lpgKg: Number(answers.lpg) || 0,
        petrolLiters: Number(answers.petrol) || 0,
      },
      water: {
        totalWithdrawalKl: Number(answers.water_withdrawn) || 0,
        recycledKl: Number(answers.water_recycled) || 0,
        treatedKl: Number(answers.water_treated) || 0,
      },
      waste: {
        totalGeneratedTonnes: Number(answers.waste_total) || 0,
        hazardousTonnes: Number(answers.waste_hazardous) || 0,
        recycledTonnes: Number(answers.waste_recycled) || 0,
      },
      renewable: {
        renewableSharePercent: Number(answers.renew_pct) || 0,
        greenCapexInr: Number(answers.green_capex) || 0,
      },
      reporting: {
        hasEnvironmentalPolicy: isYes(answers.policy),
        hasReductionTargets: isYes(answers.targets),
        hasThirdPartyVerification: isYes(answers.verify),
      }
    };

    return calculateComprehensiveGreenScore(input);
  };

  if (isComplete) {
    const resultString = localStorage.getItem("greenScoreResult");
    const result = resultString ? JSON.parse(resultString) : getCalculatedScore();
    const finalScore = result.totalScore;
    
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Assessment Complete!
          </h1>
          <p className="text-muted-foreground mb-8">
            Based on the BRSR P6 essential indicators, here is your calculated Green Score.
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

              {/* Show Pillar Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-border">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Energy</div>
                  <div className="font-semibold text-2xl">{result.pillars.energy.score}</div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Water</div>
                  <div className="font-semibold text-2xl">{result.pillars.water.score}</div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Waste</div>
                  <div className="font-semibold text-2xl">{result.pillars.waste.score}</div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Renewables</div>
                  <div className="font-semibold text-2xl">{result.pillars.renewable.score}</div>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reporting</div>
                  <div className="font-semibold text-2xl">{result.pillars.reporting.score}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.href = "/dashboard"}>
              View Full Dashboard
            </Button>
            <Button variant="outline" onClick={() => {
              setCurrentIndex(0);
              setAnswers({});
              setIsComplete(false);
            }}>
              Retake Assessment
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Determine if we should enable the Next button
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== "";

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

        {/* Category Badge & Skip Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={cn("h-3 w-3 rounded-full", category.bgColor.replace("/20", ""))} />
            <div>
              <span className={cn("font-medium", category.color)}>
                {category.label}
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                ({categoryIndex + 1}/{categoryQuestions.length})
              </span>
            </div>
          </div>
          
          {/* Skip Optional Button */}
          {category.isOptional && (
            <Button variant="secondary" size="sm" onClick={handleSkipToResults} className="gap-2">
              Skip Optional <FastForward className="h-3 w-3" />
            </Button>
          )}
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
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      answers[currentQuestion.id] === option.value
                        ? "border-primary bg-primary/5"
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
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors capitalize",
                      answers[currentQuestion.id] === option
                        ? "border-primary bg-primary/5"
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
            disabled={!hasAnsweredCurrent}
            className="gap-2"
          >
            {currentIndex === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
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
