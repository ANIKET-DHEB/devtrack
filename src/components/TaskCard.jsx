import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import {
  FaTrash,
  FaCheck,
  FaEdit,
  FaCalendarAlt,
} from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";
import "../styles/TaskCard.css";

function TaskCard({
  id,
  title,
  category,
  priority,
  dueDate,
  status,
  onEdit,
}) {
  const { setTasks } = useTasks();
  const { showToast } = useToast();

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );

    setShowConfirmModal(false);

    showToast("Task deleted successfully.");
  };

  const handleComplete = () => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
            }
          : task
      )
    );

    showToast("Task completed successfully.");
  };

  const displayPriority = priority || "Medium";

  // Check if task is overdue
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDueDate = dueDate
    ? new Date(`${dueDate}T00:00:00`)
    : null;

  const isOverdue =
    taskDueDate &&
    taskDueDate < today &&
    status !== "Completed";

  const formattedDueDate = dueDate
    ? new Date(
        `${dueDate}T00:00:00`
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <>
      <div className="task-card">
        <div className="task-info">
          <h3>{title}</h3>

          <p>{category}</p>

          <div
            className={`task-due-date ${
              isOverdue ? "due-date-overdue" : ""
            }`}
          >
            <FaCalendarAlt />

            <span>
              {isOverdue
                ? `Overdue · ${formattedDueDate}`
                : formattedDueDate}
            </span>
          </div>
        </div>

        <div className="task-actions">
          <span
            className={`task-priority priority-${displayPriority.toLowerCase()}`}
          >
            {displayPriority}
          </span>

          {isOverdue ? (
            <span className="task-status overdue">
              Overdue
            </span>
          ) : (
            <span
              className={`task-status ${status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {status}
            </span>
          )}

          {status !== "Completed" && (
            <button
              className="complete-task"
              onClick={handleComplete}
              aria-label={`Complete ${title}`}
              title="Mark as completed"
            >
              <FaCheck />
            </button>
          )}

          {onEdit && (
            <button
              className="edit-task"
              onClick={() => onEdit(id)}
              aria-label={`Edit ${title}`}
              title="Edit task"
            >
              <FaEdit />
            </button>
          )}

          <button
            className="delete-task"
            onClick={handleDeleteClick}
            aria-label={`Delete ${title}`}
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete "${title}"?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default TaskCard;