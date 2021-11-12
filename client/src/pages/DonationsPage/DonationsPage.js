import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DonationsPage.scss";
import LogInButton from "../../components/LogInButton/LogInButton";
import { SiAddthis } from "react-icons/si";
import DonationsHeader from "../../components/DonationsHeader/DonationsHeader";
import AddDonationModal from "../../components/AddDonationModal/AddDonationModal";
import "../../components/Donations/Donations.scss"

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 8000;
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

  const handleOnSubmit = () => {

    const id = currentDonation.id;
    console.log(currentDonation);
    axios
      .put(`${dbUrl}/donations/${id}`, {
        type: currentDonation.type,
        user_id: match.params.id,
        description: currentDonation.description,
        amount: currentDonation.amount,
        expires: jsDate(currentDonation.expires)
      })
      .then((response) =>
        addDonation ? setAddDonation(false) : setAddDonation(true) , setAddModal(false)
      )
      .catch((error) => console.log(error));
  };
  const openAddModal = (donation) => {
    setCurrentDonation({ ...donation,
      user_id: match.params.id,
      });
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
        <div className="donation-tablebox">
        <table className = "donation-table">
        <DonationsHeader />

        {myDonations.map((donation) => {
          return (
            <tr className = "donation-table__row" key={donation.id}>
              <td className="donation-table__item">{donation.type}</td>
              <td  className="donation-table__item">{donation.description}</td>
              <td className="donation-table__item">{donation.amount}</td>
              <td className="donation-table__item">{jsDate(donation.expires)}</td>
              {/* <button className="rest-donation__item--delete" onClick={()=>deleteModalOpen(donation.id)}>
                 <AiTwotoneDelete />
             </button> */}
            </tr>
            // <form
            //   className="rest-donation"
            //   onSubmit={(event) => deleteModalOpen(event, donation.id)}
            //   key={donation.id}
            // >
            //   <input
            //     className="rest-donation__item--hidden"
            //     name="id"
            //     value={donation.id}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="type"
            //     value={donation.type}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="description"
            //     value={donation.description}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="amount"
            //     value={donation.amount}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="expires"
            //     defaultValue={jsDate(donation.expires)}
            //   />
            //   <button className="rest-donation__item--delete" type="submit">
            //     <AiTwotoneDelete />
            //   </button>
            // </form>
            );
          })}
          </table>
          </div>
        <h2 className="donations-box__title">Available Donations</h2>
        <div className="donation-tablebox">
        <table className = "donation-table">
        <DonationsHeader />

        {filteredDonations.map((donation) => {
          return (
            <tr className = "donation-table__row" key={donation.id}>
              <td className="donation-table__item">{donation.type}</td>
              <td  className="donation-table__item">{donation.description}</td>
              <td className="donation-table__item">{donation.amount}</td>
              <td className="donation-table__item">{jsDate(donation.expires)}</td>
              <button className="rest-donation__item--delete" onClick={()=>openAddModal(donation)}>
                 <SiAddthis />
             </button>
            </tr>
            // <form
            //   className="rest-donation"
            //   onSubmit={(event) => deleteModalOpen(event, donation.id)}
            //   key={donation.id}
            // >
            //   <input
            //     className="rest-donation__item--hidden"
            //     name="id"
            //     value={donation.id}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="type"
            //     value={donation.type}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="description"
            //     value={donation.description}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="amount"
            //     value={donation.amount}
            //     readOnly
            //   />
            //   <input
            //     className="rest-donation__item"
            //     name="expires"
            //     defaultValue={jsDate(donation.expires)}
            //   />
            //   <button className="rest-donation__item--delete" type="submit">
            //     <AiTwotoneDelete />
            //   </button>
            // </form>
            );
          })}
          </table>
          </div>
        <button className="donations-form__btn" onClick={() => logOut()}>
          Logout
        </button>
      </div>
        {addModal && (<AddDonationModal closeAddModal={closeAddModal} handleOnSubmit={handleOnSubmit}/>)}
    </div>
  );
};

export default DonationsPage;
