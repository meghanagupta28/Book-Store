import { passwordComparison, passwordHashing } from "../helper/auth-helper.js";
import User from "../models/user-model.js";
import Address from "../models/address-model.js";

export const registerController = async(req, res)=>{
    
    try {
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
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'User registration failed',
            error
        });
    }
}

export const loginController = async(req,res)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            res.status(200).send({
                success: false,
                message: 'Unregistered',
            })
        } else {
            const passwordCheck = await passwordComparison(password, user.password);
            if(passwordCheck){
                res.status(200).send({
                    success: true,
                    message: 'Login Successful',
                })
            } else {
                res.status(200).send({
                    success: false,
                    message: 'Incorrect password or email',
                })
            }
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Login failed',
            error
        })
    }
}