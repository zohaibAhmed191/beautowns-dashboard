import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import Dropdown from "react-bootstrap/Dropdown";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { useSidebar } from "./SidebarContext";
import { FaBars, FaArrowLeft } from "react-icons/fa6";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleSidebar,isSidebarOpen } = useSidebar();

  return (
    <>
      <div className="header-div align-items-center">
        <div className="bars" onClick={toggleSidebar}>
          {!isSidebarOpen ? <FaBars /> : <FaArrowLeft />}
        </div>

        <Dropdown>
          <Dropdown.Toggle className="header-dropdown" id="dropdown-basic">
            <FaCircleUser className="fs-1 text-dark" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className="fs-5 d-flex align-items-center"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <FaCircleUser className="text-dark fs-4 me-2" /> Profile
            </Dropdown.Item>

            <Dropdown.Item
              className="fs-5 d-flex align-items-center"
              onClick={() => {
                navigate("/login");
                dispatch(logout());
              }}
            >
              <BiLogOutCircle className="text-dark fs-4 me-2" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default Header;
