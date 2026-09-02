import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import "../styles/Navbar.css";

function Navbar({ onMenuClick, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? "×" : "☰"}
        </button>

        <div className="navbar-logo">
          <span>✓</span>
          <h2>DevTrack</h2>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className={`theme-toggle ${
            theme === "dark" ? "dark" : ""
          }`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <span className="theme-toggle-icon">
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </span>
        </button>

        <div className="navbar-profile">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;