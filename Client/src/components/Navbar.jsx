import { useState } from "react";
import { authStore } from "../store/authStore";
import { LogOut, MessagesSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authUser,Logout } = authStore();
  return (
    <>
      <header>
        <div className="navbar flex w-full h-15  items-center justify-between ">
          <div className="left px-4">
            <Link to={"/"} className=" ">
              <div className="flex gap-2 items-center justify-center">
                <MessagesSquare size={40} color="#4643be" />
                <span className="text-xl   no-underline hover:text-gray-300 transition-all ease-in-out duration-700">
                  DevChat
                </span>
              </div>
            </Link>
          </div>
          <div className="right flex gap-5 px-10">
            <Link to={"/setting"} className="">
              <div className="setting flex gap-2">
                <Settings color="#4643be" />
                <span className="  hidden md:inline hover:text-zinc-400 transition-all ease-in-out duration-700">Settings</span>
              </div>
            </Link>
            {authUser &&  <><Link to={"/profile"} className="">
              <div className="setting flex gap-2">
                <User color="#4643be" />
                <span className="  hidden md:inline  hover:text-zinc-400 transition-all ease-in-out duration-700">profile</span>
              </div>
            </Link>

            <div className="setting flex gap-2 cursor-pointer" onClick={()=>Logout()}>
              <LogOut color="#4643be" />
              <span className="  hidden md:inline hover:text-red-400 transition-all ease-in-out duration-700">Logout</span>
            </div>
            </>}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
