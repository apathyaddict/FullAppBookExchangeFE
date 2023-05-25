import React, { useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useGetBooks } from "../Hooks/useGetBooks";
import { UtilityContext } from "../Context/UtilityContext";
import ToastNotif from "../Components/ToastNotif";

const AddBookForm = ({
  addBook,
  errorMessage,
  editedBook,
  createBookValues,
  setCreateBookValues,
  isEditing,
  setIsEditing,
}) => {
  const { updateBook } = useGetBooks();
  const { bodyToast, setBodyToast, showToast, setShowToast, handleCloseToast } =
    useContext(UtilityContext);
  const [photoURL, setPhotoURL] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setCreateBookValues((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "characters") {
      const charactersArr = value.split(",");
      setCreateBookValues((prevState) => ({
        ...prevState,
        characters: charactersArr,
      }));
    } else {
      setCreateBookValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitBook = async (event) => {
    event.preventDefault();
    setIsEditing(false);
    setShowToast(false);
    try {
      const productData = new FormData();

      for (const key in createBookValues) {
        productData.append(key, createBookValues[key]);
      }
      productData.append("photoURL", photoURL);

      addBook(productData);

      setCreateBookValues({
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
      });

      setPhotoURL("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    //turn off toast
    setShowToast(false);
    //set editing functionality
    setIsEditing(false);

    try {
      const updatedData = new FormData();
      for (const key in createBookValues) {
        updatedData.append(key, createBookValues[key]);
      }
      if (photoURL) {
        updatedData.append("photoURL", photoURL);
      }

      const response = await updateBook(editedBook._id, updatedData);

      if (response.response.status === 200) {
        setCreateBookValues({
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
        });
        setPhotoURL("");
        setShowToast(true);
        setBodyToast("Book edited");
      } else {
        setIsEditing(true);
        setShowToast(true);
        setBodyToast("an error occurred, sorry!");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
  
      }
    }
  };

  return (
    <div className="add-book-div">
      <h3 className="tagline titlebox mx-3 mt-3 mb-3">
        {" "}
        {!isEditing ? "add book" : "edit book"}
      </h3>
      <form className="addbook-form">
        <ul className="div-add-book-ul">
          <li>
            <p>Title:</p>
            <input
              className="input-field"
              type="text"
              name="title"
              value={createBookValues.title}
              onChange={handleInputChange}
              required
              aria-label="Title (required)"
            />
          </li>
          <li>
            <p>Author:</p>
            <input
              className="input-field"
              type="text"
              name="author"
              value={createBookValues.author}
              onChange={handleInputChange}
              required
              aria-label="Title (required)"
            />
          </li>
          <li>
            <p>Genre:</p>
            <input
              className="input-field"
              type="text"
              name="genre"
              value={createBookValues.genre}
              onChange={handleInputChange}
            />
          </li>

          <li>
            <p>Status:</p>
            <input
              type="radio"
              name="status"
              value="available"
              checked={createBookValues.status === "available"}
              onChange={handleInputChange}
            />
            <span className="span-checkbox"> available</span>
            <input
              type="radio"
              name="status"
              value="borrowed"
              checked={createBookValues.status === "borrowed"}
              onChange={handleInputChange}
            />
            <span className="span-checkbox"> borrowed</span>
            <input
              type="radio"
              name="status"
              value="kept"
              checked={createBookValues.status === "kept"}
              onChange={handleInputChange}
            />
            <span className="span-checkbox"> kept</span>
          </li>
          <li>
            <p>Synopsis:</p>
            <TextareaAutosize
              id="synopsis"
              name="synopsis"
              value={createBookValues.synopsis}
              onChange={handleInputChange}
              minRows={1}
            />
          </li>
          <li>
            <p>Language:</p>
            <select
              name="language"
              value={createBookValues.language}
              onChange={handleInputChange}
            >
              <option value="">select...</option>
              <option value="English">English </option>
              <option value="French">French </option>
              <option value="iItalian">Italian </option>
              <option value="Greek">Greek </option>
            </select>
          </li>
          <li>
            <p>Pages:</p>
            <input
              className="input-field"
              type="number"
              name="pages"
              value={createBookValues.pages}
              onChange={handleInputChange}
            />
          </li>

          <li>
            <p>First Published:</p>
            <input
              className="input-field"
              type="text"
              name="firstPublished"
              value={createBookValues.firstPublished}
              onChange={handleInputChange}
            />
          </li>

          <li>
            <p>Characters: (separate with commas)</p>
            <TextareaAutosize
              className="input-field"
              type="text"
              id="characters"
              name="characters"
              value={createBookValues.characters}
              onChange={handleInputChange}
              minRows={1}
            />
          </li>
          <li>
            <p>Author's biography snippet:</p>
            <TextareaAutosize
              className="input-field"
              id="authorsbio"
              name="authorBio"
              value={createBookValues.authorBio}
              onChange={handleInputChange}
              minRows={1}
            />
          </li>

          <li>
            <p>Life Changing:</p>
            <input
              type="checkbox"
              name="lifeChanging"
              value="yes"
              checked={createBookValues.lifeChanging}
              onChange={handleInputChange}
            />
            <span className="span-checkbox"> yes</span>
            <input
              type="checkbox"
              name="lifeChanging"
              value="no"
              checked={!createBookValues.lifeChanging}
              onChange={handleInputChange}
            />
            <span className="span-checkbox"> no</span>
          </li>

          <li>
            <p>Upload Image:</p>
            <input
              className="input-field"
              type="file"
              accept="image/*"
              name="photoURL"
              onChange={(e) => setPhotoURL(e.target.files[0])}
            />
          </li>
        </ul>

        {errorMessage && <div className="div-error"> {errorMessage} </div>}
        <div className="div-form-btn">
          {!isEditing ? (
            <button type="submit" className="button-18" onClick={submitBook}>
              Add book
            </button>
          ) : (
            <button
              type="submit"
              className="button-18"
              onClick={handleEditBook}
            >
              Edit book
            </button>
          )}
        </div>
      </form>
      <ToastNotif {...{ showToast, bodyToast }} onClose={handleCloseToast} />
    </div>
  );
};

export default AddBookForm;
