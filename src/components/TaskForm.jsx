import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import "../styles/TaskForm.css";

function TaskForm({ onClose, editTask }) {
  const { setTasks } = useTasks();
  const { showToast } = useToast();

  const [title, setTitle] = useState(editTask?.title || "");
  const [category, setCategory] = useState(
    editTask?.category || ""
  );

  const [priority, setPriority] = useState(
    editTask?.priority || "Medium"
  );

  const [dueDate, setDueDate] = useState(
    editTask?.dueDate || ""
  );

  const [status, setStatus] = useState(
    editTask?.status || "Pending"
  );

  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editTask);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Task title is required.";
    } else if (title.trim().length < 3) {
      newErrors.title =
        "Task title must be at least 3 characters.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    } else if (category.trim().length < 2) {
      newErrors.category =
        "Category must be at least 2 characters.";
    }

    if (!priority) {
      newErrors.priority = "Please select a priority.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    if (!status) {
      newErrors.status = "Please select a status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editTask.id
            ? {
                ...task,
                title: title.trim(),
                category: category.trim(),
                priority,
                dueDate,
                status,
              }
            : task
        )
      );

      showToast("Task updated successfully.");
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        category: category.trim(),
        priority,
        dueDate,
        status,
      };

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);

      showToast("Task added successfully.");
    }

    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (errors.title) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        title: "",
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    if (errors.category) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        category: "",
      }));
    }
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);

    if (errors.priority) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        priority: "",
      }));
    }
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);

    if (errors.dueDate) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        dueDate: "",
      }));
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);

    if (errors.status) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        status: "",
      }));
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>
            {isEditing ? "Edit Task" : "Add New Task"}
          </h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Task Title */}
          <div className="form-group">
            <label htmlFor="task-title">
              Task Title
            </label>

            <input
              id="task-title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={handleTitleChange}
              className={
                errors.title ? "input-error" : ""
              }
            />

            {errors.title && (
              <span className="form-error">
                {errors.title}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="task-category">
              Category
            </label>

            <input
              id="task-category"
              type="text"
              placeholder="e.g. Development"
              value={category}
              onChange={handleCategoryChange}
              className={
                errors.category ? "input-error" : ""
              }
            />

            {errors.category && (
              <span className="form-error">
                {errors.category}
              </span>
            )}
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="task-priority">
              Priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={handlePriorityChange}
              className={
                errors.priority ? "input-error" : ""
              }
            >
              <option value="Low">Low</option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">High</option>
            </select>

            {errors.priority && (
              <span className="form-error">
                {errors.priority}
              </span>
            )}
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="task-due-date">
              Due Date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className={
                errors.dueDate ? "input-error" : ""
              }
            />

            {errors.dueDate && (
              <span className="form-error">
                {errors.dueDate}
              </span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="task-status">
              Status
            </label>

            <select
              id="task-status"
              value={status}
              onChange={handleStatusChange}
              className={
                errors.status ? "input-error" : ""
              }
            >
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

            {errors.status && (
              <span className="form-error">
                {errors.status}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-task-button"
            >
              {isEditing
                ? "Update Task"
                : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;