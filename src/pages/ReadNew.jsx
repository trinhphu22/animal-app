import React from "react";
import Section, { SectionBody } from "../components/Section";

import FullNew from "../components/FullNew";

const ReadNew = (props) => {
  // Đọc id trên URLSearchParams

  const params = new URLSearchParams(props.location.search);
  const id_news = params.get("id");

  return (
    <Section>
      <SectionBody>
        <FullNew New={id_news} />
      </SectionBody>
    </Section>
  );
};

export default ReadNew;
