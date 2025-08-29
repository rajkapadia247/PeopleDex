//@ts-nocheck

import { type FunctionComponent } from "react";
import "./ContactTableHeader.css";

interface ContactTableHeaderProps {}

const ContactTableHeader: FunctionComponent<ContactTableHeaderProps> = () => {
  return (
    <thead className="contact-table-header">
      <tr>
        <th>
          <div className="contact-table-header-content">
            <ion-icon
              name="person-outline"
              className="contact-table-icon"
            />
            Contact
          </div>
        </th>
        <th>
          <div className="contact-table-header-content">
            <ion-icon
              name="mail-outline"
              className="contact-table-icon"
            />
            Email
          </div>
        </th>
        <th>
          <div className="contact-table-header-content">
            <ion-icon
              name="call-outline"
              className="contact-table-icon"
            />
            Phone
          </div>
        </th>
        <th>
          <div className="contact-table-header-content">
            <ion-icon
              name="business-outline"
              className="contact-table-icon"
            />
            Company
          </div>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default ContactTableHeader;
