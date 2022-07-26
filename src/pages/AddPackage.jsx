import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { addPackage } from "../actions/package/package";
import { useDriver } from "../customhooks/useDrivers";
import "../css/adduser.css";
import "../css/addpackage.css";
const AddPackage = () => {
  const user = useSelector((state) => state.user);
  const [EDD, setEDD] = useState("");
  const [RTA, setRTA] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [priority, setPriority] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [deliveredBy, setDeliveredBy] = useState("");
  const [loading, setLoading] = useState(false);
  useDriver(setDrivers);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let location = [];
    let customer = {};
    location.push(+longitude);
    location.push(+latitude);
    customer.name = name;
    customer.contact = contact;
    await addPackage({ EDD, RTA, location, priority, customer, deliveredBy })
      .then((res) => {
        toast.success("Package Added Successfully");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.Error);
      });
  };
  if (user.role !== roles.ADMIN || !user) return <Navigate to="/" />;
  return (
    <div>
      <div>
        <Navbar />
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>Add Package</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="fieldwraper">
                    <div className="input_field">
                      <input
                        type="date"
                        name="EDD"
                        placeholder="EDD"
                        required
                        value={EDD}
                        onChange={(e) => setEDD(e.target.value)}
                      />
                    </div>
                    <div className="fieldlabel">Estimated Delivery Date</div>
                  </div>

                  <div className="fieldwraper">
                    <div className="input_field">
                      <input
                        type="time"
                        name="RTA"
                        placeholder="RTA"
                        required
                        value={RTA}
                        onChange={(e) => setRTA(e.target.value)}
                      />
                    </div>
                    <div className="fieldlabel">Requested Time of Arrival</div>
                  </div>
                  <div className="input_field select_option">
                    <select onChange={(e) => setPriority(e.target.value)}>
                      <option>Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <div className="select_arrow"></div>
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="fieldlabel">Longitude</div>
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" class="fa fa-map-marker"></i>
                        </span>
                        <input
                          type="number"
                          name="logitude"
                          placeholder="Longitude"
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="fieldlabel">Latitude</div>
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" class="fa fa-map-marker"></i>
                        </span>
                        <input
                          type="number"
                          name="latitude"
                          placeholder="Latitude"
                          required
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <h6>Customer's info</h6>
                  <div class="row clearfix">
                    <div class="col_half">
                      <div class="input_field">
                        {" "}
                        <span>
                          <i aria-hidden="true" class="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col_half">
                      <div class="input_field">
                        {" "}
                        <span>
                          <i aria-hidden="true" class="fa fa-address-book"></i>
                        </span>
                        <input
                          type="text"
                          name="contact"
                          placeholder="Contact"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <h6>Assign Driver</h6>
                  <div className="input_field select_option">
                    <select onChange={(e) => setDeliveredBy(e.target.value)}>
                      <option>Select Driver</option>
                      {drivers &&
                        drivers.map((driver, index) => {
                          return (
                            <option value={driver._id} key={index}>
                              {`${driver.firstName} ${driver.lastName}`}
                            </option>
                          );
                        })}
                    </select>
                    <div className="select_arrow"></div>
                  </div>
                  <input className="button" type="submit" value="Add" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default AddPackage;
