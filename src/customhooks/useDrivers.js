import { useEffect } from "react";
import { getDrivers } from "../actions/package/package";
import { toast } from "react-toastify";
export const useDriver = (setDrivers) => {
  useEffect(() => {
    let unmounted = false;
    getDrivers()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.drivers && res.data.drivers.length > 0) {
              setDrivers(res.data.drivers);
            }
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });

    return () => {
      unmounted = true;
    };
  }, []);
};
