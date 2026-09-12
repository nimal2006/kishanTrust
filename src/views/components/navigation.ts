// Navigation Component: Dynamic Role-Based Sidebar and Mobile Off-Canvas Drawer
export function renderDesktopSidebarHtml(): string {
  return `
  <!-- Left Sidebar (Desktop 1024px+ permanent, Tablet 768px-1023px compact) -->
  <aside id="sidebar" class="flex flex-col w-full h-full bg-white border-r border-brand-borderSubtle min-h-screen shrink-0 z-30 select-none">
    <!-- Brand Logo -->
    <div class="p-3.5 lg:p-4 border-b border-brand-borderSubtle flex items-center gap-3">
      <div class="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-serif text-lg lg:text-xl font-bold shadow-xs shrink-0">
        🌾
      </div>
      <div class="min-w-0">
        <h1 class="font-serif font-bold text-brand-forest text-base lg:text-lg tracking-tight leading-none truncate">KissanTrust</h1>
        <p class="text-[9px] lg:text-[10px] uppercase tracking-wider text-brand-gold font-bold mt-1">Credit Intelligence</p>
      </div>
    </div>

    <!-- Active Workspace Context Card -->
    <div class="px-3 lg:px-4 pt-3 pb-2 border-b border-brand-borderSubtle/60 bg-brand-paleBg/50">
      <div class="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
        <span id="sidebar-role-label">Farmer Workspace</span>
        <span class="inline-flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Live
        </span>
      </div>
      <p id="sidebar-role-sub" class="text-[11px] lg:text-xs text-gray-800 font-semibold truncate">Ramesh Kumar · Samba Paddy</p>
    </div>

    <!-- Grouped Role-Based Navigation Items -->
    <nav class="flex-1 px-2.5 lg:px-3 py-2 space-y-3 overflow-y-auto no-scrollbar" id="sidebar-nav-container">
      <!-- Dynamically injected with organized groups (FARMER, INTELLIGENCE, TRUST, FINANCE) -->
    </nav>

    <!-- Bottom Protocol & Institutional Standards Seal -->
    <div class="p-3 border-t border-brand-borderSubtle bg-brand-paleBg">
      <div class="flex items-center justify-between text-[10px] text-gray-600">
        <span class="font-medium">Protocol Standard</span>
        <span class="font-mono text-brand-forest font-bold">PS2-NABARD</span>
      </div>
      <div class="text-[9px] text-gray-500 mt-0.5 leading-tight truncate">
        Deterministic Economic Stress Engine
      </div>
    </div>
  </aside>
  `;
}

export function renderMobileDrawerHtml(): string {
  return `
  <!-- Mobile Off-Canvas Drawer (Slide-In with Backdrop) -->
  <div id="sidebar-backdrop" onclick="toggleSidebar(false)" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 hidden transition-opacity duration-300 md:hidden"></div>
  <aside id="app-sidebar" class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col -translate-x-full transition-transform duration-300 ease-out md:hidden">
    <div class="p-4 border-b border-brand-borderSubtle flex items-center justify-between bg-brand-paleBg">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-brand-forest text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
          🌾
        </div>
        <div>
          <h2 class="font-serif font-bold text-brand-forest text-base leading-none">KissanTrust</h2>
          <p class="text-[9px] uppercase tracking-wider text-brand-gold font-bold mt-0.5">Credit Intelligence</p>
        </div>
      </div>
      <button onclick="toggleSidebar(false)" class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition" aria-label="Close Menu">
        ✕
      </button>
    </div>

    <!-- Mobile Role & Case Switcher -->
    <div class="p-3 border-b border-brand-borderSubtle bg-white">
      <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Switch Workspace & Case</label>
      <select id="mobile-persona-select" onchange="onPersonaChange(this.value); toggleSidebar(false);" class="w-full text-xs font-semibold p-2 border border-brand-borderSubtle rounded-lg bg-brand-paleBg text-brand-forest focus:ring-1 focus:ring-brand-forest">
        <optgroup label="Farmer Workspace (Demo Cases)">
          <option value="farmer-1">Case A: Ramesh Kumar (Paddy · 3.5 Ac · Strong Evidence)</option>
          <option value="farmer-2">Case B: Rajendra Patil (Tomato · 4.5 Ac · High Volatility)</option>
          <option value="farmer-3">Case C: Sunita Deshmukh (Soybean/Pomegranate · 3.2 Ac)</option>
        </optgroup>
        <optgroup label="Institutional Workspaces">
          <option value="fpo">Community / FPO: Thiruvallur Agro Collective</option>
          <option value="lender">Lender Desk: Institutional Underwriter & Bank Syndicate</option>
        </optgroup>
      </select>
    </div>

    <!-- Mobile Navigation Links Container -->
    <nav class="flex-1 px-3 py-3 space-y-3 overflow-y-auto" id="mobile-nav-items">
      <!-- Injected by JavaScript -->
    </nav>

    <!-- Mobile Drawer Footer -->
    <div class="p-3 border-t border-brand-borderSubtle bg-brand-paleBg flex items-center justify-between text-[11px] text-gray-600">
      <span>Standard PS2-NABARD</span>
      <span class="text-emerald-700 font-bold font-mono">Live Sync ✓</span>
    </div>
  </aside>
  `;
}

export function renderSidebarHtml(): string {
  return renderDesktopSidebarHtml() + renderMobileDrawerHtml();
}
