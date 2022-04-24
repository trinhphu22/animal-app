import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  onSnapshot,
  collection,
  query,
  where,
  // doc,
  // deleteDoc,
} from "@firebase/firestore";

import { db } from "../config/firebase-config";

const HeaderRight = (props) => {
  const { user, active, setActive, logout, profile } = props;

  const [alert, setAlert] = useState();

  //Lọc dữ liệu trong bảng Article và show lên

  useEffect(
    () => {
      if (profile) {
        onSnapshot(
          query(
            collection(db, "Message"),
            where("status", "==", false),
            where("author", "==", profile.data().user)
          ),
          (snapshot) =>
            setAlert(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
        )
      }
    },
    [profile]
  );

  return (
    <div className="header__menu__right">
      <div className="header__menu__item header__menu__right__item">
        {/* <i className="bx bx-search"></i> */}
      </div>
      {!user ? (
        <Link
          to={"/account"}
          className="header__menu__item header__menu__right__item"
        >
          <i className="bx bx-user header__menu__item"></i>
        </Link>
      ) : (
        <div>
          {profile && (
            <div className="header__menu__right__item">
              <div className="box-user">
                <Link
                  to={`/profile/?id=${profile.id}`}
                  className="box-user__info"
                >
                  <div className="box-user__info__displayname">
                    {profile.data().user}
                  </div>
                  <div className="box-user__info__image">
                    <img src={profile.data().avatar} alt="" />
                  </div>
                </Link>
                {!active && (
                  <div
                    onClick={() => {
                      setActive(true);
                    }}
                    className="box-user__down"
                  >
                    <i class="bx bx-caret-down"></i>
                  </div>
                )}
                {active && (
                  <div
                    onClick={() => {
                      setActive(false);
                    }}
                    className={classNames(
                      "box-user__down",
                      active && "on-click-down"
                    )}
                  >
                    <i class="bx bx-caret-down"></i>
                  </div>
                )}
              </div>
              {active && (
                <div
                  onClick={() => {
                    setActive(false);
                  }}
                  className="subnav-user"
                >
                  <div className="subnav-user__image">
                    <div className="subnav-user__image__box">
                      <img src={profile.data().avatar} alt="" />
                      <div className="info">
                        <div className="info__user">
                          {profile.data().user}
                          <span>({profile.data().accountType})</span>
                        </div>
                        <div className="info__email">
                          {profile.data().email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/profile/?id=${profile.id}`}
                    className="subnav-user__tag"
                  >
                    <div className="subnav-user__tag__left">
                      <i class="bx bxs-user-account"></i>
                    </div>
                    <div className="subnav-user__tag__center">Hồ sơ cá nhân</div>
                    <div className="subnav-user__tag__right">
                      <i class="bx bx-chevron-right"></i>
                    </div>
                  </Link>
                  <Link
                    to={`/message/?id=${profile.id}`}
                    className="subnav-user__tag"
                  >
                    <div className="subnav-user__tag__left">
                      <i class="bx bx-bell"></i>
                    </div>
                    <div className="subnav-user__tag__center">Tin nhắn</div>
                    {alert.length > 0 && (
                      <div class="subnav-user__tag__alert">{alert.length}</div>
                    )}
                    <div className="subnav-user__tag__right">
                      <i class="bx bx-chevron-right"></i>
                    </div>
                  </Link>
                  {(profile.data().accountType === "Admin" ||
                    profile.data().accountType === "Author") && (
                    <Link
                      to={`/postnew/?id=${profile.id}`}
                      className="subnav-user__tag"
                    >
                      <div className="subnav-user__tag__left">
                        <i class="bx bx-detail"></i>
                      </div>
                      <div className="subnav-user__tag__center">Thêm loài mới</div>
                      <div className="subnav-user__tag__right">
                        <i class="bx bx-chevron-right"></i>
                      </div>
                    </Link>
                  )}
                  {profile.data().accountType === "Admin" && (
                    <Link to={"/admindashboard"} className="subnav-user__tag">
                      <div className="subnav-user__tag__left">
                        <i class="bx bx-shield-quarter"></i>
                      </div>
                      <div className="subnav-user__tag__center">
                        Quản lý
                      </div>
                      <div className="subnav-user__tag__right">
                        <i class="bx bx-chevron-right"></i>
                      </div>
                    </Link>
                  )}

                  <Link
                    to={"/"}
                    onClick={() => {
                      logout();
                      setActive(false);
                    }}
                    className="subnav-user__tag"
                  >
                    <div className="subnav-user__tag__left">
                      <i class="bx bx-log-out"></i>
                    </div>
                    <div className="subnav-user__tag__center">Đăng xuất</div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderRight;
