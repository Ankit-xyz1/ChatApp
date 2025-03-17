import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { messageStore } from "../store/messageStore";
import NochatContainer from "../components/NochatContainer";
const Home = () => {
  const {chatSelected} = messageStore();
  return (
    <>
      <div className="h-[93vh] bg-base-200">
        <div className="flex items-center justify-center pt-10 px-4 ">
          <div className="flex bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden">
            <div className="flex h-full w-full rounded-lg overflow-hidden">
              <Sidebar/>
              {chatSelected?<ChatContainer/>:<NochatContainer/>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
