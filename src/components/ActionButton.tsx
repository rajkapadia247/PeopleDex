import { useState, type FunctionComponent } from "react";
import "./actionbutton.css";
import { Button } from "@mui/material";
import CreateEditModal from "./CreateEditModal";
interface ActionButtonProps {}

const ActionButton: FunctionComponent<ActionButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCreateClick = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Button variant="contained" size="large" fullWidth onClick={handleCreateClick}>
        Create New Contact
      </Button>
      <CreateEditModal isOpen={isOpen} handleClose={() => {setIsOpen(false)}} isEdit={false}/>
    </>
  );
};

export default ActionButton;
