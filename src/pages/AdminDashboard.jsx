import React, { useState, useEffect } from "react";
import classNames from "classnames";

import User from "../components/AdminDashboard/User";
import HomeAdmin from "../components/AdminDashboard/HomeAdmin";
import News from "../components/AdminDashboard/News";
import Category from "../components/AdminDashboard/Category";
import Helmet from "../components/Helmet";

const AdminDashboard = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Helmet title="Admin Dashboard">
      <div className="admin-dashboard">
        <div className="admin-dashboard__left">
          <div className="admin-dashboard__left__nav">
            <p>Dashboard</p>
            <div className="admin-dashboard__left__nav__subnav">
              <a
                className={classNames(active === "home" && "onActive")}
                href="#home"
                onClick={() => setActive("home")}
              >
                <i class="bx bx-home">&nbsp;</i>Trang chủ
              </a>
              <a
                className={classNames(active === "user" && "onActive")}
                href="#user"
                onClick={() => setActive("user")}
              >
                <i class="bx bx-user">&nbsp;</i>Người dùng
              </a>
              <a
                className={classNames(active === "category" && "onActive")}
                href="#category"
                onClick={() => setActive("category")}
              >
                <i class="bx bx-category">&nbsp;</i>Ngành
              </a>
              <a
                className={classNames(active === "news" && "onActive")}
                href="#news"
                onClick={() => setActive("news")}
              >
                <i class="bx bx-news">&nbsp;</i>Loài
              </a>
            </div>
          </div>
        </div>
        <div className="admin-dashboard__right">
          {active === "home" && <HomeAdmin />}
          {active === "user" && <User />}
          {active === "category" && <Category />}
          {active === "news" && <News />}
        </div>
      </div>
    </Helmet>
  );
};

export default AdminDashboard;
