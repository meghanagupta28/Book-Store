import { Schema, model } from "mongoose";
import Wishlist from './wishlist-model.js';
import Cart from './cart-model.js';

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

userSchema.post('save', async function (user) {
    await Wishlist.create({ userId: user._id });
    await Cart.create({ userId: user._id });
});


export default User;