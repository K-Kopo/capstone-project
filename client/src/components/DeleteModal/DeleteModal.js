import React from 'react'
import './DeleteModal.scss';

const DeleteModal = ( {closeModal, deleteDonation, userDonations}) => {

    return (
        <div className='modal'>
            <div className='modal__content'>
                <button className='modal__close' onClick={()=>closeModal()}  />
                <div className='modal__header'>
                    <h1 className='modal__title'>Delete {userDonations.description} from your list?</h1>
                </div>
                <div className='modal__body'>
                    Please confirm that you’d like to delete the {userDonations.description}  from your list of donations. You won’t be able to undo this action.
                </div>
                <div className='modal__footer'>
                    <button className='modal__footer-cancel' onClick={()=>closeModal()}>Cancel</button>
                    <button className='modal__footer-delete' type="submit" onClick={()=>deleteDonation()}>Delete?</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;