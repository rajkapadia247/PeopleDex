//@ts-nocheck

import { useContext, type FunctionComponent } from "react";
import { toggleFavorite } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import type { ContactType } from "../../../types/interfaces";
import "./TableActionsCell.css";

interface TableActionsCellProps {
  showActionId: string;
  rowData: Omit<ContactType, "id"> & { id: string };
  onEditClick: (contact: ContactType) => void;
  onDeleteClick: (id: string) => void;
}

const TableActionsCell: FunctionComponent<TableActionsCellProps> = ({
  showActionId,
  rowData,
  onEditClick,
  onDeleteClick,
}) => {
  const { incrementRefreshKey } = useContext(RefreshDataContext);

  const toggleFavoriteState = async () => {
    await toggleFavorite(rowData.id);
    incrementRefreshKey();
  };

  const handleEditClick = () => {
    onEditClick(rowData);
  };

  const handleDeleteOpen = () => {
    onDeleteClick(rowData.id);
  };

  const getFavoriteIcon = () => {
    if (rowData.favorite) {
      return <ion-icon name="star" />;
    } else {
      return <ion-icon name="star-outline" />;
    }
  };

  if (rowData.id !== showActionId) {
    return <div></div>;
  }

  return (
    <div>
      <div className="table-actions-container">
        <button
          className={`table-action-button ${
            rowData.favorite ? "favorite" : "favorite-empty"
          }`}
          onClick={toggleFavoriteState}
          title={
            rowData.favorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {getFavoriteIcon()}
        </button>

        <button
          className="table-action-button edit"
          onClick={handleEditClick}
          title="Edit contact"
        >
          <ion-icon name="create-outline" />
        </button>

        <button
          className="table-action-button delete"
          onClick={handleDeleteOpen}
          title="Delete contact"
        >
          <ion-icon name="trash-outline" />
        </button>
      </div>
    </div>
  );
};

export default TableActionsCell;
