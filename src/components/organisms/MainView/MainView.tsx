import { useContext, useMemo, useState, type FunctionComponent } from "react";
import ContactListTable from "../ContactListTable/ContactListTable";
import Search from "../../molecules/Search/Search";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import AddButton from "../../atoms/AddButton/AddButton";
import TabToggle from "../../atoms/TabToggle/TabToggle";
import CreateEditModal from "../CreateEditModal/CreateEditModal";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { debounce } from "../../../utils/utils";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import "./MainView.css";

interface MainViewProps {}

const MainView: FunctionComponent<MainViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermForAPI, setSearchTermForAPI] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const { user, logout } = useAuth();

  const debouncedSetSearchTermForAPI = useMemo(
    () => debounce((val: string) => setSearchTermForAPI(val), 500),
    []
  );

  const searchTermChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSetSearchTermForAPI(val);
  };

  const handleAddContact = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mainview">
      <div className="mainview-container">
        <div className="mainview-section mainview-topbar">
          <div className="mainview-search-section">
            <Search
              searchTerm={searchTerm}
              searchTermChangeHandler={searchTermChangeHandler}
            />
            <AddButton onClick={handleAddContact} />
          </div>
          <div className="mainview-right-actions">
            <span className="mainview-greeting">
              Hi, {user?.name || "User"}
            </span>
            <UserMenu user={user} logout={logout} />
          </div>
        </div>

        <div className="mainview-section mainview-controls">
          <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="mainview-section mainview-table-section">
          <ContactListTable
            searchTerm={searchTermForAPI}
            isFavoriteTab={activeTab === "fav"}
          />
        </div>
      </div>

      <CreateEditModal
        isOpen={isCreateModalOpen}
        handleClose={handleCreateModalClose}
        isEdit={false}
      />
    </div>
  );
};

export default MainView;
