import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../config/config";
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });
  const User = useSelector((state) => state.user);
  if (!User.isLoggedIn) return <Navigate to="/login" />;

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Navbar />
      <div style={{}}>
        <GoogleMap
          zoom={10}
          center={{ lat: 24.7136, lng: 46.6753 }}
          mapContainerClassName="map-container"
        >
          <Marker position={{ lat: 24.7136, lng: 46.6753 }} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
