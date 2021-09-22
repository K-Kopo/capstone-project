import React, { useState } from "react";
import axios from "axios";
import "./DonationModal.scss";

const DonationModal = ({ userData, closeModal, history }) => {
  const [values, setValues] = useState({
    type: "",
    description: "",
    amount: "",
    expires: "",
  });

  const handleTypeChange = (event) => {
    setValues({ ...values, type: event.target.value });
  };
  const handleDescriptionChange = (event) => {
    setValues({ ...values, description: event.target.value });
  };
  const handleAmountChange = (event) => {
    setValues({ ...values, amount: event.target.value });
  };
  const handleExpiresChange = (event) => {
    setValues({ ...values, expires: event.target.value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/donations", {
        user_id: userData.id,
        ...values,
      })
      .then((response) => {
        // res.status(200).json(res.data);
        history.push("/");
      });
  };

  return (
    <div className="donation_modal">
      <form className="donation_modal__form" onSubmit={handleOnSubmit}>
        <select
          className="donation_modal__form--select"
          onChange={handleTypeChange}
          value={values.type}
          htmlFor=""
        >
          <option value="">Select type of donation</option>
          <option value="prepared">Prepared Food</option>
          <option value="bulk">Bulk Ingredient</option>
        </select>
        <label className="donation_modal__form--label" htmlFor="">
          Description of item
        </label>
        <textarea
          className="donation_modal__form--textarea"
          onChange={handleDescriptionChange}
          value={values.description}
          placeholder="add description of item"
        ></textarea>
        <label className="donation_modal__form--label" htmlFor="">
          Amount
        </label>
        <input
          className="donation_modal__form--input"
          onChange={handleAmountChange}
          type="text"
          value={values.amount}
          placeholder="enter amount"
        />
        <label className="donation_modal__form--label" htmlFor="">
          Expires On
        </label>
        <input
          className="donation_modal__form--input"
          onChange={handleExpiresChange}
          type="text"
          value={values.expires}
          placeholder="enter expiration date"
        />
        <button className="donation_modal__form--button" type="submit">
          SUBMIT
        </button>
        <button
          className="donation_modal__form--cancel"
          onClick={() => closeModal(false)}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default DonationModal;
