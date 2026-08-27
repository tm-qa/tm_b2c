import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomHtmlReporter implements Reporter {
  private results: Array<{
    test: string;
    status: string;
    duration: number;
    error?: string;
    tags?: string[];
  }> = [];
  private startTime: number = Date.now();

  onBegin(config: FullConfig, suite: Suite) {
    console.log('��� Custom HTML Reporter started');
  }

  onTestBegin(test: TestCase) {
    // Test started
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const tags = test.tags || [];
    this.results.push({
      test: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      tags,
    });
  }

  onEnd(result: FullResult) {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;
    
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;
    const total = this.results.length;

    const html = this.generateHtmlReport({
      passed,
      failed,
      skipped,
      total,
      duration: totalDuration,
      startTime: this.startTime,
      endTime,
      results: this.results,
    });

    const reportDir = path.join(process.cwd(), 'playwright-report', 'custom');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(path.join(reportDir, 'summary.html'), html);
    console.log(`��� Custom HTML report generated: ${reportDir}/summary.html`);
  }

  private generateHtmlReport(data: any): string {
    const { passed, failed, skipped, total, duration, startTime, endTime, results } = data;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    const durationMinutes = (duration / 60000).toFixed(1);

    const statusColors = {
      passed: '#28a745',
      failed: '#dc3545',
      skipped: '#ffc107',
      timedOut: '#fd7e14',
    };

    const rows = results.map((r: any) => `
      <tr>
        <td>${this.escapeHtml(r.test)}</td>
        <td><span class="status-badge" style="background-color: ${statusColors[r.status as keyof typeof statusColors] || '#6c757d'}">${r.status}</span></td>
        <td>${(r.duration / 1000).toFixed(2)}s</td>
        <td>${r.tags?.join(', ') || '-'}</td>
        <td>${r.error ? `<pre class="error">${this.escapeHtml(r.error)}</pre>` : '-'}</td>
      </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Turtlemint Test Execution Summary</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%); color: white; padding: 30px; }
    .header h1 { font-size: 28px; margin-bottom: 10px; }
    .header p { opacity: 0.9; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; padding: 30px; }
    .stat-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    .stat-value { font-size: 36px; font-weight: bold; line-height: 1; }
    .stat-label { font-size: 14px; color: #666; margin-top: 8px; }
    .stat-passed .stat-value { color: #28a745; }
    .stat-failed .stat-value { color: #dc3545; }
    .stat-skipped .stat-value { color: #ffc107; }
    .stat-total .stat-value { color: #1a73e8; }
    .table-container { padding: 0 30px 30px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; font-weight: 600; color: #333; }
    tr:hover { background: #f8f9fa; }
    .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: white; }
    .error { background: #fff5f5; color: #dc3545; padding: 10px; border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto; white-space: pre-wrap; }
    .footer { padding: 20px 30px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
    @media (max-width: 768px) {
      .header { padding: 20px; }
      .stats { padding: 20px; }
      .table-container { padding: 0 15px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>��� Turtlemint Test Execution Summary</h1>
      <p>Generated on ${new Date(endTime).toLocaleString()}</p>
    </div>
    
    <div class="stats">
      <div class="stat-card stat-total">
        <div class="stat-value">${total}</div>
        <div class="stat-label">Total Tests</div>
      </div>
      <div class="stat-card stat-passed">
        <div class="stat-value">${passed}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat-card stat-failed">
        <div class="stat-value">${failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-card stat-skipped">
        <div class="stat-value">${skipped}</div>
        <div class="stat-label">Skipped</div>
      </div>
      <div class="stat-card stat-total">
        <div class="stat-value">${passRate}%</div>
        <div class="stat-label">Pass Rate</div>
      </div>
      <div class="stat-card stat-total">
        <div class="stat-value">${durationMinutes}m</div>
        <div class="stat-label">Duration</div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Test Case</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Tags</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <p>Framework: Playwright + TypeScript | Environment: ${process.env.BASE_URL || 'Production'} | CI: ${process.env.CI ? 'Yes' : 'No'}</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, '&#039;');
  }
}

export default CustomHtmlReporter;