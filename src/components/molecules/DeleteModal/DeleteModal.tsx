import { useContext, type FunctionComponent } from "react";
import { deleteContact } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import "./DeleteModal.css";

interface DeleteModalProps {
  isOpen: boolean;
  handleClose: () => void;
  deleteId: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  isOpen,
  handleClose,
  deleteId,
}) => {
  const { incrementRefreshKey } = useContext(RefreshDataContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await deleteContact(deleteId);
      incrementRefreshKey();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
    handleClose();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={handleBackdropClick}>
      <div className="delete-modal-content">
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-header">
            <h2 className="delete-modal-title">Delete contact</h2>
          </div>

          <div className="delete-modal-body">
            <p className="delete-modal-text">
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </p>
          </div>

          <div className="delete-modal-actions">
            <button
              type="button"
              className="delete-modal-button delete-modal-button-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="delete-modal-button delete-modal-button-delete"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
