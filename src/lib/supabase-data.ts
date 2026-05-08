import { supabase } from "./supabase";

export type CarbonLog = {
  id?: string;
  user_id: string;
  year: string;
  sector: string;
  revenue_inr_cr: number;
  electricity_kwh: number;
  diesel_liters: number;
  petrol_liters: number;
  lpg_kg: number;
  scope1_co2e: number;
  scope2_co2e: number;
  total_co2e: number;
  intensity: number;
  sector_benchmark: number;
  ratio: number;
  cat_score: number;
  created_at?: string;
};

export type CarbonReport = {
  id?: string;
  user_id: string;
  carbon_log_id: string;
  year: string;
  report_json: any;
  created_at?: string;
};

const LS_LOGS_KEY = "carbonYearlyLogs";
const LS_REPORTS_KEY = "generatedCarbonReports";

const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// --- Carbon Logs ---

export async function saveCarbonLog(log: Omit<CarbonLog, "id" | "created_at">): Promise<CarbonLog> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("carbon_logs")
      .insert([log])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }
    return data;
  } else {
    // Fallback to localStorage
    const saved = localStorage.getItem(LS_LOGS_KEY);
    const logs: CarbonLog[] = saved ? JSON.parse(saved) : [];
    const newLog = { ...log, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() };
    logs.push(newLog);
    localStorage.setItem(LS_LOGS_KEY, JSON.stringify(logs));
    return newLog;
  }
}

export async function getCarbonLogs(userId: string): Promise<CarbonLog[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("carbon_logs")
      .select("*")
      .eq("user_id", userId)
      .order("year", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error);
      return [];
    }
    return data || [];
  } else {
    // Fallback to localStorage
    const saved = localStorage.getItem(LS_LOGS_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}

export async function deleteCarbonLog(logId: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from("carbon_logs")
      .delete()
      .eq("id", logId);

    if (error) throw error;
  } else {
    // Fallback to localStorage
    const saved = localStorage.getItem(LS_LOGS_KEY);
    if (saved) {
      const logs: CarbonLog[] = JSON.parse(saved);
      const filtered = logs.filter(l => l.id !== logId);
      localStorage.setItem(LS_LOGS_KEY, JSON.stringify(filtered));
    }
  }
}

// --- Reports ---

export async function saveReport(report: Omit<CarbonReport, "id" | "created_at">): Promise<CarbonReport> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("carbon_reports")
      .insert([report])
      .select()
      .single();

    if (error) {
      console.error("Supabase report insert error:", error);
      throw error;
    }
    return data;
  } else {
    // Fallback to localStorage
    const saved = localStorage.getItem(LS_REPORTS_KEY);
    const reports: CarbonReport[] = saved ? JSON.parse(saved) : [];
    const newReport = { ...report, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() };
    reports.push(newReport);
    localStorage.setItem(LS_REPORTS_KEY, JSON.stringify(reports));
    return newReport;
  }
}

export async function getReports(userId: string): Promise<CarbonReport[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("carbon_reports")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch reports error:", error);
      return [];
    }
    return data || [];
  } else {
    // Fallback to localStorage
    const saved = localStorage.getItem(LS_REPORTS_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
