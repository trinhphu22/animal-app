import React from "react";

const Login = (props) => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    emailError,
    passwordError,
    login,
  } = props;

  return (
    <>
      <div className="account__box__body">
        <input
          type="text"
          placeholder="Email"
          autoFocus
          required
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          value={loginEmail}
        />
        <p className="account__box__body__message">{emailError}</p>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          value={loginPassword}
        />
        <p className="account__box__body__message">{passwordError}</p>
      </div>
      <div className="account__box__footer">
        <button onClick={login}>Log In</button>
        <a href="#a">Forgotten password?</a>
      </div>
    </>
  );
};

export default Login;
