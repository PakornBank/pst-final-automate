import type { TableExpectation, TableOperationalStatus } from '../support/types';

export const availabilityTables: TableExpectation[] = [
  { tableId: 'T-02', capacity: 4, status: 'Available', selectable: true },
  { tableId: 'T-03', capacity: 6, status: 'Available', selectable: true },
  { tableId: 'T-05', capacity: 8, status: 'Available', selectable: true },
  { tableId: 'T-01', capacity: 2, status: 'Too small', selectable: false }
];

export const walkInTableOptions = [
  'T-02 — 4 pax (available)',
  'T-04 — 4 pax (available)'
];

export const tableStatusOptions: TableOperationalStatus[] = [
  'Available',
  'Occupied',
  'Out of Service'
];
