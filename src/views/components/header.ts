// Header Component: Compact Top Bar with Role Switcher, Realtime Connection, APMC Ticker
export function renderHeaderHtml(): string {
  return `
  <!-- Mobile Header Bar (< 768px) -->
  <div class="md:hidden h-14 bg-white border-b border-brand-borderSubtle px-4 flex items-center justify-between sticky top-0 z-40">
    <div class="flex items-center gap-2">
      <button id="btn-toggle-sidebar" onclick="toggleSidebar()" class="w-9 h-9 rounded-lg border border-brand-borderSubtle text-brand-forest flex items-center justify-center hover:bg-brand-paleBg transition active:scale-95" aria-label="Open Navigation Menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div class="flex items-center gap-1.5">
        <span class="w-7 h-7 rounded-lg bg-brand-forest text-white flex items-center justify-center font-serif text-sm font-bold">🌾</span>
        <span class="font-serif font-bold text-brand-forest text-sm block leading-none">KissanTrust</span>
      </div>
    </div>

    <!-- Quick Actions Mobile -->
    <div class="flex items-center gap-1.5">
      <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live</span>
      </div>
      <button onclick="openModal('modal-dossier')" class="p-2 rounded-lg border border-brand-borderSubtle text-brand-forest hover:bg-brand-paleBg text-xs font-semibold" title="View Audit Report">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      </button>
      <button onclick="openModal('modal-onboard-farmer')" class="px-2.5 py-1.5 bg-brand-forest text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs" title="Onboard New Farmer">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      </button>
    </div>
  </div>

  <!-- Desktop Top Bar (>= 768px) -->
  <header class="hidden md:flex h-14 bg-white border-b border-brand-borderSubtle px-4 lg:px-6 items-center justify-between gap-2 lg:gap-3 sticky top-0 z-20 select-none w-full max-w-full min-w-0">
    <!-- Left: Breadcrumb & Connection Status -->
    <div class="flex items-center gap-1.5 lg:gap-2 text-xs text-gray-500 shrink min-w-0 truncate">
      <span class="font-bold text-brand-forest shrink-0">KissanTrust</span>
      <span class="text-gray-300 shrink-0">/</span>
      <span id="breadcrumb-workspace" class="text-gray-600 font-medium shrink-0">Farmer</span>
      <span class="text-gray-300 shrink-0">/</span>
      <span id="breadcrumb-current" class="text-gray-900 font-bold truncate">Overview</span>

      <!-- WebSocket Real-time Status -->
      <div id="ws-status-badge" class="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold ml-1 shrink-0">
        <span id="ws-status-dot" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span id="ws-status-text">Network Live</span>
        <span id="ws-latency" class="text-[9px] text-emerald-600 font-mono hidden xl:inline">12ms</span>
      </div>
    </div>

    <!-- Right Controls: Workspace Selector & Quick Actions -->
    <div class="flex items-center gap-1.5 lg:gap-2.5 ml-auto shrink min-w-0">
      <!-- Role & Case Switcher -->
      <div class="flex items-center bg-brand-paleBg border border-brand-borderSubtle rounded-lg p-1 text-xs shadow-2xs min-w-0 max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[280px] xl:max-w-[340px]">
        <span class="text-[9px] lg:text-[10px] uppercase font-bold text-gray-500 px-1 tracking-wider hidden xl:inline shrink-0">Persona:</span>
        <select id="persona-select" onchange="switchFarmerCase(this.value)" class="bg-transparent border-0 font-bold text-brand-forest focus:ring-0 cursor-pointer text-xs pr-4 py-0.5 w-full truncate">
          <optgroup label="Farmer Workspace (Cases)">
            <option value="farmer-1">Case A: Ramesh Kumar (Paddy · 3.5 Ac · Strong Evidence)</option>
            <option value="farmer-2">Case B: Rajendra Patil (Tomato · 4.5 Ac · High Volatility)</option>
            <option value="farmer-3">Case C: Sunita Deshmukh (Soybean/Pomegranate · 3.2 Ac)</option>
          </optgroup>
          <optgroup label="Institutional Workspaces">
            <option value="fpo">Community / FPO: Thiruvallur Agro Collective</option>
            <option value="lender">Lender Desk: Institutional Underwriter & Syndicate</option>
          </optgroup>
        </select>
      </div>

      <!-- Quick Action: Export / View Report -->
      <button onclick="openModal('modal-dossier')" class="inline-flex items-center gap-1 px-2.5 lg:px-3 py-1.5 bg-white border border-brand-borderSubtle text-brand-forest hover:bg-brand-sageLight rounded-lg text-xs font-semibold transition shrink-0" title="Audit Report">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        <span class="hidden lg:inline">Audit Report</span>
        <span class="lg:hidden">Report</span>
      </button>

      <!-- Quick Action: Onboard New Farmer -->
      <button onclick="openModal('modal-onboard-farmer')" class="inline-flex items-center gap-1 px-2.5 lg:px-3 py-1.5 bg-brand-forest text-white hover:bg-brand-forestHover rounded-lg text-xs font-semibold transition shadow-xs shrink-0" title="Onboard Farmer">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <span class="hidden lg:inline">Onboard Farmer</span>
        <span class="lg:hidden">Onboard</span>
      </button>

      <!-- Quick Action Icon: Lightning bolt Quick Assessment / Stress Test Drawer -->
      <button onclick="openAssumptionsDrawer()" class="p-2 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-50 border border-amber-200 transition shrink-0 font-bold text-xs" title="Quick Assessment & Economic Stress Test Assumptions">
        ⚡
      </button>

      <!-- Live WebSocket Event Stream Drawer Button -->
      <button onclick="toggleLiveDrawer()" id="event-ticker-btn" class="relative p-2 rounded-lg text-gray-600 hover:text-brand-forest hover:bg-brand-sageLight transition shrink-0" title="Live WebSocket Event Ledger">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span id="event-unread-badge" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
      </button>

      <!-- Active Identity Avatar & User Dropdown -->
      <div id="user-profile-wrapper" class="relative inline-block pl-1.5 lg:pl-2 border-l border-brand-borderSubtle shrink-0">
        <div class="flex items-center gap-2 cursor-pointer" onclick="toggleUserDropdown(event)">
          <button id="header-avatar" class="w-7 h-7 rounded-full bg-brand-forest text-white flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer hover:ring-2 hover:ring-brand-forest/50 transition" title="User Profile Settings">
            RK
          </button>
          <div class="text-left hidden 2xl:block truncate max-w-[120px]">
            <span id="header-user-name" class="text-xs font-bold text-gray-900 block leading-tight truncate">Ramesh Kumar</span>
            <span id="header-user-role" class="text-[10px] text-gray-500 block truncate">Farmer · Tamil Nadu</span>
          </div>
        </div>

        <!-- User Dropdown Menu -->
        <div id="user-profile-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl py-2 z-50">
          <div class="px-4 py-2.5 border-b border-stone-200 dark:border-stone-800">
            <p id="user-dropdown-name" class="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">Ramesh Kumar</p>
            <p id="user-dropdown-role" class="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">Verified Farmer Entity</p>
          </div>
          <button onclick="switchTab('farmer-profile'); toggleUserDropdown();" class="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap text-stone-700 dark:text-stone-200">
            <span class="text-base shrink-0">👤</span>
            <span class="truncate">My Profile & Farm</span>
          </button>
          <div class="border-t border-stone-200 dark:border-stone-800 my-1"></div>
          <button onclick="openModal('modal-dossier'); toggleUserDropdown();" class="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap text-stone-700 dark:text-stone-200">
            <span class="text-base shrink-0">📑</span>
            <span class="truncate">Audit Credit Report</span>
          </button>
          <button onclick="openAssumptionsDrawer(); toggleUserDropdown();" class="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap text-stone-700 dark:text-stone-200">
            <span class="text-base shrink-0">⚡</span>
            <span class="truncate">Economic Assumptions</span>
          </button>
          <div class="border-t border-stone-200 dark:border-stone-800 my-1"></div>
          <button onclick="handleLogout(); toggleUserDropdown();" class="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap text-red-600 dark:text-red-400 font-semibold">
            <span class="text-base shrink-0">🚪</span>
            <span class="truncate">Log Out / Switch User</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Live APMC AGMARKNET Mandi Price Ticker Bar (Compact & Responsive) -->
  <div class="w-full bg-[#143d24] text-white text-xs px-4 py-2 flex items-center overflow-x-auto whitespace-nowrap scrollbar-none border-b border-[#235535] select-none gap-3 sm:gap-4">
    <div class="flex items-center gap-2 font-bold text-brand-gold shrink-0 text-[10px] sm:text-xs">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
      <span class="uppercase tracking-wider shrink-0 whitespace-nowrap">AGMARKNET APMC PRICES:</span>
    </div>
    <div id="mandi-ticker-feed" class="shrink-0 flex items-center gap-3 text-xs font-medium text-emerald-100">
      <span id="tick-paddy" class="shrink-0 inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-stone-100 font-medium">
        <span>🌾 Paddy (Samba):</span> <strong class="text-white font-mono font-bold">₹2,450</strong>/qtl <span class="text-emerald-300 font-normal text-[10px]">(Thiruvallur)</span> <span class="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded text-[10px]">▲ +1.8%</span>
      </span>
      <span id="tick-groundnut" class="shrink-0 inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-stone-100 font-medium">
        <span>🥜 Groundnut (Pods):</span> <strong class="text-white font-mono font-bold">₹6,400</strong>/qtl <span class="text-emerald-300 font-normal text-[10px]">(Tiruvannamalai)</span> <span class="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded text-[10px]">▲ +0.5%</span>
      </span>
      <span id="tick-tomato" class="shrink-0 inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-stone-100 font-medium">
        <span>🍅 Tomato (Hybrid):</span> <strong class="text-white font-mono font-bold">₹1,650</strong>/qtl <span class="text-emerald-300 font-normal text-[10px]">(Nashik)</span> <span class="text-amber-300 font-bold bg-amber-950/60 px-1 py-0.5 rounded text-[10px]">▼ -3.2%</span>
      </span>
      <span id="tick-soybean" class="shrink-0 inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-stone-100 font-medium">
        <span>🌱 Soybean (Yellow):</span> <strong class="text-white font-mono font-bold">₹4,600</strong>/qtl <span class="text-emerald-300 font-normal text-[10px]">(Indore)</span> <span class="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded text-[10px]">▲ +0.9%</span>
      </span>
    </div>
  </div>
  `;
}
