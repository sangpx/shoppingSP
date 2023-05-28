import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <>
      <div className="container py-5">
        <div className="flex flex-center loader">
          <div className="dashed-loading"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
