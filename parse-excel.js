const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'test-data.xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = 'Updated Test Cases';
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

function normalizeString(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.\d]+/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
}

function hashTestCase(tc) {
  const normalized = `${tc.module}|${tc.subModule}|${tc.testScenario}|${normalizeString(tc.testSteps)}|${normalizeString(tc.expectedResult)}`;
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

const testCases = [];

for (let i = 1; i < jsonData.length; i++) {
  const row = jsonData[i];
  if (!row || row.length < 8) continue;
  
  const [srNo, module, subModule, testScenario, testCase, testSteps, testData, expectedResult] = row;
  
  if (!srNo || !module || !testScenario) continue;

  testCases.push({
    srNo: String(srNo).trim(),
    module: String(module).trim(),
    subModule: String(subModule).trim(),
    testScenario: String(testScenario).trim(),
    testCase: String(testCase).trim(),
    testSteps: String(testSteps).trim(),
    testData: String(testData).trim(),
    expectedResult: String(expectedResult).trim(),
  });
}

const dropdownModules = ['Bike', 'Health', 'Life'];
const dropdownSubModules = ['Bike Dropdown', 'Health Dropdown', 'Life Dropdown', 'Bike Insurance Companies', 'Health Insurance Companies', 'Life Insurance Companies', 'Network Hospitals', 'Life Insurance - Header Navigation'];

const dropdownTests = testCases.filter(tc => 
  dropdownModules.includes(tc.module) && 
  dropdownSubModules.some(sm => tc.subModule.includes(sm.replace(' Dropdown', '').replace(' Insurance Companies', '').replace(' - Header Navigation', '')))
);

const sharedFlowTests = testCases.filter(tc => 
  dropdownModules.includes(tc.module) && 
  ['Home Page Flow', 'Find Advisor Popup Flow', 'Advisor Listing Page Flow'].includes(tc.subModule)
);

const lifeLandingTests = testCases.filter(tc => 
  tc.module === 'Life' && tc.subModule === 'Life Landing Page Flow'
);

const seen = new Map();
const duplicates = [];

for (const tc of testCases) {
  const hash = hashTestCase(tc);
  if (seen.has(hash)) {
    duplicates.push({ ...tc, duplicateOf: seen.get(hash).testScenario });
  } else {
    seen.set(hash, tc);
  }
}

const parsedData = {
  dropdownTests,
  sharedFlowTests,
  lifeLandingTests,
  allTests: testCases,
  duplicates,
};

const outputDir = path.join(__dirname, 'test-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'test-data.json'),
  JSON.stringify(parsedData, null, 2)
);

if (duplicates.length > 0) {
  const csvHeader = 'Sr. No,Module,Sub Module,Test Scenario,Duplicate Of\n';
  const csvRows = duplicates.map(d => 
    `"${d.srNo}","${d.module}","${d.subModule}","${d.testScenario}","${d.duplicateOf || ''}"`
  ).join('\n');
  fs.writeFileSync(
    path.join(outputDir, 'duplicates-report.csv'),
    csvHeader + csvRows
  );
}

console.log(`Parsed ${parsedData.allTests.length} test cases`);
console.log(`  Dropdown tests: ${parsedData.dropdownTests.length}`);
console.log(`  Shared flow tests: ${parsedData.sharedFlowTests.length}`);
console.log(`  Life landing tests: ${parsedData.lifeLandingTests.length}`);
console.log(`  Duplicates found: ${parsedData.duplicates.length}`);
console.log(`Data saved to ${outputDir}/`);