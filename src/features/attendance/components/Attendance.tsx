import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { today } from "../../../lib/getToday";

import type { Cohort } from "../types/cohort";
import type { Student } from "../types/student";
import type { AttendanceRecord, AttendanceStatus } from "../types/attendance";

export default function Attendance() {
  const { user, token } = useAuth();

  const [allCohorts, setAllCohorts] = useState<Cohort[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, AttendanceRecord>
  >({});
  const [attendanceId, setAttendanceId] = useState<string | null>(null);

  const [isLoadingCohorts, setIsLoadingCohorts] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);
  const [isSavingAttendance, setIsSavingAttendance] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoadingCohorts(false);
      setError("Authentication required");
      return;
    }

    const fetchAllCohorts = async () => {
      setIsLoadingCohorts(true);
      setError(null);

      const baseUrl = import.meta.env.VITE_BASE_URL as string;
      const endpoint = "/cohort";

      const url = new URL(`${baseUrl}${endpoint}`);

      const options: RequestInit = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || `Failed to retrieve cohorts: ${result.statusText}`
          );
        }

        if (result.data && Array.isArray(result.data.cohorts)) {
          setAllCohorts(result.data.cohorts || []);
        } else {
          throw new Error("Invalid data format received for cohorts");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingCohorts(false);
      }
    };

    fetchAllCohorts();
  }, [token]);

  const handleLoadStudents = useCallback(async () => {
    if (!selectedCohortId || !selectedDate || !token) {
      setError("Please select both cohort and date");
      return;
    }

    setIsLoadingStudents(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/attendance/check";

    const url = new URL(`${baseUrl}${endpoint}`);

    url.searchParams.set("cohortId", selectedCohortId);
    url.searchParams.set("date", selectedDate);

    const options: RequestInit = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const checkAttendanceResponse = await fetch(url, options);
      const checkAttendanceResult = await checkAttendanceResponse.json();

      if (!checkAttendanceResponse.ok) {
        throw new Error(checkAttendanceResult.message);
      }

      if (checkAttendanceResult.data.attendance) {
        setAttendanceId(checkAttendanceResult.data.attendance._id);
        const attendance = checkAttendanceResult.data.attendance;

        const normalizedStudents = attendance.records.map(
          (record: {
            studentId: {
              _id: string;
              userId: { _id: string; firstName: string; lastName: string };
            };
          }) => ({
            _id: record.studentId._id,
            userId: {
              _id: record.studentId.userId._id,
              firstName: record.studentId.userId.firstName,
              lastName: record.studentId.userId.lastName,
            },
          })
        );

        const normalizedRecords = attendance.records.reduce(
          (
            acc: {
              [x: string]: {
                studentId: string | number;
                status: string;
                note: string;
              };
            },
            record: {
              studentId: { _id: string | number };
              status: string;
              note: string;
            }
          ) => {
            acc[record.studentId._id] = {
              studentId: record.studentId._id,
              status: record.status,
              note: record.note,
            };
            return acc;
          },
          {}
        );

        setStudents(normalizedStudents);
        setAttendanceRecords(normalizedRecords);
      } else {
        // No attendance — load students
        setAttendanceId(null);
        const baseUrl = import.meta.env.VITE_BASE_URL as string;
        const endpoint = `/student/${selectedCohortId}`;

        const url = new URL(`${baseUrl}${endpoint}`);

        const options: RequestInit = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const studentResponse = await fetch(url, options);
        const studentResult = await studentResponse.json();

        if (!studentResponse.ok) {
          throw new Error(studentResult.message);
        }

        setStudents(studentResult.data.students);
        setAttendanceRecords(
          studentResult.data.students.reduce(
            (acc: Record<string, AttendanceRecord>, student: Student) => {
              acc[student._id] = { studentId: student._id, status: "present" };
              return acc;
            },
            {}
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingStudents(false);
    }
  }, [selectedCohortId, selectedDate, token]);

  const handleSaveAttendance = async () => {
    if (!selectedCohortId || !selectedDate || students.length === 0 || !token) {
      setError("Please load students before saving");
      return;
    }

    setIsSavingAttendance(true);
    setError(null);
    
    const records = students.map((s) => attendanceRecords[s._id]);

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = attendanceId
      ? `/attendance/update/${attendanceId}`
      : "/attendance/save";

    const url = new URL(`${baseUrl}${endpoint}`);

    const method = attendanceId ? "PATCH" : "POST";
    const options: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cohortId: selectedCohortId,
        date: selectedDate,
        takenBy: user?._id,
        records,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Attendance saved successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingAttendance(false);
    }
  };

  const handleCohortIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCohortId(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => {
      return {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          status,
          note: status === "late" ? prev[studentId]?.note || "" : undefined,
        },
      };
    });
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setAttendanceRecords((prev) => {
      return {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          note,
        },
      };
    });
  };

  return (
    <div>
      <h1>Attendance</h1>

      {isLoadingCohorts ? (
        <p>Loading cohorts...</p>
      ) : error && !allCohorts.length ? (
        <p>{error}. Please reload the page</p>
      ) : (
        <>
          <h2>Select a cohort and date</h2>
          <div className="attendance-actions">
            <label htmlFor="cohort">Cohort</label>
            <select
              name="cohort"
              id="cohort"
              value={selectedCohortId}
              onChange={handleCohortIdChange}
              disabled={isLoadingStudents}
            >
              <option value="">Select a cohort</option>
              {allCohorts.length > 0 ? (
                allCohorts.map((cohort: Cohort) => (
                  <option key={cohort._id} value={cohort._id}>
                    {cohort.name} - {cohort.code}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No cohorts available
                </option>
              )}
            </select>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={today}
              disabled={isLoadingStudents}
            />
            <button
              onClick={handleLoadStudents}
              disabled={!selectedCohortId || !selectedDate || isLoadingStudents}
            >
              {isLoadingStudents ? "Loading Students..." : "Load Students"}
            </button>
          </div>
        </>
      )}

      {isLoadingStudents ? (
        <p>Loading students and attendance...</p>
      ) : error && students.length === 0 ? (
        <p>{error}. Please reload the page</p>
      ) : students.length > 0 ? (
        <div>
          <div>
            <h2>Attendance for {selectedDate}</h2>

            {students.map((student) => {
              const currentStatus =
                attendanceRecords[student._id]?.status || "";
              return (
                <div key={student._id}>
                  <div className="attendance-list">
                    <span className="student-name">
                      {student.userId.firstName} {student.userId.lastName}
                    </span>

                    <span className="attendance-options">
                      {(
                        ["present", "absent", "late"] as AttendanceStatus[]
                      ).map((statusOption) => (
                        <label key={statusOption}>
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            value={statusOption}
                            checked={currentStatus === statusOption}
                            onChange={() =>
                              handleStatusChange(student._id, statusOption)
                            }
                          />
                          <span>{statusOption}</span>
                        </label>
                      ))}
                    </span>

                    {currentStatus === "late" && (
                      <span className="note-input">
                        <label htmlFor={`note-${student._id}`}>Note:</label>
                        <input
                          type="text"
                          name="note"
                          id={`note-${student._id}`}
                          value={attendanceRecords[student._id]?.note}
                          onChange={(e) =>
                            handleNoteChange(student._id, e.target.value)
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={handleSaveAttendance} disabled={isSavingAttendance}>
            {isSavingAttendance ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      ) : (
        <p>No students are registered for this cohort</p>
      )}
    </div>
  );
}
