import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const NewsMessage = (props) => {
  const { item, setActive } = props;

  const [message, setMessage] = useState("");

  // Thêm dữ liệu vào db

  const handleMessage = async (item) => {

    const collectionRef = collection(db, "Message"); //Ghi hoặc đọc db trong collection và tạo id tự động
    const payload = {
      id: item.id,
      author: item.author,
      image: item.image,
      name: item.tenvietnam,
      message: message,
      status: false,
    }; //Gán giá trị mới vào db
    await addDoc(collectionRef, payload);
  };

  return (
    <div className="message">
      <div className="message__card">
        <div className="message__card__title">Message</div>
        <div className="message__card__text">
          <label>Author:</label>
          <input type="text" value={item.author} readOnly />
        </div>
        <div className="message__card__text">
          <label>Message:</label>
          <textarea
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="message__card__button">
          <button
            onClick={() => {
              handleMessage(item);
              setActive("not-posted-yet");
            }}
          >
            Gửi 
          </button>
          <button
            onClick={() => {
              setActive("not-posted-yet");
            }}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsMessage;
