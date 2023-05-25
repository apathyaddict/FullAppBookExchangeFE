import { useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSignup } from "../Hooks/useSignup";
import { useLogin } from "../Hooks/useLogin";
import { FiMail, FiLock, FiUser, FiPhone } from "react-icons/fi";

function LogInModal({ show, handleClose }) {
  const [activeButton, setActiveButton] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const { signup, errorSignUp, setErrorSignUp } = useSignup();
  const { login, error } = useLogin();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSubmitSignup = async (e) => {
    if (password !== verifiedPassword) {
      setErrorSignUp("Passwords don't match");
      return;
    }
    e.preventDefault();
    await signup(email, password, firstName, lastName, phoneNum);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className=" d-flex align-self-start">
            <Button
              variant="light"
              className={`mb-3 px-3  me-5  ${
                activeButton === "login" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("login")}
            >
              Login
            </Button>{" "}
            <Button
              variant="light"
              className={`mb-3 px-3 ${
                activeButton === "signup" ? "active" : ""
              } fs-6`}
              onClick={() => handleButtonClick("signup")}
            >
              Sign up
            </Button>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeButton === "login" ? (
            <Form className="login" onSubmit={handleSubmitLogin}>
              <Form.Group controlId="formBasicEmail" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="password:"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          ) : (
            <Form className="Signup"  onSubmit={handleSubmitSignup}>
              <Form.Group controlId="formBasicEmail" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="enter email:"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="password:"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group
                controlId="formBasicPasswordVerification"
                className="mb-4"
              >
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="verify password:"
                    required
                    onChange={(e) => setVerifiedPassword(e.target.value)}
                    value={verifiedPassword}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicFirstName" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="enter first name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mb-4">
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <FiUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="enter last name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </InputGroup>
              </Form.Group>
          
              <Form.Group controlId="formBasicPhoneNumber" className="mb-4">
              <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                    <    FiPhone />
                  </InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="enter phone number"
        
                  onChange={(e) => setPhoneNum(e.target.value)}
                  value={phoneNum}
                />
                </InputGroup>
              </Form.Group>
            </Form>
          )}
          {activeButton === "login"
            ? error && <div className="div-error">{error}</div>
            : errorSignUp && <div className="div-error">{errorSignUp}</div>}
        </Modal.Body>
        <Modal.Footer>
          {activeButton === "login" ? (
            <Button variant="primary" onClick={handleSubmitLogin}>
              Login
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmitSignup}>
              Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInModal;
