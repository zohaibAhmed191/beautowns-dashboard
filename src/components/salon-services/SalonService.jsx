import React, { useState } from "react";
import ServiceTable from "../Table/ServiceTable";
import { Link } from "react-router-dom";
import apis from "../../services";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import nodata from "../assets/no_data_found.webp";

const SalonService = () => {
  const { storeInfo } = useSelector((e) => e?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setService] = useState([]);
  const getServices = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_all_services(storeInfo?._id);
      setIsLoading(false);
      if (response?.data?.service) {
        setService(response?.data?.service);
      }
    } catch (error) {
      setService([])
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading && <div id="cover-spin"></div>}
      <div className="d-flex flex-wrap p-2 flex-wrap align-items-center w-100 justify-content-between">
        <h1 className="m-0 my-3">Services</h1>
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Link to="/service/add">
            <button className="login-btn my-3 fw-bold">ADD</button>
          </Link>
        </div>
      </div>
      {services?.length > 0 ? (
        <ServiceTable
          getService={getServices}
          services={services}
        />
      ) : (
        <div className="col-md-3 mx-auto">
          <img
            src={nodata}
            className="img-fluid m-0 d-block mx-auto"
            alt="no data found"
          />
          <Link to="/service/add">
            <p className="text-center h_u margin--top">ADD NEW SERVICE</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default SalonService;
