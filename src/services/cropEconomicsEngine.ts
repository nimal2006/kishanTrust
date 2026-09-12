import { FutureCropEconomics } from "../types.js";
import { AgriDataService } from "./agriDataService.js";

export interface CropEconomicsInput {
  crop: string;
  state: string;
  expected_production_quintals: number;
  expected_harvest_period: string; // e.g. "December 2026"
  cultivation_cost: number;
  custom_historical_price?: number;
}

export class CropEconomicsEngine {
  /**
   * Calculates conservative forward crop economics rather than blindly using spot market rates.
   */
  public static calculate(input: CropEconomicsInput): FutureCropEconomics {
    const market = AgriDataService.getMarketData(input.crop, input.state);

    const currentMandiPrice = market.modal_price_quintal;
    const historicalPrice = input.custom_historical_price || (currentMandiPrice * 0.95);

    // Seasonal adjustment factor based on harvest arrivals
    // (During peak harvest arrivals, mandi prices typically face a 5-12% supply glut discount)
    const seasonalArrivalDiscountFactor = 0.92;

    // Conservative expected price weights:
    // 50% historical harvest-time realization + 30% current mandi price (discounted for peak arrival) + 20% minimum support/floor price
    const floorPrice = market.min_price_quintal;
    const conservativeExpectedPrice = Math.round(
      (historicalPrice * 0.50) +
      (currentMandiPrice * seasonalArrivalDiscountFactor * 0.30) +
      (floorPrice * 0.20)
    );

    // Volatility bounds
    const volPercent = market.volatility_percent || 15;
    const lowMultiplier = Math.max(0.65, 1 - (volPercent / 100) * 1.1);
    const highMultiplier = Math.min(1.30, 1 + (volPercent / 100) * 0.8);

    const lowPrice = Math.round(conservativeExpectedPrice * lowMultiplier);
    const highPrice = Math.round(conservativeExpectedPrice * highMultiplier);

    const grossRevenueExpected = Math.round(input.expected_production_quintals * conservativeExpectedPrice);
    const grossRevenueLow = Math.round(input.expected_production_quintals * lowPrice);
    const grossRevenueHigh = Math.round(input.expected_production_quintals * highPrice);

    const netIncomeExpected = grossRevenueExpected - input.cultivation_cost;
    const netIncomeLow = grossRevenueLow - input.cultivation_cost;
    const netIncomeHigh = grossRevenueHigh - input.cultivation_cost;

    const assumptions: string[] = [
      `Price basis uses conservative composite weighting (50% historical harvest realization, 30% peak-arrival adjusted mandi price, 20% floor/min price).`,
      `Peak arrival discount of 8% applied to current spot mandi rate (₹${currentMandiPrice}/qtl) to protect against post-harvest market supply glut.`,
      `Historical baseline reference for ${input.crop}: ₹${Math.round(historicalPrice)}/quintal.`,
      `Low estimate models market downside (-${Math.round((1 - lowMultiplier) * 100)}%) based on commodity volatility index (${volPercent}%).`,
      `Cultivation expenses (₹${input.cultivation_cost.toLocaleString("en-IN")}) subtracted directly from expected gross crop receipts.`,
    ];

    return {
      expected_production_quintals: input.expected_production_quintals,
      expected_harvest_period: input.expected_harvest_period,
      current_market_price_quintal: currentMandiPrice,
      historical_harvest_price_quintal: Math.round(historicalPrice),
      conservative_expected_price_quintal: conservativeExpectedPrice,
      low_price_quintal: lowPrice,
      high_price_quintal: highPrice,
      cultivation_cost: input.cultivation_cost,
      gross_revenue_expected: grossRevenueExpected,
      gross_revenue_low: grossRevenueLow,
      gross_revenue_high: grossRevenueHigh,
      net_income_expected: netIncomeExpected,
      net_income_low: netIncomeLow,
      net_income_high: netIncomeHigh,
      assumptions,
    };
  }
}
