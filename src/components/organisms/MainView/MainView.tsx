import { useContext, useMemo, useState, type FunctionComponent } from "react";
import ContactListTable from "../ContactListTable/ContactListTable";
import "./../../mainview.css";
import Search from "../../molecules/Search/Search";
import ActiveTabContext from "../../../contexts/ActiveTabContext/ActiveTabContext";
import { debounce } from "../../../utils/utils";
import Header from "../../molecules/Header/Header";
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
      <Header activeTab={activeTab}/>
      <Search searchTerm={searchTerm} searchTermChangeHandler={searchTermChangeHandler} />
      <ContactListTable searchTerm={searchTermForAPI} isFavoriteTab={activeTab === "fav"} />
    </div>
  );
};

export default MainView;
