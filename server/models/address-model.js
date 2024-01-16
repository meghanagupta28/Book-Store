import { Schema, model } from "mongoose";
import User from './user-model.js'

const AddressSchema = new Schema({
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String, 
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    postalCode:{
        type:String,
        required: true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
});

const Address = model('Address', AddressSchema);

export default Address;