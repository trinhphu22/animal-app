import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";

import { auth } from "../config/firebase-config";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Nếu đăng nhập bằng user admin thì chuyển sang trang admindashboard
        if (currentUser?.email === "admin@gmail.com") {
          setUser(currentUser);
          history.push("/admindashboard");
        } else if (currentUser?.email !== "admin@gmail.com") {
          // Nếu đăng nhập khác user admin thì chuyển sang trang chủ
          setUser(currentUser);
          history.push("/");
        }
      } else {
        setUser("");
        history.push("/account");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [history, user]);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
