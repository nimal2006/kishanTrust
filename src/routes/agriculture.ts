import { Router, Request, Response } from "express";
import {
  AgmarknetProvider,
  PMKisanProvider,
  KisanCallCentreProvider,
  NHBProvider,
  PMFBYFundsProvider,
  PMFBYApplicationsProvider,
  PMFBYClaimsProvider,
  PMFBYRecentApplicationsProvider,
  PMFBYInsuredClaimsProvider,
  PMFBYMaharashtraProvider,
  PMFBYInsuredFarmersProvider,
  PMFBYPremiumClaimsProvider,
} from "../services/providers/index.js";
import { AgriDataService } from "../services/agriDataService.js";

export const agricultureRouter = Router();

// 1. AGMARKNET (/resource/35985678-0d79-46b4-9ed6-6f13308a1d24)
agricultureRouter.get("/agmarknet", async (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Paddy";
  const state = (req.query.state as string) || "Tamil Nadu";
  const district = req.query.district as string;
  const result = await AgmarknetProvider.getCommodityMarketData(crop, state, district);
  return res.json(result);
});

// 2. PM-KISAN (/resource/388208c6-d82a-4190-90df-91aa2c326fec)
agricultureRouter.get("/pm-kisan", async (req: Request, res: Response) => {
  const state = (req.query.state as string) || "Tamil Nadu";
  const district = (req.query.district as string) || "Thiruvallur";
  const village = req.query.village as string;
  const result = await PMKisanProvider.getCommunityContext(state, district, village);
  return res.json(result);
});

// 3. KISAN CALL CENTRE (/resource/cef25fe2-9231-4128-8aec-2c948fedd43f)
agricultureRouter.get("/kisan-call-centre", async (req: Request, res: Response) => {
  const crop = req.query.crop as string;
  const category = req.query.category as string;
  const state = req.query.state as string;
  const result = await KisanCallCentreProvider.queryKnowledgeBase(crop, category, state);
  return res.json(result);
});

// 4. NATIONAL HORTICULTURE BOARD (NHB)
agricultureRouter.get("/nhb", async (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Tomato";
  const state = (req.query.state as string) || "Tamil Nadu";
  const district = req.query.district as string;
  const result = await NHBProvider.getHorticultureBenchmark(crop, state, district);
  return res.json(result);
});

// 5. PMFBY Funds (/resource/2c0d784b-de75-42e5-9146-689eb0ba407a)
agricultureRouter.get("/pmfby/funds", async (_req: Request, res: Response) => {
  const result = await PMFBYFundsProvider.getFundAllocations();
  return res.json(result);
});

// 6. PMFBY Applications (/resource/e3775b1f-1caf-4f03-90e2-204b6594b734)
agricultureRouter.get("/pmfby/applications", async (_req: Request, res: Response) => {
  const result = await PMFBYApplicationsProvider.getApplicationsByState();
  return res.json(result);
});

// 7. PMFBY Claims (/resource/9a681d93-2d25-4d67-a4e9-0291d85ad80e)
agricultureRouter.get("/pmfby/claims", async (req: Request, res: Response) => {
  const state = req.query.state as string;
  const result = await PMFBYClaimsProvider.getClaimsByState(state);
  return res.json(result);
});

// 8. PMFBY Recent Applications (/resource/8c2371ee-a77d-42c0-856f-190a85029967)
agricultureRouter.get("/pmfby/recent-applications", async (_req: Request, res: Response) => {
  const result = await PMFBYRecentApplicationsProvider.getRecentEnrolments();
  return res.json(result);
});

// 9. PMFBY Insured Claims (/resource/26b17caf-6d85-4bb9-bf77-c89f37bc84e2)
agricultureRouter.get("/pmfby/insured-claims", async (_req: Request, res: Response) => {
  const result = await PMFBYInsuredClaimsProvider.getInsuredClaimSeries();
  return res.json(result);
});

// 10. PMFBY Maharashtra (/resource/dcb26025-8c12-4d02-a168-d341c64b0082)
agricultureRouter.get("/pmfby/maharashtra", async (_req: Request, res: Response) => {
  const result = await PMFBYMaharashtraProvider.getMaharashtraStatistics();
  return res.json(result);
});

// 11. PMFBY Insured Farmers (/resource/cd7acacb-23e8-4b80-8ff3-9c0c586a24c5)
agricultureRouter.get("/pmfby/insured-farmers", async (req: Request, res: Response) => {
  const state = req.query.state as string;
  const result = await PMFBYInsuredFarmersProvider.getInsuredFarmers(state);
  return res.json(result);
});

// 12. PMFBY Premium & Claims (/resource/3848ffc1-3741-4ef9-a17a-6800a4ebd52e)
agricultureRouter.get("/pmfby/premium-claims", async (req: Request, res: Response) => {
  const state = req.query.state as string;
  const result = await PMFBYPremiumClaimsProvider.getPremiumClaimsSeries(state);
  return res.json(result);
});

// --- Legacy / Convenience endpoints ---
agricultureRouter.get("/market", async (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Paddy";
  const state = (req.query.state as string) || "Tamil Nadu";
  const agData = await AgmarknetProvider.getCommodityMarketData(crop, state);
  return res.json({ success: true, data: agData.data, metadata: agData.metadata });
});

agricultureRouter.get("/production", async (req: Request, res: Response) => {
  const crop = (req.query.crop as string) || "Paddy";
  const state = (req.query.state as string) || "Tamil Nadu";
  const nhbData = await NHBProvider.getHorticultureBenchmark(crop, state);
  return res.json({ success: true, data: nhbData.data, metadata: nhbData.metadata });
});

agricultureRouter.get("/risk", (req: Request, res: Response) => {
  const district = (req.query.district as string) || "Thiruvallur";
  const state = (req.query.state as string) || "Tamil Nadu";
  const risk = AgriDataService.getAgroRiskContext(district, state);
  return res.json({ success: true, data: risk });
});

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
