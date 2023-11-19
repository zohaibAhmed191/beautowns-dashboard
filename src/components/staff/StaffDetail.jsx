import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../../services";

const StaffDetail = () => {
  const params = useParams();
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const getStaff = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_single_staff(params?.id);
      setIsLoading(false);
      if (response?.data?.staff) {
        setStaff(response?.data?.staff);
      }
    } catch (error) {
      setStaff([])
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!params?.id) {
      navigate("/staff");
    } else {
      getStaff();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {isLoading && <div id="cover-spin"></div>}
      <img
        src={staff?.image}
        className="img-fluid d-block mx-auto salonProfileImage"
        alt=""
      />
      <div className="row mt-5">
        <div className="col-lg-4 mt-3">
          <div className="staff_details_card shadow p-3">
            <h5>Staff Name</h5>
            <h4 className="m-0">{staff?.name}</h4>
          </div>
        </div>
        <div className="col-lg-4 mt-3">
          <div className="staff_details_card shadow p-3">
            <h5>Staff Title</h5>
            <h4 className="m-0">{staff?.title}</h4>
          </div>
        </div>
        <div className="col-lg-4 mt-3">
          <div className="staff_details_card shadow p-3">
            <h5>Staff Phone</h5>
            <h4 className="m-0">+{staff?.phone}</h4>
          </div>
        </div>
        <div className="col-lg-4 mt-3">
          <div className="staff_details_card shadow p-3">
            <h5>Staff Gender</h5>
            <h4 className="m-0">{staff?.gender}</h4>
          </div>
        </div>
        <div className="col-lg-8 mt-3">
          <div className="staff_details_card shadow p-3">
            <h5>Staff Description</h5>
            <h6 className="m-0 fw-normal">{staff?.description}</h6>
          </div>
        </div>
      </div>
      <h3 className="mt-5">Staff Timing</h3>
      <div class="table-responsive">
        <table class="table shadow">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Available</th>
            </tr>
          </thead>
          <tbody>
            {staff?.workingSchedule?.length > 0 &&
              staff?.workingSchedule?.map((working, i) => {
                return (
                  <tr>
                    <th>{working?.day}</th>
                    <td>{working?.isAvailable ? working?.from : "OFF"}</td>
                    <td>{working?.isAvailable ? working?.to : "OFF"}</td>
                    <td>
                      {working?.isAvailable ? "Available" : "UnAvailable"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDetail;
