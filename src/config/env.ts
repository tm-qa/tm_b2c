import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.string().url().default('https://www.turtlemintinsurance.com/'),
  APP_BASE_URL: z.string().url().default('https://app.turtlemintinsurance.com/'),
  PINCODES: z.string().default('400001,110001,560001'),
  CI: z.string().transform(v => v === 'true').default('false'),
  HEADLESS: z.string().transform(v => v === 'true').default('true'),
  SLOW_MO: z.string().transform(Number).default('0'),
  ACTION_TIMEOUT: z.string().transform(Number).default('15000'),
  NAVIGATION_TIMEOUT: z.string().transform(Number).default('30000'),
  RETRIES: z.string().transform(Number).default('0'),
  WORKERS: z.string().transform(Number).default('4'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('��� Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const baseURL = env.BASE_URL;
export const appBaseURL = env.APP_BASE_URL;
export const pincodes = env.PINCODES.split(',').map(p => p.trim());
export const isCI = env.CI;
export const headless = env.HEADLESS;
export const slowMo = env.SLOW_MO;
export const actionTimeout = env.ACTION_TIMEOUT;
export const navigationTimeout = env.NAVIGATION_TIMEOUT;
export const retries = env.RETRIES;
export const workers = env.WORKERS;

export const testConfig = {
  baseURL,
  pincodes,
  isCI,
  headless,
  slowMo,
  timeouts: {
    action: actionTimeout,
    navigation: navigationTimeout,
  },
  retries,
  workers,
};