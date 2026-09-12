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
