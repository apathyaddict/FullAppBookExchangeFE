import React, {useState} from "react";
import { Pagination } from "react-bootstrap";
import Book from "./Book";

const Booklist = ({ books}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;



  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];

    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className="div-result-grid">
    <ul className="result-grid">
      {displayedBooks.map((book) => (
        <Book book={book} key={book._id} />
      ))}
    </ul>

{(books.length>8) &&
    <Pagination className="pagination-custom"
    style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
      <Pagination.Prev className="text-secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {renderPaginationItems()}
      <Pagination.Next 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>}
  </div>
  );
};





export default Booklist;
