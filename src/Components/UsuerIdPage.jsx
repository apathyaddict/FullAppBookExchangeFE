import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useUsersContext } from "../Hooks/useUsersContext";
import axios from "axios";

const UsuerIdPage = () => {
  const { id } = useParams();
  const { user } = useUsersContext();
  const [viewUser, setViewUser] = useState({});
  const [savedArray, setSavedArray] = useState([]);
  const [titlesArray, setTitlesArray] = useState([]);

  useEffect(() => {
    saveArrays();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
        headers: {
          Authorization: `barer ${user.token}`,
        },
      });

      setViewUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveArrays = async () => {
    const res = await fetchUserData();
    const uniqueTitles = new Set();
    const uniqueSaved = new Set();

    if (res.myBooks.length > 0) {
      res.myBooks.forEach((item) => {
        uniqueTitles.add(item.bookId.title);
      });

      const titlesArray = Array.from(uniqueTitles);
      setTitlesArray(titlesArray);
    }
    if (res.saved.length > 0) {
      res.saved.forEach((item) => {
        uniqueSaved.add(item.title);
      });

      const savedBooksArray = Array.from(uniqueSaved);
      setSavedArray(savedBooksArray);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5 ">
        <Col md={8} lg={6} xl={5}>
          <div className="text-center mb-4">
            <Image
              src={viewUser.profilePicture}
              alt="Profile Picture"
              roundedCircle
              width={140}
              height={140}
            />
            <h3 className="mt-3 display-3">{`${viewUser.firstName} ${viewUser.lastName}`}</h3>
            <p>
              <FaEnvelope /> {viewUser.email}
            </p>
            <p>
              <FaPhone /> {viewUser.phoneNum}
            </p>
          </div>
          <div className="mb-4">
            <h5> Bio</h5>
            <p className="text-sm">{viewUser.userBio}</p>
          </div>
          <div className="mb-4">
            <h5>Saved Books</h5>
            <ListGroup>
              {savedArray.length > 0 ? (
                savedArray.map((book, index) => (
                  <ListGroup.Item key={book + index}>{book}</ListGroup.Item>
                ))
              ) : (
                <p className="small">No saved books found.</p>
              )}
            </ListGroup>
          </div>
          <div className="mb-4">
            <h5>Borrowed Books</h5>
            <ListGroup>
              {titlesArray.length > 0 ? (
                titlesArray.map((book, index) => (
                  <ListGroup.Item className="opacity-row" key={book + index}>
                    {book}
                  </ListGroup.Item>
                ))
              ) : (
                <p className="small">No borrowed books found.</p>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UsuerIdPage;
