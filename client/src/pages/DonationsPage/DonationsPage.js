import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DonationsPage.scss";
import LogInButton from "../../components/LogInButton/LogInButton";
import { SiAddthis } from "react-icons/si";
import DonationsHeader from "../../components/DonationsHeader/DonationsHeader";
import AddDonationModal from "../../components/AddDonationModal/AddDonationModal";
import "../../components/Donations/Donations.scss";

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const dbUrl = `http://localhost:${PORT}`;

const DonationsPage = ({ match, history }) => {
  const [donationsData, setDonationsData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [addDonation, setAddDonation] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);

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

  const handleOnSubmit = () => {
    const id = currentDonation.id;
    axios
      .put(`${dbUrl}/donations/${id}`, {
        type: currentDonation.type,
        user_id: match.params.id,
        description: currentDonation.description,
        amount: currentDonation.amount,
        expires: sqlDate(currentDonation.expires),
      })
      .then(
        (response) =>
          addDonation ? setAddDonation(false) : setAddDonation(true),
        setAddModal(false)
      )
      .catch((error) => console.log(error));
  };
  const openAddModal = (donation) => {
    setCurrentDonation({ ...donation, user_id: match.params.id });
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
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
  
  const sqlDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  }
  const jsDate = (date) => {
    return new Date(date).toLocaleDateString().slice(0, 10);
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
        <div className="donation-box__dashboard">
        <h1 className="donation-box__title">Welcome back! {userData.name}</h1>
        </div>
        <h2 className="donations-box__title">My Current Donations</h2>
        <div className="donation-tablebox">
          <table className="donation-table">
            <DonationsHeader />

            {myDonations.map((donation) => {
              return (
                <tbody key={donation.id}>
                <tr className="donation-table__row" >
                  <td className="donation-table__item">{donation.rest_name}</td>
                  <td className="donation-table__item">{donation.type}</td>
                  <td className="donation-table__item">
                    {donation.description}
                  </td>
                  <td className="donation-table__item">{donation.amount}</td>
                  <td className="donation-table__item">
                    {jsDate(donation.expires)}
                  </td>
                  {/* <button className="rest-donation__item--delete" onClick={()=>deleteModalOpen(donation.id)}>
                 <AiTwotoneDelete />
             </button> */}
                </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <h2 className="donations-box__title">Available Donations</h2>
        <div className="donation-tablebox">
          <table className="donation-table">
            <DonationsHeader />

            {filteredDonations.map((donation) => {
              return (
                <tbody key={donation.id}>
                <tr className="donation-table__row" >
                  <td className="donation-table__item">{donation.rest_name}</td>
                  <td className="donation-table__item">{donation.type}</td>
                  <td className="donation-table__item">
                    {donation.description}
                  </td>
                  <td className="donation-table__item">{donation.amount}</td>
                  <td className="donation-table__item">
                    {jsDate(donation.expires)}
                  </td>
                  <td
                    className="rest-donation__item--add"
                    onClick={() => openAddModal(donation)}
                  >
                    <SiAddthis />
                  </td>
                </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <button className="donations-form__btn" onClick={() => logOut()}>
          Logout
        </button>
      </div>
      {addModal && (
        <AddDonationModal
          closeAddModal={closeAddModal}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};

export default DonationsPage;
