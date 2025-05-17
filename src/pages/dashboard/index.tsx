import AdminDashboard from "../../components/dashboard/AdminDashboard";
import ApplicantDashboard from "../../components/dashboard/ApplicantDashboard";

import { useAuth } from "../../hooks/useAuth";

export default function DashboardPage() {
  const auth = useAuth();

  const roleViews: Record<string, React.FC> = {
    admin: AdminDashboard,
    applicant: ApplicantDashboard,
    // mentor: MentorDashboard,
  };

  const RoleDashboard = auth.user
    ? roleViews[auth.user.role]
    : () => <p>Dashboard coming soon for your role.</p>;

  return (
    <div className="p-4">
      <h1>Welcome</h1>

      <RoleDashboard />
    </div>
  );
}
