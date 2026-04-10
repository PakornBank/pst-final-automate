import { defineConfig } from '@playwright/test';
import { envConfig } from './tests/support/config';

export default defineConfig({
  testDir: './tests/scenarios',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: envConfig.baseUrl,
    browserName: 'chromium',
    headless: envConfig.headless,
    timezoneId: envConfig.timezone,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 960 }
  },
  webServer: {
    command: 'python3 -m http.server 4173 -d ./mock-ui',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
