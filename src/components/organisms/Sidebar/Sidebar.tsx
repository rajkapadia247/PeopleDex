import { useContext, type FunctionComponent } from "react";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import "./../../sidebar.css";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { Button } from "@mui/material";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {}

const sideBarItems = [
  { name: "All Contacts", term: "all" },
  { name: "Favorites", term: "fav" },
];

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const { logout } = useAuth();
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="sidebar">
      <h1 className="sidebar-header">Contacts</h1>
      <ul className="sidebar-list">
        {sideBarItems.map((item, index) => {
          const isActiveTab = item.term === activeTab;
          return (
            <li
              key={index}
              className={`sidebar-list-item ${
                isActiveTab ? "selected" : ""
              }`}
            >
              <Button
                sx={{
                  color: "unset",
                  margin: "unset",
                  padding: "unset",
                  ":hover": {
                    backgroundColor: "unset"
                  }
                }}
                disableRipple
                onClick={() => {
                  if (!isActiveTab) setActiveTab(item.term);
                }}
              >
                {item.name}
              </Button>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-action-button-container">
        <ActionButton />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
