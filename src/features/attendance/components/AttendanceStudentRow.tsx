import { useState } from "react";
import { ATTENDANCE_STATUSES } from "../../../constants/attendanceStatuses";
import type { AttendanceStudentRowProps } from "../types/student";

export default function AttendanceStudentRow({
  student,
  record,
  onStatusChange,
  onNoteChange,
}: AttendanceStudentRowProps) {
  const [showNoteInput, setShowNoteInput] = useState<boolean>(
    Boolean(record?.note && record?.note.length > 0)
  );

  return (
    <div className="attendance-list" key={student._id}>
      <span className="student-name">
        {student.userId.firstName} {student.userId.lastName}
      </span>
      <span className="attendance-options">
        {ATTENDANCE_STATUSES.map((statusOption) => (
          <label htmlFor="" key={statusOption}>
            <input
              type="radio"
              name={`attendance-${student._id}`}
              id=""
              value={statusOption}
              checked={record?.status === statusOption}
              onChange={() => onStatusChange(student._id, statusOption)}
            />
            <span>{statusOption}</span>
          </label>
        ))}
      </span>
      {showNoteInput ? (
        <span className="note-input">
          <label htmlFor={`note-${student._id}`}>Note:</label>
          <input
            type="text"
            name="note"
            id={`note-${student._id}`}
            value={record?.note || ""}
            onChange={(e) => onNoteChange(student._id, e.target.value)}
          />
          <button type="button" onClick={() => setShowNoteInput(false)}>
            Hide Note
          </button>
        </span>
      ) : (
        <button type="button" onClick={() => setShowNoteInput(true)}>
          Add Note
        </button>
      )}
    </div>
  );
}
