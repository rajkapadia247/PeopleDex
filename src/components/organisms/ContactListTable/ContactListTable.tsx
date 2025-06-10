import { useContext, useEffect, useState, type FunctionComponent } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableActionsCell from "../../molecules/TableActionsCell/TableActionsCell";
import "./../../contactlisttable.css";
import { fetchContacts } from "../../../utils/api";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";

interface ContactListTableProps {
  searchTerm: string;
  isFavoriteTab: boolean;
}

interface RowData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  favorite: boolean;
}

const ContactListTable: FunctionComponent<ContactListTableProps> = ({
  searchTerm,
  isFavoriteTab,
}) => {
  const [showActionId, setShowActionId] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([])

  const { refreshKey } = useContext(RefreshDataContext);

  useEffect(() => {
    fetchContacts(searchTerm, isFavoriteTab).then((fetchedContacts) => {
      setFilteredContacts(fetchedContacts.data);
    })
  }, [searchTerm, isFavoriteTab, refreshKey])

  return (
    <div className="contact-table">
      {filteredContacts.length > 0 ?  (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafa" }}>
                <TableCell width="22%">Name</TableCell>
                <TableCell width="22%">Email</TableCell>
                <TableCell width="22%">Phone</TableCell>
                <TableCell width="22%">Company</TableCell>
                <TableCell align="right" width="12%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.map(
                (row: RowData) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onMouseEnter={() => {
                      setShowActionId(row.id);
                    }}
                    onMouseLeave={() => setShowActionId("")}
                  >
                    <TableCell component="th" scope="row" width="22%">
                      {row.name}
                    </TableCell>
                    <TableCell width="22%">{row.email}</TableCell>
                    <TableCell width="22%">{row.phone}</TableCell>
                    <TableCell width="22%">{row.company}</TableCell>
                    <TableCell align="right" width="12%">
                      <TableActionsCell
                        showActionId={showActionId}
                        rowData={row}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : "No contacts to display."}
    </div>
  );
};

export default ContactListTable;
