import { useState, type FunctionComponent } from "react";
import RefreshDataContext from "./RefreshDataContext";

interface RefreshDataProviderProps {
  children: React.ReactNode;
}

const RefreshDataProvider: FunctionComponent<RefreshDataProviderProps> = ({
  children,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [contactsCount, setContactsCount] = useState<number | null>(null);
  const incrementRefreshKey = () => setRefreshKey((prev) => prev + 1);

  return (
    <RefreshDataContext.Provider
      value={{
        refreshKey,
        incrementRefreshKey,
        contactsCount,
        setContactsCount,
      }}
    >
      {children}
    </RefreshDataContext.Provider>
  );
};

export default RefreshDataProvider;
