import React from "react";
import { FaSearch } from "../react-icon";

const SearchBar = ({ setKeyword, keyword, searchData }) => {
  return (
    <div className=" w-50 mt-1">
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn" type="button">
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
