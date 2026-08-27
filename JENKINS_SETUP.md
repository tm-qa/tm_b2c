# Jenkins Setup Guide for Turtlemint Automation

## Prerequisites

1. **Jenkins** (v2.400+) with Pipeline plugin
2. **Node.js 18+** installed on Jenkins agent
3. **Allure Plugin** for Jenkins
4. **Git** access to the repository

## Jenkins Configuration

### 1. Install Required Plugins
- Pipeline
- NodeJS Plugin
- Allure Plugin
- Git Plugin
- HTML Publisher Plugin (for Playwright HTML reports)

### 2. Configure Node.js in Jenkins
1. Go to **Manage Jenkins** → **Tools**
2. Find **NodeJS** section
3. Click **Add NodeJS**
4. Name: `NodeJS-18+`
5. Version: Select Node.js 18 or higher
6. Save

### 3. Configure Allure in Jenkins
1. Go to **Manage Jenkins** → **Tools**
2. Find **Allure Commandline** section
3. Click **Add Allure Commandline**
3. Name: `allure-latest`
4. Version: Latest
5. Save

### 4. Create Pipeline Job
1. Click **New Item** → **Pipeline**
2. Name: `turtlemint-automation`
3. In **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `<your-git-repo-url>`
   - Branch: `main` (or your branch)
   - Script Path: `Jenkinsfile`
4. Save

### 5. Credentials Setup
Add these credentials in Jenkins:
- **Git credentials** for repository access
- **Environment variables** (optional):
  - `BASE_URL`: https://www.turtlemintinsurance.com/
  - `PINCODES`: 400001,110001,560001

### 6. Excel File Location
The pipeline expects the Excel file at:
```
../Turtlemint_Old_Test_Cases_Updated_Format.xlsx
```
**Options:**
1. Place file in Jenkins workspace parent directory
2. Or modify Jenkinsfile to fetch from artifact repository
3. Or add as a parameter to the pipeline

## Running Locally First

```bash
# Clone repo
git clone <repo-url>
cd turtlemint-automation

# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps chromium firefox webkit

# Parse Excel & generate tests
node parse-excel.js
node generate-tests.js

# Run tests locally
npm run test:headed    # Debug mode
npm run test:smoke     # Quick smoke tests
npm run test:ci        # Full CI run

# View reports
npm run report:html    # Playwright HTML
npm run report:allure  # Allure report
```

## Jenkins Pipeline Stages

| Stage | Description |
|-------|-------------|
| Checkout | Clone repository |
| Setup | Verify Node.js & Playwright versions |
| Install Dependencies | `npm ci` |
| Install Playwright Browsers | Download browser binaries |
| Lint | ESLint check |
| Type Check | TypeScript compilation check |
| Generate Tests | Parse Excel → generate test files |
| Run Tests | Execute all 3085 tests (5 browsers) |
| Generate Reports | Allure + Playwright HTML reports |

## Reports in Jenkins

After build completes:
- **Allure Report**: Available via Jenkins Allure plugin
- **Playwright HTML**: Archived as artifact
- **JSON Results**: `test-results/results.json`
- **Screenshots/Videos**: On failure (archived)

## Troubleshooting

### Browser Installation Issues
```bash
# On Linux agents, ensure system dependencies
npx playwright install-deps chromium firefox webkit
```

### Memory Issues
```bash
# Increase Node.js memory
export NODE_OPTIONS='--max-old-space-size=8192'
```

### Test Timeout
Increase in `playwright.config.ts`:
```typescript
timeout: 120000,  // 2 minutes per test
```

## Next Steps

1. **Update selectors** in `src/config/constants.ts` with actual website selectors
2. **Commit & push** to Git
3. **Trigger Jenkins build**
4. **Monitor Allure trends** for flaky tests