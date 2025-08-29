//@ts-nocheck

import { useState, type FunctionComponent } from "react";
import CreateEditModal from "../../organisms/CreateEditModal/CreateEditModal";
import "../../actionbutton.css";

interface ActionButtonProps {
  label?: string;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  label = "Add New Contact",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="action-button" onClick={handleCreateClick}>
        <ion-icon name="add-outline" size="large" />
        {label}
      </button>
      <CreateEditModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        isEdit={false}
      />
    </>
  );
};

export default ActionButton;
