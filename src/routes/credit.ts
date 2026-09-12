import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { AgriDataService } from "../services/agriDataService.js";
import { CropEconomicsEngine } from "../services/cropEconomicsEngine.js";
import { StressTestEngine } from "../services/stressTestEngine.js";
import { RepaymentEngine } from "../services/repaymentEngine.js";
import { SafeCreditEngine } from "../services/safeCreditEngine.js";
import { LoanPurposeCategory } from "../types.js";

export const creditRouter = Router();

// POST /api/v1/credit/plan - Crop & Loan Planner
creditRouter.post("/plan", (req: Request, res: Response) => {
  const {
    farmer_id,
    crop,
    variety,
    land_area_acres,
    cultivation_period_months,
    expected_production_quintals,
    expected_harvest_date,
    cultivation_expenses,
    requested_credit,
    purpose_category,
    purpose_description,
  } = req.body;

  if (!farmer_id || !crop || !requested_credit) {
    return res.status(422).json({ detail: "farmer_id, crop, and requested_credit are required" });
  }

  const farmer = db.getFarmerById(Number(farmer_id));
  if (!farmer) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  // Fetch benchmark cost per acre from NHB
  const benchmark = AgriDataService.getNHBBenchmark(crop, farmer.state);
  const benchmarkCostPerAcre = benchmark.benchmark_cost_per_acre || 25000;
  const area = Number(land_area_acres || farmer.land_size_acres || 3.0);
  const estimatedRequirement = Math.round(area * benchmarkCostPerAcre);

  // Check for purpose mismatch / scale warnings
  const requested = Number(requested_credit);
  let warning: string | null = null;

  if (requested > estimatedRequirement * 1.8) {
    warning = `Requested credit (₹${requested.toLocaleString("en-IN")}) is ${(requested / estimatedRequirement).toFixed(1)}x the standard crop input requirement (₹${estimatedRequirement.toLocaleString("en-IN")}) for ${area} acres of ${crop}. If credit includes capital investments (e.g., drip/solar), please ensure expenditure invoices are attached.`;
  } else if (requested < estimatedRequirement * 0.4) {
    warning = `Requested credit (₹${requested.toLocaleString("en-IN")}) may be insufficient for complete seasonal cultivation expenses (₹${estimatedRequirement.toLocaleString("en-IN")}). Ensure farmer has secondary working capital.`;
  }

  const plan = db.createCropPlan({
    farmer_id: Number(farmer_id),
    crop,
    variety: variety || "Standard High-Yielding Variety",
    land_area_acres: area,
    cultivation_period_months: Number(cultivation_period_months || 4),
    expected_production_quintals: Number(expected_production_quintals || Math.round(area * benchmark.benchmark_yield_quintals_per_acre)),
    expected_harvest_date: expected_harvest_date || farmer.expected_harvest_date || "2026-11-30",
    cultivation_expenses: Number(cultivation_expenses || estimatedRequirement * 0.9),
    requested_credit: requested,
    purpose_category: purpose_category || LoanPurposeCategory.SEEDS,
    purpose_description: purpose_description || "Seasonal agricultural inputs",
    benchmark_cost_per_acre: benchmarkCostPerAcre,
    estimated_crop_requirement: estimatedRequirement,
    purpose_mismatch_warning: warning,
  });

  return res.status(201).json({
    success: true,
    data: plan,
  });
});

// GET /api/v1/credit/plan/:farmerId - Get crop plan for farmer
creditRouter.get("/plan/:farmerId", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmerId, 10);
  const plans = db.getCropPlans(farmerId);
  return res.json({
    success: true,
    data: plans[0] || null,
  });
});

// POST /api/v1/credit/simulate - Interactive What-If Simulator
creditRouter.post("/simulate", (req: Request, res: Response) => {
  const {
    farmer_id,
    crop,
    state,
    production_quintals,
    custom_price_quintal,
    cultivation_cost,
    requested_credit,
    price_stress_pct,
    yield_stress_pct,
  } = req.body;

  const farmerId = Number(farmer_id || 1);
  const farmer = db.getFarmerById(farmerId) || db.getFarmers()[0];
  const cropName = crop || (farmer ? farmer.crop_types[0] : "Paddy");
  const stateName = state || (farmer ? farmer.state : "Tamil Nadu");

  const expectedProd = Number(production_quintals || 85);
  const cultCost = Number(cultivation_cost || (farmer ? farmer.cultivation_cost : 65000));
  const reqCredit = Number(requested_credit || (farmer ? farmer.requested_loan_amount : 200000));

  // Compute economics
  const economics = CropEconomicsEngine.calculate({
    crop: cropName,
    state: stateName,
    expected_production_quintals: expectedProd,
    expected_harvest_period: farmer?.expected_harvest_date || "Nov-Dec 2026",
    cultivation_cost: cultCost,
    custom_historical_price: custom_price_quintal ? Number(custom_price_quintal) : undefined,
  });

  // If user provided a specific custom spot price, adjust conservative base
  if (custom_price_quintal) {
    const cp = Number(custom_price_quintal);
    economics.conservative_expected_price_quintal = cp;
    economics.gross_revenue_expected = Math.round(expectedProd * cp);
    economics.net_income_expected = economics.gross_revenue_expected - cultCost;
  }

  // Run stress tests
  const scenarios = StressTestEngine.runScenarios(economics, reqCredit, {
    price_drop_pct: Number(price_stress_pct || 25),
    yield_drop_pct: Number(yield_stress_pct || 20),
    living_expense_reserve_pct: 25,
  });

  // Repayment capacity
  const repayment = RepaymentEngine.evaluate({
    farmer_id: farmerId,
    requested_loan: reqCredit,
    economics,
    scenarios,
    sowing_date: farmer?.sowing_date,
    expected_harvest_date: farmer?.expected_harvest_date,
  });

  // Safe credit range & explainability
  const recommendation = SafeCreditEngine.calculate({
    farmer,
    economics,
    scenarios,
    repayment,
  });

  return res.json({
    success: true,
    data: {
      farmer: {
        id: farmer.id,
        name: farmer.name,
        reference_id: farmer.reference_id,
        verification_status: farmer.verification_status,
      },
      economics,
      scenarios,
      repayment,
      recommendation,
    },
  });
});

// POST /api/v1/credit/stress-test - Run stress tests directly
creditRouter.post("/stress-test", (req: Request, res: Response) => {
  const { farmer_id, price_drop_pct, yield_drop_pct } = req.body;
  const farmer = db.getFarmerById(Number(farmer_id || 1));
  if (!farmer) return res.status(404).json({ detail: "Farmer not found" });

  const plan = db.getCropPlans(farmer.id)[0];
  const crop = plan ? plan.crop : farmer.crop_types[0];
  const prod = plan ? plan.expected_production_quintals : 85;
  const cost = plan ? plan.cultivation_expenses : farmer.cultivation_cost || 65000;
  const loan = plan ? plan.requested_credit : farmer.requested_loan_amount || 200000;

  const economics = CropEconomicsEngine.calculate({
    crop,
    state: farmer.state,
    expected_production_quintals: prod,
    expected_harvest_period: farmer.expected_harvest_date || "Harvest 2026",
    cultivation_cost: cost,
  });

  const scenarios = StressTestEngine.runScenarios(economics, loan, {
    price_drop_pct: Number(price_drop_pct || 25),
    yield_drop_pct: Number(yield_drop_pct || 20),
    living_expense_reserve_pct: 25,
  });

  return res.json({
    success: true,
    data: {
      economics,
      scenarios,
    },
  });
});

// GET /api/v1/credit/report/:farmerId - Full Explainable Credit Report
creditRouter.get("/report/:farmerId", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmerId, 10);
  const farmer = db.getFarmerById(farmerId);
  if (!farmer) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const plan = db.getCropPlans(farmerId)[0];
  const verification = db.getVerificationByFarmerId(farmerId);
  const fpo = farmer.fpo_id ? db.getFPOById(farmer.fpo_id) : undefined;

  const crop = plan ? plan.crop : farmer.crop_types[0];
  const prod = plan ? plan.expected_production_quintals : 85;
  const cost = plan ? plan.cultivation_expenses : farmer.cultivation_cost || 68000;
  const reqCredit = plan ? plan.requested_credit : farmer.requested_loan_amount || 200000;

  const economics = CropEconomicsEngine.calculate({
    crop,
    state: farmer.state,
    expected_production_quintals: prod,
    expected_harvest_period: farmer.expected_harvest_date || "Nov 2026",
    cultivation_cost: cost,
  });

  const scenarios = StressTestEngine.runScenarios(economics, reqCredit);
  const repayment = RepaymentEngine.evaluate({
    farmer_id: farmerId,
    requested_loan: reqCredit,
    economics,
    scenarios,
    sowing_date: farmer.sowing_date,
    expected_harvest_date: farmer.expected_harvest_date,
  });

  const recommendation = SafeCreditEngine.calculate({
    farmer,
    cropPlan: plan,
    economics,
    scenarios,
    repayment,
  });

  const report = {
    report_id: `CR-AGRI-${farmer.reference_id}-${new Date().getFullYear()}`,
    generated_at: new Date().toISOString(),
    system_version: "KissanTrust Engine v2.4 (Community-Owned Credit Network)",
    disclaimer: "This report is generated for decision support and risk stress-testing under the PS2 Community Credit Network. It does not represent an automated banking sanction.",
    farmer: {
      id: farmer.id,
      name: farmer.name,
      reference_id: farmer.reference_id,
      phone: farmer.phone,
      location: farmer.location,
      land_size_acres: farmer.land_size_acres,
      irrigation_type: farmer.irrigation_type,
      crops: farmer.crop_types,
      fpo_name: fpo ? fpo.name : "Community Agro Collective",
      verification_status: farmer.verification_status,
      evidence_confidence_score: farmer.evidence_confidence_score,
    },
    crop_plan: plan || {
      crop,
      land_area_acres: farmer.land_size_acres,
      expected_production_quintals: prod,
      cultivation_expenses: cost,
      requested_credit: reqCredit,
      purpose_category: farmer.purpose_category || LoanPurposeCategory.FERTILIZER,
      purpose_description: farmer.loan_purpose || "Seasonal cultivation input requirements",
    },
    verification_audit: verification || null,
    forward_crop_economics: economics,
    scenarios_stress_tested: scenarios,
    repayment_assessment: repayment,
    safe_credit_recommendation: recommendation,
  };

  return res.json({
    success: true,
    data: report,
  });
});

// POST /api/v1/credit/sanction - Issue a formal credit sanction or decision
creditRouter.post("/sanction", (req: Request, res: Response) => {
  const {
    farmer_id,
    sanctioned_amount,
    interest_rate_percent,
    repayment_structure,
    due_date,
    lender_name,
    officer_name,
    decision,
    conditions,
    remarks,
  } = req.body;

  if (!farmer_id || !sanctioned_amount || !decision) {
    return res.status(422).json({
      detail: "farmer_id, sanctioned_amount, and decision are required",
    });
  }

  const farmer = db.getFarmerById(Number(farmer_id));
  if (!farmer) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const sanctionRef = `SANCT-${farmer.state.substring(0, 2).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  const sanction = db.createSanction({
    farmer_id: Number(farmer_id),
    sanction_reference: sanctionRef,
    requested_amount: Number(farmer.requested_loan_amount || sanctioned_amount),
    sanctioned_amount: Number(sanctioned_amount),
    interest_rate_percent: Number(interest_rate_percent || 7.0),
    repayment_structure: repayment_structure || "Bullet_At_Harvest",
    due_date: due_date || farmer.expected_harvest_date || "2026-12-15",
    lender_name: lender_name || "NABARD / Canara Bank Agri Desk",
    officer_name: officer_name || "R. Natarajan (Chief Underwriter)",
    decision: decision || "Sanctioned",
    conditions: Array.isArray(conditions) ? conditions : ["Crop insurance mandatory under PMFBY", "Direct input dealer disbursement for seeds & fertilizer"],
    remarks: remarks || "Loan facility sanctioned within safe credit envelope pegged to Samba harvest arrivals.",
  });

  return res.status(201).json({
    success: true,
    data: sanction,
  });
});

// GET /api/v1/credit/sanctions - Retrieve sanction records
creditRouter.get("/sanctions", (req: Request, res: Response) => {
  const farmerId = req.query.farmer_id ? parseInt(req.query.farmer_id as string, 10) : undefined;
  const sanctions = db.getSanctions(farmerId);
  return res.json({
    success: true,
    data: sanctions,
  });
});

// GET /api/v1/credit/network-stats - Real-time network statistics
creditRouter.get("/network-stats", (_req: Request, res: Response) => {
  const farmers = db.getFarmers();
  const fpos = db.getFPOs();
  const sanctions = db.getSanctions();
  const verifications = db.getVerifications();

  const totalAcres = farmers.reduce((sum, f) => sum + (f.land_size_acres || 0), 0);
  const verifiedAcres = verifications
    .filter((v) => v.status === "Verified")
    .reduce((sum, v) => sum + (v.verified_area_acres || v.claimed_area_acres || 0), 0);

  const totalSanctionedAmount = sanctions
    .filter((s) => s.decision === "Sanctioned" || s.decision === "Conditional_Approval")
    .reduce((sum, s) => sum + s.sanctioned_amount, 0);

  const avgConfidence = farmers.length > 0
    ? Math.round(farmers.reduce((sum, f) => sum + (f.evidence_confidence_score || 70), 0) / farmers.length)
    : 75;

  return res.json({
    success: true,
    data: {
      total_farmers: farmers.length,
      total_fpos: fpos.length,
      total_acreage: Number(totalAcres.toFixed(1)),
      verified_acreage: Number(verifiedAcres.toFixed(1)),
      total_sanctioned_amount: totalSanctionedAmount,
      average_confidence_score: avgConfidence,
      active_realtime_nodes: 1,
      network_health: "Optimal (Zero Default Stressed)",
      apmc_feed_status: "Live Streaming (AGMARKNET)",
    },
  });
});
