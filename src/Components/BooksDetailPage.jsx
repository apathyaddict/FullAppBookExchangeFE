import React, { useState, useContext, useEffect } from "react";
import mybooksstyle from "../CSS/mybooksstyle.css";
import { useParams } from "react-router-dom";
import { HiHeart, HiInboxArrowDown, HiBookOpen } from "react-icons/hi2";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { useUsersFunctionalities } from "../Hooks/useUsersFunctionalities";
import { useGetBooks } from "../Hooks/useGetBooks";
import { useUsersContext } from "../Hooks/useUsersContext";
import { UtilityContext } from "../Context/UtilityContext";
import ToastNotif from "../Components/ToastNotif";

import axios from "axios";

const BooksDetailPage = () => {
  const { id } = useParams();
  const { user } = useUsersContext();
  const { bodyToast, setBodyToast, showToast, setShowToast, handleCloseToast } =
    useContext(UtilityContext);
  const { updateUserJson } = useUsersFunctionalities();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isActive, setIsActive] = useState("");
  const { updateBookJson, getBookbyId } = useGetBooks();
  const [selectedBook, setSelectedBook] = useState({});
  const [hasBook, setHasBook] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleFetchBook = async () => {
      try {
        const book = await getBookbyId(id);

        setSelectedBook(book);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
      }
    };
    handleFetchBook();
  }, []);

  useEffect(() => {
    //because the books are a ref in the Users, the array looks different in each case, so I need a conditional statement to check both
    if (
      (currentUser &&
        currentUser.saved &&
        currentUser.saved.some((book) => book._id === id)) ||
      isSaved
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentUser.saved, isSaved]);

  useEffect(() => {
    const checkOwnedBooks =
      currentUser &&
      currentUser.myBooks &&
      (currentUser.myBooks.some((book) => book.bookId._id === id) || hasBook);
    setHasBook(checkOwnedBooks);
    console.log(hasBook);
  }, [currentUser, currentUser.myBooks]);

  // Save book in arry in users
  const handleSave = async (bookId) => {
    if (isActive) {
      //Remove the book from the saved list
      const updatedData = {
        savedItemToDelete: bookId,
      };

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/save`,
          updatedData,
          {
            headers: {
              Authorization: `token ${user.token}`,
            },
          }
        );

        setIsSaved(response.data.saved.includes(id));

        setCurrentUser(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
      }
    } else {
      // Add the book to the saved list
      try {
        const updatedData = {
          savedItemToAdd: bookId,
        };

        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/save`,
          updatedData,
          {
            headers: {
              Authorization: `token ${user.token}`,
            },
          }
        );

        setIsSaved(response.data.saved.includes(id));
        setCurrentUser(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
      }
    }
  };

  const handleBorrow = async () => {
    const bookId = selectedBook._id;
    setShowToast(false);

    if (selectedBook.status === "available") {
      const updatedData = {
        myBooks: [
          ...currentUser.myBooks,
          {
            bookId: bookId,
            status: "borrowed",
          },
        ],
      };

      const updatedBookData = {
        status: "borrowed",
      };

      const updatedBook = await updateBookJson(bookId, updatedBookData);
      setSelectedBook(updatedBook);
      const updatedUser = await updateUserJson(currentUser._id, updatedData);
      setCurrentUser(updatedUser);
      setHasBook(updatedUser.myBooks.some((book) => book.bookId === id));
      setBodyToast("You just borrowed an awesome book!");
      setShowToast(true);
    } else {
      console.log("book not available to borrow");
    }
  };

  const handleKeep = async () => {
    setShowToast(false);
    const bookId = selectedBook._id;

    if (
      selectedBook.status === "borrowed" ||
      selectedBook.status === "available"
    ) {
      let updatedData;
      if (currentUser.myBooks.find((book) => book.bookId === bookId)) {
        // Book already exists in myBooks, update its status
        updatedData = {
          myBooks: currentUser.myBooks.map((book) =>
            book.bookId === bookId ? { ...book, status: "kept" } : book
          ),
        };
      } else {
        // Add the book to myBooks with "kept" status
        updatedData = {
          myBooks: [
            ...currentUser.myBooks,
            {
              bookId: bookId,
              status: "kept",
            },
          ],
        };
      }

      const updatedBookData = {
        status: "kept",
      };

      const updatedBook = await updateBookJson(bookId, updatedBookData);
      setSelectedBook(updatedBook);
      const updatedUser = await updateUserJson(currentUser._id, updatedData);
      //necessary for the ref mongo use
      setHasBook(updatedUser.myBooks.some((book) => book.bookId === id));

      setCurrentUser(updatedUser);

      setBodyToast("The book is yours to keep now!");
      setShowToast(true);
    } else {
      console.log("book not available to keep");
    }
  };

  const handleReturn = async () => {
    const bookId = selectedBook._id;
    setShowToast(false);

    if (selectedBook.status === "borrowed" || selectedBook.status === "kept") {
      const updatedData = {
        itemToDelete: bookId,
      };
      const updatedBookData = {
        status: "available",
      };

      const updatedBook = await updateBookJson(bookId, updatedBookData);
      setSelectedBook(updatedBook);

      const updatedUser = await updateUserJson(currentUser._id, updatedData);
      setCurrentUser(updatedUser);
      setHasBook(updatedUser.myBooks.some((book) => book.bookId === id));
      setBodyToast("Thanks for returning the book");
      setShowToast(true);
    } else {
      console.log("book not available to return");
    }
  };

  return (
    <div className="div-book-detail-main">
      <p className="Book-title">{selectedBook.title}</p>

      <div className="main-flex-detail">
        <div className="left-div-book">
          <img src={selectedBook.photoURL} alt="cover" />
        </div>
        <div className="right-div-book">
          <ul className="div-book-detail-ul">
            {user &&
            <div>
              <button
                type="submit"
                className={`btn-seemore ${isActive ? "active" : ""}`}
                onClick={() => handleSave(selectedBook._id)}
              >
                Read Later <HiHeart />
              </button>
              {selectedBook.status === "borrowed" ||
              selectedBook.status === "kept" ? (
                ""
              ) : (
                <button
                  type="submit"
                  className="btn-seemore"
                  onClick={handleBorrow}
                >
                  Borrow <HiBookOpen />
                </button>
              )}
              {(selectedBook.status === "borrowed" && hasBook) ||
              selectedBook.status === "available" ? (
                <button
                  type="submit"
                  className="btn-seemore"
                  onClick={handleKeep}
                >
                  Keep <HiInboxArrowDown />
                </button>
              ) : (
                ""
              )}

              {(selectedBook.status === "borrowed" && hasBook) ||
              (selectedBook.status === "kept" && hasBook) ? (
                <button
                  type="submit"
                  className="btn-seemore"
                  onClick={handleReturn}
                >
                  Return <HiInboxArrowDown />
                </button>
              ) : (
                ""
              )}
            </div>}
            <li>
              <h4>Status:</h4>
              <p>{selectedBook.status}</p>
            </li>
            <li>
              <h4>Author:</h4>
              <p>{selectedBook.author}</p>
            </li>
            <li>
              <h4>Genre:</h4>
              <p>{selectedBook.genre}</p>
            </li>

            <li>
              <h4>Synopsis:</h4>
              <p>{selectedBook.synopsis}</p>
            </li>
            <li>
              <h4>Author's bio:</h4>
              <p>{selectedBook.authorBio}</p>
            </li>
            <li>
              <h4>Language:</h4>
              <p>{selectedBook.language}</p>
            </li>
            <li>
              <h4>Pages:</h4>
              <p>{selectedBook.pages}</p>
            </li>

            <li>
              <h4>First Published:</h4>
              <p>{selectedBook.firstPublished}</p>
            </li>

            <li>
              <h4>Characters:</h4>
              <ul>
                {selectedBook.characters
                  ? selectedBook.characters.map((character, index) => (
                      <li key={index} className="d-inline mx-2">
                        <p>{character}</p>
                      </li>
                    ))
                  : ""}
              </ul>
            </li>
            <li>
              <h4>Life Changing:</h4>
              <p>{selectedBook.lifeChanging ? "Yes" : "No"}</p>
            </li>
          </ul>
        </div>
      </div>
      <ToastNotif {...{ showToast, bodyToast }} onClose={handleCloseToast} />
    </div>
  );
};

export default BooksDetailPage;
