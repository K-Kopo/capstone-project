import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DonationModal from "../../components/DonationModal./DonationModal";
import "../../components/DonationModal./DonationModal.scss";
import "./UserPage.scss";
// import LogInModal from "../../components/LogInButton/LogInButton";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {AiTwotoneDelete} from "react-icons/ai";

class UserPage extends Component {
  state = {
    loggedIn: false,
    userData: [],
    userDonations: [],
    openModal: false,
    openDeleteModal: false,
    isloading: true,
    shouldRefresh: false,
  };

  // const [loggedIn, setLoggedIn] = useState(false);
  // // const [errorMessage, setErrorMessage] = useState("");
  // const [userData, setUserData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [userDonations, setUserDonations] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  handleAuthFail = () => {
    sessionStorage.removeItem("authToken");
    this.setState({
      loggedIn: false
    })
  };
  // const authToken = sessionStorage.getItem("authToken");

  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken");

    // function getUserProfile() {
    //   return axios.get("http://localhost:5000/users/profile", {
    //     headers: {
    //       authorization: `Bearer ${authToken}`,
    //     },
    //   });
    // }

    // function getDonations() {
    //   return axios.get("http://localhost:5000/donations/");
    // }
    // if (authToken) {
    //   Promise.all([getUserProfile(), getDonations()])
    //     .then((results) => {
         
    //       this.setState({
    //         isloading: false,
    //         userData: results[0].data,
    //         userDonations: results[1].data,
    //         loggedIn: true,
    //       });
    //     })
    //     .catch((err) => console.log(err));
    // }
    if (authToken) {
      axios
      .get("http://localhost:5000/donations/")
      .then((res) => {
        this.setState({
          userDonations: res.data,
          isloading: false,
        })
        
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/users/profile", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        this.setState({
                 
                 userData: res.data,
                  loggedIn: true,
                 });
      })
      .catch(() => this.handleAuthFail());
    }
  }
  // console.log(this.state.userDonations);
  // deleteModal = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     openDeleteModal: true
  //   })
  // }
  // closeDeleteModal = () =>  {
  //   this.setState({
  //     openDeleteModal:false
  //   })
  // }
  deleteDonation = (event) => {
    event.preventDefault();
    
    const id = event.target.id.value

    axios.delete(`http://localhost:5000/donations/${id}`,{
      
    })
    .then((response)=>console.log(response))
     
    .catch((error)=>console.log(error))
  };
  render() {
    const { userDonations, userData, isloading, loggedIn, openModal, openDeleteModal } =
      this.state;
    // const history = useHistory();
    
    const logOut = () => {
      sessionStorage.removeItem("authToken");
      this.setState({
        loggedIn: false,
      });
      this.props.history.push("/");
    };
    const donations = userDonations.filter(
      (donation) => donation.user_id === userData.id
      );
      return (
      isloading && !loggedIn ? (
        <h1>please be patient</h1>) : 
        <div className="donation">
        {openDeleteModal && (<DeleteModal closeModal={()=>this.setState({openDeleteModal: false})} deleteModal={()=>this.deleteDonation()}/> )}
        <div className="donation-box">
          <h2 className="donation-box__title">Hello again, {userData.name}</h2>
          <h2 className="donation-box__subtitle">Your current donations</h2>
          <div className="donation-box__tableheads">
            <p className="donation-box__tableheads--titles">Type</p>
            <p className="donation-box__tableheads--titles">
              Description
            </p>
            <p className="donation-box__tableheads--titles">Amount</p>
            <p className="donation-box__tableheads--titles">
              Expires On
            </p>
          </div>

          {donations.map((donation) => {
            return (
              <form className="rest-donation" onSubmit={()=>this.setState({openDeleteModal: true})} key={donation.id}>
                <input className="rest-donation__item--hidden" name="id" value={donation.id} readOnly />
                <input className="rest-donation__item" name="type" value={donation.type} readOnly />
                <input className="rest-donation__item" name="description" value={donation.description} readOnly />
                <input className="rest-donation__item" name="amount" value={donation.amount} readOnly />
                <input className="rest-donation__item" name="expires" value={donation.expires} readOnly />
                <button className="rest-donation__item--delete" onClick={() => this.setState({openDeleteModal:true})}><AiTwotoneDelete /></button>
              </form>
            );
          })}
          <div className="donation-box__btnbox">
            {userData.role === "restaurant" ? (
              <button
                className="donation-box__btn"
                onClick={() => this.setState({ openModal: true })}
              >
                Add donation
              </button>
            ) : (
              <button className="donation-box__donationbtn"
                onClick={() =>
                  this.props.history.push(`/donations/${userData.id}`)
                }
              >
                Browse current donations
              </button>
            )}
            {openModal && (
              <DonationModal
                closeModal={()=>this.setState({openModal: false})}
                userData={userData}
                refreshPage={()=>this.setState({shouldRefresh: true})}
              />
            )}
            <button
              className="donation-box__logoutbtn"
              onClick={() => logOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      )
  }
}

export default withRouter(UserPage);
