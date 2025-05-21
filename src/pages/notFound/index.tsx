import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Page not found</h2>
      <p>The page you are looking for does not exist or moved</p>
      <button onClick={() => navigate("/login")}>Go to login</button>
    </div>
  );
}
