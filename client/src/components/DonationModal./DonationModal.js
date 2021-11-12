import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./DonationModal.scss";

const DonationModal = ({ userData, closeModal, refreshPage }) => {
  const [values, setValues] = useState({
    type: "",
    description: "",
    amount: "",
    expires: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

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
    setSubmitted(true);
    if (values.description && values.amount && values.type && values.expires) {
      setIsValid(true);
    }
    axios
      .post("http://localhost:8000/donations", {
        user_id: userData.id,
        ...values,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addDonationContinue = () => {
    closeModal();
    history.push(`/users/${userData.id}`);
    refreshPage();
  };

  return (
    <div className="donation-modal">
      <form className="donation-modal__form" onSubmit={handleOnSubmit}>
        {submitted && isValid ? (
          <div className="donation-modal__success">
            <div className="donation-modal__success--title">
              Donation added!
            </div>
            <button
              className="donation-modal__success--btn"
              onClick={() => addDonationContinue()}
            >
              Continue
            </button>
          </div>
        ) : null}
        <h2 className="donation-modal__title">
          Please fill out the form below
        </h2>
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
        {submitted && !values.type ? (
          <span className="donation-modal__form--error">
            Please select a type
          </span>
        ) : null}

        <label className="donation-modal__form--label" htmlFor="">
          Description of item
        </label>
        <input
          className="donation-modal__form--input"
          onChange={handleDescriptionChange}
          value={values.description}
          placeholder="add description of item"
        ></input>
        {submitted && !values.description ? (
          <span className="donation-modal__form--error">
            Please enter a description
          </span>
        ) : null}
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
        {submitted && !values.amount ? (
          <span className="donation-modal__form--error">
            Please enter an amount
          </span>
        ) : null}
        <label className="donation-modal__form--label" htmlFor="">
          Expires On
        </label>
        <input
          className="donation-modal__form--input"
          onChange={handleExpiresChange}
          type="date"
          value={values.expires}
          placeholder="enter expiration date"
        />
        {submitted && !values.expires ? (
          <span className="donation-modal__form--error">
            Please enter an expiration date
          </span>
        ) : null}
        <div className="donation-modal__form--btnbox">
          <button className="donation-modal__form--button" type="submit">
            SUBMIT
          </button>
          <button
            className="donation-modal__form--cancel"
            onClick={() => closeModal()}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationModal;
