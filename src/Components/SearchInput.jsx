import React, { useState } from "react";
import searchpage from "../CSS/searchpage.css";
import GenreSearchComponent from "./GenreSearchComponent";

const SearchInput = ({ setQuery, getSearchBooks, query }) => {
  const [ischeckedSearch, setIscheckedSearch] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [pages, setPages] = useState(null);
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");


  const handleCheckSearch = () => {
    setIscheckedSearch(!ischeckedSearch);
  };

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };


  const handleAvailability = (e) => {
    setIsAvailable(e.target.value);
  };

  const handlePages = (e) => {
    setPages(parseInt(e.target.value));
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };
  
  return (
    <div className="wrapper">
      <div className="label">Books Await</div>
      <div className="searchBar">
        <input
          id="searchQueryInput2"
          type="text"
          placeholder="search"
          onChange={handleSearchInput}
        />
        <button
          id="searchQuerySubmit2"
          type="submit"
          onClick={() => getSearchBooks(selectedGenre, query, isAvailable, pages, language, author  )}
        >
          <span className="material-symbols-outlined" id="loupe">
            search
          </span>
        </button>
      </div>
      <div className="div-select-search">
        <GenreSearchComponent
          {...{ ischeckedSearch, setSelectedGenre, selectedGenre }}
        />
        <div>
          <span className="search-type">
            advanced search: &nbsp;
            <input type="checkbox" onChange={handleCheckSearch} />
            <span className="checkmark"></span>
          </span>
        </div>
      </div>
      {ischeckedSearch ? (
        <div className="advanced-search">
          <ul>
            <li>
              <span className="search-text-adv">Availability: </span>
              <select onChange={handleAvailability}>
                <option value="">any</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="kept">Kept</option>
              </select>
            </li>
            <li>
              <span className="search-text-adv" >page count: </span>
              <input
                className="input-field"
                placeholder="enter a number..."
                onChange={handlePages}
                type="number" 
                min="1" max="2000"
                name="pages"
              />
            </li>
            <li>
              <span className="search-text-adv">language: </span>
              <input
                className="input-field"
                type="text"
                onChange={handleLanguage}
                name="language"
              />
            </li>
            <li>
              <span className="search-text-adv">author: </span>
              <input
                className="input-field"
                type="text"
                onChange={handleAuthor}
                name="author"
              />
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
