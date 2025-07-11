import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="header-nav">
      {token ? (
        <div className="header-logged-in">
          <button
            className={`burger-menu-icon ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation-menu"
            aria-label="Toggle navigation menu"
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>
          <ul className={`burger-menu-items ${isMenuOpen ? "open" : ""}`}>
            <li>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            </li>
            {user?.role === "applicant" && (
              <li>
                <Link to="/application" onClick={() => setIsMenuOpen(false)}>
                  Application
                </Link>
              </li>
            )}
            <li>
              <Link to="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
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
