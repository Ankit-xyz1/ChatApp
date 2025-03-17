import { messageStore } from "../store/messageStore";
import { useEffect } from "react";
import { SideBarSkeleton } from "./skeleton/SideBarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { userIsLoading, users, fetchUsers ,setChat,userToChatId } = messageStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {userIsLoading ? (
        <>
          <SideBarSkeleton />
        </>
      ) : (
        <>
          <div>
            <aside
              className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
            >
              <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span className="font-medium hidden lg:block">Contacts</span>
                </div>
              </div>

              {/* contacts */}
              <div className="overflow-y-auto w-full p-1 py-3 flex gap-1 flex-col">
                {users.data.map((item) => (
                  <>
                    <button key={item._id}  className={`w-full h-fit cursor-pointer rounded-lg hover:bg-base-300 transition-colors ${userToChatId._id === item._id? "bg-base-300": ""}`}
                    onClick={()=>setChat(item)}
                    >
                      <div className="users  w-full p-3 h-20 flex gap-2">
                        <div className="userImage w-full lg:w-[22%] h-full flex justify-center items-center">
                          <div className="image h-[30px] md:h-[50px] w-[30px] md:w-[50px] flex border-2 rounded-full overflow-hidden  ">
                            {/* image relative bg-black rounded-full   h-[20px] md:h-[40px] w-[20px] md:w-[40px] flex justify-end items-end overflow-hidden  transition-all ease-in-out duration-500 */}
                            <img
                              src={item.profilePic || "default.jpg"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="username w-[70%] h-full overflow-hidden hidden lg:flex jet items-center p-2">
                          {item.name}
                        </div>
                      </div>
                    </button>
                  </>
                ))}
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
