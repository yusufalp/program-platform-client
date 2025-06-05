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

  const [isLoadingCohorts, setIsLoadingCohorts] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);
  const [isSavingAttendance, setIsSavingAttendance] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCohorts = async () => {
      if (!token) {
        setIsLoadingCohorts(false);
        setError("Authentication required");
        return;
      }

      try {
        setIsLoadingCohorts(true);
        setError(null);

        const COHORT_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/cohort`;

        if (!COHORT_SERVICE_URL) {
          throw new Error("Cohort service URL is not configured");
        }

        const url = `${COHORT_SERVICE_URL}`;
        console.log("url :>> ", url);
        const options: RequestInit = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, options);
        console.log("response :>> ", response);

        if (!response.ok) {
          const errorData = await response.json();
          console.log("errorData :>> ", errorData);
          throw new Error(
            errorData.message ||
              `Failed to retrieve cohorts: ${errorData.statusText}`
          );
        }

        const result = await response.json();
        console.log("result :>> ", result);

        if (result.data && Array.isArray(result.data.cohorts)) {
          setAllCohorts(result.data.cohorts);
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

  const handleLoadStudents = useCallback(async () => {
    if (!selectedCohortId || !selectedDate || !token) {
      setError("Please select both cohort and the date");
      return;
    }

    try {
      setIsLoadingStudents(true);
      setError(null);
      setStudents([]);

      const STUDENT_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/student`;

      const url = `${STUDENT_SERVICE_URL}/${selectedCohortId}`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData :>> ", errorData);
        throw new Error(errorData.message || "Failed to fetch students");
      }

      const studentsResult = await response.json();
      setStudents(studentsResult.data.students);
      setAttendanceRecords(
        studentsResult.data.students.reduce(
          (acc: Record<string, AttendanceRecord>, student: Student) => {
            acc[student._id] = {
              studentId: student._id,
              status: "present",
            };
            return acc;
          },
          {}
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingStudents(false);
    }
  }, [selectedCohortId, selectedDate, token]);

  const handleSaveAttendance = async () => {
    if (!selectedCohortId || !selectedDate || students.length === 0 || !token) {
      setError("Please ensure cohort, date, students are loaded");
      return;
    }

    const body = {
      cohortId: selectedCohortId,
      date: selectedDate,
      takenBy: user?._id,
      records: students.map((student) => ({
        ...attendanceRecords[student._id],
      })),
    };

    console.log("body :>> ", body);

    try {
      setIsSavingAttendance(true);
      setError(null);

      const ATTENDANCE_SERVICE_URL = `${
        import.meta.env.VITE_BASE_URL
      }/attendance`;

      const url = `${ATTENDANCE_SERVICE_URL}/create`;
      const options: RequestInit = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Problem when saving attendance");
      }

      console.log("Attendance save successfully.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingAttendance(false);
    }
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
                <div>
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
            {isSavingAttendance ? "Saving" : "Save Attendance"}
          </button>
        </div>
      ) : (
        <p>No students are registered for this cohort</p>
      )}
    </div>
  );
}
