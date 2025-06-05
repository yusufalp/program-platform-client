import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Profile } from "../types/profile";

export default function Profile() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const PROFILE_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/profile`;

        const url = `${PROFILE_SERVICE_URL}/user/${user?._id}`;
        const options: RequestInit = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, options);

        if (response.ok) {
          const result = await response.json();

          setProfile(result.data.profile);
        } else if (response.status === 404) {
          setProfile(null);
        } else {
          const error = await response.json();

          throw new Error(error.message || "Server error");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, user?._id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <p>See your profile below</p>
      ) : (
        <>
          <p>You have not completed your profile yet.</p>
          <button onClick={() => navigate("/profile-form")}>
            Complete your profile
          </button>
        </>
      )}
    </div>
  );
}
