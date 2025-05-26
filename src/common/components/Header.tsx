import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    auth?.logout();

    navigate("/login");
  };

  return (
    <nav>
      {auth?.token ? (
        <ul>
          <li>
            <Link to={`/dashboard/${auth.user?._id}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`/profile/${auth.user?._id}`}>Profile</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
