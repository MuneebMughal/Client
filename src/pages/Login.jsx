import React, { useState } from "react";
import { login } from "../actions/auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { authConstants } from "../actions/constants";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import "../css/loader.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await login({ email, password })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch({
          type: authConstants.LOGIN,
          payload: {
            email: res.data.user.email,
            name: res.data.user.name,
            role: res.data.user.role,
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            score: res.data.user.score,
            warning: res.data.user.warning,
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.Error);
        toast.error(err.response.data.Error);
      });
  };
  if (user.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Login"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
        </div>
      </section>
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

export default Login;
