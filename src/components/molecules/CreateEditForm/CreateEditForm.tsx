//@ts-nocheck

import { useState, type FunctionComponent } from "react";
import type { FormDataType } from "../../../types/interfaces";
import "./CreateEditForm.css";

interface CreateEditFormProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  error?: string;
  setError?: (error: string) => void;
}

const CreateEditForm: FunctionComponent<CreateEditFormProps> = ({
  formData,
  setFormData,
  error,
  setError,
}) => {
  const [picturePreviewUrl, setPicturePreviewUrl] = useState<string | null>(
    null
  );
  const [pictureFileName, setPictureFileName] = useState<string>("");

  const formFields: Array<{
    id: keyof FormDataType;
    type: string;
    required: boolean;
    autoFocus: boolean;
    icon: React.ReactElement;
    placeholder: string;
  }> = [
    {
      id: "name",
      type: "text",
      required: true,
      autoFocus: true,
      icon: <ion-icon name="person-outline" />,
      placeholder: "Full name",
    },
    {
      id: "phone",
      type: "tel",
      required: true,
      autoFocus: false,
      icon: <ion-icon name="call-outline" />,
      placeholder: "Phone number",
    },
    {
      id: "email",
      type: "email",
      required: false,
      autoFocus: false,
      icon: <ion-icon name="mail-outline" />,
      placeholder: "Email address",
    },
    {
      id: "company",
      type: "text",
      required: false,
      autoFocus: false,
      icon: <ion-icon name="business-outline" />,
      placeholder: "Company name",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error && setError) {
      setError("");
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPicturePreviewUrl(null);
      setPictureFileName("");
      return;
    }
    setPictureFileName(file.name);
    const url = URL.createObjectURL(file);
    setPicturePreviewUrl(url);
  };

  const validateField = (field: (typeof formFields)[0], value: string) => {
    if (field.required && !value.trim()) {
      return `${field.placeholder} is required`;
    }
    if (
      field.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      return "Please enter a valid email address";
    }
    return "";
  };

  return (
    <div className="form-container">
      {formFields.map((field) => {
        const fieldValue = formData[field.id];
        const fieldError = validateField(
          field,
          typeof fieldValue === "string" ? fieldValue : ""
        );
        const hasError = Boolean(fieldError && formData[field.id]);

        return (
          <div key={field.id} className="form-field">
            <div className="form-field-input-container">
              <div className="form-field-icon">{field.icon}</div>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id]}
                placeholder={field.placeholder}
                onChange={handleChange}
                autoFocus={field.autoFocus}
                required={field.required}
                className={`form-field-input ${hasError ? "error" : ""}`}
              />
            </div>
            {hasError && <span className="form-field-error">{fieldError}</span>}
          </div>
        );
      })}
      <div className="form-field">
        <label className="form-field-label">Picture (optional)</label>
        <div className="form-field-file-row">
          <div className="avatar-preview" aria-hidden={!picturePreviewUrl}>
            {picturePreviewUrl ? (
              <img src={picturePreviewUrl} alt="Preview" />
            ) : (
              <ion-icon name="image-outline" />
            )}
          </div>
          <label className="file-button">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="file-input"
            />
            Choose Image
          </label>
          {pictureFileName && (
            <span className="file-name" title={pictureFileName}>
              {pictureFileName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEditForm;
