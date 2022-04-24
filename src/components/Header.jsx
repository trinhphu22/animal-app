import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onSnapshot, collection } from "@firebase/firestore";

import Logo from "../assets/img/logo2.png";
import { auth } from "../config/firebase-config";
import { db } from "../config/firebase-config";

import HeaderRight from "./HeaderRight";


const Header = () => {
  const [catalog, setCatalog] = useState([]);
  const [profile, setProfile] = useState([]);

  const { pathname } = useLocation();
  const activeNav = catalog.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null); //scroll

  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser("");
    }
  });

  const logout = () => {
    signOut(auth);
  };

  // Đọc dữ liệu từ auth

  useEffect(
    () =>
      onSnapshot(collection(db, "Account"), (snapshot) => {
        setProfile(
          snapshot.docs.filter((doc) => {
            if (user) {
              if (doc.data().email === user?.email) {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              }
            }
            return false;
          })
        );
      }),
    [user]
  );

  // Đọc dữ liệu từ Catolog

  useEffect(
    () =>
      onSnapshot(collection(db, "Catolog"), (snapshot) => {
        setCatalog(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80 //nếu scroll > 80
      ) {
        headerRef.current.classList.add("shrink"); //thêm vào "shrink" vào classname
      } else {
        headerRef.current.classList.remove("shrink"); //xoá "shrink" khỏi classname
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null); //toggle tablet or mobile

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div>
      <div className="header" ref={headerRef}>
        <div className="container">
          <div className="header__logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="header__menu">
            <div className="header__menu__mobile-toggle" onClick={menuToggle}>
              <i class="bx bx-menu-alt-left"></i>
            </div>
            <div className="header__menu__left" ref={menuLeft}>
              <div className="header__menu__left__close" onClick={menuToggle}>
                <i class="bx bx-chevron-left"></i>
              </div>
              {catalog.map((item, index) => (
                <div
                  key={index}
                  className={`header__menu__item header__menu__left__item 
                  ${index === activeNav ? "active" : ""}
                  `}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.category}</span>
                  </Link>
                </div>
              ))}
            </div>
            {profile.length > 0 ? (
              <HeaderRight
                user={user}
                active={active}
                setActive={setActive}
                logout={logout}
                profile={profile[0]}
                setUser={setUser}
              />
            ) : (
              <HeaderRight user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
