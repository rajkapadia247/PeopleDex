import { useContext, useMemo, useState, type FunctionComponent } from "react";
import ContactListTable from "../ContactListTable/ContactListTable";
import Search from "../../molecules/Search/Search";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { debounce } from "../../../utils/utils";
import { useAuth } from "../../../contexts/AuthContext/useAuth";
import "./MainView.css";

interface MainViewProps {}

const MainView: FunctionComponent<MainViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermForAPI, setSearchTermForAPI] = useState("");
  const { activeTab } = useContext(ActiveTabContext);
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

  return (
    <div className="mainview">
      <div className="mainview-container">
        <div className="mainview-section mainview-topbar">
          <Search
            searchTerm={searchTerm}
            searchTermChangeHandler={searchTermChangeHandler}
          />
          <div className="mainview-right-actions">
            <span className="mainview-greeting">
              Hi, {user?.name || "User"}
            </span>
            <UserMenu user={user} logout={logout} />
          </div>
        </div>

        <div className="mainview-section mainview-table-section">
          <ContactListTable
            searchTerm={searchTermForAPI}
            isFavoriteTab={activeTab === "fav"}
          />
        </div>
      </div>
    </div>
  );
};

export default MainView;
