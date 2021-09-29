import React from 'react'
import './DeleteModal.scss';

const DeleteModal = ( {closeDeleteModal, deleteDonation, donatedItem, deleteItem }) => {
    
    return (
        <div className='modal'>
            <div className='modal__content'>
                <button className='modal__close' onClick={closeDeleteModal}  />
                <div className='modal__header'>
                    <h1 className='modal__title'>Delete {donatedItem} from your list?</h1>
                </div>
                <div className='modal__body'>
                    Please confirm that you’d like to delete the {donatedItem}  from your list of donations. You won’t be able to undo this action.
                </div>
                <div className='modal__footer'>
                    <button className='modal__footer-cancel' onClick={closeDeleteModal}>Cancel</button>
                    <button className='modal__footer-delete' type="submit" onClick={()=>deleteDonation(deleteItem)}>Delete?</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;