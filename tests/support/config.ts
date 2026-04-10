import type { TestEnvConfig } from './types';

const DEFAULT_BASE_URL = 'http://127.0.0.1:4173/index.html';
const DEFAULT_TIMEZONE = 'Asia/Bangkok';
const DEFAULT_FIXED_DATE = '2026-04-10T09:00:00+07:00';

export function getEnvConfig(): TestEnvConfig {
  return {
    baseUrl: process.env.TEST_BASE_URL ?? DEFAULT_BASE_URL,
    timezone: process.env.TEST_TIMEZONE ?? DEFAULT_TIMEZONE,
    fixedDate: process.env.FIXED_DATE ?? DEFAULT_FIXED_DATE,
    headless: process.env.HEADED === '1' ? false : true
  };
}

export const envConfig = getEnvConfig();
