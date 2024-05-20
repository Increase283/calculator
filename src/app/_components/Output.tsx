"use client";
import React from "react";

interface OutputProps {
  data: {
    inputstring: string;
    pods: { subpods: { img: { src: string; title: string } }[] }[];
  } | null;
}

const Output: React.FC<OutputProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <div>{data.inputstring}</div>
      <img
        //src={data.pods[0]?.subpods[0]?.img.src}
        //alt="Ничего нет"
        title={data.pods[0]?.subpods[0]?.img.title}
      />
    </div>
  );
};

export default Output;
