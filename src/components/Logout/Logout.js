import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebaseConfig from '../Login/firebaseConfig';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Logout = ({todos}) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const signOut = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .signOut()
            .then(() => {
                fetch(`http://localhost:5000/updateLogout?email=${loggedInUser.email}`, {
                    method: "PATCH",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isSignedIn: true })
                })
                    .then(res => res.json())
                    .then(result => setLoggedInUser({}))
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    if (!loggedInUser.isSignedIn) {
         return null
    };

    return (
        <div className="navigation">
            <a className="logout-btn" href=".." onClick={e => signOut(e)}>
                <img className="profile" src={todos[0].photo || "https://i.ibb.co/5GzXkwq/user.png"} alt="" />
                <div className="logout">LOGOUT</div>
            </a>
        </div>
    );
};

export default Logout;