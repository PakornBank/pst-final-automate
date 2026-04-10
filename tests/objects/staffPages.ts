import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import type { TableOperationalStatus, TestEnvConfig, WalkInBookingInput } from '../support/types';

export class StaffDashboardPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Staff Dashboard');
    await this.expectStoryPill('US-08 Staff Dashboard');
  }

  async expectNotifications(labels: string[]): Promise<void> {
    const card = this.page.locator('.card').filter({ hasText: 'Notifications (FR-08)' });
    for (const label of labels) {
      await expect(card).toContainText(label);
    }
  }

  async expectQuickActions(labels: string[]): Promise<void> {
    const card = this.page.locator('.card').filter({ hasText: 'Quick actions' });
    for (const label of labels) {
      await expect(card).toContainText(label);
    }
  }

  async openAllReservations(): Promise<void> {
    await this.page.getByRole('button', { name: /View all reservations/i }).click();
  }

  async openWalkInBooking(): Promise<void> {
    await this.page.getByRole('button', { name: /Add walk-in reservation/i }).click();
  }

  async openTableStatus(): Promise<void> {
    await this.page.getByRole('button', { name: /Update table status/i }).click();
  }
}

export class StaffReservationsPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('All Reservations');
    await this.expectStoryPill('US-08 All Reservations (Staff)');
  }

  async expectRow(id: string, customer: string, status: string): Promise<void> {
    const row = this.page.locator('tbody tr').filter({ hasText: id });
    await expect(row).toContainText(customer);
    await expect(row).toContainText(status);
  }
}

export class WalkInBookingPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Walk-in Booking');
    await this.expectStoryPill('US-09 Walk-in Reservation (FR-11)');
    await expect(this.page.locator('.highlight-box')).toContainText('without prior account registration');
  }

  async fillWalkInBooking(input: WalkInBookingInput): Promise<void> {
    const textboxes = this.page.locator('input[type="text"]');
    await textboxes.nth(0).fill(input.customerName);
    await textboxes.nth(1).fill(input.phone ?? '');
    await this.page.locator('input[type="date"]').fill(input.date);
    await this.page.locator('input[type="time"]').fill(input.time);
    await this.page.locator('input[type="number"]').fill(String(input.guests));
    const selectedLabel = await this.page
      .locator('select option')
      .filter({ hasText: input.table })
      .first()
      .textContent();
    if (!selectedLabel) {
      throw new Error(`Unable to find walk-in table option for ${input.table}`);
    }
    await this.page.locator('select').selectOption({ label: selectedLabel });
  }

  async expectPhoneOptional(): Promise<void> {
    await expect(this.page.locator('label').filter({ hasText: 'Phone (optional)' })).toBeVisible();
  }

  async expectTableOptions(labels: string[]): Promise<void> {
    const select = this.page.locator('select');
    for (const label of labels) {
      await expect(select.locator('option').filter({ hasText: label })).toHaveCount(1);
    }
  }

  async expectBookingInput(input: WalkInBookingInput): Promise<void> {
    const textboxes = this.page.locator('input[type="text"]');
    await expect(textboxes.nth(0)).toHaveValue(input.customerName);
    await expect(textboxes.nth(1)).toHaveValue(input.phone ?? '');
    await expect(this.page.locator('input[type="date"]')).toHaveValue(input.date);
    await expect(this.page.locator('input[type="time"]')).toHaveValue(input.time);
    await expect(this.page.locator('input[type="number"]')).toHaveValue(String(input.guests));
  }

  async createWalkInReservation(): Promise<void> {
    await this.page.getByRole('button', { name: /Create Walk-in Reservation/i }).click();
  }
}

export class TableStatusPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Table Status');
    await this.expectStoryPill('US-10 Table Status (FR-09)');
  }

  rowByTable(tableId: string): Locator {
    return this.page.locator('tbody tr').filter({ hasText: tableId });
  }

  async expectStatusOptions(tableId: string, options: TableOperationalStatus[]): Promise<void> {
    const row = this.rowByTable(tableId);
    const select = row.locator('select');
    for (const option of options) {
      await expect(select.locator('option').filter({ hasText: option })).toHaveCount(1);
    }
  }

  async expectCurrentStatus(tableId: string, status: TableOperationalStatus): Promise<void> {
    await expect(this.rowByTable(tableId)).toContainText(status);
  }

  async updateStatus(tableId: string, status: TableOperationalStatus): Promise<void> {
    await this.rowByTable(tableId).locator('select').selectOption(status);
  }

  async saveChanges(): Promise<void> {
    await this.page.getByRole('button', { name: /Save Status Changes/i }).click();
  }
}
