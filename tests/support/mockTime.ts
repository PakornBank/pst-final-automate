import type { Page } from '@playwright/test';

export async function installFixedClock(page: Page, fixedDateIso: string): Promise<void> {
  await page.addInitScript(({ fixedDate }) => {
    const RealDate = Date;
    const fixedTimestamp = new RealDate(fixedDate).getTime();

    class MockDate extends RealDate {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedTimestamp);
          return;
        }
        super(...args);
      }

      static now(): number {
        return fixedTimestamp;
      }

      static parse(dateString: string): number {
        return RealDate.parse(dateString);
      }

      static UTC(...args: any[]): number {
        return RealDate.UTC(...args);
      }
    }

    Object.setPrototypeOf(MockDate, RealDate);

    const browserWindow = window as Window & typeof globalThis & { Date: DateConstructor };
    browserWindow.Date = MockDate as unknown as DateConstructor;
  }, { fixedDate: fixedDateIso });
}
