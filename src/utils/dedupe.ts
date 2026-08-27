import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ParsedTestData, TestCaseData } from './excel-reader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export function deduplicateTestCases(testCases: TestCaseData[]): { unique: TestCaseData[]; duplicates: TestCaseData[] } {
  const seen = new Map<string, TestCaseData>();
  const duplicates: TestCaseData[] = [];

  for (const tc of testCases) {
    const hash = hashTestCase(tc);
    if (seen.has(hash)) {
      const original = seen.get(hash)!;
      duplicates.push({ 
        ...tc, 
        duplicateOf: `${original.srNo}: ${original.testScenario}` 
      });
    } else {
      seen.set(hash, tc);
    }
  }

  return { unique: Array.from(seen.values()), duplicates };
}

export function analyzeDuplicates(data: ParsedTestData) {
  console.log('=== Deduplication Analysis ===\n');
  
  const { unique, duplicates } = deduplicateTestCases(data.allTests);
  
  console.log(`Total test cases: ${data.allTests.length}`);
  console.log(`Unique test cases: ${unique.length}`);
  console.log(`Duplicates found: ${duplicates.length}`);
  console.log(`Reduction: ${((duplicates.length / data.allTests.length) * 100).toFixed(1)}%\n`);

  if (duplicates.length > 0) {
    console.log('Duplicate Details:');
    console.log('------------------');
    
    const duplicateGroups = new Map<string, TestCaseData[]>();
    for (const dup of duplicates) {
      const key = dup.duplicateOf || 'Unknown';
      if (!duplicateGroups.has(key)) {
        duplicateGroups.set(key, []);
      }
      duplicateGroups.get(key)!.push(dup);
    }

    for (const [original, dups] of duplicateGroups) {
      console.log(`\nOriginal: ${original}`);
      for (const dup of dups) {
        console.log(`  -> ${dup.srNo} (${dup.module} > ${dup.subModule}): ${dup.testScenario.substring(0, 60)}...`);
      }
    }
  }

  const moduleStats = new Map<string, { total: number; unique: number; duplicates: number }>();
  
  for (const tc of data.allTests) {
    if (!moduleStats.has(tc.module)) {
      moduleStats.set(tc.module, { total: 0, unique: 0, duplicates: 0 });
    }
    moduleStats.get(tc.module)!.total++;
  }

  for (const tc of unique) {
    moduleStats.get(tc.module)!.unique++;
  }

  for (const dup of duplicates) {
    moduleStats.get(dup.module)!.duplicates++;
  }

  console.log('\n=== Module-wise Statistics ===');
  console.log('Module              | Total | Unique | Dupes | Reduction');
  console.log('--------------------|-------|--------|-------|----------');
  
  for (const [module, stats] of moduleStats) {
    const reduction = stats.total > 0 ? ((stats.duplicates / stats.total) * 100).toFixed(1) : '0.0';
    console.log(`${module.padEnd(20)} | ${String(stats.total).padStart(5)} | ${String(stats.unique).padStart(6)} | ${String(stats.duplicates).padStart(5)} | ${reduction}%`);
  }

  return { unique, duplicates, moduleStats };
}

export function generateDeduplicationReport(data: ParsedTestData, outputDir: string = 'test-data') {
  const { unique, duplicates } = deduplicateTestCases(data.allTests);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const report = {
    summary: {
      totalTests: data.allTests.length,
      uniqueTests: unique.length,
      duplicateTests: duplicates.length,
      reductionPercentage: ((duplicates.length / data.allTests.length) * 100).toFixed(1),
      generatedAt: new Date().toISOString(),
    },
    duplicates: duplicates.map(d => ({
      duplicateId: d.srNo,
      module: d.module,
      subModule: d.subModule,
      testScenario: d.testScenario,
      duplicateOf: d.duplicateOf,
    })),
    uniqueTests: unique.map(u => ({
      id: u.srNo,
      module: u.module,
      subModule: u.subModule,
      testScenario: u.testScenario,
    })),
  };

  fs.writeFileSync(
    path.join(outputDir, 'deduplication-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log(`���� Deduplication report saved to ${outputDir}/deduplication-report.json`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dataPath = process.argv[2] || path.join(__dirname, '../../test-data/test-data.json');
  if (fs.existsSync(dataPath)) {
    const data: ParsedTestData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    analyzeDuplicates(data);
    generateDeduplicationReport(data);
  } else {
    console.error('Test data file not found. Run parse:excel first.');
    process.exit(1);
  }
}