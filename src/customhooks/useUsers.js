import { useEffect } from "react";
import { getUsers } from "../actions/users/users";
import { toast } from "react-toastify";
export const useUsers = (setUsers) => {
  useEffect(() => {
    let unmounted = false;
    getUsers()
      .then((res) => {
        if (!unmounted) {
          if (res && res.status === 200) {
            if (res.data.users && res.data.users.length > 0) {
              setUsers(res.data.users);
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
