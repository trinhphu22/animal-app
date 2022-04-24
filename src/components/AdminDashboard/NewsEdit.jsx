import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  setDoc,
} from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const NewsEdit = (props) => {
  const { setActive, item, postStatus } = props;
  const [account, setAccount] = useState([]);

  //Lọc dữ liệu trong bảng Account và show lên

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Account"), where("user", "==", item.author)),
        (snapshot) =>
          setAccount(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      ),
    [item]
  );

  const handleUpdate = async (id) => {
    const docRef = doc(db, "Animal", id);
    const payload = {
      author: item.author,
      nganh: item.nganh,
      tenkhoahoc: item.tenkhoahoc,
      tenvietnam: item.tenvietnam,
      tendiaphuong: item.tendiaphuong,
      lop: item.lop,
      bo: item.bo,
      ho: item.ho,
      moitruong: item.moitruong,
      diadiem: item.diadiem,
      baoton: item.baoton,
      toado1: item.toado1,
      toado2: item.toado2,
      toado3: item.toado3,
      toado4: item.toado4,
      toado5: item.toado5,
      mota: item.mota,
      dacdiem: item.dacdiem,
      image: item.image,
      date: item.date,
      status: true,
    };

    setDoc(docRef, payload);
  };

  const handleWithdraw = async (id) => {
    const docRef = doc(db, "Animal", id);
    const payload = {
      author: item.author,
      nganh: item.nganh,
      tenkhoahoc: item.tenkhoahoc,
      tenvietnam: item.tenvietnam,
      tendiaphuong: item.tendiaphuong,
      lop: item.lop,
      bo: item.bo,
      ho: item.ho,
      moitruong: item.moitruong,
      diadiem: item.diadiem,
      baoton: item.baoton,
      toado1: item.toado1,
      toado2: item.toado2,
      toado3: item.toado3,
      toado4: item.toado4,
      toado5: item.toado5,
      mota: item.mota,
      dacdiem: item.dacdiem,
      image: item.image,
      date: item.date,
      status: false,
    };

    setDoc(docRef, payload);
  };

  return (
    <div className="edit-news">
      {/* -------------------- Trạng thái đã đăng --------------------- */}
      {postStatus && (
        <>
          <div>
            <div className="edit-news__top">
              <div className="edit-news__top__text">
                <div className="edit-news__top__text__tenvietnam">
                  {item.tenvietnam}
                </div>
                <div className="edit-news__top__text__nganh">{item.nganh}</div>
              </div>
              {account.length > 0 && (
                <div className="edit-news__top__author">
                  <Link
                    to={`/profile/?id=${account[0].id}`}
                    className="edit-news__top__author__image"
                  >
                    <img src={account[0].avatar} alt="" />
                  </Link>
                  <p>By</p>
                  <Link
                    to={`/profile/?id=${account[0].id}`}
                    className="edit-news__top__author__user"
                  >
                    <span>{account[0].user}</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="edit-news__content">
              <div className="edit-news__content__left">
                <img src={item.image} alt="" />
              </div>
              <div className="edit-news__content__right">
                <div className="title">Thông tin</div>
                <div className="text">
                  <span className="subtitle">Tên khoa học: </span>
                  {item.tenkhoahoc} <br />
                  <span className="subtitle">Tên tiếng Việt: </span>
                  {item.tenvietnam} <br />
                  <span className="subtitle">Tên địa phương: </span>
                  {item.tendiaphuong} <br />
                  <span className="subtitle">Ngành: </span>
                  {item.nganh} <br />
                  <span className="subtitle">Lớp: </span>
                  {item.lop} <br />
                  <span className="subtitle">Bộ: </span>
                  {item.bo} <br />
                  <span className="subtitle">Họ: </span>
                  {item.ho} <br />
                  <span className="subtitle">
                    Tình trạng bảo tồn theo IUCN:{" "}
                  </span>
                  {item.baoton} <br />
                </div>
                <div className="title">Môi trường sống</div>
                <div className="text">
                  <span className="subtitle">Sinh cảnh: </span>
                  {item.moitruong} <br />
                  <span className="subtitle">Địa điểm: </span>
                  {item.diadiem} <br />
                </div>
                <div className="title">Vị trí địa lý</div>
                <div className="text">
                  {item.toado1 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 1: </span>
                      {item.toado1} <br />
                    </>
                  )}
                  {item.toado2 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 2: </span>
                      {item.toado2} <br />
                    </>
                  )}
                  {item.toado3 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 3: </span>
                      {item.toado3} <br />
                    </>
                  )}
                  {item.toado4 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 4: </span>
                      {item.toado4} <br />
                    </>
                  )}
                  {item.toado5 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 5: </span>
                      {item.toado5} <br />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="edit-news__card">
              <span className="subtitle">Đặc điểm hình thái: </span>
              <span
                className="edit-news__card__desc"
                dangerouslySetInnerHTML={{ __html: item.dacdiem }}
              ></span>
              <br />
              <br />
              <span className="subtitle">Đặc điểm sinh thái: </span>
              <span
                className="edit-news__card__desc"
                dangerouslySetInnerHTML={{ __html: item.mota }}
              ></span>
            </div>
          </div>
          <div className="edit-news__button">
            <button
              onClick={() => {
                handleWithdraw(item.id);
                setActive("news");
              }}
            >
              Hủy duyệt
            </button>
            <button
              onClick={() => {
                setActive("news");
              }}
            >
              Quay lại
            </button>
          </div>
        </>
      )}
      {/* -------------------- Trạng thái chưa đăng --------------------- */}
      {!postStatus && (
        <>
          <div>
            <div className="edit-news__top">
              <div className="edit-news__top__text">
                <div className="edit-news__top__text__tenvietnam">
                  {item.tenvietnam}
                </div>
                <div className="edit-news__top__text__nganh">{item.nganh}</div>
              </div>
              {account.length > 0 && (
                <div className="edit-news__top__author">
                  <Link
                    to={`/profile/?id=${account[0].id}`}
                    className="edit-news__top__author__image"
                  >
                    <img src={account[0].avatar} alt="" />
                  </Link>
                  <p>By</p>
                  <Link
                    to={`/profile/?id=${account[0].id}`}
                    className="edit-news__top__author__user"
                  >
                    <span>{account[0].user}</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="edit-news__content">
              <div className="edit-news__content__left">
                <img src={item.image} alt="" />
              </div>
              <div className="edit-news__content__right">
                <div className="title">Thông tin</div>
                <div className="text">
                  <span className="subtitle">Tên khoa học: </span>
                  {item.tenkhoahoc} <br />
                  <span className="subtitle">Tên tiếng Việt: </span>
                  {item.tenvietnam} <br />
                  <span className="subtitle">Tên địa phương: </span>
                  {item.tendiaphuong} <br />
                  <span className="subtitle">Ngành: </span>
                  {item.nganh} <br />
                  <span className="subtitle">Lớp: </span>
                  {item.lop} <br />
                  <span className="subtitle">Bộ: </span>
                  {item.bo} <br />
                  <span className="subtitle">Họ: </span>
                  {item.ho} <br />
                  <span className="subtitle">
                    Tình trạng bảo tồn theo IUCN:{" "}
                  </span>
                  {item.baoton} <br />
                </div>
                <div className="title">Môi trường sống</div>
                <div className="text">
                  <span className="subtitle">Sinh cảnh: </span>
                  {item.moitruong} <br />
                  <span className="subtitle">Địa điểm: </span>
                  {item.diadiem} <br />
                </div>
                <div className="title">Vị trí địa lý</div>
                <div className="text">
                  {item.toado1 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 1: </span>
                      {item.toado1} <br />
                    </>
                  )}
                  {item.toado2 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 2: </span>
                      {item.toado2} <br />
                    </>
                  )}
                  {item.toado3 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 3: </span>
                      {item.toado3} <br />
                    </>
                  )}
                  {item.toado4 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 4: </span>
                      {item.toado4} <br />
                    </>
                  )}
                  {item.toado5 !== "" && (
                    <>
                      <span className="subtitle">Tọa độ 5: </span>
                      {item.toado5} <br />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="edit-news__card">
              <span className="subtitle">Đặc điểm hình thái: </span>
              <span
                className="edit-news__card__desc"
                dangerouslySetInnerHTML={{ __html: item.dacdiem }}
              ></span>
              <br />
              <br />
              <span className="subtitle">Đặc điểm sinh thái: </span>
              <span
                className="edit-news__card__desc"
                dangerouslySetInnerHTML={{ __html: item.mota }}
              ></span>
            </div>
          </div>
          <div className="edit-news__button">
            <button
              onClick={() => {
                handleUpdate(item.id);
                setActive("not-posted-yet");
              }}
            >
              Duyệt
            </button>
            <button
              onClick={() => {
                setActive("not-posted-yet");
              }}
            >
              Quay lại
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsEdit;
