import React, { useState } from "react";
import AppointmentService from "../service/appointment.service";
import toast, { Toaster } from "react-hot-toast";
import getRemainingHoursToday from "../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../utils/reverseDate";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // To'liq telefon raqami uchun
  const [formattedNumber, setFormattedNumber] = useState(""); // Foydalanuvchiga ko'rinadigan format
  const [time, setTime] = useState("");
  const [day, setDay] = useState(getRemainingHoursToday()[0]);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    state: false,
    msg: "",
  });
  const { isLoading } = useSelector((state) => state.appointment);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isNaN(phone.slice(4))) {
      return toast.error(
        "пожалуйста, не добавляйте буквы и символы в номер телефона"
      );
    }

    await AppointmentService.postAppointment(dispatch, {
      name,
      phone, // Telefon raqam to‘liq "+998" bilan yuboriladi
      date: formatDate(`${day} ${time}`, new Date().getFullYear()),
    });

    setName("");
    setPhone("");
    setFormattedNumber("");
    setTime("");
  };

  const dateToText = (date) => {
    if (new Date().getDate() == date.slice(0, 2)) {
      return "сегодня";
    } else if (new Date().getDate() + 1 == date.slice(0, 2)) {
      return "завтра";
    }
    return date;
  };

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qabul qilish

    // Maksimal uzunlikni tekshirish (9 ta raqamdan oshmasin)
    if (value.length > 9) {
      return;
    }

    // Raqamni formatlash
    const formatted = value.replace(
      /(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1-$2-$3-$4"
    );

    // Davlat kodi bilan birga statega yozish
    setPhone("+998" + value);
    setFormattedNumber(formatted); // Foydalanuvchiga ko‘rinadigan format
  };

  return (
    <div className="form-signin m-auto">
      <Toaster />
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Бронировать</h1>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Имя"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group my-3">
          <span className="input-group-text" id="basic-addon1">
            +998
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Телефон"
            value={formattedNumber}
            onChange={handleInputChange}
            aria-label="Телефон"
            required
            aria-describedby="basic-addon1"
          />
          <span className="badge text-danger">
            {error.state ? error.msg : ""}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <select
            className="form-control my-3"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {getRemainingHoursToday().map((item) => (
              <option key={item} value={item}>
                {dateToText(item)}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
            className="form-control time-input"
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={isLoading}
        >
          Бронировать
        </button>
      </form>
    </div>
  );
};

export default Form;
