
import { UserRole } from './types';

export const ROLES: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.DOCTOR]: 'Doctor',
  [UserRole.PATIENT]: 'Patient',
};

export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PATIENT_DASHBOARD: '/patient/dashboard',
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
};
