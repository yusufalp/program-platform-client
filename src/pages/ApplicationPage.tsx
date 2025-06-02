import Application from "../features/application/components/Application";
import { useAuth } from "../hooks/useAuth";

export default function ApplicationPage() {
  const { user } = useAuth();

  const roleViews: Record<string, React.FC> = {
    applicant: Application,
  };

  const RoleApplication = user
    ? roleViews[user.role] ??
      (() => <p>No profile component found for your role.</p>)
    : () => <p>You must be logged in to view this page.</p>;

  return (
    <div>
      <RoleApplication />
    </div>
  );
}
