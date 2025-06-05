import Profile from "../features/profile/components/Profile";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  const roleProfiles: Record<string, React.FC> = {
    admin: Profile,
    applicant: Profile,
    mentor: Profile
  };

  const RoleProfile = user
    ? roleProfiles[user.role] ??
      (() => <p>No profile component found for your role.</p>)
    : () => <p>You must be logged in to view this page.</p>;

  return (
    <div>
      <RoleProfile />
    </div>
  );
}
