import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  category: string;
  completedDate: string;
  targetValue: string;
}

const recentGoals: Goal[] = [
  {
    id: "1",
    title: "Implement waste segregation",
    category: "Environmental",
    completedDate: "Jan 15, 2025",
    targetValue: "100% segregation",
  },
  {
    id: "2",
    title: "Complete employee training",
    category: "Social",
    completedDate: "Jan 10, 2025",
    targetValue: "All employees",
  },
  {
    id: "3",
    title: "Draft Code of Conduct",
    category: "Governance",
    completedDate: "Jan 5, 2025",
    targetValue: "Published",
  },
];

export function RecentGoals() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recently Completed Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentGoals.map((goal) => (
          <div 
            key={goal.id}
            className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-1/20">
              <CheckCircle2 className="h-4 w-4 text-chart-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">
                {goal.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {goal.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {goal.completedDate}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {goal.targetValue}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
