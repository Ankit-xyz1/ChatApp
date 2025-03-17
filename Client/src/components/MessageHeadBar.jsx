import React from "react";
import { messageStore } from "../store/messageStore";
import { authStore } from "../store/authStore";
import { ChevronLeft } from "lucide-react";

const MessageHeadBar = () => {
  const { userToChatId, chatSelected ,backFromChat } = messageStore();
  const { onlineUsers } = authStore();
  return (
    <>
      <div className="main w-full h-[7vh] flex overflow-hidden">
        <div className="backbutton w-[13%] lg:w-[7%] flex justify-center items-center">
          <button className=" rounded-full p-1 cursor-pointer hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.8)] transition duration-300" onClick={()=>backFromChat()}>
            <ChevronLeft />
          </button>
        </div>
        <div className="details w-[50%] lg:w-[30%] flex gap-3">
          <div className="profileimage h-full w-[25%]  flex justify-center items-center">
            <div className="image relative bg-black rounded-full   h-[25px] md:h-[40px] w-[25px] md:w-[40px] flex justify-end items-end overflow-hidden  transition-all ease-in-out duration-500">
              <img
                src={userToChatId.profilePic || "default.jpg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="name jet flex justify-start items-start py-1 flex-col">
            <p className="text-lg">{userToChatId.name}</p>
            <p className="textarea-xs">offline</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white opacity-10 m-1"></div>
    </>
  );
};

export default MessageHeadBar;
