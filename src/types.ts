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
}

export interface Farmer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  land_size_acres?: number | null;
  crop_types?: string | null;
  fpo_id?: number | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface FarmerCreateInput {
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  land_size_acres?: number | null;
  crop_types?: string | null;
  fpo_id?: number | null;
}

export interface FarmerUpdateInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string | null;
  land_size_acres?: number | null;
  crop_types?: string | null;
  fpo_id?: number | null;
  verified?: boolean;
}

export interface FPO {
  id: number;
  name: string;
  registration_number: string;
  address?: string | null;
  contact_person?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface FPOCreateInput {
  name: string;
  registration_number: string;
  address?: string | null;
  contact_person?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
}

export interface FPOUpdateInput {
  name?: string;
  address?: string | null;
  contact_person?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  member_count?: number;
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

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
