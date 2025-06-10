import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, type FunctionComponent } from "react";
import { deleteContact } from "../utils/api";
import RefreshDataContext from "../contexts/RefreshDataContext";

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
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: any) => {
            event.preventDefault();
            deleteContact(deleteId)
              .then(() => {
                console.log("Contact deleted:", deleteId);
              })
              incrementRefreshKey()
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Delete contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
