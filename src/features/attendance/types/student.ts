export interface Student {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  cohortId: string;
}
