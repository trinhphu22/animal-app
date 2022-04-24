import React, { useEffect, useState, useRef } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  setDoc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { db } from "../../config/firebase-config";
import { storage } from "../../config/firebase-config";

const UserEdit = (props) => {
  const { email, setActive } = props;

  const [accountEdit, setAccountEdit] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [user, setUser] = useState("");
  const [accountType, setAccountType] = useState("");
  const [about, setAbout] = useState("");

  const fileInputRef = useRef();

  const clearInput = () => {
    setImagePreview("");
    setUser("");
    setAccountType("");
  };

  //Lọc dữ liệu trong bảng Account và có email trong db === email cần chỉnh sửa
  //Chưa biết cách lọc id, tìm hiểu sau

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Account"), where("email", "==", email)),
        (snapshot) =>
          setAccountEdit(
            snapshot.docs.map((doc) => {
              setUser(doc.data().user);
              setImageUpload(doc.data().avatar);
              setAccountType(doc.data().accountType);
              setAbout(doc.data().about || " ");
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          )
      ),
    [email]
  );

  //Hiển thị image

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  //Đọc file image

  const handleImage = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Upload Image vào storage

  const handleUpload = () => {
    console.log("upload");
    if (image) {
      const metadata = {
        content: image.type,
      };
      const storageRef = ref(storage, `avatar/${image.name}`);
      const UploadTask = uploadBytesResumable(storageRef, image, metadata);

      UploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          alert("error: imaged not uploaded!");
        },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
            setImageUpload(ref(downloadURL)); // Lưu url từ storage vào imageUpload
          });
        }
      );
    }
  };

  // Chỉnh sửa dữ liệu

  const handleUpdate = async (id) => {
    const docRef = doc(db, "Account", id);
    const payload = {
      avatar: imageUpload,
      user: user,
      email: email,
      password: accountEdit[0].password,
      about: about,
      accountType: accountType,
    };
    setDoc(docRef, payload);
    clearInput();
  };

  return (
    <div>
      <div className="edit">
        <div className="edit__image">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
            ref={fileInputRef}
          />
          <img
            src={!imagePreview ? accountEdit[0].avatar : imagePreview}
            alt="avatar"
          />
          <div className="edit__image__button">
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Select image
            </button>
            <button onClick={handleUpload}>Upload image</button>
            <button
              onClick={() => {
                setImagePreview("");
              }}
            >
              Remove image
            </button>
          </div>
        </div>
        <div className="edit__profile">
          <div className="edit__profile__user">
            <label>User: </label>
            <input
              type="text"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
          </div>
          <div className="edit__profile__email">
            <label>Email: </label>
            <input type="text" value={accountEdit[0].email} readonly />
          </div>
          <div className="edit__profile__email">
            <label>About: </label>
            <textarea
              value={about}
              onChange={(event) => {
                setAbout(event.target.value);
              }}
            >
              {about}
            </textarea>
          </div>
          <div className="edit__profile__type">
            <label>Account Type: </label>
            <select
              value={accountType}
              onChange={(event) => {
                setAccountType(event.target.value);
              }}
            >
              <option value="Guest">Guest</option>
              <option value="Author">Author</option>
            </select>
          </div>
          <div className="edit__profile__button">
            <button
              onClick={() => {
                handleUpdate(accountEdit[0].id);
                setActive("user");
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setActive("user");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
