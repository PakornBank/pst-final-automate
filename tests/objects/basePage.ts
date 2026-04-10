import { expect, type Locator, type Page } from '@playwright/test';
import type { TestEnvConfig, UserRole } from '../support/types';

export class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly env: TestEnvConfig
  ) {}

  async goto(): Promise<void> {
    await this.page.goto(this.env.baseUrl);
  }

  async switchRole(role: UserRole): Promise<void> {
    const label = role.charAt(0).toUpperCase() + role.slice(1);
    await this.page.getByRole('button', { name: label, exact: true }).click();
  }

  async expectPageTitle(title: string): Promise<void> {
    await expect(this.page.locator('#page-title')).toHaveText(title);
  }

  async expectPageSubtitle(subtitle: string): Promise<void> {
    await expect(this.page.locator('#page-sub')).toHaveText(subtitle);
  }

  async expectUserIdentity(name: string, roleLabel: string, avatar: string): Promise<void> {
    await expect(this.page.locator('#user-info')).toContainText(name);
    await expect(this.page.locator('#user-info')).toContainText(roleLabel);
    await expect(this.page.locator('#user-avatar')).toHaveText(avatar);
  }

  navButton(label: string): Locator {
    return this.page.locator('.nav-item').filter({ hasText: label }).first();
  }

  async navigateViaSidebar(label: string): Promise<void> {
    await this.navButton(label).click();
  }

  async expectStoryPill(label: string): Promise<void> {
    await expect(this.page.locator('.story-pill.active')).toContainText(label);
  }
}
