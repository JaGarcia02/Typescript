import React from "react";

type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return <div>{title}</div>;
};

export default Heading;
