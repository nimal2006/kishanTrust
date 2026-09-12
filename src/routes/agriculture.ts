import { Router, Request, Response } from "express";
import { AgriDataService } from "../services/agriDataService.js";

export const agricultureRouter = Router();

// GET /api/v1/agriculture/market - AGMARKNET market prices & arrivals
agricultureRouter.get("/market", (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Paddy";
  const state = (req.query.state as string) || "Tamil Nadu";

  try {
    const market = AgriDataService.getMarketData(crop, state);
    return res.json({
      success: true,
      data: market,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch AGMARKNET commodity prices",
    });
  }
});

// GET /api/v1/agriculture/production - National Horticulture Board (NHB) benchmarks
agricultureRouter.get("/production", (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Paddy";
  const state = (req.query.state as string) || "Tamil Nadu";

  try {
    const benchmark = AgriDataService.getNHBBenchmark(crop, state);
    return res.json({
      success: true,
      data: benchmark,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch NHB production benchmarks",
    });
  }
});

// GET /api/v1/agriculture/risk - IMD / PMFBY agricultural risk context
agricultureRouter.get("/risk", (req: Request, res: Response) => {
  const district = (req.query.district as string) || "Thiruvallur";
  const state = (req.query.state as string) || "Tamil Nadu";

  try {
    const risk = AgriDataService.getAgroRiskContext(district, state);
    return res.json({
      success: true,
      data: risk,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch agricultural risk indicators",
    });
  }
});

// GET /api/v1/agriculture/weather - Environmental and rainfall forecast summary
agricultureRouter.get("/weather", (req: Request, res: Response) => {
  const district = (req.query.district as string) || "Thiruvallur";
  const state = (req.query.state as string) || "Tamil Nadu";

  const risk = AgriDataService.getAgroRiskContext(district, state);

  return res.json({
    success: true,
    data: {
      location: `${district}, ${state}`,
      monsoon_season: "North-East Monsoon (Samba Season)",
      rainfall_deviation_pct: risk.rainfall_deviation_percent,
      status: Math.abs(risk.rainfall_deviation_percent) <= 10 ? "Normal / Favourable" : risk.rainfall_deviation_percent < -10 ? "Deficit" : "Excess",
      temperature_stress: risk.temperature_stress_risk,
      source: "India Meteorological Department (IMD) Agromet Advisory",
      last_updated: risk.last_updated,
    },
  });
});

// GET /api/v1/agriculture/crops - Supported crop references
agricultureRouter.get("/crops", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { crop: "Paddy", category: "Cereal / Field Crop", default_state: "Tamil Nadu", unit: "Quintal" },
      { crop: "Tomato", category: "Horticulture", default_state: "Maharashtra", unit: "Quintal" },
      { crop: "Groundnut", category: "Oilseed", default_state: "Tamil Nadu", unit: "Quintal" },
    ],
  });
});

