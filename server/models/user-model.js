import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,    
        trim:true,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone:{
        type:String, 
        required: true,
    },
    role:{
        type: String,
        enum:['admin', 'user'],
        default: 'user',
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    }
});
 
const User = model('User', userSchema);

export default User;