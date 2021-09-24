import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DonationModal from "../../components/DonationModal./DonationModal";
import "../../components/DonationModal./DonationModal.scss";
import "./UserPage.scss";

const UserPage = ({ history }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDonations, setUserDonations] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function handleAuthFail() {
    sessionStorage.removeItem("authToken");
    setLoggedIn(false);
  }

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
        setUserData(res.data);
        setIsLoading(false);
      })
      .catch(() => handleAuthFail());

    axios
      .get("http://localhost:5000/donations/")
      .then((response) => {
        setUserDonations(response.data);
      })
      .catch((error) => console.log(error));
  }, [loggedIn]);
  const donations = userDonations.filter(
    (donation) => donation.user_id === userData.id
  );
  console.log(donations);
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setLoggedIn(false);
    history.push("/");
  };
  return isLoading && !loggedIn ? (
    <div className="user__loginpage">
      <h1>please log in!</h1>
      <Link to="/login">
        <button className="homepage__login-btn">Log In</button>
      </Link>
    </div>
  ) : (
    <div className="donation-box">
      <h2 className="donation-box__title">Hello again, {userData.name}</h2>
      <h2 className="donation-box__subtitle">Your current donations</h2>
      <div className="donation-box__tableheads">
      <thead className="donation-box__tableheads--titles">Type</thead>
      <thead className="donation-box__tableheads--titles">Description</thead>
      <thead className="donation-box__tableheads--titles">Amount</thead>
      <thead className="donation-box__tableheads--titles">Expires On</thead>
      </div>
      {donations.map((donation) => {
        return (
          <tr className="rest-donation" key={donation.id}>
            <td className="rest-donation__item">{donation.type}</td>
            <td className="rest-donation__item">{donation.description}</td>
            <td className="rest-donation__item">{donation.amount}</td>
            <td className="rest-donation__item">{donation.expires}</td>
          </tr>
        );
      })}
      <div className="donation-box__btnbox">
      <button className="donation-box__btn" onClick={() => setOpenModal(true)}>
        Add donation
      </button>
      {openModal && (
        <DonationModal closeModal={setOpenModal} userData={userData} />
      )}
      <button className="donation-box__logoutbtn" onClick={() => logOut()}>
        Logout
      </button>
      </div>
    </div>
  );
};

export default UserPage;
