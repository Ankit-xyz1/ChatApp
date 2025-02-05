import jwt from "jsonwebtoken"
export const generateToken = async (userID,res)=>{
    
    try {
        const token =  jwt.sign({userID},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
    
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly : true,
            sameSite : "Strict",
            secure : process.env.NODE_ENV !=="DEVELOPMENT",    
        });
        
        return token;
    } catch (error) {
        console.log(error);
    }
}