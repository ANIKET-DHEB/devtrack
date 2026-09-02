import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Completed from "./pages/Completed";
import Settings from "./pages/Settings";

import { TaskProvider } from "./context/TaskContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <TaskProvider>
        <Navbar
          onMenuClick={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <div className="app-layout">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />

          <main className="main-content">
            <Routes>
              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* My Tasks */}
              <Route
                path="/tasks"
                element={<MyTasks />}
              />

              {/* Completed Tasks */}
              <Route
                path="/completed"
                element={<Completed />}
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={<Settings />}
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;