import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import Navbar from "../components/Navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillWarning } from "react-icons/ai";
import "../css/jombotron.css";
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  if (!user.isLoggedIn) return <Navigate to="/login" />;
  return (
    <div>
      <Navbar />
      <UserProfile />
      {user.role === roles.ADMIN ? (
        <div>
          <Link className="jomboContainer" to="/add-user">
            <div className="jumbotron jumbotron-fluid jombo">
              <div className="container">
                <h1 className="display-4">
                  Add User <AiOutlineUserAdd />{" "}
                </h1>
                <p className="lead">Feature to add new user.</p>
              </div>
            </div>
          </Link>
          <Link className="jomboContainer" to="/add-package">
            <div className="jumbotron jumbotron-fluid jombo">
              <div className="container">
                <h1 className="display-4">
                  Add Package <BiPackage />{" "}
                </h1>
                <p className="lead">Feature to add new Package.</p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
      {user.role === roles.ADMIN || user.role === roles.CC ? (
        <div>
          <Link className="jomboContainer" to="/users">
            <div className="jumbotron jumbotron-fluid jombo">
              <div className="container">
                <h1 className="display-4">
                  View Users <FiUsers />{" "}
                </h1>
                <p className="lead">Feature to see all users.</p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div>
        <Link className="jomboContainer" to="/packages">
          <div className="jumbotron jumbotron-fluid jombo">
            <div className="container">
              <h1 className="display-4">
                View Packages <BiPackage />{" "}
              </h1>
              <p className="lead">Feature to see all Packages.</p>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link className="jomboContainer" to="/map">
          <div className="jumbotron jumbotron-fluid jombo">
            <div className="container">
              <h1 className="display-4">
                See Map <FaMapMarkerAlt />{" "}
              </h1>
              <p className="lead">Feature to trace driver.</p>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link className="jomboContainer" to="/warnings">
          <div className="jumbotron jumbotron-fluid jombo">
            <div className="container">
              <h1 className="display-4">
                See Warnings <AiFillWarning />{" "}
              </h1>
              <p className="lead">Feature to see warnings.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
