import axios from "axios";
import React, { useState, useEffect } from "react";

const DonationsPage = ({ match }) => {
  const [donationsData, setDonationsData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   function handleAuthFail() {
  //     sessionStorage.removeItem("authToken");
  //     setLoggedIn(false);
  //   }

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    authToken ? setLoggedIn(true) : setLoggedIn(false);

    axios
      .get("http://localhost:5000/users/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        // setUserData(res.data);
        setIsLoading(false);
      })
      .catch((error) => error);

    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:5000/donations")
      .then((response) => {
        setDonationsData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const id = event.target.id.value
    axios.put(`http://localhost:5000/donations/${id}`, {
      type: event.target.type.value,
      user_id: match.params.id,
      description: event.target.description.value,
      amount: event.target.amount.value,
      expires: event.target.expires.value
    }).then((response)=> console.log(response))
    .catch((error )=> console.log(error));
  };

  const userBank = userData.find((user) => user.id === match.params.id);
    console.log(userBank);
  return isLoading && !loggedIn ? (
    <h1>please log in!</h1>
  ) : (
    <div>
      Welcome
      {donationsData.map((donation) => {
        return (
          <form onSubmit={handleOnSubmit} key={donation.id}>
            <input name="id" value={donation.id}></input>
            <input name="type" value={donation.type} ></input>
            <input name="description" value={donation.description}></input>
            <input name="amount" value={donation.amount}></input>
            <input name="expires" value={donation.expires}></input>
            <button type="submit">add to my list</button>
          </form>
        );
      })}
    </div>
  );
};

export default DonationsPage;
