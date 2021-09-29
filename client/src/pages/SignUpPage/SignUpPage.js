import React, { useEffect, useState } from "react";
import "./SignUpPage.scss";
import axios from "axios";
import LogInModal from "../../components/LogInModal/LogInModal";

const SignUpPage = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
    email: "",
    phone: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleRoleChange = (event) => {
    setValues({ ...values, role: event.target.value });
  };
  const handleNameChange = (event) => {
    setValues({ ...values, name: event.target.value });
  };
  const handleUsernameChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };
  const handleEmailChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };
  const handlePhoneChange = (event) => {
    setValues({ ...values, phone: event.target.value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (
      values.name &&
      values.username &&
      values.password &&
      values.email &&
      values.phone
    ) {
      setIsValid(true);
      axios
        .post("http://localhost:5000/users/signup", {
          ...values,
        })
        .then((res) => {
          console.log("token: ", res.data.authToken);
          sessionStorage.setItem("authToken", res.data.authToken);
          setLoggedIn(true);
          setOpenModal(true);
        })
        .catch((error) => {
          setErrorMessage(error.data.message);
        });
    }
  };
  return ( 
    <div className="signUp">
      {submitted && isValid && openModal ? <LogInModal closeModal={setOpenModal}/> : null}
      <h1 className="signUp__title">Please fill out the form below</h1>
      <form className="signUp__form" onSubmit={handleOnSubmit} action="submit">
        <select
          className="signUp__form--input"
          onChange={handleRoleChange}
          value={values.role}
          name="role"
        >
          <option>Please select your role</option>
          <option value="restaurant">Restaurant</option>
          <option value="food bank">Food Bank</option>
        </select>
        {submitted && !values.role ? (
          <span className="signup__form--error">Please select a role</span>
        ) : null}
        <label className="signUp__form--label">name</label>
        <input
          className="signUp__form--input"
          onChange={handleNameChange}
          value={values.name}
          type="text"
          placeholder="enter your name"
        />
        {submitted && !values.name ? (
          <span className="signup__form--error">Please enter your name</span>
        ) : null}

        <label className="signUp__form--label">username</label>
        <input
          className="signUp__form--input"
          onChange={handleUsernameChange}
          value={values.username}
          type="text"
          placeholder="enter your username"
        />
        {submitted && !values.username ? (
          <span className="signup__form--error">Please enter a username</span>
        ) : null}

        <label className="signUp__form--label">phone</label>
        <input
          className="signUp__form--input"
          onChange={handlePhoneChange}
          value={values.phone}
          type="text"
          placeholder="enter your phone"
        />
        {submitted && !values.phone ? (
          <span className="signup__form--error">
            Please enter a phone number
          </span>
        ) : null}
        <label className="signUp__form--label">email</label>
        <input
          className="signUp__form--input"
          onChange={handleEmailChange}
          value={values.email}
          type="email"
          placeholder="enter your email"
        />
        {submitted && !values.email ? (
          <span className="signup__form--error">
            Please enter a valid email
          </span>
        ) : null}
        <label className="signUp__form--label">password</label>
        <input
          className="signUp__form--input"
          onChange={handlePasswordChange}
          value={values.password}
          type="password"
          placeholder="enter your password"
        />
        {submitted && !values.password ? (
          <span className="signup__form--error">Please enter a password</span>
        ) : null}
        <div className="signUp__form--btnbox">
          <button className="signUp__form--btn" type="submit">
            SUBMIT
          </button>
          <button
            className="signUp__form--cancelbtn"
            onClick={() => history.push("/")}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
