import { test } from '../support/fixtures';
import { staffNotifications, staffQuickActions } from '../data/messages';
import { tableStatusOptions, walkInTableOptions } from '../data/tables';
import { users } from '../data/users';
import { walkInBookingInput } from '../data/walkIn';

test.describe('Staff operations automation', () => {
  test.beforeEach(async ({ app }) => {
    await app.switchRole('staff');
  });

  test('TC07 staff dashboard shows notifications, quick actions, and reservation list navigation', async ({ app }) => {
    await app.staffDashboard.expectLoaded();
    await app.shell.expectUserIdentity(users.staff.name, users.staff.roleLabel, users.staff.avatar);
    await app.staffDashboard.expectNotifications(staffNotifications);
    await app.staffDashboard.expectQuickActions(staffQuickActions);
    await app.staffDashboard.openAllReservations();
    await app.staffReservations.expectLoaded();
    await app.staffReservations.expectRow('#5001', 'John Smith', 'CONFIRMED');
    await app.staffReservations.expectRow('#4999', 'Walk-in', 'WALK-IN');
  });

  test('TC08 staff walk-in booking supports required fields and optional phone', async ({ app }) => {
    await app.staffDashboard.expectLoaded();
    await app.staffDashboard.openWalkInBooking();
    await app.walkInBooking.expectLoaded();
    await app.walkInBooking.expectPhoneOptional();
    await app.walkInBooking.expectTableOptions(walkInTableOptions);
    await app.walkInBooking.fillWalkInBooking(walkInBookingInput);
    await app.walkInBooking.expectBookingInput(walkInBookingInput);
    await app.walkInBooking.createWalkInReservation();
    await app.staffReservations.expectLoaded();
    await app.staffReservations.expectRow('#5002', 'Guest Walk-in', 'WALK-IN');
  });

  test('TC09 table status screen exposes allowed statuses and save path', async ({ app }) => {
    await app.staffDashboard.expectLoaded();
    await app.staffDashboard.openTableStatus();
    await app.tableStatus.expectLoaded();
    await app.tableStatus.expectCurrentStatus('T-04', 'Out of Service');
    await app.tableStatus.expectStatusOptions('T-02', tableStatusOptions);
    await app.tableStatus.updateStatus('T-02', 'Available');
    await app.tableStatus.saveChanges();
    await app.tableStatus.expectLoaded();
    await app.tableStatus.expectCurrentStatus('T-02', 'Available');
  });
});
