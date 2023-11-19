import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SidebarProvider from "./SidebarContext";

const Layout = ({ children }) => {
  return (
    <div className="AppGlass">
      <SidebarProvider>
        <Sidebar />
        <main>
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
