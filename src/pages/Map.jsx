import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const Map = () => {
  const User = useSelector((state) => state.user);
  if (!User.isLoggedIn) return <Navigate to="/login" />;
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "80%",
          border: "2px solid black",
          marginLeft: "10%",
          marginTop: "5%",
          height: "65vh",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=24.7136,46.6753+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.maps.ie/distance-area-calculator.html">
            area maps
          </a>
        </iframe>
      </div>
    </div>
  );
};

export default Map;
