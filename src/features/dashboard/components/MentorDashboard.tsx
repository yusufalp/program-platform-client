import { useNavigate } from "react-router-dom";

export default function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="button" onClick={() => navigate("/attendance")}>
        Attendance
      </button>
    </div>
  );
}
