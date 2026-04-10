import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import type {
  ReservationExpectation,
  ReservationInput,
  TableExpectation,
  TestEnvConfig
} from '../support/types';

export class CustomerDashboardPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Dashboard');
    await this.expectStoryPill('US-01 View Dashboard');
  }

  async expectStats(stats: Record<string, string>): Promise<void> {
    for (const [label, value] of Object.entries(stats)) {
      const stat = this.page.locator('.stat').filter({ hasText: label });
      await expect(stat).toContainText(value);
    }
  }

  async expectUpcomingReservation(details: ReservationExpectation['summaryFields']): Promise<void> {
    const table = this.page.locator('.card').filter({ hasText: 'Upcoming reservation' });
    await expect(table).toContainText(details.date);
    await expect(table).toContainText(details.time);
    await expect(table).toContainText(details.guests);
    await expect(table).toContainText(details.table);
  }

  async goToAvailability(): Promise<void> {
    await this.page.getByRole('button', { name: /Check Availability/i }).first().click();
  }

  async goToMyReservations(): Promise<void> {
    await this.page.getByRole('button', { name: /View All Reservations/i }).click();
  }
}

export class AvailabilityPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Check Availability');
    await this.expectStoryPill('US-02 Check Availability');
  }

  async searchAvailability(input: Pick<ReservationInput, 'date' | 'time' | 'guests'>): Promise<void> {
    await this.page.locator('input[type="date"]').fill(input.date);
    await this.page.locator('input[type="time"]').fill(input.time);
    await this.page.locator('input[type="number"]').fill(String(input.guests));
    await this.page.getByRole('button', { name: /Search/i }).click();
  }

  async expectResultSummary(date: string, time: string, guests: number): Promise<void> {
    await expect(this.page.locator('#avail-result')).toContainText(`${date} at ${time} for ${guests} guests`);
  }

  async expectTables(expectedTables: TableExpectation[]): Promise<void> {
    for (const table of expectedTables) {
      const card = this.page.locator('.table-card').filter({ hasText: table.tableId });
      await expect(card).toContainText(`${table.capacity} pax`);
      await expect(card).toContainText(table.status);
      if (table.selectable) {
        await expect(card).not.toHaveCSS('cursor', 'not-allowed');
      } else {
        await expect(card).toHaveCSS('cursor', 'not-allowed');
      }
    }
  }

  async proceedToBook(): Promise<void> {
    await this.page.getByRole('button', { name: /Proceed to Book/i }).click();
  }
}

export class ReservationFormPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Make Reservation');
    await this.expectStoryPill('US-03 Make Reservation');
  }

  async expectValidationRules(): Promise<void> {
    const rulesBox = this.page.locator('.card').filter({ hasText: 'Validation rules (FR-04)' });
    await expect(rulesBox).toContainText('future date only');
    await expect(rulesBox).toContainText('within operating hours');
    await expect(rulesBox).toContainText('guest count ≤ table capacity');
    await expect(rulesBox).toContainText('table must be available');
  }

  async expectPrefilled(input: ReservationInput): Promise<void> {
    await expect(this.page.locator('input[type="date"]')).toHaveValue(input.date);
    await expect(this.page.locator('input[type="time"]')).toHaveValue(input.time);
    await expect(this.page.locator('input[type="number"]')).toHaveValue(String(input.guests));
    await expect(this.page.locator('select')).toHaveValue(new RegExp(input.table));
  }

  async fillReservation(input: ReservationInput): Promise<void> {
    await this.page.locator('input[type="date"]').fill(input.date);
    await this.page.locator('input[type="time"]').fill(input.time);
    await this.page.locator('input[type="number"]').fill(String(input.guests));
    const selectedLabel = await this.page
      .locator('select option')
      .filter({ hasText: input.table })
      .first()
      .textContent();
    if (!selectedLabel) {
      throw new Error(`Unable to find table option for ${input.table}`);
    }
    await this.page.locator('select').selectOption({ label: selectedLabel });
    if (input.specialRequest !== undefined) {
      await this.page.locator('textarea').fill(input.specialRequest);
    }
  }

  async confirmReservation(): Promise<void> {
    await this.page.getByRole('button', { name: /Confirm Reservation/i }).click();
  }
}

export class ConfirmationPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Booking Confirmed');
    await this.expectStoryPill('US-04 Confirmation');
  }

  async expectConfirmation(expectation: ReservationExpectation): Promise<void> {
    const card = this.page.locator('.confirm-card');
    await expect(card).toContainText(expectation.id);
    await expect(card).toContainText(expectation.status);
    await expect(card).toContainText(expectation.summaryFields.date);
    await expect(card).toContainText(expectation.summaryFields.time);
    await expect(card).toContainText(expectation.summaryFields.guests);
    await expect(card).toContainText(expectation.summaryFields.table);
    if (expectation.summaryFields.request) {
      await expect(card).toContainText(expectation.summaryFields.request);
    }
  }

  async expectPersistenceMessage(): Promise<void> {
    await expect(this.page.locator('.highlight-box')).toContainText('Reservation stored in database');
    await expect(this.page.locator('.highlight-box')).toContainText('Staff dashboard notified');
  }

  async viewMyReservations(): Promise<void> {
    await this.page.getByRole('button', { name: /View My Reservations/i }).click();
  }
}

export class MyReservationsPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('My Reservations');
    await this.expectStoryPill('US-05 My Reservations');
  }

  rowById(id: string): Locator {
    return this.page.locator('tbody tr').filter({ hasText: id });
  }

  async expectReservation(expectation: ReservationExpectation): Promise<void> {
    const row = this.rowById(expectation.id.replace('RES-', ''));
    await expect(row).toContainText(expectation.summaryFields.date);
    await expect(row).toContainText(expectation.summaryFields.time);
    await expect(row).toContainText(expectation.summaryFields.guests);
    await expect(row).toContainText(expectation.status);
    for (const action of expectation.visibleActions) {
      await expect(row.getByRole('button', { name: action })).toBeVisible();
    }
  }

  async expectNoActions(id: string): Promise<void> {
    const row = this.rowById(id);
    await expect(row).toContainText('—');
  }

  async openModify(id: string): Promise<void> {
    await this.rowById(id).getByRole('button', { name: 'Modify' }).click();
  }

  async openCancel(id: string): Promise<void> {
    await this.rowById(id).getByRole('button', { name: 'Cancel' }).click();
  }
}

export class ModifyReservationPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Modify Reservation');
    await this.expectStoryPill('US-06 Modify Reservation');
    await expect(this.page.locator('.highlight-box')).toContainText('Modification allowed only before reservation time');
  }

  async expectPrefilled(input: ReservationInput): Promise<void> {
    await expect(this.page.locator('input[type="date"]')).toHaveValue(input.date);
    await expect(this.page.locator('input[type="time"]')).toHaveValue(input.time);
    await expect(this.page.locator('input[type="number"]')).toHaveValue(String(input.guests));
    await expect(this.page.locator('select')).toHaveValue(new RegExp(input.table));
    if (input.specialRequest) {
      await expect(this.page.locator('textarea')).toHaveValue(input.specialRequest);
    }
  }

  async saveChanges(): Promise<void> {
    await this.page.getByRole('button', { name: /Save Changes/i }).click();
  }

  async discardChanges(): Promise<void> {
    await this.page.getByRole('button', { name: /Discard/i }).click();
  }

  async updateReservation(input: ReservationInput): Promise<void> {
    await this.page.locator('input[type="date"]').fill(input.date);
    await this.page.locator('input[type="time"]').fill(input.time);
    await this.page.locator('input[type="number"]').fill(String(input.guests));
    const selectedLabel = await this.page
      .locator('select option')
      .filter({ hasText: input.table })
      .first()
      .textContent();
    if (!selectedLabel) {
      throw new Error(`Unable to find reservation option for ${input.table}`);
    }
    await this.page.locator('select').selectOption({ label: selectedLabel });
    await this.page.locator('textarea').fill(input.specialRequest ?? '');
  }
}

export class CancelReservationPage extends BasePage {
  constructor(page: Page, env: TestEnvConfig) {
    super(page, env);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPageTitle('Cancel Reservation');
    await this.expectStoryPill('US-07 Cancel Reservation');
  }

  async expectCancellationPolicy(): Promise<void> {
    await expect(this.page.getByText('Must be at least 1 hour before reservation time')).toBeVisible();
    await expect(this.page.locator('.highlight-box')).toContainText('table availability updates automatically');
    await expect(this.page.locator('.highlight-box')).toContainText('Staff notified via dashboard');
  }

  async confirmCancellation(): Promise<void> {
    await this.page.getByRole('button', { name: /Confirm Cancellation/i }).click();
  }

  async keepReservation(): Promise<void> {
    await this.page.getByRole('button', { name: /Keep Reservation/i }).click();
  }
}
