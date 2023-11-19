import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import apis from "../../services";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StaffTime = ({ staff_id,isEdit,staff_details }) => {
  const navigate = useNavigate();
  let workingSchedule=staff_details?.workingSchedule;
  console.log(workingSchedule?.[0]?.from,"workingSchedule")
  const initialStoreTimings = {
    store_timings: [
      {
        day: "Monday",
        from: workingSchedule?.[0]?.from,
        to: workingSchedule?.[0]?.to,
        isAvailable: true,
      },
      {
        day: "Tuesday",
        from: workingSchedule?.[1]?.from,
        to: workingSchedule?.[1]?.to,
        isAvailable: true,
      },
      {
        day: "Wednesday",
        from: workingSchedule?.[2]?.from,
        to: workingSchedule?.[2]?.to,
        isAvailable: true,
      },
      {
        day: "Thursday",
        from: workingSchedule?.[3]?.from,
        to: workingSchedule?.[3]?.to,
        isAvailable: true,
      },
      {
        day: "Friday",
        from: workingSchedule?.[4]?.from,
        to: workingSchedule?.[4]?.to,
        isAvailable: true,
      },
      {
        day: "Saturday",
        from: workingSchedule?.[5]?.from,
        to: workingSchedule?.[5]?.to,
        isAvailable: true,
      },
      {
        day: "Sunday",
        from: workingSchedule?.[6]?.from,
        to: workingSchedule?.[6]?.to,
        isAvailable: false,
      },
    ],
  };

  console.log(initialStoreTimings,"initialStoreTimings")

  const [storeTimings, setStoreTimings] = useState(initialStoreTimings);
  const handleInputChange = (event, dayIndex) => {
    let { name, value, type } = event.target;
    setStoreTimings((prevStoreTimings) => {
      const updatedStoreTimings = [...prevStoreTimings.store_timings];
      updatedStoreTimings[dayIndex] = {
        ...updatedStoreTimings[dayIndex],
        [name]:
          type === "checkbox" ? !updatedStoreTimings[dayIndex][name] : value,
      };
      return { ...prevStoreTimings, store_timings: updatedStoreTimings };
    });
  };

  const formattedStoreTimings = storeTimings?.store_timings?.map((day) => {
    const formattedData = {
      day: day.day,
      from: `${
        moment(day.from, "hh:mm").format("hh:mma") !== "Invalid date"
          ? moment(day.from, "hh:mm").format("hh:mma")
          : '""'
      }`,
      to: `${
        moment(day.to, "hh:mm").format("hh:mma") !== "Invalid date"
          ? moment(day.to, "hh:mm").format("hh:mma")
          : '""'
      }`,
      isAvailable: day.isAvailable,
    };
    return formattedData;
  });
  

  const { mutate, isLoading } = useMutation(
    () =>
      apis.update_Staff(staff_id || staff_details?._id, {
        workingSchedule: formattedStoreTimings,
      }),
    {
      onError: function ({ message }) {
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 200) {
          navigate("/staff");
          toast.success(user?.message, { id: 1 });
        }
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formattedStoreTimings) {
      mutate();
    }
  };

  return (
    <div className="container">
      <h2 className="fw-bold text-uppercase mb-3">{isEdit ? "Update Staff Timing" :"Staff Timing"}</h2>
      <form onSubmit={handleSubmit}>
        {storeTimings?.store_timings?.map((day, index) => (
          <div className="row align-items-center mb-2" key={index}>
            <div className="col-2">
              <p className="m-0">{day?.day}</p>
            </div>
            <div className="col-3">
              <label className="ms-2">Opening Time</label>
              <input
                className="form-control w-100 ms-2"
                type="time"
                name="from"
                value={moment(day?.from, "hh:mma").format("hh:mm")}
                pattern="^([0-1]?[0-9]|1[0-2]):([0-5][0-9])(:[0-5][0-9])?$"
                onChange={(e) => {
                  handleInputChange(e, index);
                }}
              />
            </div>
            <div className="col-3">
              <label className="ms-2">Closing Time</label>
              <input
                type="time"
                name="to"
                className="form-control ms-2"
                value={moment(day?.to, "hh:mma").format("hh:mm")}
                pattern="^([0-1]?[0-9]|1[0-2]):([0-5][0-9])(:[0-5][0-9])?$"
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div className="col-2">
              <label>
                Available:
                <input
                  className="ms-2"
                  type="checkbox"
                  name="isAvailable"
                  checked={day.isAvailable}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </label>
            </div>
          </div>
        ))}

        <div className="col-lg-4 col-md-6 col-sm-10">
          <button className="login-btn mt-3 mb-2 fw-bold" type="submit">
            {isLoading ? <Spinner /> : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffTime;
