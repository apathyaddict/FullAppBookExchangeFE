import React from "react";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="result-card">
        <div>
          <h3>{book.title}</h3>
        </div>
        <div>
          <img src={book.photoURL} alt="Book Cover" />
        </div>
        <br></br>
        <div className="card-bottom">
          <h4> {book.author}</h4>
          <p> {book.status}</p>
        </div>

        <button
          className="btn-seemore"
          onClick={() => navigate(`/book/${book._id}`)}
        >
          See more
        </button>
      </div>
    </>
  );
};

export default Book;
