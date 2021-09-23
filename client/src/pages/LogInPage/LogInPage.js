import axios from "axios";
import React, { useEffect, useState } from "react";

const LogInPage = ({history}) => {
  const [userData, setUserData] = useState([]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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
        setLoggedIn(true); setErrorMessage("");
        // history.push("/users/");
      })
      .catch((error) => {
        setErrorMessage(error);
      });
    
      const userLog = userData.find((user) => user.username === values.username )
      userLog.role === 'restaurant' ? history.push(`/users/${userLog.id}`) : history.push(`/donations/${userLog.id}`)
      
    };
  useEffect(() => {
    let isSubscribed = true;
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      setLoggedIn(true);
    }
    axios.get("http://localhost:5000/users") 
    .then((response)=> 
    setUserData(response.data))
    .catch((error)=> console.log(error))
    return ()=>(isSubscribed = false)
  }, []);
  return (
    <div className="login">
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleUsernameChange}
          value={values.username}
          type="text"
          placeholder="enter your username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handlePasswordChange}
          value={values.password}
          placeholder="enter your password"
        />
        <button type="submit" >SUBMIT</button>
      </form>
    </div>
  );
};

export default LogInPage;
