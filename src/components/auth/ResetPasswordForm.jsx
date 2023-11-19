import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { errorValidate } from "../../validations/errorHandleJoi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../services";
import { useMutation } from "@tanstack/react-query";
import { set_Email_For_Verification } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { ResetPasswordValidate } from "../../validations/ForgotPasswordValidation";
import { Spinner } from "react-bootstrap";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email_for_verification } = useSelector((e) => e?.user);

  let [data, setData] = useState({
    email: email_for_verification,
    role: "store",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  let [error, setError] = useState();
  console.log(error, "error");
  const { mutate, isLoading } = useMutation(apis.authUpdatePassword, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
        dispatch(set_Email_For_Verification(null));
        toast.success(user?.message, { id: 1 });
        navigate("/login");
      }
    },
  });

  const VerifyOTP = (e) => {
    e.preventDefault();
    let response = errorValidate(ResetPasswordValidate(data));
    if (response === true) {
      mutate({
        email: email_for_verification,
        role: "store",
        password: data?.password,
      });
    } else {
      setError(response);
    }
  };

  return (
    <div className="Login-card">
      <form onSubmit={VerifyOTP}>
        <h1 className="text-center mb-4">Reset Password</h1>
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="ms-2 mb-1">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            onChange={onChange}
            placeholder="**********"
          />
          {error?.password && <p className="text-danger">{error?.password}</p>}
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
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="ms-2 mb-1">
            Confirm Password
          </label>
          <input
            type={showCPassword ? "text" : "password"}
            className="form-control"
            placeholder="**********"
            onChange={onChange}
            name="confirmPassword"
          />
          <div
            className="eyeDiv"
            onClick={() => setShowCPassword(!showCPassword)}
          >
            {!showCPassword ? (
              <FaRegEyeSlash className="eyeIcon" />
            ) : (
              <FaRegEye className="eyeIcon" />
            )}
          </div>
        </div>
        {error?.confirmPassword && (
          <p className="text-danger">{error?.confirmPassword}</p>
        )}

        <button className="login-btn mt-2" type="submit">
         {isLoading ? <Spinner /> : "RESET PASSWORD"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
