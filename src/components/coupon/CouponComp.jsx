import React, { useState } from "react";
import CouponTable from "../Table/CouponTable";
import { Link } from "react-router-dom";
import apis from "../../services";
import { useEffect } from "react";
import nodata from "../assets/no_data_found.webp";
import toast from "react-hot-toast";

const CouponComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_all_coupons();
      if (response?.data?.coupons) {
        setCoupons(response?.data?.coupons);
      }
      setIsLoading(false);
    } catch (error) {
      setCoupons([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoupons();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading && <div id="cover-spin"></div>}
      <div className="d-flex flex-wrap p-2 flex-wrap align-items-center w-100 justify-content-between">
        <h1 className="m-0 mb-4">Coupons</h1>
        <div className="col-lg-2 col-md-3 col-sm-4">
          <Link to="/coupon/add">
            <button className="login-btn mt-3 mb-2 fw-bold">ADD</button>
          </Link>
        </div>
      </div>
      {coupons?.length > 0 ? (
        <CouponTable coupons={coupons} getCoupons={getCoupons} />
      ) : (
        <div className="col-md-3 mx-auto">
          <img
            src={nodata}
            className="img-fluid m-0 d-block mx-auto"
            alt="no data found"
          />
          <Link to="/coupon/add">
          <p className="text-center h_u margin--top">ADD NEW COUPON</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default CouponComp;
