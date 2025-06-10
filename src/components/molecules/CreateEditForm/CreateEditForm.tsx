import { TextField } from "@mui/material";
import type { FunctionComponent } from "react";
import type { ContactType } from "../../../types/interfaces";


interface CreateEditFormProps {
  formData: ContactType;
  setFormData: (data: ContactType) => void;
}

const CreateEditForm: FunctionComponent<CreateEditFormProps> = ({
  formData,
  setFormData,
}) => {
  const formFields: Array<{
    id: keyof ContactType;
    label: string;
    type: string;
    required: boolean;
    autoFocus: boolean;
  }> = [
    { id: "name", label: "Name", type: "text", required: true, autoFocus: true },
    { id: "phone", label: "Phone number", type: "tel", required: true, autoFocus: false },
    { id: "email", label: "Email Address", type: "email", required: false, autoFocus: false },
    { id: "company", label: "Company name", type: "text", required: false, autoFocus: false },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <>
     {formFields.map((field) => (
        <TextField
          key={field.id}
          autoFocus={field.autoFocus}
          required={field.required}
          value={formData[field.id]}
          margin="normal"
          id={field.id}
          name={field.id}
          label={field.label}
          type={field.type}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
      ))}
      </>
  );
};

export default CreateEditForm;
