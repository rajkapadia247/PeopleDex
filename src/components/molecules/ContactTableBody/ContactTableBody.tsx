//@ts-nocheck

import { type FunctionComponent } from "react";
import TableActionsCell from "../TableActionsCell/TableActionsCell";
import type { ContactType } from "../../../types/interfaces";
import "./ContactTableBody.css";

interface ContactTableBodyProps {
  filteredContacts: (Omit<ContactType, "id"> & { id: string })[];
  showActionId: string;
  setShowActionId: (id: string) => void;
  onEditClick: (contact: ContactType) => void;
  onDeleteClick: (id: string) => void;
}

const ContactTableBody: FunctionComponent<ContactTableBodyProps> = ({
  filteredContacts,
  showActionId,
  setShowActionId,
  onEditClick,
  onDeleteClick,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <tbody>
      {filteredContacts.map((row: Omit<ContactType, "id"> & { id: string }) => (
        <tr
          key={row.id}
          className="contact-table-row"
          onMouseEnter={() => setShowActionId(row.id)}
          onMouseLeave={() => setShowActionId("")}
        >
          <td className="contact-table-cell">
            <div className="contact-info">
              <div className={`contact-avatar ${row.color}`}>
                {getInitials(row.name)}
              </div>
              <div className="contact-name">{row.name}</div>
            </div>
          </td>
          <td className="contact-table-cell">
            <div className="contact-email">{row.email || "-"}</div>
          </td>
          <td className="contact-table-cell">
            <div className="contact-phone">{row.phone || "-"}</div>
          </td>
          <td className="contact-table-cell">
            <div className="contact-company">{row.company || "-"}</div>
          </td>
          <td className="contact-table-cell">
            <TableActionsCell
              showActionId={showActionId}
              rowData={row}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ContactTableBody;
