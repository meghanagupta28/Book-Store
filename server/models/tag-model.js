import { Schema, model } from 'mongoose'

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

const Tag = model('Tag', tagSchema);

export default Tag;