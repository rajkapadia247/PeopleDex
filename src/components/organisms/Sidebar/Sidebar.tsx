//@ts-nocheck

import { useContext, useEffect, useState, type FunctionComponent } from "react";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import Logo from "../../atoms/Logo/Logo";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import RefreshDataContext from "../../../contexts/RefreshDataContext/RefreshDataContext";
import "../../sidebar.css";

interface SidebarProps {}

const sideBarItems = [
  {
    name: "All Contacts",
    term: "all",
    icon: <ion-icon name="people-outline" />,
  },
  { name: "Favorites", term: "fav", icon: <ion-icon name="star-outline" /> },
];

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const { contactsCount } = useContext(RefreshDataContext);

  const handleTabClick = (term: string) => {
    if (activeTab !== term) {
      setActiveTab(term);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo size="large" className="sidebar-logo" />
      </div>

      <div className="sidebar-nav">
        <ActionButton />
        <ul className="sidebar-list">
          {sideBarItems.map((item) => {
            const isActiveTab = item.term === activeTab;
            return (
              <li key={item.term} className="sidebar-list-item">
                <button
                  className={`sidebar-list-button ${
                    isActiveTab ? "selected" : ""
                  }`}
                  onClick={() => handleTabClick(item.term)}
                >
                  <div className="sidebar-list-icon">{item.icon}</div>
                  <span className="sidebar-list-text">
                    {item.name}
                    {item.term === "all" && (
                      <span className="sidebar-count-badge">
                        {contactsCount ?? "-"}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
