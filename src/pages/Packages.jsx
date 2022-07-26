import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
// import { AiFillEdit } from "react-icons/ai";
import { deletePackage } from "../actions/package/package";
import { usePackages } from "../customhooks/usePackages";
import { getPackages } from "../actions/package/package";
import { useSelector } from "react-redux";
import { roles } from "../actions/constants";
import { Navigate } from "react-router";
const Packages = () => {
  const [packages, setPackages] = useState([]);
  const User = useSelector((state) => state.user);
  usePackages(setPackages);
  const fetchdata = async () => {
    await getPackages()
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.packages && res.data.packages.length > 0) {
            setPackages(res.data.packages);
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleDelete = async (pkg) => {
    if (User.role !== roles.ADMIN)
      return toast.error("You can't perform this action.");
    let res = window.confirm(`Do you really want to delete ${pkg.id}`);
    if (res) {
      await deletePackage(pkg.id)
        .then(() => {
          toast.success(`${pkg.id} deleted successfully`);
          fetchdata();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  if (User.role === roles.DRIVER) return <Navigate to="/" />;
  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "1rem" }} className="text-center">
        Packages
      </h2>
      <div className="table-responsive tableContainer">
        <table className="table table-responsive \">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">EDD</th>
              <th scope="col">RTA</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
              {/* <th scope="col">Edit</th> */}
            </tr>
          </thead>
          <tbody>
            {packages &&
              packages.map((pkg, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{pkg.id}</th>
                    <td>{pkg.EDD ? pkg.EDD : "–"}</td>
                    <td>{pkg.RTA ? pkg.RTA : "–"}</td>
                    <td>{pkg.priority ? pkg.priority : "–"}</td>
                    <td>{pkg.status ? pkg.status : "–"}</td>
                    <td>
                      <div
                        className="table_action table_action_del"
                        onClick={() => handleDelete(pkg)}
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

export default Packages;
