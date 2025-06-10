import { useState, type FunctionComponent } from "react";
import Sidebar from "./Sidebar";
import MainView from "./MainView";
import "./applayout.css";
import ActiveTabContext from "../contexts/ActiveTabContext";
import RefreshDataContext from "../contexts/RefreshDataContext";
interface AppLayoutProps {}

const AppLayout: FunctionComponent<AppLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const incrementRefreshKey = () => setRefreshKey((prev) => prev + 1);
  return (
      <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
        <RefreshDataContext.Provider value={{ refreshKey, incrementRefreshKey }}>
        <div className="app-layout">
          <Sidebar />
          <MainView />
        </div>
        </RefreshDataContext.Provider>
      </ActiveTabContext.Provider>
  );
};

export default AppLayout;
