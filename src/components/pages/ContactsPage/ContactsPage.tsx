import { type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../../api/axios";
import ActiveTabProvider from "../../../contexts/ActiveTabContext/ActiveTabProvider";
import RefreshDataProvider from "../../../contexts/RefreshDataContext/RefreshDataProvider";
import "../../applayout.css";
import ContactsPageLayout from "../../templates/ContactsPageLayout/ContactsPageLayout";

interface ContactsPageProps {}

const ContactsPage: FunctionComponent<ContactsPageProps> = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  
  return (
      <ActiveTabProvider>
        <RefreshDataProvider>
          <ContactsPageLayout />
        </RefreshDataProvider>
      </ActiveTabProvider>
  );
};

export default ContactsPage;
