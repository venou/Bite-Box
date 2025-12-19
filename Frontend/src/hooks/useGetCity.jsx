import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  const detectCity = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
                apiKey,
              },
            }
          );

          const place = result?.data?.results?.[0];
          if (!place) return;

          dispatch(setCurrentCity(place.city));
          dispatch(setCurrentState(place.state));
          dispatch(
            setCurrentAddress(place.address_line2 || place.address_line1)
          );
          dispatch(setAddress(place.address_line2));
        } catch (err) {
          console.error("Reverse geocode failed", err);
        }
      },
      (error) => {
        console.warn("User denied location", error);
      }
    );
  };

  return { detectCity };
};

export default useGetCity;
