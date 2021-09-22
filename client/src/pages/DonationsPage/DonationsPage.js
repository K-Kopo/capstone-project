import axios from 'axios';
import React, {useState, useEffect} from 'react';

const DonationsPage = () => {
const [donationsData, setDonationsData] = useState([]);
const [loggedIn, setLoggedIn] = useState(false);


useEffect(()=> {
    const authToken = sessionStorage.getItem("authToken");
    authToken ? setLoggedIn(true) : setLoggedIn(false);

    axios.get("http://localhost:5000/donations")
    .then((response) => {
        setDonationsData(response.data);
        
    })
    .catch((error)=> console.log(error));
}, [])
console.log(donationsData);
    return loggedIn ? (
        <div>
            Donations table!
            {donationsData.map((donation)=> {
                return (
                    <ul key={donation.id}>
                    <li>{donation.type}</li>
                    <li>{donation.description}</li>
                    <li>{donation.amount}</li>
                    <li>{donation.expires}</li>
                    <button>add to list</button>
                    </ul>
                )
            })}
        </div>
    ) : <p>must be logged in in to see donations list</p>
}

export default DonationsPage;