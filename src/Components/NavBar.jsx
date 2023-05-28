import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogInModal from "../Components/LogInModal";
import { useUsersContext } from "../Hooks/useUsersContext";

import { CurrentUserContext } from "../Context/CurrentUserContext";

const NavBar = ({
  openModal,
  show,
  setShow,
  handleClose,
  handleLogoutClick,
}) => {
  const { user } = useUsersContext();
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <LogInModal {...{ show, handleClose, setShow }} />

      <section className="navbar">
        <nav className="navbar-left flexclassrow ">
          <ul className=" flexclassrow main-page-ul">
            <NavLink to="/">
              {({ isActive }) => (
                <li className={isActive ? "nav-link-active" : "link nav-link"}>
                  {" "}
                  Home
                </li>
              )}
            </NavLink>
            <NavLink to="/search">
              {({ isActive }) => (
                <li className={isActive ? "nav-link-active" : "link nav-link"}>
                  Search
                </li>
              )}
            </NavLink>
            {user ? (
              <>
                <NavLink to="/mybooks">
                  {({ isActive }) => (
                    <li
                      className={isActive ? "nav-link-active" : "link nav-link"}
                    >
                      My Books
                    </li>
                  )}
                </NavLink>

                <NavLink to="/profile">
                  {({ isActive }) => (
                    <li
                      className={isActive ? "nav-link-active" : "link nav-link"}
                    >
                      Profile
                    </li>
                  )}
                </NavLink>
                {currentUser.isAdmin && (
                  <NavLink to="/admin">
                    {({ isActive }) => (
                      <li
                        className={
                          isActive ? "nav-link-active" : "link nav-link"
                        }
                      >
                        Dashboard
                      </li>
                    )}
                  </NavLink>
                )}
              </>
            ) : (
              ""
            )}
          </ul>
        </nav>

        <div className="navbar-right flexclassrow">
          {!user ? (
            <button className="btn-login" onClick={openModal}>
              
              Log In
            </button>
          ) : (
            <button className="btn-login" onClick={handleLogoutClick}>
              
              Log Out
            </button>
          )}
        </div>

        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
              <NavLink to="/">
                <li id="collapsible">Home</li>
              </NavLink>
              <NavLink to="/search">
                <li id="collapsible">Search</li>
              </NavLink>

              {user && (
                <>
                  <NavLink to="/mybooks">
                    <li id="collapsible">My Books</li>
                  </NavLink>
                  <NavLink to="/profile">
                    <li id="collapsible">Profile</li>
                  </NavLink>
                </>
              )}

              {currentUser.isAdmin && (
                <NavLink to="/admin">
                  <li id="collapsible">Dashboard</li>
                </NavLink>
              )}

              {user && (
                <li className="mininav-user">
                  <strong>
                    {" "}
                    {currentUser.firstName} {currentUser.lastName}{" "}
                  </strong>{" "}
                </li>
              )}

              {user ? (
                <li className="mininav-user">
                  <button className="btn " onClick={handleLogoutClick}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="mininav-user">
                  <button className="btn" onClick={openModal}>
                    Log in
                  </button>
                  <button className="btn" onClick={openModal}>
                    Sign up
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </section>

      <div className="profile-div-user">
        {user && (
          <span>
            Logged in as{" "}
            <strong>
              {" "}
              {currentUser.firstName} {currentUser.lastName}.{" "}
            </strong>{" "}
            Hi!{" "}
          </span>
        )}
      </div>
    </>
  );
};

export default NavBar;
