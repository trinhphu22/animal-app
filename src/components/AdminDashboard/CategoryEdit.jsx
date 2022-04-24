import React, { useState } from "react";

import { doc, setDoc, addDoc, collection } from "@firebase/firestore";

import { db } from "../../config/firebase-config";

const CategoryEdit = (props) => {
  const { item, setActive, active } = props;

  const [categoryEdit, setCategoryEdit] = useState(item.family);
  const [categoryAdd, setCategoryAdd] = useState("");

  const clearInputs = () => {
    setCategoryAdd("");
  };

  // Chỉnh sửa dữ liệu

  const handleUpdate = async (id) => {
    const docRef = doc(db, "Taxonomy", id);
    const payload = {
      family: categoryEdit,
    };
    setDoc(docRef, payload);
  };

  console.log(active);

  const handleAdd = async () => {
    const collectionRef = collection(db, "Taxonomy"); //Ghi hoặc đọc db trong collection và tạo id tự động
    const payload = {
      family: categoryAdd,
    }; //Gán giá trị mới vào db
    await addDoc(collectionRef, payload);
    clearInputs();
  };

  return (
    <>
      {active === "edit" && (
        <div className="edit-category">
          <div className="edit-category__card">
            <div className="edit-category__card__title">Update</div>
            <div className="edit-category__card__text">
              <label>Ngành:</label>
              <input
                type="text"
                value={categoryEdit}
                onChange={(event) => {
                  setCategoryEdit(event.target.value);
                }}
              />
            </div>
            <div className="edit-category__card__button">
              <button
                onClick={() => {
                  handleUpdate(item.id);
                  setActive("category");
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  setActive("category");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {active === "add" && (
        <div className="edit-category">
          <div className="edit-category__card">
            <div className="edit-category__card__title">Add</div>
            <div className="edit-category__card__text">
              <label>Ngành:</label>
              <input
                type="text"
                value={categoryAdd}
                onChange={(event) => {
                  setCategoryAdd(event.target.value);
                }}
              />
            </div>
            <div className="edit-category__card__button">
              <button
                onClick={() => {
                  handleAdd();
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setActive("category");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryEdit;
