import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

def train_and_export_model():
    np.random.seed(42)
    n_samples = 1500

    # Synthesize realistic agricultural dataset
    land_acres = np.round(np.random.uniform(1.0, 12.0, n_samples), 2)
    yield_quintals = np.round(land_acres * np.random.uniform(15.0, 32.0, n_samples), 2)
    mandi_price = np.round(np.random.uniform(1800.0, 3800.0, n_samples), 2)
    existing_debt = np.round(np.random.uniform(0.0, 250000.0, n_samples), 2)
    loan_requested = np.round(land_acres * np.random.uniform(20000.0, 60000.0, n_samples), 2)

    expected_revenue = yield_quintals * mandi_price
    total_obligation = existing_debt + loan_requested

    # Calculate risk index
    debt_to_income = total_obligation / (expected_revenue + 1e-5)
    coverage_ratio = expected_revenue / (total_obligation * 0.75 + 1e-5)

    raw_risk = (debt_to_income * 0.45) + (1.0 / (coverage_ratio + 1e-5) * 0.45)
    noise = np.random.normal(0, 0.04, size=n_samples)
    final_risk_score = raw_risk + noise

    # Target: 0 = Low Risk / Approved, 1 = High Risk / Stress Capped
    default_risk = np.where(final_risk_score > 0.62, 1, 0)

    df = pd.DataFrame({
        'land_acres': land_acres,
        'yield_quintals': yield_quintals,
        'mandi_price': mandi_price,
        'existing_debt': existing_debt,
        'loan_requested': loan_requested,
        'default_risk': default_risk
    })

    X = df[['land_acres', 'yield_quintals', 'mandi_price', 'existing_debt', 'loan_requested']]
    y = df['default_risk']

    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))
    ])

    pipeline.fit(X, y)

    output_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(output_dir, 'credit_model.joblib')

    joblib.dump(pipeline, model_path)
    print(f"✅ Successfully trained Scikit-Learn RandomForest Credit Pipeline on {len(df)} samples.")
    print(f"💾 Model saved to: {model_path}")
    print(f"📊 Default risk ratio: {y.mean():.2%} high default risk")

if __name__ == "__main__":
    train_and_export_model()
