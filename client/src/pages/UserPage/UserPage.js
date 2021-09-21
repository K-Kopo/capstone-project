import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
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
        }).catch (() => (sessionStorage.removeItem('authToken'), setLoggedIn(false)));
     
    }, []);

    return (
        isLoading ? <h1>PATIENCE IS A VIRTUE...</h1> :

        <div>
            <h2>Hello again, {userData.name}</h2>
        </div>
    );
};

export default UserPage;