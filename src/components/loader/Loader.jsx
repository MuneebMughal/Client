import React from "react";
import { Oval } from "react-loader-spinner";
import '../../css/loader.css'
const Loader = () => {
  return (
    <div className="loaderWraper">
      <div className="loader">
        <Oval
          color="#1e293b"
          height={60}
          width={60}
          secondaryColor="#1e293b"
          strokeWidth={4}
        />
      </div>
    </div>
  );
};

export default Loader;
