import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { errorValidate } from "../../validations/errorHandleJoi";
import { registerValidate } from "../../validations/RegisterValidation";
import { useDispatch } from "react-redux";
import { set_Email_For_Verification } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import apis from "../../services";
import { Spinner } from "react-bootstrap";

const SIgnUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [data, setData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    role: "store",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  let [error, setError] = useState();

  console.log(error, "error");

  const { mutate, isLoading } = useMutation(apis.authRegister, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
        dispatch(set_Email_For_Verification(data?.email));
        toast.success(user?.message, { id: 1 });
        navigate("/otp-verification");
      }
    },
  });

  const signUP = (e) => {
    e.preventDefault();
    let response = errorValidate(registerValidate(data));
    if (response === true) {
      mutate(data);
    } else {
      setError(response);
    }
  };

  return (
    <div className="Login-card">
      <form onSubmit={signUP}>
        <h1 className="text-center mb-4">SignUp</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="ms-2 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChange}
                className="form-control"
                placeholder="Name"
              />
              {error?.name && <p className="text-danger">{error?.name}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 position-relative">
              <label htmlFor="gender" className="ms-2 mb-1">
                Gender
              </label>
              <select
                id=""
                className="form-control"
                name="gender"
                onChange={onChange}
              >
                <option value="" disabled="" selected="">
                  Choose...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {error?.gender && <p className="text-danger">{error?.gender}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="ms-2 mb-1">
                Email
              </label>
              <input
                type="text"
                onChange={onChange}
                name="email"
                className="form-control"
                placeholder="store@example.com"
              />
              {error?.email && <p className="text-danger">{error?.email}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="ms-2 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                onChange={onChange}
                name="password"
                placeholder="**********"
              />
              <div
                className="eyeDiv"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <FaRegEyeSlash className="eyeIcon" />
                ) : (
                  <FaRegEye className="eyeIcon" />
                )}
              </div>
            </div>
            {error?.password && (
              <p className="text-danger password-error">{error?.password}</p>
            )}
          </div>
        </div>

        <button className="login-btn" type="submit">
          {isLoading ? <Spinner animation="border" /> : "SIGNUP"}
        </button>
      </form>
      <p className="text-center mb-0 my-4">
        Already have an Account?{" "}
        <b>
          <Link to="/login">Login Now!</Link>
        </b>
      </p>
    </div>
  );
};

export default SIgnUpForm;
