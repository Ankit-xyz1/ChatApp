import { messageStore } from "../store/messageStore";
import { useEffect, useState } from "react";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import MessageHeadBar from "./MessageHeadBar";
import MessageSend from "./MessageSend";
const ChatContainer = () => {
  const {
    messages,
    userToChatId,
    fetchMessages,
    messageContainerrLoading,
  } = messageStore();

  const [imageView, setimageView] = useState(false);
  const [imageSrc, setimageSrc] = useState("");

  useEffect(() => {
    console.log(userToChatId._id);
    fetchMessages(userToChatId._id);
  }, [userToChatId._id, fetchMessages]);
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
      <div className="messages w-full h-full overflow-auto px-3">
        {/* <div className="chat  chat-start">
          <div className="chat-bubble rounded-lg flex flex-col gap-1">
            <img className="h-[100px] md:h-[200px] rounded" src="default.jpg" alt="not found"  />
            hello
          </div>
        </div> */}
        {messages.data.map((message) => (
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
