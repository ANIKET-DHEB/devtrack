import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);