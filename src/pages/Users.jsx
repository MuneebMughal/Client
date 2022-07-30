import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteUser } from "../actions/users/users";
import { useUsers } from "../customhooks/useUsers";
import { getUsers } from "../actions/users/users";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import { Navigate } from "react-router";
import { MdOutlineFilterList } from "react-icons/md";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const User = useSelector((state) => state.user);
  useUsers(setUsers);
  const fetchdata = async () => {
    await getUsers()
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.users && res.data.users.length > 0) {
            setUsers(res.data.users);
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleDelete = async (user) => {
    if (User.role !== roles.ADMIN)
      return toast.error("You can't perform this action.");
    let res = window.confirm(`Do you really want to delete ${user.email}`);
    if (res) {
      await deleteUser(user.email)
        .then(() => {
          toast.success(`${user.email} deleted successfully`);
          fetchdata();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const handleChange = (e) => {
    if (!e.target.value) {
      setFilter(false);
      setFilterValue("");
    } else {
      setFilter(true);
      setFilterValue(e.target.value);
    }
  };
  if (!User.isLoggedIn) return <Navigate to="/login" />;
  if (User.role === roles.DRIVER) return <Navigate to="/" />;
  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "1rem" }} className="text-center">
        Users
      </h2>
      <div class="relative float-end mx-4 my-4 px-2 d-flex">
        <div className="d-flex justify-content-center align-items-center mx-2">
          <div className="d-flex">
            <div className="text-bold"></div>
            Filters
            <div className="mx-1">
              <MdOutlineFilterList />
            </div>{" "}
          </div>
        </div>

        <div className="input_field select_option" style={{width:"120px"}}>
          <select value={filterValue} onChange={handleChange}>
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="cc">CC</option>
            <option value="driver">Driver</option>
          </select>
          <div className="select_arrow"></div>
        </div>
      </div>
      <div className="table-responsive tableContainer">
        <table className="table table-responsive">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
              {/* <th scope="col">Edit</th> */}
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((user) => (filter ? user.role === filterValue : true))
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{user.firstName ? user.firstName : "–"}</td>
                      <td>{user.lastName ? user.lastName : "–"}</td>
                      <td>{user.role ? user.role : "–"}</td>
                      <td>{user.email ? user.email : "–"}</td>
                      <td>
                        <div
                          className="table_action table_action_del"
                          onClick={() => handleDelete(user)}
                        >
                          <RiDeleteBinLine />
                        </div>
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

export default Users;
