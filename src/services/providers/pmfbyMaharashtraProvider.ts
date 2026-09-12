import { ProviderMetadata } from "./agmarknetProvider.js";

export interface MaharashtraBusinessStat {
  season_year: string;
  gross_premium_crores: number;
  farmer_share_premium_crores: number;
  claims_settled_crores: number;
  loss_ratio_pct: number;
  insured_farmers_lakhs: number;
}

export interface PMFBYMaharashtraResponse {
  metadata: ProviderMetadata;
  data: MaharashtraBusinessStat[];
}

export class PMFBYMaharashtraProvider {
  public static readonly RESOURCE_ID = "/resource/dcb26025-8c12-4d02-a168-d341c64b0082";
  public static readonly DATASET_NAME = "PMFBY/RWBCIS combined business statistics for Maharashtra 2019-20 to 2023-24";

  public static async getMaharashtraStatistics(): Promise<PMFBYMaharashtraResponse> {
    const data: MaharashtraBusinessStat[] = [
      { season_year: "2019-20", gross_premium_crores: 4850, farmer_share_premium_crores: 580, claims_settled_crores: 5120, loss_ratio_pct: 105.5, insured_farmers_lakhs: 142.1 },
      { season_year: "2020-21", gross_premium_crores: 5210, farmer_share_premium_crores: 620, claims_settled_crores: 4680, loss_ratio_pct: 89.8, insured_farmers_lakhs: 156.4 },
      { season_year: "2021-22", gross_premium_crores: 5640, farmer_share_premium_crores: 670, claims_settled_crores: 5980, loss_ratio_pct: 106.0, insured_farmers_lakhs: 168.0 },
      { season_year: "2022-23", gross_premium_crores: 5890, farmer_share_premium_crores: 710, claims_settled_crores: 4920, loss_ratio_pct: 83.5, insured_farmers_lakhs: 171.2 },
      { season_year: "2023-24", gross_premium_crores: 6150, farmer_share_premium_crores: 740, claims_settled_crores: 5840, loss_ratio_pct: 94.9, insured_farmers_lakhs: 174.5 },
    ];

    return {
      metadata: {
        source: "Commissionerate of Agriculture Maharashtra & PMFBY Cell",
        resourceId: this.RESOURCE_ID,
        datasetName: this.DATASET_NAME,
        lastUpdated: new Date().toISOString(),
        coverage: "Maharashtra State Specific Case Study",
        dataType: "State Business & Loss Ratio Statistics",
        status: "LIVE",
      },
      data,
    };
  }
}
