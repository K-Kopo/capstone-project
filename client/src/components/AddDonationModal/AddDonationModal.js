import React from "react";
import { FcCancel } from "react-icons/fc";
import "./AddDonationModal.scss";

const AddDonationModal = ({closeAddModal,handleOnSubmit}) => {
  return (
    <div className="add-modal">
      <button className="add-modal__close" onClick={closeAddModal}>
        <FcCancel />
      </button>
      <div className="add-modal__header">
        <h1 className="add-modal__title">
          Are you sure you want to add this item to your list?
        </h1>
      </div>
      <div className="add-modal__footer">
        <button
          className="add-modal__footer-cancel"
          onClick={closeAddModal}
        >
          Cancel
        </button>
        <button
          className="add-modal__footer-delete"
          type="submit"
          onClick={handleOnSubmit}
        >
          Add?
        </button>
      </div>
    </div>
  );
};

export default AddDonationModal;
