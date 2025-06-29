import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../pages/contexts/userContext";

import { CiLogout } from "react-icons/ci";
import { PiHandCoinsBold } from "react-icons/pi";
import { FaWallet } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function SideBar({ isOpenSideBar, onClose }) {
  const navigate = useNavigate();
  const { clearUser, user, logOutHandler } = useContext(UserContext);



  function handleNavClick() {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  }

  return (
    <aside
      className={`
           
        fixed top-0 left-0  w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpenSideBar ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
        flex flex-col
       
      `}
    >
      <p className="text-3xl font-bold py-6 text-center">
        {user?.fullName}
      </p>

      <NavLink
        to="/dashboard"
        onClick={handleNavClick}
        className={({ isActive }) =>
          `text-xl p-4 hover:bg-gray-200 flex items-center gap-2 ${
            isActive
              ? "text-purple-700 font-bold bg-gray-100"
              : "text-gray-800"
          }`
        }
      >
        <MdDashboard className="text-xl" /> Dashboard
      </NavLink>

      <NavLink
        to="/income"
        onClick={handleNavClick}
        className={({ isActive }) =>
          `text-xl p-4 hover:bg-gray-200 flex items-center gap-2 ${
            isActive
              ? "text-purple-700 font-bold bg-gray-100"
              : "text-gray-800"
          }`
        }
      >
        <FaWallet className="text-xl" /> Income
      </NavLink>

      <NavLink
        to="/expenses"
        onClick={handleNavClick}
        className={({ isActive }) =>
          `text-xl p-4 hover:bg-gray-200 flex items-center gap-2 ${
            isActive
              ? "text-purple-700 font-bold bg-gray-100"
              : "text-gray-800"
          }`
        }
      >
        <PiHandCoinsBold className="text-xl" /> Expenses
      </NavLink>

      <NavLink
        to="/logout"
        onClick={() => {
          handleNavClick();
          logOutHandler();
        }}
        className={({ isActive }) =>
          `text-xl p-4 hover:bg-gray-200 flex items-center gap-2 ${
            isActive
              ? "text-purple-700 font-bold bg-gray-100"
              : "text-gray-800"
          }`
        }
      >
        <CiLogout className="text-xl" /> Log Out
      </NavLink>
    </aside>
  );
}
