import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import {
  EMISSION_FACTORS,
  SECTOR_BENCHMARKS,
  calculateEnergyScore,
} from "@/lib/scoring";
import { saveCarbonLog, getCarbonLogs, deleteCarbonLog, type CarbonLog } from "@/lib/supabase-data";

// ─── Component ───────────────────────────────────────────────────────────────
export default function CarbonPage() {
  const { user } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [logs, setLogs] = useState<CarbonLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    year: "2024",
    sector: "default",
    revenueInrCr: "",
    electricityKwh: "",
    dieselLiters: "",
    petrolLiters: "",
    lpgKg: "",
  });

  // Load from storage on mount
  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const data = await getCarbonLogs(user.id);
          setLogs(data);
        } catch (error) {
          console.error("Failed to load carbon logs:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, [user]);

  // ─── Submit Handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const electricityKwh = parseFloat(form.electricityKwh) || 0;
    const dieselLiters = parseFloat(form.dieselLiters) || 0;
    const petrolLiters = parseFloat(form.petrolLiters) || 0;
    const lpgKg = parseFloat(form.lpgKg) || 0;
    const revenueInrCr = parseFloat(form.revenueInrCr) || 1;
    const sector = form.sector;

    // Use the shared backend function (exact same formula)
    const result = calculateEnergyScore(
      { electricityKwh, dieselLiters, petrolLiters, lpgKg },
      revenueInrCr,
      sector
    );

    const benchmark = SECTOR_BENCHMARKS[sector] || SECTOR_BENCHMARKS["default"];
    const ratio = result.intensity / benchmark.carbonIntensity;

    const log: Omit<CarbonLog, "id" | "created_at"> = {
      user_id: user.id,
      year: form.year,
      sector,
      revenue_inr_cr: revenueInrCr,
      electricity_kwh: electricityKwh,
      diesel_liters: dieselLiters,
      petrol_liters: petrolLiters,
      lpg_kg: lpgKg,
      scope1_co2e: result.scope1Co2e,
      scope2_co2e: result.scope2Co2e,
      total_co2e: result.totalCo2e,
      intensity: result.intensity,
      sector_benchmark: benchmark.carbonIntensity,
      ratio,
      cat_score: result.score,
    };

    try {
      const savedLog = await saveCarbonLog(log);
      const updatedLogs = [...logs, savedLog].sort((a, b) => a.year.localeCompare(b.year));
      setLogs(updatedLogs);
      toast.success(`Data for ${form.year} saved successfully!`);
      setShowAddDialog(false);
      setForm({ year: "2024", sector: "default", revenueInrCr: "", electricityKwh: "", dieselLiters: "", petrolLiters: "", lpgKg: "" });
    } catch (error) {
      toast.error("Failed to save data. Please try again.");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this year's data?")) return;
    try {
      await deleteCarbonLog(id);
      setLogs(logs.filter(l => l.id !== id));
      toast.success("Log deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete log.");
    }
  };

  // Most recent log for the summary
  const latest = logs.length > 0 ? logs[logs.length - 1] : null;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Yearly Carbon Tracking</h1>
          <p className="text-muted-foreground">
            total_co2e = Σ (activity_data × emission_factor) &nbsp;|&nbsp;
            intensity = total_co2e / revenue &nbsp;|&nbsp;
            cat_score = clamp(100×(2−ratio)/1.8, 0, 100)
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Log Year
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Log Annual Carbon Data</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Year, Sector, Revenue */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Financial Year</Label>
                  <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label>Sector</Label>
                  <Select value={form.sector} onValueChange={(v) => setForm({ ...form, sector: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(SECTOR_BENCHMARKS).map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Revenue (INR Cr)</Label>
                  <Input type="number" placeholder="e.g. 10" value={form.revenueInrCr} onChange={(e) => setForm({ ...form, revenueInrCr: e.target.value })} required />
                </div>
              </div>

              {/* Activity Data */}
              <div className="p-4 rounded-lg border border-border space-y-4">
                <p className="font-semibold text-sm text-foreground">Activity Data (Annual Totals)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Electricity (kWh) — Scope 2</Label>
                    <Input type="number" placeholder="0" value={form.electricityKwh} onChange={(e) => setForm({ ...form, electricityKwh: e.target.value })} />
                    <p className="text-xs text-muted-foreground">EF: {EMISSION_FACTORS.electricity} kgCO₂e/kWh</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Diesel (Liters) — Scope 1</Label>
                    <Input type="number" placeholder="0" value={form.dieselLiters} onChange={(e) => setForm({ ...form, dieselLiters: e.target.value })} />
                    <p className="text-xs text-muted-foreground">EF: {EMISSION_FACTORS.diesel} kgCO₂e/L</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Petrol (Liters) — Scope 1</Label>
                    <Input type="number" placeholder="0" value={form.petrolLiters} onChange={(e) => setForm({ ...form, petrolLiters: e.target.value })} />
                    <p className="text-xs text-muted-foreground">EF: {EMISSION_FACTORS.petrol} kgCO₂e/L</p>
                  </div>
                  <div className="space-y-1">
                    <Label>LPG / PNG (kg) — Scope 1</Label>
                    <Input type="number" placeholder="0" value={form.lpgKg} onChange={(e) => setForm({ ...form, lpgKg: e.target.value })} />
                    <p className="text-xs text-muted-foreground">EF: {EMISSION_FACTORS.lpg} kgCO₂e/kg</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button type="submit">Calculate & Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── Formula Breakdown (Latest Year) ──────────────────────────── */}
      {latest && (
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Formula Breakdown — FY {latest.year}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-primary">Step 1 — total_co2e = Σ (activity × EF)</p>
                <div className="bg-accent/30 rounded-lg p-3 text-sm space-y-1 font-mono">
                  <p>Electricity: {latest.electricity_kwh.toLocaleString()} kWh × {EMISSION_FACTORS.electricity} = <strong>{latest.scope2_co2e.toFixed(1)} kgCO₂e</strong> (Scope 2)</p>
                  <p>Diesel: {latest.diesel_liters.toLocaleString()} L × {EMISSION_FACTORS.diesel} = <strong>{(latest.diesel_liters * EMISSION_FACTORS.diesel).toFixed(1)} kgCO₂e</strong></p>
                  <p>Petrol: {latest.petrol_liters.toLocaleString()} L × {EMISSION_FACTORS.petrol} = <strong>{(latest.petrol_liters * EMISSION_FACTORS.petrol).toFixed(1)} kgCO₂e</strong></p>
                  <p>LPG: {latest.lpg_kg.toLocaleString()} kg × {EMISSION_FACTORS.lpg} = <strong>{(latest.lpg_kg * EMISSION_FACTORS.lpg).toFixed(1)} kgCO₂e</strong></p>
                  <hr className="border-border my-2" />
                  <p>Scope 1 (Fuels): <strong>{latest.scope1_co2e.toFixed(1)} kgCO₂e</strong></p>
                  <p>Scope 2 (Electricity): <strong>{latest.scope2_co2e.toFixed(1)} kgCO₂e</strong></p>
                  <p className="text-base">total_co2e = <strong className="text-primary">{latest.total_co2e.toFixed(1)} kgCO₂e</strong></p>
                </div>
              </div>

              {/* Step 2 & 3 */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-primary">Step 2 — Intensity & Score</p>
                <div className="bg-accent/30 rounded-lg p-3 text-sm space-y-2 font-mono">
                  <p>intensity = {latest.total_co2e.toFixed(1)} / {latest.revenue_inr_cr} Cr = <strong>{latest.intensity.toFixed(2)} kgCO₂e/Cr</strong></p>
                  <p>sector_benchmark ({latest.sector}) = <strong>{latest.sector_benchmark}</strong></p>
                  <p>ratio = {latest.intensity.toFixed(2)} / {latest.sector_benchmark} = <strong>{latest.ratio.toFixed(4)}</strong></p>
                  <hr className="border-border my-2" />
                  <p className="text-sm">cat_score = clamp(100 × (2 − {latest.ratio.toFixed(4)}) / 1.8, 0, 100)</p>
                  <p className="text-base">Energy Score = <strong className="text-primary text-2xl">{latest.cat_score}</strong> / 100</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── Year-over-Year Charts ────────────────────────────────────── */}
      {logs.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Scope 1 vs 2 stacked bar */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Scope 1 vs Scope 2 (kgCO₂e)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={logs} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }} />
                    <Legend wrapperStyle={{ paddingTop: "12px" }} />
                    <Bar dataKey="scope2_co2e" stackId="a" name="Scope 2 (Electricity)" fill="hsl(var(--chart-1))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="scope1_co2e" stackId="a" name="Scope 1 (Fuels)" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Energy Score trend */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Energy Score Trend (cat_score)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={logs} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }} />
                    <Bar dataKey="cat_score" name="Energy Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── Log Table ────────────────────────────────────────────────── */}
      {logs.length > 0 && (
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="text-lg">All Yearly Logs</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="py-2 pr-3">Year</th>
                  <th className="py-2 pr-3">Sector</th>
                  <th className="py-2 pr-3">Revenue (Cr)</th>
                  <th className="py-2 pr-3">Scope 1</th>
                  <th className="py-2 pr-3">Scope 2</th>
                  <th className="py-2 pr-3">Total CO₂e</th>
                  <th className="py-2 pr-3">Intensity</th>
                  <th className="py-2 pr-3">Ratio</th>
                  <th className="py-2 pr-3">Score</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 text-foreground">
                    <td className="py-2 pr-3 font-medium">{log.year}</td>
                    <td className="py-2 pr-3 capitalize">{log.sector}</td>
                    <td className="py-2 pr-3">{log.revenue_inr_cr}</td>
                    <td className="py-2 pr-3">{log.scope1_co2e.toFixed(0)} kg</td>
                    <td className="py-2 pr-3">{log.scope2_co2e.toFixed(0)} kg</td>
                    <td className="py-2 pr-3 font-medium">{log.total_co2e.toFixed(0)} kg</td>
                    <td className="py-2 pr-3">{log.intensity.toFixed(2)}</td>
                    <td className="py-2 pr-3">{log.ratio.toFixed(4)}</td>
                    <td className="py-2 pr-3 font-bold text-primary">{log.cat_score}</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => log.id && handleDelete(log.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!isLoading && logs.length === 0 && (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground mb-4">No yearly data logged yet. Click "Log Year" to add your first annual carbon data.</p>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Log Year
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Formula Reference */}
      <Card className="border-border mt-8">
        <CardContent className="py-6">
          <h3 className="font-semibold text-foreground mb-3">Formula Reference</h3>
          <div className="grid gap-2 text-sm text-muted-foreground font-mono">
            <p>1. total_co2e = Σ (activity_data × emission_factor)</p>
            <p>2. intensity = total_co2e / revenue_INR_Cr</p>
            <p>3. ratio = intensity / sector_benchmark</p>
            <p>4. cat_score = clamp(100 × (2 − ratio) / 1.8, 0, 100)</p>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-accent/30 rounded p-2"><strong>Electricity EF:</strong> {EMISSION_FACTORS.electricity} kgCO₂e/kWh</div>
            <div className="bg-accent/30 rounded p-2"><strong>Diesel EF:</strong> {EMISSION_FACTORS.diesel} kgCO₂e/L</div>
            <div className="bg-accent/30 rounded p-2"><strong>Petrol EF:</strong> {EMISSION_FACTORS.petrol} kgCO₂e/L</div>
            <div className="bg-accent/30 rounded p-2"><strong>LPG EF:</strong> {EMISSION_FACTORS.lpg} kgCO₂e/kg</div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
