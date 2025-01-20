import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AppointmentService from "./service/appointment.service.js";
import getRemainingHoursToday from "./utils/formatDate.js";
import formatDate from "./utils/reverseDate.js";

const App = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState(getRemainingHoursToday()[1]);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.appointment);

  const submitHandler = async (e) => {
    e.preventDefault();
    await AppointmentService.postAppointment(dispatch, {
      name,
      phone: "+998" + phone,
      date: formatDate(time, new Date().getFullYear() + ""),
    });
    setName("");
    setPhone("");
    setTime("");
  };
  return (
    <main class="form-signin w-25  m-auto my-5 py-5">
      <Toaster></Toaster>
      <form onSubmit={(e) => submitHandler(e)}>
        <h1 class="h3 mb-3 fw-normal">Бронировать</h1>

        <div class="">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="input-group my-3">
          <span class="input-group-text" id="basic-addon1">
            +998
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Phone"
            aria-describedby="basic-addon1"
          />
        </div>
        <select
          className="form-control my-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {getRemainingHoursToday().map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>

        <button
          class="btn btn-primary w-100 py-2"
          type="submit"
          disabled={isLoading}
        >
          Бронировать
        </button>
      </form>
    </main>
  );
};

export default App;
