import React from "react";
import signUpBanner from "../components/assets/signUpBan.png";
import SIgnUpForm from "../components/auth/SIgnUpForm";

const SignUp = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block">
          <img src={signUpBanner} className="img-fluid" alt="" />
        </div>
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <SIgnUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
