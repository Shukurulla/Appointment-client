import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentService from "./service/appointment.service.js";
import List from "./components/list.jsx";
import Loading from "./components/loading.jsx";
import Form from "./components/form.jsx";
import getRemainingHoursToday from "./utils/formatDate.js";
import formatDate, { monthMap } from "./utils/reverseDate.js";
const App = () => {
  const dispatch = useDispatch();

  const { isLoading, appointments } = useSelector((state) => state.appointment);
  const [date, setDate] = useState(getRemainingHoursToday()[0]);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    AppointmentService.getAppointments(
      dispatch,
      `${new Date().getFullYear()}-${
        currentMonth.length < 2 ? "0" + currentMonth : currentMonth
      }-${
        new Date().getDate().length < 2
          ? "0" + new Date().getDate()
          : new Date().getDate()
      }`
    );
  }, []);

  const dateToText = (date) => {
    if (new Date().getDate() == date.slice(0, 2)) {
      return "сегодня";
    } else if (new Date().getDate() + 1 == date.slice(0, 2)) {
      return "завтра";
    }
    return date;
  };
  console.log(new Date().getDate());
  useEffect(() => {
    AppointmentService.getAppointments(
      dispatch,
      `${new Date().getFullYear()}-${
        currentMonth.length < 2 ? "0" + currentMonth : currentMonth
      }-${
        date.slice(0, 2).length < 2 ? "0" + date.slice(0, 2) : date.slice(0, 2)
      }`
    );
  }, [date]);

  return appointments.length == 0 ? (
    <div></div>
  ) : (
    <>
      <main className="py-3 ">
        <select
          onChange={(e) => setDate(e.target.value)}
          className="form-control my-3 select-day"
        >
          {getRemainingHoursToday().map((item) => (
            <option value={item}>{dateToText(item)}</option>
          ))}
        </select>
        <div className="row ">
          <div className="col-lg-6 p-0 m-0 col-md-12 order-2 order-lg-1 col-sm-12">
            <Form />
          </div>
          <div className="col-lg-6 p-0 m-0 col-md-12 order-1 order-lg-2 col-sm-12">
            <div className="list mx-auto">
              <h1 class="h3 mb-3 fw-normal">Очереди</h1>

              {isLoading ? <Loading /> : <List />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
