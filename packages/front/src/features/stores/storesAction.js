import axios from "axios";
import {
  fetchStoresFail,
  fetchStoresLoading,
  fetchStoresSuccess,
} from "./storesListSlice";

export const fetchAllStores =
  ({ size, page } = {}) =>
  async (dispatch) => {
    dispatch(fetchStoresLoading());
    try {
      const res = await axios.get("/api/stores", {
        params: {
          size,
          page,
        },
      });

      dispatch(fetchStoresSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchStoresFail("Something went wrong!"));
    }
  };
