import { GoogleGenAI } from "@google/genai";
import { db } from "../data.js";
import { KisanCallCentreProvider } from "./providers/kisanCallCentreProvider.js";
import { AICreditAgent } from "./aiCreditAgent.js";

export interface AssistantRequest {
  farmer_id?: number;
  prompt: string;
  language?: "en" | "ta";
}

export interface AssistantResponse {
  answer: string;
  language: string;
  sources_cited: Array<{ source: string; resourceId?: string }>;
  context_used: {
    farmer_name?: string;
    crop?: string;
    requested_credit?: number;
    recommended_credit_range?: string;
  };
}

export class FarmerAiAssistant {
  public static async answerFarmerQuery(req: AssistantRequest): Promise<AssistantResponse> {
    const farmerId = req.farmer_id || 1;
    const farmer = db.getFarmerById(farmerId) || db.getFarmers()[0];
    const cropPlan = db.getCropPlans(farmer.id)[0];
    const lang = req.language || "en";
    const prompt = req.prompt.trim();

    const crop = cropPlan ? cropPlan.crop : farmer.crop_types[0] || "Paddy";
    const reqCredit = cropPlan ? cropPlan.requested_credit : farmer.requested_loan_amount || 200000;

    // Run evaluation to get safe range context
    const evalResult = await AICreditAgent.evaluateFarmer(farmer.id);
    const safeRange = `₹${evalResult.recommended_safe_range.min.toLocaleString("en-IN")} – ₹${evalResult.recommended_safe_range.max.toLocaleString("en-IN")}`;

    // Get Kisan Call Centre advisory context
    const kccData = await KisanCallCentreProvider.queryKnowledgeBase(crop, undefined, farmer.state);
    const kccSample = kccData.data.slice(0, 2).map((k) => `[${k.category}] ${k.query_text} -> ${k.resolution_summary}`).join("\n");

    let answerText = "";
    const sourcesCited: Array<{ source: string; resourceId?: string }> = [
      { source: "AGMARKNET Wholesale Mandi Data", resourceId: "/resource/35985678-0d79-46b4-9ed6-6f13308a1d24" },
      { source: "Kisan Call Centre (KCC) Advisory Database", resourceId: "/resource/cef25fe2-9231-4128-8aec-2c948fedd43f" },
      { source: "KissanTrust Dynamic Crop Stress Test Engine" },
    ];

    // Check key question patterns
    const pLower = prompt.toLowerCase();
    if (pLower.includes("why only") || pLower.includes("why credit") || pLower.includes("why loan")) {
      answerText = lang === "ta"
        ? `உங்கள் கோரப்பட்ட ₹${(reqCredit / 100000).toFixed(1)} லட்சம் கடன் தக்காளி/பயிர் சந்தை விலை சரிவு மற்றும் விளைச்சல் அழுத்தத்தால் ஆபத்தாகலாம். தற்போதைய பயிர் திட்டத்தின் அடிப்படையில் ₹${(evalResult.recommended_safe_range.min / 100000).toFixed(1)}L–₹${(evalResult.recommended_safe_range.max / 100000).toFixed(1)}L பாதுகாப்பான வரம்பாகும்.`
        : `Your requested ₹${reqCredit.toLocaleString("en-IN")} becomes risky if ${crop} prices drop or yields suffer. Based on your current crop plan and harvest cashflow, ${safeRange} is the recommended safe envelope.`;
    } else if (pLower.includes("improve") || pLower.includes("increase") || pLower.includes("evidence")) {
      answerText = lang === "ta"
        ? `உங்கள் பயிர் FPO சரிபார்க்கப்பட்டது. மேலும் பட்டா சான்றிதழ் அல்லது அறுவடை சான்றுகளை சேர்ப்பது மதிப்பீட்டு நம்பிக்கையை உயர்த்தும்.`
        : `Your crop is FPO verified, but attaching formal land title (Patta) or past harvest sales receipts will improve assessment confidence and boost your safe credit ceiling.`;
    } else if (pLower.includes("pest") || pLower.includes("disease") || pLower.includes("weather")) {
      answerText = `[KCC Advisory Signal] For ${crop} in ${farmer.district}: ${kccData.data[0]?.resolution_summary || "Apply recommended IPM practices and maintain soil drainage."}`;
    }

    // Try Gemini API call if key present
    if (!answerText && process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });

        const systemPrompt = `You are a friendly, practical AI Farmer Assistant for KissanTrust.
Context:
- Farmer Name: ${farmer.name}
- Crop: ${crop} (${farmer.land_size_acres} acres, ${farmer.location})
- Requested Loan: ₹${reqCredit}
- Recommended Safe Credit Range: ${safeRange}
- Verification Status: ${farmer.verification_status}
- KCC Advisory Knowledge:
${kccSample}

Safety Guidelines:
1. Short, concise, direct response (2-3 sentences).
2. Never guarantee loan approval or future crop prices. Use words like "estimated", "recommended", "risk scenario", "assessment".
3. Language: ${lang === "ta" ? "Tamil" : "English"}.
4. Mention official data sources where appropriate (AGMARKNET, KCC).`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        if (response.text) {
          answerText = response.text.trim();
        }
      } catch (e) {
        console.warn("Farmer AI Assistant Gemini call fallback", e);
      }
    }

    if (!answerText) {
      answerText = lang === "ta"
        ? `வணக்கம் ${farmer.name}, உங்கள் ${crop} பயிர்க்கான பரிந்துரைக்கப்பட்ட கடன் வரம்பு ${safeRange} ஆகும். சந்தை விலை மற்றும் விளைச்சல் அடிப்படையிலான கணக்கீடுகள் பயன்படுத்தப்பட்டுள்ளன.`
        : `Hello ${farmer.name}, your recommended safe credit range for ${crop} is ${safeRange}. Our stress test evaluates your repayment against harvest-period market prices and yield scenarios.`;
    }

    return {
      answer: answerText,
      language: lang,
      sources_cited: sourcesCited,
      context_used: {
        farmer_name: farmer.name,
        crop,
        requested_credit: reqCredit,
        recommended_credit_range: safeRange,
      },
    };
  }
}
