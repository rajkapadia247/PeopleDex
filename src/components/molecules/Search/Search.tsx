//@ts-nocheck

import type { FunctionComponent } from "react";
import "./Search.css";

interface SearchProps {
  searchTerm: string;
  searchTermChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  searchTerm,
  searchTermChangeHandler,
}) => {
  const handleClearSearch = () => {
    searchTermChangeHandler({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <div className="search-icon">
          <ion-icon name="search-outline" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={searchTermChangeHandler}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-button"
            onClick={handleClearSearch}
            title="Clear search"
          >
            <ion-icon name="close-outline" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
