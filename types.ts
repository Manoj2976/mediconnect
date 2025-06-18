
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  password?: string; // Only for registration/login, not stored long-term in frontend state typically
}

export interface Patient extends User {
  role: UserRole.PATIENT;
  medicalHistory?: MedicalRecord[];
  dob?: string; // Date of Birth
  phone?: string;
  address?: string;
}

export interface Doctor extends User {
  role: UserRole.DOCTOR;
  specialization: string;
  availability?: AvailabilitySlot[];
  phone?: string;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  reason: string;
  status: 'booked' | 'completed' | 'cancelled';
}

export interface MedicalRecord {
  id: string;
  date: string;
  notes: string;
  diagnosis?: string;
  prescription?: string;
  appointmentId: string;
}

export interface AvailabilitySlot {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  isBooked?: boolean; // simple flag for UI
}

export type AppUser = Patient | Doctor | Admin | null;

