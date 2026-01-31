import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { Plus, Leaf, Zap, Fuel, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Average emission factors for India (kg CO2 per unit)
const EMISSION_FACTORS = {
  electricity: 0.82, // kg CO2 per kWh (India grid average)
  diesel: 2.68, // kg CO2 per liter
  petrol: 2.31, // kg CO2 per liter
  lpg: 2.98, // kg CO2 per kg
};

const mockCarbonData = [
  { month: "Aug", electricity: 12300, fuel: 850, total: 10831 },
  { month: "Sep", electricity: 11800, fuel: 920, total: 10558 },
  { month: "Oct", electricity: 11200, fuel: 780, total: 10276 },
  { month: "Nov", electricity: 10800, fuel: 700, total: 9732 },
  { month: "Dec", electricity: 10500, fuel: 650, total: 9349 },
  { month: "Jan", electricity: 10200, fuel: 600, total: 8969 },
];

const mockMonthlyBreakdown = [
  { month: "Jan 2025", electricity: 10200, electricityEmission: 8364, fuel: 600, fuelEmission: 1608 },
];

export default function CarbonPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [formData, setFormData] = useState({
    electricityKwh: "",
    fuelType: "diesel",
    fuelLiters: "",
  });

  const totalEmissions = mockCarbonData[mockCarbonData.length - 1].total;
  const previousEmissions = mockCarbonData[mockCarbonData.length - 2].total;
  const emissionChange = ((totalEmissions - previousEmissions) / previousEmissions * 100).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate emissions
    const electricityEmission = parseFloat(formData.electricityKwh || "0") * EMISSION_FACTORS.electricity;
    const fuelEmission = parseFloat(formData.fuelLiters || "0") * EMISSION_FACTORS[formData.fuelType as keyof typeof EMISSION_FACTORS];
    console.log("Total emission:", electricityEmission + fuelEmission, "kg CO2");
    setShowAddDialog(false);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Carbon Emissions Tracking</h1>
          <p className="text-muted-foreground">
            Track your Scope 1 & 2 emissions
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Log Monthly Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Carbon Data</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input 
                  id="month" 
                  type="month" 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
              
              <div className="p-4 rounded-lg bg-accent/50 space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-chart-4" />
                  <span className="font-medium text-foreground">Electricity (Scope 2)</span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricity">Consumption (kWh)</Label>
                  <Input
                    id="electricity"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.electricityKwh}
                    onChange={(e) => setFormData({ ...formData, electricityKwh: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Emission factor: {EMISSION_FACTORS.electricity} kg CO₂/kWh
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/50 space-y-4">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-chart-3" />
                  <span className="font-medium text-foreground">Fuel (Scope 1 - Optional)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select 
                      value={formData.fuelType} 
                      onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="lpg">LPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelAmount">Amount (Liters/kg)</Label>
                    <Input
                      id="fuelAmount"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.fuelLiters}
                      onChange={(e) => setFormData({ ...formData, fuelLiters: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Data</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-chart-4/20 bg-chart-4/10">
        <AlertTriangle className="h-4 w-4 text-chart-4" />
        <AlertDescription className="text-muted-foreground">
          Carbon calculations are <strong>estimates for internal tracking only</strong> and are not audit-certified. 
          Uses average emission factors for India.
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {(totalEmissions / 1000).toFixed(1)} <span className="text-sm font-normal text-muted-foreground">tCO₂</span>
                </div>
                <div className="text-sm text-muted-foreground">This Month's Emissions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                <Zap className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  93% <span className="text-sm font-normal text-muted-foreground">Scope 2</span>
                </div>
                <div className="text-sm text-muted-foreground">From Electricity</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/20">
                <Fuel className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${parseFloat(emissionChange) < 0 ? "text-chart-1" : "text-destructive"}`}>
                  {emissionChange}%
                </div>
                <div className="text-sm text-muted-foreground">vs Last Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Emission Trend (kg CO₂)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockCarbonData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Consumption Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCarbonData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="electricity" name="Electricity (kWh)" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fuel" name="Fuel (L)" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card className="border-border">
        <CardContent className="py-6">
          <h3 className="font-semibold text-foreground mb-4">About Carbon Tracking</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-2">Scope 1 (Direct)</h4>
              <p className="text-sm text-muted-foreground">
                Emissions from fuel burned in company vehicles, generators, or heating. 
                Track diesel, petrol, and LPG usage.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Scope 2 (Indirect)</h4>
              <p className="text-sm text-muted-foreground">
                Emissions from purchased electricity. This is typically the largest 
                source for offices and SMEs in India.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
