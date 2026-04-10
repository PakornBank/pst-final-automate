export type UserRole = 'customer' | 'staff' | 'admin';
export type ReservationStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'WALK-IN';
export type TableOperationalStatus = 'Available' | 'Occupied' | 'Out of Service';

export interface ReservationInput {
  date: string;
  time: string;
  guests: number;
  table: string;
  specialRequest?: string;
}

export interface ReservationExpectation {
  id: string;
  status: ReservationStatus;
  visibleActions: string[];
  summaryFields: {
    date: string;
    time: string;
    guests: string;
    table: string;
    request?: string;
  };
}

export interface TableExpectation {
  tableId: string;
  capacity: number;
  status: string;
  selectable: boolean;
}

export interface TestEnvConfig {
  baseUrl: string;
  timezone: string;
  fixedDate: string;
  headless: boolean;
}

export interface UserIdentity {
  name: string;
  roleLabel: string;
  avatar: string;
}

export interface WalkInBookingInput {
  customerName: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  table: string;
}
