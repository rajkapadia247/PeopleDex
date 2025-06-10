import type { FunctionComponent } from "react";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import { Button } from "@mui/material";

interface HeaderProps {
  activeTab: string;
}

const items = [
  { name: "All Contacts", term: "all" },
  { name: "Favorites", term: "fav" }
];
 
const Header: FunctionComponent<HeaderProps> = ({activeTab}) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (<div className="mainview-header-container">
    <span className="mainview-header">{(items.find(item => item.term === activeTab) || items[0]).name}</span>
    <Button onClick={handleLogout} sx={{marginX: "2rem"}} variant="text">Logout</Button>
  </div>);
}
 
export default Header;