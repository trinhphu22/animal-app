import React, { useState, useEffect } from "react";

import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const Posted = (props) => {
  const { setActive, setItem } = props;

  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Lọc dữ liệu trong bảng Article và show lên

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Animal"), where("status", "==", true)),
        (snapshot) =>
          setArticles(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      ),
    []
  );

  // Xoá dữ liệu trong db

  const handleDelete = async (id) => {
    const docRef = doc(db, "Animal", id);

    deleteDoc(docRef);
  };

  return (
    <div className="admin-dashboard__right__user">
      <table className="news">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tác giả</th>
            <th>Ngành</th>
            <th>Tên</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item) => (
            <tr>
              <td className="news__image">
                <div className="image-box">
                  <img src={item.image} alt="" />
                </div>
              </td>
              <td>{item.author}</td>
              <td>{item.nganh}</td>
              <td className="news__title">{item.tenvietnam}</td>
              <td className="action-news">
                <i
                  class="bx bx-show-alt action-news__show"
                  onClick={() => {
                    setActive("show");
                    setItem(item);
                  }}
                ></i>
                &emsp;
                <i
                  class="bx bx-trash action-news__delete"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posted;
