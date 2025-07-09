export interface Cohort {
  _id: string;
  name: string;
  code: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isArchived: boolean;
}

export interface AttendanceSelectorProps {
  cohorts: Cohort[];
  selectedCohortId: string;
  selectedDate: string;
  loadingCohorts: boolean;
  loadingStudents: boolean;
  error: string | null;
  onCohortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadStudents: () => void;
}
