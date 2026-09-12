import express, { Request, Response } from "express";
import cors from "cors";
import { farmersRouter } from "./src/routes/farmers.js";
import { fpoRouter } from "./src/routes/fpo.js";
import { assessmentsRouter } from "./src/routes/assessments.js";
import { openApiSpec } from "./src/openapi.js";
import { db } from "./src/data.js";

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// API Routers
app.use("/api/v1/farmers", farmersRouter);
app.use("/api/v1/fpo", fpoRouter);
app.use("/api/v1/assessments", assessmentsRouter);

// OpenAPI JSON Schema
app.get("/openapi.json", (_req: Request, res: Response) => {
  res.json(openApiSpec);
});

// Swagger UI Documentation
app.get("/docs", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farmer Credit Intelligence Platform - API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fafaf9;
    }
    .top-bar {
      background: #15803d;
      color: white;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .top-bar h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .top-bar a {
      color: #dcfce7;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      background: rgba(255,255,255,0.15);
      padding: 6px 12px;
      border-radius: 6px;
      transition: background 0.2s;
    }
    .top-bar a:hover {
      background: rgba(255,255,255,0.25);
    }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
  </style>
</head>
<body>
  <div class="top-bar">
    <h1>🌾 Farmer Credit Intelligence Platform API</h1>
    <a href="/">← Back to Overview</a>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
      });
    };
  </script>
</body>
</html>`);
});

// ReDoc Documentation
app.get("/redoc", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Farmer Credit Intelligence Platform - ReDoc</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  <style>body { margin: 0; padding: 0; }</style>
</head>
<body>
  <redoc spec-url='/openapi.json'></redoc>
  <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
</body>
</html>`);
});

// Root endpoint: returns JSON for API calls and an interactive dashboard when opened in browser
app.get("/", (req: Request, res: Response) => {
  const acceptsHtml = req.headers.accept && req.headers.accept.includes("text/html");

  if (!acceptsHtml) {
    return res.json({
      message: "Farmer Credit Intelligence Platform API",
      version: "1.0.0",
      status: "operational",
    });
  }

  const farmers = db.getFarmers();
  const fpos = db.getFPOs();
  const assessments = db.getAssessments();

  res.setHeader("Content-Type", "text/html");
  return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farmer Credit Intelligence Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #15803d;
      --primary-hover: #166534;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --tag-green: #dcfce7;
      --tag-green-text: #166534;
      --tag-amber: #fef3c7;
      --tag-amber-text: #92400e;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }
    .header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      padding: 16px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-badge {
      background: #15803d;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .title-group h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
    }
    .title-group p {
      margin: 2px 0 0 0;
      font-size: 13px;
      color: var(--text-muted);
    }
    .header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--tag-green);
      color: var(--tag-green-text);
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: #16a34a;
      border-radius: 50%;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s ease;
      cursor: pointer;
      border: 1px solid transparent;
    }
    .btn-primary {
      background: var(--primary);
      color: #ffffff;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .btn-outline {
      background: #ffffff;
      border-color: var(--border);
      color: var(--text);
    }
    .btn-outline:hover {
      background: #f1f5f9;
    }
    .container {
      max-width: 1200px;
      margin: 32px auto;
      padding: 0 24px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
    }
    .metric-card h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .metric-value {
      font-size: 32px;
      font-weight: 700;
      color: #0f172a;
      margin: 8px 0;
    }
    .metric-sub {
      margin: 0;
      font-size: 12px;
      color: var(--text-muted);
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: #f8fafc;
      padding: 12px 16px;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-approved { background: #dcfce7; color: #166534; }
    .badge-review { background: #fef3c7; color: #92400e; }
    .badge-verified { background: #e0f2fe; color: #0369a1; }
    .endpoint-tag {
      font-family: monospace;
      font-size: 12px;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      color: #0f172a;
    }
    .quick-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="brand">
      <div class="logo-badge">🌾</div>
      <div class="title-group">
        <h1>Farmer Credit Intelligence Platform</h1>
        <p>Verified Data • Community Trust • Explainable AI</p>
      </div>
    </div>
    <div class="header-actions">
      <div class="status-pill">
        <div class="status-dot"></div>
        API Operational
      </div>
      <a href="/docs" class="btn btn-primary">Swagger Docs</a>
      <a href="/redoc" class="btn btn-outline">ReDoc</a>
      <a href="/health" class="btn btn-outline">Health Check</a>
    </div>
  </header>

  <main class="container">
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Registered Farmers</h3>
        <div class="metric-value">${farmers.length}</div>
        <p class="metric-sub">${farmers.filter(f => f.verified).length} FPO Verified</p>
      </div>
      <div class="metric-card">
        <h3>Farmer Producer Orgs</h3>
        <div class="metric-value">${fpos.length}</div>
        <p class="metric-sub">Active regional collectives</p>
      </div>
      <div class="metric-card">
        <h3>Credit Assessments</h3>
        <div class="metric-value">${assessments.length}</div>
        <p class="metric-sub">${assessments.filter(a => a.status === 'approved').length} Approved</p>
      </div>
    </div>

    <div class="section-title">
      <span>Recent Credit Assessments</span>
      <a href="/api/v1/assessments" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px;">View Raw JSON</a>
    </div>
    <div class="content-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Farmer</th>
            <th>Loan Purpose</th>
            <th>Amount</th>
            <th>Credit Score</th>
            <th>Status</th>
            <th>AI Recommendation</th>
          </tr>
        </thead>
        <tbody>
          ${assessments.map(a => {
            const farmer = farmers.find(f => f.id === a.farmer_id);
            const statusClass = a.status === 'approved' ? 'badge-approved' : 'badge-review';
            return `
              <tr>
                <td><strong>#${a.id}</strong></td>
                <td>${farmer ? farmer.name : `Farmer #${a.farmer_id}`}</td>
                <td>${a.purpose}</td>
                <td><strong>₹${a.loan_amount.toLocaleString('en-IN')}</strong></td>
                <td><span class="badge ${a.credit_score && a.credit_score >= 80 ? 'badge-approved' : 'badge-review'}">${a.credit_score ?? 'Pending'}</span></td>
                <td><span class="badge ${statusClass}">${a.status.toUpperCase()}</span></td>
                <td style="max-width: 320px; font-size: 12px; color: #475569;">${a.ai_explanation ?? 'Analysis queued'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="section-title">
      <span>Farmer Registry</span>
      <a href="/api/v1/farmers" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px;">View Raw JSON</a>
    </div>
    <div class="content-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Land Holding</th>
            <th>FPO Collective</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${farmers.map(f => {
            const fpo = fpos.find(org => org.id === f.fpo_id);
            return `
              <tr>
                <td><strong>#${f.id}</strong></td>
                <td>${f.name}</td>
                <td>${f.email}<br><span style="color: #64748b; font-size: 12px;">${f.phone}</span></td>
                <td>${f.land_size_acres ? f.land_size_acres + ' Acres' : 'N/A'}</td>
                <td>${fpo ? fpo.name : 'Independent'}</td>
                <td><span class="badge ${f.verified ? 'badge-verified' : 'badge-review'}">${f.verified ? 'VERIFIED' : 'PENDING'}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="section-title">
      <span>Core API Endpoints</span>
    </div>
    <div class="content-card" style="padding: 20px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div>
          <h4 style="margin: 0 0 8px 0;">🌾 Farmers API</h4>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Manage farmer profiles and verification status.</p>
          <div class="quick-links">
            <a href="/api/v1/farmers" class="endpoint-tag">GET /api/v1/farmers</a>
            <span class="endpoint-tag">POST /api/v1/farmers</span>
          </div>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">🏢 FPO API</h4>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Farmer Producer Organizations and members.</p>
          <div class="quick-links">
            <a href="/api/v1/fpo" class="endpoint-tag">GET /api/v1/fpo</a>
            <span class="endpoint-tag">POST /api/v1/fpo</span>
          </div>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">📊 Credit Assessment API</h4>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Loan applications, scoring & explainable AI.</p>
          <div class="quick-links">
            <a href="/api/v1/assessments" class="endpoint-tag">GET /api/v1/assessments</a>
            <span class="endpoint-tag">POST /api/v1/assessments</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`);
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    database: "connected",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Farmer Credit Intelligence Platform running on http://${HOST}:${PORT}`);
});
