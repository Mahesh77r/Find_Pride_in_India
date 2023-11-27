import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Toaster, toast } from 'react-hot-toast'

export const SideNavbar = ({ navigation, isSideNavbarOpen, toggleSideNavbar }) => {
 
    const {user} = useUser();

    const LogoutMsg = () => {toast.success('Logout Successfully')}

  const handleLogout = () => {
    // Clear the access_token from localStorage when logging out
    localStorage.removeItem("user");
    window.location.assign("/login");
    LogoutMsg()
  };
  return (
  <>
    <Toaster position="top-center" />
    <div
      className={`bg-[#000D27] min-h-screen ${isSideNavbarOpen ? "w-64" : "w-16"
        } duration-700 text-gray-100 px-4`}
      style={{ position: "fixed" , top: "81px"}}
    >
      <div className="pt-2 flex justify-start gap-7">
        <div><HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={toggleSideNavbar}
        /></div>
        {/* {isSideNavbarOpen ?  */}
        <div className={`whitespace-pre duration-500 ${!isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"}`}> {user.adminName}</div> 
        {/* : null} */}
        
      </div>
      <div className="mt-4 flex flex-col gap-4 relative" >
        {navigation.map((nav, i) => (
          // only for logout to use onClick function
          nav.name ==="Logout" ?
          <Link
            
            key={i}
            onClick={handleLogout}
            className={
              "group flex items-center text-base gap-7 font-medium p-1 rounded-md hover:bg-white  hover:text-[#040430]"
            }
          >
            <div className="justify-start p-0 m-0">{nav.icon}</div>
            <h2 className={`whitespace-pre duration-500 ${!isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
              {nav.name}
            </h2>
          </Link>
          :
          // 
          <Link
            to={nav.link}
            key={i}
            className={
              "group flex items-center text-base gap-7 font-medium p-1 rounded-md hover:bg-white  hover:text-[#040430]"
            }
          >
            <div className="justify-start p-0 m-0">{nav.icon}</div>
            <h2 className={`whitespace-pre duration-500 ${!isSideNavbarOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
              {nav.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};
