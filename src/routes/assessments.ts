import { Router, Request, Response } from "express";
import { db } from "../data.js";
import { CreditAssessmentCreateInput, CreditAssessmentUpdateInput, CreditStatus } from "../types.js";

export const assessmentsRouter = Router();

// POST /api/v1/assessments - Create a new credit assessment
assessmentsRouter.post("/", (req: Request, res: Response) => {
  const { farmer_id, loan_amount, purpose } = req.body as CreditAssessmentCreateInput;

  if (farmer_id === undefined || loan_amount === undefined || !purpose) {
    return res.status(422).json({
      detail: [
        { loc: ["body", farmer_id === undefined ? "farmer_id" : loan_amount === undefined ? "loan_amount" : "purpose"], msg: "Field required", type: "value_error.missing" }
      ]
    });
  }

  // Verify farmer exists
  const farmer = db.getFarmerById(Number(farmer_id));
  if (!farmer) {
    return res.status(404).json({ detail: "Farmer not found" });
  }

  if (Number(loan_amount) <= 0) {
    return res.status(422).json({
      detail: [{ loc: ["body", "loan_amount"], msg: "ensure this value is greater than 0", type: "value_error.number.not_gt" }]
    });
  }

  const assessment = db.createAssessment({
    farmer_id: Number(farmer_id),
    loan_amount: Number(loan_amount),
    purpose,
  });

  return res.status(201).json(assessment);
});

// GET /api/v1/assessments - List credit assessments with optional filters
assessmentsRouter.get("/", (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 100;
  const farmerId = req.query.farmer_id ? parseInt(req.query.farmer_id as string, 10) : undefined;
  const statusFilter = req.query.status_filter as CreditStatus | undefined;

  const assessments = db.getAssessments(skip, limit, farmerId, statusFilter);
  return res.json(assessments);
});

// GET /api/v1/assessments/:assessment_id - Get a specific credit assessment by ID
assessmentsRouter.get("/:assessment_id", (req: Request, res: Response) => {
  const assessmentId = parseInt(req.params.assessment_id, 10);
  if (isNaN(assessmentId)) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  const assessment = db.getAssessmentById(assessmentId);
  if (!assessment) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  return res.json(assessment);
});

// PUT /api/v1/assessments/:assessment_id - Update a credit assessment
assessmentsRouter.put("/:assessment_id", (req: Request, res: Response) => {
  const assessmentId = parseInt(req.params.assessment_id, 10);
  if (isNaN(assessmentId)) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  const existing = db.getAssessmentById(assessmentId);
  if (!existing) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  const updates = req.body as CreditAssessmentUpdateInput;

  const updated = db.updateAssessment(assessmentId, {
    ...(updates.status !== undefined && { status: updates.status }),
    ...(updates.credit_score !== undefined && { credit_score: updates.credit_score !== null ? Number(updates.credit_score) : null }),
    ...(updates.assessment_data !== undefined && { assessment_data: updates.assessment_data }),
    ...(updates.ai_explanation !== undefined && { ai_explanation: updates.ai_explanation }),
    ...(updates.verified_by_fpo !== undefined && { verified_by_fpo: Boolean(updates.verified_by_fpo) }),
    ...(updates.fpo_comments !== undefined && { fpo_comments: updates.fpo_comments }),
    ...(updates.bank_comments !== undefined && { bank_comments: updates.bank_comments }),
  });

  return res.json(updated);
});

// DELETE /api/v1/assessments/:assessment_id - Delete a credit assessment
assessmentsRouter.delete("/:assessment_id", (req: Request, res: Response) => {
  const assessmentId = parseInt(req.params.assessment_id, 10);
  if (isNaN(assessmentId)) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  const success = db.deleteAssessment(assessmentId);
  if (!success) {
    return res.status(404).json({ detail: "Credit assessment not found" });
  }

  return res.status(204).send();
});
