import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import DonationModal from "../../components/DonationModal./DonationModal";
import { useHistory } from "react-router";
import DonationsHeader from "../DonationsHeader/DonationsHeader";
import "./Donations.scss";

const Donations = ({ userdata, history, logout, allUsers }) => {
  const PORT = process.env.PORT || 8000;
  const dbUrl = `http://localhost:${PORT}`;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userDonations, setUserDonations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [currentDonationId, setCurrentDonationId] = useState(null);

  history = useHistory();

  useEffect(() => {
    axios
      .get(`${dbUrl}/donations/`)
      .then((res) => {
        setUserDonations(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [shouldRefresh, openDeleteModal, dbUrl]);

  const deleteDonation = () => {
    axios
      .delete(`http://localhost:8000/donations/${currentDonationId}`)
      .then((response) => console.log(response.data.message), setOpenDeleteModal(false), refresh())

      .catch((error) => console.log(error));
  };

  const deleteModalOpen = (donationId) => {
    // event.preventDefault();
    setCurrentDonationId(donationId);
    setOpenDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const openDonationModal = () => {
    setOpenModal(true);
  };
  const refresh = () => {
    shouldRefresh ? setShouldRefresh(false) : setShouldRefresh(true);
  };
  const jsDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  const eachDonations = userDonations.filter(
    (donation) => donation.user_id === userdata.id
  );


  const restId = userDonations.filter(donation => donation.user_id === userdata.id)
  console.log(eachDonations);
  console.log(allUsers);
  console.log(restId);
  // const restName = restId.filter(user => eachDonations.user_id === user.id)
  // console.log(restName);
  // const donationsID = eachDonations.filter(donation => donation.user_id === )
  return isLoading ? (
    <p>patience is a virtue</p>
  ) : (
    <div className="donation">
      <div className="donation-box">
        <h1 className="donation-box__title">Welcome back! {userdata.name}</h1>
        <div className="donation-tablebox">
        <table className = "donation-table">
        <DonationsHeader />

        {eachDonations.map((donation) => {
          return (
            <tr className = "donation-table__row" key={donation.id}>
              <td className="donation-table__item">{donation.type}</td>
              <td  className="donation-table__item">{donation.description}</td>
              <td className="donation-table__item">{donation.amount}</td>
              <td className="donation-table__item">{jsDate(donation.expires)}</td>
              <button className="rest-donation__item--delete" onClick={()=>deleteModalOpen(donation.id)}>
                 <AiTwotoneDelete />
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
        {openDeleteModal && (
          <DeleteModal
            closeDeleteModal={closeDeleteModal}
            deleteDonation={deleteDonation}
          />
        )}
        <div className="donation-box__btnbox">
          {userdata.role === "restaurant" ? (
            <button
              className="donation-box__btn"
              onClick={() => openDonationModal()}
            >
              Add donation
            </button>
          ) : (
            <button
              className="donation-box__donationbtn"
              onClick={() => history.push(`/donations/${userdata.id}`)}
            >
              Browse current donations
            </button>
          )}
          {openModal && (
            <DonationModal
              closeModal={() => setOpenModal(false)}
              userData={userdata}
              refreshPage={() => refresh()}
            />
          )}
          <button className="donation-box__logoutbtn" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donations;
