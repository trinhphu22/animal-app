import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "@firebase/firestore";
// import { deleteUser } from "firebase/auth";

// import Avatar from "../../assets/img/avt.jpeg";
import UserEdit from "./UserEdit";

import { db } from "../../config/firebase-config";

// import { auth } from "../../config/firebase-config";

const User = () => {
  const [account, setAccount] = useState([
    { name: "Loading...", id: "initial" },
  ]);

  const [active, setActive] = useState("user");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Lọc dữ liệu trong bảng Account và show lên

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Account"), where("accountType", "!=", "A")),
        (snapshot) =>
          setAccount(
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
    const docRef = doc(db, "Account", id);

    deleteDoc(docRef);
  };

  return (
    <div className="admin-dashboard__right__user">
      {active === "user" && (
        <table className="user">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>User</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {account.map((item) => (
              <tr>
                {/* <td>1</td> */}
                <td>
                  <div className="box-user">
                    <div className="box-user__image">
                      <img src={item.avatar} alt="Avatar" />
                    </div>
                    <span>&emsp;{item.user}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.accountType}</td>
                {item.accountType !== "Admin" && (
                  <td className="action">
                    <i
                      class="bx bx-edit action__edit"
                      onClick={() => {
                        setActive("edit");
                        setEmail(item.email);
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {active === "edit" && <UserEdit email={email} setActive={setActive} />}
    </div>
  );
};

export default User;
