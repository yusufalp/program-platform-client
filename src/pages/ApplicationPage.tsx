import ApplicantApplication from "../features/application/components/ApplicantApplication";
import { useAuth } from "../hooks/useAuth";

export default function ApplicationPage() {
  const auth = useAuth();

  const roleViews: Record<string, React.FC> = {
    applicant: ApplicantApplication,
  };

  const RoleApplication = auth.user
    ? roleViews[auth.user.role]
    : () => <p>Application is coming soon for your role</p>;

  return (
    <div className="p-4">
      <RoleApplication />
    </div>
  );
}
