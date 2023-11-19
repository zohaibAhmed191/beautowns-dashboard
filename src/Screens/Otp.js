import React from "react";
import OtpBanner from "../components/assets/otpVerification.png";
import OtpForm from "../components/auth/OtpForm";

const Otp = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block">
          <img src={OtpBanner} className="img-fluid otpBanner" alt="" />
        </div>
        <div className="ms-auto col-lg-5 d-flex justify-content-center align-items-center">
          <OtpForm />
        </div>
      </div>
    </div>
  );
};

export default Otp;
