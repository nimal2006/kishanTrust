import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { FPOCreateInput, FPOUpdateInput } from "../types.js";

export const fpoRouter = Router();

// POST /api/v1/fpo - Create a new FPO
fpoRouter.post("/", (req: Request, res: Response) => {
  const { name, registration_number, address, contact_person, contact_email, contact_phone } = req.body as FPOCreateInput;

  if (!name || !registration_number) {
    return res.status(422).json({
      detail: [
        { loc: ["body", !name ? "name" : "registration_number"], msg: "Field required", type: "value_error.missing" }
      ]
    });
  }

  // Check if registration number already exists
  const existing = db.getFPOByRegistrationNumber(registration_number);
  if (existing) {
    return res.status(400).json({ detail: "Registration number already exists" });
  }

  const fpo = db.createFPO({
    name,
    registration_number,
    address: address ?? null,
    contact_person: contact_person ?? null,
    contact_email: contact_email ?? null,
    contact_phone: contact_phone ?? null,
  });

  return res.status(201).json(fpo);
});

// GET /api/v1/fpo - List all FPOs with pagination
fpoRouter.get("/", (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 100;

  const fpos = db.getFPOs(skip, limit);
  return res.json(fpos);
});

// GET /api/v1/fpo/:fpo_id - Get a specific FPO by ID
fpoRouter.get("/:fpo_id", (req: Request, res: Response) => {
  const fpoId = parseInt(req.params.fpo_id, 10);
  if (isNaN(fpoId)) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const fpo = db.getFPOById(fpoId);
  if (!fpo) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  return res.json(fpo);
});

// PUT /api/v1/fpo/:fpo_id - Update an FPO's information
fpoRouter.put("/:fpo_id", (req: Request, res: Response) => {
  const fpoId = parseInt(req.params.fpo_id, 10);
  if (isNaN(fpoId)) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const existing = db.getFPOById(fpoId);
  if (!existing) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const updates = req.body as FPOUpdateInput;

  const updated = db.updateFPO(fpoId, {
    ...(updates.name !== undefined && { name: updates.name }),
    ...(updates.address !== undefined && { address: updates.address }),
    ...(updates.contact_person !== undefined && { contact_person: updates.contact_person }),
    ...(updates.contact_email !== undefined && { contact_email: updates.contact_email }),
    ...(updates.contact_phone !== undefined && { contact_phone: updates.contact_phone }),
    ...(updates.member_count !== undefined && { member_count: updates.member_count }),
  });

  return res.json(updated);
});

// DELETE /api/v1/fpo/:fpo_id - Delete an FPO
fpoRouter.delete("/:fpo_id", (req: Request, res: Response) => {
  const fpoId = parseInt(req.params.fpo_id, 10);
  if (isNaN(fpoId)) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const success = db.deleteFPO(fpoId);
  if (!success) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  return res.status(204).send();
});

// GET /api/v1/fpo/:fpo_id/members - Get all farmers belonging to an FPO
fpoRouter.get("/:fpo_id/members", (req: Request, res: Response) => {
  const fpoId = parseInt(req.params.fpo_id, 10);
  if (isNaN(fpoId)) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const existing = db.getFPOById(fpoId);
  if (!existing) {
    return res.status(404).json({ detail: "FPO not found" });
  }

  const members = db.getFPOMembers(fpoId);
  return res.json(members);
});
