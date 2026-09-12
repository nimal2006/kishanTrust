import os
import sys
import numpy as np
import pandas as pd
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Ensure ml_service directory is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

MODEL_PATH = os.path.join(BASE_DIR, 'credit_model.joblib')

# Auto-train model if joblib file is missing
if not os.path.exists(MODEL_PATH):
    try:
        from train import train_and_export_model
        print("⚡ credit_model.joblib not found. Auto-running ML training pipeline...")
        train_and_export_model()
    except Exception as e:
        print(f"⚠️ Failed to auto-train model: {e}")

# Load model pipeline
pipeline = None
try:
    if os.path.exists(MODEL_PATH):
        pipeline = joblib.load(MODEL_PATH)
        print("✅ Loaded Scikit-Learn Credit Risk Model Pipeline from Joblib.")
except Exception as e:
        print(f"❌ Error loading credit_model.joblib: {e}")

app = FastAPI(
    title="KissanTrust ML Credit Risk Service",
    description="Python Scikit-Learn + FastAPI Microservice for Agricultural Loan Risk Assessment",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FarmerLoanRequest(BaseModel):
    land_acres: float
    yield_quintals: float
    mandi_price: float
    existing_debt: float
    loan_requested: float

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "KissanTrust ML Credit Risk Microservice",
        "model_loaded": pipeline is not None,
        "engine": "Scikit-Learn RandomForestClassifier + Joblib"
    }

@app.post("/predict")
def predict_credit_risk(req: FarmerLoanRequest):
    global pipeline
    if pipeline is None:
        if os.path.exists(MODEL_PATH):
            pipeline = joblib.load(MODEL_PATH)
        else:
            raise HTTPException(status_code=503, detail="ML Credit Model pipeline is not loaded or missing.")

    try:
        features = pd.DataFrame([{
            'land_acres': req.land_acres,
            'yield_quintals': req.yield_quintals,
            'mandi_price': req.mandi_price,
            'existing_debt': req.existing_debt,
            'loan_requested': req.loan_requested
        }])

        prediction = int(pipeline.predict(features)[0])
        probabilities = pipeline.predict_proba(features)[0]

        safe_prob = float(probabilities[0])
        default_prob = float(probabilities[1])
        confidence = float(np.max(probabilities) * 100.0)

        expected_revenue = req.yield_quintals * req.mandi_price
        max_capacity = max(25000.0, (expected_revenue * 0.65) - (req.existing_debt * 0.3))

        if prediction == 0:
            risk_status = "Approved - Low Risk"
            recommended_credit_ceiling = round(min(req.loan_requested, max_capacity), 2)
        else:
            risk_status = "Stress Capped - High Default Risk"
            recommended_credit_ceiling = round(min(req.loan_requested * 0.55, max_capacity * 0.6), 2)

        return {
            "prediction": prediction,
            "risk_status": risk_status,
            "recommended_credit_ceiling": recommended_credit_ceiling,
            "default_probability": round(default_prob, 4),
            "safe_probability": round(safe_prob, 4),
            "confidence_score": round(confidence, 1),
            "model_engine": "Scikit-Learn RandomForest + Joblib + FastAPI"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("ML_PORT", 8008))
    uvicorn.run(app, host="127.0.0.1", port=port)
