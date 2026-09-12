import { RepaymentCapacityAssessment, ScenarioResult } from "../types.js";
import { FutureCropEconomics } from "../types.js";

export interface RepaymentCalculationInput {
  farmer_id: number;
  requested_loan: number;
  economics: FutureCropEconomics;
  scenarios: ScenarioResult[];
  sowing_date?: string;
  expected_harvest_date?: string;
  existing_obligations?: number;
}

export class RepaymentEngine {
  public static evaluate(input: RepaymentCalculationInput): RepaymentCapacityAssessment {
    const normalScenario = input.scenarios.find((s) => s.type === "normal")!;
    const combinedScenario = input.scenarios.find((s) => s.type === "combined_stress")!;

    const livingExpenses = Math.round(normalScenario.net_income * 0.22);
    const cultivationReserve = Math.round(normalScenario.cultivation_cost * 0.20); // 20% working capital buffer for subsequent season

    // Repayment capacity is derived from conservative downside protection:
    // Blend 40% combined downside + 60% normal capacity
    const blendedRepayCapacity = Math.round(
      (combinedScenario.estimated_repayment_capacity * 0.50) +
      (normalScenario.estimated_repayment_capacity * 0.50)
    );

    const existingDebt = input.existing_obligations || 0;
    const netRepaymentCapacity = Math.max(0, blendedRepayCapacity - existingDebt);

    // Calculate repayment confidence percentage
    let confidencePct = 85;
    if (input.requested_loan > combinedScenario.estimated_repayment_capacity) {
      confidencePct -= 25; // Requested exceeds combined stress capacity
    }
    if (input.requested_loan > normalScenario.estimated_repayment_capacity * 0.8) {
      confidencePct -= 15; // High debt burden even in normal conditions
    }
    if (existingDebt > 0) {
      confidencePct -= 10;
    }
    confidencePct = Math.max(30, Math.min(96, confidencePct));

    // Timeline calculation based on harvest date
    const harvestDate = input.expected_harvest_date ? new Date(input.expected_harvest_date) : new Date(Date.now() + 90 * 86400000);
    const sowingDate = input.sowing_date ? new Date(input.sowing_date) : new Date(Date.now() - 30 * 86400000);

    const saleCompletionDate = new Date(harvestDate.getTime() + 20 * 86400000); // 20 days post-harvest for drying, grading, mandi delivery
    const dueDate = new Date(harvestDate.getTime() + 45 * 86400000); // 45 days post-harvest window when mandi payment realization is complete

    const formatDate = (d: Date) => d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

    const riskFlags: string[] = [];
    if (input.requested_loan > combinedScenario.estimated_repayment_capacity) {
      riskFlags.push(`Requested credit (₹${input.requested_loan.toLocaleString("en-IN")}) exceeds worst-case combined stress repayment capacity (₹${combinedScenario.estimated_repayment_capacity.toLocaleString("en-IN")}).`);
    }
    if (input.economics.net_income_low < input.requested_loan) {
      riskFlags.push(`Commodity price volatility creates risk of insufficient surplus if market drops below ₹${input.economics.low_price_quintal}/quintal.`);
    }
    if (normalScenario.debt_burden_pct > 75) {
      riskFlags.push(`Debt-to-repayment ratio is high (${normalScenario.debt_burden_pct}%), leaving minimal emergency cushion.`);
    }
    if (riskFlags.length === 0) {
      riskFlags.push(`Comfortable repayment buffer across both normal and stressed production scenarios.`);
    }

    return {
      farmer_id: input.farmer_id,
      requested_loan: input.requested_loan,
      net_income_expected: normalScenario.net_income,
      net_income_stressed: combinedScenario.net_income,
      household_living_expenses: livingExpenses,
      cultivation_reserve_fund: cultivationReserve,
      estimated_repayment_capacity: netRepaymentCapacity,
      repayment_confidence_pct: confidencePct,
      recommended_repayment_window: `${formatDate(saleCompletionDate)} – ${formatDate(dueDate)}`,
      timeline: {
        sowing: formatDate(sowingDate),
        harvest_start: formatDate(harvestDate),
        mandi_sale_completion: formatDate(saleCompletionDate),
        recommended_due_date: formatDate(dueDate),
      },
      risk_flags: riskFlags,
    };
  }
}
