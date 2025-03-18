import { messageStore } from "../store/messageStore";
import { useEffect, useRef, useState } from "react";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import MessageHeadBar from "./MessageHeadBar";
import MessageSend from "./MessageSend";
import { X } from "lucide-react";
import { formatMessageTime } from "../lib/util";
const ChatContainer = () => {
  const {
    messages,
    userToChatId,
    fetchMessages,
    messageContainerrLoading,
    subscribeToMessage,
    unsubscribeToMessage,
  } = messageStore();

  const [imageView, setimageView] = useState(false);
  const [imageSrc, setimageSrc] = useState("");


  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      console.log("i am scrroll",scroll)
    }
  }, [messages]);

  
  useEffect(() => {
    subscribeToMessage()
    fetchMessages(userToChatId._id);
    return ()=> unsubscribeToMessage()
  }, [userToChatId._id, fetchMessages,subscribeToMessage,unsubscribeToMessage]);
  
  useEffect(() => {
    console.log(messages.data);
  }, [messages]);

  if (messageContainerrLoading) {
    return (
      <div className="flex flex-col w-full h-full">
        <MessagesSkeleton />
      </div>
    );
  }

  const imageShow = (src) => {
    setimageView(true);
    setimageSrc(src);
  };

  const CloseimageShow = () => {
    setimageView(false);
    setimageSrc("");
  };

  
  return (
    <div className="flex overflow-hidden flex-col  w-full p-3">
      <MessageHeadBar />
      <div className="messages w-full h-full overflow-auto px-3" ref={chatContainerRef}>
        {/* <div className="chat  chat-start">
          <div className="chat-bubble rounded-lg flex flex-col gap-1">
            <img className="h-[100px] md:h-[200px] rounded" src="default.jpg" alt="not found"  />
            hello
          </div>
        </div> */}
        {messages.map((message) => (
          <>
            <div
              key={message._id}
              className={`chat ${
                message.recieverID === userToChatId._id
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-bubble">
                {message.image && (
                  <img
                    className="h-[100px] md:h-[200px] w-[200px] object-fit rounded transition-all ease-in-out duration-500"
                    src={message.image}
                    alt="not found"
                    onClick={() => imageShow(message.image)}
                  />
                )}
                {message.text && <> {message.text}</>}
              </div>
              <div className="chat-footer text-zinc-500">{formatMessageTime(message.createdAt)}<p className="hidden">{scroll}</p></div>
            </div>
          </>
        ))}
        {imageView && (
          <div
          className="fixed transition-all ease-in-out duration-500 inset-0 flex gap-6 items-center justify-center bg-black bg-opacity-80"
          onClick={CloseimageShow} // Close when clicked outside
        >
          <div className="flex flex-col gap-3">
          <X className="cursor-pointer" onClick={CloseimageShow}/>
          </div>
          <img
            src={imageSrc}
            alt="Full Preview"
            className="max-w-[50%] max-h-[50%] rounded-lg shadow-xl"
          />
        </div>
        )}
      </div>
      <MessageSend />
    </div>
  );
};

export default ChatContainer;
