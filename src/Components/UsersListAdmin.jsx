import React from "react";
import { useNavigate } from "react-router-dom";

const UsersListAdmin = ({ usersList }) => {
  const navigate = useNavigate();


  return (
    <ul className="books-db">
      {usersList.map((user) => (
        <li key={user._id}>
          <div >
          <p>{user.firstName}</p>
          <p> {user.lastName}</p>
          <span> {user.email}</span>
          </div>
          <div>
          <button className="edit-button" 
          onClick={() => navigate(`/users/${user._id}`)}
        > View </button>
         </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersListAdmin;
