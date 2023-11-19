import React, { useState, useEffect } from "react";
import StaffTable from "../Table/StaffTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import apis from "../../services";
import nodata from "../assets/no_data_found.webp";

const StaffList = () => {
  const { storeInfo } = useSelector((e) => e?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);

  const getStaffs = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_all_staff(storeInfo?._id);
      setIsLoading(false);
      if (response?.data?.Staff) {
        setStaffs(response?.data?.Staff);
      }
    } catch (error) {
      setStaffs([]);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaffs();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {isLoading && <div id="cover-spin"></div>}
      <div className="d-flex p-2 flex-wrap align-items-center w-100 justify-content-between">
        <h1 className="m-0 my-3">Staff</h1>
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Link to="/staff/add">
            <button className="login-btn my-3 fw-bold">ADD</button>
          </Link>
        </div>
      </div>
      {staffs?.length > 0 ? (
        <StaffTable getStaffs={getStaffs} staffs={staffs} />
      ) : (
        <div className="col-md-3 mx-auto">
          <img
            src={nodata}
            className="img-fluid m-0 d-block mx-auto"
            alt="no data found"
          />
          <Link to="/staff/add">
          <p className="text-center h_u margin--top">ADD NEW STAFF</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StaffList;
