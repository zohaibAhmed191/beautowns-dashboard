import { useMutation } from "@tanstack/react-query";
import OtpInput from "react-otp-input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setUser,
  set_Email_For_Verification,
} from "../../redux/slices/userSlice";
import apis from "../../services";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
const OtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { email_for_verification } = useSelector((e) => e?.user);

  const { mutate, isLoading } = useMutation(apis.authVerify, {
    onError: function ({ message }) {
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
        if (location?.pathname.includes("forgot")) {
          navigate("/rest-password");
        } else {
          dispatch(set_Email_For_Verification(null));
          dispatch(setUser(user?.user));
          toast.success(user?.message, { id: 1 });
          navigate("/dashboard");
        }
      }
    },
  });

  const { mutate: resend_OTP, isLoading: resend } = useMutation(
    apis.authForgot,
    {
      onError: function ({ message }) {
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 200) {
          toast.success(user?.message, { id: 1 });
        }
      },
    }
  );

  const sendAgain = () => {
    resend_OTP({ email: email_for_verification, role: "store" });
  };

  const [otp, setOtp] = useState();

  useEffect(() => {
    if (otp?.length === 4) {
      mutate({ email: email_for_verification, otp: otp });
    }
  }, [otp]);

  return (
    <div className="Login-card">
      <h1 className="text-center">Verify OTP</h1>
      <p className="text-center m-0 mb-2">
        We have send you the OTP via Email. <br />
        Check Your Inbox{" "}
      </p>
      <div className="w-100 d-flex justify-content-center my-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={"OPT_INPUT"}
          inputType={"number"}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className="w-100 d-flex justify-content-center">
        {(isLoading || resend) && <Spinner animation="border" />}
      </div>
      <p className="text-center m-0 my-2 h_u" onClick={sendAgain}>
        Send OTP Again.
      </p>
    </div>
  );
};

export default OtpForm;
