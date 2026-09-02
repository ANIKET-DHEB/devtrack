import { useState } from "react";
import "../styles/Dashboard.css";
import TaskCard from "../components/TaskCard";
import StatsCard from "../components/StatsCard";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  // Overdue Tasks
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      `${task.dueDate}T00:00:00`
    );

    return dueDate < today;
  }).length;

  // Completion Rate
  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  // Analytics Percentages
  const completedPercentage =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  const inProgressPercentage =
    tasks.length > 0
      ? Math.round(
          (inProgressTasks / tasks.length) * 100
        )
      : 0;

  const pendingPercentage =
    tasks.length > 0
      ? Math.round(
          (pendingTasks / tasks.length) * 100
        )
      : 0;

  const overduePercentage =
    tasks.length > 0
      ? Math.round(
          (overdueTasks / tasks.length) * 100
        )
      : 0;

  const categories = [
    "All",
    ...new Set(tasks.map((task) => task.category)),
  ];

  // Search + Filter + Sort
  const filteredTasks = tasks
    .filter((task) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.category.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.id - a.id;
      }

      if (sortBy === "oldest") {
        return a.id - b.id;
      }

      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  const handleAddTask = () => {
    setEditTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(
      (task) => task.id === id
    );

    setEditTask(taskToEdit);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditTask(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "All" ||
    categoryFilter !== "All";

  return (
    <div className="dashboard">
      <h1>Good evening 👋</h1>

      <p>
        Let's get things done today.
      </p>

      {/* Stats */}
      <div className="stats">
        <StatsCard
          title="Total Tasks"
          value={tasks.length}
        />

        <StatsCard
          title="Completed"
          value={completedTasks}
        />

        <StatsCard
          title="Pending"
          value={pendingTasks}
        />

        <StatsCard
          title="Overdue"
          value={overdueTasks}
        />
      </div>

      {/* Completion Rate */}
      <div className="completion-card">
        <div className="completion-header">
          <div>
            <h2>Completion Rate</h2>

            <p>
              {completedTasks} of {tasks.length} tasks
              completed
            </p>
          </div>

          <strong>{completionRate}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${completionRate}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Analytics */}
      <div className="analytics-card">
        <div className="analytics-header">
          <div>
            <h2>Task Overview</h2>

            <p>
              Breakdown of your current task status.
            </p>
          </div>
        </div>

        <div className="analytics-list">
          {/* Completed */}
          <div className="analytics-item">
            <div className="analytics-item-header">
              <span>Completed</span>

              <strong>
                {completedTasks} ({completedPercentage}%)
              </strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill completed-fill"
                style={{
                  width: `${completedPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          {/* In Progress */}
          <div className="analytics-item">
            <div className="analytics-item-header">
              <span>In Progress</span>

              <strong>
                {inProgressTasks} (
                {inProgressPercentage}%)
              </strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill progress-fill-blue"
                style={{
                  width: `${inProgressPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Pending */}
          <div className="analytics-item">
            <div className="analytics-item-header">
              <span>Pending</span>

              <strong>
                {pendingTasks} ({pendingPercentage}%)
              </strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill pending-fill"
                style={{
                  width: `${pendingPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Overdue */}
          <div className="analytics-item">
            <div className="analytics-item-header">
              <span>Overdue</span>

              <strong>
                {overdueTasks} ({overduePercentage}%)
              </strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill overdue-fill"
                style={{
                  width: `${overduePercentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="tasks-section">
        <div className="section-header">
          <div>
            <h2>My Tasks</h2>

            <span className="task-count">
              Showing {filteredTasks.length} of{" "}
              {tasks.length} tasks
            </span>
          </div>

          <button onClick={handleAddTask}>
            + Add Task
          </button>
        </div>

        {/* Search + Filters */}
        <div className="task-controls">
          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            {categories
              .filter(
                (category) => category !== "All"
              )
              .map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="az">
              A → Z
            </option>

            <option value="za">
              Z → A
            </option>
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                category={task.category}
                priority={task.priority}
                dueDate={task.dueDate}
                status={task.status}
                onEdit={handleEditTask}
              />
            ))
          ) : (
            <div className="no-tasks">
              <div className="empty-icon">
                ✓
              </div>

              <h3>
                {hasActiveFilters
                  ? "No matching tasks"
                  : "No tasks yet"}
              </h3>

              <p>
                {hasActiveFilters
                  ? "Try changing your search or filters."
                  : "Create your first task to get started."}
              </p>

              {hasActiveFilters ? (
                <button
                  className="empty-action"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  className="empty-action"
                  onClick={handleAddTask}
                >
                  + Add Task
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Task Form */}
      {showTaskForm && (
        <TaskForm
          editTask={editTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Dashboard;