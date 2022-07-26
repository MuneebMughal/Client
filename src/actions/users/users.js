import axiosInstance from "../../helpers/axios";
export const getUsers = () => axiosInstance.get("/get-users");
export const deleteUser = (email) => axiosInstance.delete(`/users/${email}`);
