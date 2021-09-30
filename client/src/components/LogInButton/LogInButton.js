import React, {useState} from 'react';
import LogInModal from "../LogInModal/LogInModal"
import "./LogInButton.scss";


const LogInButton = ({history}) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <button onClick={() => setOpenModal(true)} className="login-btn">Log In</button>
            {openModal && (<LogInModal history={history} closeModal={setOpenModal}/>)}
        </div>
    );
};

export default LogInButton;