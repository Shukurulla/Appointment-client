function getRemainingHoursToday() {
  const now = new Date();

  // Rus tilidagi oylar
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const day = now.getDate(); // Hozirgi kun
  const month = months[now.getMonth()]; // Ruscha oy
  const currentHour = now.getHours() + 1; // Hozirgi soat
  const hours = [];

  for (let hour = currentHour; hour <= 23; hour++) {
    const formattedHour = hour.toString().padStart(2, "0") + ":00";
    hours.push(`${day} ${month} ${formattedHour}`);
  }

  // Kun tugashi bilan yana 00:00 ni qo'shamiz
  hours.push(`${day} ${month} 00:00`);

  return hours;
}

export default getRemainingHoursToday;
