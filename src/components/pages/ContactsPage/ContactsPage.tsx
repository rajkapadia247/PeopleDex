import { useState, type FunctionComponent } from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import MainView from "../../organisms/MainView/MainView";
import "../../applayout.css";
import ActiveTabContext from "../../../contexts/ActiveTabContext";
import RefreshDataContext from "../../../contexts/RefreshDataContext";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../../api/axios";
interface ContactsPageProps {}

const ContactsPage: FunctionComponent<ContactsPageProps> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  setNavigate(navigate);

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

export default ContactsPage;
