import React from "react";
import { Link } from "react-router-dom";

import Grid from "./Grid";
import Logo from "../assets/img/logo2.png";

const footerMoreLinks = [
  {
    display: "iPhone 13",
    path: "/",
  },
  {
    display: "4th stimulus check status",
    path: "/",
  },
  {
    display: "Best VPN service of 2021",
    path: "/",
  },
  {
    display: "The best Wi-Fi routers for 2021",
    path: "/",
  },
  {
    display: "Windows 10 tips and tricks",
    path: "/",
  },
];

const footerAboutLinks = [
  {
    display: "About COMPUTERWORLD",
    path: "/",
  },
  {
    display: "Newsletter",
    path: "/",
  },
  {
    display: "Sitemap",
    path: "/",
  },
  {
    display: "Careers",
    path: "/",
  },
  {
    display: "Help Center",
    path: "/",
  },
  {
    display: "Licensing",
    path: "/",
  },
];

const footerPoliciesLinks = [
  {
    display: "Privacy Policy",
    path: "/",
  },
  {
    display: "Terms of Use",
    path: "/",
  },
  {
    display: "Cookie Settings",
    path: "/",
  },
  {
    display: "Do Not Sell My Information",
    path: "/",
  },
];

const footerFollowLinks = [
  {
    display: <i class="bx bxl-facebook footer__icons__icon"></i>,
    path: "/",
  },
  {
    display: <i class="bx bxl-twitter footer__icons__icon"></i>,
    path: "/",
  },
  {
    display: <i class="bx bxl-youtube footer__icons__icon"></i>,
    path: "/",
  },
  {
    display: <i class="bx bxl-instagram footer__icons__icon"></i>,
    path: "/",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={5} mdCol={2} smCol={1} gap={10}>
          <div>
            <p>
              <Link to="/">
                <img src={Logo} className="footer__logo" alt="" />
              </Link>
            </p>
          </div>
          <div>
            <div className="footer__title">more from computerworld</div>
            <div className="footer__content">
              {footerMoreLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">about</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">pilicies</div>
            <div className="footer__content">
              {footerPoliciesLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">follow</div>
            <div className="footer__icons">
              {footerFollowLinks.map((item, index) => (
                <div key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <div className="footer__bottom">
          <p>Copyright © 2021 IDG Communications, Inc</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
