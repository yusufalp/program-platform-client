import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NotFoundPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Page not found</h2>
      <p>The page you are looking for does not exist or moved</p>
      {token ? (
        <button onClick={() => navigate("/dashboard")}>Go to dashboard</button>
      ) : (
        <button onClick={() => navigate("/login")}>Go to login</button>
      )}
    </div>
  );
}
