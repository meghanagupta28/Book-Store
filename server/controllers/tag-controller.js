import { AppError } from "../errors/AppError.js";
import { asyncErrorHandler } from "../helper/async-error-handler.js";
import Tag from '../models/tag-model.js'

export const getTags = asyncErrorHandler(async(req, res)=>{
    const tags = await Tag.find().exec();

    if(!tags){
        throw new AppError(500, true, 'Unable to fetch tags');
    }

    res.status(200).json({tags});
})

export const addTagNew = asyncErrorHandler(async(req, res)=>{
    const { name , description } = req.body;

    const newTag = Tag({
        name: name,
        description: description
    });

    const savedTag = await newTag.save();

    if(!savedTag){
        throw new AppError(500, true, 'Tag addition failed');
    }

    res.status(201).json({
        success: true,
        message: 'Tag added successfully',
        savedTag
    })
})

export const updateTag = asyncErrorHandler(async(req, res)=>{
    const {tagId } = req.params;
    const { name , description } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(tagId,{
        name: name,
        description: description
    }, {
        new: true,
        runValidators: true
    });

    if(!updatedTag){
        throw new AppError(500, true, 'Tag updating failed');
    }

    res.status(200).json({
        success: true,
        message: 'Tag updated successfully',
        updatedTag
    })
})

export const deleteTag = asyncErrorHandler(async(req, res)=>{
    const { tagId } = req.params;

    const deletedTag = await Tag.findByIdAndDelete(tagId);

    if(!deletedTag){
        throw new AppError(500, true, 'Tag deletion failed');
    }

    res.status(200).json({
        success: true,
        message: 'Tag deleted successfully'
    })
})