import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import vehicleReducer from "./slice/VehicleSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    vehicle: vehicleReducer,
  },
  devTools: true,
});
