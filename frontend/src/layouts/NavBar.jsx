import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from "react-router-dom";

export default function NavBar({ toggleSideBar }) {
  return (
    <>
      <nav className="flex justify-between items-center shadow py-5 px-5 ">
        <p className="font-bold text-xl">Expense Tracker</p>
        <span
          className="flex items-center justify-center text-2xl cursor-pointer lg:hidden"
          onClick={toggleSideBar}
          aria-label="Toggle sidebar"
        >
          <AiOutlineMenu />
        </span>
      </nav>
      <Outlet />
    </>
  );
}
