import { Schema, model } from 'mongoose'

const cartItemSchema = new Schema({
    book_id:{
        type:Schema.Types.ObjectId,
        ref: 'Book',
    },
    quantity:{
        type:Number,
        default:1,
    },
    selected_for_order:{
        type: Boolean,
        default: true,
    }

});

const cartSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [cartItemSchema],
},{
    timestamps:true,
})

const Cart = model('Cart', cartSchema);

export default Cart;