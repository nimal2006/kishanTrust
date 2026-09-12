// Community / FPO Workspace: 7 Operational Tabs
export function renderFpoWorkspaceHtml(): string {
  return `
  <!-- ========================================== -->
  <!-- TAB 1: FPO OVERVIEW -->
  <!-- ========================================== -->
  <section id="tab-fpo-overview" class="space-y-6">
    <!-- Top FPO Header Banner -->
    <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
            🌱
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="serif-title text-xl sm:text-2xl font-bold text-brand-forest">Thiruvallur Agro Collective Producer Co.</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-paleBg border text-gray-700">FPO-TN-2023-00892</span>
            </div>
            <p class="text-xs text-gray-600 mt-1">
              APMC Market Complex, Thiruvallur, Tamil Nadu · Reg: SFAC & NABARD Promoted · Lead Verifier: K. Soundararajan
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchTab('fpo-pending')" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-semibold hover:bg-brand-forestHover transition flex items-center gap-1.5 shadow-xs">
            <span>Pending Verifications</span>
            <span id="fpo-pending-count-badge" class="px-1.5 py-0.2 rounded-full bg-emerald-700 text-[10px] font-bold">2</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Collective Metrics Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Total Member Farmers</span>
        <p class="serif-title text-2xl font-bold text-gray-900 mt-1">420 Farmers</p>
        <span class="text-[11px] text-emerald-600 font-semibold mt-0.5 block">↑ +14 enrolled this month</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Verified Crop Acreage</span>
        <p class="serif-title text-2xl font-bold text-gray-900 mt-1">1,840 Acres</p>
        <span class="text-[11px] text-gray-500 mt-0.5 block">100% Geo-tagged Sowing</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Collective Credit Facilitated</span>
        <p class="serif-title text-2xl font-bold text-brand-forest mt-1">₹4.85 Crore</p>
        <span class="text-[11px] text-emerald-600 font-semibold mt-0.5 block">NABARD / PACS Linked</span>
      </div>
      <div class="bg-white rounded-xl p-4 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-400 block">Collective Repayment Track</span>
        <p class="serif-title text-2xl font-bold text-emerald-700 mt-1">98.4%</p>
        <span class="text-[11px] text-gray-500 mt-0.5 block">Zero willful default history</span>
      </div>
    </div>

    <!-- Quick Action Workflows -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h3 class="serif-title text-base font-bold text-brand-forest">Community Verification Duties</h3>
        <p class="text-xs text-gray-600 leading-relaxed">
          As a designated Community Verifier under PS2, the FPO confirms land acreage, crop variety, and sowing dates via geo-tagged field visits. This eliminates fraudulent land claims and elevates the farmer's Evidence Confidence Score.
        </p>
        <div class="pt-2 flex gap-2">
          <button onclick="switchTab('fpo-pending')" class="px-3.5 py-2 bg-brand-forest text-white rounded-lg text-xs font-semibold hover:bg-brand-forestHover transition">
            Review Pending Farmer Claims
          </button>
          <button onclick="switchTab('fpo-farmers')" class="px-3.5 py-2 bg-white border border-brand-borderSubtle text-gray-700 rounded-lg text-xs font-semibold hover:bg-brand-paleBg transition">
            View All Members
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h3 class="serif-title text-base font-bold text-brand-forest">APMC Collective Mandi Bargaining</h3>
        <p class="text-xs text-gray-600 leading-relaxed">
          Aggregating 1,840 acres of Samba Paddy allows the collective to bypass middlemen and negotiate directly with millers at a ₹150–₹220/quintal premium above the spot modal rate.
        </p>
        <div class="p-3 bg-brand-paleBg rounded-lg text-xs text-brand-forest font-semibold">
          Current Collective Lot: 4,200 Quintals committed to Tamil Nadu Civil Supplies Corp.
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 2: PENDING VERIFICATION QUEUE -->
  <!-- ========================================== -->
  <section id="tab-fpo-pending" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Pending Verification Queue</h2>
        <p class="text-xs text-gray-600 mt-1">Appraise farmer self-declarations against satellite and on-ground field inspection.</p>
      </div>
      <span class="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
        Requires Appraisal
      </span>
    </div>

    <!-- Interactive Pending Queue Cards -->
    <div class="space-y-4" id="fpo-pending-list-container">
      <!-- Item 1: Rajendra Patil (Pending) -->
      <div class="bg-white rounded-xl p-5 border-2 border-amber-300 card-shadow space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="serif-title text-base font-bold text-gray-900">Rajendra Patil</h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-paleBg border">KT-MH-NASH-0832</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Needs Evidence</span>
            </div>
            <p class="text-xs text-gray-500 mt-0.5">Pimpalgaon Baswant, Niphad Taluka, Nashik · Tomato (Hybrid) & Soybean · 4.5 Acres</p>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase font-bold text-gray-400 block">Requested Loan</span>
            <span class="serif-title text-base font-bold text-gray-900">₹2,50,000</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-2.5 rounded bg-brand-paleBg border">
            <span class="text-gray-500 block">Submitted Evidence:</span>
            <span class="font-bold text-amber-800">Unnotarized 7/12 Land Copy</span>
          </div>
          <div class="p-2.5 rounded bg-brand-paleBg border">
            <span class="text-gray-500 block">Current Evidence Score:</span>
            <span class="font-bold text-amber-700">54% (Low)</span>
          </div>
          <div class="p-2.5 rounded bg-brand-paleBg border">
            <span class="text-gray-500 block">Cultivation Cost Claimed:</span>
            <span class="font-bold text-gray-800">₹1,40,000</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p class="text-xs text-gray-600">
            <strong>Appraisal Note:</strong> Farmer has not submitted geo-tagged field photo for tomato trellising.
          </p>
          <div class="flex items-center gap-2">
            <button onclick="reviewEvidenceModal(2)" class="px-3 py-1.5 bg-white border border-brand-borderSubtle text-gray-700 rounded-lg text-xs font-semibold hover:bg-brand-paleBg">
              Inspect Evidence
            </button>
            <button onclick="executeFpoVerification(2, 'VERIFIED')" class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700">
              Verify Claim ✓
            </button>
            <button onclick="executeFpoVerification(2, 'REJECTED')" class="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700">
              Reject Claim ✕
            </button>
            <button onclick="executeFpoVerification(2, 'NEEDS_EVIDENCE')" class="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700">
              Request GPS Visit
            </button>
          </div>
        </div>
      </div>

      <!-- Item 2: Ramesh Kumar (Already Verified Demo Card) -->
      <div class="bg-white rounded-xl p-5 border border-emerald-300 card-shadow space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="serif-title text-base font-bold text-gray-900">Ramesh Kumar</h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-paleBg border">KT-TN-THIRU-0104</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified ✓</span>
            </div>
            <p class="text-xs text-gray-500 mt-0.5">Nemam Village, Thiruvallur, Tamil Nadu · Samba Paddy · 3.5 Acres</p>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase font-bold text-gray-400 block">Requested Loan</span>
            <span class="serif-title text-base font-bold text-gray-900">₹2,00,000</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-2.5 rounded bg-emerald-50 border border-emerald-200">
            <span class="text-gray-500 block">Verified Evidence:</span>
            <span class="font-bold text-emerald-800">Patta Title + GPS Sowing Visit</span>
          </div>
          <div class="p-2.5 rounded bg-emerald-50 border border-emerald-200">
            <span class="text-gray-500 block">Evidence Score:</span>
            <span class="font-bold text-emerald-800">88% (High)</span>
          </div>
          <div class="p-2.5 rounded bg-emerald-50 border border-emerald-200">
            <span class="text-gray-500 block">Verifier:</span>
            <span class="font-bold text-emerald-800">K. Soundararajan (Lead FPO)</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 3: FARMER DIRECTORY -->
  <!-- ========================================== -->
  <section id="tab-fpo-farmers" class="hidden space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">FPO Member Roster</h2>
        <p class="text-xs text-gray-600 mt-1">Enrolled farmers with verified acreage, standing crop profiles, and credit statuses.</p>
      </div>
      <input type="text" placeholder="Search member by name or mobile..." class="px-3 py-1.5 text-xs border border-brand-borderSubtle rounded-lg w-full sm:w-64 max-w-full">
    </div>

    <div class="bg-white rounded-xl border border-brand-borderSubtle card-shadow overflow-x-auto w-full max-w-full">
      <table class="w-full text-xs text-left">
        <thead class="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th class="px-4 py-3 font-semibold">Farmer Name</th>
            <th class="px-4 py-3 font-semibold">Location</th>
            <th class="px-4 py-3 font-semibold">Land Area</th>
            <th class="px-4 py-3 font-semibold">Standing Crops</th>
            <th class="px-4 py-3 font-semibold">Requested Credit</th>
            <th class="px-4 py-3 font-semibold">Confidence</th>
            <th class="px-4 py-3 font-semibold">Status</th>
            <th class="px-4 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100" id="fpo-directory-table-body">
          <!-- Dynamically populated -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 4: EVIDENCE REVIEW -->
  <!-- ========================================== -->
  <section id="tab-fpo-evidence" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Evidence Appraisal Laboratory</h2>
        <p class="text-xs text-gray-600 mt-1">Cross-reference land title certificates, GPS tags, and APMC sales invoices.</p>
      </div>
      <span class="text-xs font-mono font-bold text-brand-forest">Evidence Engine v1.4</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">1. Land Title (Patta/7-12)</h4>
        <div class="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-900 border border-emerald-200">
          <strong>Patta #1042/3A Verified:</strong> 3.50 Acres registered to Ramesh Kumar, Nemam Village, Poonamallee Taluk. Matches State Land Records API.
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">2. Geo-Tagged Sowing Photo</h4>
        <div class="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-900 border border-emerald-200">
          <strong>GPS Coordinates:</strong> 13.0492° N, 80.0121° E.<br>Timestamp: 2026-07-24 10:15 IST.<br>Perimeter: 3.48 Acres sown with Samba Ponni.
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">3. e-NAM Mandi Invoices</h4>
        <div class="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-900 border border-emerald-200">
          <strong>APMC Thiruvallur:</strong> 82.5 Quintals marketed in 2025-26 season. Net realization: ₹1,98,000 received directly into Aadhaar-seeded bank account.
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 5: VERIFICATION HISTORY -->
  <!-- ========================================== -->
  <section id="tab-fpo-history" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Verification History & Audit Log</h2>
        <p class="text-xs text-gray-600 mt-1">Immutable ledger of physical inspection approvals, rejects, and evidence escalations.</p>
      </div>
      <span class="text-xs font-mono text-gray-500">Tamper-Proof Audit Trail</span>
    </div>

    <div class="bg-white rounded-xl border border-brand-borderSubtle card-shadow overflow-x-auto w-full max-w-full">
      <table class="w-full text-xs text-left">
        <thead class="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th class="px-4 py-3 font-semibold">Timestamp</th>
            <th class="px-4 py-3 font-semibold">Farmer</th>
            <th class="px-4 py-3 font-semibold">Inspector</th>
            <th class="px-4 py-3 font-semibold">Action</th>
            <th class="px-4 py-3 font-semibold">Findings & Notes</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100" id="fpo-history-tbody">
          <!-- Populated by JS -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 6: COMMUNITY RISK VIEW -->
  <!-- ========================================== -->
  <section id="tab-fpo-risk" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">Community Agricultural Risk Exposure</h2>
        <p class="text-xs text-gray-600 mt-1">Aggregated cluster risks: crop concentration, monsoon deficit, and wholesale glut vulnerabilities.</p>
      </div>
      <span class="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
        Regional Risk: Moderate
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-2">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Crop Concentration</h4>
        <div class="serif-title text-xl font-bold text-brand-forest">62% Samba Paddy</div>
        <p class="text-xs text-gray-600">High concentration in single cereal crop. FPO promoting Groundnut and Pulses intercropping for diversification.</p>
      </div>
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-2">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Reservoir Ayacut Storage</h4>
        <div class="serif-title text-xl font-bold text-emerald-700">84% Full (Poondi Lake)</div>
        <p class="text-xs text-gray-600">Sufficient storage to support two complete irrigations during panicle initiation stage.</p>
      </div>
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-2">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Peak Mandi Price Shock Buffer</h4>
        <div class="serif-title text-xl font-bold text-gray-900">₹3.20 Cr Warehouse Cap</div>
        <p class="text-xs text-gray-600">FPO e-NWR warehouse allows members to pledge crop receipts if mandi price drops below ₹2,200/qtl.</p>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- TAB 7: FPO ANALYTICS -->
  <!-- ========================================== -->
  <section id="tab-fpo-analytics" class="hidden space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="serif-title text-2xl font-bold text-brand-forest">FPO Operational Analytics</h2>
        <p class="text-xs text-gray-600 mt-1">Yield realizations, credit absorption rates, and input cost savings.</p>
      </div>
      <span class="text-xs font-mono font-bold text-brand-forest">Season: 2026-27</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Collective Cost Savings from Bulk Buying</h4>
        <p class="text-xs text-gray-600 leading-relaxed">
          Through collective seed and bio-fertilizer procurement, member farmers saved an average of <strong>₹4,800 per acre</strong> compared to private retail agri-dealers.
        </p>
        <div class="p-3 bg-emerald-50 rounded-lg text-xs font-mono text-emerald-900">
          Total Input Savings: ₹88,32,000 across 1,840 collective acres.
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Institutional Lender Conversion</h4>
        <p class="text-xs text-gray-600 leading-relaxed">
          Farmer proposals verified by the FPO enjoy an <strong>82% faster sanction velocity</strong> from participating public sector banks and district cooperative banks.
        </p>
        <div class="p-3 bg-brand-paleBg rounded-lg text-xs font-mono text-brand-forest">
          Avg Processing Turnaround: 4.2 Days (vs 38 Days traditional bank branch).
        </div>
      </div>
    </div>
  </section>
  `;
}
