import type { ReservationExpectation, ReservationInput } from '../support/types';

export const availabilitySearch = {
  date: '2026-05-20',
  time: '18:00',
  guests: 4
} as const;

export const reservationInput: ReservationInput = {
  date: '2026-05-20',
  time: '18:00',
  guests: 4,
  table: 'T-03',
  specialRequest: 'Window seat'
};

export const dashboardUpcomingReservation: ReservationExpectation = {
  id: '#5001',
  status: 'CONFIRMED',
  visibleActions: [],
  summaryFields: {
    date: '2026-05-20',
    time: '18:00',
    guests: '4',
    table: 'T-03 (6 pax)'
  }
};

export const confirmationReservation: ReservationExpectation = {
  id: '#RES-5002',
  status: 'CONFIRMED',
  visibleActions: ['View My Reservations'],
  summaryFields: {
    date: '2026-05-20',
    time: '18:00',
    guests: '4',
    table: 'T-03 (6 pax)',
    request: 'Window seat'
  }
};

export const createdReservationRow: ReservationExpectation = {
  id: '#5002',
  status: 'CONFIRMED',
  visibleActions: ['Modify', 'Cancel'],
  summaryFields: {
    date: '2026-05-20',
    time: '18:00',
    guests: '4',
    table: 'T-03'
  }
};

export const modifiedReservationInput: ReservationInput = {
  date: '2026-05-21',
  time: '19:30',
  guests: 2,
  table: 'T-02',
  specialRequest: 'Birthday cake'
};

export const discardedReservationInput: ReservationInput = {
  date: '2026-05-22',
  time: '20:00',
  guests: 4,
  table: 'T-03',
  specialRequest: 'Quiet corner'
};

export const modifiedReservationRow: ReservationExpectation = {
  id: '#5001',
  status: 'CONFIRMED',
  visibleActions: ['Modify', 'Cancel'],
  summaryFields: {
    date: '2026-05-21',
    time: '19:30',
    guests: '2',
    table: 'T-02'
  }
};

export const cancelledReservationRow: ReservationExpectation = {
  id: '#5001',
  status: 'CANCELLED',
  visibleActions: [],
  summaryFields: {
    date: '2026-05-20',
    time: '18:00',
    guests: '4',
    table: 'T-03'
  }
};

export const myReservationRows: ReservationExpectation[] = [
  {
    id: '#5001',
    status: 'CONFIRMED',
    visibleActions: ['Modify', 'Cancel'],
    summaryFields: {
      date: '2026-05-20',
      time: '18:00',
      guests: '4',
      table: 'T-03'
    }
  },
  {
    id: '#4988',
    status: 'PENDING',
    visibleActions: ['Modify', 'Cancel'],
    summaryFields: {
      date: '2026-04-10',
      time: '19:00',
      guests: '2',
      table: 'T-01'
    }
  },
  {
    id: '#4812',
    status: 'CANCELLED',
    visibleActions: [],
    summaryFields: {
      date: '2026-03-15',
      time: '12:00',
      guests: '6',
      table: 'T-05'
    }
  }
];
