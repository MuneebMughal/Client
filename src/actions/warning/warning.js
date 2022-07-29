import axiosInstance from "../../helpers/axios";
export const deleteWarning = (id) => axiosInstance.delete(`/warnings/${id}`);
export const getWarnings = () => axiosInstance.get("/get-warnings");
