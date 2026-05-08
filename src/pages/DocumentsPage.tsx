import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FolderOpen, 
  FileText, 
  Download,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { getCarbonLogs, deleteCarbonLog, type CarbonLog } from "@/lib/supabase-data";
import { toast } from "sonner";

export default function DocumentsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<CarbonLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const data = await getCarbonLogs(user.id);
          setLogs(data);
        } catch (error) {
          console.error("Failed to load logs:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, [user]);

  const filteredLogs = logs.filter((log) =>
    log.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteCarbonLog(id);
      setLogs(logs.filter(l => l.id !== id));
      toast.success("Log deleted.");
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = "Year,Sector,Revenue (Cr),Electricity (kWh),Diesel (L),Petrol (L),LPG (kg),Scope 1 CO₂e (kg),Scope 2 CO₂e (kg),Total CO₂e (kg),Intensity,Benchmark,Ratio,Score\n";
    const rows = logs.map(l =>
      `${l.year},${l.sector},${l.revenue_inr_cr},${l.electricity_kwh},${l.diesel_liters},${l.petrol_liters},${l.lpg_kg},${l.scope1_co2e.toFixed(1)},${l.scope2_co2e.toFixed(1)},${l.total_co2e.toFixed(1)},${l.intensity.toFixed(2)},${l.sector_benchmark},${l.ratio.toFixed(4)},${l.cat_score}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carbon_data_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Stored Data</h1>
          <p className="text-muted-foreground">
            All the exact numbers you entered during carbon tracking.
          </p>
        </div>
        {logs.length > 0 && (
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{logs.length}</div>
                <div className="text-sm text-muted-foreground">Years Logged</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/20">
                <FileText className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {logs.length > 0 ? (logs.reduce((s, l) => s + l.total_co2e, 0) / 1000).toFixed(1) : 0} t
                </div>
                <div className="text-sm text-muted-foreground">Total CO₂e (all years)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                <FileText className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {logs.length > 0 ? Math.round(logs.reduce((s, l) => s + l.cat_score, 0) / logs.length) : 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg Green Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search by year or sector..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="py-20 text-center">Loading data...</div>
      ) : filteredLogs.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {logs.length === 0
                ? "No carbon data logged yet. Go to Carbon Tracking to log your first year."
                : "No results match your search."}
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredLogs.map((log) => (
          <Card key={log.id} className="border-border mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">FY {log.year} — <span className="capitalize">{log.sector}</span></CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">Score: {log.cat_score}/100</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => log.id && handleDelete(log.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Revenue</span>
                  <p className="font-medium text-foreground">{log.revenue_inr_cr} INR Cr</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Electricity</span>
                  <p className="font-medium text-foreground">{log.electricity_kwh.toLocaleString()} kWh</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Diesel</span>
                  <p className="font-medium text-foreground">{log.diesel_liters.toLocaleString()} L</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Petrol</span>
                  <p className="font-medium text-foreground">{log.petrol_liters.toLocaleString()} L</p>
                </div>
                <div>
                  <span className="text-muted-foreground">LPG</span>
                  <p className="font-medium text-foreground">{log.lpg_kg.toLocaleString()} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Scope 1 CO₂e</span>
                  <p className="font-medium text-foreground">{log.scope1_co2e.toFixed(1)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Scope 2 CO₂e</span>
                  <p className="font-medium text-foreground">{log.scope2_co2e.toFixed(1)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total CO₂e</span>
                  <p className="font-medium text-foreground">{log.total_co2e.toFixed(1)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Intensity</span>
                  <p className="font-medium text-foreground">{log.intensity.toFixed(2)} kgCO₂e/Cr</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sector Benchmark</span>
                  <p className="font-medium text-foreground">{log.sector_benchmark}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ratio</span>
                  <p className="font-medium text-foreground">{log.ratio.toFixed(4)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Green Score</span>
                  <p className="font-bold text-primary text-lg">{log.cat_score}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </DashboardLayout>
  );
}
