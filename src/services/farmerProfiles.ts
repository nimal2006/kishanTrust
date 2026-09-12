import {
  ComprehensiveFarmerProfile,
  PersonalDetails,
  FamilyDetails,
  LandDetails,
  CropDetails,
  PreviousCropDetails,
  LivestockDetails,
  PoultryDetails,
  OtherIncomeSources,
  MonthlyExpenses,
  FarmAssets,
  ExistingLoanDetails,
  PreviousRepaymentDetails,
  MarketSalesDetails,
  InsuranceGovernmentSchemes,
} from "../types.js";

export function calculateProfileTotals(profile: ComprehensiveFarmerProfile): ComprehensiveFarmerProfile {
  // 1. Calculate Crop Expected Revenue
  const cropRev = Math.round(
    (profile.crop.expected_production_quintals || 0) * (profile.crop.expected_selling_price || 0)
  );
  profile.crop.expected_revenue = cropRev;

  // 2. Calculate Previous Crop Profit
  const prevRev = Math.round(
    (profile.previous_crop.production_quintals || 0) * (profile.previous_crop.selling_price || 0)
  );
  profile.previous_crop.total_revenue = prevRev;
  if (!profile.previous_crop.approx_profit || profile.previous_crop.approx_profit === 0) {
    profile.previous_crop.approx_profit = Math.round(prevRev * 0.5);
  }

  // 3. Calculate Poultry Monthly Income
  if (!profile.poultry.monthly_poultry_income || profile.poultry.monthly_poultry_income === 0) {
    profile.poultry.monthly_poultry_income = Math.round(
      (profile.poultry.egg_production_per_day || 0) * (profile.poultry.egg_selling_price || 0) * 30
    );
  }

  // 4. Calculate Total Monthly Income
  const totalInc =
    (profile.other_income.agriculture_income || 0) +
    (profile.other_income.dairy_income || 0) +
    (profile.other_income.poultry_income || 0) +
    (profile.other_income.livestock_income || 0) +
    (profile.other_income.labour_income || 0) +
    (profile.other_income.business_income || 0) +
    (profile.other_income.other_income || 0);
  profile.other_income.total_monthly_income = totalInc;
  profile.family.monthly_family_income = totalInc;

  // 5. Calculate Total Monthly Expenses
  const totalExp =
    (profile.monthly_expenses.household_expenses || 0) +
    (profile.monthly_expenses.farming_expenses || 0) +
    (profile.monthly_expenses.livestock_poultry_expenses || 0) +
    (profile.monthly_expenses.education_expenses || 0) +
    (profile.monthly_expenses.medical_expenses || 0) +
    (profile.monthly_expenses.other_expenses || 0) +
    (profile.monthly_expenses.existing_loan_emi || 0);
  profile.monthly_expenses.total_monthly_expenses = totalExp;

  // 6. Calculate Annual Market Sales
  if (!profile.market_sales.approx_annual_agricultural_sales || profile.market_sales.approx_annual_agricultural_sales === 0) {
    profile.market_sales.approx_annual_agricultural_sales = Math.round(
      (profile.market_sales.average_sales_per_season || 0) * (profile.market_sales.average_selling_price || 0) * 2
    );
  }

  return profile;
}

export function createDefaultProfile(
  name: string,
  district: string = "Thiruvallur",
  state: string = "Tamil Nadu",
  village: string = "Nemam Village",
  landSize: number = 3.5,
  crop: string = "Paddy",
  cost: number = 68000,
  loan: number = 200000,
  phone: string = "+91-9840192831",
  fpoName: string = "Thiruvallur Agro Collective Producer Co."
): ComprehensiveFarmerProfile {
  const isTomato = crop.toLowerCase().includes("tomato");
  const isGroundnut = crop.toLowerCase().includes("groundnut");
  const isSoybean = crop.toLowerCase().includes("soybean");

  let yieldQtl = Math.round(landSize * 24);
  let price = 2450;
  let variety = "ADT-53 / Ponni";

  if (isTomato) {
    yieldQtl = Math.round(landSize * 110);
    price = 1650;
    variety = "Abhinav / NS-501 Hybrid";
  } else if (isGroundnut) {
    yieldQtl = Math.round(landSize * 14);
    price = 6400;
    variety = "TMV-7 / Kadiri-6";
  } else if (isSoybean) {
    yieldQtl = Math.round(landSize * 11);
    price = 4500;
    variety = "JS-335";
  }

  const profile: ComprehensiveFarmerProfile = {
    personal: {
      full_name: name,
      age: 42,
      gender: "Male",
      mobile_number: phone,
      village: village,
      district: district,
      state: state,
      education: "Higher Secondary (12th Passed)",
      farming_experience_years: 18,
      fpo_name: fpoName,
    },
    family: {
      family_members_count: 4,
      dependents_count: 2,
      earning_members_count: 2,
      family_occupation: "Agriculture & Allied Dairy",
      monthly_family_income: 38500,
    },
    land: {
      total_land_area: landSize,
      ownership_type: "Owned",
      irrigation_status: "Irrigated",
      soil_type: state === "Maharashtra" ? "Medium Black Cotton Loam" : "Clayey Alluvial Loam (pH 7.2)",
      water_source: "Borewell & Canal Ayacut",
    },
    crop: {
      crop_name: crop,
      crop_variety: variety,
      season: "Kharif",
      cultivated_area_acres: landSize,
      sowing_date: "2026-07-15",
      expected_harvest_date: "2026-11-20",
      expected_production_quintals: yieldQtl,
      estimated_production_cost: cost,
      expected_selling_price: price,
      expected_revenue: yieldQtl * price,
    },
    previous_crop: {
      previous_crop: crop,
      previous_season: "Rabi 2025-26",
      cultivated_area: Math.max(1, landSize - 0.5),
      production_quintals: Math.round(yieldQtl * 0.85),
      selling_price: Math.round(price * 0.95),
      total_revenue: Math.round(yieldQtl * 0.85 * price * 0.95),
      approx_profit: Math.round(yieldQtl * 0.85 * price * 0.95 * 0.55),
    },
    livestock: {
      cows_count: 3,
      buffaloes_count: 0,
      goats_count: 4,
      sheep_count: 0,
      other_livestock_count: 0,
      monthly_livestock_income: 14000,
    },
    poultry: {
      hens_chickens_count: 12,
      egg_production_per_day: 8,
      egg_selling_price: 10,
      monthly_poultry_income: 2400,
    },
    other_income: {
      agriculture_income: 18000,
      dairy_income: 14000,
      poultry_income: 2400,
      livestock_income: 2000,
      labour_income: 0,
      business_income: 0,
      other_income: 2100,
      total_monthly_income: 38500,
    },
    monthly_expenses: {
      household_expenses: 12000,
      farming_expenses: 4500,
      livestock_poultry_expenses: 3800,
      education_expenses: 3500,
      medical_expenses: 1200,
      other_expenses: 1500,
      existing_loan_emi: 0,
      total_monthly_expenses: 26500,
    },
    assets: {
      tractor_machinery: "Mahindra 475 DI (42 HP)",
      farm_equipment: "Rotavator, power sprayer, seed drill",
      number_of_cattle: 3,
      number_of_goats_sheep: 4,
      number_of_poultry: 12,
      other_productive_assets: "5 HP solar submersible pump set",
      approx_asset_value: 850000,
    },
    existing_loans: {
      has_existing_loan: false,
      loan_provider: "Primary Agricultural Credit Society (PACS)",
      loan_type: "KCC Short-Term Crop Loan",
      original_loan_amount: 0,
      outstanding_amount: 0,
      monthly_emi: 0,
      loan_purpose: "Previous season inputs (Fully Repaid)",
      expected_loan_completion_date: "2026-03-31",
    },
    previous_repayment: {
      previous_loan_taken: true,
      number_of_previous_loans: 4,
      number_of_ontime_payments: 4,
      number_of_late_payments: 0,
      has_loan_default: false,
    },
    market_sales: {
      main_selling_market: `${district} Regulated APMC Mandi`,
      regular_buyer: `${fpoName} & State Civil Supplies`,
      buyer_relationship_duration: "5 years",
      average_sales_per_season: yieldQtl,
      average_selling_price: price,
      approx_annual_agricultural_sales: Math.round(yieldQtl * price * 1.5),
    },
    insurance_schemes: {
      crop_insurance: true,
      livestock_insurance: true,
      pm_kisan_beneficiary: true,
      kcc_available: true,
      other_government_scheme: "Soil Health Card, TNAU Subsidized Seeds",
    },
  };

  return calculateProfileTotals(profile);
}

export const RAMESH_KUMAR_PROFILE_14: ComprehensiveFarmerProfile = calculateProfileTotals({
  personal: {
    full_name: "Ramesh Kumar",
    age: 42,
    gender: "Male",
    mobile_number: "+91-9840192831",
    village: "Nemam Village",
    district: "Thiruvallur",
    state: "Tamil Nadu",
    education: "Higher Secondary (12th Passed)",
    farming_experience_years: 18,
    fpo_name: "Thiruvallur Agro Collective Producer Co.",
  },
  family: {
    family_members_count: 4,
    dependents_count: 2,
    earning_members_count: 2,
    family_occupation: "Agriculture & Allied Dairy Farming",
    monthly_family_income: 38500,
  },
  land: {
    total_land_area: 3.5,
    ownership_type: "Owned",
    irrigation_status: "Irrigated",
    soil_type: "Clayey Alluvial Loam (pH 7.2)",
    water_source: "Borewell & Lake Canal Ayacut",
  },
  crop: {
    crop_name: "Paddy",
    crop_variety: "Samba (ADT-53 / Ponni Hybrid)",
    season: "Kharif / Samba",
    cultivated_area_acres: 3.5,
    sowing_date: "2026-07-15",
    expected_harvest_date: "2026-11-20",
    expected_production_quintals: 85,
    estimated_production_cost: 68000,
    expected_selling_price: 2450,
    expected_revenue: 208250,
  },
  previous_crop: {
    previous_crop: "Paddy (Navarai)",
    previous_season: "Navarai / Summer 2025",
    cultivated_area: 3.0,
    production_quintals: 72,
    selling_price: 2380,
    total_revenue: 171360,
    approx_profit: 108000,
  },
  livestock: {
    cows_count: 3,
    buffaloes_count: 0,
    goats_count: 4,
    sheep_count: 0,
    other_livestock_count: 0,
    monthly_livestock_income: 14000,
  },
  poultry: {
    hens_chickens_count: 12,
    egg_production_per_day: 8,
    egg_selling_price: 10,
    monthly_poultry_income: 2400,
  },
  other_income: {
    agriculture_income: 18000,
    dairy_income: 14000,
    poultry_income: 2400,
    livestock_income: 2000,
    labour_income: 0,
    business_income: 0,
    other_income: 2100,
    total_monthly_income: 38500,
  },
  monthly_expenses: {
    household_expenses: 12000,
    farming_expenses: 4500,
    livestock_poultry_expenses: 3800,
    education_expenses: 3500,
    medical_expenses: 1200,
    other_expenses: 1500,
    existing_loan_emi: 0,
    total_monthly_expenses: 26500,
  },
  assets: {
    tractor_machinery: "Mahindra 475 DI (42 HP, 2018 model)",
    farm_equipment: "Rotavator, 5-tine cultivator, knapsack power sprayer",
    number_of_cattle: 3,
    number_of_goats_sheep: 4,
    number_of_poultry: 12,
    other_productive_assets: "5 HP submersible borewell pump set with solar inverter",
    approx_asset_value: 850000,
  },
  existing_loans: {
    has_existing_loan: false,
    loan_provider: "Primary Agricultural Credit Society (PACS)",
    loan_type: "KCC Short-Term Crop Loan",
    original_loan_amount: 0,
    outstanding_amount: 0,
    monthly_emi: 0,
    loan_purpose: "Previous season cultivation credit (Fully Repaid)",
    expected_loan_completion_date: "2026-03-31",
  },
  previous_repayment: {
    previous_loan_taken: true,
    number_of_previous_loans: 4,
    number_of_ontime_payments: 4,
    number_of_late_payments: 0,
    has_loan_default: false,
  },
  market_sales: {
    main_selling_market: "Thiruvallur Regulated APMC Market & FPO Center",
    regular_buyer: "Thiruvallur Agro Collective & TNCSC Direct Center",
    buyer_relationship_duration: "5 years",
    average_sales_per_season: 80,
    average_selling_price: 2420,
    approx_annual_agricultural_sales: 380000,
  },
  insurance_schemes: {
    crop_insurance: true,
    livestock_insurance: true,
    pm_kisan_beneficiary: true,
    kcc_available: true,
    other_government_scheme: "Soil Health Card, Kalaignar Integrated Agriculture Development",
  },
});

export const RAJENDRA_PATIL_PROFILE_14: ComprehensiveFarmerProfile = calculateProfileTotals({
  personal: {
    full_name: "Rajendra Patil",
    age: 48,
    gender: "Male",
    mobile_number: "+91-9876543210",
    village: "Pimpalgaon Baswant",
    district: "Nashik",
    state: "Maharashtra",
    education: "Graduate (B.Com)",
    farming_experience_years: 22,
    fpo_name: "Sahyadri Farmers Producer Company",
  },
  family: {
    family_members_count: 5,
    dependents_count: 3,
    earning_members_count: 2,
    family_occupation: "Commercial Horticulture & Grapes",
    monthly_family_income: 62000,
  },
  land: {
    total_land_area: 4.5,
    ownership_type: "Owned",
    irrigation_status: "Irrigated",
    soil_type: "Deep Black Clayey Loam (Regur Soil)",
    water_source: "Drip Irrigation via Farm Pond & Borewell",
  },
  crop: {
    crop_name: "Tomato",
    crop_variety: "Abhinav (Seminis Hybrid)",
    season: "Kharif",
    cultivated_area_acres: 4.5,
    sowing_date: "2026-08-01",
    expected_harvest_date: "2026-12-10",
    expected_production_quintals: 495,
    estimated_production_cost: 140000,
    expected_selling_price: 1650,
    expected_revenue: 816750,
  },
  previous_crop: {
    previous_crop: "Tomato",
    previous_season: "Rabi 2025",
    cultivated_area: 4.0,
    production_quintals: 380,
    selling_price: 1100,
    total_revenue: 418000,
    approx_profit: 160000,
  },
  livestock: {
    cows_count: 2,
    buffaloes_count: 1,
    goats_count: 0,
    sheep_count: 0,
    other_livestock_count: 0,
    monthly_livestock_income: 18500,
  },
  poultry: {
    hens_chickens_count: 0,
    egg_production_per_day: 0,
    egg_selling_price: 0,
    monthly_poultry_income: 0,
  },
  other_income: {
    agriculture_income: 35000,
    dairy_income: 18500,
    poultry_income: 0,
    livestock_income: 0,
    labour_income: 0,
    business_income: 8500,
    other_income: 0,
    total_monthly_income: 62000,
  },
  monthly_expenses: {
    household_expenses: 18000,
    farming_expenses: 9000,
    livestock_poultry_expenses: 4200,
    education_expenses: 6000,
    medical_expenses: 2500,
    other_expenses: 3000,
    existing_loan_emi: 8500,
    total_monthly_expenses: 51200,
  },
  assets: {
    tractor_machinery: "John Deere 5050 D (50 HP)",
    farm_equipment: "Air-assisted orchard sprayer, plastic mulch layer",
    number_of_cattle: 3,
    number_of_goats_sheep: 0,
    number_of_poultry: 0,
    other_productive_assets: "1.5 Crore Liter Lined Farm Pond, Drip Automation",
    approx_asset_value: 1650000,
  },
  existing_loans: {
    has_existing_loan: true,
    loan_provider: "Bank of Maharashtra (Pimpalgaon Branch)",
    loan_type: "Medium-Term Farm Mechanization Loan",
    original_loan_amount: 350000,
    outstanding_amount: 142000,
    monthly_emi: 8500,
    loan_purpose: "Orchard sprayer and farm pond lining",
    expected_loan_completion_date: "2027-06-30",
  },
  previous_repayment: {
    previous_loan_taken: true,
    number_of_previous_loans: 3,
    number_of_ontime_payments: 2,
    number_of_late_payments: 1,
    has_loan_default: false,
  },
  market_sales: {
    main_selling_market: "Pimpalgaon Baswant APMC (Asia's largest tomato market)",
    regular_buyer: "Commission Agents & Sahyadri FPO Packhouse",
    buyer_relationship_duration: "8 years",
    average_sales_per_season: 450,
    average_selling_price: 1550,
    approx_annual_agricultural_sales: 920000,
  },
  insurance_schemes: {
    crop_insurance: false,
    livestock_insurance: true,
    pm_kisan_beneficiary: true,
    kcc_available: true,
    other_government_scheme: "Magel Tyala Shettale (Farm Pond Scheme), Nanaji Deshmukh Krishi Sanjivani",
  },
});

export const SUNITA_DESHMUKH_PROFILE_14: ComprehensiveFarmerProfile = calculateProfileTotals({
  personal: {
    full_name: "Sunita Deshmukh",
    age: 39,
    gender: "Female",
    mobile_number: "+91-9876501234",
    village: "Ozar",
    district: "Nashik",
    state: "Maharashtra",
    education: "Bachelor of Science (Botany)",
    farming_experience_years: 12,
    fpo_name: "Sahyadri Farmers Producer Company",
  },
  family: {
    family_members_count: 4,
    dependents_count: 2,
    earning_members_count: 2,
    family_occupation: "Certified Organic Horticulture & Pomegranate",
    monthly_family_income: 54000,
  },
  land: {
    total_land_area: 3.2,
    ownership_type: "Owned",
    irrigation_status: "Irrigated",
    soil_type: "Medium Black Volcanic Loam",
    water_source: "Micro-drip via Community River Lift",
  },
  crop: {
    crop_name: "Tomato",
    crop_variety: "Organic Roma & Cherry Hybrid",
    season: "Kharif",
    cultivated_area_acres: 3.2,
    sowing_date: "2026-07-20",
    expected_harvest_date: "2026-11-30",
    expected_production_quintals: 320,
    estimated_production_cost: 95000,
    expected_selling_price: 1850,
    expected_revenue: 592000,
  },
  previous_crop: {
    previous_crop: "Pomegranate (Bhagwa)",
    previous_season: "Annual 2025-26",
    cultivated_area: 2.5,
    production_quintals: 95,
    selling_price: 6800,
    total_revenue: 646000,
    approx_profit: 390000,
  },
  livestock: {
    cows_count: 4,
    buffaloes_count: 0,
    goats_count: 2,
    sheep_count: 0,
    other_livestock_count: 0,
    monthly_livestock_income: 22000,
  },
  poultry: {
    hens_chickens_count: 20,
    egg_production_per_day: 14,
    egg_selling_price: 12,
    monthly_poultry_income: 5040,
  },
  other_income: {
    agriculture_income: 24000,
    dairy_income: 22000,
    poultry_income: 5040,
    livestock_income: 1500,
    labour_income: 0,
    business_income: 1460,
    other_income: 0,
    total_monthly_income: 54000,
  },
  monthly_expenses: {
    household_expenses: 14000,
    farming_expenses: 6500,
    livestock_poultry_expenses: 5200,
    education_expenses: 4500,
    medical_expenses: 1500,
    other_expenses: 2000,
    existing_loan_emi: 0,
    total_monthly_expenses: 33700,
  },
  assets: {
    tractor_machinery: "Sonalika Tiger 35 (39 HP)",
    farm_equipment: "Bio-slurry digestor, automated fertigation injector, cold crate inventory",
    number_of_cattle: 4,
    number_of_goats_sheep: 2,
    number_of_poultry: 20,
    other_productive_assets: "Certified NPOP vermicompost unit and solar dry shade",
    approx_asset_value: 1250000,
  },
  existing_loans: {
    has_existing_loan: false,
    loan_provider: "State Bank of India (Agriculture Branch)",
    loan_type: "KCC Facility",
    original_loan_amount: 0,
    outstanding_amount: 0,
    monthly_emi: 0,
    loan_purpose: "Seasonal working capital (Fully Repaid)",
    expected_loan_completion_date: "2026-03-31",
  },
  previous_repayment: {
    previous_loan_taken: true,
    number_of_previous_loans: 2,
    number_of_ontime_payments: 2,
    number_of_late_payments: 0,
    has_loan_default: false,
  },
  market_sales: {
    main_selling_market: "Nashik APMC & Sahyadri Agro Retail Hub",
    regular_buyer: "Sahyadri Farmers Co. Organic Brand & Metro Cash & Carry",
    buyer_relationship_duration: "6 years",
    average_sales_per_season: 300,
    average_selling_price: 1800,
    approx_annual_agricultural_sales: 840000,
  },
  insurance_schemes: {
    crop_insurance: true,
    livestock_insurance: true,
    pm_kisan_beneficiary: true,
    kcc_available: true,
    other_government_scheme: "Paramparagat Krishi Vikas Yojana (PKVY Organic), PMKSY Micro-Irrigation",
  },
});
