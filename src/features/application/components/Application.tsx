import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Application } from "../types/application";

export default function Application() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      setError("You must be logged in to see the application");
      return;
    }

    const fetchUserApplication = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL as string;
      const endpoint = `/applications/user/${user?._id}`;

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
          setApplication(result.data.application);
        } else if (response.status === 404) {
          setApplication(null);
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

    fetchUserApplication();
  }, [token, user?._id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Application</h2>
      {application ? (
        <p>Review your application below</p>
        // add application component here
      ) : (
        <>
          <p>You have not completed an application</p>
          <button onClick={() => navigate("/application-form")}>
            Start an Application
          </button>
        </>
      )}
    </div>
  );
}
