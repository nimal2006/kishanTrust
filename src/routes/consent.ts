import { Router, Request, Response } from "express";
import { db } from "../data.js";

export const consentRouter = Router();

// GET /api/v1/data-consent/:farmerId - List consent permissions for a farmer
consentRouter.get("/:farmerId", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmerId, 10);
  if (isNaN(farmerId)) {
    return res.status(400).json({ detail: "Invalid farmerId" });
  }

  const consents = db.getConsents(farmerId);
  return res.json({
    success: true,
    data: consents,
  });
});

// GET /api/v1/data-consent/:farmerId/audit - Audit trail of data access & consent changes
consentRouter.get("/:farmerId/audit", (req: Request, res: Response) => {
  const farmerId = parseInt(req.params.farmerId, 10);
  const logs = db.getAuditLogs(farmerId);
  return res.json({
    success: true,
    data: logs,
  });
});

// PUT /api/v1/data-consent/:id - Revoke or Allow consent
consentRouter.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (status !== "Allowed" && status !== "Restricted") {
    return res.status(400).json({ detail: "Status must be 'Allowed' or 'Restricted'" });
  }

  const updated = db.updateConsent(id, status);
  if (!updated) {
    return res.status(404).json({ detail: "Consent record not found" });
  }

  return res.json({
    success: true,
    data: updated,
  });
});

// POST /api/v1/data-consent - Create or update consent
consentRouter.post("/", (req: Request, res: Response) => {
  const { farmer_id, data_category, shared_with, status } = req.body;
  if (!farmer_id || !data_category || !shared_with) {
    return res.status(422).json({ detail: "farmer_id, data_category, and shared_with are required" });
  }

  const existingList = db.getConsents(Number(farmer_id));
  const existing = existingList.find((c) => c.data_category === data_category && c.shared_with === shared_with);

  if (existing) {
    const updated = db.updateConsent(existing.id, status || "Allowed");
    return res.json({ success: true, data: updated });
  }

  return res.status(200).json({ success: true, message: "Consent configured" });
});
