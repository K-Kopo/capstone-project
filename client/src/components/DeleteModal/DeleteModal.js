import React from 'react'
import './DeleteModal.scss';
import {FcCancel} from "react-icons/fc";

const DeleteModal = ( {closeDeleteModal, deleteDonation, deleteItem }) => {
    
    return (
        <div className='delete-modal'>
          
                <button className='delete-modal__close' onClick={closeDeleteModal}  ><FcCancel /></button>
                <div className='delete-modal__header'>
                    <h1 className='delete-modal__title'>Are you sure you want to delete this item from your list?</h1>
                </div>
                <div className='delete-modal__footer'>
                    <button className='delete-modal__footer-cancel' onClick={closeDeleteModal}>Cancel</button>
                    <button className='delete-modal__footer-delete' type="submit" onClick={()=>deleteDonation(deleteItem)}>Delete?</button>
                </div>
           
        </div>
    )
}

export default DeleteModal;