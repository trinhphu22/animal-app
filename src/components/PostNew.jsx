import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, onSnapshot } from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { db } from "../config/firebase-config";
import { storage } from "../config/firebase-config";

const PostNew = (props) => {
  const id = props.id;

  const [scienceName, setSienceName] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");
  const [localName, setLocalName] = useState("");
  const [nganh, setNganh] = useState("");
  const [lop, setLop] = useState("");
  const [bo, setBo] = useState("");
  const [ho, setHo] = useState("");
  const [moiTruong, setMoiTruong] = useState("");
  const [moTa, setMota] = useState("");
  const [dacDiem, setDacDiem] = useState("");
  const [sachDo, setSachDo] = useState("");
  const [diaDiem, setDiaDiem] = useState("");
  const [toaDo1, setToaDo1] = useState("");
  const [toaDo2, setToaDo2] = useState("");
  const [toaDo3, setToaDo3] = useState("");
  const [toaDo4, setToaDo4] = useState("");
  const [toaDo5, setToaDo5] = useState("");

  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [date, setDate] = useState(new Date());
  const [taxonomy, setTaxonomy] = useState([]);
  const [user, setUser] = useState([]);

  const fileInputRef = useRef();

  const clearInputs = () => {
    setSienceName("");
    setVietnameseName("");
    setLocalName("");
    setLop("");
    setBo("");
    setHo("");
    setMoiTruong("");
    setDiaDiem("");
    setSachDo("");
    setToaDo1("");
    setToaDo2("");
    setToaDo3("");
    setToaDo4("");
    setToaDo5("");
    setMota("");
    setDacDiem("");
    setImage("");
    setImagePreview("");
    setDate(new Date());
  };

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
    if (image) {
      const metadata = {
        content: image.type,
      };
      const storageRef = ref(storage, `images/${image.name}`);
      const UploadTask = uploadBytesResumable(storageRef, image, metadata);

      UploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress === 100) {
            alert("Đã upload");
          }
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

  // Thêm dữ liệu vào db

  const handleNews = async () => {
    const newDate = new Date(date);
    const collectionRef = collection(db, "Animal"); //Ghi hoặc đọc db trong collection và tạo id tự động
    const payload = {
      author: author,
      nganh: nganh,
      tenkhoahoc: scienceName,
      tenvietnam: vietnameseName,
      tendiaphuong: localName,
      lop: lop,
      bo: bo,
      ho: ho,
      moitruong: moiTruong,
      diadiem: diaDiem,
      baoton: sachDo,
      toado1: toaDo1,
      toado2: toaDo2,
      toado3: toaDo3,
      toado4: toaDo4,
      toado5: toaDo5,
      mota: moTa,
      dacdiem: dacDiem,
      image: imageUpload,
      date: newDate,
      status: false,
    }; //Gán giá trị mới vào db
    await addDoc(collectionRef, payload);
    clearInputs();
    alert("Đã thêm");
    window.scroll(0, 0);
  };

  // Lấy dữ liệu từ db "Taxonomy"

  useEffect(
    () =>
      onSnapshot(collection(db, "Taxonomy"), (snapshot) => {
        setTaxonomy(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }),
    []
  );

  // tìm dữ liệu user bằng id

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(collection(db, "Account"), (snapshot) => {
      setUser(
        snapshot.docs.filter((doc) => {
          if (doc.id === id) {
            setAuthor(doc.data().user);
            return {
              ...doc.data(),
              id: doc.id,
            };
          }
          return false;
        })
      );
    });
  }, [id]);

  return (
    <div className="postnew">
      <div className="postnew__text">
        <h1>Post up</h1>
        {user.length > 0 && (
          <div className="postnew__text__author">{author}</div>
        )}
        <select
          className="postnew__select"
          onChange={(event) => {
            setNganh(event.target.value);
          }}
        >
          {taxonomy.slice(0, taxonomy.length).map((item) => (
            <option value={item.family}>{item.family}</option>
          ))}
        </select>
        <div className="postnew__text__title">
          <input
            type="text"
            onChange={(event) => setSienceName(event.target.value)}
            value={scienceName}
            placeholder="Tên khoa học"
          />
          <input
            type="text"
            onChange={(event) => setVietnameseName(event.target.value)}
            value={vietnameseName}
            placeholder="Tên Việt Nam"
          />
          <input
            type="text"
            onChange={(event) => setLocalName(event.target.value)}
            value={localName}
            placeholder="Tên địa phương"
          />
        </div>
        <div className="postnew__text__subtitle">
          <input
            type="text"
            onChange={(event) => setLop(event.target.value)}
            value={lop}
            placeholder="Lớp"
          />
          <input
            type="text"
            onChange={(event) => setBo(event.target.value)}
            value={bo}
            placeholder="Bộ"
          />
          <input
            type="text"
            onChange={(event) => setHo(event.target.value)}
            value={ho}
            placeholder="Họ"
          />
        </div>
        <div className="postnew__text__subtitle">
          <input
            type="text"
            onChange={(event) => setMoiTruong(event.target.value)}
            value={moiTruong}
            placeholder="Môi trường sống"
          />
          <input
            type="text"
            onChange={(event) => setDiaDiem(event.target.value)}
            value={diaDiem}
            placeholder="Địa điểm"
          />
          <input
            type="text"
            onChange={(event) => setSachDo(event.target.value)}
            value={sachDo}
            placeholder="Tình trạng bảo tồn"
          />
        </div>
        <div className="postnew__text__subtitle">
          <input
            type="text"
            onChange={(event) => setToaDo1(event.target.value)}
            value={toaDo1}
            placeholder="Tọa độ 1"
          />
          <input
            type="text"
            onChange={(event) => setToaDo2(event.target.value)}
            value={toaDo2}
            placeholder="Tọa độ 2"
          />
          <input
            type="text"
            onChange={(event) => setToaDo3(event.target.value)}
            value={toaDo3}
            placeholder="Tọa độ 3"
          />
          <input
            type="text"
            onChange={(event) => setToaDo4(event.target.value)}
            value={toaDo4}
            placeholder="Tọa độ 4"
          />
          <input
            type="text"
            onChange={(event) => setToaDo5(event.target.value)}
            value={toaDo5}
            placeholder="Tọa độ 5"
          />
        </div>
        <div className="postnew__text__description">
          <textarea
            onChange={(event) => setMota(event.target.value)}
            value={dacDiem}
            placeholder="Đặc điểm hình thái"
          />
        </div>
        <div className="postnew__text__content">
          <textarea
            onChange={(event) => setDacDiem(event.target.value)}
            value={moTa}
            placeholder="Đặc điểm sinh thái"
          />
        </div>
      </div>
      <div className="postnew__box">
        <div className="postnew__box__image">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
            ref={fileInputRef}
          />
          <img src={image} alt="" />
        </div>
        <div className="postnew__box__image-preview">
          {imagePreview ? (
            <img src={imagePreview} alt="" />
          ) : (
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <i class="bx bx-plus"></i>
            </button>
          )}
        </div>
      </div>
      <div className="postnew__button">
        <button onClick={handleUpload}>Upload image</button>
        <button
          onClick={() => {
            setImagePreview("");
          }}
        >
          Remove image
        </button>
      </div>
      <div className="postnew__date">
        <input
          type="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </div>
      <button onClick={handleNews}>Post up</button>
    </div>
  );
};

export default PostNew;
