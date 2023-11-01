import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

export const SideNavbar = ({ navigation, isSideNavbarOpen, toggleSideNavbar }) => {
  const logout = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
  return (
    <div
      className={`bg-[#040430] min-h-screen ${
        isSideNavbarOpen ? "w-72" : "w-16"
      }  duration-500 text-gray-100 px-4`}
      style={{ position: "fixed" }}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={toggleSideNavbar}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {navigation.map((nav, i) => (
          <Link
            to={nav.link}
            key={i}
            className={
              "group flex items-center text-base gap-3.5 font-medium p-2 hover:bg-[#4c4ca6] rounded-md"
            }
          >
            <div className="">{React.createElement(nav.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {nav.name}
            </h2>
            <h2
              className={`${isSideNavbarOpen && "hidden"} absolute left-48 bg-[#040430] font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-11 group-hover:py-3 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}
            >
              {nav.name}
            </h2>
          </Link>
        ))}
      </div>
      <div>
      <Link
           
            className={
              "group flex items-center text-base gap-3.5 font-medium p-2 hover:bg-[#4c4ca6] rounded-md"
            }
          >
            {/* <div>{React.createElement(logout, { size: "20" })}</div> */}
            
            <h2
              style={{
                transitionDelay: `900ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${isSideNavbarOpen && "hidden"} absolute left-48 bg-[#040430] font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-11 group-hover:py-3 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}
            >
              Logout
            </h2>
          </Link>
      </div>
    </div>
  );
};
