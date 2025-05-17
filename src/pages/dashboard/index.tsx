import { useCurrentUser } from "../../hooks/useCurrentUser";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import ApplicantDashboard from "../../components/dashboard/ApplicantDashboard";

export default function DashboardPage() {
  const user = useCurrentUser();

  const roleViews: Record<string, React.FC> = {
    admin: AdminDashboard,
    applicant: ApplicantDashboard,
    // mentor: MentorDashboard,
  };

  const RoleDashboard = user
    ? roleViews[user.role]
    : () => <p>Dashboard coming soon for your role.</p>;

  return (
    <div className="p-4">
      <h1>Welcome</h1>

      <RoleDashboard />
    </div>
  );
}
