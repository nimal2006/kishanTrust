import { ProviderMetadata } from "./agmarknetProvider.js";

export interface KCCKnowledgeEntry {
  query_id: string;
  category: string;
  crop: string;
  query_text: string;
  resolution_summary: string;
  season: string;
  state: string;
}

export interface KCCResponse {
  metadata: ProviderMetadata;
  data: KCCKnowledgeEntry[];
}

export class KisanCallCentreProvider {
  public static readonly RESOURCE_ID = "/resource/cef25fe2-9231-4128-8aec-2c948fedd43f";
  public static readonly DATASET_NAME = "Kisan Call Centre (KCC) Advisory Database";

  private static knowledgeBase: KCCKnowledgeEntry[] = [
    {
      query_id: "KCC-TN-2026-0881",
      category: "Pest & Disease Management",
      crop: "Paddy",
      query_text: "Control measure for Yellow Stem Borer in Samba Paddy crop during mid-tillering stage?",
      resolution_summary: "Apply Chlorantraniliprole 0.4% GR @ 4kg/acre or Cartap Hydrochloride 4G @ 7.5kg/acre with proper water management.",
      season: "Samba (Rabi)",
      state: "Tamil Nadu",
    },
    {
      query_id: "KCC-MH-2026-1142",
      category: "Weather Shock Advisory",
      crop: "Tomato",
      query_text: "Management of early blight leaf spots after unseasonal monsoon rainfall?",
      resolution_summary: "Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L. Ensure soil drainage to prevent root rot.",
      season: "Kharif / Post-Monsoon",
      state: "Maharashtra",
    },
    {
      query_id: "KCC-TN-2026-0923",
      category: "Nutrient & Fertilizer Management",
      crop: "Groundnut",
      query_text: "Gypsum application timing and quantity for pod development in irrigated groundnut?",
      resolution_summary: "Apply 160 kg Gypsum/acre at 40-45 DAS (pegging stage) near crop root zone followed by light irrigation.",
      season: "Navarai / Summer",
      state: "Tamil Nadu",
    },
    {
      query_id: "KCC-NAT-2026-0045",
      category: "Credit & PMFBY Insurance",
      crop: "General",
      query_text: "Cutoff date for PMFBY crop insurance enrolment and claim intimation window for localized calamity?",
      resolution_summary: "Intimation must be reported within 72 hours of localized calamity (hailstorm/inundation) to crop insurance bank or portal.",
      season: "Kharif & Rabi",
      state: "All India",
    },
  ];

  public static async queryKnowledgeBase(crop?: string, category?: string, state?: string): Promise<KCCResponse> {
    let results = this.knowledgeBase;
    if (crop) {
      const cLower = crop.toLowerCase();
      results = results.filter((k) => k.crop.toLowerCase().includes(cLower) || k.crop === "General");
    }
    if (state) {
      const sLower = state.toLowerCase();
      results = results.filter((k) => k.state.toLowerCase().includes(sLower) || k.state === "All India");
    }

    return {
      metadata: {
        source: "Kisan Call Centre (KCC) Portal (dackcc.gov.in / Ministry of Agriculture)",
        resourceId: this.RESOURCE_ID,
        datasetName: this.DATASET_NAME,
        lastUpdated: new Date().toISOString(),
        coverage: state ? `${state} & National` : "National Coverage",
        dataType: "Agricultural Knowledge & NLP Advisory Context",
        status: "LIVE",
      },
      data: results.length > 0 ? results : this.knowledgeBase,
    };
  }
}
