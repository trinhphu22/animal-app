import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

import { db, auth } from "../config/firebase-config";

const Profile = (props) => {
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const [profile, setProfile] = useState([]);
  const [article, setArticle] = useState([{}]);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser("");
    }
  });

  // Lọc user xem phải user hiện tại khoong

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(collection(db, "Account"), (snapshot) => {
      setIsAuth(
        snapshot.docs.filter((doc) => {
          if (user) {
            if (doc.data().email === user?.email) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
          }
          return false;
        })
      );
    });
  }, [user]);

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

  // Lọc những bài báo có User == Author

  useEffect(() => {
    if (profile.length > 0) {
      onSnapshot(
        query(
          collection(db, "Animal"),
          where("author", "==", profile[0].data().user),
          where("status", "==", true),
        ),
        (snapshot) =>
          setArticle(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
      );
    }
  }, [profile]);

  return (
    <div className="container">
      <div className="profile">
        {profile.length > 0 && (
          <div className="profile__card">
            <div className="profile__card__image">
              <img src={profile[0].data().avatar} alt="avatar" />
            </div>
            <div className="profile__card__info">
              <div className="profile__card__info__user">
                {profile[0].data().user}
              </div>
              <div className="profile__card__info__email">
                <span>
                  <strong>Email: </strong>
                  {profile[0].data().email}
                </span>
              </div>
              <div className="profile__card__info__type">
                <span>
                  <strong>Account Type: </strong>
                  {profile[0].data().accountType}
                </span>
              </div>
              <div className="profile__card__info__abstract">
                <p>{profile[0].data().about}</p>
              </div>
              <div className="profile__card__info__settings">
                {isAuth.length > 0 && id === isAuth[0].id && (
                  <Link to={`/profile/edit/?id=${profile[0].id}`}>
                    <button>
                      <i class="bx bx-cog"></i>Settings
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
        {article.length > 0 && (
          <>
            <div className="profile__title">
              <span>
                Tin tức gần nhất từ{" "}
                <Link to={`/profile/?id=${id}`}>{article[0].author}</Link>
              </span>
            </div>
            {article.slice(0, 5).map((item) => (
              <div className="profile__article">
                <Link
                  to={`/article/?id=${item.id}`}
                  className="profile__article__image"
                >
                  <img src={item.image} alt="img" />
                </Link>
                <div className="profile__article__textbox">
                  <Link
                    to={`/article/?id=${item.id}`}
                    className="profile__article__textbox__title"
                  >
                    {item.tenvietnam} ({item.tenkhoahoc})
                  </Link>
                  <div className="profile__article__textbox__description">
                    {item.mota}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
