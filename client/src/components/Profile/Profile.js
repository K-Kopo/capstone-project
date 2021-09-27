import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
state = {
    userData: [],
}
    componentDidMount() {
        axios
        .get(`${dbUrl}/users/profile`, {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          // setIsLoading(true);
          // setLoggedIn(true);
          // setUserData(res.data);
          this.setState({
            userData: res.data,
            
          });
        })
        .catch(() => this.handleAuthFail());
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Profile;