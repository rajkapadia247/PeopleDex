import { useState, type FunctionComponent } from "react";
import ActiveTabContext from "./ActiveTabContext";

interface ActiveTabProviderProps {
  children: React.ReactNode;
}

const ActiveTabProvider: FunctionComponent<ActiveTabProviderProps> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <ActiveTabContext.Provider
      value={{ activeTab, setActiveTab }}
    >
      {children}
    </ActiveTabContext.Provider>
  );
};

export default ActiveTabProvider;
