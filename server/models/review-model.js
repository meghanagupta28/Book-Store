import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        index: true
    },
    rating:{
        type: Schema.Types.Decimal128,
        set: v =>{
            return new Schema.Types.Decimal128(v.toFixed(1));
        },
        default: 0
    },
    comment:{
        type: String,
        maxLength: 200,
        default:''
    }
},{
    timestamps:true
})

const Review = model('Review', reviewSchema);

export default  Review;