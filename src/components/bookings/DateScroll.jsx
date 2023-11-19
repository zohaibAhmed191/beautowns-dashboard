import moment from "moment";
import React, { useRef } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

const DateScroll = ({ selectedDate, setSelectedDate }) => {
  const numDaysToShow = 30; // Number of days to display
  const dates = Array.from({ length: numDaysToShow }, (_, index) =>
    moment().add(index, "days")
  );

  const dateListRef = useRef(null);

  const handleNext = () => {
    const scrollWidth = dateListRef.current.scrollWidth;
    const scrollLeft = dateListRef.current.scrollLeft;
    const clientWidth = dateListRef.current.clientWidth;

    if (scrollWidth - scrollLeft !== clientWidth) {
      dateListRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const scrollLeft = dateListRef.current.scrollLeft;
    const clientWidth = dateListRef.current.clientWidth;

    if (scrollLeft !== 0) {
      dateListRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: "smooth",
      });
    }
  };
  const handleDateClick = (date) => {
    setSelectedDate(moment(date));
  };
  return (
    <div className="date-time-wrapper w-100 mt-4">
      <div className="px-2 py-4">
        <div className="d-flex justify-content-center align-items-center">
          <button onClick={handlePrev} className="dateSliderBtn">
            {" "}
            <IoArrowBack className="h4 m-0" />
          </button>
          <div className="date-list px-2" ref={dateListRef}>
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                data-date={date.format("YYYY-MM-DD")}
                className={`available-date ${
                  date.isSame(selectedDate, "day") ? "selected-date" : ""
                } mx-1 d-flex flex-column justify-content-between align-items-center`}
              >
                <h5 className="m-0">{date.format("ddd")}</h5>
                <h5 className="m-0 mt-1">{date.format("D")}</h5>
              </div>
            ))}
          </div>
          <button onClick={handleNext} className="dateSliderBtn">
            <IoArrowForward className="h4 m-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateScroll;
