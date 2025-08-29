import type { FunctionComponent } from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import MainView from "../../organisms/MainView/MainView";
import MobileHeader from "../../atoms/MobileHeader/MobileHeader";
import "../../applayout.css";

interface ContactsPageLayoutProps {}

const ContactsPageLayout: FunctionComponent<ContactsPageLayoutProps> = () => {
  return (
    <div className="app-layout">
      <MobileHeader />
      <div className="app-content">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
};

export default ContactsPageLayout;
