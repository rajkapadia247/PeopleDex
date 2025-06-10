import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState, type FunctionComponent } from "react";
import CreateEditModal from "../../organisms/CreateEditModal/CreateEditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import type { ContactType } from "../../../types/interfaces";

interface TableActionsCellProps {
  showActionId: string;
  rowData: Omit<ContactType, "id"> & { id: string };
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
