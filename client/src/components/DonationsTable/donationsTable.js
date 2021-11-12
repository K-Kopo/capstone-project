import React from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import "../Donations/Donations.scss";
const donationsTable = ({donation, deleteModalOpen}) => {

    const jsDate = (date) => {
        return new Date(date).toISOString().slice(0, 10);
      };
      
            return (
        <tr className = "donation-table__row" key={donation.id}>
        <td className="donation-table__item">{donation.type}</td>
        <td  className="donation-table__item">{donation.description}</td>
        <td className="donation-table__item">{donation.amount}</td>
        <td className="donation-table__item">{jsDate(donation.expires)}</td>
        <button className="rest-donation__item--delete" onClick={()=>deleteModalOpen(donation.id)}>
           <AiTwotoneDelete />
        </button>
        </tr>)
        
};

export default donationsTable;
