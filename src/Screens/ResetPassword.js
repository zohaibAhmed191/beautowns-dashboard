import React from "react";
import ResetPass from "../components/assets/resetPass.webp"
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block">
          <img src={ResetPass} className="img-fluid" alt="" />
        </div>
        <div className="ms-auto col-lg-5 d-flex justify-content-center align-items-center">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
