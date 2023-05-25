
import axios from "axios";
import { useUsersContext } from "./useUsersContext";

export const useUsersFunctionalities = () => {
  const { user } = useUsersContext();

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
      return response.data;

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const updateUserJson = async (userId, updatedData) => {


    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `token ${user.token}`,
            
          },
        }
      );
     
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  return { updateUser, updateUserJson };
};
