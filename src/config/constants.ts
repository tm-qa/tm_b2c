export const MODULES = {
  CAR: 'Car',
  BIKE: 'Bike',
  HEALTH: 'Health',
  LIFE: 'Life',
  RAISE_CLAIM: 'Raise a Claim',
  BECOME_POSP: 'Become a POSP',
  PARTNERS_BIKE: 'Our partners (BIKE)',
  PARTNERS_CAR: 'Our partners (CAR)',
  PARTNERS_HEALTH: 'Our partners (Health)',
  PARTNERS_LIFE: 'Our partners (Life)',
} as const;

export type Module = typeof MODULES[keyof typeof MODULES];

export const SUB_MODULES = {
  DROPDOWN: 'Dropdown',
  INSURANCE_COMPANIES: 'Insurance Companies',
  CASHLESS_GARAGE: 'Cashless Garage',
  NETWORK_HOSPITALS: 'Network Hospitals',
  HOME_PAGE_FLOW: 'Home Page Flow',
  FIND_ADVISOR_POPUP: 'Find Advisor Popup Flow',
  ADVISOR_LISTING_PAGE: 'Advisor Listing Page Flow',
  LIFE_LANDING_PAGE: 'Life Landing Page Flow',
  INSURER_LANDING_PAGE: 'Insurer Landing Page Flow',
  HEADER_NAVIGATION: 'Header Navigation',
} as const;

export const SELECTORS = {
  HEADER: {
    CAR_DROPDOWN: '//nav//a[contains(text(), "Car")] | //nav//button[contains(text(), "Car")] | //header//a[contains(text(), "Car")] | //a[contains(@href, "car")]',
    BIKE_DROPDOWN: '//nav//a[contains(text(), "Bike")] | //nav//button[contains(text(), "Bike")] | //header//a[contains(text(), "Bike")] | //a[contains(@href, "bike")]',
    HEALTH_DROPDOWN: '//nav//a[contains(text(), "Health")] | //nav//button[contains(text(), "Health")] | //header//a[contains(text(), "Health")] | //a[contains(@href, "health")]',
    LIFE_DROPDOWN: '//nav//a[contains(text(), "Life")] | //nav//button[contains(text(), "Life")] | //header//a[contains(text(), "Life")] | //a[contains(@href, "life")]',
  },
  DROPDOWN: {
    CONTAINER: '//*[@role="menu"] | //*[contains(@class, "dropdown-menu")] | //*[contains(@class, "nav-dropdown")] | //*[contains(@class, "mega-menu")] | //nav//ul | //*[contains(@class, "dropdown-content")]',
    SECTION: '//*[contains(@class, "dropdown-section")] | //*[contains(@class, "menu-section")] | //*[contains(@class, "mega-menu-section")] | //h3 | //h4 | //*[contains(@class, "section-title")]',
    INSURER_LINK: '//a[contains(@href, "insurance")] | //a[contains(@href, "insurer")] | //*[contains(@class, "insurer-link")]//a | //*[contains(@class, "company-link")]//a | //li//a',
    CASHLESS_GARAGE_LINK: '//a[contains(@href, "garage")] | //a[contains(@href, "cashless")] | //*[contains(@class, "garage-link")]//a',
    NETWORK_HOSPITAL_LINK: '//a[contains(@href, "hospital")] | //a[contains(@href, "network")] | //*[contains(@class, "hospital-link")]//a',
  },
  HOME_PAGE: {
    INSURANCE_TYPE_SELECTOR: '//select[@name="insuranceType"] | //select[contains(@id, "insurance")] | //select[@id="insurance-type"] | //select[contains(@class, "form-select")]',
    FIND_ADVISOR_CTA: '//button[contains(text(), "Find Advisor")] | //a[contains(text(), "Find Advisor")] | //*[contains(@class, "btn-find-advisor")] | //a[contains(@href, "advisor")]',
    GET_QUOTE_CTA: '//button[contains(text(), "Get a Quote")] | //a[contains(text(), "Get a Quote")] | //*[contains(@class, "btn-get-quote")] | //a[contains(@href, "quote")]',
    INSURER_SELECTOR: '//select[@name="insurer"] | //select[contains(@id, "insurer")] | //select[@id="insurer"]',
    VALIDATION_MESSAGE: '//*[contains(@class, "error-message")] | //*[contains(@class, "validation-message")] | //*[contains(@class, "text-danger")] | //*[contains(@class, "alert-danger")] | //*[@role="alert"] | //*[contains(@class, "invalid-feedback")] | //*[contains(@class, "form-error")]',
  },
  ADVISOR_POPUP: {
    CONTAINER: '//*[@role="dialog"] | //*[contains(@class, "modal")] | //*[contains(@class, "popup")] | //*[contains(@class, "advisor-modal")] | //*[contains(@class, "modal-overlay")]',
    PINCODE_INPUT: '//input[@name="pincode"] | //input[contains(@placeholder, "pincode")] | //input[contains(@placeholder, "PIN")] | //input[@type="number" and @maxlength="6"] | //*[contains(@class, "modal")]//input | //*[contains(@class, "popup")]//input',
    SUBMIT_BUTTON: '//button[@type="submit"] | //button[contains(text(), "Submit")] | //button[contains(text(), "Find")] | //button[contains(text(), "Search")] | //*[contains(@class, "btn-primary")] | //*[contains(@class, "btn-submit")]',
    CLOSE_BUTTON: '//button[contains(text(), "Close")] | //*[@aria-label="Close"] | //*[contains(@class, "close-btn")] | //*[contains(@class, "modal-close")] | //*[contains(@class, "popup-close")]',
  },
  ADVISOR_LISTING: {
    CONTAINER: '//*[contains(@class, "advisor-listing")] | //*[contains(@class, "advisors-list")] | //*[contains(@class, "advisors-container")] | //*[@data-advisors] | //*[contains(@class, "results-list")]',
    ADVISOR_CARD: '//*[contains(@class, "advisor-card")] | //*[contains(@class, "advisor-item")] | //*[contains(@class, "advisor-profile")] | //article[contains(@class, "advisor")] | //*[contains(@class, "advisor-listing")]//div',
    FILTER_SPECIALIZATION: '//select[@name="specialization"] | //select[contains(@id, "specialization")] | //select[@id="specialization"]',
  },
  LIFE_LANDING: {
    HERO_SECTION: '//*[contains(@class, "hero-section")] | //*[contains(@class, "hero")] | //*[contains(@class, "banner")] | //*[contains(@class, "page-hero")] | //main//section[1]',
    CALCULATOR_CTA: '//a[contains(text(), "Calculate")] | //a[contains(text(), "Premium Calculator")] | //button[contains(text(), "Calculate")] | //*[contains(@class, "btn-calculator")]',
    PLAN_CARDS: '//*[contains(@class, "plan-card")] | //*[contains(@class, "insurance-plan")] | //*[contains(@class, "card") and contains(text(), "Term")] | //*[contains(@class, "card") and contains(text(), "ULIP")] | //*[contains(@class, "plan-item")]',
    TESTIMONIALS: '//*[contains(@class, "testimonials")] | //*[contains(@class, "testimonials-carousel")] | //*[contains(@class, "reviews")] | //*[contains(@class, "carousel")] | //*[contains(@class, "slider")] | //*[contains(@class, "swiper")]',
    COMPANY_LOGOS: '//*[contains(@class, "company-logos")] | //*[contains(@class, "partner-logos")] | //*[contains(@class, "insurer-logos")] | //*[contains(@class, "logo-grid")]//img',
  },
  COMMON: {
    LOADER: '//*[contains(@class, "loader")] | //*[contains(@class, "spinner")] | //*[contains(@class, "loading")] | //*[@role="status"] | //*[contains(@class, "skeleton")]',
    ERROR_TOAST: '//*[contains(@class, "toast-error")] | //*[contains(@class, "alert-error")] | //*[contains(@class, "notification-error")] | //*[contains(@class, "toast-danger")]',
    SUCCESS_TOAST: '//*[contains(@class, "toast-success")] | //*[contains(@class, "alert-success")] | //*[contains(@class, "notification-success")]',
  },
} as const;

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
  EXTRA_LONG: 60000,
} as const;

export const TEST_TAGS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  SANITY: '@sanity',
  DROPDOWN: '@dropdown',
  NAVIGATION: '@navigation',
  ADVISOR: '@advisor',
  LANDING: '@landing',
} as const;