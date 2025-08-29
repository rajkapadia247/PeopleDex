import { type FunctionComponent } from "react";
import "./AddButton.css";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: FunctionComponent<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="add-button"
      onClick={onClick}
      aria-label="Add new contact"
    >
      <ion-icon name="add"></ion-icon>
    </button>
  );
};

export default AddButton;
