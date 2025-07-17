import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import DataTable from "./DataTable";

type AdminView = "users" | "applications" | "cohorts";

export default function AdminDashboard() {
  const { token } = useAuth();

  const [view, setView] = useState<AdminView>();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (view: AdminView) => {
    setLoading(true);
    setError(null);
    setView(view);

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = `/${view}`;

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
        throw new Error("Failed to fetch");
      }

      setData(result.data[view]);
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

  const applicationColumn = [
    { key: "userId.firstName", label: "First Name" },
    { key: "userId.lastName", label: "Last Name" },
    { key: "userId.email", label: "Email" },
    { key: "status", label: "Status" },
  ] as const;

  const cohortColumns = [
    { key: "name", label: "Name" },
    { key: "code", label: "Code" },
  ] as const;

  let columns;

  switch (view) {
    case "applications":
      columns = applicationColumn;
      break;
    case "cohorts":
      columns = cohortColumns;
      break;
    default:
      columns = [];
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        {/* <button onClick={() => handleFetch("users")}>View Users</button> */}
        <button onClick={() => handleFetch("applications")}>
          View Applications
        </button>
        <button onClick={() => handleFetch("cohorts")}>View Cohorts</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {view && !loading && !error && data.length > 0 && (
        <DataTable
          data={data}
          columns={columns as { key: string; label: string }[]}
        />
      )}

      {view && !loading && !error && data.length === 0 && <p>No data found</p>}
    </div>
  );
}
