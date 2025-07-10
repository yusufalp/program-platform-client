import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { today } from "../../../lib/getToday";

import type { Cohort } from "../types/cohort";
import type { Student } from "../types/student";
import type { AttendanceRecord } from "../types/attendance";
import type { AttendanceStatus } from "../../../constants/attendanceStatuses";

import AttendanceSelector from "./AttendanceSelector";
import AttendanceStudentList from "./AttendanceStudentList";

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
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsLoadingCohorts(false);
      setError("Authentication required");
      return;
    }

    const fetchAllCohorts = async () => {
      setIsLoadingCohorts(true);
      setError(null);
      setSuccess(null);

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
          throw new Error(result.message || "Failed to retrieve cohorts.");
        }

        if (result.data && Array.isArray(result.data.cohorts)) {
          setAllCohorts(result.data.cohorts || []);
        } else {
          throw new Error("Invalid data format received for cohorts");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
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
    setSuccess(null);

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

      if (checkAttendanceResult.data?.attendance) {
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
            acc: Record<string, AttendanceRecord>,
            record: {
              studentId: { _id: string };
              status: AttendanceStatus;
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

        setStudents(studentResult.data?.students || []);
        setAttendanceRecords(
          studentResult.data?.students.reduce(
            (acc: Record<string, AttendanceRecord>, student: Student) => {
              acc[student._id] = {
                studentId: student._id,
                status: "present",
                note: "",
              };
              return acc;
            },
            {}
          )
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
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
    setSuccess(null);

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

      // alert("Attendance saved successfully");
      setSuccess("Attendance saved successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSavingAttendance(false);
    }
  };

  const handleCohortIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCohortId(e.target.value);
    setStudents([]);
    setAttendanceRecords({});
    setError(null);
    setSuccess(null);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setStudents([]);
    setAttendanceRecords({});
    setError(null);
    setSuccess(null);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => {
      return {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          status,
          note: status === "late" ? prev[studentId]?.note || "" : "",
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

      {success && <p>{success}</p>}

      <AttendanceSelector
        cohorts={allCohorts}
        selectedCohortId={selectedCohortId}
        selectedDate={selectedDate}
        loadingCohorts={isLoadingCohorts}
        loadingStudents={isLoadingStudents}
        error={error}
        onCohortChange={handleCohortIdChange}
        onDateChange={handleDateChange}
        onLoadStudents={handleLoadStudents}
      />

      {isLoadingStudents ? (
        <p>Loading students and attendance...</p>
      ) : students.length > 0 ? (
        <div>
          <div>
            <h2>Attendance for {selectedDate}</h2>
            <AttendanceStudentList
              students={students}
              attendanceRecords={attendanceRecords}
              onStatusChange={handleStatusChange}
              onNoteChange={handleNoteChange}
            />
          </div>
          <button
            type="submit"
            onClick={handleSaveAttendance}
            disabled={isSavingAttendance}
          >
            {isSavingAttendance ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      ) : (
        !isLoadingCohorts && <p>No Students are registered for this cohort</p>
      )}
    </div>
  );
}
