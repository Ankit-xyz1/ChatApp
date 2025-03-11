import { messageStore } from "../store/messageStore";
import { useEffect } from "react";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import MessageHeadBar from "./MessageHeadBar";
import MessageSend from "./MessageSend";
const ChatContainer = () => {
  const { messages, userToChatId, messageIsLoading, fetchMessages,messageContainerrLoading } = messageStore();

  useEffect(() => {
    console.log(userToChatId._id)
    fetchMessages(userToChatId._id);
  }, [userToChatId._id, fetchMessages]);
  useEffect(() => {
    console.log(messages)
  }, [messages]);

  if (messageContainerrLoading)  {
    return <div className="flex flex-col w-full h-full">
   
    <MessagesSkeleton />
    
    </div> 
  }
  return <div className="flex overflow-hidden flex-col w-full p-3">
  <MessageHeadBar/>
  <div className="messages w-full h-full overflow-auto"></div>
  <MessageSend/>
  </div>;
};

export default ChatContainer;
