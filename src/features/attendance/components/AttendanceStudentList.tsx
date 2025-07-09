import type { AttendanceStudentListProps } from "../types/student";
import AttendanceStudentRow from "./AttendanceStudentRow";

export default function AttendanceStudentList({
  students,
  attendanceRecords,
  onStatusChange,
  onNoteChange,
}: AttendanceStudentListProps) {
  return (
    <div>
      {students.map((student) => (
        <AttendanceStudentRow
          key={student._id}
          student={student}
          record={attendanceRecords[student._id]}
          onStatusChange={onStatusChange}
          onNoteChange={onNoteChange}
        />
      ))}
    </div>
  );
}
