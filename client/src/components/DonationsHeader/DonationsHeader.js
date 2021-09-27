import React from 'react';
import { BiFoodMenu } from "react-icons/bi";
import "./DonationsHeader.scss"

const DonationsHeader = () => {
    return (
        <div className="donation-box">
      
       
        <div className="donation-box__tableheads">
          <p className="donation-box__tableheads--titles">Type</p>
          <p className="donation-box__tableheads--titles">Description</p>
          <p className="donation-box__tableheads--titles">Amount</p>
          <p className="donation-box__tableheads--titles">Expires On</p>
          <div><BiFoodMenu /></div>
        </div>
        </div>
    );
};

export default DonationsHeader;