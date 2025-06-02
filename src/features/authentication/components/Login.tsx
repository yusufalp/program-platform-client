import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const USER_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/user`;

    const url = `${USER_SERVICE_URL}/login`;
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

      if (response.ok) {
        const result = await response.json();
        const { data, token } = result;

        login(data.user, token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Login to your account </p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          {`Don't have an account?`} <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
