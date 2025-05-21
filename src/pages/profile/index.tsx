import { useEffect, useState } from "react";
import AdminProfile from "../../components/profile/AdminProfile";
import ApplicantProfile from "../../components/profile/ApplicantProfile";

import { useAuth } from "../../hooks/useAuth";
import checkProfile from "../../utils/checkProfile";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const auth = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyProfile = async () => {
      if (!auth.user || !auth.token) return;

      try {
        const exists = await checkProfile(auth.user._id, auth.token);

        if (!exists) {
          navigate("/create-profile");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verifyProfile();
  }, [auth.token, auth.user, navigate]);

  if (loading) return <p>Loading...</p>;

  const roleProfiles: Record<string, React.FC> = {
    admin: AdminProfile,
    applicant: ApplicantProfile,
    // mentor: MentorProfile
  };

  const RoleProfile = auth.user
    ? roleProfiles[auth.user.role] ?? (() => <p>No profile component found for your role.</p>)
    : () => <p>You must be logged in to view this page.</p>;

  return (
    <div>
      <RoleProfile />
    </div>
  );
}
