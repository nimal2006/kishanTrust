import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { VerificationStatus, EvidenceSourceType } from "../types.js";

export const fpoRouter = Router();

// --- FPO Verifications Workflow (Placed before /:fpo_id to avoid routing collision) ---

// GET /api/v1/fpo/verifications - List verifications (optionally filter by fpo_id or farmer_id)
fpoRouter.get("/verifications", (req: Request, res: Response) => {
  const fpoId = req.query.fpo_id ? parseInt(req.query.fpo_id as string, 10) : undefined;
  const verifications = db.getVerifications(fpoId);
  return res.json(verifications);
});

// GET /api/v1/fpo/verifications/:id - Get verification detail
fpoRouter.get("/verifications/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const verifications = db.getVerifications();
  const found = verifications.find((v) => v.id === id);
  if (!found) {
    return res.status(404).json({ detail: "Verification record not found" });
  }
  return res.json(found);
});

// POST /api/v1/fpo/verifications - Create a verification appraisal request
fpoRouter.post("/verifications", (req: Request, res: Response) => {
  const {
    farmer_id,
    fpo_id,
    claimed_crop,
    claimed_area_acres,
    verified_area_acres,
    evidence_documents,
    status,
    verifier_name,
    comments,
  } = req.body;

  if (!farmer_id || !claimed_crop) {
    return res.status(422).json({ detail: "farmer_id and claimed_crop are required" });
  }

  const verif = db.createVerification({
    farmer_id: Number(farmer_id),
    fpo_id: fpo_id ? Number(fpo_id) : 1,
    claimed_crop,
    claimed_area_acres: Number(claimed_area_acres || 3.0),
    verified_area_acres: verified_area_acres ? Number(verified_area_acres) : Number(claimed_area_acres || 3.0),
    evidence_documents: evidence_documents || [
      {
        title: "Land Title Self-Declaration",
        type: "Land Ownership",
        source: EvidenceSourceType.FARMER_PROVIDED,
        verified: false,
        date: new Date().toISOString().split("T")[0],
      },
    ],
    status: status || VerificationStatus.PENDING,
    verifier_name: verifier_name || "Community Field Inspector",
    comments: comments || "Submitted for community verification",
    rejection_reason: null,
    additional_evidence_requested: null,
    verified_at: status === VerificationStatus.VERIFIED ? new Date().toISOString() : null,
  });

  return res.status(201).json(verif);
});

// PUT /api/v1/fpo/verifications/:id - Action verification (Verify, Reject, Request Evidence)
fpoRouter.put("/verifications/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const {
    status,
    verified_area_acres,
    verifier_name,
    comments,
    rejection_reason,
    additional_evidence_requested,
    evidence_documents,
  } = req.body;

  const updated = db.updateVerification(id, {
    ...(status && { status }),
    ...(verified_area_acres !== undefined && { verified_area_acres: Number(verified_area_acres) }),
    ...(verifier_name && { verifier_name }),
    ...(comments !== undefined && { comments }),
    ...(rejection_reason !== undefined && { rejection_reason }),
    ...(additional_evidence_requested !== undefined && { additional_evidence_requested }),
    ...(evidence_documents && { evidence_documents }),
    verified_at: status === VerificationStatus.VERIFIED ? new Date().toISOString() : undefined,
  });

  if (!updated) {
    return res.status(404).json({ detail: "Verification record not found" });
  }

  return res.json(updated);
});

// --- FPO Entities ---

// GET /api/v1/fpo - List all FPOs
fpoRouter.get("/", (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 100;
  const fpos = db.getFPOs(skip, limit);
  return res.json(fpos);
});

// GET /api/v1/fpo/:fpo_id - Get specific FPO
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

// GET /api/v1/fpo/:fpo_id/members - Get all farmers belonging to an FPO
fpoRouter.get("/:fpo_id/members", (req: Request, res: Response) => {
  const fpoId = parseInt(req.params.fpo_id, 10);
  if (isNaN(fpoId)) {
    return res.status(404).json({ detail: "FPO not found" });
  }
  const members = db.getFPOMembers(fpoId);
  return res.json(members);
});
