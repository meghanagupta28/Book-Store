import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    books:{
        type:[Schema.Types.ObjectId],
        ref: 'Book'
    }
},{
    timestamps: true
});

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;