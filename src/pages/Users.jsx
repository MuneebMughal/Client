import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
// import { AiFillEdit } from "react-icons/ai";
import { deleteUser } from "../actions/users/users";
import { useUsers } from "../customhooks/useUsers";
import { getUsers } from "../actions/users/users";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import { Navigate } from "react-router";
const Users = () => {
  const [users, setUsers] = useState([]);
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
  if (!User.isLoggedIn) return <Navigate to="/login" />;
  if (User.role === roles.DRIVER)
    return <Navigate to="/" />;
  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "1rem" }} className="text-center">
        Users
      </h2>
      <div className="table-responsive tableContainer">
        <table className="table table-responsive \">
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
              users.map((user, index) => {
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
                    {/* <td>
                      <div
                        className="table_action table_action_edit"
                        onClick={() => handleEdit(user)}
                      >
                        <AiFillEdit />
                      </div>
                    </td> */}
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
