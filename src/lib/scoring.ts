/**
 * Green Score Calculation Logic
 * Based on BRSR P6 Essential Indicators and specific scoring formula
 */

export const SECTOR_BENCHMARKS: Record<string, { carbonIntensity: number, waterIntensity: number, wasteIntensity: number }> = {
  "technology": { carbonIntensity: 10, waterIntensity: 2, wasteIntensity: 0.5 },
  "manufacturing": { carbonIntensity: 150, waterIntensity: 20, wasteIntensity: 5.0 },
  "services": { carbonIntensity: 5, waterIntensity: 1, wasteIntensity: 0.2 },
  "retail": { carbonIntensity: 20, waterIntensity: 5, wasteIntensity: 1.0 },
  "agriculture": { carbonIntensity: 120, waterIntensity: 50, wasteIntensity: 3.0 },
  "construction": { carbonIntensity: 90, waterIntensity: 15, wasteIntensity: 10.0 },
  "default": { carbonIntensity: 50, waterIntensity: 10, wasteIntensity: 2.0 }
};

export interface EnergyData {
  electricityKwh: number;
  dieselLiters: number;
  lpgKg: number;
  petrolLiters: number;
}

export interface WaterData {
  totalWithdrawalKl: number;
  recycledKl: number;
  treatedKl: number;
}

export interface WasteData {
  totalGeneratedTonnes: number;
  hazardousTonnes: number;
  recycledTonnes: number;
}

export interface RenewableData {
  renewableSharePercent: number; // 0-100
  greenCapexInr: number;
}

export interface ReportingData {
  hasEnvironmentalPolicy: boolean;
  hasReductionTargets: boolean;
  hasThirdPartyVerification: boolean;
}

export interface GreenScoreInput {
  revenueInrCr: number;
  sector: string;
  energy: EnergyData;
  water: WaterData;
  waste: WasteData;
  renewable: RenewableData;
  reporting: ReportingData;
}

export interface PillarScore {
  score: number;
  weightedScore: number;
}

export interface GreenScoreResult {
  totalScore: number;
  pillars: {
    energy: PillarScore & { totalCo2e: number; scope1Co2e: number; scope2Co2e: number; intensity: number };
    water: PillarScore;
    waste: PillarScore;
    renewable: PillarScore;
    reporting: PillarScore;
  };
}

export const EMISSION_FACTORS = {
  electricity: 0.71, // kgCO2e/kWh
  diesel: 2.68,      // kgCO2e/litre
  lpg: 1.56,         // kgCO2e/kg
  petrol: 2.31       // kgCO2e/litre
};

export function calculateCatScore(intensity: number, benchmarkValue: number) {
  if (benchmarkValue === 0) return 0;
  const ratio = intensity / benchmarkValue;
  return Math.max(0, Math.min(100, 100 * (2 - ratio) / 1.8));
}

export function calculateEnergyScore(energy: EnergyData, revenueInrCr: number, sector: string) {
  const safeRevenue = revenueInrCr > 0 ? revenueInrCr : 1;
  const normalizedSector = sector?.toLowerCase().trim() || "default";
  const benchmark = SECTOR_BENCHMARKS[normalizedSector] || SECTOR_BENCHMARKS["default"];

  const scope1Co2e = 
    (energy.dieselLiters * EMISSION_FACTORS.diesel) +
    (energy.lpgKg * EMISSION_FACTORS.lpg) +
    (energy.petrolLiters * EMISSION_FACTORS.petrol);
    
  const scope2Co2e = energy.electricityKwh * EMISSION_FACTORS.electricity;
  const totalCo2e = scope1Co2e + scope2Co2e;

  const carbonIntensity = totalCo2e / safeRevenue; // kgCO2e / Cr
  const score = calculateCatScore(carbonIntensity, benchmark.carbonIntensity);

  return {
    scope1Co2e,
    scope2Co2e,
    totalCo2e,
    intensity: carbonIntensity,
    score: Math.round(score)
  };
}

export function calculateComprehensiveGreenScore(input: GreenScoreInput): GreenScoreResult {
  const { revenueInrCr, sector, energy, water, waste, renewable, reporting } = input;
  
  const safeRevenue = revenueInrCr > 0 ? revenueInrCr : 1;
  const normalizedSector = sector?.toLowerCase().trim() || "default";
  const benchmark = SECTOR_BENCHMARKS[normalizedSector] || SECTOR_BENCHMARKS["default"];

  // --- PILLAR 1: Energy & Carbon Emissions (40%) ---
  const energyResult = calculateEnergyScore(energy, revenueInrCr, sector);
  const energyScore = energyResult.score;

  // --- PILLAR 2: Water Management (20%) ---
  const waterIntensity = water.totalWithdrawalKl / safeRevenue;
  const waterScore = calculateCatScore(waterIntensity, benchmark.waterIntensity);

  // --- PILLAR 3: Waste Management (20%) ---
  const wasteIntensity = waste.totalGeneratedTonnes / safeRevenue;
  const wasteScore = calculateCatScore(wasteIntensity, benchmark.wasteIntensity);

  // --- PILLAR 4: Renewable & Clean Initiatives (10%) ---
  const renewableScore = Math.max(0, Math.min(100, renewable.renewableSharePercent));

  // --- PILLAR 5: Reporting Quality & Targets (10%) ---
  const govScore = 
    ((reporting.hasEnvironmentalPolicy ? 1 : 0) +
    (reporting.hasReductionTargets ? 1 : 0) +
    (reporting.hasThirdPartyVerification ? 1 : 0)) * 33.3;

  // --- CALCULATE FINAL SCORE ---
  const energyWeighted = energyScore * 0.40;
  const waterWeighted = waterScore * 0.20;
  const wasteWeighted = wasteScore * 0.20;
  const renewableWeighted = renewableScore * 0.10;
  const govWeighted = govScore * 0.10;

  const totalScore = energyWeighted + waterWeighted + wasteWeighted + renewableWeighted + govWeighted;

  return {
    totalScore: Math.round(totalScore),
    pillars: {
      energy: { score: Math.round(energyScore), weightedScore: energyWeighted, totalCo2e: energyResult.totalCo2e, scope1Co2e: energyResult.scope1Co2e, scope2Co2e: energyResult.scope2Co2e, intensity: energyResult.intensity },
      water: { score: Math.round(waterScore), weightedScore: waterWeighted },
      waste: { score: Math.round(wasteScore), weightedScore: wasteWeighted },
      renewable: { score: Math.round(renewableScore), weightedScore: renewableWeighted },
      reporting: { score: Math.round(govScore), weightedScore: govWeighted }
    }
  };
}
