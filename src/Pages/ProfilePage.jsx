import React, { useContext, useEffect, useState } from "react";
import profilepagestyle from "../CSS/profilepagestyle.css";
import {  Image } from 'react-bootstrap';
import ToastNotif from "../Components/ToastNotif";

import TextareaAutosize from "react-textarea-autosize";
import {
  FiMail,
  FiKey,
  FiUser,
  FiPhone,
  FiType,
  FiEdit,
  FiEdit3,
  FiCamera,

} from "react-icons/fi";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { UtilityContext } from "../Context/UtilityContext";
import { useUsersFunctionalities } from "../Hooks/useUsersFunctionalities";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { bodyToast, setBodyToast, showToast, setShowToast, handleCloseToast } = useContext(UtilityContext);
  const { updateUserJson } = useUsersFunctionalities();
  const [profilePicture, setProfilePicture] = useState("")
  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    password: "",
    phoneNum: "",
    userBio: "",
  });



  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserValues({
      ...userValues,
      [name]: value,
    });
  };

  const submitChanges = async (event) => {
    event.preventDefault();
    setShowToast(false)
    try {

      const userData = new FormData();

      for (const fieldName in userValues) {
        const fieldValue = userValues[fieldName].trim();
        if (fieldValue !== "") {
          userData.append(fieldName, fieldValue);
        }
      }
  
      if (profilePicture !== "") {
        userData.append("profilePicture", profilePicture);
      }
  
      
      const response = await updateUserJson(currentUser._id, userData);
      
     
      setCurrentUser(response)
    
      setUserValues( {firstName: "",
      lastName: "",
      email: "", 
      password: "",
      phoneNum: "",
      userBio: "", 
    })
    setProfilePicture("")
    setShowToast(true)
    setBodyToast("Profile updated successfully")


    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
      }
    }
  };

  return (
    <div className="div-profile-page">
      <h3 className="tagline mb-2">My Profile</h3>
      <form className="profile-form"> 
      <div className="form-row">
      <Image src={currentUser.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile Picture" roundedCircle width={150} height={150} border={2} />
          
          <p>
            <FiCamera/>
            <label htmlFor="profilePicture">
                  Profile picture:
            </label>
          </p>
          <span className="input-group-addon sm icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>

          <input type="file"  name="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
         placeholder="choose a profile picture"
               />
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="email">
              <FiMail />  {currentUser.email}
            </label>
          </p>
          <span className="input-group-addon sm icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>

          <input type="email" id="email" name="email"
                value={userValues.email}
                onChange={handleChange}
                placeholder="change email..." />
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="password">
              <FiKey /> Password:
            </label>
          </p>
          <span className="input-group-addon sm icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>
          <input type="password" id="password" 
          name="password" placeholder="new password..."
          value={userValues.password} 
          onChange={handleChange}/>
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="lastName">
              <FiType /> {currentUser.firstName}
            </label>
          </p>

          <span className="input-group-addon sm icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="change first name here:"
            value={userValues.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="lastName">
              <FiUser /> {currentUser.lastName}
            </label>
          </p>
          <span className="input-group-addon icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userValues.lastName}
            onChange={handleChange}
            placeholder="change last name ..."
          />
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="phoneNumber">
              <FiPhone /> {currentUser.phoneNum}
            </label>
          </p>
          <span className="input-group-addon icon" style={{ opacity: 0.2 }}>
            <FiEdit3 />
          </span>
          <input
            type="tel"
            name="phoneNum"
            placeholder="change phone number ..."
            value={userValues.phoneNum}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="bio">
              <FiEdit /> {currentUser.userBio}
            </label>
          </p>
          <span
            className="input-group-addon icon"
            style={{ color: "orange", opacity: 0.2 }}
          >
            <FiEdit3 />
          </span>
          <TextareaAutosize
            id="bio"
            name="userBio"
            minRows={3}
            value={userValues.userBio}
            onChange={handleChange}
            placeholder="write a short bio."
          />
        </div>
        <button type="submit" className="button-18" onClick={submitChanges}>
          Save
        </button>
      </form>
      <ToastNotif 
      {...{showToast, bodyToast}}
      onClose={handleCloseToast} />
       
    </div>
  );
};

export default ProfilePage;
