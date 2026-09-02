import { createContext, useContext, useState } from "react";
import "../styles/Toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    // Check notification preference
    const savedNotifications = localStorage.getItem(
      "devtrack-notifications"
    );

    const notificationsEnabled =
      savedNotifications !== null
        ? JSON.parse(savedNotifications)
        : true;

    // Don't show toast if notifications are disabled
    if (!notificationsEnabled) {
      return;
    }

    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" && "✓"}
            {toast.type === "error" && "!"}
          </span>

          <span className="toast-message">
            {toast.message}
          </span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}