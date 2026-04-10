import { test as base } from '@playwright/test';
import { ReservationApp } from '../objects/reservationApp';
import { getEnvConfig } from './config';
import { installFixedClock } from './mockTime';
import type { TestEnvConfig } from './types';

type ReservationFixtures = {
  env: TestEnvConfig;
  app: ReservationApp;
};

export const test = base.extend<ReservationFixtures>({
  env: [async ({}, use) => {
    await use(getEnvConfig());
  }, { scope: 'worker' }],

  page: async ({ page, env }, use) => {
    await installFixedClock(page, env.fixedDate);
    await use(page);
  },

  app: async ({ page, env }, use) => {
    const app = new ReservationApp(page, env);
    await app.goto();
    await use(app);
  }
});

export { expect } from '@playwright/test';
