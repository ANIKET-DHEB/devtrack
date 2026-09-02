import "../styles/ConfirmModal.css";

function ConfirmModal({
  title = "Delete Task",
  message = "Are you sure you want to delete this task?",
  onCancel,
  onConfirm,
}) {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <div className="confirm-modal-icon">
          !
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;