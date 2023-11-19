import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { setUser, set_store_info } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { errorValidate } from "../../validations/errorHandleJoi";
import { loginValidate } from "../../validations/LoginValidation";
import apis from "../../services";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let [data, setData] = useState({ email: "", password: "", role: "store" });
  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  let [error, setError] = useState();
  console.log(error, "error");

  const { mutate, isLoading } = useMutation(apis.authLogin, {
    onError: function ({ message }) {
      setError("");
      // console.log(error,"error11111")
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
        console.log(user, "user");
        dispatch(setUser(user?.user));
        dispatch(set_store_info(user?.store));
        toast.success(user?.message, { id: 1 });

        navigate("/dashboard");
      }
    },
  });

  const signIn = (e) => {
    e.preventDefault();
    let response = errorValidate(loginValidate(data));
    if (response === true) {
      mutate(data);
    } else {
      setError(response);
    }
  };
  return (
    <div className="Login-card">
      <form onSubmit={signIn}>
        <h1 className="text-center">Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="ms-2 mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="store@example.com"
            onChange={onChange}
          />
          {error?.email && <p className="text-danger">{error?.email}</p>}
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="ms-2 mb-1">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="**********"
            onChange={onChange}
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

        <p className="text-end m-0 mb-2">
          <Link to="/forgot-password">Forgot Password ?</Link>
        </p>
        <button className="login-btn" type="submit">
          {isLoading ? <Spinner animation="border" /> : "LOGIN"}
        </button>
      </form>
      <p className="text-center mb-0 my-4">
        Have No Account?{" "}
        <b>
          <Link to="/sign-up">SignUp Now!</Link>
        </b>
      </p>
    </div>
  );
};

export default LoginForm;
