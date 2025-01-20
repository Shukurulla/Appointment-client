import { configureStore } from "@reduxjs/toolkit";
import AppointmentReducer from "../slice/appointment.slice.js";

const store = new configureStore({
  reducer: {
    appointment: AppointmentReducer,
  },
  devTools: process.env.NODE_ENV != "production",
});

export default store;
