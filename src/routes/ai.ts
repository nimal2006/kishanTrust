import { Router, Request, Response } from "express";
import { AICreditAgent } from "../services/aiCreditAgent.js";
import { FarmerAiAssistant } from "../services/farmerAiAssistant.js";

export const aiRouter = Router();

// POST /api/v1/ai/credit-agent/evaluate - Evaluate farmer with AI Credit Agent
aiRouter.post("/credit-agent/evaluate", async (req: Request, res: Response) => {
  const farmerId = Number(req.body.farmer_id || 1);
  try {
    const result = await AICreditAgent.evaluateFarmer(farmerId);
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to evaluate farmer with AI Credit Agent" });
  }
});

// POST /api/v1/ai/ml-predict - Directly invoke Python Scikit-Learn + FastAPI credit risk model
aiRouter.post("/ml-predict", async (req: Request, res: Response) => {
  const { land_acres, yield_quintals, mandi_price, existing_debt, loan_requested } = req.body;
  const mlEndpoints = ["http://localhost:8000/predict", "http://127.0.0.1:8008/predict"];
  
  for (const endpoint of mlEndpoints) {
    try {
      const mlResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          land_acres: Number(land_acres || 3.5),
          yield_quintals: Number(yield_quintals || 85),
          mandi_price: Number(mandi_price || 2450),
          existing_debt: Number(existing_debt || 0),
          loan_requested: Number(loan_requested || 200000),
        }),
        signal: AbortSignal.timeout(2000),
      });

      if (mlResponse.ok) {
        const data = await mlResponse.json();
        if (typeof (data as any).prediction !== "undefined") {
          return res.json({ success: true, active: true, data });
        }
      }
    } catch (error) {
      // Continue to next endpoint
    }
  }

  return res.status(503).json({ success: false, active: false, error: "FastAPI ML microservice offline" });
});

// POST /api/v1/ai/assistant - Interactive Farmer AI Assistant
aiRouter.post("/assistant", async (req: Request, res: Response) => {
  const { farmer_id, prompt, language } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(422).json({ detail: "Prompt string is required" });
  }

  try {
    const result = await FarmerAiAssistant.answerFarmerQuery({
      farmer_id: farmer_id ? Number(farmer_id) : 1,
      prompt,
      language: language === "ta" ? "ta" : "en",
    });
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to query Farmer AI Assistant" });
  }
});
