import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "60px",
          margin: "70px auto auto",
          display: "block"
        }}
        alt="Loading..."
      />
    </div>
  );
};
