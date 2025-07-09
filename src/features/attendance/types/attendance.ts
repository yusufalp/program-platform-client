import type { AttendanceStatus } from "../../../constants/attendanceStatuses";

export type AttendanceRecord = {
  studentId: string;
  status: AttendanceStatus;
  note?: string;
};

export interface Attendance {
  _id: string;
  cohortId: string;
  date: string;
  takenBy: string;
  records: AttendanceRecord[];
}
