import { useNavigate } from "react-router-dom";

export default function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Mentor Dashboard</h2>
      <p>Take attendance, schedule meeting and enter notes</p>
      <button onClick={() => navigate("/attendance")}>Take Attendance</button>
    </div>
  );
}
