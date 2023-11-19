import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  let { isVerified } = useSelector((e) => e?.user?.user);
  return isVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
