import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import "../styles/Settings.css";

function Settings() {
  const { user, setUser } = useUser();
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications =
      localStorage.getItem("devtrack-notifications");

    return savedNotifications !== null
      ? JSON.parse(savedNotifications)
      : true;
  });

  useEffect(() => {
    setName(user.name);
    setRole(user.role);
  }, [user]);

  // Save notification preference to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "devtrack-notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name =
        "Name must be at least 2 characters.";
    }

    if (!role.trim()) {
      newErrors.role = "Role is required.";
    } else if (role.trim().length < 2) {
      newErrors.role =
        "Role must be at least 2 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    setUser({
      name: name.trim(),
      role: role.trim(),
    });

    setIsEditing(false);

    showToast("Profile updated successfully.");
  };

  const handleCancel = () => {
    setName(user.name);
    setRole(user.role);
    setErrors({});
    setIsEditing(false);
  };

  const handleNotificationChange = () => {
    setNotifications((current) => !current);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <p className="settings-description">
        Manage your DevTrack preferences.
      </p>

      <div className="settings-card">
        {/* Profile */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div>
              <h2>Profile</h2>
              <p>
                Update your personal information.
              </p>
            </div>

            {!isEditing && (
              <button
                className="edit-profile-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="profile-form">
              <div className="setting-form-group">
                <label htmlFor="profile-name">
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    if (errors.name) {
                      setErrors((currentErrors) => ({
                        ...currentErrors,
                        name: "",
                      }));
                    }
                  }}
                  className={
                    errors.name ? "input-error" : ""
                  }
                />

                {errors.name && (
                  <span className="setting-form-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="setting-form-group">
                <label htmlFor="profile-role">
                  Role
                </label>

                <input
                  id="profile-role"
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);

                    if (errors.role) {
                      setErrors((currentErrors) => ({
                        ...currentErrors,
                        role: "",
                      }));
                    }
                  }}
                  className={
                    errors.role ? "input-error" : ""
                  }
                />

                {errors.role && (
                  <span className="setting-form-error">
                    {errors.role}
                  </span>
                )}
              </div>

              <div className="profile-form-actions">
                <button
                  className="cancel-profile-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  className="save-profile-button"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="setting-item">
                <div>
                  <h3>Name</h3>
                  <p>{user.name}</p>
                </div>
              </div>

              <div className="setting-item">
                <div>
                  <h3>Role</h3>
                  <p>{user.role}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <h2>Notifications</h2>

          <div className="setting-item notification-setting">
            <div>
              <h3>Task Notifications</h3>

              <p>
                Receive notifications about your tasks.
              </p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications}
                onChange={handleNotificationChange}
              />

              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Application */}
        <div className="settings-section">
          <h2>Application</h2>

          <div className="setting-item">
            <div>
              <h3>Theme</h3>

              <p>
                Currently using{" "}
                <strong>
                  {theme === "dark"
                    ? "Dark"
                    : "Light"}
                </strong>{" "}
                mode.
              </p>
            </div>
          </div>

          <div className="setting-item">
            <div>
              <h3>Version</h3>
              <p>DevTrack v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;