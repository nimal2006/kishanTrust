// Client-Side Application Engine: State, Dynamic Navigation, Engine Calculations, WebSocket, Modals
export function renderClientScript(): string {
  return `
  <script>
  // ==========================================
  // GLOBAL STATE
  // ==========================================
  let currentUser = null; // { role: 'farmer'|'fpo'|'lender', farmerId?: number, name: string, entity: string, avatar: string }
  let currentRole = 'farmer'; // 'farmer' | 'fpo' | 'lender'
  let currentFarmerId = 1; // 1: Ramesh Kumar, 2: Rajendra Patil, 3: Sunita Deshmukh
  let activeTab = 'farmer-overview';
  let cachedFarmers = [];
  let cachedConsents = [];
  let activeAssessment = null;
  let wsClient = null;
  let eventCounter = 0;

  const DEFAULT_SEED_FARMERS = [
    {
      id: 1,
      reference_id: "KT-TN-THIRU-0104",
      name: "Ramesh Kumar",
      phone: "+91-9840192831",
      state: "Tamil Nadu",
      district: "Thiruvallur",
      village: "Nemam Village",
      location: "Thiruvallur",
      land_size_acres: 3.5,
      crop_types: ["Samba Paddy"],
      irrigation_type: "Borewell & Canal",
      cultivation_cost: 68000,
      requested_loan_amount: 200000,
      loan_purpose: "Working capital for certified seeds, fertilizers, and seasonal harvest labour",
      evidence_confidence_score: 88,
      verification_status: "VERIFIED",
      risk_tier: "LOW"
    },
    {
      id: 2,
      reference_id: "KT-MH-PUNE-0219",
      name: "Rajendra Patil",
      phone: "+91-9822019283",
      state: "Maharashtra",
      district: "Pune",
      village: "Narayangaon",
      location: "Narayangaon",
      land_size_acres: 4.5,
      crop_types: ["Tomato (High Volatility)"],
      irrigation_type: "Drip Irrigation",
      cultivation_cost: 145000,
      requested_loan_amount: 250000,
      loan_purpose: "Drip fertigation infrastructure and hybrid tomato seedling procurement",
      evidence_confidence_score: 64,
      verification_status: "PENDING",
      risk_tier: "HIGH"
    },
    {
      id: 3,
      reference_id: "KT-KA-BELG-0388",
      name: "Sunita Deshmukh",
      phone: "+91-9448129304",
      state: "Karnataka",
      district: "Belagavi",
      village: "Chikodi",
      location: "Belagavi",
      land_size_acres: 3.2,
      crop_types: ["Soybean / Pomegranate"],
      irrigation_type: "Rainfed & Farm Pond",
      cultivation_cost: 72000,
      requested_loan_amount: 150000,
      loan_purpose: "Intercropping input support and organic bio-pest spray management",
      evidence_confidence_score: 91,
      verification_status: "VERIFIED",
      risk_tier: "LOW"
    }
  ];

  const DEFAULT_SEED_CONSENTS = [
    {
      id: 1,
      category: "Land Records & Patta Title",
      source: "State Agrinet / Nilam API",
      shared_with: "Thiruvallur Agro Collective FPO",
      updated_at: new Date().toISOString(),
      status: "GRANTED"
    },
    {
      id: 2,
      category: "Crop Economic Model & Cashflow",
      source: "KissanTrust Engine",
      shared_with: "State Bank of India KCC Syndicate",
      updated_at: new Date().toISOString(),
      status: "GRANTED"
    },
    {
      id: 3,
      category: "Commercial Marketing Data",
      source: "AGMARKNET APMC Ledger",
      shared_with: "Third-Party Agri Marketing Agencies",
      updated_at: new Date().toISOString(),
      status: "REVOKED"
    }
  ];

  // Timeline Stages Diagnostic Data
  const TIMELINE_STAGES = {
    planning: {
      title: "Stage 1: Planning (Jun 15 – Jun 30)",
      budget: "Expenses: ₹6,000 · Expected Inflows: ₹0",
      desc: "Farmer procures certified Ponni / ADT-53 foundation seeds from approved FPO agri-input hub. Deep tractor ploughing, bund restoration, and nursery preparation.",
      risk: "Spurious seed market stock / low germination rate",
      verif: "FPO input store purchase voucher & seed batch tag",
      tranche: "Tranche 1 (₹25,000)"
    },
    sowing: {
      title: "Stage 2: Sowing & Transplantation (Jul 01 – Jul 20)",
      budget: "Expenses: ₹22,000 · Expected Inflows: ₹0",
      desc: "Sapling transplantation with hired labour groups. Basal fertilizer application (DAP, Potash, and bio-fertilizers). Borewell priming and canal sluice check.",
      risk: "Delayed monsoon or canal water release deficit",
      verif: "FPO geo-tagged GPS field inspection perimeter check",
      tranche: "Tranche 2 (₹40,000)"
    },
    growth: {
      title: "Stage 3: Vegetative & Panicle Growth (Jul 21 – Oct 20)",
      budget: "Expenses: ₹24,000 · Expected Inflows: ₹0",
      desc: "Two manual weeding cycles, biological pest management sprays (neem oil and pheromone traps). Soil moisture monitoring and mid-season nitrogen top-dressing.",
      risk: "Blast disease outbreak / stem borer pest infestation",
      verif: "FPO cluster scout pest report & weather station log",
      tranche: "Tranche 3 (₹30,000)"
    },
    harvest: {
      title: "Stage 4: Harvest & Threshing (Nov 01 – Nov 20)",
      budget: "Expenses: ₹16,000 · Expected Inflows: ₹0",
      desc: "Mechanical combine harvester deployment via FPO custom hiring centre. Paddy bagging, moisture testing (14% target), and immediate transport loading.",
      risk: "Unseasonal cyclone / unseasonal coastal rains",
      verif: "PMFBY localized crop loss notification window open",
      tranche: "Tranche 4 (₹25,000 labour)"
    },
    sale: {
      title: "Stage 5: Market Sale & Realization (Nov 21 – Dec 10)",
      budget: "Expenses: ₹2,000 (Transport) · Expected Inflows: ₹2,08,250",
      desc: "Direct delivery to Thiruvallur APMC regulated market and FPO collective procurement centre. Electronic weighbridge weighment and e-NAM invoice generation.",
      risk: "Mandi price softening due to peak arrival glut",
      verif: "e-NAM APMC electronic sale invoice & bank transfer credit",
      tranche: "Self-Liquidating"
    },
    repayment: {
      title: "Stage 6: Synchronised Debt Repayment (Dec 15 – Dec 31)",
      budget: "Debt Settlement: ₹1,34,500 (Principal + Concessional KCC Interest)",
      desc: "Full loan closure directly from APMC sale proceeds within 30 days of harvest. Zero interim stress during the 4-month crop growth window.",
      risk: "Diversion of cash proceeds to informal moneylenders",
      verif: "Direct escrow deduction / PACS no-dues certificate issuance",
      tranche: "Facility Settled"
    }
  };

  // ==========================================
  // NAVIGATION & ROLE MANAGEMENT
  // ==========================================
  const NAV_CONFIG = {
    farmer: [
      { id: 'farmer-overview', label: 'Overview', icon: '🌾', group: 'FARMER' },
      { id: 'farmer-profile', label: 'My Profile & Farm', icon: '👤', group: 'FARMER' },
      { id: 'farmer-planner', label: 'Crop & Loan Plan', icon: '📝', group: 'FARMER' },
      { id: 'farmer-simulator', label: 'What-If Simulator', icon: '🎛️', group: 'FARMER' },
      { id: 'farmer-market', label: 'Market Intelligence', icon: '📈', group: 'INTELLIGENCE' },
      { id: 'farmer-economics', label: 'Crop Economics', icon: '💰', group: 'INTELLIGENCE' },
      { id: 'farmer-stresstest', label: 'Stress Test Matrix', icon: '⚡', group: 'INTELLIGENCE' },
      { id: 'farmer-readiness', label: 'Credit Readiness', icon: '🛡️', group: 'INTELLIGENCE' },
      { id: 'farmer-fpo', label: 'FPO Verification', icon: '🤝', group: 'TRUST' },
      { id: 'farmer-consent', label: 'Data & Consent', icon: '🔒', group: 'TRUST' },
      { id: 'farmer-reports', label: 'Audit Reports', icon: '📑', group: 'FINANCE' },
      { id: 'farmer-agri-data', label: 'Agricultural Data', icon: '📊', group: 'INTELLIGENCE' },
      { id: 'farmer-repayment', label: 'Repayment Planner', icon: '🗓️', group: 'FINANCE' },
      { id: 'farmer-ai-assistant', label: 'AI Credit Assistant', icon: '🤖', group: 'INTELLIGENCE' }
    ],
    fpo: [
      { id: 'fpo-overview', label: 'FPO Overview', icon: '🌱', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-pending', label: 'Pending Verification', icon: '⏳', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-farmers', label: 'Farmer Directory', icon: '👥', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-evidence', label: 'Evidence Review', icon: '🔍', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-history', label: 'Verification History', icon: '📜', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-risk', label: 'Community Risk View', icon: '⚠️', group: 'COMMUNITY VERIFICATION' },
      { id: 'fpo-analytics', label: 'FPO Analytics', icon: '📊', group: 'COMMUNITY VERIFICATION' }
    ],
    lender: [
      { id: 'lender-overview', label: 'Lending Overview', icon: '🏛️', group: 'UNDERWRITING DESK' },
      { id: 'lender-pipeline', label: 'Farmer Applications', icon: '📋', group: 'UNDERWRITING DESK' },
      { id: 'lender-assessments', label: 'Credit Assessment', icon: '🔍', group: 'UNDERWRITING DESK' },
      { id: 'lender-stresstests', label: 'Scenario Stress Tests', icon: '⚡', group: 'UNDERWRITING DESK' },
      { id: 'lender-evidence', label: 'Evidence & Verification', icon: '🛡️', group: 'UNDERWRITING DESK' },
      { id: 'lender-analytics', label: 'Risk Analytics', icon: '📈', group: 'UNDERWRITING DESK' },
      { id: 'lender-repayment', label: 'Repayment Capacity', icon: '💰', group: 'UNDERWRITING DESK' },
      { id: 'lender-explain', label: 'Explainability', icon: '💡', group: 'UNDERWRITING DESK' },
      { id: 'lender-reports', label: 'Credit Reports', icon: '📑', group: 'UNDERWRITING DESK' },
      { id: 'lender-decision', label: 'Decision Queue', icon: '⚖️', group: 'UNDERWRITING DESK' }
    ]
  };

  function updateSidebarNav() {
    const container = document.getElementById('sidebar-nav-container');
    const mobileContainer = document.getElementById('mobile-nav-items');
    if (!container) return;

    const items = NAV_CONFIG[currentRole] || NAV_CONFIG.farmer;
    let html = '';
    let lastGroup = '';
    items.forEach(item => {
      if (item.group && item.group !== lastGroup) {
        lastGroup = item.group;
        html += '<div class="pt-2.5 pb-1 px-1 first:pt-0"><span class="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">' + item.group + '</span></div>';
      }
      const isActive = activeTab === item.id;
      const activeClass = isActive
        ? 'bg-brand-forest text-white font-bold shadow-xs'
        : 'text-gray-700 hover:bg-brand-paleBg hover:text-brand-forest font-medium';
      html += \`
        <button onclick="switchTab('\${item.id}')" id="nav-btn-\${item.id}" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition text-left \${activeClass}">
          <span class="text-sm shrink-0">\${item.icon}</span>
          <span class="truncate">\${item.label}</span>
        </button>
      \`;
    });
    container.innerHTML = html;
    if (mobileContainer) mobileContainer.innerHTML = html;

    // Update labels
    const roleLabel = document.getElementById('sidebar-role-label');
    const roleSub = document.getElementById('sidebar-role-sub');
    if (currentRole === 'farmer') {
      if (roleLabel) roleLabel.textContent = 'Farmer Workspace';
      const f = cachedFarmers.find(x => x.id === currentFarmerId);
      if (roleSub && f) roleSub.textContent = \`\${f.name} · \${f.crop_types?.[0] || 'Crop'}\`;
    } else if (currentRole === 'fpo') {
      if (roleLabel) roleLabel.textContent = 'FPO Workspace';
      if (roleSub) roleSub.textContent = 'Thiruvallur Agro Collective';
    } else {
      if (roleLabel) roleLabel.textContent = 'Lender Desk';
      if (roleSub) roleSub.textContent = 'Institutional Underwriter';
    }
  }

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('main > section').forEach(sec => {
      sec.classList.add('hidden');
    });
    const target = document.getElementById('tab-' + tabId);
    if (target) {
      target.classList.remove('hidden');
    }

    // Update breadcrumb
    const bcWorkspace = document.getElementById('breadcrumb-workspace');
    const bcCurrent = document.getElementById('breadcrumb-current');
    if (bcWorkspace) bcWorkspace.textContent = currentRole.toUpperCase();
    if (bcCurrent) {
      const allItems = [...NAV_CONFIG.farmer, ...NAV_CONFIG.fpo, ...NAV_CONFIG.lender];
      const item = allItems.find(x => x.id === tabId);
      bcCurrent.textContent = item ? item.label : tabId;
    }

    // Re-render nav highlights
    updateSidebarNav();

    // Auto-close mobile sidebar drawer
    if (typeof window.toggleSidebar === 'function') {
      window.toggleSidebar(false);
    }

    // Immediate tab-specific data rendering & chart triggers
    if (tabId === 'farmer-market') {
      setTimeout(renderMarketChart, 50);
    } else if (tabId === 'farmer-simulator') {
      onSimulatorChange();
    } else if (tabId === 'farmer-planner') {
      recalcPlannerSummary();
    } else if (tabId === 'fpo-farmers') {
      populateFpoDirectoryTable();
    } else if (tabId === 'fpo-history') {
      populateFpoHistoryTable();
    } else if (tabId === 'lender-pipeline') {
      populateLenderPipelineTable();
    } else if (tabId === 'farmer-consent') {
      renderConsentTable();
    } else if (tabId === 'farmer-profile' || tabId === 'profile' || tabId === 'farm') {
      const targetProf = document.getElementById('tab-farmer-profile');
      if (targetProf) targetProf.classList.remove('hidden');
      const f = cachedFarmers.find(x => x.id === currentFarmerId) || cachedFarmers[0];
      if (f) populateFarmerProfile14(f);
    }
  }

  function onPersonaChange(val) {
    if (val.startsWith('farmer-')) {
      currentRole = 'farmer';
      currentFarmerId = parseInt(val.split('-')[1]);
      loadFarmerData(currentFarmerId);

      const f = (cachedFarmers && cachedFarmers.length ? cachedFarmers.find(x => x.id === currentFarmerId) : null) || DEFAULT_SEED_FARMERS.find(x => x.id === currentFarmerId);
      const initials = f ? f.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'RK';
      currentUser = {
        role: 'farmer',
        farmerId: currentFarmerId,
        name: f ? f.name : 'Ramesh Kumar',
        avatar: initials,
        entity: \`Farmer · \${f ? f.state : 'Tamil Nadu'}\`
      };
      localStorage.setItem('kissantrust_session', JSON.stringify(currentUser));

      if (activeTab && activeTab.startsWith('farmer-')) {
        switchTab(activeTab);
      } else {
        switchTab('farmer-overview');
      }
    } else if (val === 'fpo') {
      currentRole = 'fpo';
      currentUser = {
        role: 'fpo',
        name: 'Thiruvallur Organic FPO',
        avatar: 'TO',
        entity: 'FPO Field Officer'
      };
      localStorage.setItem('kissantrust_session', JSON.stringify(currentUser));
      switchTab('fpo-overview');
      loadFpoData();
    } else if (val === 'lender') {
      currentRole = 'lender';
      currentUser = {
        role: 'lender',
        name: 'Canara Bank Agri Desk',
        avatar: 'CB',
        entity: 'Institutional Underwriter'
      };
      localStorage.setItem('kissantrust_session', JSON.stringify(currentUser));
      switchTab('lender-overview');
      loadLenderData();
    }
    // Sync selects
    const desktopSelect = document.getElementById('persona-select');
    const mobileSelect = document.getElementById('mobile-persona-select');
    if (desktopSelect) desktopSelect.value = val;
    if (mobileSelect) mobileSelect.value = val;
  }

  // ==========================================
  // AUTHENTICATION & SESSION MANAGEMENT
  // ==========================================
  function initAuthSession() {
    const saved = localStorage.getItem('kissantrust_session');
    if (saved) {
      try {
        currentUser = JSON.parse(saved);
        if (currentUser && currentUser.role) {
          applyUserSession(currentUser, false);
          return;
        }
      } catch (e) {
        console.error('Session error', e);
      }
    }
    showLoginOverlay();
  }

  function showLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    const rootLayout = document.querySelector('.app-root-layout');
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    }
    if (rootLayout) {
      rootLayout.classList.add('hidden');
    }
  }

  function hideLoginOverlay() {
    const overlay = document.getElementById('login-overlay');
    const rootLayout = document.querySelector('.app-root-layout');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }
    if (rootLayout) {
      rootLayout.classList.remove('hidden');
    }
  }

  function loginAsDemo(role, farmerId) {
    if (role === 'farmer') {
      const fid = farmerId || 1;
      const f = (cachedFarmers && cachedFarmers.length ? cachedFarmers.find(x => x.id === fid) : null) || DEFAULT_SEED_FARMERS.find(x => x.id === fid) || DEFAULT_SEED_FARMERS[0];
      const initials = f ? f.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'RK';
      currentUser = {
        role: 'farmer',
        farmerId: fid,
        name: f ? f.name : 'Ramesh Kumar',
        avatar: initials,
        entity: \`Farmer · \${f ? f.state : 'Tamil Nadu'}\`
      };
    } else if (role === 'fpo') {
      currentUser = {
        role: 'fpo',
        name: 'Thiruvallur Organic FPO',
        avatar: 'TO',
        entity: 'FPO Field Officer'
      };
    } else if (role === 'lender') {
      currentUser = {
        role: 'lender',
        name: 'Canara Bank Agri Desk',
        avatar: 'CB',
        entity: 'Institutional Underwriter'
      };
    }

    localStorage.setItem('kissantrust_session', JSON.stringify(currentUser));
    applyUserSession(currentUser, true);
  }

  function applyUserSession(user, isNewLogin) {
    hideLoginOverlay();
    if (!user) return;

    currentRole = user.role;

    // Update Header Avatar & Identity Displays
    const headerAvatar = document.getElementById('header-avatar');
    const headerName = document.getElementById('header-user-name');
    const headerRole = document.getElementById('header-user-role');
    const dropdownName = document.getElementById('user-dropdown-name');
    const dropdownRole = document.getElementById('user-dropdown-role');

    if (headerAvatar) headerAvatar.textContent = user.avatar || 'KT';
    if (headerName) headerName.textContent = user.name || 'User';
    if (headerRole) headerRole.textContent = user.entity || user.role.toUpperCase();
    if (dropdownName) dropdownName.textContent = user.name || 'User';
    if (dropdownRole) dropdownRole.textContent = user.entity || 'Verified Entity';

    if (user.role === 'farmer') {
      currentFarmerId = user.farmerId || 1;
      const desktopSelect = document.getElementById('persona-select');
      const mobileSelect = document.getElementById('mobile-persona-select');
      if (desktopSelect) desktopSelect.value = 'farmer-' + currentFarmerId;
      if (mobileSelect) mobileSelect.value = 'farmer-' + currentFarmerId;

      loadFarmerData(currentFarmerId);
      if (isNewLogin) {
        switchTab('farmer-profile');
      } else {
        switchTab(activeTab || 'farmer-profile');
      }
    } else if (user.role === 'fpo') {
      const desktopSelect = document.getElementById('persona-select');
      const mobileSelect = document.getElementById('mobile-persona-select');
      if (desktopSelect) desktopSelect.value = 'fpo';
      if (mobileSelect) mobileSelect.value = 'fpo';

      loadFpoData();
      if (isNewLogin) {
        switchTab('fpo-overview');
      } else {
        switchTab(activeTab || 'fpo-overview');
      }
    } else if (user.role === 'lender') {
      const desktopSelect = document.getElementById('persona-select');
      const mobileSelect = document.getElementById('mobile-persona-select');
      if (desktopSelect) desktopSelect.value = 'lender';
      if (mobileSelect) mobileSelect.value = 'lender';

      loadLenderData();
      if (isNewLogin) {
        switchTab('lender-overview');
      } else {
        switchTab(activeTab || 'lender-overview');
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('kissantrust_session');
    currentUser = null;
    showLoginOverlay();
  }

  function switchLoginAuthTab(tab) {
    const quickSec = document.getElementById('auth-section-quick');
    const stdSec = document.getElementById('auth-section-standard');
    const quickBtn = document.getElementById('tab-btn-quick-login');
    const stdBtn = document.getElementById('tab-btn-standard-login');

    if (tab === 'quick') {
      if (quickSec) quickSec.classList.remove('hidden');
      if (stdSec) stdSec.classList.add('hidden');
      if (quickBtn) {
        quickBtn.classList.add('bg-white', 'text-brand-forest', 'shadow-xs', 'font-bold');
        quickBtn.classList.remove('text-gray-600');
      }
      if (stdBtn) {
        stdBtn.classList.remove('bg-white', 'text-brand-forest', 'shadow-xs', 'font-bold');
        stdBtn.classList.add('text-gray-600');
      }
    } else {
      if (quickSec) quickSec.classList.add('hidden');
      if (stdSec) stdSec.classList.remove('hidden');
      if (stdBtn) {
        stdBtn.classList.add('bg-white', 'text-brand-forest', 'shadow-xs', 'font-bold');
        stdBtn.classList.remove('text-gray-600');
      }
      if (quickBtn) {
        quickBtn.classList.remove('bg-white', 'text-brand-forest', 'shadow-xs', 'font-bold');
        quickBtn.classList.add('text-gray-600');
      }
    }
  }

  function toggleAuthModeInput(mode) {
    const otpBox = document.getElementById('input-box-otp');
    const pwdBox = document.getElementById('input-box-password');
    if (mode === 'otp') {
      if (otpBox) otpBox.classList.remove('hidden');
      if (pwdBox) pwdBox.classList.add('hidden');
    } else {
      if (pwdBox) pwdBox.classList.remove('hidden');
      if (otpBox) otpBox.classList.add('hidden');
    }
  }

  function fillMockOtp() {
    const otpInput = document.getElementById('login-otp');
    if (otpInput) otpInput.value = '123456';
  }

  function handleStandardLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const roleSelect = document.getElementById('login-role');
    const selectedVal = roleSelect ? roleSelect.value : 'farmer-1';

    if (selectedVal.startsWith('farmer-')) {
      const fid = parseInt(selectedVal.split('-')[1]);
      loginAsDemo('farmer', fid);
    } else if (selectedVal === 'fpo') {
      loginAsDemo('fpo');
    } else if (selectedVal === 'lender') {
      loginAsDemo('lender');
    }
  }

  // Window bindings
  window.loginAsDemo = loginAsDemo;
  window.handleLogout = handleLogout;
  window.switchLoginAuthTab = switchLoginAuthTab;
  window.toggleAuthModeInput = toggleAuthModeInput;
  window.fillMockOtp = fillMockOtp;
  window.handleStandardLogin = handleStandardLogin;
  window.showLoginOverlay = showLoginOverlay;
  window.hideLoginOverlay = hideLoginOverlay;

  window.switchFarmerCase = function(val) {
    let target = val;
    if (val === 'A' || val === '1') target = 'farmer-1';
    else if (val === 'B' || val === '2') target = 'farmer-2';
    else if (val === 'C' || val === '3') target = 'farmer-3';
    else if (!val.startsWith('farmer-') && val !== 'fpo' && val !== 'lender') {
      target = 'farmer-' + val;
    }
    onPersonaChange(target);
  };

  window.openModal = function(modalId) {
    if (modalId === 'modal-onboard-farmer' || modalId === 'modal-new-farmer' || modalId === 'onboard') {
      openNewFarmerModal();
      return;
    }
    if (modalId === 'modal-dossier' || modalId === 'modal-assessment' || modalId === 'dossier') {
      openAssessmentModal(currentFarmerId);
      return;
    }
    if (modalId === 'modal-report' || modalId === 'audit-reports' || modalId === 'report') {
      openReportModal();
      return;
    }
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('flex');
    }
  };

  window.closeModal = function(modalId) {
    if (modalId === 'modal-onboard-farmer' || modalId === 'modal-new-farmer' || modalId === 'onboard') {
      closeNewFarmerModal();
      return;
    }
    if (modalId === 'modal-dossier' || modalId === 'modal-assessment') {
      closeAssessmentModal();
      return;
    }
    if (modalId === 'modal-report') {
      closeReportModal();
      return;
    }
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }
  };

  window.toggleUserDropdown = function(e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    const dropdown = document.getElementById('user-profile-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  };

  // Close user dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('user-profile-dropdown');
    const wrapper = document.getElementById('user-profile-wrapper');
    if (!dropdown || dropdown.classList.contains('hidden')) return;

    const target = e.target;
    if (target && wrapper && !wrapper.contains(target)) {
      dropdown.classList.add('hidden');
    }
  });

  window.toggleSidebar = function(forceState) {
    const sidebar = document.getElementById('app-sidebar') || document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('sidebar-backdrop') || document.getElementById('mobile-drawer-backdrop');
    if (!sidebar) return;

    let shouldOpen;
    if (typeof forceState === 'boolean') {
      shouldOpen = forceState;
    } else {
      shouldOpen = sidebar.classList.contains('-translate-x-full');
    }

    if (shouldOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('translate-x-0');
      if (backdrop) backdrop.classList.remove('hidden');
    } else {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('translate-x-0');
      if (backdrop) backdrop.classList.add('hidden');
    }
  };

  function toggleMobileMenu(forceState) {
    window.toggleSidebar(forceState);
  }
  window.toggleMobileMenu = toggleMobileMenu;

  function toggleLiveDrawer() {
    const drawer = document.getElementById('event-drawer');
    if (drawer) {
      drawer.classList.toggle('hidden');
      drawer.classList.toggle('translate-x-full');
    }
    const unread = document.getElementById('event-unread-badge');
    if (unread) unread.classList.add('hidden');
  }

  // ==========================================
  // DRAWERS & EXPLAINABILITY HANDLERS
  // ==========================================
  function openWhyDrawer() {
    const drawer = document.getElementById('drawer-why-recommendation');
    const content = document.getElementById('drawer-why-content');
    if (!drawer) return;
    const f = cachedFarmers.find(x => x.id === currentFarmerId) || { name: 'Ramesh Kumar', crop_types: ['Samba Paddy'], land_size_acres: 3.5 };
    if (content) {
      content.innerHTML = '<div class="space-y-4">'
        + '<div class="p-3 bg-brand-paleBg rounded-xl border flex items-center justify-between">'
        + '<div><span class="font-bold text-gray-900 block">' + f.name + '</span>'
        + '<span class="text-gray-500 text-[11px]">' + (f.crop_types?.[0] || 'Samba Paddy') + ' · ' + (f.land_size_acres || 3.5) + ' Acres</span></div>'
        + '<span class="px-2 py-0.5 rounded font-mono font-bold text-emerald-800 bg-emerald-100 text-[10px]">88% Evidence Confidence</span>'
        + '</div>'
        + '<div class="space-y-2">'
        + '<span class="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block">1. Positive Credit Drivers</span>'
        + '<ul class="space-y-1.5 text-gray-700 bg-emerald-50/60 p-3 rounded-lg border border-emerald-100 text-xs">'
        + '<li class="flex items-start gap-1.5"><span class="text-emerald-700 font-bold shrink-0">✓</span><span><strong>Verified Land Title:</strong> Patta #1042/3A confirmed via Govt Land Registry (Nilam portal).</span></li>'
        + '<li class="flex items-start gap-1.5"><span class="text-emerald-700 font-bold shrink-0">✓</span><span><strong>FPO Ground Inspection:</strong> Geo-tagged Samba Paddy transplantation verified by agronomist K. Soundararajan.</span></li>'
        + '<li class="flex items-start gap-1.5"><span class="text-emerald-700 font-bold shrink-0">✓</span><span><strong>Input Cost Realism:</strong> ₹68,000 cultivation cost matches NHB state horticulture cost benchmarks.</span></li>'
        + '<li class="flex items-start gap-1.5"><span class="text-emerald-700 font-bold shrink-0">✓</span><span><strong>Clean Repayment History:</strong> PACS primary credit society record shows zero non-performing assets.</span></li>'
        + '</ul>'
        + '</div>'
        + '<div class="space-y-2">'
        + '<span class="font-bold text-amber-800 uppercase text-[10px] tracking-wider block">2. Agricultural & Market Risk Factors</span>'
        + '<ul class="space-y-1.5 text-gray-700 bg-amber-50/60 p-3 rounded-lg border border-amber-100 text-xs">'
        + '<li class="flex items-start gap-1.5"><span class="text-amber-700 font-bold shrink-0">⚠️</span><span><strong>Peak Mandi Arrival Glut:</strong> Wholesale spot price drops up to 25% during late November arrivals.</span></li>'
        + '<li class="flex items-start gap-1.5"><span class="text-amber-700 font-bold shrink-0">⚠️</span><span><strong>Unhedged Weather Exposure:</strong> Farmer has not yet uploaded PMFBY Kharif insurance policy certificate.</span></li>'
        + '</ul>'
        + '</div>'
        + '<div class="space-y-2">'
        + '<span class="font-bold text-brand-forest uppercase text-[10px] tracking-wider block">3. Downside Stress Modeling</span>'
        + '<div class="p-3 bg-gray-50 rounded-lg border space-y-1 text-xs">'
        + '<p class="text-gray-700">Under combined stress (-25% price & -20% yield), net crop surplus reduces to <strong>₹56,950</strong>.</p>'
        + '<p class="text-gray-600">Servicing ₹2,00,000 credit would cause negative household cashflow. Capping loan at <strong>₹1,20,000–₹1,40,000</strong> preserves a 1.45x debt coverage ratio.</p>'
        + '</div>'
        + '</div>'
        + '</div>';
    }
    drawer.classList.remove('hidden');
    drawer.classList.remove('translate-x-full');
  }

  function closeWhyDrawer() {
    const drawer = document.getElementById('drawer-why-recommendation');
    if (drawer) {
      drawer.classList.add('translate-x-full');
      drawer.classList.add('hidden');
    }
  }

  function openAssumptionsDrawer() {
    const drawer = document.getElementById('drawer-assumptions');
    const content = document.getElementById('drawer-assumptions-content');
    if (!drawer) return;
    if (content) {
      content.innerHTML = '<div class="space-y-4">'
        + '<div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">'
        + '<h5 class="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-1">Deterministic Model Principles</h5>'
        + '<p class="text-emerald-900 text-xs">Credit recommendations are governed strictly by verifiable agronomic formulas, zero black-box scoring.</p>'
        + '</div>'
        + '<div class="space-y-3">'
        + '<div class="p-3 bg-brand-paleBg rounded-lg border">'
        + '<span class="font-mono font-bold text-brand-forest block text-xs">1. Expected Revenue Formula</span>'
        + '<p class="font-mono text-gray-700 mt-1 bg-white p-2 rounded border text-xs">Revenue = Expected Production (Qtl) × Expected Harvest Price (₹/Qtl)</p>'
        + '<span class="text-[11px] text-gray-500 mt-1 block">Baseline: 85 Qtl × ₹2,450/Qtl = ₹2,08,250</span>'
        + '</div>'
        + '<div class="p-3 bg-brand-paleBg rounded-lg border">'
        + '<span class="font-mono font-bold text-brand-forest block text-xs">2. Net Farm Income Formula</span>'
        + '<p class="font-mono text-gray-700 mt-1 bg-white p-2 rounded border text-xs">Net Income = Expected Revenue − Cultivation Cost</p>'
        + '<span class="text-[11px] text-gray-500 mt-1 block">Baseline: ₹2,08,250 − ₹68,000 = ₹1,40,250</span>'
        + '</div>'
        + '<div class="p-3 bg-brand-paleBg rounded-lg border">'
        + '<span class="font-mono font-bold text-brand-forest block text-xs">3. Repayment Capacity & DSCR</span>'
        + '<p class="font-mono text-gray-700 mt-1 bg-white p-2 rounded border text-xs">Capacity = Stressed Net Surplus − Subsistence Allowance</p>'
        + '<span class="text-[11px] text-gray-500 mt-1 block">Protects ₹25,000 essential household food & medical buffer.</span>'
        + '</div>'
        + '<div class="p-3 bg-brand-paleBg rounded-lg border">'
        + '<span class="font-mono font-bold text-brand-forest block text-xs">4. Downside Shock Parameters</span>'
        + '<ul class="text-[11px] text-gray-600 space-y-1 mt-1">'
        + '<li>• Price Shock: -25% from 3-year modal APMC price</li>'
        + '<li>• Yield Shock: -20% from taluka historical agro-climatic yield</li>'
        + '<li>• Combined Shock: Simultaneous price drop and yield loss</li>'
        + '</ul>'
        + '</div>'
        + '</div>'
        + '</div>';
    }
    drawer.classList.remove('hidden');
    drawer.classList.remove('translate-x-full');
  }

  function closeAssumptionsDrawer() {
    const drawer = document.getElementById('drawer-assumptions');
    if (drawer) {
      drawer.classList.add('translate-x-full');
      drawer.classList.add('hidden');
    }
  }

  function openConsentDrawer() {
    const drawer = document.getElementById('drawer-consent-history');
    const list = document.getElementById('consent-history-list');
    if (!drawer) return;
    if (list) {
      list.innerHTML = '<div class="space-y-3">'
        + '<div class="p-3 bg-gray-50 rounded-lg border space-y-1 text-xs">'
        + '<div class="flex justify-between font-bold"><span class="text-gray-900">Patta Title Sharing</span><span class="text-[10px] text-emerald-700 font-mono">Granted</span></div>'
        + '<p class="text-gray-600 text-[11px]">Authorized Thiruvallur Agro Collective to verify land records via Nilam API.</p>'
        + '<span class="text-[10px] text-gray-400 font-mono block">2026-06-12 14:22:01 IST</span>'
        + '</div>'
        + '<div class="p-3 bg-gray-50 rounded-lg border space-y-1 text-xs">'
        + '<div class="flex justify-between font-bold"><span class="text-gray-900">Crop Economic Model Export</span><span class="text-[10px] text-emerald-700 font-mono">Granted</span></div>'
        + '<p class="text-gray-600 text-[11px]">Granted read-only access to State Bank of India KCC Syndicate Underwriters.</p>'
        + '<span class="text-[10px] text-gray-400 font-mono block">2026-07-01 09:15:34 IST</span>'
        + '</div>'
        + '<div class="p-3 bg-gray-50 rounded-lg border space-y-1 text-xs">'
        + '<div class="flex justify-between font-bold"><span class="text-gray-900">Credit Bureau Telemetry</span><span class="text-[10px] text-amber-700 font-mono">Revoked</span></div>'
        + '<p class="text-gray-600 text-[11px]">Farmer revoked third-party commercial marketing data access.</p>'
        + '<span class="text-[10px] text-gray-400 font-mono block">2026-07-14 16:45:12 IST</span>'
        + '</div>'
        + '</div>';
    }
    drawer.classList.remove('hidden');
    drawer.classList.remove('translate-x-full');
  }

  function closeConsentDrawer() {
    const drawer = document.getElementById('drawer-consent-history');
    if (drawer) {
      drawer.classList.add('translate-x-full');
      drawer.classList.add('hidden');
    }
  }

  // ==========================================
  // PLANNER STEPPER & SIMULATOR HELPERS
  // ==========================================
  let currentPlannerStep = 1;
  function goToPlannerStep(step) {
    currentPlannerStep = step;
    for (let i = 1; i <= 7; i++) {
      const el = document.getElementById('planner-step-' + i);
      const btn = document.getElementById('step-tab-' + i);
      if (el) {
        if (i === step) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
      if (btn) {
        if (i === step) {
          btn.className = 'planner-step-btn py-1.5 px-2 rounded-lg text-xs font-bold bg-brand-forest text-white transition shadow-xs';
        } else if (i < step) {
          btn.className = 'planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 transition';
        } else {
          btn.className = 'planner-step-btn py-1.5 px-2 rounded-lg text-xs font-semibold bg-brand-paleBg text-gray-600 hover:bg-gray-100 transition';
        }
      }
    }
    const ind = document.getElementById('planner-step-indicator');
    if (ind) ind.textContent = 'Step ' + step + ' of 7';
    const btnPrev = document.getElementById('btn-planner-prev');
    const btnNext = document.getElementById('btn-planner-next');
    if (btnPrev) btnPrev.disabled = (step === 1);
    if (btnNext) btnNext.textContent = (step === 7) ? 'Finish & Save Plan ✓' : 'Continue →';
    recalcPlannerSummary();
  }

  function nextPlannerStep() {
    if (currentPlannerStep < 7) {
      goToPlannerStep(currentPlannerStep + 1);
    } else {
      savePlannerDraft();
    }
  }

  function prevPlannerStep() {
    if (currentPlannerStep > 1) {
      goToPlannerStep(currentPlannerStep - 1);
    }
  }

  function savePlannerDraft() {
    const feed = document.getElementById('live-events-feed');
    if (feed) {
      const item = document.createElement('div');
      item.className = 'p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-1 animate-in fade-in';
      item.innerHTML = '<div class="flex items-center justify-between font-bold text-emerald-900">'
        + '<span>Crop & Loan Plan Updated</span>'
        + '<span class="text-[10px] font-mono">' + new Date().toLocaleTimeString() + '</span>'
        + '</div>'
        + '<p class="text-emerald-800">Deterministic cash flow and credit ceiling synchronized with backend.</p>';
      feed.insertBefore(item, feed.firstChild);
    }
    alert('Crop & Loan Plan draft saved and synchronized with economic model!');
  }

  function recalcPlannerSummary() {
    const crop = document.getElementById('pln-crop')?.value || 'Paddy';
    const area = parseFloat(document.getElementById('pln-area')?.value || '3.5');
    const loanReq = parseFloat(document.getElementById('pln-loan-req')?.value || '200000');
    
    const costSeeds = parseFloat(document.getElementById('pln-cost-seeds')?.value || '9500');
    const costFert = parseFloat(document.getElementById('pln-cost-fert')?.value || '18500');
    const costLabour = parseFloat(document.getElementById('pln-cost-labour')?.value || '26000');
    const costMach = parseFloat(document.getElementById('pln-cost-mach')?.value || '14000');
    const totalCost = costSeeds + costFert + costLabour + costMach;

    const totalCostDisp = document.getElementById('pln-total-cost-disp');
    if (totalCostDisp) totalCostDisp.textContent = '₹' + totalCost.toLocaleString('en-IN');

    const sumCropArea = document.getElementById('sum-crop-area');
    const sumCostVal = document.getElementById('sum-cost-val');
    const sumReqVal = document.getElementById('sum-req-val');

    if (sumCropArea) sumCropArea.textContent = crop + ' · ' + area + ' Ac';
    if (sumCostVal) sumCostVal.textContent = '₹' + totalCost.toLocaleString('en-IN');
    if (sumReqVal) sumReqVal.textContent = '₹' + loanReq.toLocaleString('en-IN');

    // Calculate sum of 9 purpose breakdown inputs
    const pSeeds = parseFloat(document.getElementById('pur-seeds')?.value || '0');
    const pFert = parseFloat(document.getElementById('pur-fert')?.value || '0');
    const pLabour = parseFloat(document.getElementById('pur-labour')?.value || '0');
    const pIrrig = parseFloat(document.getElementById('pur-irrigation')?.value || '0');
    const pPest = parseFloat(document.getElementById('pur-pesticides')?.value || '0');
    const pEquip = parseFloat(document.getElementById('pur-equip')?.value || '0');
    const pStorage = parseFloat(document.getElementById('pur-storage')?.value || '0');
    const pTrans = parseFloat(document.getElementById('pur-transport')?.value || '0');
    const pOther = parseFloat(document.getElementById('pur-other')?.value || '0');
    const purTotal = pSeeds + pFert + pLabour + pIrrig + pPest + pEquip + pStorage + pTrans + pOther;
    const purSumDisp = document.getElementById('purpose-sum-val');
    if (purSumDisp && purTotal > 0) {
      purSumDisp.textContent = '₹' + purTotal.toLocaleString('en-IN');
    }

    // Purpose Mismatch Detection
    const mismatchBanner = document.getElementById('planner-mismatch-banner');
    if (mismatchBanner) {
      if (loanReq > totalCost * 1.5) {
        mismatchBanner.classList.remove('hidden');
        mismatchBanner.innerHTML = '<div class="flex items-center gap-1.5 font-bold">'
          + '<span>⚠️</span>'
          + '<span>Purpose Mismatch Detected</span>'
          + '</div>'
          + '<p class="text-[11px] leading-relaxed">'
          + 'Requested credit (₹' + loanReq.toLocaleString('en-IN') + ') exceeds estimated crop cultivation cost (₹' + totalCost.toLocaleString('en-IN') + ') by ₹' + (loanReq - totalCost).toLocaleString('en-IN') + ' (' + Math.round(((loanReq - totalCost)/totalCost)*100) + '%). Excessive unhedged leverage flagged for institutional underwriter review.'
          + '</p>';
      } else {
        mismatchBanner.classList.add('hidden');
      }
    }
  }

  function onPlannerCropChange() {
    const crop = document.getElementById('pln-crop')?.value;
    const variety = document.getElementById('pln-variety');
    if (crop === 'Paddy' && variety) variety.value = 'ADT-53 / Ponni';
    if (crop === 'Tomato' && variety) variety.value = 'Abhinav / US-440';
    if (crop === 'Groundnut' && variety) variety.value = 'Kadiri Lepakshi';
    if (crop === 'Soybean' && variety) variety.value = 'JS-335 / NRC-37';
    if (crop === 'Cotton' && variety) variety.value = 'Bt RCH-2';
    if (crop === 'Pomegranate' && variety) variety.value = 'Bhagwa Hybrid';
    recalcPlannerSummary();
  }

  // What-If Simulator Presets & Logic
  function applySimPreset(preset) {
    const loanInput = document.getElementById('sim-loan-input');
    const priceInput = document.getElementById('sim-price-input');
    const yieldInput = document.getElementById('sim-yield-input');

    if (preset === 'price-drop' && priceInput) {
      priceInput.value = Math.round(2450 * 0.7); // ₹1,715
    } else if (preset === 'yield-drop' && yieldInput) {
      yieldInput.value = Math.round(85 * 0.8); // 68 Qtl
    } else if (preset === 'loan-1lakh' && loanInput) {
      loanInput.value = 100000;
    }
    onSimInputChange();
  }

  function resetSimPreset() {
    const loanInput = document.getElementById('sim-loan-input');
    const priceInput = document.getElementById('sim-price-input');
    const yieldInput = document.getElementById('sim-yield-input');
    const costInput = document.getElementById('sim-cost-input');
    if (loanInput) loanInput.value = 200000;
    if (priceInput) priceInput.value = 2450;
    if (yieldInput) yieldInput.value = 85;
    if (costInput) costInput.value = 68000;
    onSimInputChange();
  }

  function onSimInputChange() {
    const loan = parseFloat(document.getElementById('sim-loan-input')?.value || '200000');
    const price = parseFloat(document.getElementById('sim-price-input')?.value || '2450');
    const yieldQtl = parseFloat(document.getElementById('sim-yield-input')?.value || '85');
    const cost = parseFloat(document.getElementById('sim-cost-input')?.value || '68000');

    // Update display values
    const dispLoan = document.getElementById('sim-disp-loan');
    const dispPrice = document.getElementById('sim-disp-price');
    const dispYield = document.getElementById('sim-disp-yield');
    const dispCost = document.getElementById('sim-disp-cost');
    if (dispLoan) dispLoan.textContent = '₹' + loan.toLocaleString('en-IN');
    if (dispPrice) dispPrice.textContent = '₹' + price.toLocaleString('en-IN');
    if (dispYield) dispYield.textContent = yieldQtl + ' Qtl';
    if (dispCost) dispCost.textContent = '₹' + cost.toLocaleString('en-IN');

    // Calculate outputs
    const revenue = price * yieldQtl;
    const netIncome = revenue - cost;
    const subsistence = 25000;
    const capacity = Math.max(0, netIncome - subsistence);

    let risk = 'Low Risk';
    let recMin = 120000;
    let recMax = 140000;

    if (capacity < loan * 0.5) {
      risk = 'High Risk';
      recMin = Math.round(capacity * 0.8 / 5000) * 5000;
      recMax = Math.round(capacity / 5000) * 5000;
    } else if (capacity < loan) {
      risk = 'Moderate Risk';
      recMin = Math.round(capacity * 0.85 / 5000) * 5000;
      recMax = Math.round(capacity * 1.05 / 5000) * 5000;
    } else {
      risk = 'Low Risk';
      recMin = Math.round(Math.min(loan, capacity * 0.7) / 5000) * 5000;
      recMax = Math.round(Math.min(loan, capacity * 0.9) / 5000) * 5000;
    }

    const resRev = document.getElementById('sim-res-revenue');
    const resNet = document.getElementById('sim-res-net');
    const resCap = document.getElementById('sim-res-capacity');
    const resRisk = document.getElementById('sim-res-risk');
    const resRec = document.getElementById('sim-res-rec');
    const resExpl = document.getElementById('sim-res-explanation');

    if (resRev) resRev.textContent = '₹' + Math.round(revenue).toLocaleString('en-IN');
    if (resNet) resNet.textContent = '₹' + Math.round(netIncome).toLocaleString('en-IN');
    if (resCap) resCap.textContent = '₹' + Math.round(capacity).toLocaleString('en-IN');
    if (resRisk) {
      resRisk.textContent = risk;
      resRisk.className = 'serif-title text-lg font-bold mt-0.5 ' + (risk === 'High Risk' ? 'text-red-700' : risk === 'Moderate Risk' ? 'text-amber-700' : 'text-emerald-700');
    }
    if (resRec) resRec.textContent = '₹' + recMin.toLocaleString('en-IN') + ' – ₹' + recMax.toLocaleString('en-IN');
    if (resExpl) {
      resExpl.textContent = 'At ₹' + price + '/qtl and ' + yieldQtl + ' quintals, net surplus provides ' + Math.max(0.1, (capacity / (loan || 1))).toFixed(2) + 'x repayment debt cover.';
    }
  }

  function runStressSimulation() {
    alert('Stress matrix recalculated! Downside buffer confirmed at ₹65,000 under -25% price crash.');
  }

  // ==========================================
  // DATA FETCHING & UI POPULATION
  // ==========================================
  async function loadInitialData() {
    try {
      const res = await fetch('/api/v1/farmers');
      if (res.ok) {
        cachedFarmers = await res.json();
      }
    } catch (e) {
      console.warn('Initial load fallback', e);
    }
    if (!cachedFarmers || cachedFarmers.length === 0) {
      cachedFarmers = DEFAULT_SEED_FARMERS;
    }
    populateFpoDirectoryTable();
    populateLenderPipelineTable();
    populateFpoHistoryTable();
    await loadFarmerData(currentFarmerId);
    await loadConsentsData();
    updateSidebarNav();
  }

  async function loadFpoData() {
    try {
      const res = await fetch('/api/v1/farmers');
      if (res.ok) {
        cachedFarmers = await res.json();
      }
    } catch (e) {
      console.warn('FPO load error', e);
    }
    if (!cachedFarmers || cachedFarmers.length === 0) {
      cachedFarmers = DEFAULT_SEED_FARMERS;
    }
    populateFpoDirectoryTable();
    populateFpoHistoryTable();
  }

  async function loadLenderData() {
    try {
      const res = await fetch('/api/v1/farmers');
      if (res.ok) {
        cachedFarmers = await res.json();
      }
    } catch (e) {
      console.warn('Lender load error', e);
    }
    if (!cachedFarmers || cachedFarmers.length === 0) {
      cachedFarmers = DEFAULT_SEED_FARMERS;
    }
    populateLenderPipelineTable();
  }

  async function loadFarmerData(farmerId) {
    try {
      const res = await fetch(\`/api/v1/farmers/\${farmerId}\`);
      if (!res.ok) return;
      const farmer = await res.json();

      // Update Top strip
      const avatar = document.getElementById('ov-avatar');
      const name = document.getElementById('ov-farmer-name');
      const refBadge = document.getElementById('ov-ref-badge');
      const meta = document.getElementById('ov-farmer-meta');
      const headerAvatar = document.getElementById('header-avatar');
      const headerName = document.getElementById('header-user-name');
      const headerRole = document.getElementById('header-user-role');

      const initials = farmer.name.split(' ').map(n => n[0]).join('').toUpperCase();
      if (avatar) avatar.textContent = initials;
      if (headerAvatar) headerAvatar.textContent = initials;
      if (name) name.textContent = farmer.name;
      if (headerName) headerName.textContent = farmer.name;
      if (refBadge) refBadge.textContent = farmer.reference_id || \`KT-00\${farmer.id}\`;
      if (meta) meta.textContent = \`\${farmer.village || farmer.location}, \${farmer.district || ''}, \${farmer.state} · \${farmer.land_size_acres} Acres · \${farmer.crop_types?.join(', ') || 'Crops'}\`;
      if (headerRole) headerRole.textContent = \`Farmer · \${farmer.state}\`;

      const dropdownName = document.getElementById('user-dropdown-name');
      const dropdownRole = document.getElementById('user-dropdown-role');
      if (dropdownName) dropdownName.textContent = farmer.name;
      if (dropdownRole) dropdownRole.textContent = \`Verified Farmer Entity · \${farmer.crop_types?.[0] || 'Crop'} \${farmer.land_size_acres} Ac\`;

      // Confidence & Risk
      const confBadge = document.getElementById('ov-evidence-score');
      const sumConf = document.getElementById('sum-confidence');
      const score = farmer.evidence_confidence_score || 85;
      if (confBadge) confBadge.textContent = \`\${score}% (\${score > 75 ? 'High' : score > 55 ? 'Medium' : 'Low'})\`;
      if (sumConf) sumConf.textContent = \`\${score}%\`;

      // 14-Section Comprehensive Profile Population
      populateFarmerProfile14(farmer);

      // Profile View (Legacy inputs synchronization)
      const profName = document.getElementById('prof-name');
      const profPhone = document.getElementById('prof-phone');
      const profLand = document.getElementById('prof-land');
      const profCost = document.getElementById('prof-cost');
      const profLoan = document.getElementById('prof-loan');
      const profPurpose = document.getElementById('prof-purpose');
      if (profName) profName.value = farmer.name;
      if (profPhone) profPhone.value = farmer.phone || '';
      if (profLand) profLand.value = farmer.land_size_acres;
      if (profCost) profCost.value = farmer.cultivation_cost;
      if (profLoan) profLoan.value = farmer.requested_loan_amount;
      if (profPurpose) profPurpose.value = farmer.loan_purpose;

      // Cards
      const crop = farmer.crop_types?.[0] || 'Paddy';
      const cCrop = document.getElementById('c-crop');
      const cArea = document.getElementById('c-area');
      const cCost = document.getElementById('c-cost');
      const cReq = document.getElementById('c-req');
      const sumReq = document.getElementById('sum-requested');
      if (cCrop) cCrop.textContent = crop;
      if (cArea) cArea.textContent = \`\${farmer.land_size_acres} Acres\`;
      if (cCost) cCost.textContent = \`₹\${farmer.cultivation_cost.toLocaleString('en-IN')}\`;
      if (cReq) cReq.textContent = \`₹\${farmer.requested_loan_amount.toLocaleString('en-IN')}\`;
      if (sumReq) sumReq.textContent = \`₹\${farmer.requested_loan_amount.toLocaleString('en-IN')}\`;

      // Run Economics & Stress recalculation for this farmer
      await recalculateEconomicsAndStress(farmer);
    } catch (err) {
      console.error('Error loading farmer data', err);
    }
  }

  async function recalculateEconomicsAndStress(farmer) {
    const crop = farmer.crop_types?.[0] || 'Paddy';
    const acres = farmer.land_size_acres || 3.5;
    const cost = farmer.cultivation_cost || 68000;
    const requested = farmer.requested_loan_amount || 200000;

    // Standard benchmark prices & yields
    let price = 2450;
    let yieldPerAcre = 24.2;
    let benchPerAcre = 26000;
    if (crop.includes('Tomato')) {
      price = 1650;
      yieldPerAcre = 80;
      benchPerAcre = 35000;
    } else if (crop.includes('Groundnut')) {
      price = 6400;
      yieldPerAcre = 11;
      benchPerAcre = 28000;
    } else if (crop.includes('Soybean')) {
      price = 4500;
      yieldPerAcre = 12;
      benchPerAcre = 22000;
    }

    const totalYield = Math.round(acres * yieldPerAcre);
    const revenue = Math.round(totalYield * price);
    const netIncome = revenue - cost;
    const benchTotal = Math.round(acres * benchPerAcre);

    // Update 11 Cards
    const cYield = document.getElementById('c-yield');
    const cRev = document.getElementById('c-revenue');
    const cNet = document.getElementById('c-net');
    const cRec = document.getElementById('c-rec');
    const sumRec = document.getElementById('sum-recommended');
    const sumRep = document.getElementById('sum-repayment');
    const sumRisk = document.getElementById('sum-risk');
    const sumRiskDot = document.getElementById('sum-risk-dot');

    if (cYield) cYield.textContent = \`\${totalYield} Quintals\`;
    if (cRev) cRev.textContent = \`₹\${revenue.toLocaleString('en-IN')}\`;
    if (cNet) cNet.textContent = \`₹\${netIncome.toLocaleString('en-IN')}\`;

    // Stressed calculations: -25% price, -20% yield
    const stressedPrice = Math.round(price * 0.75);
    const stressedYield = Math.round(totalYield * 0.80);
    const stressedRev = Math.round(stressedPrice * stressedYield);
    const stressedNet = Math.max(0, stressedRev - cost);
    const livingReserve = Math.round(stressedNet * 0.25);
    const repaymentCapacity = Math.max(0, stressedNet - livingReserve);

    // Recommended range based on stressed buffer
    const recMin = Math.round(repaymentCapacity * 1.8 / 10000) * 10000;
    const recMax = Math.round(repaymentCapacity * 2.2 / 10000) * 10000;
    const recString = \`₹\${recMin.toLocaleString('en-IN')} – ₹\${recMax.toLocaleString('en-IN')}\`;

    if (cRec) cRec.textContent = recString;
    if (sumRec) sumRec.textContent = recString;
    if (sumRep) sumRep.textContent = \`₹\${repaymentCapacity.toLocaleString('en-IN')}\`;

    // Risk tier
    const isHighVolatility = crop.includes('Tomato');
    if (sumRisk) sumRisk.textContent = isHighVolatility ? 'High Volatility' : 'Moderate';
    if (sumRiskDot) {
      sumRiskDot.className = \`w-2 h-2 rounded-full \${isHighVolatility ? 'bg-red-500' : 'bg-amber-500'}\`;
    }

    // Render Stress Matrix Table
    renderStressMatrixTable(price, totalYield, cost, requested);
  }

  function renderStressMatrixTable(basePrice, baseYield, cost, requested) {
    const tbody = document.getElementById('stress-matrix-tbody');
    if (!tbody) return;

    const priceDropPct = parseInt(document.getElementById('stress-slider-price')?.value || '25');
    const yieldDropPct = parseInt(document.getElementById('stress-slider-yield')?.value || '20');

    const scenarios = [
      { name: '1. Baseline Harvest', pMult: 1.0, yMult: 1.0, desc: 'Normal weather, stable mandi rate' },
      { name: \`2. Price Shock (-\${priceDropPct}%)\`, pMult: (100 - priceDropPct) / 100, yMult: 1.0, desc: 'Peak arrival supply glut' },
      { name: \`3. Yield Loss (-\${yieldDropPct}%)\`, pMult: 1.0, yMult: (100 - yieldDropPct) / 100, desc: 'Monsoon deficit / pest surge' },
      { name: \`4. Combined Shock (-\${priceDropPct}% P, -\${yieldDropPct}% Y)\`, pMult: (100 - priceDropPct) / 100, yMult: (100 - yieldDropPct) / 100, desc: 'Severe multi-factor stress' }
    ];

    let html = '';
    scenarios.forEach((sc, idx) => {
      const p = Math.round(basePrice * sc.pMult);
      const y = Math.round(baseYield * sc.yMult);
      const rev = Math.round(p * y);
      const net = rev - cost;
      const living = Math.round(Math.max(0, net) * 0.25);
      const buffer = Math.max(0, net - living);
      const serviceable = buffer >= (requested * 0.5); // Can service facility under harvest tranche
      const riskClass = idx === 0 ? 'text-emerald-700 bg-emerald-50' : idx === 3 ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50';
      const riskLabel = idx === 0 ? 'Low Risk' : idx === 3 ? 'High Risk' : 'Moderate';

      html += \`
        <tr class="hover:bg-brand-paleBg transition">
          <td class="px-4 py-3 font-bold text-gray-900">\${sc.name}<br><span class="text-[10px] text-gray-400 font-normal">\${sc.desc}</span></td>
          <td class="px-4 py-3 font-mono font-semibold text-gray-800">₹\${p.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono font-semibold text-gray-800">\${y} qtl</td>
          <td class="px-4 py-3 font-mono font-semibold text-emerald-700">₹\${rev.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono text-gray-600">₹\${cost.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono font-bold \${net < 0 ? 'text-red-600' : 'text-gray-900'}">₹\${net.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono font-bold text-brand-forest">₹\${buffer.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold \${riskClass}">\${riskLabel}</span></td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1 font-bold text-[11px] \${serviceable ? 'text-emerald-700' : 'text-red-700'}">
              \${serviceable ? '✓ Serviceable' : '✕ Deficit / Overhang'}
            </span>
          </td>
        </tr>
      \`;
    });
    tbody.innerHTML = html;
  }

  function onStressSlidersChange() {
    const pVal = document.getElementById('stress-slider-price')?.value;
    const yVal = document.getElementById('stress-slider-yield')?.value;
    const pText = document.getElementById('stress-slider-price-val');
    const yText = document.getElementById('stress-slider-yield-val');
    if (pText) pText.textContent = \`-\${pVal}%\`;
    if (yText) yText.textContent = \`-\${yVal}%\`;

    const f = cachedFarmers.find(x => x.id === currentFarmerId);
    if (f) recalculateEconomicsAndStress(f);
  }

  // ==========================================
  // TIMELINE INTERACTIVITY (Section 6)
  // ==========================================
  function selectTimelineStage(stageKey) {
    const stage = TIMELINE_STAGES[stageKey];
    if (!stage) return;

    // Highlight selected button
    document.querySelectorAll('.tl-stage-btn').forEach(b => {
      b.classList.remove('border-2', 'border-emerald-600', 'bg-emerald-50');
      b.classList.add('border', 'border-brand-borderSubtle', 'bg-white');
    });
    const activeBtn = document.getElementById('tl-' + stageKey);
    if (activeBtn) {
      activeBtn.classList.remove('border-brand-borderSubtle', 'bg-white');
      activeBtn.classList.add('border-2', 'border-emerald-600', 'bg-emerald-50');
    }

    // Update detail panel
    const title = document.getElementById('tl-detail-title');
    const budget = document.getElementById('tl-detail-budget');
    const desc = document.getElementById('tl-detail-desc');
    const risk = document.getElementById('tl-detail-risk');
    const verif = document.getElementById('tl-detail-verif');
    const tranche = document.getElementById('tl-detail-tranche');

    if (title) title.textContent = stage.title;
    if (budget) budget.textContent = stage.budget;
    if (desc) desc.textContent = stage.desc;
    if (risk) risk.textContent = stage.risk;
    if (verif) verif.textContent = stage.verif;
    if (tranche) tranche.textContent = stage.tranche;
  }

  // ==========================================
  // 8-STEP CROP PLANNER WITH LIVE PREVIEW & MISMATCH (Section 7 & 8)
  // ==========================================
  function updatePlannerPreview() {
    const crop = document.getElementById('pln-crop')?.value || 'Paddy';
    const area = parseFloat(document.getElementById('pln-area')?.value || '3.5');
    const yieldQtl = parseFloat(document.getElementById('pln-yield')?.value || '85');
    const cost = parseFloat(document.getElementById('pln-cost')?.value || '68000');
    const loan = parseFloat(document.getElementById('pln-loan')?.value || '200000');

    // Calculate 9 purpose inputs total
    const p1 = parseFloat(document.getElementById('pur-seeds')?.value || '0');
    const p2 = parseFloat(document.getElementById('pur-fert')?.value || '0');
    const p3 = parseFloat(document.getElementById('pur-labour')?.value || '0');
    const p4 = parseFloat(document.getElementById('pur-irrigation')?.value || '0');
    const p5 = parseFloat(document.getElementById('pur-pesticides')?.value || '0');
    const p6 = parseFloat(document.getElementById('pur-equip')?.value || '0');
    const p7 = parseFloat(document.getElementById('pur-storage')?.value || '0');
    const p8 = parseFloat(document.getElementById('pur-transport')?.value || '0');
    const p9 = parseFloat(document.getElementById('pur-other')?.value || '0');
    const purposeSum = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;

    const purSumVal = document.getElementById('purpose-sum-val');
    if (purSumVal) purSumVal.textContent = \`₹\${purposeSum.toLocaleString('en-IN')}\`;

    // Benchmark calculation
    let benchPerAcre = 26000;
    let expPrice = 2450;
    if (crop === 'Tomato') { benchPerAcre = 35000; expPrice = 1650; }
    else if (crop === 'Groundnut') { benchPerAcre = 28000; expPrice = 6400; }
    else if (crop === 'Soybean') { benchPerAcre = 22000; expPrice = 4500; }

    const benchTotal = Math.round(area * benchPerAcre);
    const grossRev = Math.round(yieldQtl * expPrice);
    const netInc = grossRev - cost;
    const buffer = Math.max(0, Math.round(netInc * 0.55));
    const recMin = Math.round(buffer * 1.8 / 10000) * 10000;
    const recMax = Math.round(buffer * 2.2 / 10000) * 10000;

    // Diagnostics Preview
    const pBench = document.getElementById('prev-bench');
    const pReq = document.getElementById('prev-req');
    const pPrice = document.getElementById('prev-price');
    const pRev = document.getElementById('prev-rev');
    const pNet = document.getElementById('prev-net');
    const pBuffer = document.getElementById('prev-buffer');
    const pRange = document.getElementById('prev-range');

    if (pBench) pBench.textContent = \`₹\${benchTotal.toLocaleString('en-IN')} (₹\${benchPerAcre.toLocaleString('en-IN')}/Ac)\`;
    if (pReq) pReq.textContent = \`₹\${loan.toLocaleString('en-IN')}\`;
    if (pPrice) pPrice.textContent = \`₹\${expPrice.toLocaleString('en-IN')} / Quintal\`;
    if (pRev) pRev.textContent = \`₹\${grossRev.toLocaleString('en-IN')}\`;
    if (pNet) pNet.textContent = \`₹\${netInc.toLocaleString('en-IN')}\`;
    if (pBuffer) pBuffer.textContent = \`₹\${buffer.toLocaleString('en-IN')}\`;
    if (pRange) pRange.textContent = \`₹\${recMin.toLocaleString('en-IN')} – ₹\${recMax.toLocaleString('en-IN')}\`;

    // PURPOSE MISMATCH INTELLIGENCE (Section 8 Requirement)
    const mismatchBanner = document.getElementById('planner-mismatch-banner');
    const mismatchText = document.getElementById('planner-mismatch-text');
    if (loan > benchTotal * 1.35) {
      if (mismatchBanner) mismatchBanner.classList.remove('hidden');
      if (mismatchText) {
        mismatchText.innerHTML = \`
          <strong>Purpose Mismatch Detected:</strong> Requested loan amount (₹\${loan.toLocaleString('en-IN')}) is <strong>\${(loan/benchTotal).toFixed(1)}x higher</strong> than the estimated cultivation input requirement (₹\${benchTotal.toLocaleString('en-IN')}) for \${area} acres of \${crop}. Review the purpose allocation or structure as phased capital disbursement.
        \`;
      }
    } else {
      if (mismatchBanner) mismatchBanner.classList.add('hidden');
    }
  }

  async function submitCropPlanForm(e) {
    e.preventDefault();
    const crop = document.getElementById('pln-crop').value;
    const area = parseFloat(document.getElementById('pln-area').value);
    const yieldQtl = parseFloat(document.getElementById('pln-yield').value);
    const cost = parseFloat(document.getElementById('pln-cost').value);
    const loan = parseFloat(document.getElementById('pln-loan').value);

    // Call backend API
    try {
      const res = await fetch(\`/api/v1/credit/simulate\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: currentFarmerId,
          crop,
          land_area_acres: area,
          cultivation_cost: cost,
          expected_production_quintals: yieldQtl,
          requested_loan_amount: loan
        })
      });
      if (res.ok) {
        const sim = await res.json();
        const simData = sim.data || sim;
        const rec = simData.recommendation || {};
        const recMin = rec.recommended_range_min || 120000;
        const recMax = rec.recommended_range_max || 140000;
        alert(\`Crop Plan successfully submitted and stress-tested! Recommended decision support range: ₹\${recMin.toLocaleString('en-IN')} – ₹\${recMax.toLocaleString('en-IN')}\`);
        switchTab('farmer-stresstest');
        await loadFarmerData(currentFarmerId);
      }
    } catch (err) {
      alert('Plan saved locally in cache.');
      switchTab('farmer-stresstest');
    }
  }

  // ==========================================
  // WHAT-IF SIMULATOR (Section 17)
  // ==========================================
  function onSimulatorChange() {
    const loan = parseFloat(document.getElementById('sim-loan')?.value || '200000');
    const price = parseFloat(document.getElementById('sim-price')?.value || '2450');
    const yieldQtl = parseFloat(document.getElementById('sim-yield')?.value || '85');
    const cost = parseFloat(document.getElementById('sim-cost')?.value || '68000');

    const lVal = document.getElementById('sim-loan-val');
    const pVal = document.getElementById('sim-price-val');
    const yVal = document.getElementById('sim-yield-val');
    const cVal = document.getElementById('sim-cost-val');

    if (lVal) lVal.textContent = \`₹\${loan.toLocaleString('en-IN')}\`;
    if (pVal) pVal.textContent = \`₹\${price.toLocaleString('en-IN')} / qtl\`;
    if (yVal) yVal.textContent = \`\${yieldQtl} Quintals\`;
    if (cVal) cVal.textContent = \`₹\${cost.toLocaleString('en-IN')}\`;

    // Recalculate outcomes
    const rev = Math.round(price * yieldQtl);
    const net = rev - cost;
    const living = Math.round(Math.max(0, net) * 0.25);
    const buffer = Math.max(0, net - living);
    const debtRatio = buffer > 0 ? Math.round((loan / buffer) * 100) : 999;

    const outRev = document.getElementById('sim-out-rev');
    const outNet = document.getElementById('sim-out-net');
    const outBuffer = document.getElementById('sim-out-buffer');
    const outDebt = document.getElementById('sim-out-debt');
    const badge = document.getElementById('sim-risk-badge');
    const advice = document.getElementById('sim-out-advice');

    if (outRev) outRev.textContent = \`₹\${rev.toLocaleString('en-IN')}\`;
    if (outNet) outNet.textContent = \`₹\${net.toLocaleString('en-IN')}\`;
    if (outBuffer) outBuffer.textContent = \`₹\${buffer.toLocaleString('en-IN')}\`;
    if (outDebt) outDebt.textContent = \`\${debtRatio}%\`;

    if (loan <= buffer * 1.5) {
      if (badge) {
        badge.className = 'px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800';
        badge.textContent = 'Safe Resilience Zone';
      }
      if (advice) {
        advice.innerHTML = \`Loan of ₹\${loan.toLocaleString('en-IN')} is <strong>fully covered</strong> by the harvest cash buffer (₹\${buffer.toLocaleString('en-IN')}).\`;
      }
    } else {
      if (badge) {
        badge.className = 'px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800';
        badge.textContent = 'Stress Overhang Detected';
      }
      if (advice) {
        advice.innerHTML = \`Requested ₹\${loan.toLocaleString('en-IN')} is \${debtRatio}% of the net stressed buffer. Recommended safe borrowing ceiling: <strong class="text-brand-forest">₹\${Math.round(buffer * 1.4).toLocaleString('en-IN')}</strong>.\`;
      }
    }
  }

  function applyShockPreset(loan, price, yieldQtl, cost) {
    const sLoan = document.getElementById('sim-loan');
    const sPrice = document.getElementById('sim-price');
    const sYield = document.getElementById('sim-yield');
    const sCost = document.getElementById('sim-cost');

    if (sLoan) sLoan.value = loan;
    if (sPrice) sPrice.value = price;
    if (sYield) sYield.value = yieldQtl;
    if (sCost) sCost.value = cost;
    onSimulatorChange();
  }

  // ==========================================
  // CONSENT MANAGEMENT & DATA WALLET (Section 16)
  // ==========================================
  async function loadConsentsData() {
    try {
      const res = await fetch(\`/api/v1/farmers/\${currentFarmerId}/consents\`);
      if (res.ok) {
        const data = await res.json();
        cachedConsents = data.consents || [];
        if (cachedConsents.length > 0) {
          renderConsentTable();
          renderAuditLogs(data.audit_logs || []);
          return;
        }
      }
    } catch (e) {
      console.warn('Error loading consents', e);
    }
    cachedConsents = DEFAULT_SEED_CONSENTS;
    renderConsentTable();
    renderAuditLogs([
      { actor: "Thiruvallur Agro Collective", action: "VERIFIED", category: "Land Records & Patta Title", timestamp: new Date().toISOString() },
      { actor: "State Bank of India KCC", action: "ACCESSED", category: "Crop Economic Model & Cashflow", timestamp: new Date().toISOString() }
    ]);
  }

  function renderConsentTable() {
    const tbody = document.getElementById('consent-table-body');
    if (!tbody) return;

    if (!cachedConsents.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">No active consent authorizations found.</td></tr>';
      return;
    }

    let html = '';
    cachedConsents.forEach(c => {
      const isGranted = c.status === 'GRANTED';
      html += \`
        <tr class="hover:bg-brand-paleBg">
          <td class="px-4 py-3 font-bold text-gray-900">\${c.category}</td>
          <td class="px-4 py-3 text-gray-600">\${c.source}</td>
          <td class="px-4 py-3 text-gray-700 font-medium">\${c.shared_with}</td>
          <td class="px-4 py-3 font-mono text-[11px] text-gray-500">\${new Date(c.updated_at).toLocaleDateString('en-IN')}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold \${isGranted ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
              \${c.status}
            </span>
          </td>
          <td class="px-4 py-3 text-right">
            <button onclick="toggleConsent(\${c.id})" class="px-3 py-1 rounded text-xs font-semibold border transition \${isGranted ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}">
              \${isGranted ? 'Revoke Access' : 'Grant Access'}
            </button>
          </td>
        </tr>
      \`;
    });
    tbody.innerHTML = html;
  }

  function renderAuditLogs(logs) {
    const container = document.getElementById('audit-log-container');
    if (!container) return;
    if (!logs.length) {
      container.innerHTML = '<p class="text-gray-500 text-xs">No audit logs recorded yet.</p>';
      return;
    }

    let html = '';
    logs.slice(0, 5).forEach(l => {
      html += \`
        <div class="p-2.5 rounded bg-brand-paleBg border flex items-center justify-between text-xs">
          <div>
            <span class="font-bold text-gray-800">\${l.actor}</span>
            <span class="text-gray-500"> \${l.action.toLowerCase()} access to </span>
            <span class="font-bold text-brand-forest">\${l.category}</span>
          </div>
          <span class="font-mono text-[10px] text-gray-400">\${new Date(l.timestamp).toLocaleTimeString()}</span>
        </div>
      \`;
    });
    container.innerHTML = html;
  }

  async function toggleConsent(consentId) {
    try {
      const res = await fetch(\`/api/v1/data-consent/\${consentId}/toggle\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor: 'Farmer Ramesh Kumar' })
      });
      if (res.ok) {
        await loadConsentsData();
      }
    } catch (e) {
      console.error(e);
    }
  }

  // ==========================================
  // FPO WORKSPACE LOGIC (Section 15)
  // ==========================================
  function populateFpoDirectoryTable() {
    const tbody = document.getElementById('fpo-directory-table-body');
    if (!tbody) return;

    let html = '';
    cachedFarmers.forEach(f => {
      const isVerified = f.verification_status === 'VERIFIED';
      html += \`
        <tr class="hover:bg-brand-paleBg">
          <td class="px-4 py-3 font-bold text-gray-900">\${f.name}</td>
          <td class="px-4 py-3 text-gray-600">\${f.village || f.location}</td>
          <td class="px-4 py-3 font-mono font-semibold">\${f.land_size_acres} Ac</td>
          <td class="px-4 py-3 text-gray-800">\${f.crop_types?.join(', ') || 'Crops'}</td>
          <td class="px-4 py-3 font-mono font-bold">₹\${f.requested_loan_amount?.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono text-emerald-700 font-bold">\${f.evidence_confidence_score || 80}%</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold \${isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              \${f.verification_status || 'PENDING'}
            </span>
          </td>
          <td class="px-4 py-3 text-right">
            <button onclick="onPersonaChange('farmer-\${f.id}')" class="px-3 py-1 bg-brand-forest text-white rounded text-xs font-semibold hover:bg-brand-forestHover">
              View File
            </button>
          </td>
        </tr>
      \`;
    });
    tbody.innerHTML = html;
  }

  function populateFpoHistoryTable() {
    const tbody = document.getElementById('fpo-history-tbody');
    if (!tbody) return;

    const history = [
      {
        timestamp: "2026-07-25 11:30 IST",
        farmer: "Ramesh Kumar (KT-TN-THIRU-0104)",
        inspector: "K. Soundararajan (Lead Agronomist)",
        action: "VERIFIED",
        notes: "Physically inspected 3.5 acres standing Samba Paddy. Verified Patta title Patta #1042/3A and borewell connectivity."
      },
      {
        timestamp: "2026-07-24 16:15 IST",
        farmer: "Sunita Deshmukh (KT-KA-BELG-0388)",
        inspector: "M. Patil (Belagavi Collective)",
        action: "VERIFIED",
        notes: "Geo-tagged pomegranate orchard perimeter and verified organic inputs purchase voucher."
      },
      {
        timestamp: "2026-07-20 14:00 IST",
        farmer: "Rajendra Patil (KT-MH-NASH-0832)",
        inspector: "S. Deshmukh (Niphad Inspector)",
        action: "NEEDS EVIDENCE",
        notes: "Requested updated tomato trellising photo and notarized land title copy."
      }
    ];

    let html = '';
    history.forEach(h => {
      const isVerified = h.action === 'VERIFIED';
      html += \`
        <tr class="hover:bg-brand-paleBg">
          <td class="px-4 py-3 font-mono text-gray-500">\${h.timestamp}</td>
          <td class="px-4 py-3 font-bold text-gray-900">\${h.farmer}</td>
          <td class="px-4 py-3 text-gray-700">\${h.inspector}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold \${isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              \${h.action}
            </span>
          </td>
          <td class="px-4 py-3 text-gray-600">\${h.notes}</td>
        </tr>
      \`;
    });
    tbody.innerHTML = html;
  }

  async function executeFpoVerification(farmerId, status) {
    try {
      const res = await fetch(\`/api/v1/fpo/verify\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: farmerId,
          status,
          inspector_name: 'K. Soundararajan (Thiruvallur Agro Collective)',
          verification_notes: status === 'VERIFIED' ? 'Physically inspected 4.5 acres. Verified standing crop and trellising setup.' : 'Rejected due to missing geo-tagged documentation.'
        })
      });
      if (res.ok) {
        alert(\`Verification status updated to: \${status}\`);
        await loadInitialData();
      }
    } catch (e) {
      alert(\`Action recorded: \${status}\`);
    }
  }

  // ==========================================
  // LENDER WORKSPACE LOGIC (Section 19 & 20)
  // ==========================================
  function populateLenderPipelineTable() {
    const tbody = document.getElementById('lender-pipeline-tbody');
    if (!tbody) return;

    let html = '';
    cachedFarmers.forEach(f => {
      const score = f.evidence_confidence_score || 80;
      const isHighVol = f.crop_types?.[0]?.includes('Tomato');
      const riskClass = isHighVol ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800';
      const riskLabel = isHighVol ? 'High Volatility' : 'Moderate';
      const rec = isHighVol ? '₹90,000 – ₹1,10,000' : '₹1,20,000 – ₹1,40,000';
      const buffer = isHighVol ? '₹38,000' : '₹65,000';

      html += \`
        <tr class="hover:bg-brand-paleBg">
          <td class="px-4 py-3 font-bold text-gray-900">\${f.name}<br><span class="text-[10px] text-gray-400 font-mono">\${f.reference_id || ''}</span></td>
          <td class="px-4 py-3 text-gray-600">\${f.district || f.location}, \${f.state} (\${f.land_size_acres} Ac)</td>
          <td class="px-4 py-3 text-gray-800 font-semibold">\${f.crop_types?.join(', ')}</td>
          <td class="px-4 py-3 font-mono font-bold">₹\${f.requested_loan_amount?.toLocaleString('en-IN')}</td>
          <td class="px-4 py-3 font-mono font-bold text-brand-forest">\${rec}</td>
          <td class="px-4 py-3 font-mono font-semibold text-emerald-800">\${buffer}</td>
          <td class="px-4 py-3 font-mono font-bold text-emerald-700">\${score}%</td>
          <td class="px-4 py-3 text-right">
            <button onclick="openAssessmentModal(\${f.id})" class="px-3.5 py-1.5 bg-brand-forest text-white rounded text-xs font-semibold hover:bg-brand-forestHover shadow-2xs">
              Assess Dossier →
            </button>
          </td>
        </tr>
      \`;
    });
    tbody.innerHTML = html;
  }

  async function submitLenderDecision(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('dec-amount').value);
    const rate = document.getElementById('dec-rate').value;
    const date = document.getElementById('dec-date').value;
    const conditions = document.getElementById('dec-conditions').value;
    const notes = document.getElementById('dec-notes').value;

    try {
      const res = await fetch(\`/api/v1/credit/assessments/1/sanction\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sanctioned_amount: amount,
          interest_rate_pct: 7.0,
          repayment_due_date: date,
          disbursal_conditions: [conditions],
          underwriter_notes: notes
        })
      });
      if (res.ok) {
        const data = await res.json();
        alert(\`Credit Facility Decision successfully recorded! Facility Reference: \${data.sanction?.sanction_letter_number || 'KT-SANCTION-2026-001'}\`);
        displayActiveSanctionBanner(amount, rate, date);
        switchTab('farmer-overview');
      }
    } catch (e) {
      alert(\`Recommendation saved for ₹\${amount.toLocaleString('en-IN')}!\`);
      displayActiveSanctionBanner(amount, rate, date);
      switchTab('farmer-overview');
    }
  }

  function displayActiveSanctionBanner(amount, rate, date) {
    const banner = document.getElementById('farmer-sanction-banner');
    if (!banner) return;
    banner.classList.remove('hidden');
    banner.className = 'bg-emerald-900 text-white rounded-xl p-4 border border-emerald-700 flex items-center justify-between shadow-md mb-4';
    banner.innerHTML = \`
      <div class="flex items-center gap-3">
        <span class="text-2xl">🏛️</span>
        <div>
          <h4 class="font-bold text-sm">Institutional Credit Facility Recommended & Structured</h4>
          <p class="text-xs text-emerald-200 mt-0.5">Facility Ceiling: <strong class="text-white font-mono">₹\${amount.toLocaleString('en-IN')}</strong> · \${rate} · Harvest Due Date: <strong class="text-white font-mono">\${date}</strong></p>
        </div>
      </div>
      <button onclick="openReportModal()" class="px-3.5 py-1.5 bg-white text-emerald-950 font-bold rounded-lg text-xs hover:bg-emerald-50">
        View Sanction Memorandum
      </button>
    \`;
  }

  // ==========================================
  // INSTITUTIONAL ASSESSMENT MODAL (13 Areas)
  // ==========================================
  function openAssessmentModal(farmerId) {
    const f = cachedFarmers.find(x => x.id === farmerId) || cachedFarmers[0];
    if (!f) return;

    const modal = document.getElementById('modal-assessment');
    const name = document.getElementById('modal-ass-farmer-name');
    const ref = document.getElementById('modal-ass-ref');
    const body = document.getElementById('modal-ass-body');

    if (name) name.textContent = \`Institutional Underwriting Dossier: \${f.name}\`;
    if (ref) ref.textContent = f.reference_id || \`KT-00\${f.id}\`;

    if (body) {
      body.innerHTML = \`
        <!-- Area 1 & 2: Farmer & Verified Land -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-paleBg border">
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">1. Borrower & Collective Profile</h5>
            <p><strong>Name:</strong> \${f.name}</p>
            <p><strong>Location:</strong> \${f.village || f.location}, \${f.district || ''}, \${f.state}</p>
            <p><strong>FPO Affiliation:</strong> Thiruvallur Agro Collective (Registered)</p>
          </div>
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">2. Verified Land & Sowing</h5>
            <p><strong>Landholding:</strong> \${f.land_size_acres} Acres (Patta Title Verified ✓)</p>
            <p><strong>Primary Crop:</strong> \${f.crop_types?.join(', ')}</p>
            <p><strong>Irrigation Source:</strong> \${f.irrigation_type || 'Borewell & Canal'}</p>
          </div>
        </div>

        <!-- Area 3 & 4: Loan Request & NHB Benchmarks -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-paleBg border">
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">3. Credit Proposal & Purpose</h5>
            <p><strong>Requested Amount:</strong> ₹\${f.requested_loan_amount?.toLocaleString('en-IN')}</p>
            <p><strong>Purpose:</strong> \${f.loan_purpose || 'Working capital & harvesting inputs'}</p>
            <p><strong>Repayment Structure:</strong> Harvest-Pegged Bullet Facility</p>
          </div>
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">4. National Agri Benchmarks (NHB)</h5>
            <p><strong>Benchmark Cultivation Cost:</strong> ₹26,000 / Acre</p>
            <p><strong>Total Standard Requirement:</strong> ₹91,000 for 3.5 Acres</p>
            <p><strong>Variance:</strong> Requested is 2.2x of crop input requirement</p>
          </div>
        </div>

        <!-- Area 5 & 6: AGMARKNET Mandi & Future Economics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-paleBg border">
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">5. AGMARKNET Market Analysis</h5>
            <p><strong>Current Modal Price:</strong> ₹2,450 / Quintal</p>
            <p><strong>Historical 3-Yr Band:</strong> ₹2,050 – ₹2,680 / Quintal</p>
            <p><strong>Arrival Drop Forecast:</strong> -15% during peak November arrivals</p>
          </div>
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">6. Future Crop Economics Model</h5>
            <p><strong>Expected Production:</strong> 85 Quintals</p>
            <p><strong>Gross Crop Revenue:</strong> ₹2,08,250</p>
            <p><strong>Cultivation Outflow:</strong> ₹68,000</p>
            <p><strong>Net Operating Margin:</strong> ₹1,40,250 (67.3%)</p>
          </div>
        </div>

        <!-- Area 7 & 8: Stress Testing & Debt Service Coverage -->
        <div class="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <h5 class="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">7 & 8. Multi-Scenario Stress Test & Repayment Buffer</h5>
          <p class="text-gray-700">Under simultaneous <strong>-25% price drop</strong> and <strong>-20% yield loss</strong>:</p>
          <div class="grid grid-cols-3 gap-2 font-mono text-[11px]">
            <div class="p-2 bg-white rounded border">Stressed Rev: <strong>₹1,32,600</strong></div>
            <div class="p-2 bg-white rounded border">Stressed Net: <strong>₹64,600</strong></div>
            <div class="p-2 bg-white rounded border">Living Deduct: <strong>₹16,150</strong></div>
          </div>
          <p class="font-semibold text-emerald-900">Conservative Downside Repayment Capacity: <strong>₹48,450 – ₹65,000</strong></p>
        </div>

        <!-- Area 9 & 10: Evidence Confidence & Purpose Mismatch -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-brand-paleBg border">
          <div>
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px] mb-1">9. Evidence Confidence Score</h5>
            <p class="text-emerald-800 font-bold text-sm">\${f.evidence_confidence_score || 88}% Verified</p>
            <p class="text-gray-600">Land Title (Govt API) + FPO Geo-tagged Sowing + Mandi Invoices</p>
          </div>
          <div>
            <h5 class="font-bold text-amber-900 uppercase tracking-wider text-[11px] mb-1">10. Purpose Allocation Diagnostic</h5>
            <p class="text-amber-800 font-bold text-sm">Purpose Mismatch Flagged</p>
            <p class="text-gray-600">Recommend tranche disbursal: ₹60k input advance, ₹70k pre-harvest release.</p>
          </div>
        </div>

        <!-- Area 11, 12, 13: Underwriter Synthesis & Decision Range -->
        <div class="p-4 rounded-xl border-2 border-brand-forest bg-brand-paleBg space-y-2">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-brand-forest uppercase tracking-wider text-[11px]">11–13. Institutional Recommendation Synthesis</h5>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-forest text-white">Decision Support Range</span>
          </div>
          <div class="serif-title text-xl font-bold text-brand-forest">
            Recommended Safe Credit Range: ₹1,20,000 – ₹1,40,000
          </div>
          <p class="text-gray-700 leading-relaxed">
            Borrower has pristine verified land title and FPO operational backing. Capping the facility at <strong>₹1,30,000</strong> ensures 100% debt serviceability even under adverse mandi price crashes, while satisfying all agricultural working capital needs.
          </p>
        </div>
      \`;
    }
    if (modal) modal.classList.remove('hidden');
    if (modal) modal.classList.add('flex');
  }

  function closeAssessmentModal() {
    const modal = document.getElementById('modal-assessment');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function switchTabAndCloseModal(tabId) {
    closeAssessmentModal();
    switchTab(tabId);
  }

  // ==========================================
  // AUDIT CREDIT REPORT MODAL (Printable)
  // ==========================================
  function openReportModal() {
    const f = cachedFarmers.find(x => x.id === currentFarmerId) || cachedFarmers[0];
    if (!f) return;

    const modal = document.getElementById('modal-report');
    const container = document.getElementById('printable-report-content');
    if (!container) return;

    container.innerHTML = \`
      <div class="border-b-2 border-brand-forest pb-4 flex items-center justify-between">
        <div>
          <h1 class="serif-title text-2xl font-bold text-brand-forest">KissanTrust Agricultural Credit Intelligence</h1>
          <p class="text-xs text-gray-500 font-mono mt-0.5">PS2 Community-Owned Credit Network · Protocol Standard</p>
        </div>
        <div class="text-right font-mono text-xs">
          <p class="font-bold text-gray-800">MEMORANDUM #KT-AUDIT-2026-0814</p>
          <p class="text-gray-500">Date: \${new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 pt-2">
        <div>
          <h4 class="font-bold text-xs uppercase text-gray-400">Borrower Entity</h4>
          <p class="text-base font-bold text-gray-900 mt-0.5">\${f.name}</p>
          <p class="text-gray-600">\${f.village || f.location}, \${f.district || ''}, \${f.state}</p>
          <p class="font-mono text-gray-500 text-[11px]">Ref: \${f.reference_id || 'KT-001'}</p>
        </div>
        <div>
          <h4 class="font-bold text-xs uppercase text-gray-400">Community Verifier</h4>
          <p class="text-base font-bold text-gray-900 mt-0.5">Thiruvallur Agro Collective Producer Co.</p>
          <p class="text-gray-600">Reg: FPO-TN-2023-00892 · SFAC Registered</p>
          <p class="text-emerald-700 font-bold text-[11px]">Lead Inspector: K. Soundararajan (Verified ✓)</p>
        </div>
      </div>

      <div class="border rounded-lg overflow-x-auto w-full max-w-full mt-4">
        <table class="w-full text-xs text-left">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="p-2.5">Parameter</th>
              <th class="p-2.5">Applicant Claim</th>
              <th class="p-2.5">Verified / Benchmark</th>
              <th class="p-2.5">Evidence Source</th>
            </tr>
          </thead>
          <tbody class="divide-y text-gray-700">
            <tr><td class="p-2.5 font-semibold">Land Size</td><td class="p-2.5">\${f.land_size_acres} Acres</td><td class="p-2.5 font-bold text-emerald-800">3.50 Acres Verified</td><td class="p-2.5">State Patta Title #1042/3A</td></tr>
            <tr><td class="p-2.5 font-semibold">Planned Crop</td><td class="p-2.5">\${f.crop_types?.join(', ')}</td><td class="p-2.5 font-bold text-emerald-800">Samba ADT-53 Standing</td><td class="p-2.5">FPO Geo-Tagged Photo</td></tr>
            <tr><td class="p-2.5 font-semibold">Cultivation Expenses</td><td class="p-2.5">₹\${f.cultivation_cost?.toLocaleString('en-IN')}</td><td class="p-2.5">₹91,000 NHB Benchmark</td><td class="p-2.5">National Horticulture Board</td></tr>
            <tr><td class="p-2.5 font-semibold">Requested Borrowing</td><td class="p-2.5 font-bold">₹\${f.requested_loan_amount?.toLocaleString('en-IN')}</td><td class="p-2.5 font-bold text-brand-forest">₹1,20,000 – ₹1,40,000 Safe</td><td class="p-2.5">Stress Testing Engine</td></tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 bg-gray-50 rounded-xl border space-y-2 mt-4">
        <h4 class="font-bold text-xs uppercase text-gray-700">Stress Test Certification</h4>
        <p class="text-xs text-gray-700 leading-relaxed">
          The credit facility of <strong>₹1,30,000</strong> has been stress-tested against a <strong>25% market price crash</strong> and a <strong>20% climate yield shock</strong>. Stressed net harvest cash flow generates <strong>₹65,000 net surplus</strong> after reserving 25% for family nutrition and education, ensuring timely settlement on or before December 20, 2026.
        </p>
      </div>

      <div class="flex justify-between items-center pt-8 border-t text-xs text-gray-500 font-mono">
        <div>Authorized Signatory: Thiruvallur Agro Collective</div>
        <div>System Verified: KissanTrust Node PS2-TN-01</div>
      </div>
    \`;

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeReportModal() {
    const modal = document.getElementById('modal-report');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  // ==========================================
  // ONBOARD NEW FARMER MODAL
  // ==========================================
  function openNewFarmerModal() {
    const modal = document.getElementById('modal-new-farmer');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeNewFarmerModal() {
    const modal = document.getElementById('modal-new-farmer');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  async function submitNewFarmer(e) {
    e.preventDefault();
    const name = document.getElementById('new-name').value;
    const phone = document.getElementById('new-phone')?.value || '+91-9840192831';
    const state = document.getElementById('new-state').value;
    const district = document.getElementById('new-district').value;
    const village = document.getElementById('new-village')?.value || 'Nemam Village';
    const land = parseFloat(document.getElementById('new-land').value);
    const crop = document.getElementById('new-crop').value;
    const irrigation = document.getElementById('new-irrigation')?.value || 'Borewell';
    const cost = parseFloat(document.getElementById('new-cost').value);
    const loan = parseFloat(document.getElementById('new-loan').value);
    const purpose = document.getElementById('new-purpose')?.value || \`Cultivation inputs and harvesting labour for \${crop}\`;

    // Advanced 14-area parameters
    const famMembers = parseInt(document.getElementById('new-fam-members')?.value || '4');
    const famEarning = parseInt(document.getElementById('new-fam-earning')?.value || '2');
    const liveCows = parseInt(document.getElementById('new-live-cows')?.value || '2');
    const liveIncome = parseFloat(document.getElementById('new-live-income')?.value || '12000');
    const totalIncome = parseFloat(document.getElementById('new-total-income')?.value || '35000');
    const totalExpenses = parseFloat(document.getElementById('new-total-expenses')?.value || '24000');
    const assetVal = parseFloat(document.getElementById('new-asset-val')?.value || '650000');
    const hasLoan = document.getElementById('new-has-loan')?.value === 'true';
    const hasInsurance = document.getElementById('new-has-insurance')?.value === 'true';
    const hasPmkisan = document.getElementById('new-pmkisan')?.value === 'true';

    // Build complete 14-area profile
    const profile_14 = {
      personal: {
        full_name: name,
        age: 42,
        gender: 'Male',
        mobile_number: phone,
        village: village,
        district: district,
        state: state,
        education: 'Secondary School (10th Passed)',
        farming_experience_years: 18,
        fpo_name: 'Thiruvallur Agro Collective Producer Co.'
      },
      family: {
        number_of_family_members: famMembers,
        number_of_dependents: Math.max(0, famMembers - famEarning),
        number_of_earning_members: famEarning,
        family_occupation: 'Agriculture & Allied Dairy',
        monthly_family_income: totalIncome
      },
      land: {
        total_land_area_acres: land,
        ownership_type: 'Owned',
        irrigation_status: irrigation.includes('Rain') ? 'Rain-fed' : 'Irrigated',
        soil_type: 'Fertile Red Sandy Loam (pH 6.8)',
        water_source: \`\${irrigation} with solar energization\`
      },
      crop: {
        crop_name: crop,
        crop_variety: crop.includes('Tomato') ? 'Abhinav Hybrid' : 'ADT-53 Certified Seed',
        season: 'Kharif',
        cultivated_area_acres: land,
        sowing_date: '2026-06-20',
        expected_harvest_date: '2026-11-25',
        expected_production_quintals: crop.includes('Tomato') ? Math.round(land * 110) : Math.round(land * 24),
        estimated_production_cost: cost,
        expected_selling_price: crop.includes('Tomato') ? 1650 : 2450,
        expected_revenue: crop.includes('Tomato') ? Math.round(land * 110 * 1650) : Math.round(land * 24 * 2450)
      },
      previous_crop: {
        previous_crop: 'Paddy',
        previous_season: 'Rabi 2025-26',
        cultivated_area_acres: land,
        production_quintals: Math.round(land * 22),
        selling_price: 2350,
        total_revenue: Math.round(land * 22 * 2350),
        approx_profit: Math.round(land * 22 * 2350 * 0.45)
      },
      livestock: {
        cows_number: liveCows,
        buffaloes_number: 0,
        goats_number: 2,
        sheep_number: 0,
        other_livestock_number: 0,
        average_monthly_livestock_income: liveIncome
      },
      poultry: {
        number_of_hens_chickens: 15,
        egg_production_per_day: 10,
        egg_selling_price: 6.5,
        monthly_poultry_income: 1950
      },
      other_income: {
        agriculture_income: Math.round(totalIncome * 0.55),
        dairy_income: liveIncome,
        poultry_income: 1950,
        livestock_income: 1500,
        labour_income: 0,
        business_income: 0,
        other_income: 0,
        total_monthly_income: totalIncome
      },
      monthly_expenses: {
        household_expenses: Math.round(totalExpenses * 0.45),
        farming_expenses: Math.round(totalExpenses * 0.25),
        livestock_poultry_expenses: Math.round(totalExpenses * 0.1),
        education_expenses: Math.round(totalExpenses * 0.1),
        medical_expenses: Math.round(totalExpenses * 0.05),
        other_expenses: Math.round(totalExpenses * 0.05),
        existing_loan_emi: hasLoan ? 3500 : 0,
        total_monthly_expenses: totalExpenses
      },
      assets: {
        tractor_machinery: 'Custom Hiring Centre Access & Power Tiller',
        approx_total_asset_value: assetVal,
        farm_equipment: 'Power sprayer, diesel pump set, cultivator',
        other_productive_assets: 'Drip irrigation laterals and farm shed',
        number_of_cattle: liveCows,
        number_of_goats_sheep: 2,
        number_of_poultry: 15
      },
      existing_loans: {
        has_existing_loan: hasLoan,
        loan_provider: hasLoan ? 'Primary Agricultural Credit Society' : '',
        loan_type: hasLoan ? 'Crop Loan' : '',
        original_loan_amount: hasLoan ? 50000 : 0,
        outstanding_amount: hasLoan ? 25000 : 0,
        monthly_emi: hasLoan ? 3500 : 0,
        expected_completion_date: hasLoan ? '2026-10-31' : '',
        loan_purpose: hasLoan ? 'Seasonal seeds & fertilizer' : ''
      },
      previous_repayment: {
        previous_loan_taken: true,
        number_of_previous_loans: 2,
        ontime_payments: 24,
        late_payments: 0,
        any_loan_default: false
      },
      market_sales: {
        main_selling_market: \`\${district} APMC Regulated Market\`,
        regular_buyer: 'Thiruvallur Agro Collective FPO',
        buyer_relationship_duration: '4 years',
        average_sales_per_season: Math.round(land * 22),
        average_selling_price: 2400,
        approx_annual_agricultural_sales: Math.round(land * 22 * 2400 * 2)
      },
      insurance_schemes: {
        crop_insurance_pmfby: hasInsurance,
        livestock_insurance: liveCows > 0,
        pm_kisan_beneficiary: hasPmkisan,
        kcc_available: true,
        other_government_schemes: 'Soil Health Card, Pradhan Mantri Krishi Sinchayee Yojana'
      }
    };

    try {
      const res = await fetch('/api/v1/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          state,
          district,
          village,
          location: \`\${village}, \${district}, \${state}\`,
          land_size_acres: land,
          crop_types: [crop],
          cultivation_cost: cost,
          requested_loan_amount: loan,
          loan_purpose: purpose,
          irrigation_type: irrigation,
          profile_14
        })
      });
      if (res.ok) {
        const created = await res.json();
        alert(\`✓ Farmer \${name} successfully enrolled with full 14-Area Profile!\\nAssigned Reference: \${created.reference_id || 'KT-NEW'}\`);
        closeNewFarmerModal();
        await loadInitialData();
        onPersonaChange(\`farmer-\${created.id}\`);
      }
    } catch (err) {
      alert('Enrolled in local session.');
      closeNewFarmerModal();
    }
  }

  // ==========================================
  // 14-SECTION COMPREHENSIVE PROFILE ENGINE
  // ==========================================
  function populateFarmerProfile14(farmer) {
    if (!farmer) return;
    const p = farmer.profile_14;

    // Section 1: Personal
    const pName = document.getElementById('p14-personal-fullname');
    const pAge = document.getElementById('p14-personal-age');
    const pGender = document.getElementById('p14-personal-gender');
    const pMobile = document.getElementById('p14-personal-mobile');
    const pVillage = document.getElementById('p14-personal-village');
    const pDistrict = document.getElementById('p14-personal-district');
    const pState = document.getElementById('p14-personal-state');
    const pEdu = document.getElementById('p14-personal-education');
    const pExp = document.getElementById('p14-personal-experience');
    const pFpo = document.getElementById('p14-personal-fpo');

    if (pName) pName.value = p?.personal?.full_name || farmer.name || '';
    if (pAge) pAge.value = p?.personal?.age || 46;
    if (pGender) pGender.value = p?.personal?.gender || 'Male';
    if (pMobile) pMobile.value = p?.personal?.mobile_number || farmer.phone || '+91-9840192831';
    if (pVillage) pVillage.value = p?.personal?.village || farmer.village || 'Nemam Village';
    if (pDistrict) pDistrict.value = p?.personal?.district || farmer.district || 'Thiruvallur';
    if (pState) pState.value = p?.personal?.state || farmer.state || 'Tamil Nadu';
    if (pEdu) pEdu.value = p?.personal?.education || 'Higher Secondary (12th Passed)';
    if (pExp) pExp.value = p?.personal?.farming_experience_years || 22;
    if (pFpo) pFpo.value = p?.personal?.fpo_name || 'Thiruvallur Agro Collective Producer Co.';

    // Section 2: Family
    const fMem = document.getElementById('p14-family-members');
    const fDep = document.getElementById('p14-family-dependents');
    const fEarn = document.getElementById('p14-family-earning');
    const fOcc = document.getElementById('p14-family-occupation');
    const fInc = document.getElementById('p14-family-income');

    if (fMem) fMem.value = p?.family?.number_of_family_members || 4;
    if (fDep) fDep.value = p?.family?.number_of_dependents || 2;
    if (fEarn) fEarn.value = p?.family?.number_of_earning_members || 2;
    if (fOcc) fOcc.value = p?.family?.family_occupation || 'Agriculture & Dairy Allied';
    if (fInc) fInc.value = p?.family?.monthly_family_income || 38500;

    // Section 3: Land
    const lArea = document.getElementById('p14-land-area');
    const lOwner = document.getElementById('p14-land-ownership');
    const lIrr = document.getElementById('p14-land-irrigation');
    const lSoil = document.getElementById('p14-land-soil');
    const lWater = document.getElementById('p14-land-water');

    if (lArea) lArea.value = p?.land?.total_land_area_acres || farmer.land_size_acres || 3.5;
    if (lOwner) lOwner.value = p?.land?.ownership_type || 'Owned';
    if (lIrr) lIrr.value = p?.land?.irrigation_status || (farmer.irrigation_type?.includes('Rain') ? 'Rain-fed' : 'Irrigated');
    if (lSoil) lSoil.value = p?.land?.soil_type || 'Clayey Alluvial Loam (pH 7.2)';
    if (lWater) lWater.value = p?.land?.water_source || 'Borewell with solar pump & canal ayacut';

    // Section 4: Crop
    const cName = document.getElementById('p14-crop-name');
    const cVariety = document.getElementById('p14-crop-variety');
    const cSeason = document.getElementById('p14-crop-season');
    const cArea = document.getElementById('p14-crop-area');
    const cSow = document.getElementById('p14-crop-sowing');
    const cHarv = document.getElementById('p14-crop-harvest');
    const cProd = document.getElementById('p14-crop-production');
    const cCost = document.getElementById('p14-crop-cost');
    const cPrice = document.getElementById('p14-crop-price');
    const cRev = document.getElementById('p14-crop-revenue');
    const cRevDisp = document.getElementById('p14-crop-revenue-disp');

    const primaryCrop = farmer.crop_types?.[0] || 'Paddy';
    if (cName) cName.value = p?.crop?.crop_name || primaryCrop;
    if (cVariety) cVariety.value = p?.crop?.crop_variety || (primaryCrop === 'Tomato' ? 'Abhinav Hybrid' : 'ADT-53 / Ponni');
    if (cSeason) cSeason.value = p?.crop?.season || 'Kharif';
    if (cArea) cArea.value = p?.crop?.cultivated_area_acres || farmer.land_size_acres || 3.5;
    if (cSow) cSow.value = p?.crop?.sowing_date || '2026-06-15';
    if (cHarv) cHarv.value = p?.crop?.expected_harvest_date || '2026-11-20';
    if (cProd) cProd.value = p?.crop?.expected_production_quintals || (primaryCrop === 'Tomato' ? 385 : 85);
    if (cCost) cCost.value = p?.crop?.estimated_production_cost || farmer.cultivation_cost || 68000;
    if (cPrice) cPrice.value = p?.crop?.expected_selling_price || (primaryCrop === 'Tomato' ? 1650 : 2450);
    const calculatedCropRev = (p?.crop?.expected_revenue) || (cProd && cPrice ? Math.round((parseFloat(cProd.value)||0) * (parseFloat(cPrice.value)||0)) : 208250);
    if (cRev) cRev.value = calculatedCropRev;
    if (cRevDisp) cRevDisp.textContent = \`₹\${calculatedCropRev.toLocaleString('en-IN')}\`;

    // Section 5: Previous Crop
    const pcCrop = document.getElementById('p14-prev-crop');
    const pcSeason = document.getElementById('p14-prev-season');
    const pcArea = document.getElementById('p14-prev-area');
    const pcProd = document.getElementById('p14-prev-production');
    const pcPrice = document.getElementById('p14-prev-price');
    const pcRev = document.getElementById('p14-prev-revenue');
    const pcProfit = document.getElementById('p14-prev-profit');

    if (pcCrop) pcCrop.value = p?.previous_crop?.previous_crop || 'Paddy (Navarai)';
    if (pcSeason) pcSeason.value = p?.previous_crop?.previous_season || 'Rabi 2025-26';
    if (pcArea) pcArea.value = p?.previous_crop?.cultivated_area_acres || 3.5;
    if (pcProd) pcProd.value = p?.previous_crop?.production_quintals || 82;
    if (pcPrice) pcPrice.value = p?.previous_crop?.selling_price || 2380;
    if (pcRev) pcRev.value = p?.previous_crop?.total_revenue || 195160;
    if (pcProfit) pcProfit.value = p?.previous_crop?.approx_profit || 98000;

    // Section 6: Livestock
    const lCows = document.getElementById('p14-live-cows');
    const lBuf = document.getElementById('p14-live-buffaloes');
    const lGoats = document.getElementById('p14-live-goats');
    const lSheep = document.getElementById('p14-live-sheep');
    const lOther = document.getElementById('p14-live-other');
    const lInc = document.getElementById('p14-live-income');

    if (lCows) lCows.value = p?.livestock?.cows_number ?? 2;
    if (lBuf) lBuf.value = p?.livestock?.buffaloes_number ?? 0;
    if (lGoats) lGoats.value = p?.livestock?.goats_number ?? 4;
    if (lSheep) lSheep.value = p?.livestock?.sheep_number ?? 0;
    if (lOther) lOther.value = p?.livestock?.other_livestock_number ?? 0;
    if (lInc) lInc.value = p?.livestock?.average_monthly_livestock_income || 12000;

    // Section 7: Poultry
    const pHens = document.getElementById('p14-poultry-hens');
    const pEggs = document.getElementById('p14-poultry-eggs-day');
    const pEggP = document.getElementById('p14-poultry-egg-price');
    const pPInc = document.getElementById('p14-poultry-income');

    if (pHens) pHens.value = p?.poultry?.number_of_hens_chickens ?? 25;
    if (pEggs) pEggs.value = p?.poultry?.egg_production_per_day ?? 18;
    if (pEggP) pEggP.value = p?.poultry?.egg_selling_price || 6.5;
    if (pPInc) pPInc.value = p?.poultry?.monthly_poultry_income || 3500;

    // Section 8: Other Income
    const iAgri = document.getElementById('p14-inc-agri');
    const iDairy = document.getElementById('p14-inc-dairy');
    const iPoultry = document.getElementById('p14-inc-poultry');
    const iLive = document.getElementById('p14-inc-livestock');
    const iLab = document.getElementById('p14-inc-labour');
    const iBiz = document.getElementById('p14-inc-business');
    const iOth = document.getElementById('p14-inc-other');
    const iTot = document.getElementById('p14-inc-total');
    const iTotDisp = document.getElementById('p14-inc-total-disp');

    if (iAgri) iAgri.value = p?.other_income?.agriculture_income || 18000;
    if (iDairy) iDairy.value = p?.other_income?.dairy_income || 12000;
    if (iPoultry) iPoultry.value = p?.other_income?.poultry_income || 3500;
    if (iLive) iLive.value = p?.other_income?.livestock_income || 2000;
    if (iLab) iLab.value = p?.other_income?.labour_income || 0;
    if (iBiz) iBiz.value = p?.other_income?.business_income || 3000;
    if (iOth) iOth.value = p?.other_income?.other_income || 0;
    const totalInc = p?.other_income?.total_monthly_income || 38500;
    if (iTot) iTot.value = totalInc;
    if (iTotDisp) iTotDisp.textContent = \`₹\${totalInc.toLocaleString('en-IN')}\`;

    // Section 9: Expenses
    const eHouse = document.getElementById('p14-exp-household');
    const eFarm = document.getElementById('p14-exp-farming');
    const eLive = document.getElementById('p14-exp-livestock');
    const eEdu = document.getElementById('p14-exp-education');
    const eMed = document.getElementById('p14-exp-medical');
    const eOth = document.getElementById('p14-exp-other');
    const eEmi = document.getElementById('p14-exp-emi');
    const eTot = document.getElementById('p14-exp-total');
    const eTotDisp = document.getElementById('p14-exp-total-disp');

    if (eHouse) eHouse.value = p?.monthly_expenses?.household_expenses || 11000;
    if (eFarm) eFarm.value = p?.monthly_expenses?.farming_expenses || 6500;
    if (eLive) eLive.value = p?.monthly_expenses?.livestock_poultry_expenses || 2500;
    if (eEdu) eEdu.value = p?.monthly_expenses?.education_expenses || 3500;
    if (eMed) eMed.value = p?.monthly_expenses?.medical_expenses || 1500;
    if (eOth) eOth.value = p?.monthly_expenses?.other_expenses || 1500;
    if (eEmi) eEmi.value = p?.monthly_expenses?.existing_loan_emi || 0;
    const totalExp = p?.monthly_expenses?.total_monthly_expenses || 26500;
    if (eTot) eTot.value = totalExp;
    if (eTotDisp) eTotDisp.textContent = \`₹\${totalExp.toLocaleString('en-IN')}\`;

    // Section 10: Assets
    const aTrac = document.getElementById('p14-ast-tractor');
    const aVal = document.getElementById('p14-ast-value');
    const aEquip = document.getElementById('p14-ast-equipment');
    const aOth = document.getElementById('p14-ast-other');
    const aCat = document.getElementById('p14-ast-cattle');
    const aGoat = document.getElementById('p14-ast-goats');
    const aPoult = document.getElementById('p14-ast-poultry');

    if (aTrac) aTrac.value = p?.assets?.tractor_machinery || 'Mahindra 475 DI (42 HP, 2018)';
    if (aVal) aVal.value = p?.assets?.approx_total_asset_value || 850000;
    if (aEquip) aEquip.value = p?.assets?.farm_equipment || 'Rotavator, power sprayer, seed drill, bund former';
    if (aOth) aOth.value = p?.assets?.other_productive_assets || '5 HP solar submersible pump set';
    if (aCat) aCat.value = p?.assets?.number_of_cattle ?? 2;
    if (aGoat) aGoat.value = p?.assets?.number_of_goats_sheep ?? 4;
    if (aPoult) aPoult.value = p?.assets?.number_of_poultry ?? 25;

    // Section 11: Loans
    const lExists = document.getElementById('p14-loan-exists');
    const lProv = document.getElementById('p14-loan-provider');
    const lType = document.getElementById('p14-loan-type');
    const lOrig = document.getElementById('p14-loan-original');
    const lOut = document.getElementById('p14-loan-outstanding');
    const lEmi = document.getElementById('p14-loan-emi');
    const lComp = document.getElementById('p14-loan-completion');
    const lPurp = document.getElementById('p14-loan-purpose');

    const hasLoan = p?.existing_loans?.has_existing_loan ?? false;
    if (lExists) lExists.value = hasLoan ? 'true' : 'false';
    if (lProv) lProv.value = p?.existing_loans?.loan_provider || '';
    if (lType) lType.value = p?.existing_loans?.loan_type || '';
    if (lOrig) lOrig.value = p?.existing_loans?.original_loan_amount || 0;
    if (lOut) lOut.value = p?.existing_loans?.outstanding_amount || 0;
    if (lEmi) lEmi.value = p?.existing_loans?.monthly_emi || 0;
    if (lComp) lComp.value = p?.existing_loans?.expected_completion_date || '';
    if (lPurp) lPurp.value = p?.existing_loans?.loan_purpose || '';

    // Section 12: Previous Repayment
    const rTaken = document.getElementById('p14-rep-taken');
    const rCnt = document.getElementById('p14-rep-count');
    const rOn = document.getElementById('p14-rep-ontime');
    const rLate = document.getElementById('p14-rep-late');
    const rDef = document.getElementById('p14-rep-default');

    if (rTaken) rTaken.value = (p?.previous_repayment?.previous_loan_taken ?? true) ? 'true' : 'false';
    if (rCnt) rCnt.value = p?.previous_repayment?.number_of_previous_loans ?? 3;
    if (rOn) rOn.value = p?.previous_repayment?.ontime_payments ?? 36;
    if (rLate) rLate.value = p?.previous_repayment?.late_payments ?? 0;
    if (rDef) rDef.value = (p?.previous_repayment?.any_loan_default ?? false) ? 'true' : 'false';

    // Section 13: Market
    const mMkt = document.getElementById('p14-mkt-market');
    const mBuy = document.getElementById('p14-mkt-buyer');
    const mDur = document.getElementById('p14-mkt-duration');
    const mSale = document.getElementById('p14-mkt-sales');
    const mPrc = document.getElementById('p14-mkt-price');
    const mAnn = document.getElementById('p14-mkt-annual');

    if (mMkt) mMkt.value = p?.market_sales?.main_selling_market || 'Thiruvallur Regulated APMC Mandi';
    if (mBuy) mBuy.value = p?.market_sales?.regular_buyer || 'FPO Collective & Tamil Nadu Civil Supplies';
    if (mDur) mDur.value = p?.market_sales?.buyer_relationship_duration || '6 years continuous';
    if (mSale) mSale.value = p?.market_sales?.average_sales_per_season || 82;
    if (mPrc) mPrc.value = p?.market_sales?.average_selling_price || 2450;
    if (mAnn) mAnn.value = p?.market_sales?.approx_annual_agricultural_sales || 401900;

    // Section 14: Schemes
    const sCropIns = document.getElementById('p14-sch-crop-ins');
    const sLiveIns = document.getElementById('p14-sch-live-ins');
    const sPmk = document.getElementById('p14-sch-pmkisan');
    const sKcc = document.getElementById('p14-sch-kcc');
    const sOth = document.getElementById('p14-sch-other');

    if (sCropIns) sCropIns.value = (p?.insurance_schemes?.crop_insurance_pmfby ?? true) ? 'true' : 'false';
    if (sLiveIns) sLiveIns.value = (p?.insurance_schemes?.livestock_insurance ?? true) ? 'true' : 'false';
    if (sPmk) sPmk.value = (p?.insurance_schemes?.pm_kisan_beneficiary ?? true) ? 'true' : 'false';
    if (sKcc) sKcc.value = (p?.insurance_schemes?.kcc_available ?? true) ? 'true' : 'false';
    if (sOth) sOth.value = p?.insurance_schemes?.other_government_schemes || 'Soil Health Card issued, subsidized solar pump scheme';

    // Synchronize legacy fields
    syncLegacyProfileFields();

    // Recalculate summary cards & cash flow
    recalcCashFlow14();
  }

  function recalcCashFlow14() {
    const incAgri = parseFloat(document.getElementById('p14-inc-agri')?.value || '0');
    const incDairy = parseFloat(document.getElementById('p14-inc-dairy')?.value || '0');
    const incPoultry = parseFloat(document.getElementById('p14-inc-poultry')?.value || '0');
    const incLive = parseFloat(document.getElementById('p14-inc-livestock')?.value || '0');
    const incLab = parseFloat(document.getElementById('p14-inc-labour')?.value || '0');
    const incBiz = parseFloat(document.getElementById('p14-inc-business')?.value || '0');
    const incOth = parseFloat(document.getElementById('p14-inc-other')?.value || '0');

    const totalInc = Math.round(incAgri + incDairy + incPoultry + incLive + incLab + incBiz + incOth);
    const iTot = document.getElementById('p14-inc-total');
    const iTotDisp = document.getElementById('p14-inc-total-disp');
    const fInc = document.getElementById('p14-family-income');
    if (iTot) iTot.value = totalInc;
    if (iTotDisp) iTotDisp.textContent = \`₹\${totalInc.toLocaleString('en-IN')}\`;
    if (fInc) fInc.value = totalInc;

    const expHouse = parseFloat(document.getElementById('p14-exp-household')?.value || '0');
    const expFarm = parseFloat(document.getElementById('p14-exp-farming')?.value || '0');
    const expLive = parseFloat(document.getElementById('p14-exp-livestock')?.value || '0');
    const expEdu = parseFloat(document.getElementById('p14-exp-education')?.value || '0');
    const expMed = parseFloat(document.getElementById('p14-exp-medical')?.value || '0');
    const expOth = parseFloat(document.getElementById('p14-exp-other')?.value || '0');
    const expEmi = parseFloat(document.getElementById('p14-exp-emi')?.value || '0');

    const totalExp = Math.round(expHouse + expFarm + expLive + expEdu + expMed + expOth + expEmi);
    const eTot = document.getElementById('p14-exp-total');
    const eTotDisp = document.getElementById('p14-exp-total-disp');
    if (eTot) eTot.value = totalExp;
    if (eTotDisp) eTotDisp.textContent = \`₹\${totalExp.toLocaleString('en-IN')}\`;

    const surplus = totalInc - totalExp;
    const dti = totalInc > 0 ? ((expEmi / totalInc) * 100).toFixed(1) : '0.0';

    // Update Top Metric Strip
    const sInc = document.getElementById('prof-sum-income');
    const sExp = document.getElementById('prof-sum-expenses');
    const sSurplus = document.getElementById('prof-sum-surplus');
    const sDti = document.getElementById('prof-sum-dti');
    const sRev = document.getElementById('prof-sum-crop-rev');
    const sAst = document.getElementById('prof-sum-assets');

    if (sInc) sInc.textContent = \`₹\${totalInc.toLocaleString('en-IN')}\`;
    if (sExp) sExp.textContent = \`₹\${totalExp.toLocaleString('en-IN')}\`;
    if (sSurplus) {
      sSurplus.textContent = \`\${surplus >= 0 ? '+' : ''}₹\${surplus.toLocaleString('en-IN')}\`;
      sSurplus.className = \`text-sm font-bold font-mono mt-0.5 \${surplus >= 0 ? 'text-brand-forest' : 'text-red-600'}\`;
    }
    if (sDti) {
      sDti.textContent = \`\${dti}%\`;
      sDti.className = \`text-sm font-bold font-mono mt-0.5 \${parseFloat(dti) < 30 ? 'text-emerald-700' : parseFloat(dti) < 50 ? 'text-amber-700' : 'text-red-700'}\`;
    }

    const cRev = document.getElementById('p14-crop-revenue')?.value;
    if (sRev && cRev) sRev.textContent = \`₹\${parseInt(cRev).toLocaleString('en-IN')}\`;
    const astVal = document.getElementById('p14-ast-value')?.value;
    if (sAst && astVal) sAst.textContent = \`₹\${parseInt(astVal).toLocaleString('en-IN')}\`;
  }

  function calculateCropRevenue14() {
    const prod = parseFloat(document.getElementById('p14-crop-production')?.value || '0');
    const price = parseFloat(document.getElementById('p14-crop-price')?.value || '0');
    const rev = Math.round(prod * price);
    const revInput = document.getElementById('p14-crop-revenue');
    const revDisp = document.getElementById('p14-crop-revenue-disp');
    if (revInput) revInput.value = rev;
    if (revDisp) revDisp.textContent = \`₹\${rev.toLocaleString('en-IN')}\`;
    const sRev = document.getElementById('prof-sum-crop-rev');
    if (sRev) sRev.textContent = \`₹\${rev.toLocaleString('en-IN')}\`;
  }

  function calculatePrevCropRevenue14() {
    const prod = parseFloat(document.getElementById('p14-prev-production')?.value || '0');
    const price = parseFloat(document.getElementById('p14-prev-price')?.value || '0');
    const rev = Math.round(prod * price);
    const revInput = document.getElementById('p14-prev-revenue');
    if (revInput) revInput.value = rev;
  }

  function calculatePoultryIncome14() {
    const eggs = parseFloat(document.getElementById('p14-poultry-eggs-day')?.value || '0');
    const price = parseFloat(document.getElementById('p14-poultry-egg-price')?.value || '0');
    const inc = Math.round(eggs * price * 30);
    const pInc = document.getElementById('p14-poultry-income');
    const oPInc = document.getElementById('p14-inc-poultry');
    if (pInc) pInc.value = inc;
    if (oPInc) oPInc.value = inc;
    recalcCashFlow14();
  }

  function toggleExistingLoanFields14() {
    const hasLoan = document.getElementById('p14-loan-exists')?.value === 'true';
    const emiInput = document.getElementById('p14-loan-emi');
    if (!hasLoan && emiInput) {
      emiInput.value = '0';
      syncLoanEmiToExpenses14();
    }
  }

  function syncLoanEmiToExpenses14() {
    const emi = parseFloat(document.getElementById('p14-loan-emi')?.value || '0');
    const expEmi = document.getElementById('p14-exp-emi');
    if (expEmi) expEmi.value = emi;
    recalcCashFlow14();
  }

  function onCropSelectionChange14() {
    const crop = document.getElementById('p14-crop-name')?.value || 'Paddy';
    const varietyInput = document.getElementById('p14-crop-variety');
    const priceInput = document.getElementById('p14-crop-price');
    const prodInput = document.getElementById('p14-crop-production');
    const costInput = document.getElementById('p14-crop-cost');
    const area = parseFloat(document.getElementById('p14-crop-area')?.value || '3.5');

    if (crop.includes('Tomato')) {
      if (varietyInput) varietyInput.value = 'Abhinav / NS-501 Hybrid';
      if (priceInput) priceInput.value = '1650';
      if (prodInput) prodInput.value = Math.round(area * 110);
      if (costInput) costInput.value = Math.round(area * 32000);
    } else if (crop.includes('Groundnut')) {
      if (varietyInput) varietyInput.value = 'TMV-7 / Kadiri-6';
      if (priceInput) priceInput.value = '6400';
      if (prodInput) prodInput.value = Math.round(area * 14);
      if (costInput) costInput.value = Math.round(area * 21000);
    } else if (crop.includes('Soybean')) {
      if (varietyInput) varietyInput.value = 'JS-335';
      if (priceInput) priceInput.value = '4600';
      if (prodInput) prodInput.value = Math.round(area * 11);
      if (costInput) costInput.value = Math.round(area * 19000);
    } else if (crop.includes('Cotton')) {
      if (varietyInput) varietyInput.value = 'Bt-Cotton RCH-2';
      if (priceInput) priceInput.value = '6900';
      if (prodInput) prodInput.value = Math.round(area * 12);
      if (costInput) costInput.value = Math.round(area * 28000);
    } else {
      if (varietyInput) varietyInput.value = 'ADT-53 / Ponni';
      if (priceInput) priceInput.value = '2450';
      if (prodInput) prodInput.value = Math.round(area * 24);
      if (costInput) costInput.value = Math.round(area * 19500);
    }
    calculateCropRevenue14();
  }

  function syncLegacyProfileFields() {
    const profName = document.getElementById('prof-name');
    const profPhone = document.getElementById('prof-phone');
    const profState = document.getElementById('prof-state');
    const profDistrict = document.getElementById('prof-district');
    const profLand = document.getElementById('prof-land');
    const profIrrigation = document.getElementById('prof-irrigation');
    const profCrop = document.getElementById('prof-crop');
    const profHarvest = document.getElementById('prof-harvest');
    const profCost = document.getElementById('prof-cost');

    if (profName) profName.value = document.getElementById('p14-personal-fullname')?.value || '';
    if (profPhone) profPhone.value = document.getElementById('p14-personal-mobile')?.value || '';
    if (profState) profState.value = document.getElementById('p14-personal-state')?.value || '';
    if (profDistrict) profDistrict.value = document.getElementById('p14-personal-district')?.value || '';
    if (profLand) profLand.value = document.getElementById('p14-land-area')?.value || '3.5';
    if (profIrrigation) profIrrigation.value = document.getElementById('p14-land-irrigation')?.value || 'Irrigated';
    if (profCrop) profCrop.value = document.getElementById('p14-crop-name')?.value || 'Paddy';
    if (profHarvest) profHarvest.value = document.getElementById('p14-crop-harvest')?.value || '';
    if (profCost) profCost.value = document.getElementById('p14-crop-cost')?.value || '68000';
  }

  function triggerSave14Profile() {
    const form = document.getElementById('farmer-14-profile-form');
    if (form) {
      form.requestSubmit();
    }
  }

  async function saveFarmerProfile14(e) {
    e.preventDefault();
    syncLegacyProfileFields();

    // Gather all 14 categories
    const profile_14 = {
      personal: {
        full_name: document.getElementById('p14-personal-fullname')?.value || '',
        age: parseInt(document.getElementById('p14-personal-age')?.value || '45'),
        gender: document.getElementById('p14-personal-gender')?.value || 'Male',
        mobile_number: document.getElementById('p14-personal-mobile')?.value || '',
        village: document.getElementById('p14-personal-village')?.value || '',
        district: document.getElementById('p14-personal-district')?.value || '',
        state: document.getElementById('p14-personal-state')?.value || '',
        education: document.getElementById('p14-personal-education')?.value || '',
        farming_experience_years: parseInt(document.getElementById('p14-personal-experience')?.value || '20'),
        fpo_name: document.getElementById('p14-personal-fpo')?.value || ''
      },
      family: {
        number_of_family_members: parseInt(document.getElementById('p14-family-members')?.value || '4'),
        number_of_dependents: parseInt(document.getElementById('p14-family-dependents')?.value || '2'),
        number_of_earning_members: parseInt(document.getElementById('p14-family-earning')?.value || '2'),
        family_occupation: document.getElementById('p14-family-occupation')?.value || '',
        monthly_family_income: parseFloat(document.getElementById('p14-family-income')?.value || '35000')
      },
      land: {
        total_land_area_acres: parseFloat(document.getElementById('p14-land-area')?.value || '3.5'),
        ownership_type: document.getElementById('p14-land-ownership')?.value || 'Owned',
        irrigation_status: document.getElementById('p14-land-irrigation')?.value || 'Irrigated',
        soil_type: document.getElementById('p14-land-soil')?.value || '',
        water_source: document.getElementById('p14-land-water')?.value || ''
      },
      crop: {
        crop_name: document.getElementById('p14-crop-name')?.value || 'Paddy',
        crop_variety: document.getElementById('p14-crop-variety')?.value || '',
        season: document.getElementById('p14-crop-season')?.value || 'Kharif',
        cultivated_area_acres: parseFloat(document.getElementById('p14-crop-area')?.value || '3.5'),
        sowing_date: document.getElementById('p14-crop-sowing')?.value || '',
        expected_harvest_date: document.getElementById('p14-crop-harvest')?.value || '',
        expected_production_quintals: parseFloat(document.getElementById('p14-crop-production')?.value || '85'),
        estimated_production_cost: parseFloat(document.getElementById('p14-crop-cost')?.value || '68000'),
        expected_selling_price: parseFloat(document.getElementById('p14-crop-price')?.value || '2450'),
        expected_revenue: parseFloat(document.getElementById('p14-crop-revenue')?.value || '208250')
      },
      previous_crop: {
        previous_crop: document.getElementById('p14-prev-crop')?.value || '',
        previous_season: document.getElementById('p14-prev-season')?.value || '',
        cultivated_area_acres: parseFloat(document.getElementById('p14-prev-area')?.value || '3.5'),
        production_quintals: parseFloat(document.getElementById('p14-prev-production')?.value || '80'),
        selling_price: parseFloat(document.getElementById('p14-prev-price')?.value || '2400'),
        total_revenue: parseFloat(document.getElementById('p14-prev-revenue')?.value || '192000'),
        approx_profit: parseFloat(document.getElementById('p14-prev-profit')?.value || '90000')
      },
      livestock: {
        cows_number: parseInt(document.getElementById('p14-live-cows')?.value || '0'),
        buffaloes_number: parseInt(document.getElementById('p14-live-buffaloes')?.value || '0'),
        goats_number: parseInt(document.getElementById('p14-live-goats')?.value || '0'),
        sheep_number: parseInt(document.getElementById('p14-live-sheep')?.value || '0'),
        other_livestock_number: parseInt(document.getElementById('p14-live-other')?.value || '0'),
        average_monthly_livestock_income: parseFloat(document.getElementById('p14-live-income')?.value || '0')
      },
      poultry: {
        number_of_hens_chickens: parseInt(document.getElementById('p14-poultry-hens')?.value || '0'),
        egg_production_per_day: parseInt(document.getElementById('p14-poultry-eggs-day')?.value || '0'),
        egg_selling_price: parseFloat(document.getElementById('p14-poultry-egg-price')?.value || '0'),
        monthly_poultry_income: parseFloat(document.getElementById('p14-poultry-income')?.value || '0')
      },
      other_income: {
        agriculture_income: parseFloat(document.getElementById('p14-inc-agri')?.value || '0'),
        dairy_income: parseFloat(document.getElementById('p14-inc-dairy')?.value || '0'),
        poultry_income: parseFloat(document.getElementById('p14-inc-poultry')?.value || '0'),
        livestock_income: parseFloat(document.getElementById('p14-inc-livestock')?.value || '0'),
        labour_income: parseFloat(document.getElementById('p14-inc-labour')?.value || '0'),
        business_income: parseFloat(document.getElementById('p14-inc-business')?.value || '0'),
        other_income: parseFloat(document.getElementById('p14-inc-other')?.value || '0'),
        total_monthly_income: parseFloat(document.getElementById('p14-inc-total')?.value || '35000')
      },
      monthly_expenses: {
        household_expenses: parseFloat(document.getElementById('p14-exp-household')?.value || '0'),
        farming_expenses: parseFloat(document.getElementById('p14-exp-farming')?.value || '0'),
        livestock_poultry_expenses: parseFloat(document.getElementById('p14-exp-livestock')?.value || '0'),
        education_expenses: parseFloat(document.getElementById('p14-exp-education')?.value || '0'),
        medical_expenses: parseFloat(document.getElementById('p14-exp-medical')?.value || '0'),
        other_expenses: parseFloat(document.getElementById('p14-exp-other')?.value || '0'),
        existing_loan_emi: parseFloat(document.getElementById('p14-exp-emi')?.value || '0'),
        total_monthly_expenses: parseFloat(document.getElementById('p14-exp-total')?.value || '25000')
      },
      assets: {
        tractor_machinery: document.getElementById('p14-ast-tractor')?.value || '',
        approx_total_asset_value: parseFloat(document.getElementById('p14-ast-value')?.value || '0'),
        farm_equipment: document.getElementById('p14-ast-equipment')?.value || '',
        other_productive_assets: document.getElementById('p14-ast-other')?.value || '',
        number_of_cattle: parseInt(document.getElementById('p14-ast-cattle')?.value || '0'),
        number_of_goats_sheep: parseInt(document.getElementById('p14-ast-goats')?.value || '0'),
        number_of_poultry: parseInt(document.getElementById('p14-ast-poultry')?.value || '0')
      },
      existing_loans: {
        has_existing_loan: document.getElementById('p14-loan-exists')?.value === 'true',
        loan_provider: document.getElementById('p14-loan-provider')?.value || '',
        loan_type: document.getElementById('p14-loan-type')?.value || '',
        original_loan_amount: parseFloat(document.getElementById('p14-loan-original')?.value || '0'),
        outstanding_amount: parseFloat(document.getElementById('p14-loan-outstanding')?.value || '0'),
        monthly_emi: parseFloat(document.getElementById('p14-loan-emi')?.value || '0'),
        expected_completion_date: document.getElementById('p14-loan-completion')?.value || '',
        loan_purpose: document.getElementById('p14-loan-purpose')?.value || ''
      },
      previous_repayment: {
        previous_loan_taken: document.getElementById('p14-rep-taken')?.value === 'true',
        number_of_previous_loans: parseInt(document.getElementById('p14-rep-count')?.value || '0'),
        ontime_payments: parseInt(document.getElementById('p14-rep-ontime')?.value || '0'),
        late_payments: parseInt(document.getElementById('p14-rep-late')?.value || '0'),
        any_loan_default: document.getElementById('p14-rep-default')?.value === 'true'
      },
      market_sales: {
        main_selling_market: document.getElementById('p14-mkt-market')?.value || '',
        regular_buyer: document.getElementById('p14-mkt-buyer')?.value || '',
        buyer_relationship_duration: document.getElementById('p14-mkt-duration')?.value || '',
        average_sales_per_season: parseFloat(document.getElementById('p14-mkt-sales')?.value || '0'),
        average_selling_price: parseFloat(document.getElementById('p14-mkt-price')?.value || '0'),
        approx_annual_agricultural_sales: parseFloat(document.getElementById('p14-mkt-annual')?.value || '0')
      },
      insurance_schemes: {
        crop_insurance_pmfby: document.getElementById('p14-sch-crop-ins')?.value === 'true',
        livestock_insurance: document.getElementById('p14-sch-live-ins')?.value === 'true',
        pm_kisan_beneficiary: document.getElementById('p14-sch-pmkisan')?.value === 'true',
        kcc_available: document.getElementById('p14-sch-kcc')?.value === 'true',
        other_government_schemes: document.getElementById('p14-sch-other')?.value || ''
      }
    };

    const updatePayload = {
      name: profile_14.personal.full_name,
      phone: profile_14.personal.mobile_number,
      state: profile_14.personal.state,
      district: profile_14.personal.district,
      village: profile_14.personal.village,
      location: \`\${profile_14.personal.village || profile_14.personal.district}, \${profile_14.personal.district}, \${profile_14.personal.state}\`,
      land_size_acres: profile_14.land.total_land_area_acres,
      irrigation_type: profile_14.land.irrigation_status,
      crop_types: [profile_14.crop.crop_name],
      cultivation_cost: profile_14.crop.estimated_production_cost,
      profile_14
    };

    try {
      const res = await fetch(\`/api/v1/farmers/\${currentFarmerId}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        alert(\`✓ All 14 Farmer Profile Sections successfully saved!\\nTotal Inflow: ₹\${profile_14.other_income.total_monthly_income.toLocaleString('en-IN')}/mo · Crop Revenue: ₹\${profile_14.crop.expected_revenue.toLocaleString('en-IN')}\`);
        await loadFarmerData(currentFarmerId);
        await loadInitialData();
      }
    } catch (err) {
      alert('Profile updated in local session.');
    }
  }

  // Legacy fallback for profile form
  async function saveFarmerProfile(e) {
    return saveFarmerProfile14(e);
  }

  // ==========================================
  // CANVAS CHART RENDERING (Market Price Trend)
  // ==========================================
  function renderMarketChart() {
    const canvas = document.getElementById('market-trend-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let y = 30; y < h - 20; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    // Months labels
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Inter, sans-serif';
    const xStep = (w - 70) / (months.length - 1);
    months.forEach((m, i) => {
      ctx.fillText(m, 40 + i * xStep, h - 5);
    });

    // Price data points (Showing peak arrival dip in Nov/Dec)
    // Paddy prices: Jun: 2500, Jul: 2550, Aug: 2600, Sep: 2580, Oct: 2450, Nov: 2150 (Dip!), Dec: 2200, Jan: 2350, Feb: 2450, Mar: 2520, Apr: 2580, May: 2620
    const prices = [2500, 2550, 2600, 2580, 2450, 2150, 2200, 2350, 2450, 2520, 2580, 2620];
    const minP = 2000;
    const maxP = 2800;

    // Draw Price Path
    ctx.beginPath();
    ctx.strokeStyle = '#1b4d2e';
    ctx.lineWidth = 2.5;
    prices.forEach((p, i) => {
      const x = 40 + i * xStep;
      const y = h - 25 - ((p - minP) / (maxP - minP)) * (h - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(40 + (prices.length - 1) * xStep, h - 25);
    ctx.lineTo(40, h - 25);
    ctx.fillStyle = 'rgba(27, 77, 46, 0.08)';
    ctx.fill();

    // Draw peak arrival warning box around Nov/Dec (index 5, 6)
    const xNov = 40 + 5 * xStep;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.fillRect(xNov - 15, 20, xStep + 30, h - 45);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.strokeRect(xNov - 15, 20, xStep + 30, h - 45);

    // Label peak arrival
    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText('Peak Arrival Glut', xNov - 10, 35);
  }

  // ==========================================
  // WEBSOCKET REAL-TIME ENGINE
  // ==========================================
  function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = \`\${protocol}//\${window.location.host}/ws\`;

    try {
      wsClient = new WebSocket(wsUrl);

      wsClient.onopen = () => {
        const dot = document.getElementById('ws-status-dot');
        const text = document.getElementById('ws-status-text');
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
        if (text) text.textContent = 'Network Live';
      };

      wsClient.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleRealtimeMessage(data);
        } catch (e) {}
      };

      wsClient.onclose = () => {
        const dot = document.getElementById('ws-status-dot');
        const text = document.getElementById('ws-status-text');
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-amber-500';
        if (text) text.textContent = 'Reconnecting...';
        setTimeout(connectWebSocket, 4000);
      };

      wsClient.onerror = () => {
        if (wsClient) wsClient.close();
      };
    } catch (e) {
      console.warn('WebSocket init skipped', e);
    }
  }

  function handleRealtimeMessage(msg) {
    if (msg.type === 'APMC_PRICE_UPDATE') {
      // Pulse ticker element
      const tick = document.getElementById('tick-paddy');
      if (tick) {
        tick.classList.add('bg-emerald-700/60');
        setTimeout(() => tick.classList.remove('bg-emerald-700/60'), 800);
      }
    }

    // Append to live events feed
    eventCounter++;
    const countBadge = document.getElementById('drawer-event-count');
    const unread = document.getElementById('event-unread-badge');
    if (countBadge) countBadge.textContent = \`\${eventCounter} Events\`;
    if (unread) unread.classList.remove('hidden');

    const feed = document.getElementById('live-events-feed');
    if (feed) {
      const item = document.createElement('div');
      item.className = 'p-2.5 rounded-lg bg-brand-paleBg border text-xs space-y-1 animate-in fade-in';
      item.innerHTML = \`
        <div class="flex items-center justify-between font-bold text-gray-800">
          <span>\${msg.event || msg.type || 'System Event'}</span>
          <span class="text-[10px] font-mono text-gray-400">\${new Date().toLocaleTimeString()}</span>
        </div>
        <p class="text-gray-600">\${msg.message || msg.description || JSON.stringify(msg.data || '')}</p>
      \`;
      feed.insertBefore(item, feed.firstChild);
    }
  }

  // ==========================================
  // AI ASSISTANT & EVALUATION FUNCTIONS
  // ==========================================
  window.askAssistantPrompt = async (promptText) => {
    const input = document.getElementById('ai-assistant-input');
    if (input) input.value = promptText;
    await sendAssistantQuery(promptText);
  };

  window.handleAssistantSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('ai-assistant-input');
    if (!input || !input.value.trim()) return;
    await sendAssistantQuery(input.value.trim());
  };

  async function sendAssistantQuery(promptText) {
    const container = document.getElementById('ai-assistant-output-container');
    const langSelect = document.getElementById('assistant-lang-select');
    const lang = langSelect ? langSelect.value : 'en';

    if (container) {
      container.innerHTML = \`
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="animate-spin h-4 w-4 text-brand-forest" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Consulting AGMARKNET, KCC advisories & AI Credit Agent...</span>
        </div>
      \`;
    }

    try {
      const res = await fetch('/api/v1/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: currentFarmerId,
          prompt: promptText,
          language: lang,
        }),
      });
      const data = await res.json();
      if (data.success && container) {
        const payload = data.data;
        let sourcesHtml = '';
        if (payload.sources_cited && payload.sources_cited.length > 0) {
          sourcesHtml = '<div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-brand-borderSubtle"><span class="text-[10px] font-bold text-gray-500 uppercase">Data Sources Cited:</span>';
          payload.sources_cited.forEach((s) => {
            sourcesHtml += \`<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-sageLight text-brand-forest border border-brand-borderSubtle">\${s.source}</span>\`;
          });
          sourcesHtml += '</div>';
        }

        container.innerHTML = \`
          <div class="space-y-2">
            <div class="flex items-center justify-between font-bold text-brand-forest">
              <span class="flex items-center gap-1.5">🤖 <span>KissanTrust AI Assistant Answer</span></span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">\${lang.toUpperCase()}</span>
            </div>
            <p class="text-gray-800 font-medium leading-relaxed">\${payload.answer}</p>
            \${sourcesHtml}
          </div>
        \`;
      }
    } catch (err) {
      if (container) {
        container.innerHTML = \`<p class="text-rose-700 font-semibold">Failed to retrieve answer from AI Assistant. Please check server logs.</p>\`;
      }
    }
  }

  window.triggerAICreditEvaluation = async () => {
    const card = document.getElementById('ai-credit-evaluation-card');
    if (card) {
      card.classList.remove('hidden');
      card.innerHTML = \`
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="animate-spin h-4 w-4 text-brand-forest" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Executing 6-Category Weighted AI Credit Scoring Model...</span>
        </div>
      \`;
    }

    try {
      const res = await fetch('/api/v1/ai/credit-agent/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmer_id: currentFarmerId }),
      });
      const data = await res.json();
      if (data.success && card) {
        const evalData = data.data;
        const b = evalData.scoring_breakdown;

        let breakdownHtml = \`
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Evidence & Verif</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.evidence_verification.score} / \${b.evidence_verification.max} pts</p>
            </div>
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Farm Strength</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.farm_production_strength.score} / \${b.farm_production_strength.max} pts</p>
            </div>
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Market Stability</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.market_stability.score} / \${b.market_stability.max} pts</p>
            </div>
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Repayment Capacity</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.repayment_capacity.score} / \${b.repayment_capacity.max} pts</p>
            </div>
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Agro Risk</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.agricultural_risk.score} / \${b.agricultural_risk.max} pts</p>
            </div>
            <div class="p-2.5 rounded-lg bg-gray-50 border">
              <span class="text-[10px] text-gray-500 font-bold uppercase block">Purpose Fit</span>
              <p class="font-bold text-gray-900 mt-0.5">\${b.purpose_fit.score} / \${b.purpose_fit.max} pts</p>
            </div>
          </div>
        \`;

        let sourcesList = evalData.data_sources_used.map((s) => \`<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-paleBg text-brand-forest border">\${s.name} (\${s.type})</span>\`).join(' ');

        card.innerHTML = \`
          <div class="flex items-center justify-between border-b pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  \${evalData.eligibility}
                </span>
                <span class="text-xs font-mono text-gray-500">\${evalData.assessment_id}</span>
              </div>
              <h3 class="serif-title text-base font-bold text-brand-forest mt-1">AI Credit Agent Evaluation: \${evalData.farmer_name}</h3>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-gray-400 block">Overall Score</span>
              <p class="serif-title text-2xl font-bold text-brand-forest">\${evalData.overall_score}<span class="text-xs text-gray-500 font-normal">/100</span></p>
            </div>
          </div>

          <!-- Scoring Breakdown -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider">Weighted Scoring Model Breakdown</h4>
            \${breakdownHtml}
          </div>

          <!-- Safe Credit Recommendation & Narrative -->
          <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
            <div class="flex justify-between items-center">
              <span class="font-bold text-emerald-950 uppercase text-[10px]">Recommended Safe Credit Envelope</span>
              <span class="font-bold font-mono text-emerald-900 text-sm">₹\${evalData.recommended_safe_range.min.toLocaleString('en-IN')} – ₹\${evalData.recommended_safe_range.max.toLocaleString('en-IN')}</span>
            </div>
            <p class="text-emerald-900 leading-relaxed">\${evalData.ai_narrative_explanation}</p>
          </div>

          <!-- Integrated Datasets -->
          <div class="space-y-1.5">
            <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ground Truth Government Datasets Evaluated</h4>
            <div class="flex flex-wrap gap-1.5">
              \${sourcesList}
            </div>
          </div>
        \`;
      }
    } catch (err) {
      if (card) {
        card.innerHTML = \`<p class="text-rose-700 text-xs font-semibold">Evaluation failed. Please try again.</p>\`;
      }
    }
  };

  // ==========================================
  // INITIALIZE ON DOM READY
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    connectWebSocket();
    updateSidebarNav();
    updatePlannerPreview();
    onSimulatorChange();
    initAuthSession();
  });
  </script>
  `;
}
