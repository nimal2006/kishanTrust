import http from "node:http";
import express, { Request, Response } from "express";
import cors from "cors";
import { farmersRouter } from "./src/routes/farmers.js";
import { fpoRouter } from "./src/routes/fpo.js";
import { assessmentsRouter } from "./src/routes/assessments.js";
import { agricultureRouter } from "./src/routes/agriculture.js";
import { creditRouter } from "./src/routes/credit.js";
import { consentRouter } from "./src/routes/consent.js";
import { openApiSpec } from "./src/openapi.js";
import { renderDashboardHtml } from "./src/views/dashboardHtml.js";
import { realtimeHub } from "./src/services/realtime.js";

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
app.use("/api/v1/agriculture", agricultureRouter);
app.use("/api/v1/credit", creditRouter);
app.use("/api/v1/data-consent", consentRouter);

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
  <title>KissanTrust API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #fafaf9; }
    .top-bar {
      background: #143d24;
      color: white;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .top-bar h1 { margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .top-bar a {
      color: #eef4ef;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      background: rgba(255,255,255,0.15);
      padding: 6px 12px;
      border-radius: 6px;
    }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div class="top-bar">
    <h1>🌾 KissanTrust Credit Intelligence Platform API</h1>
    <a href="/">← Back to Dashboard</a>
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
  <title>KissanTrust API - ReDoc</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  <style>body { margin: 0; padding: 0; }</style>
</head>
<body>
  <redoc spec-url='/openapi.json'></redoc>
  <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
</body>
</html>`);
});

// Root endpoint: Serves KissanTrust interactive UI or API JSON
app.get("/", (req: Request, res: Response) => {
  const acceptsHtml = req.headers.accept && req.headers.accept.includes("text/html");

  if (!acceptsHtml) {
    return res.json({
      message: "KissanTrust - Community-Owned Agricultural Credit Network API",
      version: "1.0.0",
      status: "operational",
      endpoints: {
        farmers: "/api/v1/farmers",
        fpo: "/api/v1/fpo",
        credit_assessments: "/api/v1/assessments",
        agriculture: "/api/v1/agriculture",
        credit_planning: "/api/v1/credit",
        data_consent: "/api/v1/data-consent",
        docs: "/docs",
      },
    });
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.send(renderDashboardHtml());
});

// Health check endpoint with real-time status
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    database: "connected",
    network: "PS2 Community-Owned Credit Network",
    realtime_nodes_connected: realtimeHub.getConnectedClientCount(),
    timestamp: new Date().toISOString(),
  });
});

const server = http.createServer(app);
realtimeHub.init(server);

server.listen(PORT, HOST, () => {
  console.log(`KissanTrust platform running on http://${HOST}:${PORT} (Realtime WebSockets active)`);
});
