import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentService from "./service/appointment.service.js";
import List from "./components/list.jsx";
import Loading from "./components/loading.jsx";
import Form from "./components/form.jsx";

const App = () => {
  const dispatch = useDispatch();

  const { isLoading, appointments } = useSelector((state) => state.appointment);

  useEffect(() => {
    AppointmentService.getAppointments(dispatch);
  }, []);

  return appointments.length == 0 ? (
    <div></div>
  ) : (
    <>
      <div className="row">
        <div className="col-lg-6 p-0 m-0 col-md-12 col-sm-12">
          <Form />
        </div>
        <div className="col-lg-6 p-0 m-0 col-md-12 col-sm-12">
          <div className="py-5 w-75 mx-auto">
            <h1 class="h3 mb-3 fw-normal">Очереди</h1>

            {isLoading ? <Loading /> : <List />}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
