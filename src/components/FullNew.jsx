import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { db } from "../config/firebase-config";

import Helmet from "./Helmet";

const FullNew = (props) => {
  const New = props.New;
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState([]);
  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  // Tìm dữ liệu bài báo có id = id

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(collection(db, "Animal"), (snapshot) => {
      setArticle(
        snapshot.docs.filter((doc) => {
          if (doc.id === New) {
            const temp = doc.data();
            return {
              ...temp,
              id: doc.id,
            };
          }
          return false;
        })
      );
    });
  }, [New]);

  // Tìm user = author

  useEffect(() => {
    if (article.length > 0) {
      onSnapshot(
        query(
          collection(db, "Account"),
          where("user", "==", article[0].data().author)
        ),
        (snapshot) =>
          setUser(
            snapshot.docs.filter((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      );
    }
  }, [article]);

  // Đọc dữ liệu từ Animal trên firebase v9
  useEffect(() => {
    onSnapshot(
      // Lọc dữ liệu có trạng thái cho phép đăng ("status" == true)
      query(collection(db, "Animal"), where("status", "==", true)),
      (snapshot) => 
        setArticles(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
    );
  }, []);

  return (
    <div className="fullnew">
      {article.length > 0 && (
        <Helmet title={article[0].data().tenvietnam}>
          <div>
            <div className="fullnew__top">
              <div className="fullnew__top__text">
                <div className="fullnew__top__text__tenvietnam">
                  {article[0].data().tenvietnam}
                </div>
                <div className="fullnew__top__text__nganh">
                  {article[0].data().nganh}
                </div>
              </div>
              {user.length > 0 && (
                <div className="fullnew__top__author">
                  <Link
                    to={`/profile/?id=${user[0].id}`}
                    className="fullnew__top__author__image"
                  >
                    <img src={user[0].data().avatar} alt="" />
                  </Link>
                  <p>By</p>
                  <Link
                    to={`/profile/?id=${user[0].id}`}
                    className="fullnew__top__author__user"
                  >
                    <span>{user[0].data().user}</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="fullnew__content">
              <div className="fullnew__content__left">
                <img src={article[0].data().image} alt="" />
              </div>
              <div className="fullnew__content__right">
                <div className="title">Thông tin</div>
                <div className="text">
                  <span className="subtitle">Tên khoa học: </span>
                  {article[0].data().tenkhoahoc} <br />
                  <span className="subtitle">Tên tiếng Việt: </span>
                  {article[0].data().tenvietnam} <br />
                  <span className="subtitle">Tên địa phương: </span>
                  {article[0].data().tendiaphuong} <br />
                  <span className="subtitle">Ngành: </span>
                  {article[0].data().nganh} <br />
                  <span className="subtitle">Lớp: </span>
                  {article[0].data().lop} <br />
                  <span className="subtitle">Bộ: </span>
                  {article[0].data().bo} <br />
                  <span className="subtitle">Họ: </span>
                  {article[0].data().ho} <br />
                  <span className="subtitle">
                    Tình trạng bảo tồn theo IUCN:{" "}
                  </span>
                  {article[0].data().baoton} <br />
                </div>
                <div className="title">Môi trường sống</div>
                <div className="text">
                  <span className="subtitle">Sinh cảnh: </span>
                  {article[0].data().moitruong} <br />
                  <span className="subtitle">Địa điểm: </span>
                  {article[0].data().diadiem} <br />
                </div>
                <div className="title">Vị trí địa lý</div>
                <div className="text">
                  {article[0].data().toado1 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 1: </span>
                      {article[0].data().toado1} <br />
                    </>
                  )}
                  {article[0].data().toado2 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 2: </span>
                      {article[0].data().toado2} <br />
                    </>
                  )}
                  {article[0].data().toado3 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 3: </span>
                      {article[0].data().toado3} <br />
                    </>
                  )}
                  {article[0].data().toado4 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 4: </span>
                      {article[0].data().toado4} <br />
                    </>
                  )}
                  {article[0].data().toado5 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 5: </span>
                      {article[0].data().toado5} <br />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="fullnew__card">
              <span className="subtitle">Đặc điểm hình thái: </span>
              <span
                className="fullnew__card__desc"
                dangerouslySetInnerHTML={{ __html: article[0].data().dacdiem }}
              ></span>
              <br />
              <br />
              <span className="subtitle">Đặc điểm sinh thái: </span>
              <span
                className="fullnew__card__desc"
                dangerouslySetInnerHTML={{ __html: article[0].data().mota }}
              ></span>
            </div>
          </div>
        </Helmet>
      )}
      <div className="fullnew__title">Tin tức liên quan</div>
      <div className="fullnew__related">
        {articles.slice(0, 6).map((item) => (
          <Link to={`/article/?id=${item.id}`} className="fullnew__related__card">
            <div className="fullnew__related__card__image">
              <img src={item.image} alt="" />
            </div>
            <div className="fullnew__related__card__name">
              {item.tenvietnam}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

FullNew.propTypes = {
  New: PropTypes.object.isRequired,
};

export default FullNew;
