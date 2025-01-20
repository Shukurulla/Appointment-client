import { toast } from "react-hot-toast";
import {
  getAppointmentFailure,
  getAppointmentStart,
  getAppointmentSuccess,
} from "../slice/appointment.slice.js";
import axios from "./api.js";

const AppointmentService = {
  async postAppointment(dispatch, value) {
    dispatch(getAppointmentStart());
    try {
      const { data } = await axios.post("/appointments", value);
      dispatch(getAppointmentSuccess(data));
      if (data) {
        toast.success("успешно забронировано");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getAppointmentFailure());
    }
  },
};

export default AppointmentService;
