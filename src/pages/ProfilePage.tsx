import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Profile from "../features/profile/components/Profile";
import hasProfile from "../lib/checkProfile";

export default function ProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyProfile = async () => {
      if (!auth.user || !auth.token) return;

      try {
        const profileExists = await hasProfile(auth.user._id, auth.token);

        if (!profileExists) {
          navigate("/profile-form");
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
    admin: Profile,
    applicant: Profile,
    // mentor: MentorProfile
  };

  const RoleProfile = auth.user
    ? roleProfiles[auth.user.role] ??
      (() => <p>No profile component found for your role.</p>)
    : () => <p>You must be logged in to view this page.</p>;

  return (
    <div>
      <RoleProfile />
    </div>
  );
}
