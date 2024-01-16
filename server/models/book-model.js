import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    author:{
        type:String,
        required: true,
    },
    imageURL:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    publishingDate:{
        type:Date,
        required:true,
    },
    synopsis:{
        type:String,
        required:true,
    },
    ISBN:{
        type:String,
        required:true,
    },
    Tags:{
        type:[Schema.Types.ObjectId],
        ref:'Tag',
        required: true
    },
    Demographic:{
        type: String,
        enum:['18+', 'Kids', 'Teens'],
        required: true
    }
})

const Book = model('Book', bookSchema);
export default Book;