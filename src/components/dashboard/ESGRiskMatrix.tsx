import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface RiskItem {
  id: string;
  area: string;
  category: "environmental" | "social" | "governance";
  risk: "low" | "medium" | "high";
  description: string;
}

const riskData: RiskItem[] = [
  { id: "1", area: "Carbon Emissions", category: "environmental", risk: "medium", description: "Tracking in progress, targets being set" },
  { id: "2", area: "Water Management", category: "environmental", risk: "low", description: "Usage monitored, conservation measures active" },
  { id: "3", area: "Waste Management", category: "environmental", risk: "low", description: "Segregation protocols established" },
  { id: "4", area: "Energy Efficiency", category: "environmental", risk: "medium", description: "Improvement opportunities identified" },
  { id: "5", area: "Employee Safety", category: "social", risk: "low", description: "Safety protocols in place" },
  { id: "6", area: "Diversity & Inclusion", category: "social", risk: "medium", description: "Policy exists, metrics tracking needed" },
  { id: "7", area: "POSH Compliance", category: "social", risk: "low", description: "Policy active, ICC formed" },
  { id: "8", area: "Training Programs", category: "social", risk: "low", description: "Regular training conducted" },
  { id: "9", area: "Code of Conduct", category: "governance", risk: "low", description: "Documented and communicated" },
  { id: "10", area: "Data Privacy", category: "governance", risk: "medium", description: "Basic measures, formal policy pending" },
  { id: "11", area: "Board Independence", category: "governance", risk: "high", description: "Needs formal structure as company scales" },
  { id: "12", area: "Anti-Corruption", category: "governance", risk: "low", description: "Policy and whistleblower mechanism active" },
];

const riskConfig = {
  low: { icon: CheckCircle, color: "text-chart-1", bg: "bg-chart-1/20", label: "Low Risk" },
  medium: { icon: AlertTriangle, color: "text-chart-4", bg: "bg-chart-4/20", label: "Medium Risk" },
  high: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20", label: "High Risk" },
};

const categoryLabels = {
  environmental: { label: "Environmental", color: "border-chart-1" },
  social: { label: "Social", color: "border-chart-2" },
  governance: { label: "Governance", color: "border-chart-3" },
};

export function ESGRiskMatrix() {
  const categories = ["environmental", "social", "governance"] as const;

  const riskCounts = {
    low: riskData.filter(r => r.risk === "low").length,
    medium: riskData.filter(r => r.risk === "medium").length,
    high: riskData.filter(r => r.risk === "high").length,
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            ESG Risk Matrix
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Low ({riskCounts.low})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-chart-4" />
              <span className="text-muted-foreground">Medium ({riskCounts.medium})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">High ({riskCounts.high})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map(category => (
            <div key={category} className={cn("border-l-4 pl-4", categoryLabels[category].color)}>
              <h4 className="font-medium text-foreground mb-3">{categoryLabels[category].label}</h4>
              <div className="space-y-2">
                {riskData
                  .filter(item => item.category === category)
                  .map(item => {
                    const config = riskConfig[item.risk];
                    const Icon = config.icon;
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3 rounded-lg",
                          config.bg
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.color)} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.area}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
