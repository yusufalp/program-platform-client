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
      const baseUrl = import.meta.env.VITE_BASE_URL as string;
      const endpoint = `/profile/user/${user?._id}`;

      const url = new URL(`${baseUrl}${endpoint}`);
      const options: RequestInit = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok) {
          setProfile(result.data.profile);
        } else if (response.status === 404) {
          setProfile(null);
        } else {
          throw new Error(result.message || "Server error");
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
