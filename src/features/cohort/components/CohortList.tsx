import { useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import type { Cohort } from "../../attendance/types/cohort";
import CohortListItem from "./CohortListItem";

export default function CohortList() {
  const { token } = useAuth();

  const [cohorts, setCohorts] = useState<Cohort[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const getAllCohorts = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL as string;
      const endpoint = "/cohorts";

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

        if (!response.ok) {
          throw new Error("Failed to get all cohorts");
        }

        setCohorts(result.data.cohorts);
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

    getAllCohorts();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Cohorts</h3>
      <CohortListItem cohorts={cohorts} />
    </div>
  );
}
