import React from "react";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionPageTitle } from "../components/Section";
import PostNew from "../components/PostNew";

const Author = (props) => {
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  return (
    <Helmet title="Add a new animal">
      <Section>
        <SectionPageTitle>Add Animal</SectionPageTitle>
        <SectionBody>
          <PostNew id={id} />
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Author;
