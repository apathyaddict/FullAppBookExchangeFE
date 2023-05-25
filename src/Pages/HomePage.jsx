import React from "react";
import { useUsersContext } from "../Hooks/useUsersContext";
import Footer from "../Components/Footer";
import { Container } from "react-bootstrap";

const HomePage = ({openModal}) => {
  const { user } = useUsersContext();

  return (
    <>
      <section className="main-content">
        <Container className="d-flex  justify-content-center container">
        <div className="title-left">
          <div>
            <h3 className="tagline">Find your next fav</h3>
          </div>
          <div className="logo-title">
            <img
              src="../images/booked.png"
              alt="booked title"
              className="img-booked"
            />
          </div>
          
          <div className="signup-input">

          <div >
          {!user && (
            <div className="emailInput">
              <input
                id="searchQueryInput"
                type="text"
                name="searchQueryInput"
                
                value={"sign up today"}
                readOnly
              />
              <button
                id="searchQuerySubmit"
                type="submit"
                name="searchQuerySubmit"
                onClick={openModal}
              >
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </button>
            </div>)}
            </div>
          
          </div>
          <div className="description">
            <p className="p-description">
              Let's face it: you love books, but your tiny one-bedroom
              appartment is running out of room. In this economy, you're not
              going to update your living arrangements, so Booked is here.
              <strong> Trade in your books. Get new ones. Have it all. </strong>
              Except the apartment.
            </p>
          </div>
        </div>
        <div className="title-right">
          <div className="buttons-div">
        
          </div>
          <div className="div-books-logo">
            <img
              src="../images/logobooks.png"
              alt="booked logo"
              className="img-logo-booked"
            />
          </div>
          
        </div>
        </Container>
        <div>
        <Footer />
      </div>
      </section>
      
    </>
  );
};

export default HomePage;
