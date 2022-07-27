import axiosInstance from "../../helpers/axios";
export const addPackage = (pkg) => axiosInstance.post("/create-package", pkg);
export const getDrivers = () => axiosInstance.get("/get-drivers");
export const getPackages = () => axiosInstance.get("/get-packages");
export const deletePackage = (id) => axiosInstance.delete(`/packages/${id}`);
export const updatePackageStatus = (id, status) =>
  axiosInstance.put(`/packages/${id}`, status);
