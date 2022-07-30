import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { roles } from "../actions/constants";
const UserProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="d-flex flex-row border rounded">
            <div className="p-0 w-25">
              <FaUserCircle style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="pl-3 pt-5 px-5 pb-5 w-75 border-left">
              <h4 className="text-primary">{`${user.firstName} ${user.lastName}`}</h4>
              <h5 className="text-info">{user.role.toUpperCase()}</h5>
              <ul
                className="m-0 float-left"
                style={{ listStyle: "none", margin: "0", padding: "0" }}
              >
                <li className="my-1" style={{ fontWeight: "bold" }}>
                  {user.id}
                </li>
                {user.role === roles.DRIVER ? (
                  <>
                    <li
                      className="my-1"
                      style={
                        user.score <= 50
                          ? { color: "red" }
                          : user.score <= 80
                          ? { color: "orange" }
                          : { color: "green" }
                      }
                    >
                      {user.score}
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
