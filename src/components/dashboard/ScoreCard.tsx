import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color?: string;
  size?: "default" | "large";
}

export function ScoreCard({ 
  title, 
  score, 
  maxScore = 100, 
  trend,
  trendValue,
  color = "text-primary",
  size = "default"
}: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreLevel = (pct: number) => {
    if (pct >= 70) return { label: "Ready", bgColor: "bg-chart-1/20", textColor: "text-chart-1" };
    if (pct >= 40) return { label: "Developing", bgColor: "bg-chart-4/20", textColor: "text-chart-4" };
    return { label: "Early", bgColor: "bg-destructive/20", textColor: "text-destructive" };
  };

  const level = getScoreLevel(percentage);

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            level.bgColor,
            level.textColor
          )}>
            {level.label}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className={cn(
            "font-bold",
            color,
            size === "large" ? "text-5xl" : "text-3xl"
          )}>
            {score}
          </span>
          <span className="text-muted-foreground mb-1">/{maxScore}</span>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-muted/30">
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              percentage >= 70 ? "bg-chart-1" : percentage >= 40 ? "bg-chart-4" : "bg-destructive"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {trend && trendValue && (
          <p className="mt-3 text-sm">
            <span className={cn(
              "font-medium",
              trend === "up" ? "text-chart-1" : trend === "down" ? "text-destructive" : "text-muted-foreground"
            )}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
            <span className="text-muted-foreground"> vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
