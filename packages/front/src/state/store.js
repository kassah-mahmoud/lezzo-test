import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "../features/stores/storesListSlice";

export default configureStore({
  reducer: {
    stores: storesReducer,
  },
});
