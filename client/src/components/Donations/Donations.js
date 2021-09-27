import React, {useState, useEffect} from 'react';
import axios from "axios";
import UserPage from '../../pages/UserPage/UserPage';
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import DonationModal from "../../components/DonationModal./DonationModal";
import { useHistory } from 'react-router';





const Donations = ({userdata, history, logout}) => {
    const PORT = process.env.PORT || 5000;
    const dbUrl = `http://localhost:${PORT}`
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userDonations, setUserDonations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    history = useHistory();
    useEffect(()=> {
        axios
        .get(`${dbUrl}/donations/`)
        .then((res) => {
          setUserDonations(res.data);
          setIsLoading(false);
          // this.setState({
          //   userDonations: res.data,
          //   isloading: false,
          // });
        })
        .catch((error) => console.log(error));
    
    },[shouldRefresh])
      // console.log(this.state.userDonations);
 const deleteModal = () => {
    setOpenDeleteModal(true)
  }
  const closeDeleteModal = () =>  {
    setOpenDeleteModal(false)
  }
  const jsDate = (date)=> {
    return new Date(date).toISOString().slice(0, 10);
    }
    // const logOut = () => {
    //     sessionStorage.removeItem("authToken");
    //     setLoggedIn(false);
    //     // this.setState({
    //     //   loggedIn: false,
    //     // });
    //     history.push("/");
    //   };
      console.log(userdata);
    const eachDonations = userDonations.filter(
        (donation) => donation.user_id === userdata.id
      );
    return isLoading ? <p>patience is a virtue</p> : (
       
         <div className="donation">
             
        <div className="donation-box">
          <h2 className="donation-box__title">Hello again,{userdata.name}</h2>
          <h2 className="donation-box__subtitle">Your current donations</h2>
          <div className="donation-box__tableheads">
            <p className="donation-box__tableheads--titles">Type</p>
            <p className="donation-box__tableheads--titles">Description</p>
            <p className="donation-box__tableheads--titles">Amount</p>
            <p className="donation-box__tableheads--titles">Expires On</p>
          </div>

          {eachDonations.map((donation) => {
            return (
              <form
              className="rest-donation"
              onSubmit={() => this.setState({ openDeleteModal: true })}
              key={donation.id}
              >
      
                <input
                  className="rest-donation__item--hidden"
                  name="id"
                  value={donation.id}
                  readOnly
                  />
                <input
                  className="rest-donation__item"
                  name="type"
                  value={donation.type}
                  readOnly
                  />
                <input
                  className="rest-donation__item"
                  name="description"
                  value={donation.description}
                  readOnly
                  />
                <input
                  className="rest-donation__item"
                  name="amount"
                  value={donation.amount}
                  readOnly
                  />
                <input
                  className="rest-donation__item"
                  name="expires"
                  value={jsDate(donation.expires)}
                  
                  />
                <button
                  className="rest-donation__item--delete"
                  onClick={() => setOpenDeleteModal(true)}
                  >
                  <AiTwotoneDelete />
                </button>
              </form>
            );
          })}
          <div className="donation-box__btnbox">
            {userdata.role === "restaurant" ? (
              <button
              className="donation-box__btn"
              onClick={() => setOpenModal(true)}
              >
                Add donation
              </button>
            ) : (
              <button
              className="donation-box__donationbtn"
              onClick={() =>
                history.push(`/donations/${userdata.id}`)
                }
                >
                Browse current donations
              </button>
            )}
                {openDeleteModal && (
                  <DeleteModal
                  userDonations={eachDonations}
                    closeModal={() => setOpenDeleteModal(true)}
                    deleteDonation={() => this.deleteDonation()}
                  />
                )}
            {openModal && (
              <DonationModal
                closeModal={() => setOpenModal(false)}
                userData={userdata}
                refreshPage={() => setShouldRefresh(true)}
              />
            )}
            <button
              className="donation-box__logoutbtn"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    
    );
};

export default Donations;