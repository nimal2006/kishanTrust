# KissanTrust - AI-Powered Dynamic Agricultural Credit Planning Platform

## Product Overview
**KissanTrust** is a community-owned digital agricultural credit network built for Farmers and Farmer Producer Organisations (FPOs) (PS2 - Community-Owned Credit Network for Agriculture & Horticulture).

### Core Innovation
> *"Existing systems assess the farmer; this system stress-tests the loan against the farmer’s future crop economics."*

The platform dynamically answers:
1. Is the borrower trustworthy based on available verified evidence?
2. How much credit can safely be recommended?
3. What should the credit be used for?
4. Can the farmer repay from expected crop/market income?
5. How does agricultural risk affect repayment?
6. How can the farmer retain visibility and control over their data?

## Primary User Personas & Workspaces
1. **Farmer**: Profile, crop planning, loan stress testing, what-if simulation, credit readiness, and granular data consent management.
2. **FPO / Community Verifier**: Community-level crop verification, land acreage checking, evidence appraisal, and trust auditing.
3. **Lender / Bank / NBFC / Cooperative**: Risk evaluation dashboard, explainable credit recommendations, multi-scenario stress audit, and exportable credit reports.

## Key Architectural Principles
- **Transparent & Explainable**: Core financial models, scenario matrices, and capacity metrics are mathematically explicit and deterministic. No black-box fake AI approvals.
- **Agricultural Cycle-Aware**: Repayment timing is pegged to harvest windows and marketing arrivals rather than salaried monthly EMIs.
- **Evidence Confidence vs. Credit Score**: Input classification (Farmer Provided, FPO Verified, External/Govt, Derived) drives an Evidence Confidence metric.
- **Resilient Data Layer**: AGMARKNET (mandi prices/arrivals), NHB (horticulture benchmarks), and Weather/Risk context are decoupled through service adapters with graceful fallback and source transparency.
- **Farmer Data Sovereignty**: Granular data access permissions and auditable consent logs.

## Technology Stack
- **Backend**: Express.js with TypeScript (`NodeNext`), running on port 3000.
- **Architecture**: Modular services (`/src/services/` for economics, stress testing, market/NHB data, consent, and explainability), structured routers (`/src/routes/`), and in-memory persistent database store (`/src/data.ts`).
- **Frontend**: Responsive single-bundle client delivered through modern HTML5, CSS3, Tailwind utilities, Google Fonts (Cinzel / Lora serif + Plus Jakarta Sans), and interactive Canvas/SVG charts.
