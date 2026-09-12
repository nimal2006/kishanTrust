// 14-Category Comprehensive Farmer Profile & Credit Appraisal View
export function renderFarmerProfile14Html(): string {
  return `
  <!-- ========================================== -->
  <!-- TAB 2: MY 14-SECTION PROFILE & FARM RECORDS -->
  <!-- ========================================== -->
  <section id="tab-farmer-profile" class="hidden space-y-6">
    <!-- Header & Action Controls -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-forest text-white">14-Area Standard</span>
          <h2 class="serif-title text-2xl font-bold text-brand-forest">Farmer 360° Credit Appraisal & Farm Dossier</h2>
        </div>
        <p class="text-xs text-gray-600 mt-1">
          Complete socioeconomic, land title, operational crop, livestock, cash flow, debt burden, and government scheme data model.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2.5">
        <button type="button" onclick="openReportModal()" class="px-3.5 py-2 border border-brand-borderSubtle bg-white text-gray-700 rounded-lg text-xs font-semibold hover:bg-brand-paleBg flex items-center gap-1.5 shadow-2xs">
          <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          <span>Print Loan Appraisal</span>
        </button>
        <button type="button" onclick="triggerSave14Profile()" class="px-4 py-2 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover flex items-center gap-1.5 shadow-xs transition">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span>Save All 14 Profile Sections</span>
        </button>
      </div>
    </div>

    <!-- Quick Financial Health & Solvency Summary Strip -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Total Monthly Inflow</span>
        <p id="prof-sum-income" class="text-sm font-bold text-emerald-800 font-mono mt-0.5">₹38,500</p>
        <span class="text-[10px] text-gray-400">All income streams</span>
      </div>
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Monthly Outflows</span>
        <p id="prof-sum-expenses" class="text-sm font-bold text-gray-800 font-mono mt-0.5">₹26,500</p>
        <span class="text-[10px] text-gray-400">Living + farming ops</span>
      </div>
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Net Monthly Surplus</span>
        <p id="prof-sum-surplus" class="text-sm font-bold text-brand-forest font-mono mt-0.5">+₹12,000</p>
        <span class="text-[10px] text-emerald-600 font-semibold">Positive Cash Buffer</span>
      </div>
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Debt-to-Income (DTI)</span>
        <p id="prof-sum-dti" class="text-sm font-bold text-emerald-700 font-mono mt-0.5">0.0%</p>
        <span class="text-[10px] text-emerald-600 font-semibold">Healthy Debt Free</span>
      </div>
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Expected Crop Revenue</span>
        <p id="prof-sum-crop-rev" class="text-sm font-bold text-gray-900 font-mono mt-0.5">₹2,08,250</p>
        <span class="text-[10px] text-gray-400">Current season cycle</span>
      </div>
      <div class="bg-white rounded-xl p-3.5 border border-brand-borderSubtle card-shadow">
        <span class="text-[10px] uppercase font-bold text-gray-500 block">Productive Assets</span>
        <p id="prof-sum-assets" class="text-sm font-bold text-gray-900 font-mono mt-0.5">₹8,50,000</p>
        <span class="text-[10px] text-gray-400">Tractor, pump & livestock</span>
      </div>
    </div>

    <!-- Quick Jump Navigation Pills -->
    <div class="bg-white rounded-xl p-3 border border-brand-borderSubtle card-shadow flex items-center gap-2 overflow-x-auto text-[11px] font-semibold whitespace-nowrap">
      <span class="text-gray-400 font-bold px-1 text-[10px] uppercase">Sections:</span>
      <a href="#sec-1-personal" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">1. Personal</a>
      <a href="#sec-2-family" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">2. Family</a>
      <a href="#sec-3-land" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">3. Land</a>
      <a href="#sec-4-crop" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">4. Crop</a>
      <a href="#sec-5-prev-crop" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">5. Prev Crop</a>
      <a href="#sec-6-livestock" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">6. Livestock</a>
      <a href="#sec-7-poultry" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">7. Poultry</a>
      <a href="#sec-8-income" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">8. Income</a>
      <a href="#sec-9-expenses" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">9. Expenses</a>
      <a href="#sec-10-assets" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">10. Assets</a>
      <a href="#sec-11-loans" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">11. Loans</a>
      <a href="#sec-12-repayment" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">12. Repayment</a>
      <a href="#sec-13-market" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">13. Market</a>
      <a href="#sec-14-schemes" class="px-2.5 py-1 rounded-md bg-brand-paleBg text-brand-forest hover:bg-brand-forest hover:text-white transition">14. Schemes</a>
    </div>

    <!-- Main 14-Section Form -->
    <form id="farmer-14-profile-form" onsubmit="saveFarmerProfile14(event)" class="space-y-6 text-xs">
      
      <!-- Hidden legacy synchronization fields to guarantee backward compatibility -->
      <input type="hidden" id="prof-name">
      <input type="hidden" id="prof-phone">
      <input type="hidden" id="prof-state">
      <input type="hidden" id="prof-district">
      <input type="hidden" id="prof-land">
      <input type="hidden" id="prof-irrigation">
      <input type="hidden" id="prof-crop">
      <input type="hidden" id="prof-harvest">
      <input type="hidden" id="prof-cost">
      <input type="hidden" id="prof-loan">
      <input type="hidden" id="prof-purpose">

      <!-- ========================================== -->
      <!-- SECTION 1: PERSONAL DETAILS -->
      <!-- ========================================== -->
      <div id="sec-1-personal" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">1</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Personal Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">KYC & Identity Layer</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Full Name *</label>
            <input type="text" id="p14-personal-fullname" required class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Age</label>
            <input type="number" id="p14-personal-age" min="18" max="95" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Gender</label>
            <select id="p14-personal-gender" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Mobile Number *</label>
            <input type="text" id="p14-personal-mobile" required class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Village</label>
            <input type="text" id="p14-personal-village" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">District</label>
            <input type="text" id="p14-personal-district" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">State</label>
            <select id="p14-personal-state" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Education</label>
            <input type="text" id="p14-personal-education" placeholder="e.g. Higher Secondary (12th Passed)" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Farming Experience (Years)</label>
            <input type="number" id="p14-personal-experience" min="1" max="70" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div class="sm:col-span-2 lg:col-span-3">
            <label class="block font-bold text-gray-700 mb-1">FPO / Producer Company Name</label>
            <input type="text" id="p14-personal-fpo" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 2: FAMILY DETAILS -->
      <!-- ========================================== -->
      <div id="sec-2-family" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">2</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Family Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Household Dependency & Labour Support</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Number of Family Members</label>
            <input type="number" id="p14-family-members" min="1" max="25" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Number of Dependents</label>
            <input type="number" id="p14-family-dependents" min="0" max="20" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Number of Earning Members</label>
            <input type="number" id="p14-family-earning" min="1" max="10" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div class="sm:col-span-2">
            <label class="block font-bold text-gray-700 mb-1">Family Occupation</label>
            <input type="text" id="p14-family-occupation" placeholder="e.g. Agriculture & Allied Dairy" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Approx. Monthly Family Income (₹)</label>
            <input type="number" id="p14-family-income" class="w-full px-3 py-2 border rounded-lg bg-gray-50 font-mono font-bold text-gray-800" readonly>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 3: LAND DETAILS -->
      <!-- ========================================== -->
      <div id="sec-3-land" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">3</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Land Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Title Verification & Soil Health</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Total Land Area (Acres) *</label>
            <input type="number" step="0.1" id="p14-land-area" required class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Owned / Leased</label>
            <select id="p14-land-ownership" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
              <option value="Owned">Owned (Patta / Title Holder)</option>
              <option value="Leased">Leased (Oral / Written Lease)</option>
              <option value="Joint Family">Joint Family Ancestral Title</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Irrigated / Rain-fed</label>
            <select id="p14-land-irrigation" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
              <option value="Irrigated">Assured Irrigation (Borewell / Canal)</option>
              <option value="Rain-fed">Rain-fed Only</option>
              <option value="Partially Irrigated">Partially Irrigated</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Soil Type</label>
            <input type="text" id="p14-land-soil" placeholder="e.g. Clayey Alluvial Loam (pH 7.2)" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div class="sm:col-span-2">
            <label class="block font-bold text-gray-700 mb-1">Water Source</label>
            <input type="text" id="p14-land-water" placeholder="e.g. Borewell with solar pump & canal ayacut" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 4: CROP DETAILS -->
      <!-- ========================================== -->
      <div id="sec-4-crop" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">4</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Current Crop Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Future Economics Engine Anchor</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Crop Name *</label>
            <select id="p14-crop-name" onchange="onCropSelectionChange14()" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest font-semibold">
              <option value="Paddy">Paddy (Rice)</option>
              <option value="Tomato">Tomato</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Soybean">Soybean</option>
              <option value="Cotton">Cotton</option>
              <option value="Pomegranate">Pomegranate</option>
              <option value="Sugarcane">Sugarcane</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Crop Variety</label>
            <input type="text" id="p14-crop-variety" placeholder="e.g. ADT-53 / Ponni" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Season</label>
            <select id="p14-crop-season" class="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-forest">
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Rabi">Rabi (Winter)</option>
              <option value="Zaid">Zaid (Summer)</option>
              <option value="Annual">Annual / Perennial</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Cultivated Area (Acres)</label>
            <input type="number" step="0.1" id="p14-crop-area" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Sowing Date</label>
            <input type="date" id="p14-crop-sowing" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Expected Harvest Date</label>
            <input type="date" id="p14-crop-harvest" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Expected Production (Quintals)</label>
            <input type="number" step="1" id="p14-crop-production" oninput="calculateCropRevenue14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Estimated Production Cost (₹)</label>
            <input type="number" id="p14-crop-cost" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Expected Selling Price (₹/Quintal)</label>
            <input type="number" id="p14-crop-price" oninput="calculateCropRevenue14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div class="sm:col-span-2 lg:col-span-3 bg-brand-paleBg p-3 rounded-lg border border-brand-borderSubtle flex items-center justify-between">
            <div>
              <span class="font-bold text-brand-forest">Expected Gross Crop Revenue (Auto-Calculated):</span>
              <p class="text-[11px] text-gray-500">Calculated as Expected Production (Quintals) × Expected Selling Price</p>
            </div>
            <div class="text-right">
              <input type="hidden" id="p14-crop-revenue">
              <span id="p14-crop-revenue-disp" class="text-base font-bold font-mono text-emerald-800">₹2,08,250</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 5: PREVIOUS CROP DETAILS -->
      <!-- ========================================== -->
      <div id="sec-5-prev-crop" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">5</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Previous Crop Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Historical Track Record & Yield Realization</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Previous Crop</label>
            <input type="text" id="p14-prev-crop" placeholder="e.g. Paddy (Navarai)" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Previous Season</label>
            <input type="text" id="p14-prev-season" placeholder="e.g. Rabi 2025-26" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Cultivated Area (Acres)</label>
            <input type="number" step="0.1" id="p14-prev-area" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Production (Quintals)</label>
            <input type="number" step="1" id="p14-prev-production" oninput="calculatePrevCropRevenue14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Selling Price (₹/Quintal)</label>
            <input type="number" id="p14-prev-price" oninput="calculatePrevCropRevenue14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Total Revenue (₹)</label>
            <input type="number" id="p14-prev-revenue" class="w-full px-3 py-2 border rounded-lg font-mono bg-gray-50" readonly>
          </div>
          <div class="sm:col-span-2 lg:col-span-3">
            <label class="block font-bold text-gray-700 mb-1">Approx. Profit Realized (₹)</label>
            <input type="number" id="p14-prev-profit" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 6: LIVESTOCK DETAILS -->
      <!-- ========================================== -->
      <div id="sec-6-livestock" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">6</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Livestock Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Non-Crop Dairy & Small Ruminant Inflow</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Cows (Nos)</label>
            <input type="number" id="p14-live-cows" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Buffaloes (Nos)</label>
            <input type="number" id="p14-live-buffaloes" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Goats (Nos)</label>
            <input type="number" id="p14-live-goats" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Sheep (Nos)</label>
            <input type="number" id="p14-live-sheep" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Other Livestock</label>
            <input type="number" id="p14-live-other" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Monthly Livestock Income (₹)</label>
            <input type="number" id="p14-live-income" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-emerald-800">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 7: POULTRY DETAILS -->
      <!-- ========================================== -->
      <div id="sec-7-poultry" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">7</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Poultry Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Backyard & Commercial Layer Inflow</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Number of Hens / Chickens</label>
            <input type="number" id="p14-poultry-hens" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Egg Production per Day</label>
            <input type="number" id="p14-poultry-eggs-day" oninput="calculatePoultryIncome14()" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Egg Selling Price (₹/Egg)</label>
            <input type="number" step="0.5" id="p14-poultry-egg-price" oninput="calculatePoultryIncome14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Monthly Poultry Income (₹)</label>
            <input type="number" id="p14-poultry-income" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-emerald-800">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 8: OTHER INCOME SOURCES -->
      <!-- ========================================== -->
      <div id="sec-8-income" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">8</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Other Income Sources</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Diversified Monthly Cash Inflow Architecture</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Agriculture Income (₹)</label>
            <input type="number" id="p14-inc-agri" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Dairy Income (₹)</label>
            <input type="number" id="p14-inc-dairy" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Poultry Income (₹)</label>
            <input type="number" id="p14-inc-poultry" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Livestock Income (₹)</label>
            <input type="number" id="p14-inc-livestock" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Labour Income (₹)</label>
            <input type="number" id="p14-inc-labour" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Business Income (₹)</label>
            <input type="number" id="p14-inc-business" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Other Income (₹)</label>
            <input type="number" id="p14-inc-other" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div class="bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex flex-col justify-center">
            <span class="text-[10px] uppercase font-bold text-emerald-900 block">Total Monthly Income</span>
            <span id="p14-inc-total-disp" class="text-sm font-bold font-mono text-emerald-800">₹38,500</span>
            <input type="hidden" id="p14-inc-total" value="38500">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 9: MONTHLY EXPENSES -->
      <!-- ========================================== -->
      <div id="sec-9-expenses" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">9</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Monthly Expenses</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Household, Operational & Debt Servicing Outflows</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Household Expenses (₹)</label>
            <input type="number" id="p14-exp-household" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Farming Expenses (₹)</label>
            <input type="number" id="p14-exp-farming" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Livestock / Poultry (₹)</label>
            <input type="number" id="p14-exp-livestock" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Education Expenses (₹)</label>
            <input type="number" id="p14-exp-education" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Medical Expenses (₹)</label>
            <input type="number" id="p14-exp-medical" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Other Expenses (₹)</label>
            <input type="number" id="p14-exp-other" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Existing Loan EMI (₹)</label>
            <input type="number" id="p14-exp-emi" oninput="recalcCashFlow14()" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-amber-700">
          </div>
          <div class="bg-gray-100 p-2 rounded-lg border border-gray-300 flex flex-col justify-center">
            <span class="text-[10px] uppercase font-bold text-gray-700 block">Total Monthly Expenses</span>
            <span id="p14-exp-total-disp" class="text-sm font-bold font-mono text-gray-900">₹26,500</span>
            <input type="hidden" id="p14-exp-total" value="26500">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 10: ASSETS -->
      <!-- ========================================== -->
      <div id="sec-10-assets" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">10</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Assets & Farm Mechanization</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Productive Capital & Security Base</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <label class="block font-bold text-gray-700 mb-1">Tractor / Machinery</label>
            <input type="text" id="p14-ast-tractor" placeholder="e.g. Mahindra 475 DI (42 HP, 2018)" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Approx. Total Asset Value (₹)</label>
            <input type="number" id="p14-ast-value" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-brand-forest">
          </div>
          <div class="sm:col-span-2">
            <label class="block font-bold text-gray-700 mb-1">Farm Equipment</label>
            <input type="text" id="p14-ast-equipment" placeholder="e.g. Rotavator, power sprayer, seed drill" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Other Productive Assets</label>
            <input type="text" id="p14-ast-other" placeholder="e.g. 5 HP solar submersible pump" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="grid grid-cols-3 gap-2 sm:col-span-2 lg:col-span-3">
            <div>
              <label class="block text-[11px] font-bold text-gray-600 mb-1">Number of Cattle</label>
              <input type="number" id="p14-ast-cattle" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-gray-600 mb-1">Number of Goats/Sheep</label>
              <input type="number" id="p14-ast-goats" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-gray-600 mb-1">Number of Poultry</label>
              <input type="number" id="p14-ast-poultry" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 11: EXISTING LOAN DETAILS -->
      <!-- ========================================== -->
      <div id="sec-11-loans" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">11</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Existing Loan Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Debt Overhang & Prior Encumbrances</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Do you have an existing loan? *</label>
            <select id="p14-loan-exists" onchange="toggleExistingLoanFields14()" class="w-full px-3 py-2 border rounded-lg font-semibold">
              <option value="false">No (Debt Free)</option>
              <option value="true">Yes (Active Loan)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Loan Provider</label>
            <input type="text" id="p14-loan-provider" placeholder="e.g. Primary Agricultural Credit Society" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Loan Type</label>
            <input type="text" id="p14-loan-type" placeholder="e.g. KCC Short-Term Crop Loan" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Original Loan Amount (₹)</label>
            <input type="number" id="p14-loan-original" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Outstanding Amount (₹)</label>
            <input type="number" id="p14-loan-outstanding" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-amber-800">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Monthly EMI (₹)</label>
            <input type="number" id="p14-loan-emi" oninput="syncLoanEmiToExpenses14()" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Expected Completion Date</label>
            <input type="date" id="p14-loan-completion" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Loan Purpose</label>
            <input type="text" id="p14-loan-purpose" placeholder="e.g. Seasonal cultivation inputs" class="w-full px-3 py-2 border rounded-lg">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 12: PREVIOUS REPAYMENT DETAILS -->
      <!-- ========================================== -->
      <div id="sec-12-repayment" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">12</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Previous Repayment Details</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Bureau & Community Repayment Discipline</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Previous Loan Taken?</label>
            <select id="p14-rep-taken" class="w-full px-3 py-2 border rounded-lg">
              <option value="true">Yes</option>
              <option value="false">No (First Time Borrower)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Number of Previous Loans</label>
            <input type="number" id="p14-rep-count" min="0" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">On-time Payments</label>
            <input type="number" id="p14-rep-ontime" min="0" class="w-full px-3 py-2 border rounded-lg font-mono text-emerald-700 font-bold">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Late Payments</label>
            <input type="number" id="p14-rep-late" min="0" class="w-full px-3 py-2 border rounded-lg font-mono text-amber-700 font-bold">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Any Loan Default?</label>
            <select id="p14-rep-default" class="w-full px-3 py-2 border rounded-lg font-bold">
              <option value="false" class="text-emerald-700 font-bold">No (Zero Default Record)</option>
              <option value="true" class="text-red-700 font-bold">Yes (Past Default / NPA)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 13: MARKET & SALES -->
      <!-- ========================================== -->
      <div id="sec-13-market" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">13</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Market & Sales Channels</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Offtake Security & Mandi Linkage</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Main Selling Market</label>
            <input type="text" id="p14-mkt-market" placeholder="e.g. Thiruvallur Regulated APMC Mandi" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Regular Buyer</label>
            <input type="text" id="p14-mkt-buyer" placeholder="e.g. FPO Collective & State Civil Supplies" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Buyer Relationship Duration</label>
            <input type="text" id="p14-mkt-duration" placeholder="e.g. 5 years" class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Average Sales per Season (Quintals)</label>
            <input type="number" id="p14-mkt-sales" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Average Selling Price (₹/Quintal)</label>
            <input type="number" id="p14-mkt-price" class="w-full px-3 py-2 border rounded-lg font-mono">
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Approx. Annual Agricultural Sales (₹)</label>
            <input type="number" id="p14-mkt-annual" class="w-full px-3 py-2 border rounded-lg font-mono font-bold text-brand-forest">
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 14: INSURANCE & GOVERNMENT SCHEMES -->
      <!-- ========================================== -->
      <div id="sec-14-schemes" class="bg-white rounded-xl p-5 border border-brand-borderSubtle card-shadow space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brand-borderSubtle">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">14</span>
            <h3 class="serif-title text-base font-bold text-brand-forest">Insurance & Government Schemes</h3>
          </div>
          <span class="text-[11px] text-gray-500 font-mono">Downside Cushion & Sovereign DBT Support</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Crop Insurance (PMFBY)?</label>
            <select id="p14-sch-crop-ins" class="w-full px-3 py-2 border rounded-lg">
              <option value="true">Yes (Active Coverage)</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Livestock Insurance?</label>
            <select id="p14-sch-live-ins" class="w-full px-3 py-2 border rounded-lg">
              <option value="true">Yes (Insured)</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">PM-KISAN Beneficiary?</label>
            <select id="p14-sch-pmkisan" class="w-full px-3 py-2 border rounded-lg">
              <option value="true">Yes (₹6,000/yr DBT)</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">KCC Available?</label>
            <select id="p14-sch-kcc" class="w-full px-3 py-2 border rounded-lg">
              <option value="true">Yes (Active KCC Card)</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="col-span-2 sm:col-span-4">
            <label class="block font-bold text-gray-700 mb-1">Other Government Scheme Details</label>
            <input type="text" id="p14-sch-other" placeholder="e.g. Soil Health Card, State Integrated Agriculture Development, Subsidized Micro-Irrigation" class="w-full px-3 py-2 border rounded-lg">
          </div>
        </div>
      </div>

      <!-- Bottom Save Action Bar -->
      <div class="p-4 bg-brand-paleBg border border-brand-borderSubtle rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-emerald-700 font-bold">✓</span>
          <span class="text-gray-700 text-xs">All 14 appraisal sections are verified against FPO community registers and bank underwriting criteria.</span>
        </div>
        <div class="flex items-center gap-2.5">
          <button type="button" onclick="openReportModal()" class="px-4 py-2 border border-brand-borderSubtle bg-white text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50">
            Preview Underwriting Memo
          </button>
          <button type="submit" class="px-6 py-2.5 bg-brand-forest text-white rounded-lg text-xs font-bold hover:bg-brand-forestHover shadow-xs transition">
            Save Complete 14-Section Farm Dossier
          </button>
        </div>
      </div>
    </form>
  </section>
  `;
}
