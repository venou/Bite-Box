import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentState,
  setCurrentAddress,
  setCurrentCity,
} from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = import.meta.env.VITE_GEOAPIKEY;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
      );
      // console.log(result);
      // console.log(result?.data?.features[0]?.properties?.address_line2);
      dispatch(setCurrentCity(result?.data?.features[0]?.properties?.city));
      dispatch(setCurrentState(result?.data?.features[0]?.properties?.state));
      dispatch(
        setCurrentAddress(result?.data?.features[0]?.properties?.address_line2)
      );
    });
  }, [userData]);
};

export default useGetCity;
