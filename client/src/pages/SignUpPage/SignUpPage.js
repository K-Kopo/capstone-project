import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
import "./SignUpPage.scss";
import axios from "axios";

const SignUpPage = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
    email: "",
    phone: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log(event.target);
    axios
      .post("http://localhost:5000/users/signup", {
        ...values,
      })
      .then((res) => {
        console.log("token: ", res.data.authToken);
        sessionStorage.setItem("authToken", res.data.authToken);
        setLoggedIn(true);
        history.push("/login");
      })
      .catch((error) => {
        setErrorMessage(error.data.message);
      });
  };
  return (
    <div className="signUp">
      sign me up, buttercup!
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
        <label className="signUp__form--label">name</label>
        <input
          className="signUp__form--input"
          onChange={handleNameChange}
          value={values.name}
          type="text"
          placeholder="enter your name"
        />
        <label className="signUp__form--label">username</label>
        <input
          className="signUp__form--input"
          onChange={handleUsernameChange}
          value={values.username}
          type="text"
          placeholder="enter your username"
        />
        <label className="signUp__form--label">phone</label>
        <input
          className="signUp__form--input"
          onChange={handlePhoneChange}
          value={values.phone}
          type="text"
          placeholder="enter your phone"
        />
        <label className="signUp__form--label">email</label>
        <input
          className="signUp__form--input"
          onChange={handleEmailChange}
          value={values.email}
          type="text"
          placeholder="enter your email"
        />
        <label className="signUp__form--label">password</label>
        <input
          className="signUp__form--input"
          onChange={handlePasswordChange}
          value={values.password}
          type="password"
          placeholder="enter your password"
        />
        <div className="signUp__form--btnbox">
        <button className="signUp__form--btn" type="submit">SUBMIT</button>
        <button className="signUp__form--cancelbtn">CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
