import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { ESGTrendChart } from "@/components/dashboard/ESGTrendChart";
import { RiskHighlights } from "@/components/dashboard/RiskHighlights";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { getCarbonLogs, type CarbonLog } from "@/lib/supabase-data";

export default function DashboardPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<CarbonLog[]>([]);

  useEffect(() => {
    async function loadData() {
      if (user) {
        const data = await getCarbonLogs(user.id);
        setLogs(data);
      }
    }
    loadData();
  }, [user]);

  const latest = logs.length > 0 ? logs[logs.length - 1] : null;
  const previous = logs.length > 1 ? logs[logs.length - 2] : null;

  const energyScore = latest?.cat_score ?? 0;
  const totalCo2e = latest?.total_co2e ?? 0;
  const scope1 = latest?.scope1_co2e ?? 0;
  const scope2 = latest?.scope2_co2e ?? 0;

  const scoreDiff = previous ? energyScore - previous.cat_score : 0;
  const co2Diff = previous ? ((totalCo2e - previous.total_co2e) / previous.total_co2e * 100) : 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Green Score Dashboard</h1>
          <p className="text-muted-foreground">
            Carbon tracking & Green Score — powered by your formula.
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
          title="Green Score (Energy)"
          score={energyScore}
          trend={scoreDiff > 0 ? "up" : scoreDiff < 0 ? "down" : "stable"}
          trendValue={latest ? (scoreDiff >= 0 ? `+${scoreDiff} pts` : `${scoreDiff} pts`) : "No data"}
          size="large"
        />
        <ScoreCard 
          title="Total CO₂e"
          score={Math.round(totalCo2e / 1000)}
          trend={co2Diff < 0 ? "up" : co2Diff > 0 ? "down" : "stable"}
          trendValue={latest ? `${co2Diff.toFixed(1)}% YoY` : "—"}
          color="text-chart-1"
        />
        <ScoreCard 
          title="Scope 1 (Direct)"
          score={Math.round(scope1 / 1000)}
          trend="stable"
          trendValue={`${totalCo2e > 0 ? Math.round(scope1 / totalCo2e * 100) : 0}% of total`}
          color="text-chart-4"
        />
        <ScoreCard 
          title="Scope 2 (Indirect)"
          score={Math.round(scope2 / 1000)}
          trend="stable"
          trendValue={`${totalCo2e > 0 ? Math.round(scope2 / totalCo2e * 100) : 0}% of total`}
          color="text-chart-3"
        />
      </div>

      {/* Charts and Highlights */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <ESGTrendChart />
        <RiskHighlights />
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/dashboard/carbon">
            <Button variant="outline" className="w-full justify-start">
              Log Yearly Carbon Data
            </Button>
          </Link>
          <Link to="/dashboard/reports">
            <Button variant="outline" className="w-full justify-start">
              Generate AI Summary
            </Button>
          </Link>
          <Link to="/dashboard/share">
            <Button variant="outline" className="w-full justify-start">
              Share Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-muted-foreground text-center">
        Scores are for internal tracking only. GreenTrack does not provide certification or regulatory compliance verification.
      </p>
    </DashboardLayout>
  );
}
