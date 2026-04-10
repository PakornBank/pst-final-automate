import type { UserIdentity, UserRole } from '../support/types';

export const users: Record<UserRole, UserIdentity> = {
  customer: {
    name: 'John Smith',
    roleLabel: 'Customer',
    avatar: 'JS'
  },
  staff: {
    name: 'Sara Lee',
    roleLabel: 'Staff',
    avatar: 'SL'
  },
  admin: {
    name: 'Admin User',
    roleLabel: 'Admin',
    avatar: 'AU'
  }
};
