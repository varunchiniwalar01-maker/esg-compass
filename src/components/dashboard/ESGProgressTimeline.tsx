import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  category: "environmental" | "social" | "governance";
}

const mockTimeline: TimelineItem[] = [
  {
    id: "1",
    date: "Oct 2024",
    title: "ESG Assessment Started",
    description: "Completed initial ESG baseline assessment",
    status: "completed",
    category: "governance",
  },
  {
    id: "2",
    date: "Nov 2024",
    title: "POSH Policy Implemented",
    description: "Published and trained employees on POSH policy",
    status: "completed",
    category: "social",
  },
  {
    id: "3",
    date: "Dec 2024",
    title: "Carbon Tracking Initiated",
    description: "Started monthly Scope 1 & 2 emission tracking",
    status: "completed",
    category: "environmental",
  },
  {
    id: "4",
    date: "Jan 2025",
    title: "Code of Conduct Published",
    description: "Rolled out company-wide code of conduct",
    status: "in-progress",
    category: "governance",
  },
  {
    id: "5",
    date: "Feb 2025",
    title: "Energy Reduction Program",
    description: "Target: 10% reduction in electricity consumption",
    status: "upcoming",
    category: "environmental",
  },
  {
    id: "6",
    date: "Mar 2025",
    title: "Diversity Report",
    description: "Publish first annual diversity & inclusion report",
    status: "upcoming",
    category: "social",
  },
];

const categoryColors = {
  environmental: "bg-chart-1",
  social: "bg-chart-2",
  governance: "bg-chart-3",
};

const categoryLabels = {
  environmental: "E",
  social: "S",
  governance: "G",
};

export function ESGProgressTimeline() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          ESG Journey Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {mockTimeline.map((item, index) => (
              <div key={item.id} className="relative pl-10">
                {/* Status icon */}
                <div className="absolute left-0 top-0 flex items-center justify-center">
                  {item.status === "completed" ? (
                    <CheckCircle2 className="h-8 w-8 text-chart-1 bg-background rounded-full" />
                  ) : item.status === "in-progress" ? (
                    <Clock className="h-8 w-8 text-chart-4 bg-background rounded-full" />
                  ) : (
                    <Circle className="h-8 w-8 text-muted-foreground bg-background rounded-full" />
                  )}
                </div>
                
                <div className={cn(
                  "p-4 rounded-lg border",
                  item.status === "completed" ? "bg-card border-border" :
                  item.status === "in-progress" ? "bg-chart-4/10 border-chart-4/30" :
                  "bg-muted/30 border-border/50"
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full text-background",
                      categoryColors[item.category]
                    )}>
                      {categoryLabels[item.category]}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h4 className={cn(
                    "font-medium",
                    item.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
