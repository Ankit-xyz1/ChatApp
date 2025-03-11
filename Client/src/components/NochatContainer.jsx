import { Typewriter } from "react-simple-typewriter";
import { MessagesSquare } from "lucide-react";

const NochatContainer = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <div className="code w-[256px] h-[18.5vh] bg-zinc-600 p-[2px] rounded-sm">
          <div className="h-[3vh] w-full bg-zinc-600 flex justify-between ">
            <div className="w-[50%] flex items-center pl-1.5 font-bold jet text-white">
              Status
            </div>
            <div className="w-[50%] flex gap-3 items-center justify-end px-2.5">
              <div className="rounded-full bg-green-400 w-[9px] h-[9px] cursor-pointer overflow-hidden"></div>
              <div className="rounded-full bg-white w-[9px] h-[9px] cursor-pointer overflow-hidden"></div>
              <div className="rounded-full bg-red-400 w-[9px] h-[9px] cursor-pointer overflow-hidden"></div>
            </div>
          </div>
          <div className="bg-zinc-900 w-full h-[15vh] flex items-center justify-center p-3 text-md jet text-white flex-col ">
            <div className="animate-bounce"><MessagesSquare  color="#4643be"/></div>
            <Typewriter
              words={[`Select chat to start converstation.....`]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NochatContainer;
