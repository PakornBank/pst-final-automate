import type { Page } from '@playwright/test';
import { BasePage } from './basePage';
import {
  AvailabilityPage,
  CancelReservationPage,
  ConfirmationPage,
  CustomerDashboardPage,
  ModifyReservationPage,
  MyReservationsPage,
  ReservationFormPage
} from './customerPages';
import { AdminDashboardPage, AdminReservationsPage, ReportsPage, SettingsPage } from './adminPages';
import { StaffDashboardPage, StaffReservationsPage, TableStatusPage, WalkInBookingPage } from './staffPages';
import type { TestEnvConfig, UserRole } from '../support/types';

export class ReservationApp {
  readonly shell: BasePage;
  readonly customerDashboard: CustomerDashboardPage;
  readonly availability: AvailabilityPage;
  readonly reservationForm: ReservationFormPage;
  readonly confirmation: ConfirmationPage;
  readonly myReservations: MyReservationsPage;
  readonly modifyReservation: ModifyReservationPage;
  readonly cancelReservation: CancelReservationPage;
  readonly staffDashboard: StaffDashboardPage;
  readonly staffReservations: StaffReservationsPage;
  readonly walkInBooking: WalkInBookingPage;
  readonly tableStatus: TableStatusPage;
  readonly adminDashboard: AdminDashboardPage;
  readonly adminReservations: AdminReservationsPage;
  readonly reports: ReportsPage;
  readonly settings: SettingsPage;

  constructor(
    page: Page,
    env: TestEnvConfig
  ) {
    this.shell = new BasePage(page, env);
    this.customerDashboard = new CustomerDashboardPage(page, env);
    this.availability = new AvailabilityPage(page, env);
    this.reservationForm = new ReservationFormPage(page, env);
    this.confirmation = new ConfirmationPage(page, env);
    this.myReservations = new MyReservationsPage(page, env);
    this.modifyReservation = new ModifyReservationPage(page, env);
    this.cancelReservation = new CancelReservationPage(page, env);
    this.staffDashboard = new StaffDashboardPage(page, env);
    this.staffReservations = new StaffReservationsPage(page, env);
    this.walkInBooking = new WalkInBookingPage(page, env);
    this.tableStatus = new TableStatusPage(page, env);
    this.adminDashboard = new AdminDashboardPage(page, env);
    this.adminReservations = new AdminReservationsPage(page, env);
    this.reports = new ReportsPage(page, env);
    this.settings = new SettingsPage(page, env);
  }

  async goto(): Promise<void> {
    await this.shell.goto();
  }

  async switchRole(role: UserRole): Promise<void> {
    await this.shell.switchRole(role);
  }
}
