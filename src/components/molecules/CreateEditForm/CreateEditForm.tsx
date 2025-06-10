import { TextField } from "@mui/material";
import type { FunctionComponent } from "react";

interface CreateEditFormProps {
  formData: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    company?: string;
  };
  setFormData: (data: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    company?: string;
  }) => void;
}

const CreateEditForm: FunctionComponent<CreateEditFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <>
      <TextField
        autoFocus
        required
        value={formData.name}
        onChange={handleChange}
        margin="dense"
        id="name"
        name="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        value={formData.phone}
        onChange={handleChange}
        margin="dense"
        id="phone"
        name="phone"
        label="Phone number"
        type="tel"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        value={formData.email}
        onChange={handleChange}
        id="email"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        margin="dense"
        value={formData.company}
        onChange={handleChange}
        id="company"
        name="company"
        label="Company name"
        type="text"
        fullWidth
        variant="standard"
      />
    </>
  );
};

export default CreateEditForm;
