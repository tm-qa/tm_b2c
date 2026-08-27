export const INSURERS = {
  CAR: {
    COMPANIES: [
      'National',
      'HDFC ERGO',
      'New India Assurance',
      'Bajaj',
      'TATA AIG',
      'ICICI Lombard',
      'United India',
      'Royal Sundaram',
      'Cholamandalam',
      'IFFCO Tokio',
    ],
    CASHLESS_GARAGES: [
      'Bajaj',
      'Cholamandalam',
      'Future Generali',
      'HDFC ERGO',
      'ICICI Lombard',
      'Kotak',
      'National',
      'Royal Sundaram',
    ],
    THIRD_PARTY: [
      'National',
      'HDFC ERGO',
      'New India Assurance',
      'Bajaj',
      'TATA AIG',
      'ICICI Lombard',
      'United India',
      'Royal Sundaram',
      'Cholamandalam',
      'IFFCO Tokio',
    ],
    COMPREHENSIVE: [
      'SBI',
      'Royal Sundaram',
      'HDFC ERGO',
      'ICICI Lombard',
      'Bajaj',
      'TATA AIG',
    ],
    OWN_DAMAGE: [
      'Royal Sundaram',
      'HDFC ERGO',
      'ICICI Lombard',
    ],
  },
  BIKE: {
    COMPANIES: [
      'Bajaj',
      'HDFC ERGO',
      'ICICI Lombard',
      'TATA AIG',
      'IFFCO Tokio',
      'Reliance',
      'National',
      'New India Assurance',
      'United India',
      'Oriental',
    ],
  },
  HEALTH: {
    COMPANIES: [
      'Star Health',
      'Care Health',
      'HDFC ERGO',
      'Aditya Birla Health',
      'ICICI Lombard',
      'SBI Health',
      'TATA AIG',
      'Niva Bupa',
      'Manipal Cigna',
      'Bajaj Health',
    ],
    NETWORK_HOSPITALS: [
      'Star',
      'Care',
      'HDFC ERGO',
      'Aditya Birla',
      'ICICI Lombard',
      'SBI',
      'TATA AIG',
      'Manipal Cigna',
      'Bajaj',
    ],
  },
  LIFE: {
    COMPANIES: [
      'LIC',
      'Axis Max Life',
      'ICICI Prudential Life',
      'HDFC Life',
      'Bajaj Life',
      'Kotak Life',
      'Reliance Nippon Life',
      'Exide Life',
      'TATA AIA Life',
      'Aditya Birla Sun Life',
    ],
  },
} as const;

export const DROPDOWN_SECTIONS = {
  CAR: [
    'Car Insurance Companies',
    'Third-Party',
    'Comprehensive',
    'Own Damage',
    'Zero Depreciation',
    'Compare Car Insurance',
    'Cashless Garage',
    'Car Insurance Claim Process',
    'Blogs',
  ],
  BIKE: [
    'Bike Insurance Companies',
    'Bike Insurance Premium Calculator',
    'Own Damage',
    'Third Party',
    'Comprehensive',
    'Zero Depreciation',
    'Bike Insurance Claim Process',
    'Blogs',
  ],
  HEALTH: [
    'Compare Health Insurance',
    'Mediclaim Policy',
    'Health Insurance Companies',
    'Premium Calculator',
    'Health Insurance Plans',
    'Health Insurance Plans for Family',
    'Health Insurance Plans for Senior Citizens',
    'Critical Illness Insurance',
    'Health Insurance Claim Process',
    'Network Hospitals',
    'Blogs',
  ],
  LIFE: [
    'Term Insurance',
    'Money Back Insurance',
    'Endowment Insurance',
    'ULIPs',
    'Life Insurance Companies',
    'Life Insurance Premium Calculator',
    'Compare Life Insurance',
    'Blogs',
  ],
} as const;

export const VALIDATION_MESSAGES = {
  NO_INSURANCE_SELECTED: 'Please select type of insurance',
  BLANK_PINCODE: 'Please enter pincode',
  INVALID_PINCODE: 'Please enter valid pincode',
} as const;

export const TEST_PINCODES = [
  '400001',
  '110001',
  '560001',
  '400050',
  '110002',
] as const;

export const TEST_DATA = {
  advisor: {
    validPincode: TEST_PINCODES[0],
    invalidPincode: '000000',
    alphabeticPincode: 'ABC123',
    insurer: 'Bajaj',
  },
  vehicle: {
    make: 'Honda',
    model: 'Activa 6G',
    variant: 'Standard',
    manufactureYear: '2023',
  },
} as const;

export const LIFE_LANDING_PLANS = [
  'Term Insurance',
  'Money Back Insurance',
  'Endowment Insurance',
  'ULIPs',
] as const;

export const EXPECTED_URLS = {
  CAR_INSURER_BASE: '/car-insurance/',
  BIKE_INSURER_BASE: '/bike-insurance/',
  HEALTH_INSURER_BASE: '/health-insurance/',
  LIFE_INSURER_BASE: '/life-insurance/',
  CASHLESS_GARAGE_BASE: '/cashless-garages/',
  NETWORK_HOSPITAL_BASE: '/network-hospitals/',
  ADVISOR_LISTING: '/find-advisor/',
  LIFE_LANDING: '/life-insurance/',
} as const;