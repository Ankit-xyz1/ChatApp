import moongoose from 'mongoose';

const userSchema = moongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        unique:true,
        required :true
    },
    password:{
        type:String,
        required :true
    },  
    profilePic:{
        type:String,
        default :""
    }
},{timestamps :true});

const User = moongoose.model('User',userSchema);

export default User;