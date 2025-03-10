import React from "react";

const Boxexs = () => {
  return (
    <>
      <div className=" h-fit w-[90%] flex flex-col gap-5 p-5 items-start justify-center">
        <div className="boxes flex gap-5">
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded relative text-white p-6 text-center font-bold animate-pulse"></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded "></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded"></div>
        </div>
        <div className="boxes flex gap-5">
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded relative text-white p-6 text-center font-bold animate-pulse"></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded relative text-white p-6 text-center font-bold animate-pulse"></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded relative text-white p-6 text-center font-bold animate-pulse"></div>
        </div>
        <div className="boxes flex gap-5">
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded"></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded"></div>
          <div className="bg-zinc-700 w-[100px] h-[100px] rounded relative text-white p-6 text-center font-bold animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default Boxexs;
