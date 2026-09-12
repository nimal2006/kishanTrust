// Lender / Bank Underwriting Workspace: 10 Operational Tabs
export function renderLenderWorkspaceHtml(): string {
  return `
  <!-- ========================================== -->
  <!-- TAB 1: LENDING OVERVIEW & PORTFOLIO METRICS -->
  <!-- ========================================== -->
  <section id="tab-lender-overview" class="space-y-6">
    <!-- Top Desk Header Banner -->
    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
            🏛️
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="serif-title text-xl sm:text-2xl font-bold text-brand-forest">Institutional Underwriting & Lending Desk</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-paleBg border text-gray-700">NABARD-KCC-DESK</span>
            </div>
            <p class="text-xs text-gray-600 mt-1">
              Deterministic Agricultural Credit Planning · Future Crop Economics Engine · PS2 Credit Network
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchTab('lender-pipeline')" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-semibold hover:bg-brand-forestHover transition flex items-center gap-1.5 shadow-xs">
            <span>View Active Pipeline</span>
            <span class="px-1.5 py-0.2 rounded-full bg-emerald-700 text-[10px] font-bold">3</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Institutional KPI Strip (Section 19 Requirement) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Total Applications</span>
        <p class="serif-title text-xl font-bold text-gray-900 mt-1">3 Active</p>
        <span class="text-[10px] text-gray-500 mt-0.5 block">Total Requested: ₹6.0L</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Pending Review</span>
        <p class="serif-title text-xl font-bold text-amber-700 mt-1">1 File</p>
        <span class="text-[10px] text-amber-600 mt-0.5 block">Needs Evidence</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Medium Risk Files</span>
        <p class="serif-title text-xl font-bold text-gray-900 mt-1">1 File</p>
        <span class="text-[10px] text-gray-500 mt-0.5 block">Ramesh Kumar (Paddy)</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">High Risk / Volatile</span>
        <p class="serif-title text-xl font-bold text-red-700 mt-1">1 File</p>
        <span class="text-[10px] text-red-600 mt-0.5 block">Rajendra Patil (Tomato)</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow col-span-2 sm:col-span-1">
        <span class="text-[10px] uppercase font-bold text-emerald-900 block">Avg Recommended</span>
        <p class="serif-title text-xl font-bold text-brand-forest mt-1">₹1,28,000</p>
        <span class="text-[10px] text-emerald-700 mt-0.5 block">Downside Stressed Cap</span>
      </div>
    </div>

    <!-- Quick Pipeline Table Preview -->
    <div class="bg-white rounded-xl border border-brand-borderSubtle card-shadow overflow-x-auto w-full max-w-full">
      <div class="p-4 border-b bg-brand-paleBg flex items-center justify-between">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Recent Applications for Underwriter Review</h4>
        <button onclick="switchTab('lender-pipeline')" class="text-xs font-bold text-brand-forest hover:underline">View All →</button>
      </div>
      <table class="w-full text-xs text-left">
        <thead class="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th class="px-4 py-3 font-semibold">Borrower</th>
            <th class="px-4 py-3 font-semibold">Location / Crop</th>
            <th class="px-4 py-3 font-semibold">Requested</th>
            <th class="px-4 py-3 font-semibold">Recommended Range</th>
            <th class="px-4 py-3 font-semibold">Risk Tier</th>
            <th class="px-4 py-3 font-semibold">Evidence Confidence</th>
            <th class="px-4 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr class="hover:bg-brand-paleBg">
            <td class="px-4 py-3 font-bold text-gray-900">Ramesh Kumar</td>
            <td class="px-4 py-3 text-gray-600">Thiruvallur, TN · Samba Paddy (3.5 Ac)</td>
            <td class="px-4 py-3 font-mono font-bold">₹2,00,000</td>
            <td class="px-4 py-3 font-mono font-bold text-brand-forest">₹1,20,000 – ₹1,40,000</td>
            <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Moderate</span></td>
            <td class="px-4 py-3 font-mono text-emerald-700 font-bold">88% (High)</td>
            <td class="px-4 py-3 text-right">
              <button onclick="openAssessmentModal(1)" class="px-3 py-1 bg-brand-forest text-white rounded text-xs font-semibold hover:bg-brand-forestHover">
                Assess File
              </button>
            </td>
          </tr>
          <tr class="hover:bg-brand-paleBg">
            <td class="px-4 py-3 font-bold text-gray-900">Rajendra Patil</td>
            <td class="px-4 py-3 text-gray-600">Nashik, MH · Tomato / Soybean (4.5 Ac)</td>
            <td class="px-4 py-3 font-mono font-bold">₹2,50,000</td>
            <td class="px-4 py-3 font-mono font-bold text-amber-800">₹90,000 – ₹1,10,000</td>
            <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">High Volatility</span></td>
            <td class="px-4 py-3 font-mono text-amber-700 font-bold">54% (Low)</td>
            <td class="px-4 py-3 text-right">
              <button onclick="openAssessmentModal(2)" class="px-3 py-1 bg-brand-forest text-white rounded text-xs font-semibold hover:bg-brand-forestHover">
                Assess File
              </button>
            </td>
          </tr>
          <tr class="hover:bg-brand-paleBg">
            <td class="px-4 py-3 font-bold text-gray-900">Sunita Deshmukh</td>
            <td class="px-4 py-3 text-gray-600">Nashik, MH · Organic Pomegranate (3.2 Ac)</td>
            <td class="px-4 py-3 font-mono font-bold">₹1,50,000</td>
            <td class="px-4 py-3 font-mono font-bold text-brand-forest">₹1,10,000 – ₹1,30,000</td>
            <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Moderate</span></td>
            <td class="px-4 py-3 font-mono text-emerald-700 font-bold">82% (High)</td>
            <td class="px-4 py-3 text-right">
              <button onclick="openAssessmentModal(3)" class="px-3 py-1 bg-brand-forest text-white rounded text-xs font-semibold hover:bg-brand-forestHover">
                Assess File
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 2: FARMER APPLICATIONS PIPELINE -->
  <!-- ========================================== -->
  <section id="tab-lender-pipeline" class="hidden space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Credit Assessment Pipeline</h2>
        <p class="text-xs text-gray-600 mt-1">Review verified agricultural proposals against down-side stress matrices.</p>
      </div>
      <div class="flex items-center gap-2">
        <select class="px-3 py-1.5 text-xs border border-brand-borderSubtle rounded-lg bg-white">
          <option>All Risk Tiers</option>
          <option>Low Risk</option>
          <option>Moderate Risk</option>
          <option>High Risk</option>
        </select>
      </div>
    </div>

    <!-- Pipeline Table -->
    <div class="bg-white rounded-xl border border-brand-borderSubtle card-shadow overflow-x-auto w-full max-w-full">
      <table class="w-full text-xs text-left">
        <thead class="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th class="px-4 py-3 font-semibold">Applicant</th>
            <th class="px-4 py-3 font-semibold">Location & Land</th>
            <th class="px-4 py-3 font-semibold">Planned Crops</th>
            <th class="px-4 py-3 font-semibold">Requested Credit</th>
            <th class="px-4 py-3 font-semibold">Recommended Range</th>
            <th class="px-4 py-3 font-semibold">Repayment Buffer</th>
            <th class="px-4 py-3 font-semibold">Confidence</th>
            <th class="px-4 py-3 text-right font-semibold">Underwriting Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100" id="lender-pipeline-tbody">
          <!-- Dynamically populated -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 3: CREDIT ASSESSMENT DEEP-DIVE -->
  <!-- ========================================== -->
  <section id="tab-lender-assessments" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Institutional Assessment Files</h2>
        <p class="text-xs text-gray-600 mt-1">Detailed deterministic assessment sheets for all portfolio borrowers.</p>
      </div>
      <button onclick="openAssessmentModal(1)" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover transition">
        Open Active Dossier (Ramesh Kumar)
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex justify-between items-center">
          <h4 class="font-bold text-sm text-gray-900">Case A: Ramesh Kumar</h4>
          <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
        </div>
        <p class="text-xs text-gray-600">Samba Paddy (3.5 Ac). Requested: ₹2.0L. Recommended: ₹1.2L–₹1.4L. High evidence confidence (88%).</p>
        <button onclick="openAssessmentModal(1)" class="w-full py-1.5 bg-brand-paleBg border text-brand-forest font-bold rounded text-xs hover:bg-brand-sageLight">
          Inspect Underwriting Dossier →
        </button>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex justify-between items-center">
          <h4 class="font-bold text-sm text-gray-900">Case B: Rajendra Patil</h4>
          <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Needs Evidence</span>
        </div>
        <p class="text-xs text-gray-600">Tomato & Soybean (4.5 Ac). Requested: ₹2.5L. Recommended: ₹90k–₹1.1L. High price volatility shock exposure.</p>
        <button onclick="openAssessmentModal(2)" class="w-full py-1.5 bg-brand-paleBg border text-brand-forest font-bold rounded text-xs hover:bg-brand-sageLight">
          Inspect Underwriting Dossier →
        </button>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <div class="flex justify-between items-center">
          <h4 class="font-bold text-sm text-gray-900">Case C: Sunita Deshmukh</h4>
          <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
        </div>
        <p class="text-xs text-gray-600">Organic Pomegranate (3.2 Ac). Requested: ₹1.5L. Recommended: ₹1.1L–₹1.3L. Weather risk buffer required.</p>
        <button onclick="openAssessmentModal(3)" class="w-full py-1.5 bg-brand-paleBg border text-brand-forest font-bold rounded text-xs hover:bg-brand-sageLight">
          Inspect Underwriting Dossier →
        </button>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 4: SCENARIO STRESS TESTS (Institutional Audit) -->
  <!-- ========================================== -->
  <section id="tab-lender-stresstests" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Institutional Stress Test Audit</h2>
        <p class="text-xs text-gray-600 mt-1">Multi-scenario shock testing across portfolio applicants to evaluate systemic risk resilience.</p>
      </div>
      <span class="text-xs font-mono font-bold text-brand-forest">Stress Engine v2.0</span>
    </div>

    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
      <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Combined Shock Resilience (-25% Price & -20% Yield)</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
          <div class="font-bold text-emerald-950">Ramesh Kumar (Paddy)</div>
          <p class="text-gray-600 mt-1">Net Surplus under shock: ₹65,000. Capping credit at ₹1.30L ensures zero default risk.</p>
        </div>
        <div class="p-3.5 rounded-lg bg-red-50 border border-red-200">
          <div class="font-bold text-red-950">Rajendra Patil (Tomato)</div>
          <p class="text-gray-600 mt-1">Net Surplus under shock: ₹38,000. Request of ₹2.50L has severe default probability (180% shortfall).</p>
        </div>
        <div class="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
          <div class="font-bold text-emerald-950">Sunita Deshmukh (Horticulture)</div>
          <p class="text-gray-600 mt-1">Net Surplus under shock: ₹72,000. Capping credit at ₹1.20L ensures healthy 1.25x DSCR.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 5: EVIDENCE & VERIFICATION AUDIT -->
  <!-- ========================================== -->
  <section id="tab-lender-evidence" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Cross-Institutional Evidence Audit</h2>
        <p class="text-xs text-gray-600 mt-1">Triangulating State Land Titles, FPO Field Inspection, and e-NAM APMC Trade Invoices.</p>
      </div>
      <span class="text-xs font-mono font-bold text-emerald-700">Triangulation Validated</span>
    </div>

    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow text-xs text-gray-700 space-y-3">
      <p class="leading-relaxed">
        Under the PS2 Credit Network, institutional lenders do not rely solely on self-reported farmer affidavits or unverified title xeroxes. Every data point carries an <strong>Evidence Confidence Score</strong> and a digital signature from an accredited FPO field surveyor.
      </p>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 6: RISK ANALYTICS -->
  <!-- ========================================== -->
  <section id="tab-lender-analytics" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Portfolio Risk Analytics & Heatmap</h2>
        <p class="text-xs text-gray-600 mt-1">Commodity volatility exposure, agro-climatic zone correlations, and liquidity forecasting.</p>
      </div>
      <span class="text-xs font-mono font-bold text-brand-forest">Zone: South & West</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Crop Volatility Index (Beta)</h4>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between"><span>Paddy (Samba / Ponni):</span> <strong class="text-emerald-700 font-mono">0.42 (Low Volatility)</strong></div>
          <div class="flex justify-between"><span>Groundnut:</span> <strong class="text-emerald-700 font-mono">0.68 (Moderate)</strong></div>
          <div class="flex justify-between"><span>Soybean:</span> <strong class="text-amber-700 font-mono">0.85 (Moderate-High)</strong></div>
          <div class="flex justify-between"><span>Tomato (Hybrid):</span> <strong class="text-red-700 font-mono">1.84 (Extreme Price Swings)</strong></div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Disbursal Timing Optimization</h4>
        <p class="text-xs text-gray-600 leading-relaxed">
          Tranche 1 (Sowing inputs) disbursed directly to FPO input center. Tranche 2 (Harvest & threshing labour) disbursed 15 days before notified harvest date.
        </p>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 7: REPAYMENT CAPACITY UNDERWRITING -->
  <!-- ========================================== -->
  <section id="tab-lender-repayment" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Repayment Capacity Underwriting Desk</h2>
        <p class="text-xs text-gray-600 mt-1">Structuring harvest bullet repayment dates against APMC arrival calendars.</p>
      </div>
    </div>
    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow text-xs space-y-3">
      <p class="text-gray-700 leading-relaxed">
        Bullet repayment synchronisation eliminates the 24% default friction observed in monthly EMI smallholder agricultural loans.
      </p>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 8: EXPLAINABILITY MEMORANDUM -->
  <!-- ========================================== -->
  <section id="tab-lender-explain" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Underwriter Explainability Engine</h2>
        <p class="text-xs text-gray-600 mt-1">Auditable trace of credit decisions for internal audit and RBI risk inspection.</p>
      </div>
    </div>
    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow text-xs space-y-3">
      <p class="text-gray-700">Clear mathematical derivation for why loans are capped at conservative stress levels.</p>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 9: CREDIT REPORTS ARCHIVE -->
  <!-- ========================================== -->
  <section id="tab-lender-reports" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Credit Reports Archive</h2>
        <p class="text-xs text-gray-600 mt-1">Downloadable / printable PDF-ready credit evaluation memorandums.</p>
      </div>
      <button onclick="openReportModal()" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover transition">
        Generate Credit Memorandum
      </button>
    </div>
    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow text-xs space-y-3">
      <p class="text-gray-700">View and print institutional-grade credit appraisal reports for committee approval.</p>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 10: DECISION QUEUE (Record Recommendation) -->
  <!-- ========================================== -->
  <section id="tab-lender-decision" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Credit Decision Queue (Underwriter Recommendation)</h2>
        <p class="text-xs text-gray-600 mt-1">Record official credit recommendation terms, interest subsidies, and pre-disbursement covenants.</p>
      </div>
      <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
        Decision Support Mode
      </span>
    </div>

    <!-- Active Decision Form (Section 20 Requirement) -->
    <div class="bg-white rounded-xl p-6 border border-brand-borderSubtle card-shadow space-y-5">
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="serif-title text-base font-bold text-brand-forest">Record Recommendation for Active Applicant</h3>
        <span class="text-xs font-mono font-bold text-gray-700">Ramesh Kumar · Samba Paddy (3.5 Ac)</span>
      </div>

      <form id="lender-decision-form" onsubmit="submitLenderDecision(event)" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Recommended Credit Ceiling (₹)</label>
            <input type="number" id="dec-amount" value="130000" min="50000" max="300000" class="w-full px-3 py-2 text-xs border border-brand-borderSubtle rounded-lg font-mono font-bold">
            <span class="text-[10px] text-emerald-700 font-semibold mt-0.5 block">Recommended Range: ₹1,20,000 – ₹1,40,000</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Interest Rate (KCC Aligned)</label>
            <input type="text" id="dec-rate" value="7.0% p.a. (3% Prompt Subvention)" class="w-full px-3 py-2 text-xs border border-brand-borderSubtle rounded-lg font-mono">
            <span class="text-[10px] text-gray-500 mt-0.5 block">Effective 4% on timely repayment</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Repayment Due Date (Pegged)</label>
            <input type="date" id="dec-date" value="2026-12-20" class="w-full px-3 py-2 text-xs border border-brand-borderSubtle rounded-lg font-mono">
            <span class="text-[10px] text-gray-500 mt-0.5 block">30 days after harvest completion</span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Pre-Disbursement Conditions & Covenants</label>
          <textarea id="dec-conditions" rows="2" class="w-full px-3 py-2 text-xs border border-brand-borderSubtle rounded-lg">1. Verification of PMFBY Kharif enrollment receipt. 2. Tranche 1 (₹60k) seed/fertilizer payment directly to Thiruvallur Agro Collective. 3. Tranche 2 (₹70k) harvest labour release upon FPO pre-harvest inspection.</textarea>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Underwriter Synthesis Memo</label>
          <textarea id="dec-notes" rows="2" class="w-full px-3 py-2 text-xs border border-brand-borderSubtle rounded-lg">Stress test confirms borrower can comfortably service ₹1.30L even with -25% price drop. Capping facility provides complete institutional downside protection.</textarea>
        </div>

        <div class="pt-2 flex justify-end gap-3">
          <button type="submit" class="px-6 py-2.5 bg-brand-forest text-white text-xs font-bold rounded-lg hover:bg-brand-forestHover transition shadow-xs">
            Record Recommendation & Issue Decision Certificate
          </button>
        </div>
      </form>
    </div>
  </section>
  `;
}
