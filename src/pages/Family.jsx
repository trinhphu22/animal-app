import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Section, { SectionHomeTitle, SectionBody } from "../components/Section";
import NewCard from "../components/NewCard";
import Grid from "../components/Grid";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";

const Family = () => {
  const [taxonomy, setTaxonomy] = useState("");
  const [family, setFamily] = useState("");
  const [choose, setChoose] = useState("");

  // Lọc dữ liệu từ Taxonomy

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

  useEffect(() => {
    window.scroll(0, 0);
    onSnapshot(
      query(
        collection(db, "Animal"),
        where("nganh", "==", choose),
        where("status", "==", true)
      ), // Lọc dữ liệu có "nganh"
      (snapshot) =>
        setFamily(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
    );
  }, [choose]);

  console.log(choose);

  return (
    <div className="family">
      {taxonomy.length > 0 && (
        <div className="family__categories">
          {taxonomy.map((item) => (
            <div
              className="family__categories__category"
              onClick={() => {
                setChoose(item.family);
              }}
            >
              <span
                className={classNames(choose === item.family && "onActive")}
              >
                {item.family}
              </span>
            </div>
          ))}
        </div>
      )}
      {family.length > 0 && (
        <div className="family__items">
          <Section>
            <SectionHomeTitle>
              Đã tìm thấy {family.length} loài {choose}
            </SectionHomeTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={2} gap={20}>
                {family.map((item, index) => (
                  <NewCard
                    key={index}
                    image={item.image}
                    author={item.author}
                    name={item.tenvietnam}
                    id={item.id}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
        </div>
      )}
    </div>
  );
};

export default Family;
