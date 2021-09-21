import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userDonations, setUserDonations] = useState([]);
  
//    handleAuthFail = () => {
//         sessionStorage.removeItem('authToken');
//        setLoggedIn(false);
//       }
    useEffect(() => {
      const authToken = sessionStorage.getItem("authToken");
      
        axios.get('http://localhost:5000/users/profile', {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        }).then (res => {
            setUserData(res.data);
            setIsLoading(false);
            console.log(res.data);
        }).catch (() => (sessionStorage.removeItem('authToken'), setLoggedIn(false)));
     
    }, []);
    axios.get('http://localhost:5000/donations/')
    .then(response => {
        setUserDonations(response.data)
    })
    .catch((error) => console.log(error));

    const donations = userDonations.filter(donation => donation.user_id === userData.id);
    console.log(donations);
    return (
        isLoading ? <h1>PATIENCE IS A VIRTUE...</h1> :
        
        <div>
            <h2>Hello again, {userData.name}</h2>
        </div>
    );
};

export default UserPage;