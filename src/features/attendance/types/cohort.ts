export interface Cohort {
  _id: string;
  name: string;
  code: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isArchived: boolean;
}
