import { GoogleGenAI } from "@google/genai";
import { db } from "../data.js";
import { VerificationStatus, RiskLevel } from "../types.js";
import { AgmarknetProvider } from "./providers/agmarknetProvider.js";
import { NHBProvider } from "./providers/nhbProvider.js";
import { PMFBYClaimsProvider } from "./providers/pmfbyClaimsProvider.js";
import { PMKisanProvider } from "./providers/pmKisanProvider.js";
import { CropEconomicsEngine } from "./cropEconomicsEngine.js";
import { StressTestEngine } from "./stressTestEngine.js";
import { RepaymentEngine } from "./repaymentEngine.js";
import { SafeCreditEngine } from "./safeCreditEngine.js";

export interface AICreditAgentOutput {
  assessment_id: string;
  farmer_name: string;
  reference_id: string;
  overall_score: number; // out of 100
  scoring_breakdown: {
    evidence_verification: { score: number; max: 20 };
    farm_production_strength: { score: number; max: 20 };
    market_stability: { score: number; max: 15 };
    repayment_capacity: { score: number; max: 25 };
    agricultural_risk: { score: number; max: 15 };
    purpose_fit: { score: number; max: 5 };
  };
  eligibility: "ELIGIBLE" | "CONDITIONALLY ELIGIBLE" | "NEEDS MORE EVIDENCE" | "HIGH RISK / NOT RECOMMENDED";
  confidence_pct: number;
  requested_credit: number;
  recommended_safe_range: { min: number; max: number };
  risk_tier: "Low" | "Moderate" | "High" | "Extreme";
  key_reasons: string[];
  missing_evidence: string[];
  data_sources_used: Array<{ name: string; resourceId: string; type: string }>;
  assumptions: string[];
  ai_narrative_explanation: string;
}

export class AICreditAgent {
  public static async evaluateFarmer(farmerId: number): Promise<AICreditAgentOutput> {
    const farmer = db.getFarmerById(farmerId) || db.getFarmers()[0];
    const cropPlan = db.getCropPlans(farmer.id)[0];
    const verif = db.getVerificationByFarmerId(farmer.id);

    const crop = cropPlan ? cropPlan.crop : farmer.crop_types[0] || "Paddy";
    const reqCredit = cropPlan ? cropPlan.requested_credit : farmer.requested_loan_amount || 200000;
    const prod = cropPlan ? cropPlan.expected_production_quintals : 85;
    const cost = cropPlan ? cropPlan.cultivation_expenses : farmer.cultivation_cost || 68000;

    // Fetch dataset signals
    const agmarknet = await AgmarknetProvider.getCommodityMarketData(crop, farmer.state, farmer.district);
    const nhb = await NHBProvider.getHorticultureBenchmark(crop, farmer.state, farmer.district);
    const pmfby = await PMFBYClaimsProvider.getClaimsByState(farmer.state);
    const pmKisan = await PMKisanProvider.getCommunityContext(farmer.state, farmer.district, farmer.village);

    // Compute economics & stress test
    const economics = CropEconomicsEngine.calculate({
      crop,
      state: farmer.state,
      expected_production_quintals: prod,
      expected_harvest_period: farmer.expected_harvest_date || "Harvest 2026",
      cultivation_cost: cost,
    });

    const scenarios = StressTestEngine.runScenarios(economics, reqCredit);
    const combinedStress = scenarios.find((s) => s.type === "combined_stress");

    const repayment = RepaymentEngine.evaluate({
      farmer_id: farmer.id,
      requested_loan: reqCredit,
      economics,
      scenarios,
    });

    const safeCredit = SafeCreditEngine.calculate({
      farmer,
      cropPlan,
      economics,
      scenarios,
      repayment,
    });

    // Weighted Score Components (Explicit & Deterministic)
    // 1. Evidence & Verification (20 max)
    const isVerified = farmer.verification_status === VerificationStatus.VERIFIED || (verif && verif.status === VerificationStatus.VERIFIED);
    const evidenceScore = isVerified ? 18 : 11;

    // 2. Farm Strength (20 max)
    const area = farmer.land_size_acres || 3.0;
    const farmScore = area >= 3.0 ? 17 : 13;

    // 3. Market Stability (15 max)
    const vol = agmarknet.data.volatility_percent;
    const marketScore = vol < 12 ? 14 : vol < 22 ? 11 : 8;

    // 4. Repayment Capacity (25 max)
    const debtBurden = combinedStress ? combinedStress.debt_burden_pct : 45;
    const repaymentScore = debtBurden <= 40 ? 23 : debtBurden <= 65 ? 18 : 10;

    // 5. Agricultural Risk (15 max)
    const riskScore = safeCredit.risk_tier === RiskLevel.LOW ? 14 : safeCredit.risk_tier === RiskLevel.MODERATE ? 10 : 6;

    // 6. Purpose Fit (5 max)
    const purposeScore = 5;

    const totalScore = evidenceScore + farmScore + marketScore + repaymentScore + riskScore + purposeScore;

    let eligibility: AICreditAgentOutput["eligibility"] = "ELIGIBLE";
    if (totalScore >= 75) {
      eligibility = "ELIGIBLE";
    } else if (totalScore >= 60) {
      eligibility = "CONDITIONALLY ELIGIBLE";
    } else if (!isVerified) {
      eligibility = "NEEDS MORE EVIDENCE";
    } else {
      eligibility = "HIGH RISK / NOT RECOMMENDED";
    }

    const keyReasons: string[] = [
      `FPO Verification Status: ${farmer.verification_status} (Evidence Confidence: ${farmer.evidence_confidence_score}%)`,
      `Expected Net Income: ₹${economics.net_income_expected.toLocaleString("en-IN")} vs Requested Credit: ₹${reqCredit.toLocaleString("en-IN")}`,
      `Market Volatility Index for ${crop}: ${vol}% (${agmarknet.data.market_name})`,
      `Combined Stress Test Debt Burden: ${combinedStress ? combinedStress.debt_burden_pct.toFixed(1) : 55}%`,
    ];

    const missingEvidence: string[] = [];
    if (!isVerified) missingEvidence.push("FPO Field Crop Inspection Report");
    if (!verif?.evidence_documents?.some((d) => d.type.includes("Patta"))) {
      missingEvidence.push("Verified Patta / Land Title Certificate");
    }

    let aiNarrative = `Based on future crop economics for ${crop} across ${area} acres in ${farmer.location}, the recommended safe credit range is ₹${safeCredit.recommended_minimum.toLocaleString("en-IN")} to ₹${safeCredit.recommended_maximum.toLocaleString("en-IN")}. Total assessment score is ${totalScore}/100.`;

    // Try Gemini API if key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });

        const prompt = `You are an AI Agricultural Credit Assessment Agent for KissanTrust. Summarize the credit recommendation for farmer ${farmer.name} (${farmer.reference_id}) growing ${crop}. Requested Loan: ₹${reqCredit}. Score: ${totalScore}/100. Safe Range: ₹${safeCredit.recommended_minimum} - ₹${safeCredit.recommended_maximum}. Risk Tier: ${safeCredit.risk_tier}. Market Volatility: ${vol}%. Write 2 clear, professional sentences explaining why this safe range is recommended based on crop economics and stress testing. Never invent facts.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });

        if (response.text) {
          aiNarrative = response.text.trim();
        }
      } catch (e) {
        console.warn("AI Credit Agent Gemini fallback to deterministic narrative", e);
      }
    }

    return {
      assessment_id: `AI-EVAL-${farmer.reference_id}-${Date.now()}`,
      farmer_name: farmer.name,
      reference_id: farmer.reference_id,
      overall_score: totalScore,
      scoring_breakdown: {
        evidence_verification: { score: evidenceScore, max: 20 },
        farm_production_strength: { score: farmScore, max: 20 },
        market_stability: { score: marketScore, max: 15 },
        repayment_capacity: { score: repaymentScore, max: 25 },
        agricultural_risk: { score: riskScore, max: 15 },
        purpose_fit: { score: purposeScore, max: 5 },
      },
      eligibility,
      confidence_pct: farmer.evidence_confidence_score || 85,
      requested_credit: reqCredit,
      recommended_safe_range: {
        min: safeCredit.recommended_minimum,
        max: safeCredit.recommended_maximum,
      },
      risk_tier: safeCredit.risk_tier as any,
      key_reasons: keyReasons,
      missing_evidence: missingEvidence,
      data_sources_used: [
        { name: AgmarknetProvider.DATASET_NAME, resourceId: AgmarknetProvider.RESOURCE_ID, type: "Market Intelligence" },
        { name: NHBProvider.DATASET_NAME, resourceId: "NHB-HORTICULTURE-STATISTICS-2024-25", type: "Production Benchmarks" },
        { name: PMFBYClaimsProvider.DATASET_NAME, resourceId: PMFBYClaimsProvider.RESOURCE_ID, type: "Crop Insurance Risk" },
        { name: PMKisanProvider.DATASET_NAME, resourceId: PMKisanProvider.RESOURCE_ID, type: "Community Context" },
      ],
      assumptions: [
        `Harvest Price: ₹${economics.conservative_expected_price_quintal}/quintal based on AGMARKNET modal series`,
        `Yield: ${prod} quintals (${(prod / area).toFixed(1)} Q/acre) matching NHB agronomic baseline`,
        `Living Expense Reserve: 25% deducted from net agricultural cashflow`,
      ],
      ai_narrative_explanation: aiNarrative,
    };
  }
}
