import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../assets/Logo-02.png";
import { Menu } from "./Menu";
import { motion } from "framer-motion";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen } = useSidebar();
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${isSidebarOpen}` : ""}
      >
        <div className="logo">
          <img src={Logo} className="img-fluid mainLogo" alt="logo" />
        </div>

        <div className="menu">
          {Menu.map((item, index) => {
            return (
              <div
                className={
                  location.pathname.includes(item?.path)
                    ? "menuItem active_menu"
                    : "menuItem"
                }
                key={index}
                onClick={() => navigate(item?.path)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
