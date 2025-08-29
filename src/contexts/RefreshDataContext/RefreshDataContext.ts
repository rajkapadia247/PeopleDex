import { createContext } from "react";

interface RefreshDataContextValue {
  refreshKey: number;
  incrementRefreshKey: () => void;
  contactsCount: number | null;
  setContactsCount: (count: number | null) => void;
}

const RefreshDataContext = createContext<RefreshDataContextValue | null>(null);

export default RefreshDataContext;
