import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Login from '../Login/Login';

const LoginPopup = ({ showPopup, onClose }) => {
    const { loggedInUser } = useContext(UserContext);

    return showPopup && !loggedInUser.isSignedIn && (
        <div className="popup">
            <div className="popup-contents">
                <div onClick={onClose} className="close-btn">+</div>
                <Login />
            </div>
        </div>
    );
};

export default LoginPopup;