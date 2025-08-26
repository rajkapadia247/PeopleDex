//@ts-nocheck

import { useContext, useEffect, useState, type FunctionComponent } from "react";
import ContactTableHeader from "../../molecules/ContactTableHeader/ContactTableHeader";
import ContactTableBody from "../../molecules/ContactTableBody/ContactTableBody";
import TableLoader from "../../atoms/TableLoader/TableLoader";
import NoContacts from "../../atoms/NoContacts/NoContacts";
import CreateEditModal from "../CreateEditModal/CreateEditModal";
import DeleteModal from "../../molecules/DeleteModal/DeleteModal";
import { fetchContacts } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import type { ContactType } from "../../../types/interfaces";
import "./ContactListTable.css";

interface ContactListTableProps {
  searchTerm: string;
  isFavoriteTab: boolean;
}

const ContactListTable: FunctionComponent<ContactListTableProps> = ({
  searchTerm,
  isFavoriteTab,
}) => {
  const [showActionId, setShowActionId] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<ContactType | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { refreshKey, setContactsCount } = useContext(RefreshDataContext);

  useEffect(() => {
    setLoading(true);
    fetchContacts(searchTerm, isFavoriteTab)
      .then((fetchedContacts) => {
        setFilteredContacts(fetchedContacts.data);
        if (!isFavoriteTab && searchTerm === "") {
          setContactsCount(
            Array.isArray(fetchedContacts.data)
              ? fetchedContacts.data.length
              : 0
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, isFavoriteTab, refreshKey]);

  const handleEditClick = (contact: ContactType) => {
    setEditData(contact);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDeleteId(null);
  };

  if (loading && !filteredContacts.length) {
    return <TableLoader rows={5} />;
  }

  if (!filteredContacts.length) {
    return <NoContacts searchTerm={searchTerm} />;
  }

  return (
    <>
      <div className="contact-table-container">
        <div className="contact-table-card">
          <table className="contact-table">
            <ContactTableHeader />
            <ContactTableBody
              filteredContacts={filteredContacts}
              showActionId={showActionId}
              setShowActionId={setShowActionId}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </table>
        </div>
      </div>

      {editData && (
        <CreateEditModal
          isOpen={isEditModalOpen}
          handleClose={handleEditModalClose}
          isEdit={true}
          editData={editData}
        />
      )}

      {deleteId && (
        <DeleteModal
          isOpen={Boolean(deleteId)}
          handleClose={handleDeleteClose}
          deleteId={deleteId}
        />
      )}
    </>
  );
};

export default ContactListTable;
