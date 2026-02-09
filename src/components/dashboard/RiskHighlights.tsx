import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskItem {
  id: string;
  title: string;
  category: "environmental" | "social" | "governance";
  level: "high" | "medium" | "low";
  description: string;
}

const mockRisks: RiskItem[] = [
  {
    id: "1",
    title: "No renewable energy tracking",
    category: "environmental",
    level: "high",
    description: "Consider tracking renewable energy usage to improve E score",
  },
  {
    id: "2",
    title: "POSH policy not uploaded",
    category: "social",
    level: "medium",
    description: "Upload your POSH policy document to improve S score",
  },
  {
    id: "3",
    title: "Board meeting frequency unclear",
    category: "governance",
    level: "medium",
    description: "Document your board meeting schedule",
  },
];

const levelConfig = {
  high: { 
    icon: AlertTriangle, 
    bgColor: "bg-destructive/10", 
    textColor: "text-destructive",
    borderColor: "border-destructive/20"
  },
  medium: { 
    icon: AlertCircle, 
    bgColor: "bg-chart-4/10", 
    textColor: "text-chart-4",
    borderColor: "border-chart-4/20"
  },
  low: { 
    icon: CheckCircle2, 
    bgColor: "bg-chart-1/10", 
    textColor: "text-chart-1",
    borderColor: "border-chart-1/20"
  },
};

const categoryLabels = {
  environmental: "Environmental",
  social: "Social",
  governance: "Governance",
};

export function RiskHighlights() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Key Risk Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockRisks.map((risk) => {
          const config = levelConfig[risk.level];
          const Icon = config.icon;
          
          return (
            <div 
              key={risk.id}
              className={cn(
                "p-4 rounded-lg border",
                config.bgColor,
                config.borderColor
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.textColor)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">
                      {risk.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {categoryLabels[risk.category]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
