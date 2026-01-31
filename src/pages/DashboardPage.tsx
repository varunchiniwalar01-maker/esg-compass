import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { ESGTrendChart } from "@/components/dashboard/ESGTrendChart";
import { RiskHighlights } from "@/components/dashboard/RiskHighlights";
import { RecentGoals } from "@/components/dashboard/RecentGoals";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ESG Dashboard</h1>
          <p className="text-muted-foreground">
            Acme Industries Pvt. Ltd. • Last updated Jan 30, 2025
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <ScoreCard 
          title="Overall ESG Score"
          score={72}
          trend="up"
          trendValue="+4 pts"
          size="large"
        />
        <ScoreCard 
          title="Environmental"
          score={68}
          trend="up"
          trendValue="+6 pts"
          color="text-chart-1"
        />
        <ScoreCard 
          title="Social"
          score={78}
          trend="up"
          trendValue="+3 pts"
          color="text-chart-2"
        />
        <ScoreCard 
          title="Governance"
          score={70}
          trend="stable"
          trendValue="0 pts"
          color="text-chart-3"
        />
      </div>

      {/* Charts and Highlights */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <ESGTrendChart />
        <RiskHighlights />
      </div>

      {/* Recent Goals */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentGoals />
        
        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Continue ESG Assessment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Add New Goal
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Log Carbon Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate AI Summary
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-muted-foreground text-center">
        Scores are for internal tracking only. GreenTrack does not provide certification or regulatory compliance verification.
      </p>
    </DashboardLayout>
  );
}
