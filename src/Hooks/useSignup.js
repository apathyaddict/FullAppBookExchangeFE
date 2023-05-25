import { useState, useContext } from "react";
import { useUsersContext } from "./useUsersContext";
import axios from "axios";
import { UtilityContext } from "../Context/UtilityContext";

export const useSignup = () => {
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUsersContext();
  const { setShow } = useContext(UtilityContext);

  const signup = async (email, password, firstName, lastName, phoneNum) => {
    setIsLoading(true);
    setErrorSignUp(null);

    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
        email,
        password,
        firstName,
        lastName,
        phoneNum,
      })

      .then(function (response) {
        const json = response.data;
        //  save the user to local storage
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
          setErrorSignUp(error.response.data.message || error.response.data.error);
   
        }
      });
  };

  return { signup, isLoading, errorSignUp, setErrorSignUp };
};
