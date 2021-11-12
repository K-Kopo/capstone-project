import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import DonationModal from "../../components/DonationModal./DonationModal";
import { useHistory } from "react-router";
import DonationsHeader from "../DonationsHeader/DonationsHeader";
import "./Donations.scss";
const dotenv = require("dotenv");
dotenv.config();

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
      .delete(`${dbUrl}/donations/${currentDonationId}`)
      .then(
        (response) => console.log(response.data.message),
        setOpenDeleteModal(false),
        refresh()
      )

      .catch((error) => console.log(error));
  };

  const deleteModalOpen = (donationId) => {
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
    return new Date(date).toLocaleDateString().slice(0, 10);
  };

  const eachDonations = userDonations.filter(
    (donation) => donation.user_id === userdata.id
  );


  return isLoading ? (
    <p>patience is a virtue</p>
  ) : (
    <div className="donation">
      <div className="donation-box">
        <div className="donation-box__dashboard">
        <h1 className="donation-box__title">Welcome back! {userdata.name}</h1>
        </div>
        <div className="donation-tablebox">
          <table className="donation-table">
            <DonationsHeader />

            {eachDonations.map((donation) => {
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
                    className="rest-donation__item--delete"
                    onClick={() => deleteModalOpen(donation.id)}
                  >
                    <AiTwotoneDelete />
                  </td>
                </tr>
                </tbody>
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
              Browse available donations
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
