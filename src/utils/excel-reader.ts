import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const getDirname = () => path.dirname(new URL(import.meta.url).pathname);
const __dirname = getDirname();

export interface TestCaseData {
  srNo: string;
  module: string;
  subModule: string;
  testScenario: string;
  testCase: string;
  testSteps: string;
  testData: string;
  expectedResult: string;
  duplicateOf?: string;
}

export interface ParsedTestData {
  dropdownTests: TestCaseData[];
  sharedFlowTests: TestCaseData[];
  lifeLandingTests: TestCaseData[];
  allTests: TestCaseData[];
  duplicates: TestCaseData[];
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.\d]+/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
}

function hashTestCase(tc: TestCaseData): string {
  const normalized = `${tc.module}|${tc.subModule}|${tc.testScenario}|${normalizeString(tc.testSteps)}|${normalizeString(tc.expectedResult)}`;
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

export function parseExcelFile(filePath: string): ParsedTestData {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = 'Updated Test Cases';
  
  if (!workbook.Sheets[sheetName]) {
    throw new Error(`Sheet "${sheetName}" not found in Excel file`);
  }

  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

  const testCases: TestCaseData[] = [];
  
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

  const seen = new Map<string, TestCaseData>();
  const duplicates: TestCaseData[] = [];

  for (const tc of testCases) {
    const hash = hashTestCase(tc);
    if (seen.has(hash)) {
      duplicates.push({ ...tc, duplicateOf: seen.get(hash)!.testScenario });
    } else {
      seen.set(hash, tc);
    }
  }

  return {
    dropdownTests,
    sharedFlowTests,
    lifeLandingTests,
    allTests: testCases,
    duplicates,
  };
}

export function saveParsedData(data: ParsedTestData, outputDir: string = 'test-data') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'test-data.json'),
    JSON.stringify(data, null, 2)
  );

  if (data.duplicates.length > 0) {
    const csvHeader = 'Sr. No,Module,Sub Module,Test Scenario,Duplicate Of\n';
    const csvRows = data.duplicates.map(d => 
      `"${d.srNo}","${d.module}","${d.subModule}","${d.testScenario}","${d.duplicateOf || ''}"`
    ).join('\n');
    fs.writeFileSync(
      path.join(outputDir, 'duplicates-report.csv'),
      csvHeader + csvRows
    );
  }

  console.log(`��� Parsed ${data.allTests.length} test cases`);
  console.log(`  Dropdown tests: ${data.dropdownTests.length}`);
  console.log(`  Shared flow tests: ${data.sharedFlowTests.length}`);
  console.log(`  Life landing tests: ${data.lifeLandingTests.length}`);
  console.log(`  Duplicates found: ${data.duplicates.length}`);
  console.log(`���� Data saved to ${outputDir}/`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const excelPath = process.argv[2] || path.join(__dirname, '../../../Turtlemint_Old_Test_Cases_Updated_Format.xlsx');
  const data = parseExcelFile(excelPath);
  saveParsedData(data);
}