import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  setDoc,
} from "@firebase/firestore";

import { db } from "../config/firebase-config";

const Message = (props) => {
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const [profile, setProfile] = useState([]);
  const [alert, setAlert] = useState([]);

  // Đọc dữ liệu từ auth tìm user bằng id

  useEffect(
    () =>
      onSnapshot(collection(db, "Account"), (snapshot) => {
        setProfile(
          snapshot.docs.filter((doc) => {
            if (doc.id === id) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
            return false;
          })
        );
      }),
    [id]
  );

  // Lọc những tin nhắn có User == Author

  useEffect(() => {
    if (profile.length > 0) {
      onSnapshot(
        query(
          collection(db, "Message"),
          where("author", "==", profile[0].data().user),
          where("status", "==", false)
        ),
        (snapshot) =>
          setAlert(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      );
    }
  }, [profile]);

  const handleUpdate = async (item) => {
    const docRef = doc(db, "Message", item.id);
    const payload = {
      id: item.id,
      author: item.author,
      image: item.image,
      name: item.name,
      message: item.message,
      status: true,
    };
    setDoc(docRef, payload);
  };

  return (
    <div className="container">
      <div className="profile">
        {alert.length > 0 ? (
          <>
            <div className="profile__title">
              <span>Message</span>
            </div>
            {alert.map((item) => (
              <div
                className="profile__article"
                onClick={() => {
                  handleUpdate(item);
                }}
              >
                <div className="profile__article__image">
                  <img src={item.image} alt="img" />
                </div>
                <div className="profile__article__textbox">
                  <div className="profile__article__textbox__title">
                    {item.name}
                  </div>
                  <div className="profile__article__textbox__description">
                    <p>
                      Message:&nbsp;
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="profile__title">
              <span>Message</span>
            </div>
            <div className="profile__title">
              <span>Bạn không có tin nhắn nào</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
