import { useEffect } from "react";
import { getPackages } from "../actions/package/package";
import { toast } from "react-toastify";
export const usePackages = (setPackages) => {
  useEffect(() => {
    let unmounted = false;
    getPackages()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.packages && res.data.packages.length > 0) {
              setPackages(res.data.packages);
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
