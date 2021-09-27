import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import DonationModal from "../../components/DonationModal./DonationModal";
import "../../components/DonationModal./DonationModal.scss";
import "./UserPage.scss";

import Donations from "../../components/Donations/Donations";

const PORT = process.env.PORT || 5000;
const dbUrl = `http://localhost:${PORT}`;

class UserPage extends Component {
  state = {
    loggedIn: false,
    userData: [],
  };

  handleAuthFail = () => {
    sessionStorage.removeItem("authToken");

    this.setState({
      loggedIn: false,
    });
  };

  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      this.setState({
        loggedIn: true,
      });

      axios
        .get(`${dbUrl}/users/profile`, {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          this.setState({
            userData: res.data,
          });
        })
        .catch(() => this.handleAuthFail());
    }
  }



  logOut = () => {
    sessionStorage.removeItem("authToken");

    this.setState({
      loggedIn: false,
    });
    this.props.history.push("/");
  };

  render() {
    const { loggedIn, userData } = this.state;
    console.log(userData);

    return (
      <div>
        {!loggedIn && <h1>please be patient</h1>}
        {loggedIn && (
          <Donations
            userdata={userData}
            deleteDonation={() => this.deleteDonation()}
            logout={this.logOut}
          />
        )}
      </div>
    );
  }
}
export default UserPage;
