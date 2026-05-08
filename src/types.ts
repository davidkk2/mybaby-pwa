// Central type definitions for MyBaby
// Single source of truth for all profile and visit data structures

export interface ProfileData {
  status: 'pregnant' | 'born' | 'trying' | null;
  primaryGoal: 'baby_focus' | 'mom_focus' | 'medical_focus' | 'ttc_focus' | null;
  firstChild: boolean | null;
  tryDuration: string;
  calcMethod: 'last_period' | 'conception_date' | 'know_weeks' | 'due_date' | null;
  lastPeriodDate?: string;
  cycleLength?: number;
  conceptionDate?: string;
  knownWeeks?: number;
  knownDays?: number;
  dueDate?: string;
  birthDate?: string;
  adjustedLmpDate?: string;
  nextPeriodDate?: string;
  ovulationDate?: string;
  calculatedWeeks: number;
  calculatedDays: number;
  weeks?: number;
  age: string;
  weight: string;
  height: string;
  prePregnancyWeight?: string;
  isWorking: boolean | null;
  workStart: string;
  workEnd: string;
  bloodType?: string;
  doctorName?: string;
  hospitalName?: string;
  sleepHours?: string;
  nextAppointmentDate?: string;
  nextAppointmentTime?: string;
}

export interface Visit {
  id: string;
  date: string;
  week: number;
  actualSize: string;
  medications: string;
  notes: string;
}
