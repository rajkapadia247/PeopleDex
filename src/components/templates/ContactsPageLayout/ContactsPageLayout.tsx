import type { FunctionComponent } from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import MainView from "../../organisms/MainView/MainView";

interface ContactsPageLayoutProps {}

const ContactsPageLayout: FunctionComponent<ContactsPageLayoutProps> = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <MainView />
    </div>
  );
};

export default ContactsPageLayout;
