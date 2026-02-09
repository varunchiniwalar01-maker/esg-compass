import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ESGBreakdownChartProps {
  environmental: number;
  social: number;
  governance: number;
}

export function ESGBreakdownChart({ environmental, social, governance }: ESGBreakdownChartProps) {
  const data = [
    { name: "Environmental", value: environmental, color: "hsl(var(--chart-1))" },
    { name: "Social", value: social, color: "hsl(var(--chart-2))" },
    { name: "Governance", value: governance, color: "hsl(var(--chart-3))" },
  ];

  const overallScore = Math.round((environmental + social + governance) / 3);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          ESG Score Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => [`${value}/100`, "Score"]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center score */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" style={{ marginTop: "-18px" }}>
            <div className="text-3xl font-bold text-primary">{overallScore}</div>
            <div className="text-xs text-muted-foreground">Overall</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
