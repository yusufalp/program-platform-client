import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

import type { LoginForm } from "../types/loginForm";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and Password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/users/login";

    const url = new URL(`${baseUrl}${endpoint}`);

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        const { data, token } = result;

        login(data.user, token);
        navigate("/dashboard");
      } else {
        throw new Error(result.message || "Invalid credentials.");
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

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <p>Login to your account </p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          {`Don't have an account?`} <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
