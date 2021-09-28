import React from "react";
import { BiFoodMenu } from "react-icons/bi";
import "./DonationsHeader.scss";

const DonationsHeader = () => {
  return (
    <div className="donation-innerbox">
      <div className="donation-innerbox__tableheads">
        <p className="donation-innerbox__tableheads--titles">Type</p>
        <p className="donation-innerbox__tableheads--titles">Description</p>
        <p className="donation-innerbox__tableheads--titles">Amount</p>
        <p className="donation-innerbox__tableheads--titles">Expires On</p>
        <div className="donation-innerbox__tableheads--icon">
          <BiFoodMenu />
        </div>
      </div>
    </div>
  );
};

export default DonationsHeader;
