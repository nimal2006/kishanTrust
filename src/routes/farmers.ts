import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { Farmer, VerificationStatus, LoanPurposeCategory } from "../types.js";

export const farmersRouter = Router();

// POST /api/v1/farmers - Create a new farmer profile
farmersRouter.post("/", (req: Request, res: Response) => {
  let {
    name,
    email,
    phone,
    location,
    state,
    district,
    village,
    address,
    land_size_acres,
    crop_types,
    irrigation_type,
    sowing_date,
    expected_harvest_date,
    previous_crop_history,
    cultivation_cost,
    requested_loan_amount,
    loan_purpose,
    purpose_category,
    supporting_evidence,
    fpo_id,
    profile_14,
  } = req.body;

  if (!name) {
    return res.status(422).json({
      detail: [
        {
          loc: ["body", "name"],
          msg: "Field required",
          type: "value_error.missing",
        },
      ],
    });
  }

  if (!email) {
    email = `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.${Date.now()}@kissankunj.org`;
  }
  if (!phone) {
    phone = profile_14?.personal?.mobile_number || "+91-9840192831";
  }

  const existing = db.getFarmerByEmail(email);
  if (existing) {
    return res.status(400).json({ detail: "Email already registered" });
  }

  // Parse crop types
  let parsedCrops: string[] = ["Paddy"];
  if (Array.isArray(crop_types)) {
    parsedCrops = crop_types;
  } else if (typeof crop_types === "string") {
    try {
      const parsed = JSON.parse(crop_types);
      parsedCrops = Array.isArray(parsed) ? parsed : [crop_types];
    } catch {
      parsedCrops = crop_types.split(",").map((c) => c.trim());
    }
  }

  const farmer = db.createFarmer({
    name,
    email,
    phone,
    location: location || `${district || "District"}, ${state || "State"}`,
    state: state || "Tamil Nadu",
    district: district || "Thiruvallur",
    village: village || "Nemam",
    address: address ?? null,
    land_size_acres: land_size_acres !== undefined ? Number(land_size_acres) : 3.0,
    crop_types: parsedCrops,
    irrigation_type: irrigation_type || "Borewell",
    sowing_date: sowing_date || new Date().toISOString().split("T")[0],
    expected_harvest_date: expected_harvest_date || new Date(Date.now() + 100 * 86400000).toISOString().split("T")[0],
    previous_crop_history: previous_crop_history || "",
    cultivation_cost: cultivation_cost ? Number(cultivation_cost) : 60000,
    requested_loan_amount: requested_loan_amount ? Number(requested_loan_amount) : 150000,
    loan_purpose: loan_purpose || "Agricultural cultivation credit",
    purpose_category: purpose_category || LoanPurposeCategory.SEEDS,
    supporting_evidence: Array.isArray(supporting_evidence) ? supporting_evidence : [],
    fpo_id: fpo_id !== undefined && fpo_id !== null ? Number(fpo_id) : 1,
    verification_status: VerificationStatus.PENDING,
    evidence_confidence_score: 65,
    ...(profile_14 && { profile_14 }),
  });

  return res.status(201).json(farmer);
});

// GET /api/v1/farmers - List all farmers
farmersRouter.get("/", (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 100;

  const farmers = db.getFarmers(skip, limit);
  return res.json(farmers);
});

// GET /api/v1/farmers/:farmer_id - Get a specific farmer by ID
farmersRouter.get("/:farmer_id", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmer_id, 10);
  if (isNaN(farmerId)) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const farmer = db.getFarmerById(farmerId);
  if (!farmer) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  return res.json(farmer);
});

// PUT /api/v1/farmers/:farmer_id - Update farmer profile
farmersRouter.put("/:farmer_id", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmer_id, 10);
  if (isNaN(farmerId)) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const existing = db.getFarmerById(farmerId);
  if (!existing) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const updates = req.body;

  if (updates.email && updates.email !== existing.email) {
    const conflict = db.getFarmerByEmail(updates.email);
    if (conflict && conflict.id !== farmerId) {
      return res.status(400).json({ detail: "Email already registered" });
    }
  }

  let parsedCrops = existing.crop_types;
  if (updates.crop_types) {
    if (Array.isArray(updates.crop_types)) {
      parsedCrops = updates.crop_types;
    } else if (typeof updates.crop_types === "string") {
      try {
        parsedCrops = JSON.parse(updates.crop_types);
      } catch {
        parsedCrops = updates.crop_types.split(",").map((c: string) => c.trim());
      }
    }
  }

  const updated = db.updateFarmer(farmerId, {
    ...(updates.name && { name: updates.name }),
    ...(updates.email && { email: updates.email }),
    ...(updates.phone && { phone: updates.phone }),
    ...(updates.location && { location: updates.location }),
    ...(updates.state && { state: updates.state }),
    ...(updates.district && { district: updates.district }),
    ...(updates.village && { village: updates.village }),
    ...(updates.address !== undefined && { address: updates.address }),
    ...(updates.land_size_acres !== undefined && { land_size_acres: Number(updates.land_size_acres) }),
    crop_types: parsedCrops,
    ...(updates.irrigation_type && { irrigation_type: updates.irrigation_type }),
    ...(updates.sowing_date && { sowing_date: updates.sowing_date }),
    ...(updates.expected_harvest_date && { expected_harvest_date: updates.expected_harvest_date }),
    ...(updates.previous_crop_history !== undefined && { previous_crop_history: updates.previous_crop_history }),
    ...(updates.cultivation_cost !== undefined && { cultivation_cost: Number(updates.cultivation_cost) }),
    ...(updates.requested_loan_amount !== undefined && { requested_loan_amount: Number(updates.requested_loan_amount) }),
    ...(updates.loan_purpose && { loan_purpose: updates.loan_purpose }),
    ...(updates.purpose_category && { purpose_category: updates.purpose_category }),
    ...(updates.supporting_evidence && { supporting_evidence: updates.supporting_evidence }),
    ...(updates.fpo_id !== undefined && { fpo_id: Number(updates.fpo_id) }),
    ...(updates.verification_status && { verification_status: updates.verification_status }),
    ...(updates.profile_14 && { profile_14: updates.profile_14 }),
  });

  return res.json(updated);
});

// DELETE /api/v1/farmers/:farmer_id - Delete a farmer
farmersRouter.delete("/:farmer_id", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmer_id, 10);
  if (isNaN(farmerId)) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const success = db.deleteFarmer(farmerId);
  if (!success) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  return res.status(204).send();
});
