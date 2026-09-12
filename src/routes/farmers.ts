import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { FarmerCreateInput, FarmerUpdateInput } from "../types.js";

export const farmersRouter = Router();

// POST /api/v1/farmers - Create a new farmer
farmersRouter.post("/", (req: Request, res: Response) => {
  const { name, email, phone, address, land_size_acres, crop_types, fpo_id } = req.body as FarmerCreateInput;

  if (!name || !email || !phone) {
    return res.status(422).json({
      detail: [
        { loc: ["body", !name ? "name" : !email ? "email" : "phone"], msg: "Field required", type: "value_error.missing" }
      ]
    });
  }

  // Check if email already exists
  const existing = db.getFarmerByEmail(email);
  if (existing) {
    return res.status(400).json({ detail: "Email already registered" });
  }

  const farmer = db.createFarmer({
    name,
    email,
    phone,
    address: address ?? null,
    land_size_acres: land_size_acres !== undefined ? Number(land_size_acres) : null,
    crop_types: typeof crop_types === "object" ? JSON.stringify(crop_types) : crop_types ?? null,
    fpo_id: fpo_id !== undefined && fpo_id !== null ? Number(fpo_id) : null,
  });

  return res.status(201).json(farmer);
});

// GET /api/v1/farmers - List all farmers with pagination
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

// PUT /api/v1/farmers/:farmer_id - Update a farmer's information
farmersRouter.put("/:farmer_id", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmer_id, 10);
  if (isNaN(farmerId)) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const existing = db.getFarmerById(farmerId);
  if (!existing) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  const updates = req.body as FarmerUpdateInput;

  // If email is changing, ensure uniqueness
  if (updates.email && updates.email !== existing.email) {
    const conflict = db.getFarmerByEmail(updates.email);
    if (conflict && conflict.id !== farmerId) {
      return res.status(400).json({ detail: "Email already registered" });
    }
  }

  const updated = db.updateFarmer(farmerId, {
    ...(updates.name !== undefined && { name: updates.name }),
    ...(updates.email !== undefined && { email: updates.email }),
    ...(updates.phone !== undefined && { phone: updates.phone }),
    ...(updates.address !== undefined && { address: updates.address }),
    ...(updates.land_size_acres !== undefined && { land_size_acres: updates.land_size_acres !== null ? Number(updates.land_size_acres) : null }),
    ...(updates.crop_types !== undefined && { crop_types: typeof updates.crop_types === "object" ? JSON.stringify(updates.crop_types) : updates.crop_types }),
    ...(updates.fpo_id !== undefined && { fpo_id: updates.fpo_id !== null ? Number(updates.fpo_id) : null }),
    ...(updates.verified !== undefined && { verified: Boolean(updates.verified) }),
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
