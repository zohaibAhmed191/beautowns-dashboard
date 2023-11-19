import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from "./Screens/ResetPassword";
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import Otp from "./Screens/Otp";
import Home from "./Screens/Home";
import Services from "./Screens/Services";
import SignUp from "./Screens/SignUp";
import ServiceDetail from "./Screens/ServiceDetail";
import Staff from "./Screens/Staff";
import StaffDetails from "./Screens/StaffDetails";
import AddSalonStaff from "./Screens/AddSalonStaff";
import Category from "./Screens/Category";
import AddService from "./Screens/AddService";
import Coupon from "./Screens/Coupon";
import AddCoupon from "./Screens/AddCoupon";
import Bookings from "./Screens/Bookings";
import SalonProfile from "./Screens/SalonProfile";
import Gallery from "./Screens/Gallery";
import Transactions from "./Screens/Transactions";
import Analytics from "./Screens/Analytics";
import AddBooking from "./Screens/AddBooking";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/rest-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<Otp />} />
          <Route path="/forgot-password/otp-verification" element={<Otp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service-details/:id" element={<ServiceDetail />} />
            <Route path="/service/add" element={<AddService />} />
            <Route path="/service/update/:id" element={<AddService />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/add" element={<AddSalonStaff />} />
            <Route path="/staff-details/:id" element={<StaffDetails />} />
            <Route path="/staff/update/:id" element={<AddSalonStaff />} />
            <Route path="/category" element={<Category />} />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/coupon/add" element={<AddCoupon />} />
            <Route path="/booking" element={<Bookings />} />
            <Route path="/profile" element={<SalonProfile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/booking/add" element={<AddBooking />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
