import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/bookIt/", { replace: true });
  };

  return (
    <nav className=" bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <NavLink to="/bookIt/landing" className="text-2xl font-bold text-blue-600">
        BookIt 📚
      </NavLink>

      <div className="space-x-6 flex items-center">
        <NavLink
          to="/bookIt/landing"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600 font-medium"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/bookIt/books"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600 font-medium"
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/bookIt/profile"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600 font-medium"
          }
        >
          Profile
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
