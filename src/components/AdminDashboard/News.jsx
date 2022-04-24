import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Posted from "./Posted";
import NotPosted from "./NotPosted";
import NewsEdit from "./NewsEdit";
import NewsMessage from "./NewsMessage";

const News = () => {
  const [active, setActive] = useState("not-posted-yet");
  const [postStatus, setPostStatus] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="post-status">
        <button
          onClick={() => {
            setActive("not-posted-yet");
            setPostStatus(false);
          }}
        >
          <span className={classNames(postStatus === false && "onActive")}>
            Chưa duyệt
          </span>
        </button>
        <button
          onClick={() => {
            setActive("news");
            setPostStatus(true);
          }}
        >
          <span className={classNames(postStatus === true && "onActive")}>
            Đã duyệt
          </span>
        </button>
      </div>
      {active === "news" && postStatus && (
        <Posted setActive={setActive} setItem={setItem} />
      )}
      {active === "not-posted-yet" && !postStatus && (
        <NotPosted setActive={setActive} setItem={setItem} />
      )}
      {active === "show" && (
        <NewsEdit setActive={setActive} item={item} postStatus={postStatus} />
      )}
      {active === "message" && (
        <NewsMessage setActive={setActive} item={item}/>
      )}
    </>
  );
};

export default News;
