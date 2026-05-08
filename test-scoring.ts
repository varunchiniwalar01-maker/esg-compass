import { calculateComprehensiveGreenScore } from "./src/lib/scoring.js";

const testInput = {
  revenueInrCr: 100,
  sector: "manufacturing",
  energy: {
    electricityKwh: 50000,
    dieselLiters: 1000,
    lpgKg: 500,
    petrolLiters: 200
  },
  water: {
    totalWithdrawalKl: 1000,
    recycledKl: 400,
    treatedKl: 800
  },
  waste: {
    totalGeneratedTonnes: 100,
    hazardousTonnes: 5,
    recycledTonnes: 60
  },
  renewable: {
    renewableSharePercent: 20,
    greenCapexInr: 5000000 // 50 Lakhs
  },
  reporting: {
    hasEnvironmentalPolicy: true,
    hasReductionTargets: true,
    hasThirdPartyVerification: false
  }
};

const result = calculateComprehensiveGreenScore(testInput);
console.log(JSON.stringify(result, null, 2));
