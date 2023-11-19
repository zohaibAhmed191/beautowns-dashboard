import React, { useState } from "react";
import LoginBanner from "../components/assets/loginBanner.png";
import LoginForm from "../components/auth/LoginForm";


const Login = () => {
  return (
    // LOADER
    // {isLoading && <div id="cover-spin"></div>}
    // LOADER
    <div className="container">
     
      <div className="row">
        <div className="col-lg-6 d-none d-md-block">
          <img src={LoginBanner} className="img-fluid" alt="" />
        </div>
        <div className="ms-auto col-lg-5 d-flex justify-content-center align-items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
