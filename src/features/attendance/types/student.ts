import type { AttendanceStatus } from "../../../constants/attendanceStatuses";
import type { AttendanceRecord } from "./attendance";

export interface Student {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  cohortId: string;
}

export interface AttendanceStudentListProps {
  students: Student[];
  attendanceRecords: Record<string, AttendanceRecord>;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onNoteChange: (studentId: string, note: string) => void;
}

export interface AttendanceStudentRowProps {
  student: Student;
  record: AttendanceRecord;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onNoteChange: (studentId: string, note: string) => void;
}
