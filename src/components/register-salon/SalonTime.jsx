import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import apis from "../../services";
import toast from "react-hot-toast";
import { set_store_info } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const SalonTime = ({ progress }) => {
  const { storeInfo } = useSelector((e) => e?.user);
  const dispatch = useDispatch();

  const initialStoreTimings = {
    store_timings: [
      {
        day: "Monday",
        from: storeInfo?.store_timings?.[0]?.from,
        to: storeInfo?.store_timings?.[0]?.to,
        isAvailable: true,
      },
      {
        day: "Tuesday",
        from: storeInfo?.store_timings?.[1]?.from,
        to: storeInfo?.store_timings?.[1]?.to,
        isAvailable: true,
      },
      {
        day: "Wednesday",
        from: storeInfo?.store_timings?.[2]?.from,
        to: storeInfo?.store_timings?.[2]?.to,
        isAvailable: true,
      },
      {
        day: "Thursday",
        from: storeInfo?.store_timings?.[3]?.from,
        to: storeInfo?.store_timings?.[3]?.to,
        isAvailable: true,
      },
      {
        day: "Friday",
        from: storeInfo?.store_timings?.[4]?.from,
        to: storeInfo?.store_timings?.[4]?.to,
        isAvailable: true,
      },
      {
        day: "Saturday",
        from: storeInfo?.store_timings?.[5]?.from,
        to: storeInfo?.store_timings?.[5]?.to,
        isAvailable: true,
      },
      {
        day: "Sunday",
        from: storeInfo?.store_timings?.[6]?.from,
        to: storeInfo?.store_timings?.[6]?.to,
        isAvailable: false,
      },
    ],
  };

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
      apis.updateStore(storeInfo?._id, {
        store_timings: formattedStoreTimings,
        completeProgess: progress || 2,
      }),
    {
      onError: function ({ message }) {
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 200) {
          dispatch(set_store_info(user?.store));
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
      <h2 className="fw-bold text-uppercase mb-3">Salon Timing</h2>
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

export default SalonTime;
