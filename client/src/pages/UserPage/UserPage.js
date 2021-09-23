import React, { useEffect, useState } from "react";
import axios from "axios";
import DonationModal from "../../components/DonationModal./DonationModal";
import "../../components/DonationModal./DonationModal.scss";

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
    <h1>please log in!</h1>
  ) : (
    <div>
      <h2>Hello again, {userData.name}</h2>
      {donations.map((donation) => {
        return (
          <ul key={donation.id}>
            <div>{donation.type}</div>
            <div>{donation.description}</div>
            <div>{donation.amount}</div>
            <div>{donation.expires}</div>
          </ul>
        );
      })}
      <button onClick={() => setOpenModal(true)}>Add donation</button>
      {openModal && (
        <DonationModal closeModal={setOpenModal} userData={userData} />
      )}
      <button onClick={() => logOut()}>Logout</button>
    </div>
  );
};

export default UserPage;
