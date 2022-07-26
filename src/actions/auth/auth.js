import axiosInstance from "../../helpers/axios";
export const login = (user) => axiosInstance.post("/login", user);
export const checkLogin = () => axiosInstance.post("/checklogin");
export const addUser = (user) => axiosInstance.post("/create-user", user);
