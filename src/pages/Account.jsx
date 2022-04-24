import React, { useState } from "react";
// import { useHistory } from "react-router";
import classNames from "classnames";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";

import Helmet from "../components/Helmet";
import Login from "../components/AccountBox/Login";
import Signup from "../components/AccountBox/Signup";

import Logo from "../assets/img/logo2.png";

import { AccountContext } from "../components/AccountBox/context";
import { auth } from "../config/firebase-config";
import { db } from "../config/firebase-config";

const Account = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // const [user, setUser] = useState({});

  // const history = useHistory();

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };
  
  // Đăng ký từ auth fire
  const signup = async () => {
    try {
      if (confirmPassword === signupPassword) {
        await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
        clearErrors();
        if (auth.currentUser) {
          handleAccount(); // Nếu đăng ký tài khoản thành công thì add dữ liệu vào db
        }
      } else {
        setConfirmPasswordError("Those passwords didn't match. Try again.");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(error.message);
          break;
        case "auth/weak-password":
          setPasswordError(error.message);
          break;
        default:
          break;
      }
    }
  };

  // Đăng nhập từ auth firebase
  const login = async () => {
    try {
      clearErrors();
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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

  const avatar =
    "https://firebasestorage.googleapis.com/v0/b/article-fcde4.appspot.com/o/avatar%2Fkisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0997cce2.5463555115323166816218.png?alt=media&token=a2bbbb9f-143a-4fc1-b106-8fc0ee3b8743";

  // Thêm tài khoản vào db "Account"

  const handleAccount = async () => {
    const collectionRef = collection(db, "Account");
    const payload = {
      user: `User${parseInt(Math.random() * (10000 + 1)).toString()}`,
      email: signupEmail,
      password: signupPassword,
      accountType: "Guest",
      avatar: avatar,
    };
    await addDoc(collectionRef, payload);
  };

  const [active, setActive] = useState("login");

  const switchToSignup = () => {
    clearErrors();
    setActive("signup");
  };

  const switchToLogin = () => {
    clearErrors();
    setActive("login");
  };

  const contextValue = {
    switchToSignup,
    switchToLogin,
  };

  return (
    <Helmet title="Chorus Authentication">
      <AccountContext.Provider value={contextValue}>
        <div className="account">
          <div className="account__box">
            <div className="account__box__logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="account__box__header">
              <div className="account__box__header__tabs">
                <div className="account__box__header__tabs__account">
                  <a
                    className={classNames(active === "login" && "onActive")}
                    href="#login"
                    onClick={switchToLogin}
                  >
                    log in
                  </a>
                </div>
                <div className="account__box__header__tabs__signup">
                  <a
                    className={classNames(active === "signup" && "onActive")}
                    href="#signup"
                    onClick={switchToSignup}
                  >
                    sign up
                  </a>
                </div>
              </div>
              {active === "login" && (
                <Login
                  loginEmail={loginEmail}
                  setLoginEmail={setLoginEmail}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                  emailError={emailError}
                  passwordError={passwordError}
                  login={login}
                  // user={user}
                />
              )}
              {active === "signup" && (
                <Signup
                  signupEmail={signupEmail}
                  setSignupEmail={setSignupEmail}
                  signupPassword={signupPassword}
                  setSignupPassword={setSignupPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  emailError={emailError}
                  passwordError={passwordError}
                  confirmPasswordError={confirmPasswordError}
                  signup={signup}
                />
              )}
            </div>
          </div>
        </div>
      </AccountContext.Provider>
    </Helmet>
  );
};

export default Account;
