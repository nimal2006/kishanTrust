import { ScenarioResult, RiskLevel } from "../types.js";
import { FutureCropEconomics } from "../types.js";

export interface StressTestConfig {
  price_drop_pct: number; // default 25%
  yield_drop_pct: number; // default 20%
  living_expense_reserve_pct: number; // default 25% of net income reserved for family subsistence
}

export class StressTestEngine {
  public static runScenarios(
    economics: FutureCropEconomics,
    requestedCredit: number,
    config: StressTestConfig = {
      price_drop_pct: 25,
      yield_drop_pct: 20,
      living_expense_reserve_pct: 25,
    }
  ): ScenarioResult[] {
    const scenarios: ScenarioResult[] = [];

    // 1. Normal Scenario
    const normalPrice = economics.conservative_expected_price_quintal;
    const normalYield = economics.expected_production_quintals;
    const normalRevenue = Math.round(normalYield * normalPrice);
    const normalNet = normalRevenue - economics.cultivation_cost;
    const normalSubsistence = Math.round(Math.max(20000, normalNet * (config.living_expense_reserve_pct / 100)));
    const normalRepayCapacity = Math.max(0, normalNet - normalSubsistence);
    const normalDebtBurden = normalRepayCapacity > 0 ? Math.round((requestedCredit / normalRepayCapacity) * 100) : 999;
    const normalRisk = normalDebtBurden <= 70 ? RiskLevel.LOW : normalDebtBurden <= 100 ? RiskLevel.MODERATE : RiskLevel.HIGH;

    scenarios.push({
      name: "Normal Scenario",
      type: "normal",
      price_drop_pct: 0,
      yield_drop_pct: 0,
      simulated_production_quintals: normalYield,
      simulated_price_quintal: normalPrice,
      simulated_revenue: normalRevenue,
      cultivation_cost: economics.cultivation_cost,
      net_income: normalNet,
      estimated_repayment_capacity: normalRepayCapacity,
      debt_burden_pct: normalDebtBurden,
      risk_level: normalRisk,
      is_serviceable: requestedCredit <= normalRepayCapacity,
      commentary: `Base expectation assuming normal seasonal arrivals and historical average harvest prices.`,
    });

    // 2. Price Stress Scenario
    const priceStressPrice = Math.round(normalPrice * (1 - config.price_drop_pct / 100));
    const priceStressYield = normalYield;
    const priceStressRevenue = Math.round(priceStressYield * priceStressPrice);
    const priceStressNet = priceStressRevenue - economics.cultivation_cost;
    const priceStressSubsistence = Math.round(Math.max(18000, priceStressNet * (config.living_expense_reserve_pct / 100)));
    const priceStressRepay = Math.max(0, priceStressNet - priceStressSubsistence);
    const priceDebtBurden = priceStressRepay > 0 ? Math.round((requestedCredit / priceStressRepay) * 100) : 999;
    const priceRisk = priceDebtBurden <= 80 ? RiskLevel.MODERATE : priceDebtBurden <= 120 ? RiskLevel.HIGH : RiskLevel.EXTREME;

    scenarios.push({
      name: "Price Stress (-25%)",
      type: "price_stress",
      price_drop_pct: config.price_drop_pct,
      yield_drop_pct: 0,
      simulated_production_quintals: priceStressYield,
      simulated_price_quintal: priceStressPrice,
      simulated_revenue: priceStressRevenue,
      cultivation_cost: economics.cultivation_cost,
      net_income: priceStressNet,
      estimated_repayment_capacity: priceStressRepay,
      debt_burden_pct: priceDebtBurden,
      risk_level: priceRisk,
      is_serviceable: requestedCredit <= priceStressRepay,
      commentary: `Simulates an APMC mandi glut or price collapse of ${config.price_drop_pct}% during peak harvest window.`,
    });

    // 3. Yield Stress Scenario
    const yieldStressPrice = normalPrice;
    const yieldStressYield = Math.round(normalYield * (1 - config.yield_drop_pct / 100));
    const yieldStressRevenue = Math.round(yieldStressYield * yieldStressPrice);
    const yieldStressNet = yieldStressRevenue - economics.cultivation_cost;
    const yieldStressSubsistence = Math.round(Math.max(18000, yieldStressNet * (config.living_expense_reserve_pct / 100)));
    const yieldStressRepay = Math.max(0, yieldStressNet - yieldStressSubsistence);
    const yieldDebtBurden = yieldStressRepay > 0 ? Math.round((requestedCredit / yieldStressRepay) * 100) : 999;
    const yieldRisk = yieldDebtBurden <= 80 ? RiskLevel.MODERATE : yieldDebtBurden <= 120 ? RiskLevel.HIGH : RiskLevel.EXTREME;

    scenarios.push({
      name: "Yield Stress (-20%)",
      type: "yield_stress",
      price_drop_pct: 0,
      yield_drop_pct: config.yield_drop_pct,
      simulated_production_quintals: yieldStressYield,
      simulated_price_quintal: yieldStressPrice,
      simulated_revenue: yieldStressRevenue,
      cultivation_cost: economics.cultivation_cost,
      net_income: yieldStressNet,
      estimated_repayment_capacity: yieldStressRepay,
      debt_burden_pct: yieldDebtBurden,
      risk_level: yieldRisk,
      is_serviceable: requestedCredit <= yieldStressRepay,
      commentary: `Simulates pest infestation, unseasonal rainfall, or irrigation deficit causing a ${config.yield_drop_pct}% yield drop.`,
    });

    // 4. Combined Stress Scenario (CRITICAL STRESS TEST)
    const combinedPrice = priceStressPrice;
    const combinedYield = yieldStressYield;
    const combinedRevenue = Math.round(combinedYield * combinedPrice);
    const combinedNet = combinedRevenue - economics.cultivation_cost;
    const combinedSubsistence = Math.round(Math.max(15000, combinedNet * (config.living_expense_reserve_pct / 100)));
    const combinedRepay = Math.max(0, combinedNet - combinedSubsistence);
    const combinedDebtBurden = combinedRepay > 0 ? Math.round((requestedCredit / combinedRepay) * 100) : 999;
    const combinedRisk = combinedDebtBurden <= 85 ? RiskLevel.HIGH : RiskLevel.EXTREME;

    scenarios.push({
      name: "Combined Stress (-25% Price & -20% Yield)",
      type: "combined_stress",
      price_drop_pct: config.price_drop_pct,
      yield_drop_pct: config.yield_drop_pct,
      simulated_production_quintals: combinedYield,
      simulated_price_quintal: combinedPrice,
      simulated_revenue: combinedRevenue,
      cultivation_cost: economics.cultivation_cost,
      net_income: combinedNet,
      estimated_repayment_capacity: combinedRepay,
      debt_burden_pct: combinedDebtBurden,
      risk_level: combinedRisk,
      is_serviceable: requestedCredit <= combinedRepay,
      commentary: `Worst-case co-occurring downside of simultaneous harvest price crash and pest/weather yield loss.`,
    });

    return scenarios;
  }
}
