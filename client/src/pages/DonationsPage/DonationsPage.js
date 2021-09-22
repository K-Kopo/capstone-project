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
const handleOnSubmit = (event) => {
    event.preventDefault();
    axios.put("http://localhost:5000/donations", {
        user_id: event.target.value
    })
}
console.log(donationsData);
    return loggedIn ? (
        <div>
            Donations table!
            {donationsData.map((donation)=> {
                return (
                    <form key={donation.id}>
                    <p value={donation.type}>{donation.type}</p>
                    <p value={donation.description}>{donation.description}</p>
                    <p value={donation.amount}>{donation.amount}</p>
                    <p value={donation.expires}>{donation.expires}</p>
                    <button type="submit">add to my list</button>
                    </form>
                )
            })}
        </div>
    ) : <p>must be logged in to see donations pst</p>
}

export default DonationsPage;