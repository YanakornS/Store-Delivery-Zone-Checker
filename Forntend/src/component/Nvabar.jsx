import React from "react";
import Header from "./Header";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../Contexts/AuthContext";

function Navbar() {
  const { user } = useAuthContext();

  const menus = {
    ROLES_ADMIN: [
      { name: "AddStore", link: "/AddStore" },
      { name: "Home", link: "/home" },
    ],
    ROLES_USER: [{ name: "Home", link: "/home" }],
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-[#A8D5A4] to-[#87B985] text-white shadow-lg px-6 py-3 fixed w-full top-0 left-0 z-50 rounded-b-lg">
        <div className="navbar-start flex items-center">
          {/* Dropdown ทางซ้ายสุด */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white hover:bg-[#6A9E69] rounded-full shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#A8D5A4] rounded-lg shadow-lg mt-3 w-52 p-2"
            >
              {user &&
                menus[user.roles[0]].map((menuItem) => (
                  <li key={menuItem.name}>
                    <a href={menuItem.link} className="hover:text-[#4A4A4A]">
                      {menuItem.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* โลโก้ถัดจาก Dropdown */}
          <a href="/" className="flex items-center ml-4">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/11624/11624428.png"}
              alt="Logo"
              className="h-12 mr-2"
            />{" "}
            {/* ขนาดโลโก้ */}
          </a>
        </div>
        <div className="navbar-center">
          <a href="/Home" className="text-2xl font-bold">
            <Header />
          </a>
        </div>
        <div className="navbar-end flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <span>
                Welcome, <span className="font-semibold">{user.username}</span>
              </span>
              <UserProfile />
            </div>
          ) : (
            <div className="space-x-2">
              <a href="/login">
                <LoginButton />
              </a>
              <a href="/register">
                <RegisterButton />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
