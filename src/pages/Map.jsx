import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../config/config";
import truck1 from "../assets/icons8-truck-48_green.png";
import truck2 from "../assets/icons8-truck-48_orange.png";
import truck3 from "../assets/icons8-truck-48_yellow.png";
import package1 from "../assets/icons8-box-50_green.png";
import package2 from "../assets/icons8-box-50_orange.png";
import package3 from "../assets/icons8-box-50_yellow.png";
import { useDPackages } from "../customhooks/useSchedule";
import { roles } from "../actions/constants";
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });
  const [drivers, setDrivers] = useState([]);
  useDPackages(setDrivers);
  const trucks = [];
  const pkgss = [];
  trucks.push(truck1);
  trucks.push(truck2);
  trucks.push(truck3);
  pkgss.push(package1);
  pkgss.push(package2);
  pkgss.push(package3);
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
            drivers
              .filter((Dpkg) =>
                User.role === roles.DRIVER ? Dpkg.id === User.id : true
              )
              .map((driver, index) => (
                <>
                  <Marker
                    position={{
                      lat: driver.lastLocation?.lat
                        ? driver.lastLocation.lat
                        : 0.0,
                      lng: driver.lastLocation?.lng
                        ? driver.lastLocation.lng
                        : 0.0,
                    }}
                    icon={trucks[index]}
                    title={`${driver.firstName} ${driver.lastName}`}
                  />
                  {driver.packages &&
                    driver.packages.map((pkg) => (
                      <Marker
                        position={{
                          lat: pkg.lastLocation?.lat
                            ? pkg.lastLocation.lat
                            : 0.0,
                          lng: pkg.lastLocation?.lng
                            ? pkg.lastLocation.lng
                            : 0.0,
                        }}
                        icon={pkgss[index]}
                        title={`${pkg.RTA ? pkg.RTA : "-"}`}
                      />
                    ))}
                </>
              ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
