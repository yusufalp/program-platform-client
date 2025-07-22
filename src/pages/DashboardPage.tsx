import AdminDashboard from "../features/dashboard/components/AdminDashboard";
import ApplicantDashboard from "../features/dashboard/components/ApplicantDashboard";
import MenteeDashboard from "../features/dashboard/components/MenteeDashboard";
import MentorDashboard from "../features/dashboard/components/MentorDashboard";

import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  const roleViews: Record<string, React.FC> = {
    admin: AdminDashboard,
    applicant: ApplicantDashboard,
    mentor: MentorDashboard,
    mentee: MenteeDashboard,
  };

  const RoleDashboard = user
    ? roleViews[user.role]
    : () => <p>Dashboard coming soon for your role.</p>;

  return (
    <div className="p-4">
      <h1>Welcome {user?.firstName}</h1>
      <h2>Dashboard</h2>

      <RoleDashboard />
    </div>
  );
}
