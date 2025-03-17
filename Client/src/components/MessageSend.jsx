import { ImageUp, Send, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import { axiosInstance } from "../lib/axios";
import { messageStore } from "../store/messageStore";

const MessageSend = () => {
  const [imagePreview, setImagePreview] = useState(false);
  const [imageData, setImageData] = useState("");
  const fileInputRef = useRef(null); // Reference to file input
  const [message, setmessage] = useState("");
  const [canMessage, setcanMessage] = useState(false);

  const {userToChatId,sendMessages} = messageStore();

  //validations
  useEffect(() => {
    if (imageData || message) {
      setcanMessage(true);
    }else{
      setcanMessage(false);
    }
    console.log(userToChatId._id);
    
  }, [imageData, message]);

  //message handling
  const handleMessage = (e) => {
    const data = e.target.value;
    setmessage(data);
  };

  //image handling
  const removeImage = () => {
    setImageData("");
    setImagePreview(false);

    // ✅ Reset file input to allow re-uploading the same image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    try {
      const image = e.target.files[0];

      if (!image) return toast.error("No file selected.");
      if (!image.type.startsWith("image/"))
        return toast.error("Please select an image file.");

      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result);
        setImagePreview(true);

        // ✅ Reset file input after successful selection
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

      reader.onerror = () => {
        toast.error("Failed to read file.");
      };

      reader.readAsDataURL(image);
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  //sending message to serrver
  const send = async ()=>{
    sendMessages(message,imageData,userToChatId)
    setmessage("");
    setImageData("");
    setImagePreview(false);

  }

  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imageData}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1 text-sm h-10 focus:border-1 focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={handleMessage}
        />
        <label htmlFor="uploadImg">
          <div className="btn btn-primary h-10 min-h-0">
            <ImageUp size={18} />
            <input
              type="file"
              className="hidden "
              id="uploadImg"
              accept="image/*"
              ref={fileInputRef} // ✅ Assign ref to input
              onChange={handleImageChange}
            />
          </div>
        </label>
        <button className={`btn btn-primary h-10 min-h-0`} 
        disabled={canMessage?false:true}
        onClick={send}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageSend;
