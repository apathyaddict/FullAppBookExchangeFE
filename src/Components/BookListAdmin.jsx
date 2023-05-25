import React from "react";

const BookListAdmin = ({ books, editBook }) => {

  const handleEdit = (book) => {
    editBook(book)
  };

  return (
    <ul className="books-db">
      {books.map((book) => (
        <li key={book._id}>
          <div >
            <p>{book.title}</p>
            <p>{book.author}</p>
            <span>{book.status}</span>
          </div>
          <div>
            <button className="edit-button" onClick={() => handleEdit(book)}>
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookListAdmin;
