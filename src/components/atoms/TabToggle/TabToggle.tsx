import { type FunctionComponent } from "react";
import "./TabToggle.css";

interface TabToggleProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabToggle: FunctionComponent<TabToggleProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="tab-toggle">
      <button
        className={`tab-toggle-button ${activeTab === "all" ? "active" : ""}`}
        onClick={() => onTabChange("all")}
      >
        <ion-icon name="people-outline"></ion-icon>
        All
      </button>
      <button
        className={`tab-toggle-button ${activeTab === "fav" ? "active" : ""}`}
        onClick={() => onTabChange("fav")}
      >
        <ion-icon name="star-outline"></ion-icon>
        Favorites
      </button>
    </div>
  );
};

export default TabToggle;
