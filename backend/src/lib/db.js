import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        let con = await mongoose.connect(process.env.MONGO_URI);
        if(con){
            console.log("Connected sucessfully");
        }
    } catch (error) {
        console.log("Connection Error:" , error);
    }
}