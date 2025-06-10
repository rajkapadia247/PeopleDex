const API_BASE_URL = "http://localhost:8080";

export const fetchContacts = async (searchTerm: string, filterFavoritesOnly: boolean) => {
  const response = await fetch(`${API_BASE_URL}/contacts?searchTerm=${searchTerm}&filterFavoritesOnly=${filterFavoritesOnly}`);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
};

export const createContact = async (contact) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  return response.json();
};

export const updateContact = async (contact) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  return response.json();
}

export const deleteContact = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    body: JSON.stringify({ id }),
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
}

export const toggleFavorite = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/contacts/favorite`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to toggle favorite status");
  }
  return response.json();
};