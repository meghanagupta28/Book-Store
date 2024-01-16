import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    order:{
        type:[Schema.Types.ObjectId],
        ref: 'Book'
    }
},{
    timestamps: true
});

const Order = model('Order', orderSchema);

export default Order;