import React, { useState, useEffect } from "react";
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
    ROLES_USER: [
      { name: "Home", link: "/home" },
      { name: "AddHotel", link: "/AddHotel" },
    ],
    ROLES_MODERATOR: [
      { name: "Add restaurant", link: "/addMenu" },
      { name: "Search", link: "/search" },
    ],
  };

  return (
    <>
      <div className="navbar bg-[#9DBDFF] text-white shadow-lg px-4 py-2 fixed w-full top-3 left-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white hover:bg-[#8AB1F7]"
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
              className="menu menu-sm dropdown-content bg-[#9DBDFF] rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
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
        </div>
        <div className="navbar-center">
          <a href="/Home" className="text-2xl font-bold">
            <Header />
          </a>
        </div>
        <div className="navbar-end flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
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