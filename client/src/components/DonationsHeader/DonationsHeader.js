import React from "react";
import { BiFoodMenu } from "react-icons/bi";
import "./DonationsHeader.scss";

const DonationsHeader = () => {
  return (
    <thead className="donation-tablehead">
      <tr className="donation-tablehead__row">
        <th className="donation-tablehead__titles">Type</th>
        <th className="donation-tablehead__titles">Description</th>
        <th className="donation-tablehead__titles">Amount</th>
        <th className="donation-tablehead__titles">Expires On</th>
        {/* <th className="donation-tablehead__titles">Restaurant</th> */}
        <th className="donation-innerbox__tableheads--icon">
          <BiFoodMenu />
        </th>
      </tr>
    </thead>
  );
};

export default DonationsHeader;
