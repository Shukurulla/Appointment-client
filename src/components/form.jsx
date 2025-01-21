import React, { useState } from "react";
import AppointmentService from "../service/appointment.service";
import toast, { Toaster } from "react-hot-toast";
import getRemainingHoursToday from "../utils/formatDate";
import { useSelector } from "react-redux";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState(getRemainingHoursToday()[0]);

  const { isLoading } = useSelector((state) => state.appointment);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isNaN(phone)) {
      return toast.error(
        "пожалуйста, не добавляйте буквы и символы в номер телефона"
      );
    }

    await AppointmentService.postAppointment(dispatch, {
      name,
      phone: "+998" + phone,
      date: formatDate(`${day} ${time}`, new Date().getFullYear()),
    });
    setName("");
    setPhone("");
    setTime("");
  };

  return (
    <main class="form-signin  m-auto  py-5">
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
            required
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
            required
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <select
            className="form-control my-3"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {getRemainingHoursToday().map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            type="time"
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
            className="form-control w-25"
          />
        </div>

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

export default Form;
