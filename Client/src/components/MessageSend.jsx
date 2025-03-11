import { ImageUp, Send } from "lucide-react";

const MessageSend = () => {
  return (
    <>
      <div className="p-4 border-t border-base-300 bg-base-100">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1 text-sm h-10 focus:border-1 focus:outline-none"
            placeholder="Type a message..."
          />
          <label htmlFor="uploadImg">
            <div className="btn btn-primary h-10 min-h-0">
              <ImageUp size={18} />
              <input type="file" className="hidden" id="uploadImg" />
            </div>
          </label>
          <button className="btn btn-primary h-10 min-h-0">
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageSend;
