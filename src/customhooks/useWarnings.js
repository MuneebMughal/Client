import { useEffect } from "react";
import { getWarnings } from "../actions/warning/warning";
import { toast } from "react-toastify";
export const useWarnings = (setWarnings) => {
  useEffect(() => {
    let unmounted = false;
    getWarnings()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.warnings && res.data.warnings.length > 0) {
              setWarnings(res.data.warnings);
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
