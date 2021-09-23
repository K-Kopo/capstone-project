import React, {useState} from 'react';
import LogInModal from "../LogInModal/LogInModal"


const LogInButton = ({history}) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <button onClick={() => setOpenModal(true)} className="homepage__login-btn">Log In</button>
            {openModal && (<LogInModal history={history} closeModal={setOpenModal}/>)}
        </div>
    );
};

export default LogInButton;