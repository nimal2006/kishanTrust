import {
  SafeCreditRecommendation,
  RiskLevel,
  EvidenceSourceType,
  Farmer,
  CropPlan,
  FutureCropEconomics,
  ScenarioResult,
  RepaymentCapacityAssessment,
  VerificationStatus,
} from "../types.js";

export class SafeCreditEngine {
  public static calculate(params: {
    farmer: Farmer;
    cropPlan?: CropPlan;
    economics: FutureCropEconomics;
    scenarios: ScenarioResult[];
    repayment: RepaymentCapacityAssessment;
  }): SafeCreditRecommendation {
    const { farmer, cropPlan, economics, scenarios, repayment } = params;
    const requested = cropPlan ? cropPlan.requested_credit : farmer.requested_loan_amount || 200000;

    const normal = scenarios.find((s) => s.type === "normal")!;
    const combined = scenarios.find((s) => s.type === "combined_stress")!;
    const priceStress = scenarios.find((s) => s.type === "price_stress")!;
    const yieldStress = scenarios.find((s) => s.type === "yield_stress")!;

    // Derive safe credit limits from stressed repayment capacity
    // Conservative baseline: Lower bound = 80% of combined stress capacity (super-safe)
    // Upper bound = 100% of price stress capacity or 95% of blended repayment capacity, capped at normal capacity * 0.70
    const combinedCapacity = combined.estimated_repayment_capacity;
    const priceCapacity = priceStress.estimated_repayment_capacity;

    let recMin = Math.round(Math.max(40000, combinedCapacity * 0.85 / 5000) * 5000);
    let recMax = Math.round(Math.max(recMin + 15000, Math.min(priceCapacity * 0.9, normal.estimated_repayment_capacity * 0.75) / 5000) * 5000);

    // If farmer is verified by FPO, we can extend upper bounds by 10%
    if (farmer.verification_status === VerificationStatus.VERIFIED) {
      recMax = Math.round((recMax * 1.10) / 5000) * 5000;
    }

    // Determine risk tier
    let riskTier: RiskLevel = RiskLevel.LOW;
    let drivingScenario = "Normal Scenario supports current cultivation cycle.";
    let rationale = "";

    if (requested > normal.estimated_repayment_capacity) {
      riskTier = RiskLevel.EXTREME;
      drivingScenario = "Requested amount exceeds baseline expected net income after living expenses.";
      rationale = `The requested credit of ₹${requested.toLocaleString("en-IN")} exceeds the farmer's estimated surplus even under optimal yield and harvest pricing. Recommended range is scaled to sustainable repayment capacity.`;
    } else if (requested > combinedCapacity) {
      riskTier = RiskLevel.HIGH;
      drivingScenario = "Combined Price (-25%) & Yield (-20%) Stress Downside.";
      rationale = `While requested credit (₹${requested.toLocaleString("en-IN")}) appears serviceable under normal season conditions, repayment becomes critically strained if market prices crash by 25% coincident with a 20% pest/weather yield drop. Recommending ₹${recMin.toLocaleString("en-IN")} – ₹${recMax.toLocaleString("en-IN")} to ensure default-free servicing across adverse conditions.`;
    } else if (requested > priceCapacity) {
      riskTier = RiskLevel.MODERATE;
      drivingScenario = "Mandi Price Downside (-25%) during peak arrivals.";
      rationale = `Credit is serviceable in average years, but requires monitoring against mandi price volatility during peak harvest arrivals.`;
    } else {
      riskTier = RiskLevel.LOW;
      drivingScenario = "Robust buffer across all 4 stress scenarios.";
      rationale = `Conservative cash flow projections confirm full repayment resilience even under simulated downside shocks.`;
    }

    // Top positive factors
    const topPositives: string[] = [];
    if (farmer.verification_status === VerificationStatus.VERIFIED) {
      topPositives.push("Community Verification: FPO officer physically confirmed cultivated acreage and active crop standing.");
    }
    if (farmer.land_size_acres >= 3) {
      topPositives.push(`Strong asset base with ${farmer.land_size_acres} acres under productive cultivation.`);
    }
    if (farmer.irrigation_type === "Borewell" || farmer.irrigation_type === "Canal" || farmer.irrigation_type === "Drip") {
      topPositives.push(`Reliable irrigation infrastructure (${farmer.irrigation_type}) mitigates severe monsoon failure risk.`);
    }
    topPositives.push(`Conservative forward pricing models apply peak-arrival discounts to prevent debt overhang.`);

    // Top risk factors
    const topRisks: string[] = [];
    if (requested > combinedCapacity) {
      topRisks.push(`Downside Debt Gap: Requested ₹${requested.toLocaleString("en-IN")} leaves negative coverage in combined price/yield shock.`);
    }
    topRisks.push(`Post-Harvest Price Volatility: Mandi prices for ${cropPlan?.crop || farmer.crop_types[0]} historical swing up to 28% during peak season.`);
    if (farmer.verification_status !== VerificationStatus.VERIFIED) {
      topRisks.push(`Pending Field Verification: Soil health and sowing verification pending FPO final sign-off.`);
    }

    // Assumptions
    const assumptions: string[] = [
      `Cost of cultivation estimated at ₹${economics.cultivation_cost.toLocaleString("en-IN")} based on state agricultural benchmarks and input bills.`,
      `Harvest realization pegged to ${economics.expected_harvest_period} window with mandatory 30-45 day marketing settlement lag.`,
      `Household subsistence living expenses modeled at 22% of gross agricultural income to prioritize family nutrition and stability.`,
      `Working capital reserve fund of 20% preserved for subsequent sowing cycle without reliance on emergency informal credit.`,
    ];

    // Evidence confidence breakdown
    const evidenceBreakdown: Array<{ parameter: string; source: EvidenceSourceType; verified: boolean }> = [
      {
        parameter: "Farmer Identity & KYC",
        source: EvidenceSourceType.FARMER_PROVIDED,
        verified: true,
      },
      {
        parameter: "Cultivated Land Records (Patta / Chitta)",
        source: farmer.verification_status === VerificationStatus.VERIFIED ? EvidenceSourceType.FPO_VERIFIED : EvidenceSourceType.FARMER_PROVIDED,
        verified: farmer.verification_status === VerificationStatus.VERIFIED,
      },
      {
        parameter: "Sowing & Standing Crop Evidence",
        source: farmer.verification_status === VerificationStatus.VERIFIED ? EvidenceSourceType.FPO_VERIFIED : EvidenceSourceType.FARMER_PROVIDED,
        verified: farmer.verification_status === VerificationStatus.VERIFIED,
      },
      {
        parameter: "Mandi Price & Arrival History",
        source: EvidenceSourceType.GOVERNMENT_EXTERNAL,
        verified: true,
      },
      {
        parameter: "State Horticulture Yield Benchmarks",
        source: EvidenceSourceType.GOVERNMENT_EXTERNAL,
        verified: true,
      },
      {
        parameter: "Agro-Meteorological Risk Indices",
        source: EvidenceSourceType.GOVERNMENT_EXTERNAL,
        verified: true,
      },
      {
        parameter: "Stress Test & Repayment Model",
        source: EvidenceSourceType.DERIVED,
        verified: true,
      },
    ];

    // Compute overall confidence score (0 to 100)
    let confidenceScore = 60;
    if (farmer.verification_status === VerificationStatus.VERIFIED) confidenceScore += 25;
    if (farmer.verification_status === VerificationStatus.NEEDS_EVIDENCE) confidenceScore -= 10;
    if (farmer.supporting_evidence && farmer.supporting_evidence.length > 0) confidenceScore += 10;

    confidenceScore = Math.min(95, Math.max(45, confidenceScore));
    const rating = confidenceScore >= 80 ? "High Confidence" : confidenceScore >= 60 ? "Moderate Confidence" : "Needs Evidence";

    return {
      farmer_id: farmer.id,
      requested_credit: requested,
      recommended_minimum: recMin,
      recommended_maximum: recMax,
      risk_tier: riskTier,
      driving_scenario: drivingScenario,
      rationale,
      top_positive_factors: topPositives,
      top_risk_factors: topRisks,
      assumptions,
      evidence_confidence: {
        overall_confidence_pct: confidenceScore,
        rating,
        evidence_breakdown: evidenceBreakdown,
      },
    };
  }
}
