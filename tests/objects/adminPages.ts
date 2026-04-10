import { expect, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import type { TestEnvConfig } from '../support/types';

export class AdminDashboardPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Admin Dashboard');
    await this.expectStoryPill('US-11 Admin Dashboard');
  }

  async openAllReservations(): Promise<void> {
    await this.page.getByRole('button', { name: /View all reservations/i }).click();
  }

  async openReports(): Promise<void> {
    await this.page.getByRole('button', { name: /Generate reports/i }).click();
  }

  async openSettings(): Promise<void> {
    await this.page.getByRole('button', { name: /System settings/i }).click();
  }
}

export class AdminReservationsPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('All Reservations');
    await this.expectStoryPill('All Reservations (Admin — GET /admin/reservations)');
  }

  async expectRow(id: string, customer: string, status: string): Promise<void> {
    const row = this.page.locator('tbody tr').filter({ hasText: id });
    await expect(row).toContainText(customer);
    await expect(row).toContainText(status);
  }
}

export class ReportsPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Reports & Statistics');
    await this.expectStoryPill('US-12 Reports & Statistics');
    await expect(this.page.locator('.card').filter({ hasText: 'Reservations by status' })).toContainText('CONFIRMED');
    await expect(this.page.locator('.card').filter({ hasText: 'Peak hours' })).toContainText('18:00–19:00');
  }
}

export class SettingsPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('System Settings');
    await this.expectStoryPill('US-13 Restaurant Settings (FR-12)');
    await expect(this.page.locator('.card').filter({ hasText: 'FR-12 — Restaurant profile' })).toBeVisible();
    await expect(this.page.locator('input[type="text"]').nth(0)).toHaveValue('TableReserve Restaurant');
    await expect(this.page.locator('input[type="text"]').nth(1)).toHaveValue('02-123-4567');
    await expect(this.page.locator('textarea')).toHaveValue('123 Main Street, Bangkok 10110');
  }
}
