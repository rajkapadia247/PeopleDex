import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useContext, useState, type FunctionComponent } from "react";
import CreateEditModal from "./CreateEditModal";
import DeleteModal from "./DeleteModal";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite } from "../utils/api";
import RefreshDataContext from "../contexts/RefreshDataContext";

interface TableActionsCellProps {
  showActionId: string;
  rowData: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    company?: string;
    favorite: boolean;
  };
}

const TableActionsCell: FunctionComponent<TableActionsCellProps> = ({
  showActionId,
  rowData,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { incrementRefreshKey } = useContext(RefreshDataContext);


  const toggleFavoriteState = async () => {
    await toggleFavorite(rowData.id);
    incrementRefreshKey();
  };
  const handleEditOpen = () => {
    setIsEditOpen(true);
  };
  const handleDeleteOpen = () => {
    setIsDeleteOpen(true);
  };
  const getFavoriteIcon = () => {
    if (rowData.favorite) {
      return <StarIcon color="primary" fontSize="small" />;
    } else {
      return <StarBorderIcon color="action" fontSize="small" />;
    }
  };
  return (
    <div>
      {rowData.id === showActionId ? (
        <>
          <div
            style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}
          >
            <IconButton
              id="basic-button"
              onClick={toggleFavoriteState}
              size="small"
            >
              {getFavoriteIcon()}
            </IconButton>
            <IconButton id="basic-button" onClick={handleEditOpen} size="small">
              <EditIcon color="action" fontSize="small" />
            </IconButton>
            <IconButton
              id="basic-button"
              onClick={handleDeleteOpen}
              size="small"
            >
              <DeleteIcon color="action" fontSize="small" />
            </IconButton>
          </div>
          <CreateEditModal
            isOpen={isEditOpen}
            handleClose={() => {
              setIsEditOpen(false);
            }}
            isEdit={true}
            editData={rowData}
          />
          <DeleteModal
            isOpen={isDeleteOpen}
            handleClose={() => {
              setIsDeleteOpen(false);
            }}
            deleteId={rowData.id}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableActionsCell;
