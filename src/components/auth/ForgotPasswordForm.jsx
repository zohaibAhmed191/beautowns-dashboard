import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apis from "../../services";
import toast from "react-hot-toast";
import { set_Email_For_Verification } from "../../redux/slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();

  const { mutate, isLoading } = useMutation(apis.authForgot, {
    onError: function ({ message }) {
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
        dispatch(set_Email_For_Verification(email));
        toast.success(user?.message, { id: 1 });
        navigate("/forgot-password/otp-verification");
      }
    },
  });

  const sendOtp = (e) => {
    e.preventDefault();
    if (email) {
      mutate({ email: email, role: "store" });
    } else {
      setError("Email is Required");
    }
  };

  return (
    <div className="Login-card">
      <form onSubmit={sendOtp}>
        <h1 className="text-center">Forgot Password</h1>
        <div className="mb-3">
          <label htmlFor="email" className="ms-2 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="store@example.com"
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
        <p className="text-center m-0 mb-2">We will send you OTP via Email.</p>
        <button className="login-btn" type="submit">
          {isLoading ? <Spinner animation="border" /> : "SEND OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
