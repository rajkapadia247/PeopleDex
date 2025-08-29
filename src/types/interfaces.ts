export type ContactType = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  favorite?: boolean;
};

export type FormDataType = Omit<ContactType, "favorite">;
