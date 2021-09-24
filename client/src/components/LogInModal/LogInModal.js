import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import "./LogInModal.scss";

const LogInModal = ({ closeModal }) => {
  const [userData, setUserData] = useState([]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        ...values,
      })
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.authToken);
        setLoggedIn(true);
        setErrorMessage("");
        history.push("/users/");
      })
      .catch((error) => {
        setErrorMessage(error);
      });

    const userLog = userData.find((user) => user.username === values.username);
    console.log(userLog.id);
    userLog.role === "restaurant"
      ? history.push(`/users/${userLog.id}`)
      : history.push(`/donations/${userLog.id}`);
  };
  useEffect(() => {
    let isSubscribed = true;
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      setLoggedIn(true);
    }
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(error));
    return () => (isSubscribed = false);
  }, []);
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleOnSubmit}>
        <label className="login__form--label" htmlFor="username">
          Username
        </label>
        <input
          className="login__form--input"
          onChange={handleUsernameChange}
          value={values.username}
          type="text"
          placeholder="enter your username"
        />
        <label className="login__form--label" htmlFor="password">
          Password
        </label>
        <input
          className="login__form--input"
          type="password"
          onChange={handlePasswordChange}
          value={values.password}
          placeholder="enter your password"
        />
        <div className="login__form--buttonbox">
          <button className="login__form--buttonbox-btn" type="submit">SUBMIT</button>
          <button className="login__form--buttonbox-cancelbtn"onClick={() => closeModal(false)}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default LogInModal;
