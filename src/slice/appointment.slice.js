import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    isLoading: false,
    appointments: [],
  },
  reducers: {
    getAppointmentStart: (state) => {
      state.isLoading = true;
    },
    getAppointmentSuccess: (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    },
    getAppointmentFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  getAppointmentFailure,
  getAppointmentStart,
  getAppointmentSuccess,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
