import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity } from "../redux/userSlice.js";

const useGetShopByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return;

    const fetchShops = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-by-city/${currentCity}`
        );
        dispatch(setShopInMyCity(result.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchShops();
  }, [currentCity]);
};

export default useGetShopByCity;

