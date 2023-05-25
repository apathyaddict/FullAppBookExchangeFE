import { useState, useContext } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from "axios";
import { UtilityContext } from "../Context/UtilityContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUsersContext();
  const { setShow } = useContext(UtilityContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
      email, password
    })
    .then(function (response) {
      const json = response.data ;
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
      setShow(false);
    
    })
    
    .catch(function (error) {
      if (error.response) {
      setIsLoading(false);
 
      setError(error.response.data.message);

      }
    });
  
  }


  return { login, isLoading, error };
};
