import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(setUserData(null)); // guest user
          return;
        }

        console.error("Auth check failed:", error);
      }
    };

    fetchUser();
  }, []);
};

export default useGetCurrentUser;
