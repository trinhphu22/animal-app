import React, { useEffect, useState, useRef } from "react";
import { onSnapshot, collection, doc, setDoc } from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

import { storage } from "../config/firebase-config";
import { db } from "../config/firebase-config";

const EditProfile = (props) => {
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const [profile, setProfile] = useState([]);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState("");

  const fileInputRef = useRef();

  // Đọc dữ liệu từ auth tìm user bằng id

  useEffect(
    () =>
      onSnapshot(collection(db, "Account"), (snapshot) => {
        setProfile(
          snapshot.docs.filter((doc) => {
            if (doc.id === id) {
              setUser(doc.data().user);
              setEmail(doc.data().email);
              setAbout(doc.data().about || " ");
              setImageUpload(doc.data().avatar);
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

  const clearInput = () => {
    setImagePreview("");
    setUser("");
    setAbout("");
  };

  // Chỉnh sửa dữ liệu

  const handleSave = async (id, password, type) => {
    const docRef = doc(db, "Account", id);
    const payload = {
      avatar: imageUpload,
      user: user,
      email: email,
      about: about,
      password: password,
      accountType: type,
    };
    setDoc(docRef, payload);
    clearInput();
  };

  return (
    <div className="container">
      {profile.length > 0 && (
        <div className="profile-edit">
          <div className="profile-edit__card">
            <div className="profile-edit__card__title">
              <i class="bx bxs-cog"></i>Settings
            </div>
            <div className="profile-edit__card__input">
              <label>Username</label>
              <input
                type="text"
                defaultValue={profile[0].data().user}
                onChange={(event) => {
                  setUser(event.target.value);
                }}
              />
            </div>
            <div className="profile-edit__card__input">
              <label>Email</label>
              <input
                type="text"
                defaultValue={profile[0].data().email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="profile-edit__card__input">
              <label>Avatar</label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
                ref={fileInputRef}
              />
              <div className="profile-edit__card__input__image">
                <img
                  src={imagePreview ? imagePreview : profile[0].data().avatar}
                  alt="avt"
                />
              </div>
              <div className="profile-edit__card__input__button">
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
            <div className="profile-edit__card__input">
              <label>About</label>
              <input
                type="text"
                defaultValue={
                  profile[0].data().about ? profile[0].data().about : ""
                }
                onChange={(event) => {
                  setAbout(event.target.value);
                }}
              />
            </div>
            <div className="profile-edit__card__button">
              <Link to={`/profile/?id=${profile[0].id}`}>
                <button
                  onClick={() => {
                    handleSave(
                      profile[0].id,
                      profile[0].data().password,
                      profile[0].data().accountType
                    )
                  }}
                >
                  Save
                </button>
              </Link>

              <Link to={`/profile/?id=${profile[0].id}`}>
                <button>Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
