import { today } from "../../../lib/getToday";
import type { AttendanceSelectorProps } from "../types/cohort";

export default function AttendanceSelector({
  cohorts,
  selectedCohortId,
  selectedDate,
  loadingCohorts,
  loadingStudents,
  error,
  onCohortChange,
  onDateChange,
  onLoadStudents,
}: AttendanceSelectorProps) {
  return (
    <div>
      <p>Select a cohort and the date, then click "Load Students"</p>
      <div className="attendance-actions">
        <label htmlFor="cohort"></label>
        <select
          name="cohort"
          id="cohort"
          value={selectedCohortId}
          onChange={onCohortChange}
          disabled={loadingCohorts || loadingStudents}
        >
          <option value="">Select a cohort</option>
          {cohorts.length > 0 ? (
            cohorts.map((cohort) => (
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
          onChange={onDateChange}
          max={today}
          disabled={loadingCohorts || loadingStudents}
        />
        <button
          type="button"
          onClick={onLoadStudents}
          disabled={
            loadingCohorts ||
            loadingStudents ||
            !selectedCohortId ||
            !selectedDate
          }
        >
          {loadingStudents ? "Loading Students..." : "Load Students"}
        </button>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
