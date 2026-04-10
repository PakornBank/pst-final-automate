import { expect, test } from '../support/fixtures';
import {
  availabilitySearch,
  cancelledReservationRow,
  confirmationReservation,
  createdReservationRow,
  dashboardUpcomingReservation,
  discardedReservationInput,
  modifiedReservationInput,
  modifiedReservationRow,
  myReservationRows,
  reservationInput
} from '../data/reservations';
import { availabilityTables } from '../data/tables';
import { users } from '../data/users';

test.describe('Customer reservation automation', () => {
  test('TC01 dashboard shows identity, stats, and upcoming reservation', async ({ app }) => {
    await app.customerDashboard.expectLoaded();
    await app.shell.expectPageSubtitle('Restaurant Table Reservation System');
    await app.shell.expectUserIdentity(
      users.customer.name,
      users.customer.roleLabel,
      users.customer.avatar
    );
    await app.customerDashboard.expectStats({
      'My reservations': '3',
      Upcoming: '1',
      Cancelled: '1'
    });
    await app.customerDashboard.expectUpcomingReservation(dashboardUpcomingReservation.summaryFields);
  });

  test('TC02 availability search returns suitable tables and blocks undersized table', async ({ app }) => {
    await app.customerDashboard.goToAvailability();
    await app.availability.expectLoaded();
    await app.availability.searchAvailability(availabilitySearch);
    await app.availability.expectResultSummary(
      availabilitySearch.date,
      availabilitySearch.time,
      availabilitySearch.guests
    );
    await app.availability.expectTables(availabilityTables);
  });

  test('TC03 reservation happy path reaches confirmation with expected summary', async ({ app }) => {
    await app.customerDashboard.goToAvailability();
    await app.availability.searchAvailability(availabilitySearch);
    await app.availability.proceedToBook();
    await app.reservationForm.expectLoaded();
    await app.reservationForm.expectValidationRules();
    await app.reservationForm.fillReservation(reservationInput);
    await app.reservationForm.confirmReservation();
    await app.confirmation.expectLoaded();
    await app.confirmation.expectConfirmation(confirmationReservation);
    await app.confirmation.expectPersistenceMessage();
    await app.confirmation.viewMyReservations();
    await app.myReservations.expectLoaded();
    await app.myReservations.expectReservation(createdReservationRow);
  });

  test('TC04 my reservations shows statuses and action availability by row', async ({ app }) => {
    await app.customerDashboard.goToMyReservations();
    await app.myReservations.expectLoaded();
    await app.myReservations.expectReservation(myReservationRows[0]);
    await app.myReservations.expectReservation(myReservationRows[1]);
    await app.myReservations.expectReservation(myReservationRows[2]);
    await app.myReservations.expectNoActions('#4812');
  });

  test('TC05 modify flow opens prefilled reservation and supports save/discard navigation', async ({ app }) => {
    await app.customerDashboard.goToMyReservations();
    await app.myReservations.openModify('#5001');
    await app.modifyReservation.expectLoaded();
    await app.modifyReservation.expectPrefilled(reservationInput);
    await app.modifyReservation.updateReservation(modifiedReservationInput);
    await app.modifyReservation.saveChanges();
    await app.myReservations.expectLoaded();
    await app.myReservations.expectReservation(modifiedReservationRow);
    await app.myReservations.openModify('#5001');
    await app.modifyReservation.expectPrefilled(modifiedReservationInput);
    await app.modifyReservation.updateReservation(discardedReservationInput);
    await app.modifyReservation.discardChanges();
    await app.myReservations.expectLoaded();
    await app.myReservations.openModify('#5001');
    await app.modifyReservation.expectPrefilled(modifiedReservationInput);
  });

  test('TC06 cancel flow shows cutoff policy and returns to reservation list', async ({ app }) => {
    await app.customerDashboard.goToMyReservations();
    await app.myReservations.openCancel('#5001');
    await app.cancelReservation.expectLoaded();
    await app.cancelReservation.expectCancellationPolicy();
    await app.cancelReservation.keepReservation();
    await app.myReservations.expectLoaded();
    await app.myReservations.openCancel('#5001');
    await app.cancelReservation.confirmCancellation();
    await app.myReservations.expectLoaded();
    await app.myReservations.expectReservation(cancelledReservationRow);
    await app.myReservations.expectNoActions('#5001');
  });
});
