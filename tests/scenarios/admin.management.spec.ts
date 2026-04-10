import { test } from '../support/fixtures';
import { users } from '../data/users';

test.describe('Admin management automation', () => {
  test.beforeEach(async ({ app }) => {
    await app.switchRole('admin');
  });

  test('TC10 admin can review reservations, reports, and settings', async ({ app }) => {
    await app.adminDashboard.expectLoaded();
    await app.shell.expectUserIdentity(users.admin.name, users.admin.roleLabel, users.admin.avatar);

    await app.adminDashboard.openAllReservations();
    await app.adminReservations.expectLoaded();
    await app.adminReservations.expectRow('#5000', 'Amy Park', 'CONFIRMED');

    await app.shell.navigateViaSidebar('Reports');
    await app.reports.expectLoaded();

    await app.shell.navigateViaSidebar('Settings');
    await app.settings.expectLoaded();
  });
});
