import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDonations, setUserDonations] = useState([]);
  const [values, setValues] = useState({
    type: "",
    description: "",
    amount: "",
    expires: "",
  });

  const handleTypeChange = (event) => {
    setValues({ ...values, type: event.target.value });
  };
  const handleDescriptionChange = (event) => {
    setValues({ ...values, description: event.target.value });
  };
  const handleAmountChange = (event) => {
    setValues({ ...values, amount: event.target.value });
  };
  const handleExpiresChange = (event) => {
    setValues({ ...values, expires: event.target.value });
  };
  //    handleAuthFail = () => {
  //         sessionStorage.removeItem('authToken');
  //        setLoggedIn(false);
  //       }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    axios
      .post("http://localhost:5000/donations", {
          user_id: userData.id,
        ...values,
      })
      .then((response) => {
        // res.status(200).json(res.data);
      });
  };
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    axios
      .get("http://localhost:5000/users/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsLoading(false);
        // console.log(res.data);
      })
      .catch(
        () => (sessionStorage.removeItem("authToken"), setLoggedIn(false))
      );

    axios
      .get("http://localhost:5000/donations/")
      .then((response) => {
        // console.log(response.data);
        setUserDonations(response.data);
      })
      .catch((error) => console.log(error));
    // console.log(userDonations);
    // console.log(userData.id);
   
   
  }, []);
  const donations = userDonations.filter(
    donation => donation.user_id === userData.id
  );
  console.log(donations);
//   console.log(userDonations);
//   console.log(userData);
  return isLoading ? (
    <h1>PATIENCE IS A VIRTUE...</h1>
  ) : (
    <div>
      <h2>Hello again, {userData.name}</h2>
      <form onSubmit={handleOnSubmit}>
        <select onChange={handleTypeChange} value={values.type} htmlFor="">
          <option value="">Select type of donation</option>
          <option value="prepared">Prepared</option>
          <option value="bulk">Bulk</option>
        </select>
        <label htmlFor="">Description of item</label>
        <textarea
          onChange={handleDescriptionChange}
          value={values.description}
          placeholder="add description of item"
        ></textarea>
        <label htmlFor="">Amount</label>
        <input
          onChange={handleAmountChange}
          type="text"
          value={values.amount}
          placeholder="enter amount"
        />
        <label htmlFor="">Expires On</label>
        <input
          onChange={handleExpiresChange}
          type="text"
          value={values.expires}
          placeholder="enter expiration date"
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default UserPage;
