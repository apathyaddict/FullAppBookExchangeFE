import React, { useState, useEffect } from "react";
import adminpagestyle from "../CSS/adminpagestyle.css";
import AddBookForm from "../Components/AddBookForm";
import axios from "axios";
import BookListAdmin from "../Components/BookListAdmin";
import UsersListAdmin from "../Components/UsersListAdmin";
import { useUsersContext } from "../Hooks/useUsersContext";

const AdminPage = ({ addBook, errorMessage, allBooks, setAllBooks }) => {
  const { user } = useUsersContext();
  const [usersList, setUsersList] = useState([]);
  
  const [editedBook, setEditedBook] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [createBookValues, setCreateBookValues] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    synopsis: "",
    language: "",
    pages: "",
    firstPublished: "",
    characters: [],
    authorBio: "",
    lifeChanging: false,
    photoURL: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      });
      setUsersList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/books");
      setAllBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editBook = (book) => {
    setIsEditing(true);
    setEditedBook(book);
    setCreateBookValues(book);
  };



  return (
    <div className="main-profile-div">
      <div className="profile-row-div">
        <AddBookForm
          {...{
            addBook,
            errorMessage,
            editedBook,
            editBook,
            createBookValues,
            setCreateBookValues,
            isEditing,
            setIsEditing,
          }}
        />
      </div>
      <div className="profile-row-div">
        <div className="profile-column-div">
          <h3 className="tagline titlebox"> users database</h3>
          <UsersListAdmin {...{ usersList }} />
        </div>
        <div className="profile-column-div">
          <h3 className="tagline titlebox">Books Database</h3>
          <BookListAdmin books={allBooks} {...{ editBook }} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
