import React from "react";
import forgotBanner from "../components/assets/forgotPassword.png";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block">
          <img src={forgotBanner} className="img-fluid" alt="" />
        </div>
        <div className="ms-auto col-lg-5 d-flex justify-content-center align-items-center">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
