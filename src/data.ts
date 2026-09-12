import {
  Farmer,
  CropPlan,
  FPO,
  FPOVerification,
  ConsentRecord,
  ConsentAuditLog,
  CreditAssessment,
  CreditStatus,
  VerificationStatus,
  LoanPurposeCategory,
  EvidenceSourceType,
  LoanSanctionRecord,
} from "./types.js";
import { realtimeHub } from "./services/realtime.js";
import {
  RAMESH_KUMAR_PROFILE_14,
  RAJENDRA_PATIL_PROFILE_14,
  SUNITA_DESHMUKH_PROFILE_14,
  createDefaultProfile,
  calculateProfileTotals,
} from "./services/farmerProfiles.js";

export class DataStore {
  private farmers: Map<number, Farmer> = new Map();
  private cropPlans: Map<number, CropPlan> = new Map();
  private fpos: Map<number, FPO> = new Map();
  private verifications: Map<number, FPOVerification> = new Map();
  private consents: Map<number, ConsentRecord> = new Map();
  private auditLogs: ConsentAuditLog[] = [];
  private assessments: Map<number, CreditAssessment> = new Map();
  private sanctions: Map<number, LoanSanctionRecord> = new Map();

  private nextFarmerId = 1;
  private nextCropPlanId = 1;
  private nextFpoId = 1;
  private nextVerificationId = 1;
  private nextConsentId = 1;
  private nextAuditLogId = 1;
  private nextAssessmentId = 1;
  private nextSanctionId = 1;

  constructor() {
    this.seed();
  }

  private seed() {
    const now = new Date().toISOString();

    // 1. Seed FPOs
    const fpo1: FPO = {
      id: this.nextFpoId++,
      name: "Thiruvallur Agro Collective Producer Co.",
      registration_number: "FPO-TN-2023-00892",
      address: "APMC Market Complex, Thiruvallur, Tamil Nadu",
      state: "Tamil Nadu",
      district: "Thiruvallur",
      contact_person: "K. Soundararajan",
      contact_email: "contact@thiruvalluragro.in",
      contact_phone: "+91-9442188990",
      member_count: 420,
      created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
      updated_at: now,
    };
    this.fpos.set(fpo1.id, fpo1);

    const fpo2: FPO = {
      id: this.nextFpoId++,
      name: "Sahyadri Farmers Producer Company",
      registration_number: "FPO-MH-2022-00412",
      address: "Nashik Agricultural Zone, Maharashtra",
      state: "Maharashtra",
      district: "Nashik",
      contact_person: "Vilas Shinde",
      contact_email: "vilas.shinde@sahyadrifarmers.org",
      contact_phone: "+91-9822012345",
      member_count: 1250,
      created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
      updated_at: now,
    };
    this.fpos.set(fpo2.id, fpo2);

    // 2. Seed Farmers (Including Case 1: Ramesh Kumar, Case 2: Rajendra Patil, Case 3: Sunita Deshmukh)
    // CASE 1: Ramesh Kumar - Paddy & Groundnut Farmer, Tamil Nadu
    // Requested ₹2,00,000 -> Normal scenario looks manageable, but combined price/yield stress makes ₹2,00,000 unsafe!
    const farmer1: Farmer = {
      id: this.nextFarmerId++,
      name: "Ramesh Kumar",
      reference_id: "KT-TN-THIRU-0104",
      email: "ramesh.kumar@kissankunj.org",
      phone: "+91-9840192831",
      location: "Thiruvallur, Tamil Nadu",
      state: "Tamil Nadu",
      district: "Thiruvallur",
      village: "Nemam Village",
      address: "Plot 14, East Lake Ayacut, Nemam, Poonamallee Taluk, Thiruvallur",
      land_size_acres: 3.5,
      crop_types: ["Paddy", "Groundnut"],
      irrigation_type: "Borewell",
      sowing_date: "2026-07-15",
      expected_harvest_date: "2026-11-20",
      previous_crop_history: "3 consecutive seasons of successful Samba Paddy with average 23.5 quintals/acre yield; sold via FPO procurement centre.",
      cultivation_cost: 68000,
      requested_loan_amount: 200000,
      loan_purpose: "Working capital for certified bio-fertilizers, solar borewell pump repair, and labour during upcoming Samba paddy harvesting & threshing.",
      purpose_category: LoanPurposeCategory.FERTILIZER,
      supporting_evidence: [
        "Patta / Chitta Land Title #1042/3A (3.5 Acres, verified)",
        "FPO Sowing & Geo-tagged Field Inspection Report",
        "Primary Agricultural Credit Society (PACS) No-Dues Clearance",
        "APMC Mandi e-NAM Sale Invoices (2025-26)",
      ],
      fpo_id: fpo1.id,
      verification_status: VerificationStatus.VERIFIED,
      evidence_confidence_score: 88,
      profile_14: JSON.parse(JSON.stringify(RAMESH_KUMAR_PROFILE_14)),
      created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
      updated_at: now,
    };
    this.farmers.set(farmer1.id, farmer1);

    // CASE 2: Rajendra Patil - Tomato & Grapes, Maharashtra (High price volatility, weak evidence)
    const farmer2: Farmer = {
      id: this.nextFarmerId++,
      name: "Rajendra Patil",
      reference_id: "KT-MH-NASH-0832",
      email: "rajendra.patil@example.com",
      phone: "+91-9876543210",
      location: "Nashik, Maharashtra",
      state: "Maharashtra",
      district: "Nashik",
      village: "Pimpalgaon Baswant",
      address: "Survey 84, Post Pimpalgaon, Niphad Taluka, Nashik",
      land_size_acres: 4.5,
      crop_types: ["Tomato", "Soybean"],
      irrigation_type: "Drip",
      sowing_date: "2026-08-01",
      expected_harvest_date: "2026-12-10",
      previous_crop_history: "Commercial tomato cultivation with high price swings; missed one loan installment during 2024 unseasonal hailstorm.",
      cultivation_cost: 140000,
      requested_loan_amount: 250000,
      loan_purpose: "Trellising wire, hybrid tomato seedlings, and cold chain crates.",
      purpose_category: LoanPurposeCategory.EQUIPMENT,
      supporting_evidence: [
        "Self-declared 7/12 Land Record (Unnotarized copy)",
      ],
      fpo_id: fpo2.id,
      verification_status: VerificationStatus.NEEDS_EVIDENCE,
      evidence_confidence_score: 54,
      profile_14: JSON.parse(JSON.stringify(RAJENDRA_PATIL_PROFILE_14)),
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: now,
    };
    this.farmers.set(farmer2.id, farmer2);

    // CASE 3: Sunita Deshmukh - Horticulture Farmer (Verified, high production risk)
    const farmer3: Farmer = {
      id: this.nextFarmerId++,
      name: "Sunita Deshmukh",
      reference_id: "KT-MH-OZAR-0419",
      email: "sunita.deshmukh@example.com",
      phone: "+91-9876501234",
      location: "Nashik, Maharashtra",
      state: "Maharashtra",
      district: "Nashik",
      village: "Ozar",
      address: "Ozar Agro Belt, Nashik District",
      land_size_acres: 3.2,
      crop_types: ["Tomato", "Pomegranate"],
      irrigation_type: "Drip",
      sowing_date: "2026-07-20",
      expected_harvest_date: "2026-11-30",
      previous_crop_history: "Consistent organic certification applicant; steady domestic sales.",
      cultivation_cost: 95000,
      requested_loan_amount: 150000,
      loan_purpose: "Certified organic inputs and bio-control pest sprays.",
      purpose_category: LoanPurposeCategory.SEEDS,
      supporting_evidence: [
        "Verified 7/12 land title",
        "Organic grower certificate (NPOP)",
        "FPO field report",
      ],
      fpo_id: fpo2.id,
      verification_status: VerificationStatus.VERIFIED,
      evidence_confidence_score: 82,
      profile_14: JSON.parse(JSON.stringify(SUNITA_DESHMUKH_PROFILE_14)),
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      updated_at: now,
    };
    this.farmers.set(farmer3.id, farmer3);

    // 3. Seed Crop Plans for Ramesh Kumar
    const plan1: CropPlan = {
      id: this.nextCropPlanId++,
      farmer_id: farmer1.id,
      crop: "Paddy",
      variety: "ADT-53 / Ponni Hybrid",
      land_area_acres: 3.5,
      cultivation_period_months: 4,
      expected_production_quintals: 85, // ~24.2 quintals per acre
      expected_harvest_date: "2026-11-20",
      cultivation_expenses: 68000,
      requested_credit: 200000,
      purpose_category: LoanPurposeCategory.FERTILIZER,
      purpose_description: "Bio-fertilizers, weeding labour, and post-harvest transport",
      benchmark_cost_per_acre: 26000,
      estimated_crop_requirement: 91000, // 3.5 * 26,000
      purpose_mismatch_warning: "Requested credit (₹2,00,000) is 2.2x higher than standard cultivation input requirement (₹91,000) for 3.5 acres of Paddy. Recommended for capital items or phased disbursal.",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: now,
    };
    this.cropPlans.set(plan1.id, plan1);

    // 4. Seed FPO Verifications
    const verif1: FPOVerification = {
      id: this.nextVerificationId++,
      farmer_id: farmer1.id,
      fpo_id: fpo1.id,
      claimed_crop: "Paddy (Samba Season) + Groundnut",
      claimed_area_acres: 3.5,
      verified_area_acres: 3.5,
      evidence_documents: [
        {
          title: "Revenue Department Patta 1042/3A",
          type: "Land Ownership Record",
          source: EvidenceSourceType.GOVERNMENT_EXTERNAL,
          verified: true,
          date: "2026-07-10",
        },
        {
          title: "On-site GPS Geo-tagged Sowing Verification",
          type: "Crop Standing Photographic Proof",
          source: EvidenceSourceType.FPO_VERIFIED,
          verified: true,
          date: "2026-08-05",
        },
        {
          title: "FPO Collective Mandi Deliveries 2024-25",
          type: "Transaction History",
          source: EvidenceSourceType.FPO_VERIFIED,
          verified: true,
          date: "2026-06-15",
        },
      ],
      status: VerificationStatus.VERIFIED,
      verifier_name: "K. Soundararajan (Chief Field Officer)",
      comments: "Full 3.5 acres under healthy vegetative growth. Good water discharge from borewell. Farmer has unbroken history of delivering paddy to collective procurement centre.",
      rejection_reason: null,
      additional_evidence_requested: null,
      verified_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      updated_at: now,
    };
    this.verifications.set(verif1.id, verif1);

    const verif2: FPOVerification = {
      id: this.nextVerificationId++,
      farmer_id: farmer2.id,
      fpo_id: fpo2.id,
      claimed_crop: "Tomato",
      claimed_area_acres: 4.5,
      verified_area_acres: 3.0,
      evidence_documents: [
        {
          title: "7/12 Land Record Copy",
          type: "Land Title",
          source: EvidenceSourceType.FARMER_PROVIDED,
          verified: false,
          date: "2026-08-01",
        },
      ],
      status: VerificationStatus.NEEDS_EVIDENCE,
      verifier_name: "Vilas Shinde (FPO Lead)",
      comments: "Farmer claimed 4.5 acres of tomato cultivation, but satellite overlay and field inspection found 1.5 acres currently fallow. Please upload updated joint-family consent and geotagged field photos.",
      rejection_reason: null,
      additional_evidence_requested: "Joint family NOC for survey #84 and fresh geotagged camera photos of active tomato plot.",
      verified_at: null,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      updated_at: now,
    };
    this.verifications.set(verif2.id, verif2);

    // 5. Seed Consent Records for Ramesh Kumar
    const categories: Array<ConsentRecord["data_category"]> = [
      "Crop & Yield Plans",
      "Land & Title Records",
      "Mandi Sales Receipts",
      "FPO Verification Report",
      "Satellite & Agro Risk",
      "Personal & Identity",
    ];

    categories.forEach((cat, index) => {
      const isPersonal = cat === "Personal & Identity";
      const consent: ConsentRecord = {
        id: this.nextConsentId++,
        farmer_id: farmer1.id,
        data_category: cat,
        shared_with: isPersonal ? "FPO Officers" : "Partner Banks / Lenders",
        status: "Allowed",
        granted_at: new Date(Date.now() - (30 - index * 4) * 86400000).toISOString(),
        updated_at: now,
        expires_at: null,
      };
      this.consents.set(consent.id, consent);

      this.auditLogs.push({
        id: this.nextAuditLogId++,
        farmer_id: farmer1.id,
        data_category: cat,
        party: consent.shared_with,
        action: "GRANTED",
        timestamp: consent.granted_at,
        ip_address: "103.21.144.62 (Mobile App)",
        notes: "Authorized by farmer via KissanTrust OTP confirmation",
      });
    });

    // 6. Seed Initial Legacy Assessment for backwards compatibility
    const assess1: CreditAssessment = {
      id: this.nextAssessmentId++,
      farmer_id: farmer1.id,
      loan_amount: 200000,
      purpose: farmer1.loan_purpose || "Agricultural working capital",
      credit_score: 780, // Legacy indicator
      status: CreditStatus.UNDER_REVIEW,
      assessment_data: JSON.stringify({
        land_size_acres: 3.5,
        fpo_verified: true,
        crops: ["Paddy", "Groundnut"],
      }),
      ai_explanation: "FPO verified 3.5 acres. Safe credit limit of ₹1,20,000–₹1,40,000 recommended due to combined price/yield stress downside on requested ₹2,00,000.",
      verified_by_fpo: true,
      fpo_comments: "Verified by Thiruvallur Agro Collective. Outstanding community track record.",
      bank_comments: null,
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      updated_at: now,
    };
    this.assessments.set(assess1.id, assess1);
  }

  // --- Farmers CRUD ---
  getFarmers(skip = 0, limit = 100): Farmer[] {
    return Array.from(this.farmers.values()).slice(skip, skip + limit);
  }

  getFarmerById(id: number): Farmer | undefined {
    return this.farmers.get(id);
  }

  getFarmerByEmail(email: string): Farmer | undefined {
    for (const f of this.farmers.values()) {
      if (f.email.toLowerCase() === email.toLowerCase()) return f;
    }
    return undefined;
  }

  createFarmer(input: Partial<Farmer> & { name: string; email: string; phone: string }): Farmer {
    const id = this.nextFarmerId++;
    const now = new Date().toISOString();
    const refId = `KT-${(input.state || "IN").substring(0, 2).toUpperCase()}-${(input.district || "REG").substring(0, 4).toUpperCase()}-${String(1000 + id).slice(-4)}`;

    const farmer: Farmer = {
      id,
      name: input.name,
      reference_id: input.reference_id || refId,
      email: input.email,
      phone: input.phone,
      location: input.location || `${input.district || "District"}, ${input.state || "State"}`,
      state: input.state || "Tamil Nadu",
      district: input.district || "Thiruvallur",
      village: input.village || "Village",
      address: input.address || null,
      land_size_acres: input.land_size_acres !== undefined ? Number(input.land_size_acres) : 3.0,
      crop_types: Array.isArray(input.crop_types) ? input.crop_types : input.crop_types ? [String(input.crop_types)] : ["Paddy"],
      irrigation_type: input.irrigation_type || "Borewell",
      sowing_date: input.sowing_date,
      expected_harvest_date: input.expected_harvest_date,
      previous_crop_history: input.previous_crop_history || "",
      cultivation_cost: input.cultivation_cost ? Number(input.cultivation_cost) : 50000,
      requested_loan_amount: input.requested_loan_amount ? Number(input.requested_loan_amount) : 150000,
      loan_purpose: input.loan_purpose || "Seasonal inputs",
      purpose_category: input.purpose_category || LoanPurposeCategory.SEEDS,
      supporting_evidence: input.supporting_evidence || [],
      fpo_id: input.fpo_id ? Number(input.fpo_id) : 1,
      verification_status: input.verification_status || VerificationStatus.PENDING,
      evidence_confidence_score: input.evidence_confidence_score || 60,
      profile_14: input.profile_14
        ? calculateProfileTotals(input.profile_14)
        : createDefaultProfile(
            input.name,
            input.district || "Thiruvallur",
            input.state || "Tamil Nadu",
            input.village || "Village",
            input.land_size_acres !== undefined ? Number(input.land_size_acres) : 3.0,
            Array.isArray(input.crop_types) ? input.crop_types[0] : (input.crop_types || "Paddy"),
            input.cultivation_cost ? Number(input.cultivation_cost) : 60000,
            input.requested_loan_amount ? Number(input.requested_loan_amount) : 150000,
            input.phone || "+91-9840192831"
          ),
      created_at: now,
      updated_at: now,
    };

    this.farmers.set(id, farmer);

    // Seed default consent permissions for this new farmer
    const defaultCategories: Array<ConsentRecord["data_category"]> = [
      "Crop & Yield Plans",
      "Land & Title Records",
      "Mandi Sales Receipts",
      "FPO Verification Report",
      "Satellite & Agro Risk",
    ];
    defaultCategories.forEach((cat) => {
      const cid = this.nextConsentId++;
      this.consents.set(cid, {
        id: cid,
        farmer_id: id,
        data_category: cat,
        shared_with: "Partner Banks / Lenders",
        status: "Allowed",
        granted_at: now,
        updated_at: now,
        expires_at: null,
      });
    });

    // Create initial FPO verification record
    const verifId = this.nextVerificationId++;
    this.verifications.set(verifId, {
      id: verifId,
      farmer_id: id,
      fpo_id: farmer.fpo_id || 1,
      claimed_crop: farmer.crop_types.join(", "),
      claimed_area_acres: farmer.land_size_acres,
      verified_area_acres: farmer.land_size_acres,
      evidence_documents: [
        {
          title: "Self-Reported Sowing Details",
          type: "Crop Declaration",
          source: EvidenceSourceType.FARMER_PROVIDED,
          verified: false,
          date: now.split("T")[0],
        },
      ],
      status: VerificationStatus.PENDING,
      verifier_name: "Community Field Verifier",
      comments: "Initial verification request registered on farmer onboarding.",
      rejection_reason: null,
      additional_evidence_requested: null,
      verified_at: null,
      created_at: now,
      updated_at: now,
    });

    // Broadcast new registration via WebSocket
    realtimeHub.broadcast("farmer:registered", {
      farmer,
      timestamp: now,
      message: `New farmer registered: ${farmer.name} (${farmer.land_size_acres} Acres, ${farmer.state})`,
    });

    return farmer;
  }

  updateFarmer(id: number, updates: Partial<Farmer>): Farmer | undefined {
    const existing = this.farmers.get(id);
    if (!existing) return undefined;

    let mergedProfile = existing.profile_14;
    if (updates.profile_14) {
      mergedProfile = calculateProfileTotals({
        ...(existing.profile_14 || createDefaultProfile(existing.name)),
        ...updates.profile_14,
      });
    }

    const updated: Farmer = {
      ...existing,
      ...updates,
      ...(mergedProfile && { profile_14: mergedProfile }),
      id,
      updated_at: new Date().toISOString(),
    };

    // If profile_14 was updated, synchronize top-level fields if not explicitly overridden
    if (mergedProfile) {
      if (mergedProfile.personal?.full_name && !updates.name) updated.name = mergedProfile.personal.full_name;
      if (mergedProfile.personal?.mobile_number && !updates.phone) updated.phone = mergedProfile.personal.mobile_number;
      if (mergedProfile.personal?.village && !updates.village) updated.village = mergedProfile.personal.village;
      if (mergedProfile.personal?.district && !updates.district) updated.district = mergedProfile.personal.district;
      if (mergedProfile.personal?.state && !updates.state) updated.state = mergedProfile.personal.state;
      if (mergedProfile.land?.total_land_area && updates.land_size_acres === undefined) updated.land_size_acres = mergedProfile.land.total_land_area;
      if (mergedProfile.crop?.estimated_production_cost && updates.cultivation_cost === undefined) updated.cultivation_cost = mergedProfile.crop.estimated_production_cost;
    }

    this.farmers.set(id, updated);

    realtimeHub.broadcast("farmer:updated", {
      farmer: updated,
      timestamp: updated.updated_at,
    });

    return updated;
  }

  deleteFarmer(id: number): boolean {
    return this.farmers.delete(id);
  }

  // --- Crop Plans ---
  getCropPlans(farmerId?: number): CropPlan[] {
    const list = Array.from(this.cropPlans.values());
    if (farmerId) {
      return list.filter((p) => p.farmer_id === farmerId);
    }
    return list;
  }

  getCropPlanById(id: number): CropPlan | undefined {
    return this.cropPlans.get(id);
  }

  createCropPlan(input: Omit<CropPlan, "id" | "created_at" | "updated_at">): CropPlan {
    const id = this.nextCropPlanId++;
    const now = new Date().toISOString();
    const plan: CropPlan = {
      ...input,
      id,
      created_at: now,
      updated_at: now,
    };
    this.cropPlans.set(id, plan);

    // Sync requested loan & cultivation cost on farmer record
    const farmer = this.farmers.get(input.farmer_id);
    if (farmer) {
      farmer.requested_loan_amount = input.requested_credit;
      farmer.cultivation_cost = input.cultivation_expenses;
      farmer.purpose_category = input.purpose_category;
      farmer.loan_purpose = input.purpose_description;
      farmer.updated_at = now;
    }

    realtimeHub.broadcast("credit:application_created", {
      crop_plan: plan,
      farmer: farmer ? { id: farmer.id, name: farmer.name, reference_id: farmer.reference_id } : null,
      timestamp: now,
      message: `Crop Plan & Credit Request submitted: ₹${plan.requested_credit.toLocaleString("en-IN")} for ${farmer?.name || "Farmer"}`,
    });

    return plan;
  }

  // --- FPO Management ---
  getFPOs(skip = 0, limit = 100): FPO[] {
    return Array.from(this.fpos.values()).slice(skip, skip + limit);
  }

  getFPOById(id: number): FPO | undefined {
    return this.fpos.get(id);
  }

  getFPOMembers(fpoId: number): Farmer[] {
    return Array.from(this.farmers.values()).filter((f) => f.fpo_id === fpoId);
  }

  // --- FPO Verifications ---
  getVerifications(fpoId?: number): FPOVerification[] {
    const list = Array.from(this.verifications.values());
    if (fpoId) {
      return list.filter((v) => v.fpo_id === fpoId);
    }
    return list;
  }

  getVerificationByFarmerId(farmerId: number): FPOVerification | undefined {
    for (const v of this.verifications.values()) {
      if (v.farmer_id === farmerId) return v;
    }
    return undefined;
  }

  createVerification(input: Omit<FPOVerification, "id" | "created_at" | "updated_at">): FPOVerification {
    const id = this.nextVerificationId++;
    const now = new Date().toISOString();
    const verif: FPOVerification = {
      ...input,
      id,
      created_at: now,
      updated_at: now,
    };
    this.verifications.set(id, verif);
    return verif;
  }

  updateVerification(id: number, updates: Partial<FPOVerification>): FPOVerification | undefined {
    const existing = this.verifications.get(id);
    if (!existing) return undefined;

    const updated: FPOVerification = {
      ...existing,
      ...updates,
      id,
      updated_at: new Date().toISOString(),
    };
    this.verifications.set(id, updated);

    // Synchronize farmer verification status
    const farmer = this.farmers.get(updated.farmer_id);
    if (farmer && updates.status) {
      farmer.verification_status = updates.status;
      if (updates.status === VerificationStatus.VERIFIED) {
        farmer.evidence_confidence_score = Math.min(95, farmer.evidence_confidence_score + 20);
      } else if (updates.status === VerificationStatus.REJECTED) {
        farmer.evidence_confidence_score = Math.max(30, farmer.evidence_confidence_score - 25);
      }
      farmer.updated_at = new Date().toISOString();
    }

    realtimeHub.broadcast("fpo:verification_updated", {
      verification: updated,
      farmer: farmer ? { id: farmer.id, name: farmer.name } : null,
      timestamp: updated.updated_at,
      message: `FPO updated verification status to '${updated.status}' for ${farmer?.name || "Farmer"}`,
    });

    return updated;
  }

  // --- Data Consent ---
  getConsents(farmerId: number): ConsentRecord[] {
    return Array.from(this.consents.values()).filter((c) => c.farmer_id === farmerId);
  }

  getAuditLogs(farmerId?: number): ConsentAuditLog[] {
    if (farmerId) {
      return this.auditLogs.filter((a) => a.farmer_id === farmerId);
    }
    return this.auditLogs;
  }

  updateConsent(id: number, status: "Allowed" | "Restricted"): ConsentRecord | undefined {
    const consent = this.consents.get(id);
    if (!consent) return undefined;

    consent.status = status;
    consent.updated_at = new Date().toISOString();

    // Log the audit
    this.auditLogs.unshift({
      id: this.nextAuditLogId++,
      farmer_id: consent.farmer_id,
      data_category: consent.data_category,
      party: consent.shared_with,
      action: status === "Allowed" ? "GRANTED" : "REVOKED",
      timestamp: consent.updated_at,
      ip_address: "103.21.144.62 (Dashboard Web)",
      notes: `User updated consent status to ${status}`,
    });

    realtimeHub.broadcast("consent:updated", {
      consent,
      timestamp: consent.updated_at,
      message: `Consent updated: ${consent.data_category} is now ${status} for ${consent.shared_with}`,
    });

    return consent;
  }

  // --- Loan Sanctions & Decisions ---
  createSanction(input: Omit<LoanSanctionRecord, "id" | "created_at">): LoanSanctionRecord {
    const id = this.nextSanctionId++;
    const now = new Date().toISOString();
    const sanction: LoanSanctionRecord = {
      ...input,
      id,
      created_at: now,
    };
    this.sanctions.set(id, sanction);

    const farmer = this.farmers.get(input.farmer_id);
    if (farmer) {
      if (input.decision === "Sanctioned") {
        farmer.verification_status = VerificationStatus.VERIFIED;
      }
      farmer.updated_at = now;
    }

    realtimeHub.broadcast("credit:sanctioned", {
      sanction,
      farmer: farmer ? { id: farmer.id, name: farmer.name, phone: farmer.phone } : null,
      timestamp: now,
      message: `${input.decision === "Sanctioned" ? "Credit Approved" : "Credit Decision"}: ₹${input.sanctioned_amount.toLocaleString("en-IN")} at ${input.interest_rate_percent}% for ${farmer?.name || "Farmer"}`,
    });

    return sanction;
  }

  getSanctions(farmerId?: number): LoanSanctionRecord[] {
    const list = Array.from(this.sanctions.values());
    if (farmerId) {
      return list.filter((s) => s.farmer_id === farmerId);
    }
    return list;
  }

  // --- Legacy Assessments (compatibility) ---
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
    const assess: CreditAssessment = {
      id,
      farmer_id: input.farmer_id,
      loan_amount: input.loan_amount,
      purpose: input.purpose,
      credit_score: 750,
      status: CreditStatus.PENDING,
      assessment_data: null,
      ai_explanation: null,
      verified_by_fpo: false,
      fpo_comments: null,
      bank_comments: null,
      created_at: now,
      updated_at: now,
    };
    this.assessments.set(id, assess);
    return assess;
  }

  updateAssessment(id: number, updates: Partial<CreditAssessment>): CreditAssessment | undefined {
    const existing = this.assessments.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates, id, updated_at: new Date().toISOString() };
    this.assessments.set(id, updated);
    return updated;
  }

  deleteAssessment(id: number): boolean {
    return this.assessments.delete(id);
  }
}

export const db = new DataStore();
