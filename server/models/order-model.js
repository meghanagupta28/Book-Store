import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    order:{
        type:[orderItemSchema],
        required: true
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    status:{
        type: String,
        enum:['Order Placed', 'Order Cancelled', 'Shipped', 'Out for Delivery', 'Delivered'],
        required: true
    }
},{
    timestamps: true
});

const Order = model('Order', orderSchema);

export default Order;