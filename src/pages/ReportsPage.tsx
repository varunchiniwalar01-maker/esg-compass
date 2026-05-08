import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Download, Copy, FileText, AlertTriangle, CheckCircle2, Leaf, History } from "lucide-react";
import { toast } from "sonner";
import { EMISSION_FACTORS } from "@/lib/scoring";
import { useAuth } from "@/context/auth";
import { getCarbonLogs, saveReport, getReports, type CarbonLog, type CarbonReport } from "@/lib/supabase-data";
import jsPDF from "jspdf";
import "jspdf-autotable";

// --- Report Generation Logic ---
function generateReportData(log: CarbonLog) {
  const scope1Pct = log.total_co2e > 0 ? Math.round((log.scope1_co2e / log.total_co2e) * 100) : 0;
  const scope2Pct = 100 - scope1Pct;

  const strengths: string[] = [];
  const gaps: string[] = [];
  const actions: { priority: string; action: string; timeline: string; category: string }[] = [];

  // Strengths
  if (log.cat_score >= 80) strengths.push(`Excellent Green Score of ${log.cat_score}/100 — well below sector benchmark.`);
  else if (log.cat_score >= 50) strengths.push(`Moderate Green Score of ${log.cat_score}/100 — shows room for growth.`);
  if (log.ratio < 1) strengths.push(`Carbon intensity (${log.intensity.toFixed(2)}) is below the sector benchmark (${log.sector_benchmark}).`);
  if (scope1Pct < 20) strengths.push(`Scope 1 emissions account for only ${scope1Pct}% of total — low direct fuel dependency.`);
  if (log.electricity_kwh > 0 && log.diesel_liters === 0 && log.petrol_liters === 0 && log.lpg_kg === 0) {
    strengths.push("Zero direct fuel consumption — fully electrified operations.");
  }

  // Gaps
  if (log.cat_score < 50) gaps.push(`Green Score of ${log.cat_score}/100 is significantly below optimal levels.`);
  if (log.ratio > 1) gaps.push(`Carbon intensity ratio (${log.ratio.toFixed(2)}) exceeds the sector benchmark of ${log.sector_benchmark}. Immediate reduction needed.`);
  if (scope2Pct > 80) gaps.push(`${scope2Pct}% of emissions come from purchased electricity (Scope 2). Consider renewable energy alternatives.`);
  if (log.diesel_liters > 0) gaps.push(`Diesel consumption (${log.diesel_liters.toLocaleString()} L) contributes ${(log.diesel_liters * EMISSION_FACTORS.diesel).toFixed(0)} kgCO₂e.`);
  if (log.lpg_kg > 0) gaps.push(`LPG usage (${log.lpg_kg.toLocaleString()} kg) adds ${(log.lpg_kg * EMISSION_FACTORS.lpg).toFixed(0)} kgCO₂e.`);

  // Actions
  if (log.ratio > 1) {
    actions.push({ priority: "High", action: `Reduce carbon intensity from ${log.intensity.toFixed(1)} to below ${log.sector_benchmark}.`, timeline: "0-6 months", category: "Efficiency" });
  }
  if (scope2Pct > 60) {
    actions.push({ priority: "High", action: `Explore rooftop solar or renewable energy credits to offset ${scope2Pct}% Scope 2 emissions.`, timeline: "0-3 months", category: "Renewables" });
  }
  if (log.diesel_liters > 100) {
    actions.push({ priority: "Medium", action: `Transition diesel generators/fleet to cleaner alternatives.`, timeline: "3-6 months", category: "Scope 1" });
  }
  actions.push({ priority: "Low", action: "Implement monthly energy monitoring dashboards for all facilities.", timeline: "6-12 months", category: "Reporting" });

  if (strengths.length === 0) strengths.push("Annual carbon tracking has been initiated.");
  if (gaps.length === 0) gaps.push("No major gaps identified.");

  return { strengths, gaps, actions, scope1Pct, scope2Pct };
}

// --- PDF Generation ---
const downloadPDF = (log: CarbonLog, report: any, companyName: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header
  doc.setFontSize(22);
  doc.setTextColor(34, 197, 94); // Primary color
  doc.text("GreenTrack Carbon Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated for: ${companyName}`, 14, 30);
  doc.text(`Financial Year: ${log.year}`, 14, 35);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);

  // Profile Section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("1. Company Profile", 14, 55);
  (doc as any).autoTable({
    startY: 60,
    head: [["Sector", "Revenue (INR Cr)", "Green Score"]],
    body: [[log.sector.toUpperCase(), log.revenue_inr_cr, `${log.cat_score}/100`]],
    theme: "striped",
    headStyles: { fillColor: [34, 197, 94] }
  });

  // Activity Data
  doc.text("2. Annual Activity Data", 14, (doc as any).lastAutoTable.finalY + 15);
  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 20,
    head: [["Input Resource", "Annual Usage", "Unit", "Emission Factor"]],
    body: [
      ["Electricity", log.electricity_kwh.toLocaleString(), "kWh", EMISSION_FACTORS.electricity],
      ["Diesel", log.diesel_liters.toLocaleString(), "Liters", EMISSION_FACTORS.diesel],
      ["Petrol", log.petrol_liters.toLocaleString(), "Liters", EMISSION_FACTORS.petrol],
      ["LPG / PNG", log.lpg_kg.toLocaleString(), "kg", EMISSION_FACTORS.lpg]
    ],
    theme: "grid"
  });

  // Emissions Summary
  doc.text("3. Emissions Summary", 14, (doc as any).lastAutoTable.finalY + 15);
  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 20,
    head: [["Metric", "Value", "Unit"]],
    body: [
      ["Scope 1 (Direct Fuels)", log.scope1_co2e.toFixed(1), "kgCO2e"],
      ["Scope 2 (Electricity)", log.scope2_co2e.toFixed(1), "kgCO2e"],
      ["Total Annual Emissions", log.total_co2e.toFixed(1), "kgCO2e"],
      ["Carbon Intensity", log.intensity.toFixed(2), "kgCO2e/Cr"],
      ["Sector Benchmark", log.sector_benchmark.toString(), "kgCO2e/Cr"],
      ["Benchmark Ratio", log.ratio.toFixed(4), "ratio"]
    ],
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] }
  });

  // Strengths & Gaps
  doc.text("4. Analysis & Recommendations", 14, (doc as any).lastAutoTable.finalY + 15);
  doc.setFontSize(10);
  let y = (doc as any).lastAutoTable.finalY + 22;
  doc.setFont(undefined, 'bold');
  doc.text("Key Strengths:", 14, y);
  doc.setFont(undefined, 'normal');
  y += 6;
  report.strengths.forEach((s: string) => {
    doc.text(`• ${s}`, 18, y);
    y += 5;
  });

  y += 5;
  doc.setFont(undefined, 'bold');
  doc.text("Areas for Improvement:", 14, y);
  doc.setFont(undefined, 'normal');
  y += 6;
  report.gaps.forEach((g: string) => {
    doc.text(`• ${g}`, 18, y);
    y += 5;
  });

  // Action Plan
  doc.addPage();
  doc.setFontSize(14);
  doc.text("5. 12-Month Improvement Plan", 14, 20);
  (doc as any).autoTable({
    startY: 25,
    head: [["Priority", "Recommended Action", "Timeline", "Category"]],
    body: report.actions.map((a: any) => [a.priority, a.action, a.timeline, a.category]),
    theme: "grid",
    headStyles: { fillColor: [249, 115, 22] }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("GreenTrack — Standardized Carbon Reporting for Financial Institutions", pageWidth / 2, 285, { align: "center" });
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, 285);
  }

  doc.save(`Carbon_Report_${companyName.replace(/\s+/g, '_')}_FY${log.year}.pdf`);
};

export default function ReportsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<CarbonLog[]>([]);
  const [reports, setReports] = useState<CarbonReport[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<CarbonReport | null>(null);

  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const [logsData, reportsData] = await Promise.all([
            getCarbonLogs(user.id),
            getReports(user.id)
          ]);
          setLogs(logsData);
          setReports(reportsData);
          if (reportsData.length > 0) setSelectedReport(reportsData[0]);
        } catch (error) {
          console.error("Load error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, [user]);

  const handleGenerate = async () => {
    if (!user || logs.length === 0) {
      toast.error("No carbon data found. Log your yearly data first.");
      return;
    }
    setIsGenerating(true);
    const latestLog = logs[logs.length - 1];
    
    // Safety check: Ensure log has an ID from Supabase
    if (!latestLog.id || latestLog.id.length < 10) {
      toast.error("Error: Log ID is missing. Your data might not be saved to Supabase yet.");
      setIsGenerating(false);
      return;
    }

    try {
      const reportContent = generateReportData(latestLog);
      const newReport: Omit<CarbonReport, "id" | "created_at"> = {
        user_id: user.id,
        carbon_log_id: latestLog.id,
        year: latestLog.year,
        report_json: { log: latestLog, report: reportContent }
      };

      const savedReport = await saveReport(newReport);
      setReports([savedReport, ...reports]);
      setSelectedReport(savedReport);
      toast.success(`Report for FY ${latestLog.year} generated and saved!`);
    } catch (error: any) {
      console.error("Report save error:", error);
      toast.error(`Failed to save report: ${error.message || "Database error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentData = selectedReport?.report_json;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Carbon Reports</h1>
          <p className="text-muted-foreground">
            Structured reports for Banks & NBFCs generated from your data.
          </p>
        </div>
        <div className="flex gap-2">
          {selectedReport && (
            <>
              <Button variant="outline" className="gap-2" onClick={() => {
                const text = JSON.stringify(currentData, null, 2);
                navigator.clipboard.writeText(text);
                toast.success("JSON copied to clipboard!");
              }}>
                <Copy className="h-4 w-4" />
                Copy Data
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                onClick={() => downloadPDF(currentData.log, currentData.report, user?.companyName || "Your Company")}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </>
          )}
          <Button 
            className="gap-2" 
            onClick={handleGenerate}
            disabled={isGenerating || logs.length === 0}
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Latest Report"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar: Historical Reports */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <History className="h-4 w-4" />
                Past Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-2">
              {isLoading ? (
                <div className="p-4 text-xs text-center text-muted-foreground">Loading...</div>
              ) : reports.length === 0 ? (
                <div className="p-4 text-xs text-center text-muted-foreground">No reports yet.</div>
              ) : (
                <div className="space-y-1">
                  {reports.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedReport(r)}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                        selectedReport?.id === r.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      <div className="font-bold">FY {r.year}</div>
                      <div className={selectedReport?.id === r.id ? "text-primary-foreground/70" : "text-muted-foreground"}>
                        {new Date(r.created_at || "").toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Report View */}
        <div className="lg:col-span-3">
          {!selectedReport ? (
            <Card className="border-border">
              <CardContent className="py-20 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Report Selected</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  {logs.length === 0 
                    ? "Log your carbon data first to generate your first bankable report."
                    : "Select a report from the history or generate a new one for your latest data."}
                </p>
                <Button onClick={handleGenerate} disabled={logs.length === 0 || isGenerating}>
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Summary Header */}
              <Card className="border-border bg-card">
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Carbon Report — FY {currentData.log.year}</h2>
                      <p className="text-sm text-muted-foreground">
                        {user?.companyName} • Generated {new Date(selectedReport.created_at || "").toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{currentData.log.cat_score}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Green Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{(currentData.log.total_co2e / 1000).toFixed(2)}t</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total CO₂e</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="action">Action Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card><CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Scope 1 (Fuels)</div>
                      <div className="text-2xl font-bold">{currentData.log.scope1_co2e.toFixed(0)} kg</div>
                      <div className="text-xs text-muted-foreground">{currentData.report.scope1Pct}% of total</div>
                    </CardContent></Card>
                    <Card><CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Scope 2 (Electricity)</div>
                      <div className="text-2xl font-bold">{currentData.log.scope2_co2e.toFixed(0)} kg</div>
                      <div className="text-xs text-muted-foreground">{currentData.report.scope2Pct}% of total</div>
                    </CardContent></Card>
                    <Card><CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Intensity Ratio</div>
                      <div className="text-2xl font-bold">{currentData.log.ratio.toFixed(4)}</div>
                      <div className="text-xs text-muted-foreground">Benchmark: {currentData.log.sector_benchmark}</div>
                    </CardContent></Card>
                  </div>

                  <Card>
                    <CardHeader><CardTitle className="text-base">Executive Summary</CardTitle></CardHeader>
                    <CardContent className="text-sm leading-relaxed text-muted-foreground">
                      This report evaluates the carbon footprint of <strong className="text-foreground">{user?.companyName}</strong> for 
                      Fiscal Year <strong className="text-foreground">{currentData.log.year}</strong>. 
                      With total emissions of <strong className="text-foreground">{(currentData.log.total_co2e/1000).toFixed(2)} tonnes CO2e</strong> and an 
                      intensity of <strong className="text-foreground">{currentData.log.intensity.toFixed(2)} kgCO2e/Cr</strong>, 
                      the company achieved a Green Score of <strong className="text-primary font-bold">{currentData.log.cat_score}/100</strong>.
                      This rating reflects the company's environmental risk profile relative to the 
                      <span className="capitalize"> {currentData.log.sector}</span> sector benchmarks.
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-emerald-500/20 bg-emerald-500/5">
                      <CardHeader><CardTitle className="text-base flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" /> Strengths
                      </CardTitle></CardHeader>
                      <CardContent><ul className="space-y-2">
                        {currentData.report.strengths.map((s: string, i: number) => (
                          <li key={i} className="text-sm text-emerald-800 flex gap-2"><span>•</span> {s}</li>
                        ))}
                      </ul></CardContent>
                    </Card>
                    <Card className="border-orange-500/20 bg-orange-500/5">
                      <CardHeader><CardTitle className="text-base flex items-center gap-2 text-orange-700">
                        <AlertTriangle className="h-4 w-4" /> Improvement Areas
                      </CardTitle></CardHeader>
                      <CardContent><ul className="space-y-2">
                        {currentData.report.gaps.map((g: string, i: number) => (
                          <li key={i} className="text-sm text-orange-800 flex gap-2"><span>•</span> {g}</li>
                        ))}
                      </ul></CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="action">
                  <Card>
                    <CardHeader><CardTitle className="text-base">90-Day Priority Action Plan</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentData.report.actions.map((action: any, i: number) => (
                          <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-border">
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              action.priority === 'High' ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                              {action.priority}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{action.action}</p>
                              <div className="flex gap-4 mt-1 text-[10px] text-muted-foreground">
                                <span>Timeline: {action.timeline}</span>
                                <span>Category: {action.category}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <p className="text-[10px] text-center text-muted-foreground mt-8">
                Disclaimer: This report is for information purposes and does not constitute a legal audit or certification.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
