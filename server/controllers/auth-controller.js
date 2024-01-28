import { passwordComparison, passwordHashing } from "../helper/auth-helper.js";
import User from "../models/user-model.js";
import Address from "../models/address-model.js";
import { AppError } from "../errors/AppError.js";
import { asyncErrorHandler } from "../helper/async-error-handler.js";
import { createToken } from "../helper/jwt-helper.js";

export const registerController = asyncErrorHandler(async(req, res)=>{

        const { name, email, password, phone, address} = req.body;

        const hashedPassword = await passwordHashing(password);

        const newUser = new User({
            username: name,
            password: hashedPassword,
            email: email,
            phone: phone,
        });

        const savedUser = await newUser.save();

        const newAddress = new Address({
            address: address.address,
            city: address.city,
            country: address.country,
            postalCode: address.postalCode,
            user: newUser.id,
        });

        const savedAddress = await newAddress.save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            savedUser,
            savedAddress
        })
        
})

export const loginController = asyncErrorHandler(async(req,res)=>{
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            throw new AppError(200, true, 'Unregistered data');
        } 

        const passwordCheck = await passwordComparison(password, user.password);
        if(!passwordCheck){
            throw new AppError(200, true, 'Incorrect password or email entered');
        }

        const token = createToken({'userId': user._id});

        res.status(200).send({
            success: true,
            message: 'Login Successful',
            user:{
                name: user.name,
                email: user.email,
            },
            token,
        });
})

export const deleteUser = asyncErrorHandler(async(req, res)=>{
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if(!deletedUser){
        throw new AppError(500,true, 'User account deletion failed')
    }

    res.status(204).json({
        success: true,
        message: 'User account delete successfully',
        deletedUser
    })
    
})