import { ProviderMetadata } from "./agmarknetProvider.js";

export interface PMFBYRecentEnrolment {
  state: string;
  enrolled_farmers_lakhs: number;
  insured_area_hectares_lakhs: number;
  sum_insured_crores: number;
  growth_over_prev_year_pct: number;
}

export interface PMFBYRecentApplicationsResponse {
  metadata: ProviderMetadata;
  data: PMFBYRecentEnrolment[];
}

export class PMFBYRecentApplicationsProvider {
  public static readonly RESOURCE_ID = "/resource/8c2371ee-a77d-42c0-856f-190a85029967";
  public static readonly DATASET_NAME = "State/UT-wise farmer applications enrolled under PMFBY/RWBCIS during 2023-24";

  public static async getRecentEnrolments(): Promise<PMFBYRecentApplicationsResponse> {
    const data: PMFBYRecentEnrolment[] = [
      { state: "Tamil Nadu", enrolled_farmers_lakhs: 49.2, insured_area_hectares_lakhs: 32.5, sum_insured_crores: 18400, growth_over_prev_year_pct: 5.8 },
      { state: "Maharashtra", enrolled_farmers_lakhs: 174.5, insured_area_hectares_lakhs: 112.0, sum_insured_crores: 48200, growth_over_prev_year_pct: 1.9 },
      { state: "Karnataka", enrolled_farmers_lakhs: 33.4, insured_area_hectares_lakhs: 22.8, sum_insured_crores: 12500, growth_over_prev_year_pct: 7.7 },
      { state: "Rajasthan", enrolled_farmers_lakhs: 212.0, insured_area_hectares_lakhs: 165.4, sum_insured_crores: 62000, growth_over_prev_year_pct: 1.7 },
      { state: "Madhya Pradesh", enrolled_farmers_lakhs: 112.8, insured_area_hectares_lakhs: 88.0, sum_insured_crores: 39500, growth_over_prev_year_pct: 3.3 },
    ];

    return {
      metadata: {
        source: "PMFBY 2023-24 Enrolment Statistics",
        resourceId: this.RESOURCE_ID,
        datasetName: this.DATASET_NAME,
        lastUpdated: new Date().toISOString(),
        coverage: "National 2023-24 Recent Baseline",
        dataType: "Recent Insurance Enrolment Context",
        status: "LIVE",
      },
      data,
    };
  }
}
