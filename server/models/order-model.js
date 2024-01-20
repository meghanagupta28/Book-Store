import { Schema, model } from 'mongoose';

const orderItem = {
    bookId:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
};

const orderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    items:{
        type:[orderItem],
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