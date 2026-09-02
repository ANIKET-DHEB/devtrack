import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Build DevTrack UI",
    category: "Frontend Development",
    priority: "High",
    dueDate: "2026-09-10",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Complete React practice",
    category: "Learning",
    priority: "Medium",
    dueDate: "2026-09-07",
    status: "Pending",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("devtrack-tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(
      "devtrack-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}