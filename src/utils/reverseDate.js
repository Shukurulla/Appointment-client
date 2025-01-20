function formatDate(inputDate, year) {
  const monthMap = {
    январь: "01",
    февраль: "02",
    март: "03",
    апрель: "04",
    май: "05",
    июнь: "06",
    июль: "07",
    август: "08",
    сентябрь: "09",
    октябрь: "10",
    ноябрь: "11",
    декабрь: "12",
  };

  // Kiruvchi sana formatini ajratish
  const [day, monthWord, time] = inputDate.split(" ");

  // Oylik xaritadan mos raqamni olish
  const month = monthMap[monthWord.toLowerCase()];

  if (!month) {
    throw new Error(`Noto'g'ri oy nomi: ${monthWord}`);
  }

  // To'g'ri formatni qaytarish
  return `${year}-${month}-${day.padStart(2, "0")} ${time}:00`;
}

export default formatDate;
