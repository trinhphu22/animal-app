import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  // onAuthStateChanged
} from "firebase/auth";
import { useHistory } from "react-router";

import Helmet from "../components/Helmet";

import Logo from "../assets/img/logo2.png";

import { auth } from "../config/firebase-config";

const Admin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [messageError, setMessageError] = useState("");

  const history = useHistory();

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser) {
  //     history.push("/admindashboard");
  //   }
  // });

  const login = async () => {
    try {
      clearErrors();
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      history.push("/admindashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
        default:
          break;
      }
    }
  };
  const Login = () => {
    if (loginEmail === "admin@gmail.com") {
      login();
    } else {
      setMessageError("Your account does not have access");
    }
  };

  return (
    <Helmet title="Admin Login">
      <div className="account">
        <div className="account__box">
          <div className="account__box__logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="account__box__header">
            <div className="account__box__header__tabs">
              <div className="account__box__header__tabs__account">
                <a href="#admin">Admin Login</a>
              </div>
            </div>
            <div className="account__box__body">
              <input
                type="text"
                placeholder="Email"
                autoFocus
                required
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
              />
              <p className="account__box__body__message">{emailError}</p>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
              <p className="account__box__body__message">{passwordError}</p>
              <p className="account__box__body__message">{messageError}</p>
            </div>
            <div className="account__box__footer">
              <button onClick={Login}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Admin;
