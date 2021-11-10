import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DonationsPage.scss";
import LogInButton from "../../components/LogInButton/LogInButton";
import { SiAddthis } from "react-icons/si";
import DonationsHeader from "../../components/DonationsHeader/DonationsHeader";
import AddDonationModal from "../../components/AddDonationModal/AddDonationModal";

const PORT = 8000;
const dbUrl = `http://localhost:${PORT}`;

const DonationsPage = ({ match, history }) => {
  const [donationsData, setDonationsData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [addDonation, setAddDonation] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null)

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    authToken ? setLoggedIn(true) : setLoggedIn(false);

    axios
      .get(`${dbUrl}/users/profile`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${dbUrl}/donations`)
      .then((response) => {
        setDonationsData(response.data);
      })
      .catch((error) => console.log(error));
  }, [addDonation]);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const id = currentDonation.id;
    axios
      .put(`${dbUrl}/donations/${id}`, currentDonation)
      .then((response) =>
        addDonation ? setAddDonation(false) : setAddDonation(true) , setAddModal(false)
      )
      .catch((error) => console.log(error));
  };
  const openAddModal = (event) => {
    event.preventDefault();
    setCurrentDonation({ id: event.target.id.value, type: event.target.type.value,
      user_id: match.params.id,
      description: event.target.description.value,
      amount: event.target.amount.value,
      expires: event.target.expires.value });
      setAddModal(true);
  }
  const closeAddModal = () => {
    setAddModal(false)
  };
  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setLoggedIn(false);
    history.push("/");
  };
  if (!loggedIn)
    return (
      <div className="user__loginpage">
        <h1>please log in!</h1>
        <LogInButton />
      </div>
    );

  const jsDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };
  const filteredDonations = donationsData.filter(
    (donation) => donation.user_id !== userData.id && donation.available !== 0
  );
  const myDonations = donationsData.filter(
    (donation) => donation.user_id === userData.id
  );

  return (
    <div className="donations">
      <div className="donations-box">
        <h1>Hello again, {userData.name}!</h1>
        <h2 className="donations-box__title">My Current Donations</h2>
        <DonationsHeader />
        {myDonations.map((donation) => {
          return (
            <form className="donations-form" key={donation.id}>
              <input
                className="donations-form__hidden"
                name="id"
                value={donation.id}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="type"
                value={donation.type}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="description"
                value={donation.description}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="amount"
                value={donation.amount}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="expires"
                value={jsDate(donation.expires)}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="rest_name"
                value={donation.rest_name}
                readOnly
              ></input>
            </form>
          );
        })}
        <h2 className="donations-box__title">Available Donations</h2>
        <DonationsHeader />
        {filteredDonations.map((donation) => {
          return (
            <form
              className="donations-form"
              onSubmit={(event)=>openAddModal(event)}
              key={donation.id}
            >
              <input
                className="donations-form__hidden"
                name="id"
                value={donation.id}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="type"
                value={donation.type}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="description"
                value={donation.description}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="amount"
                value={donation.amount}
                readOnly
              ></input>
              <input
                className="donations-form__input"
                name="expires"
                defaultValue={jsDate(donation.expires)}
              ></input>
                <input
                className="donations-form__input"
                name="rest_name"
                value={donation.rest_name}
                readOnly
              ></input>
              <button className="donations-form__input" type="submit">
                <SiAddthis />
              </button>
            </form>
          );
        })}
        <button className="donations-form__btn" onClick={() => logOut()}>
          Logout
        </button>
      </div>
        {addModal && (<AddDonationModal closeAddModal={closeAddModal} handleOnSubmit={handleOnSubmit}/>)}
    </div>
  );
};

export default DonationsPage;
