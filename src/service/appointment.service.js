import { toast } from "react-hot-toast";
import {
  getAppointmentFailure,
  getAppointmentStart,
  getAppointmentSuccess,
  postAppointmentSuccess,
} from "../slice/appointment.slice.js";
import axios from "./api.js";

const AppointmentService = {
  async postAppointment(dispatch, value) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.post("/appointments", value);
      if (data) {
        toast.success("успешно забронировано");
      }
      dispatch(postAppointmentSuccess());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
  async getAppointments(dispatch) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.get("/appointments");

      dispatch(getAppointmentSuccess(data));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
};

export default AppointmentService;
