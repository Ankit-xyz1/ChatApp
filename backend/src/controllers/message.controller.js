import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudnary from "../lib/cloudnary.js";
import { getUserSocketId,io } from "../lib/socket.js";

export const FetchUSerSidebar = async (req, res) => {
  try {
    const cLoggedInUserID = req.user._id;
    const otherUsers = await User.find({
      _id: { $ne: cLoggedInUserID },
    }).select("-password");
    return res.status(200).json({
      sucess: true,
      message: "fetched sucessfully",
      data: otherUsers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: false, message: "internam server errorr" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatID } = req.params;
    const MyID = req.user._id;
    let messages = await Message.find({
      $or: [
        { senderID: MyID, recieverID: userTochatID },
        { senderID: userTochatID, recieverID: MyID },
      ],
    });
    res.status(200).json({
      sucess: true,
      message: "Sucessfully got messages",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Interrnal Server error",
    });
  }
};

export const sendMesage = async (req, res) => {
  try {
    const MyID = req.user._id;
    const { id: userTochatID } = req.params;
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(500).json({
        sucess: false,
        message: "invalid message",
      });
    }

    let imageURL;
    if (image) {
      const uploadResponse = await cloudnary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const message = await Message.create({
      senderID: MyID,
      recieverID: userTochatID,
      text: text,
      image: imageURL,
    });

    //realtime functionality
    const recieverID = getUserSocketId(userTochatID)
    //const senderID = getUserSocketId(MyID)
    if(recieverID ){
      io.to(recieverID).emit("NewMessage",message)
    }
    // if(senderID ){
    //   io.to(senderID).emit("NewMessage",message)
    // }

    return res.status(200).json({
      sucess: true,
      message: "sucessFull",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};
