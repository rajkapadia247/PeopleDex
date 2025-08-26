//@ts-nocheck

import type { FunctionComponent } from "react";
import "./NoContacts.css";
import ActionButton from "../ActionButton/ActionButton";

interface NoContactsProps {
  searchTerm?: string;
}

const NoContacts: FunctionComponent<NoContactsProps> = ({ searchTerm }) => {
  return (
    <div className="contact-empty-state">
      <ion-icon
        name="document-outline"
        className="contact-empty-icon"
        aria-hidden="true"
      />
      <h3 className="contact-empty-title">
        {searchTerm
          ? `No contacts found for "${searchTerm}"`
          : "No contacts to display"}
      </h3>
      <p className="contact-empty-description">
        {searchTerm
          ? "Try adjusting your search criteria or add a new contact."
          : "Get started by adding your first contact to the list."}
      </p>
      <div className="contact-empty-actions">
        <ActionButton label="Add First Contact" />
      </div>
    </div>
  );
};

export default NoContacts;
