export enum UserRole {
  FARMER = "farmer",
  FPO_OFFICER = "fpo_officer",
  BANK_OFFICER = "bank_officer",
  ADMIN = "admin",
}

export enum CreditStatus {
  PENDING = "pending",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  NEEDS_EVIDENCE = "needs_evidence",
}

export enum VerificationStatus {
  NOT_VERIFIED = "Not Verified",
  PENDING = "Pending",
  VERIFIED = "Verified",
  NEEDS_EVIDENCE = "Needs Evidence",
  REJECTED = "Rejected",
}

export enum RiskLevel {
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High",
  EXTREME = "Extreme",
}

export enum EvidenceSourceType {
  FARMER_PROVIDED = "Farmer Provided",
  FPO_VERIFIED = "FPO Verified",
  GOVERNMENT_EXTERNAL = "Government / External",
  DERIVED = "Derived",
  MISSING = "Missing",
}

export enum LoanPurposeCategory {
  SEEDS = "seeds",
  FERTILIZER = "fertilizer",
  LABOUR = "labour",
  IRRIGATION = "irrigation",
  EQUIPMENT = "equipment",
  STORAGE = "storage",
  OTHER_INPUTS = "other agricultural inputs",
}

export interface Farmer {
  id: number;
  name: string;
  reference_id: string;
  email: string;
  phone: string;
  location: string;
  state: string;
  district: string;
  village: string;
  address?: string | null;
  land_size_acres: number;
  crop_types: string[]; // e.g. ["Paddy", "Groundnut"] or ["Tomato"]
  irrigation_type: "Canal" | "Borewell" | "Drip" | "Rainfed" | "Sprinkler";
  sowing_date?: string;
  expected_harvest_date?: string;
  previous_crop_history?: string;
  cultivation_cost?: number;
  requested_loan_amount?: number;
  loan_purpose?: string;
  purpose_category?: LoanPurposeCategory;
  supporting_evidence?: string[];
  fpo_id?: number | null;
  verification_status: VerificationStatus;
  evidence_confidence_score: number; // 0 - 100
  profile_14?: ComprehensiveFarmerProfile;
  created_at: string;
  updated_at: string;
}

// 14 Comprehensive Credit Appraisal Categories
export interface PersonalDetails {
  full_name: string;
  age: number;
  gender: string;
  mobile_number: string;
  village: string;
  district: string;
  state: string;
  education: string;
  farming_experience_years: number;
  fpo_name: string;
}

export interface FamilyDetails {
  family_members_count: number;
  dependents_count: number;
  earning_members_count: number;
  family_occupation: string;
  monthly_family_income: number;
}

export interface LandDetails {
  total_land_area: number; // in acres
  ownership_type: "Owned" | "Leased" | "Joint Family";
  irrigation_status: "Irrigated" | "Rain-fed" | "Partially Irrigated";
  soil_type: string;
  water_source: string;
}

export interface CropDetails {
  crop_name: string;
  crop_variety: string;
  season: string; // Kharif, Rabi, Zaid, Annual
  cultivated_area_acres: number;
  sowing_date: string;
  expected_harvest_date: string;
  expected_production_quintals: number;
  estimated_production_cost: number;
  expected_selling_price: number; // in ₹/quintal
  expected_revenue: number; // expected_production_quintals * expected_selling_price
}

export interface PreviousCropDetails {
  previous_crop: string;
  previous_season: string;
  cultivated_area: number;
  production_quintals: number;
  selling_price: number;
  total_revenue: number;
  approx_profit: number;
}

export interface LivestockDetails {
  cows_count: number;
  buffaloes_count: number;
  goats_count: number;
  sheep_count: number;
  other_livestock_count: number;
  monthly_livestock_income: number;
}

export interface PoultryDetails {
  hens_chickens_count: number;
  egg_production_per_day: number;
  egg_selling_price: number;
  monthly_poultry_income: number;
}

export interface OtherIncomeSources {
  agriculture_income: number;
  dairy_income: number;
  poultry_income: number;
  livestock_income: number;
  labour_income: number;
  business_income: number;
  other_income: number;
  total_monthly_income: number; // Sum of all income streams
}

export interface MonthlyExpenses {
  household_expenses: number;
  farming_expenses: number;
  livestock_poultry_expenses: number;
  education_expenses: number;
  medical_expenses: number;
  other_expenses: number;
  existing_loan_emi: number;
  total_monthly_expenses: number; // Sum of all expenses
}

export interface FarmAssets {
  tractor_machinery: string;
  farm_equipment: string;
  number_of_cattle: number;
  number_of_goats_sheep: number;
  number_of_poultry: number;
  other_productive_assets: string;
  approx_asset_value: number; // in ₹
}

export interface ExistingLoanDetails {
  has_existing_loan: boolean;
  loan_provider: string;
  loan_type: string;
  original_loan_amount: number;
  outstanding_amount: number;
  monthly_emi: number;
  loan_purpose: string;
  expected_loan_completion_date: string;
}

export interface PreviousRepaymentDetails {
  previous_loan_taken: boolean;
  number_of_previous_loans: number;
  number_of_ontime_payments: number;
  number_of_late_payments: number;
  has_loan_default: boolean;
}

export interface MarketSalesDetails {
  main_selling_market: string;
  regular_buyer: string;
  buyer_relationship_duration: string;
  average_sales_per_season: number;
  average_selling_price: number;
  approx_annual_agricultural_sales: number;
}

export interface InsuranceGovernmentSchemes {
  crop_insurance: boolean;
  livestock_insurance: boolean;
  pm_kisan_beneficiary: boolean;
  kcc_available: boolean;
  other_government_scheme: string;
}

export interface ComprehensiveFarmerProfile {
  personal: PersonalDetails;
  family: FamilyDetails;
  land: LandDetails;
  crop: CropDetails;
  previous_crop: PreviousCropDetails;
  livestock: LivestockDetails;
  poultry: PoultryDetails;
  other_income: OtherIncomeSources;
  monthly_expenses: MonthlyExpenses;
  assets: FarmAssets;
  existing_loans: ExistingLoanDetails;
  previous_repayment: PreviousRepaymentDetails;
  market_sales: MarketSalesDetails;
  insurance_schemes: InsuranceGovernmentSchemes;
}

export interface CropPlan {
  id: number;
  farmer_id: number;
  crop: string;
  variety?: string;
  land_area_acres: number;
  cultivation_period_months: number;
  expected_production_quintals: number;
  expected_harvest_date: string;
  cultivation_expenses: number;
  requested_credit: number;
  purpose_category: LoanPurposeCategory;
  purpose_description: string;
  benchmark_cost_per_acre: number;
  estimated_crop_requirement: number;
  purpose_mismatch_warning?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FPO {
  id: number;
  name: string;
  registration_number: string;
  address?: string | null;
  state: string;
  district: string;
  contact_person?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface FPOVerification {
  id: number;
  farmer_id: number;
  fpo_id: number;
  claimed_crop: string;
  claimed_area_acres: number;
  verified_area_acres?: number;
  evidence_documents: Array<{
    title: string;
    type: string;
    source: EvidenceSourceType;
    verified: boolean;
    date: string;
  }>;
  status: VerificationStatus;
  verifier_name: string;
  comments?: string | null;
  rejection_reason?: string | null;
  additional_evidence_requested?: string | null;
  verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface MarketData {
  commodity: string;
  market_name: string;
  state: string;
  district: string;
  min_price_quintal: number;
  modal_price_quintal: number;
  max_price_quintal: number;
  price_per_kg: number;
  arrival_quantity_tonnes: number;
  volatility_percent: number;
  historical_trend: Array<{ month: string; avg_price: number }>;
  source_attribution: string;
  last_updated: string;
  is_demo: boolean;
}

export interface NHBBenchmark {
  crop: string;
  state: string;
  benchmark_yield_quintals_per_acre: number;
  benchmark_cost_per_acre: number;
  normal_harvest_months: string[];
  state_cultivated_area_hectares: number;
  state_production_tonnes: number;
  source_attribution: string;
  last_updated: string;
  is_demo: boolean;
}

export interface AgroRiskContext {
  district: string;
  state: string;
  rainfall_deviation_percent: number; // e.g. -12% normal/deficit
  temperature_stress_risk: RiskLevel;
  pest_disease_outbreak_risk: RiskLevel;
  pmfby_coverage_active: boolean;
  drought_vulnerability_index: number; // 0 to 1
  source_attribution: string;
  last_updated: string;
  is_demo: boolean;
}

export interface FutureCropEconomics {
  expected_production_quintals: number;
  expected_harvest_period: string;
  current_market_price_quintal: number;
  historical_harvest_price_quintal: number;
  conservative_expected_price_quintal: number;
  low_price_quintal: number;
  high_price_quintal: number;
  cultivation_cost: number;
  gross_revenue_expected: number;
  gross_revenue_low: number;
  gross_revenue_high: number;
  net_income_expected: number;
  net_income_low: number;
  net_income_high: number;
  assumptions: string[];
}

export interface ScenarioResult {
  name: "Normal Scenario" | "Price Stress (-25%)" | "Yield Stress (-20%)" | "Combined Stress (-25% Price & -20% Yield)";
  type: "normal" | "price_stress" | "yield_stress" | "combined_stress";
  price_drop_pct: number;
  yield_drop_pct: number;
  simulated_production_quintals: number;
  simulated_price_quintal: number;
  simulated_revenue: number;
  cultivation_cost: number;
  net_income: number;
  estimated_repayment_capacity: number;
  debt_burden_pct: number;
  risk_level: RiskLevel;
  is_serviceable: boolean;
  commentary: string;
}

export interface RepaymentCapacityAssessment {
  farmer_id: number;
  requested_loan: number;
  net_income_expected: number;
  net_income_stressed: number;
  household_living_expenses: number;
  cultivation_reserve_fund: number;
  estimated_repayment_capacity: number;
  repayment_confidence_pct: number;
  recommended_repayment_window: string;
  timeline: {
    sowing: string;
    harvest_start: string;
    mandi_sale_completion: string;
    recommended_due_date: string;
  };
  risk_flags: string[];
}

export interface SafeCreditRecommendation {
  farmer_id: number;
  requested_credit: number;
  recommended_minimum: number;
  recommended_maximum: number;
  risk_tier: RiskLevel;
  driving_scenario: string;
  rationale: string;
  top_positive_factors: string[];
  top_risk_factors: string[];
  assumptions: string[];
  evidence_confidence: {
    overall_confidence_pct: number;
    rating: "High Confidence" | "Moderate Confidence" | "Needs Evidence";
    evidence_breakdown: Array<{
      parameter: string;
      source: EvidenceSourceType;
      verified: boolean;
    }>;
  };
}

export interface ConsentRecord {
  id: number;
  farmer_id: number;
  data_category: "Personal & Identity" | "Land & Title Records" | "Crop & Yield Plans" | "Mandi Sales Receipts" | "FPO Verification Report" | "Satellite & Agro Risk";
  shared_with: "FPO Officers" | "Partner Banks / Lenders" | "Crop Insurance Providers" | "All Public";
  status: "Allowed" | "Restricted";
  granted_at: string;
  updated_at: string;
  expires_at?: string | null;
}

export interface ConsentAuditLog {
  id: number;
  farmer_id: number;
  data_category: string;
  party: string;
  action: "GRANTED" | "REVOKED" | "ACCESSED";
  timestamp: string;
  ip_address?: string;
  notes?: string;
}

export interface CreditAssessment {
  id: number;
  farmer_id: number;
  loan_amount: number;
  purpose: string;
  credit_score?: number | null;
  status: CreditStatus;
  assessment_data?: string | null;
  ai_explanation?: string | null;
  verified_by_fpo: boolean;
  fpo_comments?: string | null;
  bank_comments?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreditAssessmentCreateInput {
  farmer_id: number;
  loan_amount: number;
  purpose: string;
}

export interface CreditAssessmentUpdateInput {
  status?: CreditStatus;
  credit_score?: number | null;
  assessment_data?: string | null;
  ai_explanation?: string | null;
  verified_by_fpo?: boolean;
  fpo_comments?: string | null;
  bank_comments?: string | null;
}

export interface LoanSanctionRecord {
  id: number;
  farmer_id: number;
  sanction_reference: string;
  requested_amount: number;
  sanctioned_amount: number;
  interest_rate_percent: number;
  repayment_structure: "Bullet_At_Harvest" | "Harvest_Two_Tranches" | "Monthly_EMI";
  due_date: string;
  lender_name: string;
  officer_name: string;
  decision: "Sanctioned" | "Conditional_Approval" | "Rejected";
  conditions?: string[];
  remarks: string;
  created_at: string;
}

export interface RealtimeEvent<T = any> {
  type: string;
  timestamp: string;
  data: T;
}

