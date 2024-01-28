import { Schema, model } from 'mongoose'
import Book from './book-model.js'

const tagSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    description:{
        type: String,
        required: true
    }
});

tagSchema.pre('findOneAndDelete',{ document: true, query: false}, async(next)=>{
    const tagId = this._id;
    await Book.updateMany({
        tags: tagId
    },{
        $pull:{
            tags: tagID
        }
    });

    next();
})



const Tag = model('Tag', tagSchema);

export default Tag;