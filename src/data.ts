import { Farmer, FPO, CreditAssessment, CreditStatus } from "./types.js";

// In-memory data store for AI Studio Node.js runtime
export class DataStore {
  private farmers: Map<number, Farmer> = new Map();
  private fpos: Map<number, FPO> = new Map();
  private assessments: Map<number, CreditAssessment> = new Map();

  private nextFarmerId = 1;
  private nextFpoId = 1;
  private nextAssessmentId = 1;

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed initial FPO
    const fpo1: FPO = {
      id: this.nextFpoId++,
      name: "Sahyadri Farmers Producer Company",
      registration_number: "FPO-MH-2023-00412",
      address: "Nashik Agricultural Zone, Maharashtra, India",
      contact_person: "Vilas Shinde",
      contact_email: "contact@sahyadrifarmers.org",
      contact_phone: "+91-9822012345",
      member_count: 2,
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.fpos.set(fpo1.id, fpo1);

    const fpo2: FPO = {
      id: this.nextFpoId++,
      name: "Cauvery Delta Agro Collective",
      registration_number: "FPO-TN-2022-00981",
      address: "Thanjavur Basin, Tamil Nadu, India",
      contact_person: "M. Ramesh Kumar",
      contact_email: "cauvery.agro@deltafpo.in",
      contact_phone: "+91-9443123456",
      member_count: 1,
      created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.fpos.set(fpo2.id, fpo2);

    // Seed initial Farmers
    const farmer1: Farmer = {
      id: this.nextFarmerId++,
      name: "Rajendra Patil",
      email: "rajendra.patil@example.com",
      phone: "+91-9876543210",
      address: "Village Pimpalgaon, Taluka Niphad, Nashik",
      land_size_acres: 4.5,
      crop_types: JSON.stringify(["Grapes", "Onion", "Soybean"]),
      fpo_id: fpo1.id,
      verified: true,
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.farmers.set(farmer1.id, farmer1);

    const farmer2: Farmer = {
      id: this.nextFarmerId++,
      name: "Sunita Deshmukh",
      email: "sunita.deshmukh@example.com",
      phone: "+91-9876501234",
      address: "Village Ozar, Nashik District",
      land_size_acres: 3.2,
      crop_types: JSON.stringify(["Tomatoes", "Pomegranate"]),
      fpo_id: fpo1.id,
      verified: true,
      created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.farmers.set(farmer2.id, farmer2);

    const farmer3: Farmer = {
      id: this.nextFarmerId++,
      name: "K. Murugan",
      email: "k.murugan@example.com",
      phone: "+91-9842154321",
      address: "Kumbakonam Road, Thanjavur",
      land_size_acres: 5.0,
      crop_types: JSON.stringify(["Paddy", "Black Gram"]),
      fpo_id: fpo2.id,
      verified: false,
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.farmers.set(farmer3.id, farmer3);

    // Seed initial Credit Assessments
    const assessment1: CreditAssessment = {
      id: this.nextAssessmentId++,
      farmer_id: farmer1.id,
      loan_amount: 150000,
      purpose: "Drip irrigation installation and cold storage crates for upcoming grape harvest",
      credit_score: 82.5,
      status: CreditStatus.APPROVED,
      assessment_data: JSON.stringify({
        soil_fertility_index: 0.88,
        historical_yield_consistency: "High",
        satellite_ndvi_health: 0.79,
        fpo_trade_volume_inr: 420000,
      }),
      ai_explanation: "High creditworthiness driven by 4.5 acres high-value grape cultivation, 3-year consistent FPO procurement history, and optimal NDVI vegetation index over last 4 seasons.",
      verified_by_fpo: true,
      fpo_comments: "Verified member in good standing with 100% timely delivery record to collective.",
      bank_comments: "Approved under priority sector agricultural infrastructure credit line.",
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.assessments.set(assessment1.id, assessment1);

    const assessment2: CreditAssessment = {
      id: this.nextAssessmentId++,
      farmer_id: farmer2.id,
      loan_amount: 80000,
      purpose: "Certified organic seeds and bio-fertilizers for kharif season",
      credit_score: 74.0,
      status: CreditStatus.UNDER_REVIEW,
      assessment_data: JSON.stringify({
        soil_fertility_index: 0.76,
        historical_yield_consistency: "Medium-High",
        satellite_ndvi_health: 0.72,
      }),
      ai_explanation: "Stable yield track record and active FPO participation support credit request. Pending secondary bank officer verification.",
      verified_by_fpo: true,
      fpo_comments: "Recommended by FPO field supervisor for seasonal input financing.",
      bank_comments: null,
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.assessments.set(assessment2.id, assessment2);
  }

  // --- Farmers CRUD ---
  getFarmers(skip = 0, limit = 100): Farmer[] {
    const all = Array.from(this.farmers.values());
    return all.slice(skip, skip + limit);
  }

  getFarmerById(id: number): Farmer | undefined {
    return this.farmers.get(id);
  }

  getFarmerByEmail(email: string): Farmer | undefined {
    for (const f of this.farmers.values()) {
      if (f.email.toLowerCase() === email.toLowerCase()) {
        return f;
      }
    }
    return undefined;
  }

  createFarmer(input: Omit<Farmer, "id" | "verified" | "created_at" | "updated_at"> & { verified?: boolean }): Farmer {
    const now = new Date().toISOString();
    const id = this.nextFarmerId++;
    const farmer: Farmer = {
      ...input,
      id,
      verified: input.verified ?? false,
      created_at: now,
      updated_at: now,
    };
    this.farmers.set(id, farmer);

    // Update FPO member count if fpo_id is provided
    if (farmer.fpo_id && this.fpos.has(farmer.fpo_id)) {
      const fpo = this.fpos.get(farmer.fpo_id)!;
      fpo.member_count = Array.from(this.farmers.values()).filter((f) => f.fpo_id === fpo.id).length;
    }

    return farmer;
  }

  updateFarmer(id: number, updates: Partial<Farmer>): Farmer | undefined {
    const existing = this.farmers.get(id);
    if (!existing) return undefined;

    const oldFpoId = existing.fpo_id;
    const updated: Farmer = {
      ...existing,
      ...updates,
      id, // Preserve id
      updated_at: new Date().toISOString(),
    };
    this.farmers.set(id, updated);

    // Update member count if FPO changed
    if (updates.fpo_id !== undefined && updates.fpo_id !== oldFpoId) {
      if (oldFpoId && this.fpos.has(oldFpoId)) {
        const fpo = this.fpos.get(oldFpoId)!;
        fpo.member_count = Array.from(this.farmers.values()).filter((f) => f.fpo_id === oldFpoId).length;
      }
      if (updates.fpo_id && this.fpos.has(updates.fpo_id)) {
        const fpo = this.fpos.get(updates.fpo_id)!;
        fpo.member_count = Array.from(this.farmers.values()).filter((f) => f.fpo_id === updates.fpo_id).length;
      }
    }

    return updated;
  }

  deleteFarmer(id: number): boolean {
    const existing = this.farmers.get(id);
    if (!existing) return false;

    const fpoId = existing.fpo_id;
    const deleted = this.farmers.delete(id);

    if (fpoId && this.fpos.has(fpoId)) {
      const fpo = this.fpos.get(fpoId)!;
      fpo.member_count = Array.from(this.farmers.values()).filter((f) => f.fpo_id === fpoId).length;
    }

    return deleted;
  }

  // --- FPO CRUD ---
  getFPOs(skip = 0, limit = 100): FPO[] {
    const all = Array.from(this.fpos.values());
    return all.slice(skip, skip + limit);
  }

  getFPOById(id: number): FPO | undefined {
    return this.fpos.get(id);
  }

  getFPOByRegistrationNumber(regNum: string): FPO | undefined {
    for (const f of this.fpos.values()) {
      if (f.registration_number.toLowerCase() === regNum.toLowerCase()) {
        return f;
      }
    }
    return undefined;
  }

  createFPO(input: Omit<FPO, "id" | "member_count" | "created_at" | "updated_at">): FPO {
    const now = new Date().toISOString();
    const id = this.nextFpoId++;
    const fpo: FPO = {
      ...input,
      id,
      member_count: 0,
      created_at: now,
      updated_at: now,
    };
    this.fpos.set(id, fpo);
    return fpo;
  }

  updateFPO(id: number, updates: Partial<FPO>): FPO | undefined {
    const existing = this.fpos.get(id);
    if (!existing) return undefined;

    const updated: FPO = {
      ...existing,
      ...updates,
      id,
      updated_at: new Date().toISOString(),
    };
    this.fpos.set(id, updated);
    return updated;
  }

  deleteFPO(id: number): boolean {
    return this.fpos.delete(id);
  }

  getFPOMembers(fpoId: number): Farmer[] {
    return Array.from(this.farmers.values()).filter((f) => f.fpo_id === fpoId);
  }

  // --- Credit Assessments CRUD ---
  getAssessments(skip = 0, limit = 100, farmerId?: number, statusFilter?: CreditStatus): CreditAssessment[] {
    let list = Array.from(this.assessments.values());
    if (farmerId !== undefined && !isNaN(farmerId)) {
      list = list.filter((a) => a.farmer_id === farmerId);
    }
    if (statusFilter) {
      list = list.filter((a) => a.status === statusFilter);
    }
    return list.slice(skip, skip + limit);
  }

  getAssessmentById(id: number): CreditAssessment | undefined {
    return this.assessments.get(id);
  }

  createAssessment(input: { farmer_id: number; loan_amount: number; purpose: string }): CreditAssessment {
    const now = new Date().toISOString();
    const id = this.nextAssessmentId++;

    // Calculate baseline AI assessment score automatically
    const farmer = this.getFarmerById(input.farmer_id);
    let baseScore = 65;
    if (farmer) {
      if (farmer.verified) baseScore += 10;
      if (farmer.land_size_acres && farmer.land_size_acres >= 3) baseScore += 8;
      if (farmer.fpo_id) baseScore += 7;
    }
    const calculatedScore = Math.min(95, Math.max(50, baseScore));

    const assessment: CreditAssessment = {
      id,
      farmer_id: input.farmer_id,
      loan_amount: input.loan_amount,
      purpose: input.purpose,
      credit_score: calculatedScore,
      status: CreditStatus.PENDING,
      assessment_data: JSON.stringify({
        land_size_acres: farmer?.land_size_acres ?? null,
        fpo_verified: farmer?.verified ?? false,
        loan_amount_inr: input.loan_amount,
      }),
      ai_explanation: `Automated assessment based on agricultural profile: land holding ${farmer?.land_size_acres || 'N/A'} acres, FPO membership status, and loan requirement.`,
      verified_by_fpo: false,
      fpo_comments: null,
      bank_comments: null,
      created_at: now,
      updated_at: now,
    };

    this.assessments.set(id, assessment);
    return assessment;
  }

  updateAssessment(id: number, updates: Partial<CreditAssessment>): CreditAssessment | undefined {
    const existing = this.assessments.get(id);
    if (!existing) return undefined;

    const updated: CreditAssessment = {
      ...existing,
      ...updates,
      id,
      updated_at: new Date().toISOString(),
    };
    this.assessments.set(id, updated);
    return updated;
  }

  deleteAssessment(id: number): boolean {
    return this.assessments.delete(id);
  }
}

export const db = new DataStore();
