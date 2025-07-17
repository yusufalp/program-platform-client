import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Profile } from "../types/profile";
import ProfileBioDetails from "./ProfileBioDetails";
import ProfileAddressDetails from "./ProfileAddressDetails";
import ProfileLinksDetails from "./ProfileLinksDetails";

export default function Profile() {
  const { user, token } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      setError("You must be logged in to see your profile.");
      return;
    }

    const fetchUserProfile = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL as string;
      const endpoint = `/profiles/user/${user?._id}`;

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, user?._id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <>
          <p>See your profile below</p>
          <hr className="divider" />

          <section className="review-section">
            <ProfileBioDetails data={profile} />
          </section>

          <hr className="divider" />

          <section className="review-section">
            <ProfileAddressDetails data={profile} />
          </section>

          <hr className="divider" />

          <section className="review-section">
            <ProfileLinksDetails data={profile} />
          </section>
        </>
      ) : (
        <p>You have not completed your profile yet.</p>
      )}

      <button onClick={() => navigate("/profile-form")}>
        {profile ? "Edit" : "Complete"} your profile
      </button>
    </div>
  );
}
