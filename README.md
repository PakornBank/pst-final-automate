# Restaurant Reservation System UI Automation

This project implements the automated test part of the course assignment with Playwright and TypeScript.

## Structure

- `mock-ui/`: workspace copy of the provided restaurant reservation mock HTML
- `tests/scenarios/`: the 10 automated test cases
- `tests/objects/`: page and workflow objects
- `tests/data/`: reusable users, reservations, tables, and messages
- `tests/support/`: config, shared types, fixed-date setup, and Playwright fixtures

This suite is intentionally scoped to the provided mock UI only.

## Execution

1. Install dependencies with `npm install`
2. Install the Chromium browser with `npx playwright install chromium`
3. Run all tests with `npm test`
4. Run headed mode with `npm run test:headed`

## Automated Test Cases

| ID | Description | Preconditions | Test Steps | Expected Result |
| --- | --- | --- | --- | --- |
| TC01 | Verify customer dashboard displays correct identity, reservation summary, and upcoming booking information | Mock UI is running and Customer role is active | 1. Open the application. 2. Review dashboard header, stats, and upcoming reservation section. | Customer name, role, avatar, dashboard stats, and upcoming reservation details are displayed correctly. |
| TC02 | Verify customer can search table availability for a valid future reservation | Customer is on Dashboard page | 1. Open Check Availability. 2. Enter valid date, time, and guest count. 3. Click Search. | Available tables are shown for the requested party size and undersized table options are not selectable. |
| TC03 | Verify customer can complete reservation happy path and the new reservation is added to My Reservations | Customer is on Dashboard page | 1. Open Check Availability. 2. Search with valid booking data. 3. Proceed to booking. 4. Confirm reservation. 5. Open My Reservations. | Confirmation page shows the new reservation summary and the created reservation is listed in My Reservations. |
| TC04 | Verify My Reservations displays correct statuses and available actions for each booking | Customer is on Dashboard page | 1. Open My Reservations. 2. Review confirmed, pending, and cancelled reservation rows. | Confirmed and pending reservations show valid actions, while cancelled reservation shows no action buttons. |
| TC05 | Verify customer can modify an existing reservation and discard later unsaved changes | Customer is on My Reservations page | 1. Click Modify on an existing reservation. 2. Review prefilled fields. 3. Change reservation data and click Save Changes. 4. Reopen Modify. 5. Change values again and click Discard. 6. Reopen Modify. | Saved changes are reflected in My Reservations, while discarded changes are not persisted. |
| TC06 | Verify cancellation flow displays policy warning and updates reservation status after confirmation | Customer is on My Reservations page | 1. Click Cancel on an existing reservation. 2. Review cancellation policy. 3. Click Keep Reservation. 4. Reopen cancellation page. 5. Click Confirm Cancellation. | Cancellation page shows the 1-hour cutoff rule, and after confirmation the reservation status becomes CANCELLED with no action buttons. |
| TC07 | Verify staff dashboard shows notifications, quick actions, and reservation list navigation | Staff role is active | 1. Open Staff Dashboard. 2. Review notifications and quick actions. 3. Open All Reservations. | Staff dashboard displays FR-08 notifications and quick actions, and All Reservations opens successfully. |
| TC08 | Verify staff can create a walk-in reservation with optional phone number | Staff role is active | 1. Open Walk-in Booking. 2. Review form fields. 3. Enter customer name, phone, date, time, guests, and table. 4. Create the reservation. | Walk-in form accepts the values, keeps phone optional, and the new WALK-IN reservation appears in the staff reservation list. |
| TC09 | Verify staff can view allowed table status options and persist a table status update | Staff role is active | 1. Open Table Status. 2. Review a table row. 3. Change status value. 4. Click Save Status Changes. | Table row exposes Available, Occupied, and Out of Service options, and the updated status is displayed after saving. |
| TC10 | Verify admin can access reservation management, reports, and settings pages | Admin role is active | 1. Open Admin Dashboard. 2. Open All Reservations. 3. Open Reports. 4. Open Settings. | Admin can navigate across reservation list, reports, and settings pages, and each page shows the expected content. |

## Defaults

- `TEST_BASE_URL=http://127.0.0.1:4173/index.html`
- `TEST_TIMEZONE=Asia/Bangkok`
- `FIXED_DATE=2026-04-10T09:00:00+07:00`

The implementation is designed to run against the supplied mock UI only.
