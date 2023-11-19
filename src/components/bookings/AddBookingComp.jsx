import React, { useEffect, useState } from "react";
import apis from "../../services";
import { useSelector } from "react-redux";
import DateScroll from "./DateScroll";
import moment from "moment";
import BookingServiceTable from "../Table/BookingServiceTable";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const AddBookingComp = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storeSlots, setStoreSlots] = useState([]);
  const { storeInfo, user } = useSelector((e) => e?.user);

  const [data, setData] = useState({
    user_Id: user?._id,
    store_Id: storeInfo?._id,
    service_Ids: selectedServices,
    time: "",
    date: moment(selectedDate).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    setData((prevData) => ({ ...prevData, service_Ids: selectedServices }));
  }, [selectedServices]);

  const get_slots = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_slots(
        storeInfo?._id,
        moment(selectedDate).format("YYYY-MM-DD"),
        "50"
      );
      if (response?.data?.data) {
        setStoreSlots(response?.data?.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const { mutate, isLoading: isBooking } = useMutation(
    apis.create_booking,
    {
      onError: function ({ message }) {
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 201) {
          toast.success(user?.message, { id: 1 });
        }
      },
    }
  );

  useEffect(() => {
    get_slots();
    setData((prevData) => ({ ...prevData, time: "" }));
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div>
      {isLoading && <div id="cover-spin"></div>}
      <h2 className="mb-4">Add Booking</h2>
      <BookingServiceTable
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        storeInfo={storeInfo}
      />

      <DateScroll
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="d-flex flex-wrap">
        {storeSlots?.[0]?.slots?.length > 0 &&
          storeSlots?.[0]?.slots?.map((slot, i) => {
            return (
              <div
                key={i}
                className={`m-0 m-2  ${
                  data?.time === slot ? "timeSlot-active" : "timeSlot"
                }`}
                onClick={() =>
                  setData((prevData) => ({ ...prevData, time: slot }))
                }
              >
                {slot}
              </div>
            );
          })}
      </div>
      <div className="col-md-3 ms-auto mt-3">
        <button className="login-btn" onClick={() => mutate(data)}>
          {isBooking ? <Spinner /> : "Book Slot"}
        </button>
      </div>
    </div>
  );
};

export default AddBookingComp;
