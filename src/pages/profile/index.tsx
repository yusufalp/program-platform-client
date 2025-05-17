import { useCurrentUser } from "../../hooks/useCurrentUser";
import AdminProfile from "../../components/profile/AdminProfile";
import ApplicantProfile from "../../components/profile/ApplicantProfile";

export default function ProfilePage() {
  const user = useCurrentUser();

  const roleProfiles: Record<string, React.FC> = {
    admin: AdminProfile,
    applicant: ApplicantProfile,
    // mentor: MentorProfile
  };

  const RoleProfile = user
    ? roleProfiles[user.role]
    : () => <p>Profile page not available for your role.</p>;

  return (
    <div className="p-4">
      <RoleProfile />
    </div>
  );
}
