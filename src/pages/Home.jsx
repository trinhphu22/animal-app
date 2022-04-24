import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";

import { db } from "../config/firebase-config";

import Helmet from "../components/Helmet";
import Section, { SectionHomeTitle, SectionBody } from "../components/Section";
import NewCard from "../components/NewCard";
import Grid from "../components/Grid";

const Home = () => {
  const [articles, setArticles] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const [plus, setPlus] = useState(8);

  // Đọc dữ liệu từ Animal trên firebase v9
  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(
      // Lọc dữ liệu có trạng thái cho phép đăng ("status" == true)
      query(collection(db, "Animal"), where("status", "==", true)),
      (snapshot) =>
        setArticles(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
    );
  }, []);

  const loadMoreClick = () => {
    setPlus(plus + 8);
  };

  return (
    <Helmet title="Animals & Discovery">
      {/* it-in depth */}
      <Section>
        <SectionHomeTitle>
          Đã tìm thấy {articles.length} loài
        </SectionHomeTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={2} gap={20}>
            {articles.slice(0, plus).map((item, index) => (
              <NewCard
                key={index}
                image={item.image}
                author={item.author}
                name={item.tenvietnam}
                id={item.id}
              />
            ))}
          </Grid>
          {plus < articles.length && (
            <div className="button-box">
              <div
                onClick={loadMoreClick}
                class="btn btn--border btn--primary btn--animated"
              >
                Load more
              </div>
            </div>
          )}
        </SectionBody>
      </Section>
      {/* end it-in depth */}
    </Helmet>
  );
};

export default Home;
