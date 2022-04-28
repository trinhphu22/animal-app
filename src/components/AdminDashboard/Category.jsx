import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc, deleteDoc } from "@firebase/firestore";

import CategoryEdit from "./CategoryEdit";

import { db } from "../../config/firebase-config";

const Category = () => {
  const [catalog, setCatalog] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  const [active, setActive] = useState("category");
  const [item, setItem] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Lọc dữ liệu trong bảng Taxonomy và show lên

  useEffect(
    () =>
      onSnapshot(collection(db, "Taxonomy"), (snapshot) => {
        setCatalog(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }),
    []
  );

  // Xoá dữ liệu trong db

  const handleDelete = async (id) => {
    const docRef = doc(db, "Taxonomy", id);

    deleteDoc(docRef);
  };

  return (
    <>
      {(active === "edit" || active === "add") && (
        <CategoryEdit item={item} setActive={setActive} active={active} />
      )}
      <div className="admin-dashboard__right__user">
        <button
          onClick={() => {
            setActive("add");
          }}
        >
          ADD
        </button>
        <table className="category">
          <thead>
            <tr>
              <th>Ngành</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((item) => (
              <tr>
                <td>{item.family}</td>
                <td className="action">
                  <i
                    class="bx bx-edit action__edit"
                    onClick={() => {
                      setActive("edit");
                      setItem(item);
                    }}
                  ></i>
                  &emsp;
                  <i
                    class="bx bx-trash action__delete"
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
    </>
  );
};

export default Category;
