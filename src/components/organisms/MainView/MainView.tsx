import { useContext, useMemo, useState, type FunctionComponent } from "react";
import ContactListTable from "../ContactListTable/ContactListTable";
import "./../../mainview.css";
import Search from "../../molecules/Search/Search";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { debounce } from "../../../utils/utils";
interface MainViewProps {}

const items = [
  { name: "All Contacts", term: "all" },
  { name: "Favorites", term: "fav" }
];

const MainView: FunctionComponent<MainViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermForAPI, setSearchTermForAPI] = useState("");
  const { activeTab } = useContext(ActiveTabContext);

  const debouncedSetSearchTermForAPI = useMemo(
    () => debounce((val: string) => setSearchTermForAPI(val), 500),
    []
  );
  const searchTermChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSetSearchTermForAPI(val);
  }
  return (
    <div className="mainview">
      <div className="mainview-header-container">
        <span className="mainview-header">{(items.find(item => item.term === activeTab) || items[0]).name}</span>
        <Search searchTerm={searchTerm} searchTermChangeHandler={searchTermChangeHandler} />
      </div>
      <ContactListTable searchTerm={searchTermForAPI} isFavoriteTab={activeTab === "fav"} />
    </div>
  );
};

export default MainView;
