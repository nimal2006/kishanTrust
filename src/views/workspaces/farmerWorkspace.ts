import { renderFarmerProfile14Html } from "../components/farmerProfile14Html.js";

// Farmer Workspace Views: 11 Dedicated Pages
export function renderFarmerWorkspaceHtml(): string {
  return `
  <!-- ========================================== -->
  <!-- TAB 1: FARMER OVERVIEW (Compact <= 1.5 Viewport Heights) -->
  <!-- ========================================== -->
  <section id="tab-farmer-overview" class="space-y-4 sm:space-y-5">
    <!-- Active Facility Notification Banner (if loan is sanctioned) -->
    <div id="farmer-sanction-banner" class="hidden"></div>

    <!-- 1. Compact Top Farmer Identity Strip -->
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-stone-200 dark:border-stone-800">
        <!-- Identity & Status -->
        <div class="flex items-center gap-3">
          <div id="ov-avatar" class="w-10 h-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs shrink-0">
            RK
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2.5 flex-wrap">
              <h2 id="ov-farmer-name" class="serif-title text-lg sm:text-xl font-bold text-brand-forest">Ramesh Kumar</h2>
              <span id="ov-ref-badge" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-paleBg border border-brand-borderSubtle text-gray-700">KT-TN-THIRU-0104</span>
              <span id="ov-verif-badge" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ FPO Verified
              </span>
            </div>
            <p id="ov-farmer-meta" class="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Nemam Village, Thiruvallur, Tamil Nadu · Thiruvallur Agro Collective Member · 3.5 Acres
            </p>
          </div>
        </div>

        <!-- Quick Primary Actions -->
        <div class="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button onclick="switchTab('farmer-stresstest')" class="h-9 px-4 bg-brand-forest text-white rounded-lg text-xs font-semibold hover:bg-brand-forestHover transition shadow-xs flex items-center justify-center gap-1 w-full sm:w-auto">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Run Stress Test</span>
          </button>
          <button onclick="switchTab('farmer-simulator')" class="h-9 px-4 bg-white border border-brand-borderSubtle text-brand-forest rounded-lg text-xs font-semibold hover:bg-brand-sageLight transition flex items-center justify-center w-full sm:w-auto">
            Simulator
          </button>
        </div>
      </div>
    </div>

    <!-- 2. CORE FINANCIAL DECISION STRIP (Section 4 & 11: Compact 5-KPI Grid) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full my-4">
      <!-- KPI 1: Requested Credit -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow min-h-[105px] flex flex-col justify-between">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Requested Credit</span>
        <p id="sum-requested" class="text-xl font-bold tracking-tight text-stone-900 dark:text-white font-mono my-1">₹2,00,000</p>
        <span class="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug block truncate">Working Capital</span>
      </div>

      <!-- KPI 2: Recommended Safe Range -->
      <div class="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 card-shadow min-h-[105px] flex flex-col justify-between">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Recommended</span>
        <p id="sum-recommended" class="text-xl font-bold tracking-tight text-stone-900 dark:text-white font-mono my-1 truncate">₹1,20,000 – ₹1,40,000</p>
        <span class="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug block truncate">Stress-Tested Safe Ceiling</span>
      </div>

      <!-- KPI 3: Repayment Capacity -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow min-h-[105px] flex flex-col justify-between">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Repayment Capacity</span>
        <p id="sum-repayment" class="text-xl font-bold tracking-tight text-brand-forest font-mono my-1">₹65,000</p>
        <span class="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug block truncate">Downside Stressed Buffer</span>
      </div>

      <!-- KPI 4: Agricultural Risk -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow min-h-[105px] flex flex-col justify-between">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Agricultural Risk</span>
        <div class="flex items-center gap-1.5 my-1">
          <span id="sum-risk-dot" class="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
          <p id="sum-risk" class="text-xl font-bold tracking-tight text-stone-900 dark:text-white font-mono">Moderate</p>
        </div>
        <span id="sum-risk-sub" class="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug block truncate">Price Glut Sensitivity</span>
      </div>

      <!-- KPI 5: Evidence Confidence -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow min-h-[105px] flex flex-col justify-between col-span-2 sm:col-span-1">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">Evidence Confidence</span>
        <p id="sum-confidence" class="text-xl font-bold tracking-tight text-emerald-700 font-mono my-1">88%</p>
        <span id="sum-confidence-sub" class="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug block truncate">4 of 4 Claims Verified</span>
      </div>
    </div>

    <!-- 3. CURRENT CROP PLAN & WHY THIS RECOMMENDATION (2-Column Desktop, 1-Column Mobile) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
      <!-- Left (7 Cols): Current Crop Plan Summary -->
      <div class="lg:col-span-7 bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center justify-between border-b border-brand-borderSubtle pb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-base">🌾</span>
            <h3 class="text-base font-semibold text-stone-800 dark:text-stone-100">Current Season Crop Plan</h3>
          </div>
          <button onclick="switchTab('farmer-planner')" class="text-xs text-brand-forest font-semibold hover:underline">
            Edit Crop Plan →
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Crop & Variety</span>
            <p id="c-crop" class="font-bold text-gray-900 mt-0.5">Paddy (Samba)</p>
            <span class="text-[10px] text-gray-500">ADT-53 Certified</span>
          </div>
          <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Cultivated Area</span>
            <p id="c-area" class="font-bold text-gray-900 mt-0.5">3.5 Acres</p>
            <span class="text-[10px] text-emerald-700 font-semibold">Patta Verified ✓</span>
          </div>
          <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Harvest Window</span>
            <p class="font-bold text-gray-900 mt-0.5">Nov 20 – Dec 10</p>
            <span class="text-[10px] text-gray-500">Kharif Cycle</span>
          </div>
          <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Cultivation Cost</span>
            <p id="c-cost" class="font-bold text-gray-900 mt-0.5">₹68,000</p>
            <span class="text-[10px] text-gray-500">₹19,428 / Acre</span>
          </div>
        </div>

        <!-- Expected Financial Outcome Row -->
        <div class="grid grid-cols-3 gap-2.5 pt-1 text-xs">
          <div class="p-2 rounded-lg bg-gray-50 border">
            <span class="text-[10px] text-gray-500 block">Expected Production</span>
            <span id="c-yield" class="font-bold text-gray-800 font-mono">85 Quintals</span>
          </div>
          <div class="p-2 rounded-lg bg-gray-50 border">
            <span class="text-[10px] text-gray-500 block">Expected Revenue</span>
            <span id="c-revenue" class="font-bold text-emerald-800 font-mono">₹2,08,250</span>
          </div>
          <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <span class="text-[10px] text-emerald-800 font-semibold block">Expected Net Surplus</span>
            <span id="c-net" class="font-bold text-emerald-900 font-mono">₹1,40,250</span>
          </div>
        </div>
      </div>

      <!-- Right (5 Cols): Why This Recommendation? (Compact Section 4) -->
      <div class="lg:col-span-5 bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex flex-col justify-between space-y-3">
        <div>
          <div class="flex items-center justify-between border-b border-brand-borderSubtle pb-2.5">
            <div class="flex items-center gap-1.5">
              <span class="text-base">💡</span>
              <h3 class="text-base font-semibold text-stone-800 dark:text-stone-100">Why This Recommendation?</h3>
            </div>
            <span class="text-[11px] font-bold text-brand-gold uppercase tracking-wider">Top 4 Factors</span>
          </div>

          <ul class="space-y-2 text-xs text-gray-700 mt-2.5" id="ov-why-factors">
            <li class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold shrink-0">✓</span>
              <span><strong>FPO Verified Yield:</strong> Sowing inspection & patta land title verified with 88% confidence.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold shrink-0">✓</span>
              <span><strong>Cultivation Cost Benchmark:</strong> ₹68,000 seasonal input requirement aligns with NHB standards.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-600 font-bold shrink-0">⚠️</span>
              <span><strong>Downside Stress Capped:</strong> At -25% price and -20% yield crash, ₹2.0L loan creates repayment distress.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-brand-forest font-bold shrink-0">ℹ️</span>
              <span><strong>Safe Credit Ceiling:</strong> ₹1.20L–₹1.40L preserves ₹65,000 cash buffer for family subsistence.</span>
            </li>
          </ul>
        </div>

        <button onclick="openWhyDrawer()" class="w-full py-2 bg-brand-paleBg hover:bg-brand-sageLight border border-brand-borderSubtle rounded-lg text-brand-forest font-semibold text-xs transition flex items-center justify-center gap-1.5">
          <span>View Full Explainability Dossier</span>
          <span class="text-xs">→</span>
        </button>
      </div>
    </div>

    <!-- 4. NEXT ACTIONS & QUICK ACCESS STRIP -->
    <div class="bg-brand-paleBg rounded-xl p-3.5 sm:p-4 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[10px] uppercase font-bold text-brand-gold tracking-wider block">Recommended Next Steps</span>
          <p class="text-xs font-semibold text-gray-800 mt-0.5">Explore scenario simulations and evidence verification</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button onclick="switchTab('farmer-stresstest')" class="px-3 py-1.5 bg-brand-forest text-white rounded-lg text-xs font-semibold hover:bg-brand-forestHover transition shadow-xs">
            1. Run Stress Test Matrix →
          </button>
          <button onclick="switchTab('farmer-simulator')" class="px-3 py-1.5 bg-white border border-brand-borderSubtle text-brand-forest rounded-lg text-xs font-semibold hover:bg-white transition">
            2. Open What-If Simulator →
          </button>
          <button onclick="switchTab('farmer-readiness')" class="px-3 py-1.5 bg-white border border-brand-borderSubtle text-brand-forest rounded-lg text-xs font-semibold hover:bg-white transition">
            3. Credit Readiness →
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden elements for backward compatibility with clientScript queries -->
    <div class="hidden" id="legacy-overview-store">
      <span id="c-req">₹2,00,000</span>
      <span id="c-rec">₹1.2L – ₹1.4L</span>
      <span id="c-rep-cap">₹65,000</span>
      <span id="c-risk-label">Moderate</span>
      <span id="c-conf-pct">88% Verified</span>
      <span id="q-grow">Samba Paddy</span>
      <span id="q-cost">₹68,000</span>
      <span id="q-borrow">₹2,00,000</span>
      <span id="q-safe">₹1,20,000 – ₹1,40,000</span>
      <span id="q-earn">₹2,08,250</span>
      <span id="q-wrong">Peak arrival glut</span>
      <span id="q-why">Stressed net surplus</span>
      <span id="q-verified">Patta title, FPO inspection</span>
      <span id="q-improve">Register PMFBY policy</span>
      <span id="ov-evidence-score">88% (High)</span>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 2: MY PROFILE & 14-SECTION FARMER MASTER -->
  <!-- ========================================== -->
  ${renderFarmerProfile14Html()}

  <!-- ========================================== -->
  <!-- TAB 3: CROP & LOAN PLAN (Multi-Step Stepper + Live Summary Panel) -->
  <!-- ========================================== -->
  <section id="tab-farmer-planner" class="hidden space-y-5">
    <!-- Stepper Navigation Header -->
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-borderSubtle pb-3">
        <div>
          <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Crop & Agricultural Loan Planner</h2>
          <p class="text-xs text-gray-500">Plan crop cycle inputs, financing schedule, and verify loan purpose alignment.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-gray-500" id="planner-step-indicator">Step 1 of 7</span>
        </div>
      </div>

      <!-- 7-Step Stepper Tabs -->
      <div class="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-3 text-center" id="planner-stepper-bar">
        <button onclick="goToPlannerStep(1)" id="step-tab-1" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-bold bg-brand-forest text-white transition">
          1. Crop
        </button>
        <button onclick="goToPlannerStep(2)" id="step-tab-2" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          2. Land
        </button>
        <button onclick="goToPlannerStep(3)" id="step-tab-3" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          3. Cycle
        </button>
        <button onclick="goToPlannerStep(4)" id="step-tab-4" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          4. Costs
        </button>
        <button onclick="goToPlannerStep(5)" id="step-tab-5" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          5. Loan
        </button>
        <button onclick="goToPlannerStep(6)" id="step-tab-6" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          6. Purpose
        </button>
        <button onclick="goToPlannerStep(7)" id="step-tab-7" class="planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition">
          7. Evidence
        </button>
      </div>
    </div>

    <!-- Stepper Workspace: Left Form (8 Cols) vs Right Live Summary (4 Cols) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Left Form Content (Step 1 through 7) -->
      <div class="lg:col-span-8 bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow">
        <form id="crop-planner-form" onsubmit="event.preventDefault(); nextPlannerStep();" class="space-y-4 text-xs">
          <!-- Step 1: Crop -->
          <div id="planner-step-1" class="planner-step-content space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 1: Crop Selection & Variety</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Primary Crop</label>
                <select id="pln-crop" onchange="onPlannerCropChange()" class="w-full px-3 py-2 border rounded-lg bg-white font-semibold">
                  <option value="Paddy">Paddy (Samba / Rice)</option>
                  <option value="Tomato">Tomato (Hybrid)</option>
                  <option value="Groundnut">Groundnut (Pods)</option>
                  <option value="Soybean">Soybean (Yellow)</option>
                  <option value="Cotton">Cotton (Bt RCH-2)</option>
                  <option value="Pomegranate">Pomegranate (Bhagwa)</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-gray-700 mb-1">Crop Variety</label>
                <input type="text" id="pln-variety" value="ADT-53 / Ponni" class="w-full px-3 py-2 border rounded-lg">
              </div>
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Season</label>
              <select id="pln-season" class="w-full px-3 py-2 border rounded-lg bg-white">
                <option value="Kharif">Kharif (Monsoon Season)</option>
                <option value="Rabi">Rabi (Winter Season)</option>
                <option value="Zaid">Zaid (Summer Crop)</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Land -->
          <div id="planner-step-2" class="planner-step-content hidden space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 2: Land & Water Parameters</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Cultivated Land Area (Acres)</label>
                <input type="number" step="0.1" id="pln-area" value="3.5" oninput="recalcPlannerSummary()" class="w-full px-3 py-2 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block font-bold text-gray-700 mb-1">Land Ownership</label>
                <select id="pln-ownership" class="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="Owned">Owned (Freehold Title)</option>
                  <option value="Leased">Leased (Long Term)</option>
                  <option value="Shared">Sharecropper</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Irrigation Source</label>
                <select id="pln-irrigation" class="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="Borewell">Borewell (Solar Energized)</option>
                  <option value="Canal">Canal Ayacut</option>
                  <option value="Drip">Drip Micro-Irrigation</option>
                  <option value="Rainfed">Rain-fed</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-gray-700 mb-1">Soil Type</label>
                <input type="text" id="pln-soil" value="Fertile Clayey Alluvial Loam (pH 7.2)" class="w-full px-3 py-2 border rounded-lg">
              </div>
            </div>
          </div>

          <!-- Step 3: Crop Cycle -->
          <div id="planner-step-3" class="planner-step-content hidden space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 3: Crop Cycle & Harvesting Windows</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Sowing Date</label>
                <input type="date" id="pln-sowing" value="2026-07-15" class="w-full px-3 py-2 border rounded-lg">
              </div>
              <div>
                <label class="block font-bold text-gray-700 mb-1">Expected Harvest Date</label>
                <input type="date" id="pln-harvest" value="2026-11-20" class="w-full px-3 py-2 border rounded-lg">
              </div>
            </div>
            <div class="p-3 bg-brand-paleBg rounded-lg border text-gray-600">
              <span class="font-bold text-brand-forest block mb-1">Cycle Duration: 128 Days</span>
              Repayment schedule will be synchronised with marketing arrivals between Nov 25 and Dec 20, 2026.
            </div>
          </div>

          <!-- Step 4: Costs -->
          <div id="planner-step-4" class="planner-step-content hidden space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 4: Cultivation Cost Breakdown</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Seeds (₹)</label>
                <input type="number" id="pln-cost-seeds" value="9500" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Fertilizers (₹)</label>
                <input type="number" id="pln-cost-fert" value="18500" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Labour (₹)</label>
                <input type="number" id="pln-cost-labour" value="26000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Machinery (₹)</label>
                <input type="number" id="pln-cost-mach" value="14000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
            </div>
            <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex justify-between items-center">
              <span class="font-bold text-emerald-900">Total Cultivation Cost:</span>
              <span id="pln-total-cost-disp" class="font-serif font-bold text-emerald-950 text-sm">₹68,000</span>
            </div>
          </div>

          <!-- Step 5: Loan -->
          <div id="planner-step-5" class="planner-step-content hidden space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 5: Requested Credit & Facility Terms</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-gray-700 mb-1">Requested Loan Amount (₹)</label>
                <input type="number" id="pln-loan-req" value="200000" oninput="recalcPlannerSummary()" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-brand-forest text-sm">
              </div>
              <div>
                <label class="block font-bold text-gray-700 mb-1">Expected Repayment Date</label>
                <input type="date" id="pln-repay-date" value="2026-12-31" class="w-full px-3 py-2 border rounded-lg">
              </div>
            </div>
          </div>

          <!-- Step 6: Purpose -->
          <div id="planner-step-6" class="planner-step-content hidden space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-borderSubtle pb-2.5">
              <div>
                <h3 class="font-bold text-sm text-brand-forest">Step 6: Loan Purpose Breakdown & Agricultural Requirement Verification</h3>
                <p class="text-[11px] text-gray-500">Itemize credit allocation across crop cycle inputs and capital investments.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-gray-500">Allocated Sum:</span>
                <span id="purpose-sum-val" class="px-2.5 py-0.5 rounded-md bg-brand-forest text-white font-mono font-bold text-xs">₹2,00,000</span>
              </div>
            </div>

            <!-- 9 Detailed Purpose Inputs (Section 13 Requirement) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">1. Seeds & Foundation Stock (₹)</label>
                <input type="number" id="pur-seeds" value="9500" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">2. Fertilizer & Bio-Inputs (₹)</label>
                <input type="number" id="pur-fert" value="18500" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">3. Field & Harvest Labour (₹)</label>
                <input type="number" id="pur-labour" value="26000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">4. Irrigation & Borewell (₹)</label>
                <input type="number" id="pur-irrigation" value="8000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">5. Crop Protection & Pesticides (₹)</label>
                <input type="number" id="pur-pesticides" value="6000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">6. Machinery & Harvester (₹)</label>
                <input type="number" id="pur-equip" value="14000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">7. Storage & Warehousing (₹)</label>
                <input type="number" id="pur-storage" value="4000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">8. Post-Harvest Transport (₹)</label>
                <input type="number" id="pur-transport" value="2000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
              <div class="p-2.5 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
                <label class="block text-[11px] font-bold text-gray-700 mb-1">9. Capital Equipment / Buffer (₹)</label>
                <input type="number" id="pur-other" value="112000" oninput="recalcPlannerSummary()" class="w-full px-2.5 py-1.5 border border-brand-borderSubtle rounded-md bg-white font-mono">
              </div>
            </div>

            <!-- Comparison Metric Bar -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div class="p-3 bg-brand-paleBg rounded-lg border border-brand-borderSubtle">
                <span class="text-[10px] text-gray-500 uppercase font-bold block">Estimated Crop Requirement</span>
                <span class="font-mono font-bold text-gray-900 text-sm">₹68,000</span>
                <span class="text-[10px] text-gray-500 block mt-0.5">Direct seasonal cultivation inputs for 3.5 Acres</span>
              </div>
              <div class="p-3 bg-brand-paleBg rounded-lg border border-brand-borderSubtle">
                <span class="text-[10px] text-gray-500 uppercase font-bold block">Total Requested Credit</span>
                <span class="font-mono font-bold text-brand-forest text-sm">₹2,00,000</span>
                <span class="text-[10px] text-amber-700 font-semibold block mt-0.5">Includes ₹1,32,000 non-crop capital allocation</span>
              </div>
            </div>

            <!-- Purpose Mismatch Intelligence Alert -->
            <div id="planner-mismatch-banner" class="p-3 rounded-lg border bg-amber-50 border-amber-200 text-amber-900 space-y-1">
              <div class="flex items-center gap-1.5 font-bold">
                <span>⚠️</span>
                <span>Purpose Mismatch Detected</span>
              </div>
              <p class="text-[11px] leading-relaxed">
                Requested credit (₹2,00,000) exceeds estimated crop cultivation cost (₹68,000) by ₹1,32,000 (194%). The system flags this difference for review. Note: The loan is not automatically rejected; non-crop allocations (equipment, storage, farm assets) require supporting invoices or FPO asset verification.
              </p>
            </div>
          </div>

          <!-- Step 7: Evidence -->
          <div id="planner-step-7" class="planner-step-content hidden space-y-3">
            <h3 class="font-bold text-sm text-brand-forest">Step 7: Supporting Agricultural Evidence</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 p-2.5 rounded-lg border bg-brand-paleBg cursor-pointer">
                <input type="checkbox" checked class="rounded text-brand-forest">
                <span>Patta / Chitta Land Title #1042/3A (3.5 Acres, verified)</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg border bg-brand-paleBg cursor-pointer">
                <input type="checkbox" checked class="rounded text-brand-forest">
                <span>FPO Sowing & Geo-tagged Field Inspection Report</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg border bg-brand-paleBg cursor-pointer">
                <input type="checkbox" checked class="rounded text-brand-forest">
                <span>PACS Primary Credit Society No-Dues Certificate</span>
              </label>
              <label class="flex items-center gap-2 p-2.5 rounded-lg border bg-brand-paleBg cursor-pointer">
                <input type="checkbox" checked class="rounded text-brand-forest">
                <span>APMC Mandi e-NAM Sale Invoices (Previous Seasons)</span>
              </label>
            </div>
          </div>

          <!-- Stepper Action Buttons -->
          <div class="pt-4 border-t border-brand-borderSubtle flex items-center justify-between">
            <button type="button" onclick="prevPlannerStep()" id="btn-planner-prev" class="px-4 py-2 border border-brand-borderSubtle rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40" disabled>
              ← Back
            </button>
            <div class="flex items-center gap-2">
              <button type="button" onclick="savePlannerDraft()" class="px-3 py-2 text-brand-forest font-semibold hover:underline">
                Save Draft
              </button>
              <button type="button" onclick="nextPlannerStep()" id="btn-planner-next" class="px-5 py-2 bg-brand-forest text-white rounded-lg font-bold hover:bg-brand-forestHover transition shadow-xs">
                Continue →
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Right (4 Cols): Live Summary & Diagnostic Panel -->
      <div class="lg:col-span-4 bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="border-b border-brand-borderSubtle pb-3">
          <h3 class="serif-title text-sm font-bold text-brand-forest">Plan Summary & Diagnostics</h3>
          <p class="text-[11px] text-gray-500">Live deterministic financial projections</p>
        </div>

        <div class="space-y-2.5 text-xs">
          <div class="flex justify-between p-2 rounded bg-brand-paleBg">
            <span class="text-gray-500">Crop & Area:</span>
            <span id="sum-crop-area" class="font-bold text-gray-800">Paddy · 3.5 Ac</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg">
            <span class="text-gray-500">Estimated Cost:</span>
            <span id="sum-cost-val" class="font-bold text-gray-800 font-mono">₹68,000</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg">
            <span class="text-gray-500">Requested Loan:</span>
            <span id="sum-req-val" class="font-bold text-brand-forest font-mono">₹2,00,000</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-emerald-50 border border-emerald-200">
            <span class="text-emerald-800 font-bold">Recommended Ceiling:</span>
            <span id="sum-rec-val" class="font-bold text-emerald-950 font-mono">₹1,20,000 – ₹1,40,000</span>
          </div>
        </div>

        <div class="p-3 bg-brand-paleBg rounded-xl border space-y-1.5 text-xs">
          <span class="text-[10px] uppercase font-bold text-gray-500 block">Repayment Buffer Check</span>
          <p class="text-gray-700">Expected harvest revenue of <strong>₹2,08,250</strong> supports ₹1,20,000–₹1,40,000 borrowing with downside protection.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 4: MARKET INTELLIGENCE (AGMARKNET Live Mandi Trends) -->
  <!-- ========================================== -->
  <section id="tab-farmer-market" class="hidden space-y-4 sm:space-y-5">
    <!-- STICKY DECISION BAR -->
    <div class="sticky top-14 z-10 bg-white/95 backdrop-blur-xs border border-brand-borderSubtle rounded-xl p-3 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 font-medium">
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Requested</span><strong class="font-mono text-gray-900">₹2.0L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-emerald-800 uppercase text-[9px] font-bold block">Recommended</span><strong class="font-mono text-emerald-900">₹1.2L–₹1.4L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Risk</span><strong class="text-amber-700">Moderate</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Repayment Buffer</span><strong class="font-mono text-brand-forest">₹65K</strong></div>
      </div>
      <button onclick="switchTab('farmer-stresstest')" class="px-3.5 py-1.5 bg-brand-forest text-white rounded-lg font-bold hover:bg-brand-forestHover transition shadow-xs">
        Run Stress Test →
      </button>
    </div>

    <!-- Header with Source Status -->
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-lg">📈</span>
          <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Market Intelligence & Price Volatility</h2>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Live AGMARKNET Feed
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-0.5">Regulated APMC wholesale prices, modal trends, and harvest arrival projections.</p>
      </div>

      <!-- Price 3-Way Clarity Pills -->
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <div class="px-2.5 py-1 rounded-lg bg-gray-100 border">
          <span class="text-[9px] text-gray-500 block uppercase">Current Mandi</span>
          <span class="font-bold text-gray-900 font-mono">₹2,450 / qtl</span>
        </div>
        <div class="px-2.5 py-1 rounded-lg bg-gray-100 border">
          <span class="text-[9px] text-gray-500 block uppercase">3-Yr Range</span>
          <span class="font-bold text-gray-800 font-mono">₹1,950 – ₹2,600</span>
        </div>
        <div class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
          <span class="text-[9px] text-emerald-800 font-bold block uppercase">Expected Harvest</span>
          <span class="font-bold text-emerald-950 font-mono">₹2,450 / qtl</span>
        </div>
      </div>
    </div>

    <!-- Deterministic Price Rule Warning Callout -->
    <div class="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs flex items-start gap-2.5 text-amber-900">
      <span class="text-base shrink-0 mt-0.5">⚠️</span>
      <div>
        <strong class="font-bold block">Deterministic Risk Rule: Do Not Rely on Peak Spot Prices</strong>
        <p class="text-[11px] text-amber-800 leading-relaxed mt-0.5">
          Agricultural credit underwritings must never peg loan serviceability to today's peak spot market prices. Historical mandi arrival gluts during peak harvest windows (Nov–Dec) depress spot prices by 15%–25%. The platform models downside stress scenarios to ensure solvency.
        </p>
      </div>
    </div>

    <!-- Responsive Chart & Mandi Table Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- Chart: 6-Month Mandi Modal Price Trend (8 Cols) -->
      <div class="lg:col-span-8 bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center justify-between border-b border-brand-borderSubtle pb-2">
          <h3 class="serif-title text-sm font-bold text-brand-forest">Historical Mandi Modal Price Trend (6 Months)</h3>
          <span class="text-[11px] text-gray-500">Thiruvallur APMC Market</span>
        </div>
        <div class="relative w-full h-64 sm:h-72">
          <canvas id="market-trend-canvas" class="w-full h-full"></canvas>
        </div>
        <div class="flex items-center justify-between text-[11px] text-gray-500 pt-1">
          <span>Source: Ministry of Agriculture & Farmers Welfare (AGMARKNET)</span>
          <span class="font-mono">Updated: Today, 07:30 AM</span>
        </div>
      </div>

      <!-- Right: Real-time Arrivals & Volatility Table (4 Cols) -->
      <div class="lg:col-span-4 bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="border-b border-brand-borderSubtle pb-2">
          <h3 class="serif-title text-sm font-bold text-brand-forest">Active APMC Mandis</h3>
          <p class="text-[11px] text-gray-500">Benchmark comparison</p>
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-2.5 rounded-lg border bg-brand-paleBg flex justify-between items-center">
            <div>
              <span class="font-bold text-gray-900 block">Thiruvallur APMC</span>
              <span class="text-[10px] text-gray-500">Paddy (Samba) · 450 qtl/day</span>
            </div>
            <div class="text-right">
              <span class="font-mono font-bold text-emerald-800">₹2,450</span>
              <span class="text-[10px] text-emerald-600 block font-bold">▲ +1.8%</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg border bg-brand-paleBg flex justify-between items-center">
            <div>
              <span class="font-bold text-gray-900 block">Tiruvannamalai</span>
              <span class="text-[10px] text-gray-500">Groundnut · 180 qtl/day</span>
            </div>
            <div class="text-right">
              <span class="font-mono font-bold text-emerald-800">₹6,400</span>
              <span class="text-[10px] text-emerald-600 block font-bold">▲ +0.5%</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg border bg-brand-paleBg flex justify-between items-center">
            <div>
              <span class="font-bold text-gray-900 block">Nashik APMC</span>
              <span class="text-[10px] text-gray-500">Tomato · 1,200 qtl/day</span>
            </div>
            <div class="text-right">
              <span class="font-mono font-bold text-amber-800">₹1,650</span>
              <span class="text-[10px] text-amber-600 block font-bold">▼ -3.2%</span>
            </div>
          </div>

          <div class="p-2.5 rounded-lg border bg-brand-paleBg flex justify-between items-center">
            <div>
              <span class="font-bold text-gray-900 block">Indore Mandi</span>
              <span class="text-[10px] text-gray-500">Soybean · 800 qtl/day</span>
            </div>
            <div class="text-right">
              <span class="font-mono font-bold text-emerald-800">₹4,600</span>
              <span class="text-[10px] text-emerald-600 block font-bold">▲ +0.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 5: CROP ECONOMICS ENGINE (Deterministic Model) -->
  <!-- ========================================== -->
  <section id="tab-farmer-economics" class="hidden space-y-4 sm:space-y-5">
    <!-- STICKY DECISION BAR -->
    <div class="sticky top-14 z-10 bg-white/95 backdrop-blur-xs border border-brand-borderSubtle rounded-xl p-3 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 font-medium">
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Requested</span><strong class="font-mono text-gray-900">₹2.0L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-emerald-800 uppercase text-[9px] font-bold block">Recommended</span><strong class="font-mono text-emerald-900">₹1.2L–₹1.4L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Risk</span><strong class="text-amber-700">Moderate</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Repayment Buffer</span><strong class="font-mono text-brand-forest">₹65K</strong></div>
      </div>
      <button onclick="switchTab('farmer-stresstest')" class="px-3.5 py-1.5 bg-brand-forest text-white rounded-lg font-bold hover:bg-brand-forestHover transition shadow-xs">
        Run Stress Test →
      </button>
    </div>

    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Crop Economics Engine</h2>
        <p class="text-xs text-gray-500">Explicit deterministic formula: Expected Revenue − Cultivation Cost = Net Farm Surplus</p>
      </div>
      <button onclick="openAssumptionsDrawer()" class="px-3.5 py-1.5 bg-brand-paleBg border border-brand-borderSubtle rounded-lg text-brand-forest font-semibold text-xs hover:bg-brand-sageLight transition">
        View Formulas & Assumptions 📐
      </button>
    </div>

    <!-- Price Scenario Cards (Low, Expected, High) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      <!-- Low Price Scenario -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center justify-between border-b pb-2">
          <span class="font-bold text-xs text-amber-800">DOWNSIDE (-25%)</span>
          <span class="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-mono">₹1,838 / qtl</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between text-gray-600">
            <span>Production:</span>
            <span class="font-mono">85 Quintals</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Gross Revenue:</span>
            <span class="font-mono font-bold">₹1,56,188</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Cultivation Cost:</span>
            <span class="font-mono">−₹68,000</span>
          </div>
          <div class="flex justify-between pt-2 border-t font-bold text-gray-900">
            <span>Net Farm Income:</span>
            <span class="font-mono text-amber-700">₹88,188</span>
          </div>
        </div>
      </div>

      <!-- Expected Price Scenario -->
      <div class="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 card-shadow space-y-3">
        <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
          <span class="font-bold text-xs text-emerald-950">EXPECTED (BASE)</span>
          <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono font-bold">₹2,450 / qtl</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between text-emerald-900">
            <span>Production:</span>
            <span class="font-mono">85 Quintals</span>
          </div>
          <div class="flex justify-between text-emerald-900">
            <span>Gross Revenue:</span>
            <span class="font-mono font-bold">₹2,08,250</span>
          </div>
          <div class="flex justify-between text-emerald-900">
            <span>Cultivation Cost:</span>
            <span class="font-mono">−₹68,000</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-emerald-200 font-bold text-emerald-950">
            <span>Net Farm Income:</span>
            <span class="font-mono text-emerald-800">₹1,40,250</span>
          </div>
        </div>
      </div>

      <!-- High Price Scenario -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center justify-between border-b pb-2">
          <span class="font-bold text-xs text-emerald-700">UPSIDE (+20%)</span>
          <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono">₹2,940 / qtl</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between text-gray-600">
            <span>Production:</span>
            <span class="font-mono">85 Quintals</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Gross Revenue:</span>
            <span class="font-mono font-bold">₹2,49,900</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Cultivation Cost:</span>
            <span class="font-mono">−₹68,000</span>
          </div>
          <div class="flex justify-between pt-2 border-t font-bold text-gray-900">
            <span>Net Farm Income:</span>
            <span class="font-mono text-emerald-700">₹1,81,900</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 6: STRESS TEST MATRIX (Dedicated Major Feature <= 1.5 Viewport Heights) -->
  <!-- ========================================== -->
  <section id="tab-farmer-stresstest" class="hidden space-y-4">
    <!-- STICKY DECISION BAR (Section 12 Requirement) -->
    <div class="sticky top-14 z-10 bg-white/95 backdrop-blur-xs border border-brand-borderSubtle rounded-xl p-3 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 font-medium">
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Requested</span><strong class="font-mono text-gray-900">₹2.0L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-emerald-800 uppercase text-[9px] font-bold block">Recommended</span><strong class="font-mono text-emerald-900">₹1.2L–₹1.4L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Risk</span><strong class="text-amber-700">Moderate</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Repayment Buffer</span><strong class="font-mono text-brand-forest">₹65K</strong></div>
      </div>
      <button onclick="runStressSimulation()" class="px-3.5 py-1.5 bg-brand-forest text-white rounded-lg font-bold hover:bg-brand-forestHover transition shadow-xs">
        Recalculate Stress Matrix
      </button>
    </div>

    <!-- Stress Matrix Header -->
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
        <div>
          <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Multi-Scenario Agricultural Stress Test</h2>
          <p class="text-xs text-gray-500">Simulates resilience against mandi price crashes and crop yield losses.</p>
        </div>
        <span class="text-[11px] font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
          Baseline: 85 Qtl @ ₹2,450/qtl
        </span>
      </div>

      <!-- Scenario Tabs / Matrix Table -->
      <div class="overflow-x-auto pt-3">
        <table class="w-full text-xs text-left" id="stress-matrix-table">
          <thead>
            <tr class="border-b bg-brand-paleBg text-gray-600 font-bold">
              <th class="p-2.5">Scenario</th>
              <th class="p-2.5">Price / Qtl</th>
              <th class="p-2.5">Yield (Qtl)</th>
              <th class="p-2.5">Gross Revenue</th>
              <th class="p-2.5">Cost</th>
              <th class="p-2.5">Net Surplus</th>
              <th class="p-2.5">Repayment Status</th>
              <th class="p-2.5">Risk Level</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="hover:bg-gray-50">
              <td class="p-2.5 font-bold text-gray-900">1. Normal (Baseline)</td>
              <td class="p-2.5 font-mono">₹2,450</td>
              <td class="p-2.5 font-mono">85</td>
              <td class="p-2.5 font-mono font-bold text-emerald-800">₹2,08,250</td>
              <td class="p-2.5 font-mono">₹68,000</td>
              <td class="p-2.5 font-mono font-bold text-emerald-800">₹1,40,250</td>
              <td class="p-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Full Repayment</span></td>
              <td class="p-2.5 text-emerald-700 font-bold">Low Risk</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="p-2.5 font-bold text-amber-900">2. Price Stress (−25%)</td>
              <td class="p-2.5 font-mono text-amber-700">₹1,838</td>
              <td class="p-2.5 font-mono">85</td>
              <td class="p-2.5 font-mono font-bold">₹1,56,188</td>
              <td class="p-2.5 font-mono">₹68,000</td>
              <td class="p-2.5 font-mono font-bold text-amber-700">₹88,188</td>
              <td class="p-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Manageable</span></td>
              <td class="p-2.5 text-amber-700 font-bold">Moderate</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="p-2.5 font-bold text-amber-900">3. Yield Stress (−20%)</td>
              <td class="p-2.5 font-mono">₹2,450</td>
              <td class="p-2.5 font-mono text-amber-700">68</td>
              <td class="p-2.5 font-mono font-bold">₹1,66,600</td>
              <td class="p-2.5 font-mono">₹68,000</td>
              <td class="p-2.5 font-mono font-bold text-amber-700">₹98,600</td>
              <td class="p-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Manageable</span></td>
              <td class="p-2.5 text-amber-700 font-bold">Moderate</td>
            </tr>
            <tr class="bg-red-50/60 font-medium">
              <td class="p-2.5 font-bold text-red-900">4. Combined Stress (−25% Price & −20% Yield)</td>
              <td class="p-2.5 font-mono text-red-700">₹1,838</td>
              <td class="p-2.5 font-mono text-red-700">68</td>
              <td class="p-2.5 font-mono font-bold text-red-900">₹1,24,950</td>
              <td class="p-2.5 font-mono">₹68,000</td>
              <td class="p-2.5 font-mono font-bold text-red-700">₹56,950</td>
              <td class="p-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">₹2L Loan Deficit</span></td>
              <td class="p-2.5 text-red-700 font-bold">High Risk</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 p-3 bg-brand-paleBg rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span class="font-bold text-brand-forest block">Why is ₹2,00,000 not recommended?</span>
          <p class="text-gray-600 mt-0.5">Under combined stress, net surplus falls to ₹56,950. Servicing ₹2,00,000 principal leaves negative cashflow.</p>
        </div>
        <div class="shrink-0">
          <span class="text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 block text-center">
            Safe Ceiling: ₹1,20,000
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 7: WHAT-IF SIMULATOR (2-Column Layout <= 1.5 Viewport Heights) -->
  <!-- ========================================== -->
  <section id="tab-farmer-simulator" class="hidden space-y-4">
    <!-- STICKY DECISION BAR -->
    <div class="sticky top-14 z-10 bg-white/95 backdrop-blur-xs border border-brand-borderSubtle rounded-xl p-3 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex flex-wrap items-center gap-3 font-medium">
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Requested</span><strong class="font-mono text-gray-900">₹2.0L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-emerald-800 uppercase text-[9px] font-bold block">Recommended</span><strong class="font-mono text-emerald-900">₹1.2L–₹1.4L</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Risk</span><strong class="text-amber-700">Moderate</strong></div>
        <div class="h-6 w-px bg-gray-200"></div>
        <div><span class="text-gray-500 uppercase text-[9px] font-bold block">Repayment Buffer</span><strong class="font-mono text-brand-forest">₹65K</strong></div>
      </div>
      <button onclick="switchTab('farmer-stresstest')" class="px-3.5 py-1.5 bg-brand-forest text-white rounded-lg font-bold hover:bg-brand-forestHover transition shadow-xs">
        Run Stress Test →
      </button>
    </div>

    <!-- Header -->
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Interactive What-If Scenario Simulator</h2>
        <p class="text-xs text-gray-500">Live dynamic recalculation of farm cashflow, debt coverage, and risk thresholds.</p>
      </div>

      <!-- Quick Preset Buttons (Section 19 Requirement) -->
      <div class="flex flex-wrap items-center gap-1.5 text-xs">
        <button onclick="applySimPreset('price-drop')" class="px-2.5 py-1 bg-brand-paleBg hover:bg-brand-sageLight border rounded-lg text-brand-forest font-semibold transition">
          Price −30%
        </button>
        <button onclick="applySimPreset('yield-drop')" class="px-2.5 py-1 bg-brand-paleBg hover:bg-brand-sageLight border rounded-lg text-brand-forest font-semibold transition">
          Yield −20%
        </button>
        <button onclick="applySimPreset('loan-1lakh')" class="px-2.5 py-1 bg-brand-paleBg hover:bg-brand-sageLight border rounded-lg text-brand-forest font-semibold transition">
          Borrow ₹1 Lakh
        </button>
        <button onclick="resetSimPreset()" class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border rounded-lg text-gray-700 font-semibold transition">
          Reset
        </button>
      </div>
    </div>

    <!-- 2-Column Grid: Left Inputs / Sliders (6 Cols), Right Live Output (6 Cols) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- Left (6 Cols): Interactive Inputs -->
      <div class="lg:col-span-6 bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4 text-xs">
        <h3 class="serif-title text-sm font-bold text-brand-forest border-b pb-2">Simulation Parameters</h3>

        <!-- Slider 1: Loan Amount -->
        <div class="space-y-1.5">
          <div class="flex justify-between">
            <label class="font-bold text-gray-700">Requested Loan Amount</label>
            <span id="sim-disp-loan" class="font-mono font-bold text-brand-forest">₹2,00,000</span>
          </div>
          <input type="range" min="50000" max="300000" step="10000" value="200000" id="sim-loan-input" oninput="onSimInputChange()" class="w-full accent-brand-forest">
          <div class="flex justify-between text-[10px] text-gray-400"><span>₹50,000</span><span>₹3,00,000</span></div>
        </div>

        <!-- Slider 2: Crop Harvest Price -->
        <div class="space-y-1.5">
          <div class="flex justify-between">
            <label class="font-bold text-gray-700">Crop Harvest Price (₹ / Qtl)</label>
            <span id="sim-disp-price" class="font-mono font-bold text-brand-forest">₹2,450</span>
          </div>
          <input type="range" min="1500" max="3200" step="50" value="2450" id="sim-price-input" oninput="onSimInputChange()" class="w-full accent-brand-forest">
          <div class="flex justify-between text-[10px] text-gray-400"><span>₹1,500</span><span>₹3,200</span></div>
        </div>

        <!-- Slider 3: Expected Production Yield -->
        <div class="space-y-1.5">
          <div class="flex justify-between">
            <label class="font-bold text-gray-700">Expected Production (Quintals)</label>
            <span id="sim-disp-yield" class="font-mono font-bold text-brand-forest">85 Qtl</span>
          </div>
          <input type="range" min="40" max="120" step="1" value="85" id="sim-yield-input" oninput="onSimInputChange()" class="w-full accent-brand-forest">
          <div class="flex justify-between text-[10px] text-gray-400"><span>40 Qtl</span><span>120 Qtl</span></div>
        </div>

        <!-- Slider 4: Cultivation Cost -->
        <div class="space-y-1.5">
          <div class="flex justify-between">
            <label class="font-bold text-gray-700">Cultivation Cost (₹)</label>
            <span id="sim-disp-cost" class="font-mono font-bold text-brand-forest">₹68,000</span>
          </div>
          <input type="range" min="40000" max="110000" step="2000" value="68000" id="sim-cost-input" oninput="onSimInputChange()" class="w-full accent-brand-forest">
          <div class="flex justify-between text-[10px] text-gray-400"><span>₹40,000</span><span>₹1,10,000</span></div>
        </div>
      </div>

      <!-- Right (6 Cols): Live Recalculated Output -->
      <div class="lg:col-span-6 bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4 text-xs">
        <h3 class="serif-title text-sm font-bold text-brand-forest border-b pb-2">Simulated Live Results</h3>

        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-brand-paleBg border">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Simulated Revenue</span>
            <p id="sim-res-revenue" class="serif-title text-lg font-bold text-emerald-800 mt-0.5">₹2,08,250</p>
          </div>
          <div class="p-3 rounded-lg bg-brand-paleBg border">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Net Farm Surplus</span>
            <p id="sim-res-net" class="serif-title text-lg font-bold text-emerald-800 mt-0.5">₹1,40,250</p>
          </div>
          <div class="p-3 rounded-lg bg-brand-paleBg border">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Repayment Capacity</span>
            <p id="sim-res-capacity" class="serif-title text-lg font-bold text-brand-forest mt-0.5">₹65,000</p>
          </div>
          <div class="p-3 rounded-lg bg-brand-paleBg border">
            <span class="text-[10px] text-gray-500 uppercase font-bold block">Risk Rating</span>
            <p id="sim-res-risk" class="serif-title text-lg font-bold text-amber-700 mt-0.5">Moderate</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
          <span class="text-[10px] uppercase font-bold text-emerald-900 block">Recommended Safe Credit Ceiling</span>
          <p id="sim-res-rec" class="serif-title text-xl font-bold text-emerald-950">₹1,20,000 – ₹1,40,000</p>
          <p id="sim-res-explanation" class="text-xs text-emerald-800 pt-1">
            Borrowing within this range provides a 1.45x Debt Service Coverage Ratio under simulated conditions.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 8: CREDIT READINESS (Evidence Completeness) -->
  <!-- ========================================== -->
  <section id="tab-farmer-readiness" class="hidden space-y-4">
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex justify-between items-center">
      <div>
        <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Credit Readiness & Evidence Completeness</h2>
        <p class="text-xs text-gray-500">Track verified documentation vs missing evidence. No artificial credit score claims.</p>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
        88% Evidence Completeness
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <!-- Verified Evidence List -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow space-y-3">
        <h3 class="font-bold text-emerald-800 flex items-center gap-1.5">
          <span>✓</span>
          <span>Verified Supporting Evidence</span>
        </h3>
        <ul class="space-y-2 text-gray-700" id="verified-evidence-list">
          <li class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <strong>Patta Land Title #1042/3A:</strong> 3.5 Acres verified via Tamil Nadu Nilam Portal (Govt).
          </li>
          <li class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <strong>FPO Field Inspection:</strong> Geo-tagged Samba Paddy sowing verification completed.
          </li>
          <li class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <strong>PACS No-Dues Certificate:</strong> Clean track record on primary society seasonal crop loans.
          </li>
        </ul>
      </div>

      <!-- Missing Evidence & Actionable Steps -->
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow space-y-3">
        <h3 class="font-bold text-amber-800 flex items-center gap-1.5">
          <span>⚠️</span>
          <span>Recommended Next Evidence Steps</span>
        </h3>
        <ul class="space-y-2 text-gray-700">
          <li class="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
            <strong>Crop Insurance (PMFBY):</strong> Upload Kharif enrollment receipt to mitigate weather risk.
          </li>
          <li class="p-2.5 rounded-lg bg-brand-paleBg border">
            <strong>Soil Health Card:</strong> Attach recent N-P-K soil testing report to validate input cost.
          </li>
          <li class="p-2.5 rounded-lg bg-brand-paleBg border">
            <strong>Bank Statement (6 Months):</strong> Link direct benefit transfer account for digital verification.
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 9: DATA & CONSENT (Farmer Sovereignty) -->
  <!-- ========================================== -->
  <section id="tab-farmer-consent" class="hidden space-y-4">
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Granular Data Sovereignty & Consent Management</h2>
        <p class="text-xs text-gray-500">You retain complete ownership over your farm data. Revoke or grant access at any time.</p>
      </div>
      <button onclick="openConsentDrawer()" class="px-3.5 py-1.5 bg-brand-paleBg border border-brand-borderSubtle rounded-lg text-brand-forest font-semibold text-xs hover:bg-brand-sageLight transition">
        View Consent Audit Trail 🔒
      </button>
    </div>

    <!-- Compact Consent Table (Desktop) / Cards (Mobile) -->
    <div class="bg-white rounded-xl border border-brand-borderSubtle card-shadow overflow-x-auto w-full max-w-full">
      <table class="w-full text-xs text-left">
        <thead>
          <tr class="bg-brand-paleBg border-b border-brand-borderSubtle text-gray-600 font-bold">
            <th class="p-3">Data Field</th>
            <th class="p-3 hidden sm:table-cell">Source</th>
            <th class="p-3">Shared With</th>
            <th class="p-3">Consent Status</th>
            <th class="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-gray-700" id="consent-table-body">
          <!-- Dynamically filled -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 10: FPO VERIFICATION STATUS -->
  <!-- ========================================== -->
  <section id="tab-farmer-fpo" class="hidden space-y-4">
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
      <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Community FPO Verification Profile</h2>
      <p class="text-xs text-gray-500">Thiruvallur Agro Collective Producer Co. · Certified Community Member</p>
    </div>
    <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
      <span class="font-bold block">✓ Community Appraisal Confirmed</span>
      <p>Your land acreage (3.5 Acres) and crop plan (Samba Paddy) have been verified by FPO Agronomist K. Soundararajan.</p>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 11: AUDIT REPORTS (Institutional Memorandum) -->
  <!-- ========================================== -->
  <section id="tab-farmer-reports" class="hidden space-y-4">
    <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow flex justify-between items-center">
      <div>
        <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Agricultural Credit Reports</h2>
        <p class="text-xs text-gray-500">Institutional credit memorandums for bank submissions.</p>
      </div>
      <button onclick="openReportModal()" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover transition shadow-xs">
        View & Print Memorandum →
      </button>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 12: AGRICULTURAL DATA (AGMARKNET & NHB BENCHMARKS) -->
  <!-- ========================================== -->
  <section id="tab-farmer-agri-data" class="hidden space-y-4 sm:space-y-6">
    <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Decoupled Agricultural Data Service</h2>
          <p class="text-xs text-gray-500 mt-0.5">AGMARKNET Mandi Price Feeds & NHB Standardized Cost Benchmarks</p>
        </div>
        <span class="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          Adapter Status: Live & Grounded
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-base">🌾</span>
          <h3 class="serif-title text-sm font-bold text-brand-forest">NHB Cost of Cultivation Benchmark</h3>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">Standard Paddy Cost / Acre:</span>
            <span class="font-bold font-mono text-gray-900">₹19,428</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">Farmer Sowing Budget (3.5 Ac):</span>
            <span class="font-bold font-mono text-emerald-800">₹68,000 (Within Benchmark)</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">Benchmark Source:</span>
            <span class="font-mono text-gray-700">NHB / CACP Cost of Cultivation Studies</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-base">📈</span>
          <h3 class="serif-title text-sm font-bold text-brand-forest">AGMARKNET APMC Price Calibration</h3>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">3-Year Modal Mandi Price:</span>
            <span class="font-bold font-mono text-gray-900">₹2,450 / Quintal</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">Conservative Downside Stressed Floor:</span>
            <span class="font-bold font-mono text-amber-800">₹1,838 / Quintal (-25%)</span>
          </div>
          <div class="flex justify-between p-2 rounded bg-brand-paleBg border">
            <span class="text-gray-600">Benchmark Market:</span>
            <span class="font-mono text-gray-700">Thiruvallur Regulated Market Committee</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 13: REPAYMENT PLANNER (Harvest-Pegged Cashflow) -->
  <!-- ========================================== -->
  <section id="tab-farmer-repayment" class="hidden space-y-4 sm:space-y-6">
    <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">Harvest-Pegged Repayment Schedule</h2>
          <p class="text-xs text-gray-500 mt-0.5">Synchronised single bullet repayment from crop realization. No monthly EMI distress.</p>
        </div>
        <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          Agricultural Cycle Aligned
        </span>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-4">
      <h3 class="serif-title text-sm font-bold text-brand-forest">Repayment Milestones</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div class="p-3 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
          <span class="text-[10px] uppercase font-bold text-gray-500 block">Tranche 1 Disbursal</span>
          <p class="font-bold text-gray-900 mt-1">July 15, 2026</p>
          <span class="text-[11px] text-gray-600 font-mono">₹60,000 (Seeds & Fertilizer)</span>
        </div>
        <div class="p-3 rounded-lg bg-brand-paleBg border border-brand-borderSubtle">
          <span class="text-[10px] uppercase font-bold text-gray-500 block">Tranche 2 Disbursal</span>
          <p class="font-bold text-gray-900 mt-1">October 25, 2026</p>
          <span class="text-[11px] text-gray-600 font-mono">₹70,000 (Harvest & Labour)</span>
        </div>
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <span class="text-[10px] uppercase font-bold text-emerald-900 block">Bullet Repayment Due</span>
          <p class="font-bold text-emerald-950 mt-1">December 20, 2026</p>
          <span class="text-[11px] text-emerald-800 font-mono font-bold">₹1,34,550 (Principal + Interest)</span>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-gray-50 border text-xs text-gray-600">
        <strong>Repayment Guarantee:</strong> Due date is pegged 30 days after peak Samba harvest, allowing complete drying, APMC weighment, and direct bank settlement without intermediate distress.
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 14: AI CREDIT ASSISTANT & KCC ADVISORY -->
  <!-- ========================================== -->
  <section id="tab-farmer-ai-assistant" class="hidden space-y-4 sm:space-y-6">
    <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl">🤖</span>
            <h2 class="serif-title text-base sm:text-lg font-bold text-brand-forest">AI Agricultural Credit & KCC Assistant</h2>
          </div>
          <p class="text-xs text-gray-500 mt-0.5">Interactive context-aware assistant powered by AGMARKNET market prices, KCC advisories, and stress test engines.</p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <label class="text-xs text-gray-600 font-medium">Language:</label>
          <select id="assistant-lang-select" class="px-2.5 py-1 text-xs border border-gray-300 rounded-lg bg-white font-medium">
            <option value="en" selected>English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Quick Assistant Prompts -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button onclick="askAssistantPrompt('Why is my safe credit limit set to ₹1,30,000 instead of ₹2,00,000?')" class="p-3 rounded-xl bg-white border border-brand-borderSubtle card-shadow hover:border-brand-forest hover:bg-brand-paleBg transition text-left space-y-1">
        <span class="text-xs font-bold text-brand-forest block">💰 Loan Limit Explanation</span>
        <p class="text-[11px] text-gray-600">"Why is my safe credit limit set to ₹1,30,000 instead of ₹2,00,000?"</p>
      </button>

      <button onclick="askAssistantPrompt('How can I improve my evidence confidence score to get higher credit?')" class="p-3 rounded-xl bg-white border border-brand-borderSubtle card-shadow hover:border-brand-forest hover:bg-brand-paleBg transition text-left space-y-1">
        <span class="text-xs font-bold text-brand-forest block">📈 Evidence & Trust Guidance</span>
        <p class="text-[11px] text-gray-600">"How can I improve my evidence confidence score to get higher credit?"</p>
      </button>

      <button onclick="askAssistantPrompt('What are the Kisan Call Centre pest advisories for Samba Paddy?')" class="p-3 rounded-xl bg-white border border-brand-borderSubtle card-shadow hover:border-brand-forest hover:bg-brand-paleBg transition text-left space-y-1">
        <span class="text-xs font-bold text-brand-forest block">🌾 KCC Crop Advisory</span>
        <p class="text-[11px] text-gray-600">"What are the Kisan Call Centre pest advisories for Samba Paddy?"</p>
      </button>
    </div>

    <!-- Interactive Chat Console -->
    <div class="bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-4">
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="serif-title text-sm font-bold text-gray-800">Ask the AI Assistant</h3>
        <button onclick="triggerAICreditEvaluation()" class="px-3 py-1 bg-brand-forest text-white text-xs rounded-lg font-bold hover:bg-brand-forestHover transition">
          ⚡ Run Full AI Credit Evaluation
        </button>
      </div>

      <!-- Chat Response Box -->
      <div id="ai-assistant-output-container" class="min-h-[140px] p-4 rounded-xl bg-brand-paleBg/60 border border-brand-borderSubtle text-xs space-y-3">
        <p class="text-gray-500 italic">Select a sample prompt above or enter a custom question below to consult the AI Agricultural Assistant.</p>
      </div>

      <!-- Custom Question Form -->
      <form onsubmit="handleAssistantSubmit(event)" class="flex gap-2">
        <input id="ai-assistant-input" type="text" placeholder="Type your query (e.g. How does market price drop affect my loan?)..." class="flex-1 px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-forest focus:outline-none" required />
        <button type="submit" class="px-4 py-2 bg-brand-forest text-white font-semibold text-xs rounded-lg hover:bg-brand-forestHover transition shrink-0">
          Ask Assistant
        </button>
      </form>
    </div>

    <!-- AI Evaluation Card (Populated dynamically on trigger) -->
    <div id="ai-credit-evaluation-card" class="hidden bg-white rounded-xl p-4 sm:p-5 border border-brand-borderSubtle card-shadow space-y-4">
    </div>
  </section>
  `;
}
