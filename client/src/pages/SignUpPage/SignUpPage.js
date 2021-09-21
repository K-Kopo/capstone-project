import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./SignUpPage.scss";
import axios from "axios";

const SignUpPage = () => {
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
        // name: event.target.value.name,
        // username: event.target.value.username,
        // role: event.target.value.role,
        // email: event.target.value.email,
        // phone: event.target.value.phone,
        ...values,
      })
      .then((res) => {
        console.log("token: ", res.data.authToken);
        sessionStorage.setItem("authToken", res.data.authToken);
        setLoggedIn(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };
  return (
    <div className="signUp">
      sign me up, buttercup!
      <form className="signUp__form" onSubmit={handleOnSubmit} action="submit">
        <select onChange={handleRoleChange} value={values.role} name="role">
          <option>Please select your role</option>
          <option value="restaurant">Restaurant</option>
          <option value="food bank">Food Bank</option>
        </select>
        <label>name</label>
        <input
          onChange={handleNameChange}
          value={values.name}
          type="text"
          placeholder="enter your name"
        />
        <label>username</label>
        <input
          onChange={handleUsernameChange}
          value={values.username}
          type="text"
          placeholder="enter your username"
        />
        <label>phone</label>
        <input
          onChange={handlePhoneChange}
          value={values.phone}
          type="text"
          placeholder="enter your phone"
        />
        <label>email</label>
        <input
          onChange={handleEmailChange}
          value={values.email}
          type="text"
          placeholder="enter your email"
        />
        <label>password</label>
        <input
          onChange={handlePasswordChange}
          value={values.password}
          type="text"
          placeholder="enter your password"
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default SignUpPage;
