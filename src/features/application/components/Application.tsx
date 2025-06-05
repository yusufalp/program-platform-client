import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import type { Application } from "../types/application";

export default function Application() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserApplication = async () => {
      try {
        const APPLICATION_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/application`;

        const url = `${APPLICATION_SERVICE_URL}/user/${user?._id}`;
        const options: RequestInit = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await fetch(url, options);

        if (response.ok) {
          const result = await response.json();

          setApplication(result.data.application);
        } else if (response.status === 404) {
          setApplication(null);
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

    fetchUserApplication();
  }, [token, user?._id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Application</h2>
      {application ? (
        <p>Review your application below</p>
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
