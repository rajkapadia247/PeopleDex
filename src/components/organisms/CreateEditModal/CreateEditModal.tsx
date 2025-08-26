//@ts-nocheck

import { useContext, useState, type FunctionComponent } from "react";
import CreateEditForm from "../../molecules/CreateEditForm/CreateEditForm";
import { createContact, updateContact } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import type { FormDataType } from "../../../types/interfaces";
import "./CreateEditModal.css";

interface CreateEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isEdit: boolean;
  editData?: FormDataType;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
};

const CreateEditModal: FunctionComponent<CreateEditModalProps> = ({
  isOpen,
  handleClose,
  isEdit,
  editData,
}) => {
  const [formData, setFormData] = useState(
    isEdit && editData ? editData : initialFormData
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { incrementRefreshKey } = useContext(RefreshDataContext);

  const onClose = () => {
    handleClose();
    setFormData(initialFormData);
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEdit) {
        await updateContact({ ...formData, id: editData?.id });
        setSuccessMessage("Contact updated successfully!");
      } else {
        await createContact(formData);
        setSuccessMessage("Contact created successfully!");
      }
      incrementRefreshKey();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          `Failed to ${isEdit ? "update" : "create"} contact`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const isFormValid = formData.name.trim() && formData.phone.trim();

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleBackdropClick}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2 className="modal-title">
                {isEdit ? "Edit Contact" : "Add New Contact"}
              </h2>
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
              >
                <ion-icon name="close-outline" />
              </button>
            </div>

            <div className="modal-body">
              {error && (
                <div className="modal-alert">
                  {error}
                  <button
                    type="button"
                    className="modal-alert-close"
                    onClick={() => setError("")}
                  >
                    ×
                  </button>
                </div>
              )}

              <CreateEditForm
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-button modal-button-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="modal-button modal-button-submit"
                disabled={loading || !isFormValid}
              >
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update Contact"
                  : "Create Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {successMessage && (
        <div className="success-notification">{successMessage}</div>
      )}
    </>
  );
};

export default CreateEditModal;
