import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, logout } = useAuth();

  const isHomepage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="header">
      <h2 className="title" onClick={() => navigate("/")}>
        Sports Booking System
      </h2>

      <div className="nav-buttons">
        <button onClick={() => navigate("/")} disabled={isHomepage}>
          Home
        </button>

        {!isLoggedIn && (
          <>
            <button
              onClick={() => navigate("/register")}
              disabled={isRegisterPage}
            >
              Register
            </button>

            <button
              onClick={() => navigate("/login")}
              disabled={isLoginPage}
            >
              Login
            </button>
          </>
        )}

        {isLoggedIn && (
          <button onClick={logout} className="logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
