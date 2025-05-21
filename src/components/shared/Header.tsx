import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const auth = useContext(AuthContext);
  console.log("auth :>> ", auth);

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
            <button onClick={() => auth?.logout()}>Logout</button>
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
