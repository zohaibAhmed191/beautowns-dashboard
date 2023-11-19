import React from "react";
import MonthlyChart from "./MonthlyChart";
import ServiceChart from "./ServiceChart";
import StaffChart from "./StaffChart";
import OverAllChart from "./OverAllChart";

const AnalyticsComp = () => {
  return (
    <div className="container">
      <h2>Analytics</h2>
      <div className="row">
        <div className="col-lg-6 mt-3">
        <div className="bg-white rounded-3 pt-3">
          <h5 className="mt-2 text-center">Monthly Sales</h5>
          <MonthlyChart />
        </div>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="bg-white rounded-3 pt-3">
          <h5 className="mt-2 text-center">Service Sales</h5>
          <ServiceChart />
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="bg-white rounded-3 pt-3">
          <h5 className="mt-2 text-center">Staff Bookings</h5>
          <StaffChart />
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="bg-white rounded-3 pt-3">
          <h5 className="mt-2 text-center">Salon Earning</h5>
          <OverAllChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComp;
