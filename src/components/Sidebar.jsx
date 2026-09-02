import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            onClick={onClose}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            onClick={onClose}
          >
            My Tasks
          </NavLink>

          <NavLink
            to="/completed"
            onClick={onClose}
          >
            Completed
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
          >
            Settings
          </NavLink>

        </nav>
      </aside>
    </>
  );
}

export default Sidebar;