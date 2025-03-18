import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({
                sucess:false,
                message:"no token found youre not authoriasdaszed"
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(400).json({
                sucess:false,
                message:"Not authorized"
            });
        }
        const id =decode.userID;
        const user = await User.findOne({_id:id});
        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"Not authorized"
            });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.json({sucess:false})
    }

}