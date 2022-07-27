import React, { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { addUser } from "../actions/auth/auth";
import "../css/adduser.css";
const AddUser = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addUser({ email, password, firstName, lastName, role })
      .then((res) => {
        toast.success("User Added Successfully");
        setLoading(false);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setRole("");
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
        <div class="form_wrapper">
          <div class="form_container">
            <div class="title_container">
              <h2>Add User</h2>
            </div>
            <div class="row clearfix">
              <div class="">
                <form onSubmit={handleSubmit}>
                  <div class="input_field">
                    {" "}
                    <span>
                      <i aria-hidden="true" class="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="input_field">
                    {" "}
                    <span>
                      <i aria-hidden="true" class="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
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
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col_half">
                      <div class="input_field">
                        {" "}
                        <span>
                          <i aria-hidden="true" class="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Last Name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="input_field select_option">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="cc">Control Center(CC)</option>
                      <option value="driver">Driver</option>
                    </select>
                    <div class="select_arrow"></div>
                  </div>
                  <input class="button" type="submit" value="Register" />
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

export default AddUser;
