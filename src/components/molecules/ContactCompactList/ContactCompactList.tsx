import { type FunctionComponent, useState } from "react";
import TableActionsCell from "../TableActionsCell/TableActionsCell";
import type { ContactType } from "../../../types/interfaces";
import "./ContactCompactList.css";

interface ContactCompactListProps {
  filteredContacts: (Omit<ContactType, "id"> & { id: string })[];
  onEditClick: (contact: ContactType) => void;
  onDeleteClick: (id: string) => void;
}

const ContactCompactList: FunctionComponent<ContactCompactListProps> = ({
  filteredContacts,
  onEditClick,
  onDeleteClick,
}) => {
  const [showActionId, setShowActionId] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleContactClick = (contactId: string) => {
    setShowActionId(showActionId === contactId ? "" : contactId);
  };

  return (
    <div className="contact-compact-list">
      {filteredContacts.map((contact) => (
        <div key={contact.id} className="contact-compact-item">
          <div
            className="contact-compact-main"
            onClick={() => handleContactClick(contact.id)}
          >
            <div className={`contact-compact-avatar ${contact.color}`}>
              {getInitials(contact.name)}
            </div>
            <div className="contact-compact-info">
              <div className="contact-compact-name">{contact.name}</div>
              <div className="contact-compact-primary">
                {contact.phone && (
                  <span className="contact-compact-phone">{contact.phone}</span>
                )}
              </div>
            </div>
            <div className="contact-compact-toggle">
              <ion-icon
                name={
                  showActionId === contact.id ? "chevron-up" : "chevron-down"
                }
              ></ion-icon>
            </div>
          </div>

          {showActionId === contact.id && (
            <div className="contact-compact-expanded">
              <div className="contact-compact-details">
                {contact.email && (
                  <div className="contact-compact-detail-item">
                    <span className="contact-compact-detail-label">Email:</span>
                    <span className="contact-compact-detail-value">
                      {contact.email}
                    </span>
                  </div>
                )}
                {contact.company && (
                  <div className="contact-compact-detail-item">
                    <span className="contact-compact-detail-label">
                      Company:
                    </span>
                    <span className="contact-compact-detail-value">
                      {contact.company}
                    </span>
                  </div>
                )}
              </div>
              <div className="contact-compact-actions">
                <TableActionsCell
                  showActionId={contact.id}
                  rowData={contact}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactCompactList;
