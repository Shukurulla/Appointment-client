import { useSelector } from "react-redux";

const List = () => {
  const { isLoading, appointments } = useSelector((state) => state.appointment);
  return (
    <ul class="list-group ">
      {isLoading
        ? ""
        : appointments.appointments.map((item) => (
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <b>{item.name}</b>
              <span class="badge bg-primary rounded-pill">
                <i className="bi mx-2 bi-alarm"></i>
                {item.date}
              </span>
            </li>
          ))}
    </ul>
  );
};
export default List;
