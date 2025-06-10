import api from "../api/axios";
import type { ContactType, FormDataType } from "../types/interfaces";

export const fetchContacts = async (
  searchTerm: string,
  filterFavoritesOnly: boolean
) => {
  const response = await api.get("/contacts", {
    params: {
      searchTerm,
      filterFavoritesOnly,
    },
  });
  if (response.status !== 200 || !response.data) {
    throw new Error("Failed to fetch contacts");
  }
  return response.data;
};

export const createContact = async (contact: Omit<ContactType, "id" | "favorite">) => {
  const response = await api.post("/contacts", contact, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to create contact");
  }
  return response.data;
};

export const updateContact = async (contact: FormDataType) => {
  const response = await api.put("/contacts", contact, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to update contact");
  }
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete(
    "/contacts",
    {
      data: { id },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete contact");
  }
  return response.data;
};

export const toggleFavorite = async (id: string) => {
  const response = await api.patch("/contacts/favorite", {
    id,
  })
  if (response.status !== 200) {
    throw new Error("Failed to toggle favorite status");
  }
  return response.data;
};
