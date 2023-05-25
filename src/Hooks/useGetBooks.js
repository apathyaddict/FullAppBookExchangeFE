import axios from "axios";
import { useUsersContext } from "./useUsersContext";

export const useGetBooks = () => {
  const { user } = useUsersContext();

  const getBookbyId = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/books/${bookId}`,
        {}
      );
      const book = response.data;

      return book;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const updateBook = async (bookId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/books/${bookId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const book = response.data;
 
      

      return {book,response};
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const updateBookJson = async (bookId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/books/${bookId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${user.token}`,
 
          },
        }
      );
      const book = response.data;

      return book;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  return { getBookbyId, updateBook, updateBookJson };
};
