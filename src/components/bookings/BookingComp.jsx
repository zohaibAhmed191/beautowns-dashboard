import React from "react";
import { Link } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = dayjsLocalizer(dayjs);
const BookingComp = () => {
  return (
    <div className="container">
      <div className="d-flex mb-5 flex-wrap p-2 flex-wrap align-items-center w-100 justify-content-between">
        <h1 className="m-0 my-3">Bookings</h1>
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Link to="/booking/add">
            <button className="login-btn my-3 fw-bold">ADD</button>
          </Link>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        //   events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default BookingComp;
