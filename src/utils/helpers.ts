import { Page } from '@playwright/test';
import * as crypto from 'crypto';

export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateRandomEmail(): string {
  return `test_${generateRandomString(8)}@turtlemint.test`;
}

export function generateRandomPhone(): string {
  return `9${generateRandomString(9)}`;
}

export function generateRandomPincode(): string {
  const pincodes = ['400001', '110001', '560001', '400050', '110002', '700001', '600001'];
  return pincodes[Math.floor(Math.random() * pincodes.length)];
}

export function formatDate(date: Date = new Date(), format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  return fn().catch(async (error) => {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 1.5);
  });
}

export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout: number = 30000,
  interval: number = 500
): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await sleep(interval);
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}

export function hashString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex').substring(0, 16);
}

export function deepEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function flattenObject(obj: Record<string, any>, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  
  return result;
}

export function parseQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  
  return params;
}

export function buildUrl(baseUrl: string, path: string, params?: Record<string, string>): string {
  const url = new URL(path, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

export async function takeElementScreenshot(page: Page, selector: string, name: string): Promise<Buffer> {
  const element = page.locator(selector);
  return await element.screenshot({ path: `test-results/screenshots/${name}.png` });
}

export function getTestId(prefix: string = 'test'): string {
  return `${prefix}_${Date.now()}_${generateRandomString(6)}`;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function isValidPincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
}

export function sanitizeForLog(data: any): any {
  if (typeof data === 'string') {
    return data.replace(/[^\x20-\x7E]/g, '');
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitized[key] = sanitizeForLog(data[key]);
      }
    }
    return sanitized;
  }
  return data;
}