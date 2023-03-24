import React from "react";

export default function Background({ color, img, blur }) {
  return (
    <div
      style={{
        backgroundImage: !color && `url(${img}`,
        filter: !color && `blur(${blur}px)`,
        position: "fixed",
        width: "100%",
        right: 0,
        left: 0,
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: color,
      }}
    ></div>
  );
}
