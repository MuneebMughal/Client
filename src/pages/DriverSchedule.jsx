import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useDPackages } from "../customhooks/useSchedule";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import { Navigate } from "react-router";
import moment from "moment";
import { pkgStatus } from "../actions/constants";
const DriverSchedule = () => {
  const [Dpackages, setDPackages] = useState([]);
  const User = useSelector((state) => state.user);
  useDPackages(setDPackages);

  if (!User.isLoggedIn || !User) return <Navigate to="/login" />;
  if (User.role === roles.DRIVER) return <Navigate to="/" />;
  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "1rem" }} className="text-center">
        Drivers Schedule
      </h2>
      <div className="table-responsive tableContainer">
        <table className="table table-responsive \">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: "20%" }}>
                Driver
              </th>
              <th scope="col">Packages</th>
            </tr>
          </thead>
          <tbody>
            {Dpackages &&
              Dpackages.map((Dpkg, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "20%" }}>
                      {Dpkg
                        ? Dpkg.firstName && Dpkg.firstName
                          ? `${Dpkg.firstName} ${Dpkg.lastName}`
                          : "–"
                        : "-"}
                    </td>

                    <td>
                      {Dpkg.packages && Dpkg.packages.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-responsive">
                            <thead className="table-dark">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">EDD</th>
                                <th scope="col">RTA</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Status</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Contact</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Dpkg.packages &&
                                Dpkg.packages.map((pkg, index) => {
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{pkg.id}</th>
                                      <td>
                                        {pkg.EDD
                                          ? moment(new Date(pkg.EDD)).format(
                                              "DD/MM/YYYY"
                                            )
                                          : "–"}
                                      </td>
                                      <td>{pkg.RTA ? pkg.RTA : "–"}</td>
                                      <td>
                                        {pkg.priority ? pkg.priority : "–"}
                                      </td>
                                      <td>
                                        {pkg.status
                                          ? pkgStatus[pkg.status]
                                          : "-"}
                                      </td>
                                      <td>
                                        {pkg.customer
                                          ? pkg.customer.name
                                            ? pkg.customer.name
                                            : "–"
                                          : "-"}
                                      </td>
                                      <td>
                                        {pkg.customer
                                          ? pkg.customer.contact
                                            ? pkg.customer.contact
                                            : "–"
                                          : "-"}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        "No Data to Show"
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverSchedule;
