import React, { useContext, useEffect, useState } from "react";
import mybooksstyle from "../CSS/mybooksstyle.css";
import Booklist from "../Components/Booklist";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { UtilityContext } from "../Context/UtilityContext";
import { useGetBooks } from "../Hooks/useGetBooks";
import Spinner from "react-bootstrap/Spinner";

const MybooksPage = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [activeButton, setActiveButton] = useState("myBooks");
  const [myBooks, setMyBooks] = useState([]);
  const { setCurrentUser, currentUser, getCurrent } =
    useContext(CurrentUserContext);
  //const { getBookbyId } = useGetBooks();
  const { isLoading, setIsLoading } = useContext(UtilityContext);

  useEffect(() => {
    handleMyBooks();
  }, []);

  const handleMyBooksClick = () => {
    setActiveButton("myBooks");
    handleMyBooks();
  };

  const handleSavedBooksClick = () => {
    setActiveButton("savedBooks");
    handleSavedBooks();
  };

  const handleSavedBooks = async () => {
    setIsLoading(true);

    try {
      const savedBooksSet = new Set(currentUser.saved);
      const savedBooksArray = Array.from(savedBooksSet);

      setSavedBooks(savedBooksArray);
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMyBooks = async () => {
    const currentUser = await getCurrent();
    setCurrentUser(currentUser);
    setIsLoading(true);

    try {
      const myBooksArray = [];
      if (currentUser.myBooks.length > 0) {
        currentUser.myBooks.forEach((item) => {
          myBooksArray.push(item.bookId);
        });
        setMyBooks(myBooksArray);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="main-div-mybooks">
      <h3 className="tagline">My books</h3>

      <div className="btn-div-mybooks mt-2">
        <button
          className={`button-18 ${activeButton === "myBooks" ? "active" : ""}`}
          onClick={handleMyBooksClick}
        >
          My Books
        </button>
        <button
          className={`button-18 ${
            activeButton === "savedBooks" ? "active" : ""
          }`}
          onClick={handleSavedBooksClick}
        >
          Saved Books
        </button>
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center mb-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden margin">Loading...</span>
          </Spinner>
        </div>
      )}
      <div>
        {!isLoading ? (
          activeButton === "myBooks" ? (
            myBooks.length === 0 ? (
              <p className="mb-2">
                You currently do not own or borrow any books.
              </p>
            ) : (
              <Booklist books={myBooks} />
            )
          ) : savedBooks.length === 0 ? (
            <p className="mb-2">You have not saved any books.</p>
          ) : (
            <Booklist books={savedBooks} />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MybooksPage;
