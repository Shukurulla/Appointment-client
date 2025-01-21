function getRemainingHoursToday() {
  const now = new Date();

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

  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const month = months[currentMonth];
  const days = [];

  const daysInCurrentMonth = new Date(
    now.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();

  for (let i = 0; i < 15; i++) {
    let day = currentDay + i;
    let monthToUse = month;

    if (day > daysInCurrentMonth) {
      day -= daysInCurrentMonth;
      monthToUse = months[currentMonth + 1] || months[0];
    }

    days.push(`${day} ${monthToUse}`);
  }

  return days;
}

export default getRemainingHoursToday;
