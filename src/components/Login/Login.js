import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserContext } from "../../App";
import firebaseConfig from './firebaseConfig';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const uiConfig = {
        signInFlow: 'popup',

        signInSuccessUrl: '/signedIn',

        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],

        callbacks: {
            signInSuccessWithAuthResult: (authResult) => handleResponse(authResult)
        }
    }

    const handleResponse = (res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        setLoggedInUser(signedInUser);
    }

    console.log(loggedInUser);

    return (
        <div>
            <h2 className="title">Please Sign in!</h2>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )


};

export default Login;