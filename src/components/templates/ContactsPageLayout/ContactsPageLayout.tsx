import type { FunctionComponent } from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import MainView from "../../organisms/MainView/MainView";
import "../../applayout.css";

interface ContactsPageLayoutProps {}

const ContactsPageLayout: FunctionComponent<ContactsPageLayoutProps> = () => {
  return (
    <div className="app-layout">
      <div className="app-content">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
};

export default ContactsPageLayout;
