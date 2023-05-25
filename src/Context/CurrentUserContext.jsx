import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUsersContext } from "../Hooks/useUsersContext";

export const CurrentUserContext = createContext();

export function CurrentUserProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useUsersContext();

  useEffect (() =>{
    if(user){
      getCurrent()
    }
  },[user])

  const getCurrent = async () =>{
    try{

    const res = await axios.get(`http://localhost:8080/users/${user._id}`, {
      headers: {
        Authorization: `token ${user.token}`,
      },
      
    });

    setCurrentUser(res.data)
    return res.data
    } catch (err) {
    if (err.response) {
      console.log(err.response.data.message);

    }
  }
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, getCurrent }}>
      {children}
    </CurrentUserContext.Provider>
  );
};


