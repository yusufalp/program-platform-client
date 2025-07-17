import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { RegisterForm } from "../types/registrationForm";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.firstName || !form.lastName || !form.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const endpoint = "/users/register";

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
        navigate("/login");
      } else {
        throw new Error(result.message || "Registration failed.");
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
      <form onSubmit={handleRegisterSubmit}>
        <h1>Register</h1>
        <p>Let us create your account</p>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
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
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          {`Already have an account?`} <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
