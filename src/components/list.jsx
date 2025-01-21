import { useSelector } from "react-redux";

const List = () => {
  const { isLoading, appointments } = useSelector((state) => state.appointment);

  return (
    <ul className="">
      {isLoading
        ? ""
        : appointments.appointments.map((item) => (
            <li class=" border p-2 px-3 rounded-md d-flex my-2 justify-content-between align-items-center">
              <b>{item.name}</b>
              <span class="badge bg-primary rounded-pill">
                <i className="bi mx-2 bi-alarm"></i>
                сегодня
                {item.date.slice(10, 16)}
              </span>
            </li>
          ))}
    </ul>
  );
};
export default List;
