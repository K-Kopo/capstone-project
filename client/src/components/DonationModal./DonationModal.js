import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./DonationModal.scss";

const DonationModal = ({ userData, closeModal }) => {
  const [values, setValues] = useState({
    type: "",
    description: "",
    amount: "",
    expires: "",
  });
  const history = useHistory()

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
    console.log(event.target);
    axios
      .post("http://localhost:5000/donations", {
        user_id: userData.id,
        ...values,
      })
      .then((response) => {
        // res.status(200).json(res.data);
        history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="donation-modal">
      <form className="donation-modal__form" onSubmit={handleOnSubmit}>
      <h2 className="donation-modal__title">Please fill out the form below</h2>
        <select
          className="donation-modal__form--select"
          onChange={handleTypeChange}
          value={values.type}
          htmlFor=""
        >
          <option value="">Select type of donation</option>
          <option value="prepared">Prepared Food</option>
          <option value="bulk">Bulk Ingredient</option>
        </select>
        <label className="donation-modal__form--label" htmlFor="">
          Description of item
        </label>
        <input
          className="donation-modal__form--input"
          onChange={handleDescriptionChange}
          value={values.description}
          placeholder="add description of item"
        ></input>
        <label className="donation-modal__form--label" htmlFor="">
          Amount
        </label>
        <input
          className="donation-modal__form--input"
          onChange={handleAmountChange}
          type="text"
          value={values.amount}
          placeholder="enter amount"
        />
        <label className="donation-modal__form--label" htmlFor="">
          Expires On
        </label>
        <input
          className="donation-modal__form--input"
          onChange={handleExpiresChange}
          type="text"
          value={values.expires}
          placeholder="enter expiration date"
        />
        <div className="donation-modal__form--btnbox">
        <button className="donation-modal__form--button" type="submit">
          SUBMIT
        </button>
        <button
          className="donation-modal__form--cancel"
          onClick={() => closeModal(false)}
        >
          CANCEL
        </button>
        </div>
      </form>
    </div>
  );
};

export default DonationModal;
