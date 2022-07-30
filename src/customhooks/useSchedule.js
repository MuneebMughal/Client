import { useEffect } from "react";
import { getPackagesEDD } from "../actions/package/package";
import { toast } from "react-toastify";
export const useDPackages = (setDPackages) => {
  useEffect(() => {
    let unmounted = false;
    getPackagesEDD()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.Drivers && res.data.Drivers.length > 0) {
              setDPackages(res.data.Drivers);
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
