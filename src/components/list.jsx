import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

const List = () => {
  const { isLoading, appointments } = useSelector((state) => state.appointment);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Har bir sahifada nechta appointment ko'rinadi

  // Pagination uchun hisoblash
  const pageCount = Math.ceil(
    (appointments?.appointments?.length || 0) / itemsPerPage
  );
  const startIndex = currentPage * itemsPerPage;
  const currentAppointments = appointments?.appointments?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className=" ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentAppointments?.map((item) => (
            <li
              key={item.id}
              className="d-flex  border py-2 px-3 my-2 justify-content-between align-items-center"
            >
              <b>{item.name}</b>
              <span className="badge bg-primary rounded-pill">
                <i className="bi bi-alarm mx-2"></i>
                сегодня
                {item.date.slice(10, 16)}
              </span>
            </li>
          ))}

          {/* Pagination */}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center my-4"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default List;
