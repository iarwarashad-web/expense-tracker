import React, { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

export default function DashboardLayout({ children }) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  function toggleSideBar() {
    setIsOpenSideBar((prev) => !prev);
  }

  return (
    <>
      {/* Navbar with toggle button */}
      <NavBar toggleSideBar={toggleSideBar} />

      {/* Full page layout */}
      <div className="flex min-h-screen ">
        {/* Sidebar: controlled via toggle */}
        <SideBar
          isOpenSideBar={isOpenSideBar}
          onClose={() => setIsOpenSideBar(false)}
        />

        {/* Main content shifts to right on lg screens */}
        <main className="flex-1 p-4 ">{children}</main>
      </div>
    </>
  );
}
