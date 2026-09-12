import { renderDesktopSidebarHtml, renderMobileDrawerHtml } from "./components/navigation.js";
import { renderHeaderHtml } from "./components/header.js";
import { renderFarmerWorkspaceHtml } from "./workspaces/farmerWorkspace.js";
import { renderFpoWorkspaceHtml } from "./workspaces/fpoWorkspace.js";
import { renderLenderWorkspaceHtml } from "./workspaces/lenderWorkspace.js";
import { renderModalsHtml } from "./components/modals.js";
import { renderLoginHtml } from "./components/loginHtml.js";
import { renderClientScript } from "./scripts/clientScript.js";

export function renderDashboardHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="w-full max-w-full overflow-x-hidden min-h-screen font-sans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>KissanTrust - Agricultural Credit Intelligence Platform</title>
  <meta name="description" content="Community-owned digital agricultural credit network stress-testing loans against future crop economics">
  <meta property="og:title" content="KissanTrust - Agricultural Credit Intelligence Platform">
  <meta property="og:description" content="Community-owned digital agricultural credit network stress-testing loans against future crop economics">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              forest: '#143d24',
              forestHover: '#0e2b19',
              sage: '#8ca891',
              sageLight: '#eef4ef',
              paleBg: '#f7f9f6',
              warmWhite: '#ffffff',
              gold: '#b88a38',
              goldLight: '#fdf7e7',
              borderSubtle: '#e2e9e2',
            }
          },
          fontFamily: {
            serif: ['Lora', 'Georgia', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
    }
    body {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      background-color: #f7f9f6;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      color: #1a2e21;
      -webkit-font-smoothing: antialiased;
    }
    /* Root application container constraints */
    .app-root-layout {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow-x: hidden;
    }
    .app-sidebar-container {
      flex-shrink: 0;
    }
    .app-main-content-wrapper {
      flex: 1 1 0%;
      min-width: 0;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    @media (min-width: 768px) {
      .app-sidebar-container {
        width: 14rem; /* 224px (w-56) */
      }
      .app-main-content-wrapper {
        width: calc(100% - 14rem);
        max-width: calc(100% - 14rem);
      }
    }
    @media (min-width: 1024px) {
      .app-sidebar-container {
        width: 16rem; /* 256px (w-64) */
      }
      .app-main-content-wrapper {
        width: calc(100% - 16rem);
        max-width: calc(100% - 16rem);
      }
    }

    /* Universal grid and flex child shrinkage rules to prevent right-edge expansion */
    .grid > *, [class*="grid-cols-"] > * {
      min-width: 0;
      max-width: 100%;
    }
    .flex > * {
      min-width: 0;
    }
    /* Ensure all cards, tables, charts stay strictly within boundaries */
    table {
      max-width: 100%;
    }
    canvas {
      max-width: 100% !important;
    }
    .card-shadow, [class*="rounded-xl"], [class*="rounded-2xl"], section {
      max-width: 100%;
      box-sizing: border-box;
    }
    .serif-title {
      font-family: 'Lora', Georgia, serif;
    }
    .card-shadow {
      box-shadow: 0 1px 3px rgba(20, 61, 36, 0.04), 0 4px 12px rgba(20, 61, 36, 0.03);
    }
    .no-scrollbar::-webkit-scrollbar,
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar,
    .scrollbar-none {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    @media print {
      body * {
        visibility: hidden;
      }
      #printable-report-content, #printable-report-content * {
        visibility: visible;
      }
      #printable-report-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 20px;
      }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-brand-paleBg w-full max-w-full overflow-x-hidden font-sans">
  <div id="app-root" class="app-root-layout flex-1 flex flex-col md:flex-row min-h-screen w-full max-w-full overflow-x-hidden font-sans">
    <!-- Dynamic Role-Based Sidebar (Desktop) -->
    <div class="app-sidebar-container hidden md:block shrink-0">
      ${renderDesktopSidebarHtml()}
    </div>

    <!-- Main Content Area -->
    <div class="app-main-content-wrapper flex flex-col min-w-0">
      <!-- Master Top Header Bar with Role Switcher & Live Mandi Ticker -->
      ${renderHeaderHtml()}

      <!-- Primary Viewport Container -->
      <main class="flex-1 p-3.5 sm:p-4 md:p-6 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6 min-w-0 box-border">
        <!-- Farmer Workspace (13 Tabs) -->
        ${renderFarmerWorkspaceHtml()}

        <!-- Community / FPO Workspace (7 Tabs) -->
        ${renderFpoWorkspaceHtml()}

        <!-- Lender / Bank Workspace (10 Tabs) -->
        ${renderLenderWorkspaceHtml()}
      </main>
    </div>
  </div>

  <!-- Mobile Off-Canvas Sidebar Drawer & Backdrop -->
  ${renderMobileDrawerHtml()}

  <!-- Master Login & Auth Overlay -->
  ${renderLoginHtml()}

  <!-- Master Modals & Live Drawers -->
  ${renderModalsHtml()}

  <!-- Client-Side Realtime & State Engine -->
  ${renderClientScript()}
</body>
</html>`;
}
