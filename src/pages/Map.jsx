import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../config/config";
import truck from "../assets/icons8-truck-48.png";
import { useDriver } from "../customhooks/useDrivers";
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });
  const [drivers, setDrivers] = useState([]);
  useDriver(setDrivers);
  const User = useSelector((state) => state.user);
  if (!User.isLoggedIn) return <Navigate to="/login" />;

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "1rem" }} className="text-center">
        Drivers Last Locations
      </h2>
      <div>
        <GoogleMap
          zoom={11}
          center={{ lat: 24.7136, lng: 46.6753 }}
          mapContainerClassName="map-container"
        >
          {drivers &&
            drivers.map((driver) => (
              <Marker
                position={{
                  lat: driver.lastLocation?.lat ? driver.lastLocation.lat : 0.0,
                  lng: driver.lastLocation?.lng ? driver.lastLocation.lng : 0.0,
                }}
                icon={truck}
                title={`${driver.firstName} ${driver.lastName}`}
              />
            ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
