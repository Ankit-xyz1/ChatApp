import mongoose from "mongoose";
import User from "./user.model.js";

const MessageSchema = mongoose.Schema({
    senderID:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    recieverID:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }

},{timestamps:true});

const Message = mongoose.model("Message",MessageSchema)
export default Message