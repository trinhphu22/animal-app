import React from "react";

const Section = (props) => {
  return <div className="section">{props.children}</div>;
};


export const SectionHomeTitle = (props) => {
  return <div className="section__title__home">{props.children}</div>;
};

export const SectionPageTitle = (props) => {
  return <div className="section__title__page">{props.children}</div>
}

export const SectionSecondTitle = (props) => {
  return <div className="section__title__second">{props.children}</div>
}

export const SectionBody = (props) => {
  return <div className="section__body">{props.children}</div>;
};


export default Section;
