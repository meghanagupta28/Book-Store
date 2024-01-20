import { Schema, model } from 'mongoose'

const cartItem = {
    bookId:{
        type:Schema.Types.ObjectId,
        ref: 'Book',
    },
    quantity:{
        type:Number,
        default:1,
    },
    selectedForOrder:{
        type: Boolean,
        default: true,
    }
};

const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    items: [cartItem],
},{
    timestamps:true,
})

const Cart = model('Cart', cartSchema);

export default Cart;