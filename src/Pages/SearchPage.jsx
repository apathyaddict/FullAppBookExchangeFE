import React, { useState, useContext } from "react";
import searchpage from "../CSS/searchpage.css";
import Booklist from "../Components/Booklist";
import SearchInput from "../Components/SearchInput";
import Spinner from "react-bootstrap/Spinner";
import { UtilityContext } from "../Context/UtilityContext";

const SearchPage = ({ books, getBooks, errorMessage }) => {
  const [query, setQuery] = useState("");
  const { isLoading } = useContext(UtilityContext)

  const getSearchBooks = async (selectedGenre, query, isAvailable, pages, author, language) => {

    await getBooks(selectedGenre, query, isAvailable, pages, author, language);
    
  };


  return (
    <>
      <div className="main-content-search">
        <SearchInput {...{ setQuery, getSearchBooks, query }} />
        {isLoading &&(
        <div className="d-flex justify-content-center mb-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden margin">Loading...</span>
          </Spinner>
        </div>)}
        
        {errorMessage && <div className="error-div"> There are no books matching your search. Please try again.</div>}
       
        <Booklist {...{ books }} />
      </div>
    </>
  );
};

export default SearchPage;
