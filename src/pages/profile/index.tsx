import AdminProfile from "../../components/profile/AdminProfile";
import ApplicantProfile from "../../components/profile/ApplicantProfile";

import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const auth = useAuth();

  const roleProfiles: Record<string, React.FC> = {
    admin: AdminProfile,
    applicant: ApplicantProfile,
    // mentor: MentorProfile
  };

  const RoleProfile = auth.user
    ? roleProfiles[auth.user.role]
    : () => <p>Profile page not available for your role.</p>;

  return (
    <div className="p-4">
      <RoleProfile />
    </div>
  );
}
