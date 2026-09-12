// Login & Authentication View Component: Agricultural-themed persona quick-select & OTP sign-in
export function renderLoginHtml(): string {
  return `
  <!-- ========================================== -->
  <!-- LOGIN & AUTHENTICATION OVERLAY VIEW -->
  <!-- ========================================== -->
  <div id="login-overlay" class="fixed inset-0 z-50 bg-[#0e2b19]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-md w-full border border-brand-borderSubtle card-shadow overflow-hidden my-auto p-6 sm:p-8 animate-in fade-in transition-all">
      
      <!-- Clean Branded Header -->
      <div class="text-center space-y-2 mb-6">
        <div class="w-12 h-12 rounded-2xl bg-brand-forest text-white flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-sm">
          🌾
        </div>
        <h1 class="serif-title text-2xl font-bold text-brand-forest">KissanTrust</h1>
        <p class="text-xs text-stone-600">
          Agricultural Credit Intelligence Platform
        </p>
      </div>

      <!-- Main Login Body -->
      <div class="space-y-6">
        
        <!-- SECTION 1: ONE-CLICK DEMO PERSONAS (Primary Access) -->
        <div class="space-y-3">
          <label class="text-xs font-bold uppercase tracking-wider text-stone-500 block text-center">
            Select Role to Enter Workspace
          </label>

          <div class="space-y-2.5">
            <!-- Farmer Persona Card -->
            <button type="button" onclick="loginAsDemo('farmer', 1)" class="w-full text-left border border-stone-200 hover:border-brand-forest rounded-xl p-3.5 bg-white hover:bg-brand-paleBg transition cursor-pointer flex items-center justify-between group shadow-2xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shrink-0">
                  🌾
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h3 class="font-bold text-stone-900 text-sm group-hover:text-brand-forest transition">Ramesh Kumar</h3>
                    <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Farmer</span>
                  </div>
                  <p class="text-xs text-stone-500 mt-0.5">Thiruvallur · Paddy</p>
                </div>
              </div>
              <span class="text-stone-400 group-hover:text-brand-forest transition font-bold text-lg">→</span>
            </button>

            <!-- FPO Officer Persona Card -->
            <button type="button" onclick="loginAsDemo('fpo')" class="w-full text-left border border-stone-200 hover:border-brand-forest rounded-xl p-3.5 bg-white hover:bg-brand-paleBg transition cursor-pointer flex items-center justify-between group shadow-2xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base shrink-0">
                  🤝
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h3 class="font-bold text-stone-900 text-sm group-hover:text-brand-forest transition">Thiruvallur Agro Collective</h3>
                    <span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">FPO Desk</span>
                  </div>
                  <p class="text-xs text-stone-500 mt-0.5">Community Verifier Desk</p>
                </div>
              </div>
              <span class="text-stone-400 group-hover:text-brand-forest transition font-bold text-lg">→</span>
            </button>

            <!-- Bank / Lender Persona Card -->
            <button type="button" onclick="loginAsDemo('lender')" class="w-full text-left border border-stone-200 hover:border-brand-forest rounded-xl p-3.5 bg-white hover:bg-brand-paleBg transition cursor-pointer flex items-center justify-between group shadow-2xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-base shrink-0">
                  🏦
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h3 class="font-bold text-stone-900 text-sm group-hover:text-brand-forest transition">Canara Bank Agri Syndicate</h3>
                    <span class="text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">Lender</span>
                  </div>
                  <p class="text-xs text-stone-500 mt-0.5">Institutional Credit Desk</p>
                </div>
              </div>
              <span class="text-stone-400 group-hover:text-brand-forest transition font-bold text-lg">→</span>
            </button>
          </div>
        </div>

        <!-- Divider -->
        <div class="relative flex items-center justify-center my-4">
          <div class="border-t border-stone-200 w-full"></div>
          <span class="bg-white px-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider shrink-0 relative">or sign in with mobile</span>
        </div>

        <!-- SECTION 2: MINIMAL MOBILE SIGN-IN (Secondary) -->
        <form id="standard-login-form" onsubmit="handleStandardLogin(event)" class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-1">Mobile Number</label>
            <input type="tel" id="login-identifier" required placeholder="Enter mobile number" value="98401 92831" class="w-full h-11 px-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-brand-forest font-mono text-sm">
            <input type="hidden" id="login-role" value="farmer-1">
          </div>

          <button type="submit" class="w-full h-11 bg-brand-forest text-white font-semibold text-sm rounded-xl hover:bg-brand-forestHover transition shadow-xs flex items-center justify-center gap-2">
            <span>Send OTP & Login</span>
            <span>→</span>
          </button>
        </form>

      </div>
    </div>
  </div>
  `;
}
