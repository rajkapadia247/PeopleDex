import { useContext, useState, type FunctionComponent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CreateEditForm from "./CreateEditForm";
import { createContact, updateContact } from "../utils/api";
import RefreshDataContext from "../contexts/RefreshDataContext";

interface CreateEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isEdit: boolean;
  editData?: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    company?: string;
  };
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
  const [formData, setFormData] = useState(isEdit ? editData : initialFormData);
  const { incrementRefreshKey } = useContext(RefreshDataContext);
  const onClose = () => {
    handleClose();
    setFormData(initialFormData);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: any) => {
            event.preventDefault();
            if (isEdit) {
              updateContact({ ...formData, id: editData?.id })
                .then((updatedContact) => {
                  console.log("Contact updated:", updatedContact);
                });
            } else {
              createContact(formData)
                .then((newContact) => {
                  console.log("Contact created:", newContact);
                });
            }
            incrementRefreshKey()
            onClose();
          },
        },
      }}
    >
      <DialogTitle>{isEdit ? "Edit Contact" : "Add Contact"}</DialogTitle>
      <DialogContent>
        <CreateEditForm formData={formData} setFormData={setFormData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">{isEdit ? "Edit Contact" : "Add Contact"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditModal;
