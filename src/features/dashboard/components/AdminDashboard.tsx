import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="button" onClick={() => navigate("/cohorts")}>
        Cohorts
      </button>
      <button type="button" onClick={() => navigate("/attendance")}>
        Attendance
      </button>
    </div>
  );
}
