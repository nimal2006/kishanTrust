// Modals & Drawers Component: Assessment Dossier, Printable Report, Onboarding, Explainability Drawer, Economic Assumptions Drawer, Event Stream
export function renderModalsHtml(): string {
  return `
  <!-- ========================================== -->
  <!-- MODAL 1: INSTITUTIONAL ASSESSMENT DOSSIER (13 Areas) -->
  <!-- ========================================== -->
  <div id="modal-assessment" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-3 sm:p-6 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-4xl w-full border border-brand-borderSubtle shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in">
      <!-- Modal Header -->
      <div class="p-4 sm:p-5 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-serif text-lg font-bold shrink-0">
            🌾
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h3 id="modal-ass-farmer-name" class="serif-title text-base sm:text-lg font-bold text-brand-forest truncate">Institutional Assessment Dossier</h3>
              <span id="modal-ass-ref" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white border text-gray-700 shrink-0">KT-TN-THIRU-0104</span>
            </div>
            <p id="modal-ass-sub" class="text-[11px] text-gray-600 truncate">Agricultural Credit Evaluation & Future Crop Economics Stress Report</p>
          </div>
        </div>
        <button onclick="closeAssessmentModal()" class="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Modal Body (13 Institutional Intelligence Areas) -->
      <div class="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-gray-800" id="modal-ass-body">
        <!-- Dynamically injected with complete 13 areas -->
      </div>

      <!-- Modal Footer -->
      <div class="p-3 sm:p-4 border-t border-brand-borderSubtle bg-gray-50 flex items-center justify-between">
        <span class="text-[10px] sm:text-[11px] text-gray-500 font-mono">PS2-NABARD Decision Support Engine</span>
        <div class="flex items-center gap-2">
          <button onclick="closeAssessmentModal()" class="px-3.5 py-2 border border-brand-borderSubtle rounded-lg text-xs font-semibold text-gray-700 hover:bg-white">
            Close
          </button>
          <button onclick="switchTabAndCloseModal('lender-decision')" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover shadow-xs">
            Decision Queue →
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- MODAL 2: PRINTABLE AUDIT CREDIT REPORT -->
  <!-- ========================================== -->
  <div id="modal-report" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-3 sm:p-6 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-4xl w-full border border-brand-borderSubtle shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
      <!-- Report Header -->
      <div class="p-4 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between print:hidden">
        <span class="serif-title text-base font-bold text-brand-forest">Credit Underwriting Memorandum (Audit Report)</span>
        <div class="flex items-center gap-2">
          <button onclick="window.print()" class="px-3.5 py-1.5 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover transition flex items-center gap-1.5 shadow-xs">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            <span>Print Report</span>
          </button>
          <button onclick="closeReportModal()" class="p-1.5 text-gray-400 hover:text-gray-700">✕</button>
        </div>
      </div>

      <!-- Printable Report Document Content -->
      <div class="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-gray-800 bg-white" id="printable-report-content">
        <!-- Dynamically rendered -->
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- MODAL 3: ONBOARD NEW FARMER (14-Area Standard) -->
  <!-- ========================================== -->
  <div id="modal-new-farmer" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-3 sm:p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-2xl w-full border border-brand-borderSubtle shadow-2xl overflow-hidden animate-in fade-in max-h-[92vh] flex flex-col">
      <div class="p-4 sm:p-5 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
        <div>
          <h3 class="serif-title text-base font-bold text-brand-forest">Onboard New Farmer to Credit Network</h3>
          <p class="text-[11px] text-gray-600 mt-0.5">Captures 14-area baseline parameters with automated cash flow stress defaults.</p>
        </div>
        <button onclick="closeNewFarmerModal()" class="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">✕</button>
      </div>
      <form id="new-farmer-form" onsubmit="submitNewFarmer(event)" class="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto">
        <!-- Core Mandatory Fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Farmer Full Name *</label>
            <input type="text" id="new-name" required placeholder="e.g. Murugan Selvam" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Mobile Phone Number *</label>
            <input type="text" id="new-phone" required placeholder="+91-9840192831" value="+91-9840192831" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest font-mono">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-gray-700 mb-1">State</label>
            <select id="new-state" class="w-full px-3 py-2 border rounded-lg bg-white">
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">District *</label>
            <input type="text" id="new-district" required placeholder="e.g. Thiruvallur" value="Thiruvallur" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Village</label>
            <input type="text" id="new-village" placeholder="e.g. Nemam" value="Nemam" class="w-full px-3 py-2 border rounded-lg">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Land Size (Acres) *</label>
            <input type="number" step="0.1" id="new-land" required value="3.5" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Primary Crop</label>
            <select id="new-crop" class="w-full px-3 py-2 border rounded-lg font-semibold bg-white">
              <option value="Paddy">Paddy (Rice)</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Soybean">Soybean</option>
              <option value="Cotton">Cotton</option>
              <option value="Pomegranate">Pomegranate</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Irrigation Setup</label>
            <select id="new-irrigation" class="w-full px-3 py-2 border rounded-lg bg-white">
              <option value="Borewell">Borewell</option>
              <option value="Canal">Canal</option>
              <option value="Drip">Drip Irrigation</option>
              <option value="Rainfed">Rainfed</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Cultivation Cost (₹) *</label>
            <input type="number" id="new-cost" required value="68000" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Requested Loan Amount (₹) *</label>
            <input type="number" id="new-loan" required value="150000" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-brand-forest">
          </div>
        </div>

        <div>
          <label class="block font-bold text-gray-700 mb-1">Loan Purpose & Credit Category</label>
          <input type="text" id="new-purpose" value="Working capital for certified inputs, seeds, and seasonal harvest operations" class="w-full px-3 py-2 border rounded-lg">
        </div>

        <!-- Collapsible Detailed 14-Area Parameters Section -->
        <details class="border border-brand-borderSubtle rounded-xl p-3 bg-brand-paleBg group">
          <summary class="font-bold text-brand-forest cursor-pointer flex items-center justify-between text-xs select-none">
            <span>➕ Advanced 14-Area Parameters (Family, Livestock, Monthly Cashflows, Assets)</span>
            <span class="text-[10px] text-gray-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div class="mt-3 space-y-3 pt-3 border-t border-brand-borderSubtle text-xs">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Family Members</label>
                <input type="number" id="new-fam-members" value="4" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Earning Members</label>
                <input type="number" id="new-fam-earning" value="2" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Cows (Nos)</label>
                <input type="number" id="new-live-cows" value="2" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Monthly Dairy Inflow (₹)</label>
                <input type="number" id="new-live-income" value="12000" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Total Monthly Income (₹)</label>
                <input type="number" id="new-total-income" value="35000" class="w-full px-2.5 py-1.5 border rounded-lg font-mono font-bold text-emerald-800">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Total Monthly Expenses (₹)</label>
                <input type="number" id="new-total-expenses" value="24000" class="w-full px-2.5 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Approx. Asset Value (₹)</label>
                <input type="number" id="new-asset-val" value="650000" class="w-full px-2.5 py-1.5 border rounded-lg font-mono font-bold text-brand-forest">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">Existing Loan?</label>
                <select id="new-has-loan" class="w-full px-2.5 py-1.5 border rounded-lg bg-white">
                  <option value="false">No (Debt Free)</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">PMFBY Crop Insurance?</label>
                <select id="new-has-insurance" class="w-full px-2.5 py-1.5 border rounded-lg bg-white">
                  <option value="true">Yes (Active)</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-0.5">PM-KISAN Beneficiary?</label>
                <select id="new-pmkisan" class="w-full px-2.5 py-1.5 border rounded-lg bg-white">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        </details>

        <div class="pt-3 border-t border-brand-borderSubtle flex items-center justify-between">
          <span class="text-[11px] text-gray-500">Auto-links to community FPO & consent matrix</span>
          <div class="flex items-center gap-2">
            <button type="button" onclick="closeNewFarmerModal()" class="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-brand-forest text-white font-bold rounded-lg hover:bg-brand-forestHover transition shadow-xs">
              Complete 14-Area Enrollment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- DRAWER 1: WHY THIS RECOMMENDATION? (Explainability Drawer) -->
  <!-- ========================================== -->
  <div id="drawer-why-recommendation" class="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-brand-borderSubtle shadow-2xl translate-x-full hidden transition-transform duration-300 flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <span class="w-8 h-8 rounded-lg bg-brand-gold text-white flex items-center justify-center font-bold text-sm">💡</span>
        <div>
          <h4 class="serif-title text-sm font-bold text-brand-forest">Why This Recommendation?</h4>
          <p class="text-[10px] text-gray-500">Explainable Decision Support Rationale</p>
        </div>
      </div>
      <button onclick="closeWhyDrawer()" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100" aria-label="Close Drawer">✕</button>
    </div>

    <!-- Scrollable Body -->
    <div class="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-gray-800" id="drawer-why-content">
      <!-- Injected by JavaScript based on current farmer -->
    </div>

    <!-- Sticky Footer Actions -->
    <div class="p-3.5 border-t border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between gap-2">
      <button onclick="closeWhyDrawer(); switchTab('farmer-stresstest');" class="w-1/2 py-2 px-3 bg-brand-forest text-white rounded-lg font-semibold hover:bg-brand-forestHover transition text-center shadow-xs">
        Stress Test Matrix →
      </button>
      <button onclick="closeWhyDrawer(); switchTab('farmer-simulator');" class="w-1/2 py-2 px-3 bg-white border border-brand-borderSubtle text-brand-forest rounded-lg font-semibold hover:bg-brand-sageLight transition text-center">
        What-If Simulator →
      </button>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- DRAWER 2: CALCULATION DETAILS & ASSUMPTIONS DRAWER -->
  <!-- ========================================== -->
  <div id="drawer-assumptions" class="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-brand-borderSubtle shadow-2xl translate-x-full hidden transition-transform duration-300 flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <span class="w-8 h-8 rounded-lg bg-brand-forest text-white flex items-center justify-center font-bold text-sm">📐</span>
        <div>
          <h4 class="serif-title text-sm font-bold text-brand-forest">Economic Models & Assumptions</h4>
          <p class="text-[10px] text-gray-500">Transparent Deterministic Mathematical Formulas</p>
        </div>
      </div>
      <button onclick="closeAssumptionsDrawer()" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100" aria-label="Close Drawer">✕</button>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-gray-800" id="drawer-assumptions-content">
      <!-- Injected by JavaScript -->
    </div>

    <!-- Footer -->
    <div class="p-3 border-t border-brand-borderSubtle bg-brand-paleBg flex justify-end">
      <button onclick="closeAssumptionsDrawer()" class="py-1.5 px-4 bg-brand-forest text-white rounded-lg font-semibold text-xs">
        Done
      </button>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- DRAWER 3: CONSENT AUDIT HISTORY DRAWER -->
  <!-- ========================================== -->
  <div id="drawer-consent-history" class="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-brand-borderSubtle shadow-2xl translate-x-full hidden transition-transform duration-300 flex flex-col">
    <div class="p-4 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-base">🔒</span>
        <h4 class="serif-title text-sm font-bold text-brand-forest">Data Consent Ledger</h4>
      </div>
      <button onclick="closeConsentDrawer()" class="p-1 rounded hover:bg-gray-100 text-gray-500">✕</button>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-3 text-xs" id="consent-history-list">
      <!-- Injected by JavaScript -->
    </div>
  </div>

  <!-- ========================================== -->
  <!-- DRAWER 4: REALTIME WEBSOCKET EVENT LEDGER -->
  <!-- ========================================== -->
  <div id="event-drawer" class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white border-l border-brand-borderSubtle shadow-2xl translate-x-full hidden transition-transform duration-300 flex flex-col">
    <div class="p-4 border-b border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <h4 class="serif-title text-sm font-bold text-brand-forest">Live Event Stream</h4>
      </div>
      <button onclick="toggleLiveDrawer()" class="p-1 rounded hover:bg-gray-100 text-gray-500">✕</button>
    </div>
    <div class="p-3 bg-emerald-50/50 border-b border-emerald-100 text-[11px] text-emerald-800 flex justify-between">
      <span>WebSocket Stream Active</span>
      <span class="font-mono font-bold" id="drawer-event-count">0 Events</span>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-3 text-xs" id="live-events-feed">
      <div class="p-3 rounded-lg bg-gray-50 border text-gray-500 text-center">
        Listening for network events (Mandi ticks, FPO verifications, consent grants)...
      </div>
    </div>
  </div>
  `;
}
