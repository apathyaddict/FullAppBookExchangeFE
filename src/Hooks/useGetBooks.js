import axios from "axios";
import { useUsersContext } from "./useUsersContext";

export const useGetBooks = () => {
  const { user } = useUsersContext();

  const getBookbyId = async (bookId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/books/${bookId}`,
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
        `${process.env.REACT_APP_SERVER_URL}/books/${bookId}`,
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
        `${process.env.REACT_APP_SERVER_URL}/books/${bookId}`,
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
