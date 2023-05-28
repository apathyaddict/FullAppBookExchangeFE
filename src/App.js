import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import NavBar from "./Components/NavBar";
import { useUsersContext } from "./Hooks/useUsersContext";
import HomePage from "./Pages/HomePage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import MybooksPage from "./Pages/MybooksPage";
import ProfilePage from "./Pages/ProfilePage";
import BooksDetailPage from "./Components/BooksDetailPage";
import AdminPage from "./Pages/AdminPage";
import { CurrentUserContext } from "../src/Context/CurrentUserContext";
import { UtilityContext } from "./Context/UtilityContext";
import { useLogout } from "../src/Hooks/useLogout";
import UsuerIdPage from "./Components/UsuerIdPage";

function App() {
  const { user } = useUsersContext();
  const { setBodyToast, setShowToast, show, setShow, setIsLoading } =
    useContext(UtilityContext);
  const { logout } = useLogout();

  const { currentUser } = useContext(CurrentUserContext);
  const [allBooks, setAllBooks] = useState([]);

  const handleClose = () => setShow(false);

  const openModal = () => {
    setShow(true);
  };

  const handleLogoutClick = () => {
    logout();
     
  };

  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const getBooks = async (
    selectedGenre,
    query,
    isAvailable,
    pages,
    language,
    author
  ) => {
    setErrorMessage(null);
    setBooks([])
    try {
      setIsLoading(true);
      let params = {};

      if (
        selectedGenre ||
        query ||
        isAvailable ||
        pages ||
        language ||
        author
      ) {
        params = {
          params: {
            genre: selectedGenre,
            title: query,
            status: isAvailable,
            pages: pages,
            language: language,
            author: author,
          },
        };
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`, params);

        setIsLoading(false);
        setBooks(res.data);
      } else {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books`);
        setIsLoading(false);
        setBooks(res.data);
        return res.data
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      }
    }
  };

  const addBook = async (newBook) => {
    if (!user) {
      setErrorMessage("You must be logged in");
      return;
    }

    //TODO: add loading
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/books`, newBook, {
        headers: {
          Authorization: `token ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then(function (response) {
        setAllBooks([...allBooks, response.data]);

        setErrorMessage("");

        setShowToast(true);
        setBodyToast("Book Added");
      })

      .catch(function (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      });
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          {...{ openModal, show, setShow, handleClose, handleLogoutClick }}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage {...{ openModal, handleLogoutClick }} />}
          />

          <Route
            path="/search"
            element={<SearchPage {...{ books, getBooks, errorMessage }} />}
          />
          <Route
            path="/mybooks"
            element={
              user ? <MybooksPage {...{ books }} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route path="/books/:id" element={<BooksDetailPage />} />
          <Route
            path="/users/:id"
            element={user ? <UsuerIdPage /> : <Navigate to="/" />}
          />

          <Route
            path="/admin"
            element={
              currentUser.isAdmin ? (
                <AdminPage
                  {...{ addBook, errorMessage, allBooks, setAllBooks }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
